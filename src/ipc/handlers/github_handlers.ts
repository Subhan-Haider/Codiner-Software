import { ipcMain, BrowserWindow, IpcMainInvokeEvent } from "electron";
// Switched to native fetch (available in Node 18+) for better compatibility in the main process.
import { writeSettings, readSettings } from "../../main/settings";
import { gitSetRemoteUrl, gitPush, gitClone } from "../utils/git_utils";
import * as schema from "../../db/schema";
import fs from "node:fs";
import { getCodinerAppPath } from "../../paths/paths";
import { db } from "../../db";
import { apps as appsTable } from "../../db/schema";
import type { CloneRepoParams, CloneRepoReturnType } from "../ipc_types";
import { eq } from "drizzle-orm";
import { GithubUser } from "../../lib/schemas";
import log from "electron-log";
import { IS_TEST_BUILD } from "../utils/test_utils";
import path from "node:path"; // ← ADD THIS

const logger = log.scope("github_handlers");

// --- GitHub Authentication Methods ---
//
// Codiner uses GitHub Device Flow OAuth (recommended for desktop apps):
// - No callback URLs needed (unlike traditional OAuth apps)
// - User visits github.com/device and enters a code
// - App securely polls for access token
// - Appropriate for public desktop applications
//
// Alternative methods (not implemented for security):
// - Traditional OAuth App: Requires callback URLs, better for web apps
// - Personal Access Tokens: Only for personal development/testing
//
// TODO: Fetch CLIENT_ID securely from environment variables or config
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "Ov23li7iYZp0kbD0EiIe";

// Use test server URLs when in test mode

const TEST_SERVER_BASE = "http://localhost:3500";

const GITHUB_DEVICE_CODE_URL = IS_TEST_BUILD
  ? `${TEST_SERVER_BASE}/github/login/device/code`
  : "https://github.com/login/device/code";
const GITHUB_ACCESS_TOKEN_URL = IS_TEST_BUILD
  ? `${TEST_SERVER_BASE}/github/login/oauth/access_token`
  : "https://github.com/login/oauth/access_token";
const GITHUB_API_BASE = IS_TEST_BUILD
  ? `${TEST_SERVER_BASE}/github/api`
  : "https://api.github.com";
const GITHUB_GIT_BASE = IS_TEST_BUILD
  ? `${TEST_SERVER_BASE}/github/git`
  : "https://github.com";

const GITHUB_SCOPES = "repo,user,workflow"; // Define the scopes needed

// --- State Management (Simple in-memory, consider alternatives for robustness) ---
interface DeviceFlowState {
  deviceCode: string;
  interval: number;
  timeoutId: NodeJS.Timeout | null;
  isPolling: boolean;
  window: BrowserWindow | null; // Reference to the window that initiated the flow
}

// Simple map to track ongoing flows (key could be appId or a unique flow ID if needed)
// For simplicity, let's assume only one flow can happen at a time for now.
let currentFlowState: DeviceFlowState | null = null;

// --- Helper Functions ---

/**
 * Fetches the GitHub username of the currently authenticated user (using the stored access token).
 * @returns {Promise<string|null>} The GitHub username, or null if not authenticated or on error.
 */
export async function getGithubUser(): Promise<GithubUser | null> {
  const settings = readSettings();
  const githubUser = settings.githubUser;
  // If we already have login or email, return what we have (cached)
  if (githubUser?.login || githubUser?.email) return githubUser;

  try {
    const accessToken = settings.githubAccessToken?.value;
    if (!accessToken) return null;

    // Fetch user profile (for login and avatar)
    const profileRes = await fetch(`${GITHUB_API_BASE}/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!profileRes.ok) return null;
    const profile = (await profileRes.json()) as any;
    const login = profile.login;
    const avatarUrl = profile.avatar_url;

    // Fetch user emails (for primary email)
    const emailRes = await fetch(`${GITHUB_API_BASE}/user/emails`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!emailRes.ok) return null;
    const emails = (await emailRes.json()) as any[];
    const email = emails.find((e: any) => e.primary)?.email;
    if (!email && !login) return null;

    const user: GithubUser = {
      email: email || "",
      login: login,
      avatarUrl: avatarUrl,
    };

    writeSettings({
      githubUser: user,
    });
    return user;
  } catch (err) {
    logger.error("[GitHub Handler] Failed to get GitHub user info:", err);
    return null;
  }
}

// function event.sender.send(channel: string, data: any) {
//   if (currentFlowState?.window && !currentFlowState.window.isDestroyed()) {
//     currentFlowState.window.webContents.send(channel, data);
//   }
// }

async function pollForAccessToken(event: IpcMainInvokeEvent) {
  if (!currentFlowState || !currentFlowState.isPolling) {
    logger.debug("[GitHub Handler] Polling stopped or no active flow.");
    return;
  }

  const { deviceCode, interval } = currentFlowState;

  logger.debug("[GitHub Handler] Polling for token with device code");
  event.sender.send("github:flow-update", {
    message: "Polling GitHub for authorization...",
  });

  try {
    const response = await fetch(GITHUB_ACCESS_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        device_code: deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });

    const data = (await response.json()) as any;

    if (response.ok && data.access_token) {
      logger.log("Successfully obtained GitHub Access Token.");
      event.sender.send("github:flow-success", {
        message: "Successfully connected!",
      });
      writeSettings({
        githubAccessToken: {
          value: data.access_token,
        },
      });

      stopPolling();
      return;
    } else if (data.error) {
      switch (data.error) {
        case "authorization_pending":
          logger.debug("Authorization pending...");
          event.sender.send("github:flow-update", {
            message: "Waiting for user authorization...",
          });
          // Schedule next poll
          currentFlowState.timeoutId = setTimeout(
            () => pollForAccessToken(event),
            interval * 1000,
          );
          break;
        case "slow_down":
          const newInterval = interval + 5;
          logger.debug(`Slow down requested. New interval: ${newInterval}s`);
          currentFlowState.interval = newInterval; // Update interval
          event.sender.send("github:flow-update", {
            message: `GitHub asked to slow down. Retrying in ${newInterval}s...`,
          });
          currentFlowState.timeoutId = setTimeout(
            () => pollForAccessToken(event),
            newInterval * 1000,
          );
          break;
        case "expired_token":
          logger.error("Device code expired.");
          event.sender.send("github:flow-error", {
            error: "Verification code expired. Please try again.",
          });
          stopPolling();
          break;
        case "access_denied":
          logger.error("Access denied by user.");
          event.sender.send("github:flow-error", {
            error: "Authorization denied by user.",
          });
          stopPolling();
          break;
        default:
          logger.error(
            `Unknown GitHub error: ${data.error_description || data.error}`,
          );
          event.sender.send("github:flow-error", {
            error: `GitHub authorization error: ${data.error_description || data.error
              }`,
          });
          stopPolling();
          break;
      }
    } else {
      throw new Error(`Unknown response structure: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    logger.error("Error polling for GitHub access token:", error);
    event.sender.send("github:flow-error", {
      error: `Network or unexpected error during polling: ${error instanceof Error ? error.message : String(error)
        }`,
    });
    stopPolling();
  }
}

function stopPolling() {
  if (currentFlowState) {
    if (currentFlowState.timeoutId) {
      clearTimeout(currentFlowState.timeoutId);
    }
    currentFlowState.isPolling = false;
    currentFlowState.timeoutId = null;

    logger.debug("[GitHub Handler] Polling stopped.");
  }
}

// --- IPC Handlers ---

function handleStartGithubFlow(
  event: IpcMainInvokeEvent,
  args: { appId: number | null },
) {
  logger.info(`Received github:start-flow for appId: ${args.appId}`);
  console.log(`GitHub flow started for appId: ${args.appId}`);
  console.log(`Using GitHub client ID: ${GITHUB_CLIENT_ID}`);

  // If a flow is already in progress, maybe cancel it or send an error
  if (currentFlowState && currentFlowState.isPolling) {
    logger.warn("Another GitHub flow is already in progress.");
    console.log("Another GitHub flow is already in progress");
    event.sender.send("github:flow-error", {
      error: "Another connection process is already active.",
    });
    return;
  }

  // Store the window that initiated the request
  const window = BrowserWindow.fromWebContents(event.sender);
  if (!window) {
    logger.error("Could not get BrowserWindow instance.");
    return;
  }

  currentFlowState = {
    deviceCode: "",
    interval: 5, // Default interval
    timeoutId: null,
    isPolling: false,
    window: window,
  };

  event.sender.send("github:flow-update", {
    message: "Requesting device code from GitHub...",
  });

  logger.info(`Initiating GitHub device flow for client ID: ${GITHUB_CLIENT_ID}`);

  fetch(GITHUB_DEVICE_CODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "Codiner-App",
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      scope: GITHUB_SCOPES,
    }),
  })
    .then(async (res) => {
      logger.info(`GitHub device code response status: ${res.status}`);
      if (!res.ok) {
        let errDetails = res.statusText;
        try {
          const errData = (await res.json()) as any;
          errDetails = errData.error_description || errData.error || res.statusText;
        } catch (e) {
          // Fallback if not JSON
        }
        throw new Error(`GitHub API Error (${res.status}): ${errDetails}`);
      }
      return res.json() as Promise<any>;
    })
    .then((data) => {
      logger.info("Received device code response");
      if (!currentFlowState) return; // Flow might have been cancelled

      currentFlowState.deviceCode = data.device_code;
      currentFlowState.interval = data.interval || 5;
      currentFlowState.isPolling = true;

      // Send user code and verification URI to renderer
      event.sender.send("github:flow-update", {
        userCode: data.user_code,
        verificationUri: data.verification_uri,
        message: "Please authorize in your browser.",
      });

      // Start polling after the initial interval
      currentFlowState.timeoutId = setTimeout(
        () => pollForAccessToken(event),
        currentFlowState.interval * 1000,
      );
    })
    .catch((error) => {
      logger.error("Error initiating GitHub device flow:", error);
      event.sender.send("github:flow-error", {
        error: `Failed to start GitHub connection: ${error.message}`,
      });
      stopPolling(); // Ensure polling stops on initial error
      currentFlowState = null; // Clear state on initial error
    });
}

// --- GitHub List Repos Handler ---
async function handleListGithubRepos(): Promise<
  { name: string; full_name: string; private: boolean }[]
> {
  try {
    // Get access token from settings
    const settings = readSettings();
    const accessToken = settings.githubAccessToken?.value;
    if (!accessToken) {
      throw new Error("Not authenticated with GitHub.");
    }

    // Fetch user's repositories
    const response = await fetch(
      `${GITHUB_API_BASE}/user/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      throw new Error(
        `GitHub API error: ${errorData.message || response.statusText}`,
      );
    }

    const repos = (await response.json()) as any[];
    return repos.map((repo: any) => ({
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
    }));
  } catch (err: any) {
    logger.error("[GitHub Handler] Failed to list repos:", err);
    throw new Error(err.message || "Failed to list GitHub repositories.");
  }
}

// --- GitHub Get Repo Branches Handler ---
async function handleGetRepoBranches(
  event: IpcMainInvokeEvent,
  { owner, repo }: { owner: string; repo: string },
): Promise<{ name: string; commit: { sha: string } }[]> {
  try {
    // Get access token from settings
    const settings = readSettings();
    const accessToken = settings.githubAccessToken?.value;
    if (!accessToken) {
      throw new Error("Not authenticated with GitHub.");
    }

    // Fetch repository branches
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/branches`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      throw new Error(
        `GitHub API error: ${errorData.message || response.statusText}`,
      );
    }

    const branches = (await response.json()) as any[];
    return branches.map((branch: any) => ({
      name: branch.name,
      commit: { sha: branch.commit.sha },
    }));
  } catch (err: any) {
    logger.error("[GitHub Handler] Failed to get repo branches:", err);
    throw new Error(err.message || "Failed to get repository branches.");
  }
}

// --- GitHub Repo Availability Handler ---
async function handleIsRepoAvailable(
  event: IpcMainInvokeEvent,
  { org, repo }: { org: string; repo: string },
): Promise<{ available: boolean; error?: string }> {
  try {
    // Get access token from settings
    const settings = readSettings();
    const accessToken = settings.githubAccessToken?.value;
    if (!accessToken) {
      return { available: false, error: "Not authenticated with GitHub." };
    }
    // If org is empty, use the authenticated user
    const owner =
      org ||
      (await fetch(`${GITHUB_API_BASE}/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((r) => r.json())
        .then((u: any) => u.login));
    // Check if repo exists
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (res.status === 404) {
      return { available: true };
    } else if (res.ok) {
      return { available: false, error: "Repository already exists." };
    } else {
      const data = (await res.json()) as any;
      return { available: false, error: data.message || "Unknown error" };
    }
  } catch (err: any) {
    return { available: false, error: err.message || "Unknown error" };
  }
}

// --- GitHub Create Repo Handler ---
async function handleCreateRepo(
  event: IpcMainInvokeEvent,
  {
    org,
    repo,
    appId,
    branch,
  }: { org: string; repo: string; appId: number; branch?: string },
): Promise<void> {
  // Get access token from settings
  const settings = readSettings();
  const accessToken = settings.githubAccessToken?.value;
  if (!accessToken) {
    throw new Error("Not authenticated with GitHub.");
  }
  // If org is empty, create for the authenticated user
  let owner = org;
  if (!owner) {
    const userRes = await fetch(`${GITHUB_API_BASE}/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const user = (await userRes.json()) as any;
    owner = user.login;
  }
  // Create repo
  const createUrl = org
    ? `${GITHUB_API_BASE}/orgs/${owner}/repos`
    : `${GITHUB_API_BASE}/user/repos`;
  const res = await fetch(createUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      name: repo,
      private: true,
    }),
  });
  if (!res.ok) {
    let errorMessage = `Failed to create repository (${res.status} ${res.statusText})`;
    try {
      const data = (await res.json()) as any;
      logger.error("GitHub API error when creating repo:", {
        status: res.status,
        statusText: res.statusText,
        response: data,
      });

      // Handle specific GitHub API error cases
      if (data.message) {
        errorMessage = data.message;
      }

      // Handle validation errors with more details
      if (data.errors && Array.isArray(data.errors)) {
        const errorDetails = data.errors
          .map((err: any) => {
            if (typeof err === "string") return err;
            if (err.message) return err.message;
            if (err.code) return `${err.field || "field"}: ${err.code}`;
            return JSON.stringify(err);
          })
          .join(", ");
        errorMessage = `${data.message || "Repository creation failed"}: ${errorDetails}`;
      }
    } catch (jsonError) {
      // If response is not JSON, fall back to status text
      logger.error("Failed to parse GitHub API error response:", {
        status: res.status,
        statusText: res.statusText,
        jsonError:
          jsonError instanceof Error ? jsonError.message : String(jsonError),
      });
      errorMessage = `GitHub API error: ${res.status} ${res.statusText}`;
    }

    throw new Error(errorMessage);
  }
  // Store org, repo, and branch in the app's DB row (apps table)
  await updateAppGithubRepo({ appId, org: owner, repo, branch });
}

// --- GitHub Connect to Existing Repo Handler ---
async function handleConnectToExistingRepo(
  event: IpcMainInvokeEvent,
  {
    owner,
    repo,
    branch,
    appId,
  }: { owner: string; repo: string; branch: string; appId: number },
): Promise<void> {
  try {
    // Get access token from settings
    const settings = readSettings();
    const accessToken = settings.githubAccessToken?.value;
    if (!accessToken) {
      throw new Error("Not authenticated with GitHub.");
    }

    // Verify the repository exists and user has access
    const repoResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!repoResponse.ok) {
      const errorData = (await repoResponse.json()) as any;
      throw new Error(
        `Repository not found or access denied: ${errorData.message}`,
      );
    }

    // Store org, repo, and branch in the app's DB row
    await updateAppGithubRepo({ appId, org: owner, repo, branch });
  } catch (err: any) {
    logger.error("[GitHub Handler] Failed to connect to existing repo:", err);
    throw new Error(err.message || "Failed to connect to existing repository.");
  }
}

// --- GitHub Push Handler ---
async function handlePushToGithub(
  event: IpcMainInvokeEvent,
  { appId, force }: { appId: number; force?: boolean },
) {
  try {
    // Get access token from settings
    const settings = readSettings();
    const accessToken = settings.githubAccessToken?.value;
    if (!accessToken) {
      return { success: false, error: "Not authenticated with GitHub." };
    }
    // Get app info from DB
    const app = await db.query.apps.findFirst({
      where: eq(appsTable.id, appId),
    });
    if (!app || !app.githubOrg || !app.githubRepo) {
      return { success: false, error: "App is not linked to a GitHub repo." };
    }
    const appPath = getCodinerAppPath(app.path);
    const branch = app.githubBranch || "main";

    // Set up remote URL with token
    const remoteUrl = IS_TEST_BUILD
      ? `${GITHUB_GIT_BASE}/${app.githubOrg}/${app.githubRepo}.git`
      : `https://${accessToken}:x-oauth-basic@github.com/${app.githubOrg}/${app.githubRepo}.git`;
    // Set or update remote URL using git config
    await gitSetRemoteUrl({
      path: appPath,
      remoteUrl,
    });

    // Push to GitHub
    await gitPush({
      path: appPath,
      branch,
      accessToken,
      force,
    });
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to push to GitHub.",
    };
  }
}

async function handleDisconnectGithubRepo(
  event: IpcMainInvokeEvent,
  { appId }: { appId: number },
): Promise<void> {
  logger.log(`Disconnecting GitHub repo for appId: ${appId}`);

  // Get the app from the database
  const app = await db.query.apps.findFirst({
    where: eq(schema.apps.id, appId),
  });

  if (!app) {
    throw new Error("App not found");
  }

  // Update app in database to remove GitHub repo, org, and branch
  await db
    .update(appsTable as any)
    .set({
      githubOrg: null,
      githubRepo: null,
      githubBranch: null,
    })
    .where(eq(appsTable.id, appId));
}
// --- GitHub Clone Repo from URL Handler ---
async function handleCloneRepoFromUrl(
  event: IpcMainInvokeEvent,
  params: CloneRepoParams,
): Promise<CloneRepoReturnType> {
  const { url, installCommand, startCommand, appName } = params;
  try {
    const settings = readSettings();
    const accessToken = settings.githubAccessToken?.value;
    // More robust URL parsing
    // Handles https://github.com/owner/repo, github.com/owner/repo, git@github.com:owner/repo.git, owner/repo, etc.
    const urlPattern = /(?:(?:https?:\/\/|git@)?(?:www\.)?github\.com[/|:])?([^/:\s]+)\/([^/\s#?]+)/i;
    const match = url.trim().match(urlPattern);

    if (!match) {
      logger.error(`[GitHub Handler] URL match failed for: "${url}"`);
      return {
        error:
          `Invalid GitHub URL format: "${url}". Please provide a full URL (https://github.com/owner/repo) or shorthand (owner/repo).`,
      };
    }

    const owner = match[1];
    let repoName = match[2];
    logger.info(`[GitHub Handler] Parsed URL - Owner: ${owner}, Repo: ${repoName}`);

    // Clean up repo name: remove .git, trailing slashes, or subpaths
    repoName = repoName.replace(/\.git$/, "").split("/")[0];
    const cleanRepoName = repoName;

    // Check repository accessibility before cloning
    const repoHeaders: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (accessToken) {
      repoHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const repoResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${cleanRepoName}`,
      { headers: repoHeaders },
    );

    if (!repoResponse.ok) {
      if (repoResponse.status === 401 || repoResponse.status === 403) {
        return {
          error:
            "Authentication failed or access denied. Please check your GitHub Access Token in Settings and ensure it has 'repo' permissions.",
        };
      }
      if (repoResponse.status === 404) {
        return {
          error: `Repository "${owner}/${cleanRepoName}" not found. If it is a private repository, please ensure you have configured a valid GitHub Access Token in Settings.`,
        };
      }
      // For other errors, we continue and try the clone anyway as fallback
      logger.warn(
        `[GitHub Handler] Repo check returned ${repoResponse.status}: ${repoResponse.statusText}`,
      );
    }

    const finalAppName = appName && appName.trim() ? appName.trim() : cleanRepoName;
    const existingApp = await db.query.apps.findFirst({
      where: eq(appsTable.name, finalAppName),
    });

    if (existingApp) {
      return { error: `An app named "${finalAppName}" already exists.` };
    }

    const appPath = getCodinerAppPath(finalAppName);

    // Check if directory already exists and is not empty
    if (fs.existsSync(appPath) && fs.readdirSync(appPath).length > 0) {
      return { error: `The directory for "${finalAppName}" already exists and is not empty.` };
    }

    // Build the clone URL. We pass the clean HTTPS URL to gitClone, 
    // which handles adding the accessToken if needed.
    const cloneUrl = `https://github.com/${owner}/${cleanRepoName}.git`;

    try {
      await gitClone({
        path: appPath,
        url: cloneUrl,
        accessToken,
        singleBranch: false,
        depth: 1, // Default to shallow clone for faster initial import
      });
    } catch (cloneErr: any) {
      logger.error("[GitHub Handler] Clone failed:", cloneErr);
      let errorMessage = cloneErr.message || "Unknown error";
      if (errorMessage.includes("401") || errorMessage.includes("403")) {
        errorMessage =
          "Authentication failed. Please check your GitHub Access Token in Settings and ensure it has 'repo' permissions.";
      }
      return {
        error: `Failed to clone repository: ${errorMessage}`,
      };
    }
    const aiRulesPath = path.join(appPath, "AI_RULES.md");
    const hasAiRules = fs.existsSync(aiRulesPath);
    const [newApp] = (await db
      .insert(appsTable as any)
      .values({
        name: finalAppName,
        path: finalAppName,
        installCommand: installCommand || null,
        startCommand: startCommand || null,
      })
      .returning()) as any[];
    logger.log(`Successfully cloned repo ${owner}/${repoName} to ${appPath}`);
    // Return success object
    return {
      app: {
        ...newApp,
        files: [],
        vercelTeamSlug: null,
      },
      hasAiRules,
    };
  } catch (err: any) {
    // Catch any remaining unexpected errors and return an error object
    logger.error("[GitHub Handler] Unexpected error in clone flow:", err);
    return {
      error: err.message || "An unexpected error occurred during cloning.",
    };
  }
}

// --- Registration ---
export function registerGithubHandlers() {
  ipcMain.handle("github:start-flow", handleStartGithubFlow);
  ipcMain.handle("github:list-repos", handleListGithubRepos);
  ipcMain.handle(
    "github:get-repo-branches",
    (event, args: { owner: string; repo: string }) =>
      handleGetRepoBranches(event, args),
  );
  ipcMain.handle("github:is-repo-available", handleIsRepoAvailable);
  ipcMain.handle("github:create-repo", handleCreateRepo);
  ipcMain.handle(
    "github:connect-existing-repo",
    (
      event,
      args: { owner: string; repo: string; branch: string; appId: number },
    ) => handleConnectToExistingRepo(event, args),
  );
  ipcMain.handle("github:push", handlePushToGithub);
  ipcMain.handle("github:disconnect", (event, args: { appId: number }) =>
    handleDisconnectGithubRepo(event, args),
  );
  ipcMain.handle(
    "github:clone-repo-from-url",
    async (event, args: CloneRepoParams) => {
      return await handleCloneRepoFromUrl(event, args);
    },
  );
}

export async function updateAppGithubRepo({
  appId,
  org,
  repo,
  branch,
}: {
  appId: number;
  org?: string;
  repo: string;
  branch?: string;
}): Promise<void> {
  await db
    .update(appsTable as any)
    .set({
      githubOrg: org,
      githubRepo: repo,
      githubBranch: branch || "main",
    })
    .where(eq(appsTable.id, appId));
}
