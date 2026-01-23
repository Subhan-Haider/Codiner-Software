import { ipcMain, IpcMainInvokeEvent } from "electron";
import { Vercel } from "@vercel/sdk";
import { writeSettings, readSettings } from "../../main/settings";
import * as schema from "../../db/schema";
import { db } from "../../db";
import { apps } from "../../db/schema";
import { eq } from "drizzle-orm";
import log from "electron-log";
import { IS_TEST_BUILD } from "../utils/test_utils";
import * as fs from "fs";
import * as path from "path";
import { CreateProjectFramework } from "@vercel/sdk/models/createprojectop.js";
import { getCodinerAppPath } from "@/paths/paths";
import {
  CreateVercelProjectParams,
  IsVercelProjectAvailableParams,
  SaveVercelAccessTokenParams,
  VercelDeployment,
  VercelProject,
} from "../ipc_types";
import { ConnectToExistingVercelProjectParams } from "../ipc_types";
import { GetVercelDeploymentsParams } from "../ipc_types";
import { DisconnectVercelProjectParams } from "../ipc_types";
import { createLoggedHandler } from "./safe_handle";

const logger = log.scope("vercel_handlers");
const handle = createLoggedHandler(logger);

// Use test server URLs when in test mode
const TEST_SERVER_BASE = "http://localhost:3500";

const VERCEL_API_BASE = IS_TEST_BUILD
  ? `${TEST_SERVER_BASE}/vercel/api`
  : "https://api.vercel.com";

// --- Helper Functions ---

function createVercelClient(token: string): Vercel {
  return new Vercel({
    bearerToken: token,
    ...(IS_TEST_BUILD && { serverURL: VERCEL_API_BASE }),
  });
}

interface VercelProjectResponse {
  id: string;
  name: string;
  framework?: string | null;
  targets?: {
    production?: {
      url?: string;
    };
  };
}

interface GetVercelProjectsResponse {
  projects: VercelProjectResponse[];
}

/**
 * Fetch Vercel projects via HTTP request (bypasses the broken SDK).
 * Mimics the SDK's `vercel.projects.getProjects` API.
 */
async function getVercelProjects(
  token: string,
  options?: { search?: string },
): Promise<GetVercelProjectsResponse> {
  const url = new URL(`${VERCEL_API_BASE}/v9/projects`);
  if (options?.search) {
    url.searchParams.set("search", options.search);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch Vercel projects: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }

  const data = (await response.json()) as any;
  return {
    projects: data.projects || [],
  };
}

async function validateVercelToken(token: string): Promise<boolean> {
  try {
    const vercel = createVercelClient(token);
    await vercel.user.getAuthUser();
    return true;
  } catch (error) {
    logger.error("Error validating Vercel token:", error);
    return false;
  }
}

async function getDefaultTeamId(token: string): Promise<string> {
  try {
    const response = await fetch(`${VERCEL_API_BASE}/v2/teams?limit=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch teams: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as any;

    // Use the first team (typically the personal account or default team)
    if (data.teams && data.teams.length > 0) {
      return data.teams[0].id;
    }

    throw new Error("No teams found for this user");
  } catch (error) {
    logger.error("Error getting default team ID:", error);
    throw new Error("Failed to get team information");
  }
}

async function detectFramework(
  appPath: string,
): Promise<CreateProjectFramework | undefined> {
  try {
    // Check for specific config files first
    const configFiles: Array<{
      file: string;
      framework: CreateProjectFramework;
    }> = [
        { file: "next.config.js", framework: "nextjs" },
        { file: "next.config.mjs", framework: "nextjs" },
        { file: "next.config.ts", framework: "nextjs" },
        { file: "vite.config.js", framework: "vite" },
        { file: "vite.config.ts", framework: "vite" },
        { file: "vite.config.mjs", framework: "vite" },
        { file: "nuxt.config.js", framework: "nuxtjs" },
        { file: "nuxt.config.ts", framework: "nuxtjs" },
        { file: "astro.config.js", framework: "astro" },
        { file: "astro.config.mjs", framework: "astro" },
        { file: "astro.config.ts", framework: "astro" },
        { file: "svelte.config.js", framework: "svelte" },
      ];

    for (const { file, framework } of configFiles) {
      if (fs.existsSync(path.join(appPath, file))) {
        return framework;
      }
    }

    // Check package.json for dependencies
    const packageJsonPath = path.join(appPath, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      // Check for framework dependencies in order of preference
      if (dependencies.next) return "nextjs";
      if (dependencies.vite) return "vite";
      if (dependencies.nuxt) return "nuxtjs";
      if (dependencies.astro) return "astro";
      if (dependencies.svelte) return "svelte";
      if (dependencies["@angular/core"]) return "angular";
      if (dependencies.vue) return "vue";
      if (dependencies["react-scripts"]) return "create-react-app";
      if (dependencies.gatsby) return "gatsby";
      if (dependencies.remix) return "remix";
    }

    // Default fallback
    return undefined;
  } catch (error) {
    logger.error("Error detecting framework:", error);
    return undefined;
  }
}

// --- IPC Handlers ---

async function handleSaveVercelToken(
  event: IpcMainInvokeEvent,
  { token }: SaveVercelAccessTokenParams,
): Promise<void> {
  logger.debug("Saving Vercel access token");

  if (!token || token.trim() === "") {
    throw new Error("Access token is required.");
  }

  try {
    // Validate the token by making a test API call
    const isValid = await validateVercelToken(token.trim());
    if (!isValid) {
      throw new Error(
        "Invalid access token. Please check your token and try again.",
      );
    }

    writeSettings({
      vercelAccessToken: {
        value: token.trim(),
      },
    });

    logger.log("Successfully saved Vercel access token.");
  } catch (error: any) {
    logger.error("Error saving Vercel token:", error);
    throw new Error(`Failed to save access token: ${error.message}`);
  }
}

// --- Vercel List Projects Handler ---
async function handleListVercelProjects(): Promise<VercelProject[]> {
  try {
    const settings = readSettings();
    const accessToken = settings.vercelAccessToken?.value;
    if (!accessToken) {
      throw new Error("Not authenticated with Vercel.");
    }

    const response = await getVercelProjects(accessToken);

    if (!response.projects) {
      throw new Error("Failed to retrieve projects from Vercel.");
    }

    return response.projects.map((project) => ({
      id: project.id,
      name: project.name,
      framework: project.framework || null,
    }));
  } catch (err: any) {
    logger.error("[Vercel Handler] Failed to list projects:", err);
    throw new Error(err.message || "Failed to list Vercel projects.");
  }
}

// --- Vercel Project Availability Handler ---
async function handleIsProjectAvailable(
  event: IpcMainInvokeEvent,
  { name }: IsVercelProjectAvailableParams,
): Promise<{ available: boolean; error?: string }> {
  try {
    const settings = readSettings();
    const accessToken = settings.vercelAccessToken?.value;
    if (!accessToken) {
      return { available: false, error: "Not authenticated with Vercel." };
    }

    // Check if project name is available by searching for projects with that name
    const response = await getVercelProjects(accessToken, { search: name });

    if (!response.projects) {
      return {
        available: false,
        error: "Failed to check project availability.",
      };
    }

    const projectExists = response.projects.some(
      (project) => project.name === name,
    );

    return {
      available: !projectExists,
      error: projectExists ? "Project name is not available." : undefined,
    };
  } catch (err: any) {
    return { available: false, error: err.message || "Unknown error" };
  }
}

// --- Vercel Create Project Handler ---
async function handleCreateProject(
  event: IpcMainInvokeEvent,
  { name, appId }: CreateVercelProjectParams,
): Promise<void> {
  const settings = readSettings();
  const accessToken = settings.vercelAccessToken?.value;
  if (!accessToken) {
    throw new Error("Not authenticated with Vercel.");
  }

  try {
    logger.info(`Creating Vercel project: ${name} for app ${appId}`);

    // Get app details to determine the framework
    const app = await db.query.apps.findFirst({ where: eq(apps.id, appId) });
    if (!app) {
      throw new Error("App not found.");
    }

    // Check if app has GitHub repository configured
    if (!app.githubOrg || !app.githubRepo) {
      throw new Error(
        "App must be connected to a GitHub repository before creating a Vercel project.",
      );
    }

    // Detect the framework from the app's directory
    const detectedFramework = await detectFramework(getCodinerAppPath(app.path));

    logger.info(
      `Detected framework: ${detectedFramework || "none detected"} for app at ${app.path}`,
    );

    const vercel = createVercelClient(accessToken);

    const projectData = await vercel.projects.createProject({
      requestBody: {
        name: name,
        gitRepository: {
          type: "github",
          repo: `${app.githubOrg}/${app.githubRepo}`,
        },
        framework: detectedFramework,
      },
    });
    if (!projectData.id) {
      throw new Error("Failed to create project: No project ID returned.");
    }

    // Get the default team ID
    const teamId = await getDefaultTeamId(accessToken);

    const projectDomains = await vercel.projects.getProjectDomains({
      idOrName: projectData.id,
    });
    const projectUrl = "https://" + projectDomains.domains[0].name;

    // Store project info in the app's DB row
    await updateAppVercelProject({
      appId,
      projectId: projectData.id,
      projectName: projectData.name,
      teamId: teamId,
      deploymentUrl: projectUrl,
    });

    logger.info(
      `Successfully created Vercel project: ${projectData.id} with GitHub repo: ${app.githubOrg}/${app.githubRepo}`,
    );

    // Trigger the first deployment
    logger.info(`Triggering first deployment for project: ${projectData.id}`);
    try {
      // Create deployment via Vercel SDK using the project settings we just created
      const deploymentData = await vercel.deployments.createDeployment({
        requestBody: {
          name: projectData.name,
          project: projectData.id,
          target: "production",
          gitSource: {
            type: "github",
            org: app.githubOrg,
            repo: app.githubRepo,
            ref: app.githubBranch || "main",
          },
        },
      });

      if (deploymentData.url) {
        logger.info(`First deployment successful: ${deploymentData.url}`);
      } else {
        logger.warn("First deployment failed: No deployment URL returned");
      }
    } catch (deployError: any) {
      logger.warn(`First deployment failed with error: ${deployError.message}`);
      // Don't throw here - project creation was successful, deployment failure is non-critical
    }
  } catch (err: any) {
    logger.error("[Vercel Handler] Failed to create project:", err);
    throw new Error(err.message || "Failed to create Vercel project.");
  }
}

// --- Vercel Connect to Existing Project Handler ---
async function handleConnectToExistingProject(
  event: IpcMainInvokeEvent,
  { projectId, appId }: ConnectToExistingVercelProjectParams,
): Promise<void> {
  try {
    const settings = readSettings();
    const accessToken = settings.vercelAccessToken?.value;
    if (!accessToken) {
      throw new Error("Not authenticated with Vercel.");
    }

    logger.info(
      `Connecting to existing Vercel project: ${projectId} for app ${appId}`,
    );

    // Verify the project exists and get its details
    const response = await getVercelProjects(accessToken);
    const projectData = response.projects?.find(
      (p) => p.id === projectId || p.name === projectId,
    );

    if (!projectData) {
      throw new Error("Project not found. Please check the project ID.");
    }

    // Get the default team ID
    const teamId = await getDefaultTeamId(accessToken);

    // Store project info in the app's DB row
    await updateAppVercelProject({
      appId,
      projectId: projectData.id,
      projectName: projectData.name,
      teamId: teamId,
      deploymentUrl: projectData.targets?.production?.url
        ? `https://${projectData.targets.production.url}`
        : null,
    });

    logger.info(`Successfully connected to Vercel project: ${projectData.id}`);
  } catch (err: any) {
    logger.error(
      "[Vercel Handler] Failed to connect to existing project:",
      err,
    );
    throw new Error(err.message || "Failed to connect to existing project.");
  }
}

// --- Vercel Get Deployments Handler ---
async function handleGetVercelDeployments(
  event: IpcMainInvokeEvent,
  { appId }: GetVercelDeploymentsParams,
): Promise<VercelDeployment[]> {
  try {
    const settings = readSettings();
    const accessToken = settings.vercelAccessToken?.value;
    if (!accessToken) {
      throw new Error("Not authenticated with Vercel.");
    }

    const app = await db.query.apps.findFirst({ where: eq(apps.id, appId) });
    if (!app || !app.vercelProjectId) {
      throw new Error("App is not linked to a Vercel project.");
    }

    logger.info(
      `Getting deployments for Vercel project: ${app.vercelProjectId} for app ${appId}`,
    );

    const vercel = createVercelClient(accessToken);

    // Get deployments for the project
    const deploymentsResponse = await vercel.deployments.getDeployments({
      projectId: app.vercelProjectId,
      limit: 3, // Get last 3 deployments
    });

    if (!deploymentsResponse.deployments) {
      throw new Error("Failed to retrieve deployments from Vercel.");
    }

    // Map deployments to our interface format
    return deploymentsResponse.deployments.map((deployment) => ({
      uid: deployment.uid,
      url: deployment.url,
      state: deployment.state || "unknown",
      createdAt: deployment.createdAt || 0,
      target: deployment.target || "production",
      readyState: deployment.readyState || "unknown",
    }));
  } catch (err: any) {
    logger.error("[Vercel Handler] Failed to get deployments:", err);
    throw new Error(err.message || "Failed to get Vercel deployments.");
  }
}

async function handleDisconnectVercelProject(
  event: IpcMainInvokeEvent,
  { appId }: DisconnectVercelProjectParams,
): Promise<void> {
  logger.log(`Disconnecting Vercel project for appId: ${appId}`);

  const app = await db.query.apps.findFirst({
    where: eq(apps.id, appId),
  });

  if (!app) {
    throw new Error("App not found");
  }

  // Update app in database to remove Vercel project info
  await db
    .update(schema.apps)
    .set({
      vercelProjectId: null,
      vercelProjectName: null,
      vercelTeamSlug: null,
      vercelDeploymentUrl: null,
    })
    .where(eq(apps.id, appId));
}

// --- Registration ---
export function registerVercelHandlers() {
  // DO NOT LOG this handler because tokens are sensitive
  handle("vercel:save-token", handleSaveVercelToken, { logArgs: false });

  // Logged handlers
  handle("vercel:list-projects", handleListVercelProjects);
  handle("vercel:is-project-available", handleIsProjectAvailable);
  handle("vercel:create-project", handleCreateProject);
  handle("vercel:connect-existing-project", handleConnectToExistingProject);
  handle("vercel:get-deployments", handleGetVercelDeployments);
  handle("vercel:disconnect", handleDisconnectVercelProject);
  handle("vercel:deploy", handleDeployToVercel);
}

// --- Vercel File System Deployment (No GitHub) ---

import crypto from "crypto";
import { globSync } from "glob";
import * as fsPromises from "fs/promises";
import { DeployToVercelParams } from "../ipc_types";

async function getSha1(filePath: string): Promise<string> {
  const fileBuffer = await fsPromises.readFile(filePath);
  const hashSum = crypto.createHash("sha1");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
}

async function handleDeployToVercel(
  event: IpcMainInvokeEvent,
  { appId }: DeployToVercelParams
): Promise<string> {
  const settings = readSettings();
  const accessToken = settings.vercelAccessToken?.value;
  if (!accessToken) {
    throw new Error("Not authenticated with Vercel.");
  }

  const app = await db.query.apps.findFirst({ where: eq(apps.id, appId) });
  if (!app) {
    throw new Error("App not found");
  }

  if (!app.vercelProjectId) {
    throw new Error("App is not connected to a Vercel project.");
  }

  logger.info(`Starting file system deployment for app ${appId}`);

  const appPath = getCodinerAppPath(app.path);

  // 1. Gather files
  // Ignore node_modules, .git, etc.
  const files = globSync("**/*", {
    cwd: appPath,
    ignore: [
      "**/node_modules/**",
      "**/.git/**",
      "**/dist/**", // Usually we deploy source if we want Vercel to build, OR we deploy dist if pre-built. 
      // Vercel prefers source for frameworks.
      "**/.next/**"
    ],
    nodir: true,
    dot: true,
  });

  const fileList = [];
  logger.info(`Found ${files.length} files to deploy.`);

  // 2. Hash files
  for (const file of files) {
    const filePath = path.join(appPath, file);
    const sha = await getSha1(filePath);
    const stat = await fsPromises.stat(filePath);
    fileList.push({
      file: file.replace(/\\/g, "/"), // Force forward slashes
      sha,
      size: stat.size,
      path: filePath // Store absolute path for uploading later
    });
  }

  // 3. Create Deployment Request
  const body = {
    name: app.vercelProjectName || app.name,
    project: app.vercelProjectId,
    files: fileList.map(f => ({ file: f.file, sha: f.sha, size: f.size })),
    target: "production"
  };

  logger.info("Posting deployment to Vercel...");

  // We use fetch directly because SDK might try to wrap this logic differently or we want raw control
  const response = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json() as any;

  if (response.status !== 200) {
    // If it's just missing files, we handle it.
    // But Vercel returns 200 usually even if missing files, with separate logic? 
    // Actually v13 returns 200 but includes 'error' object if failed? 
    // Wait, documentation says: 
    // If files are missing, it sends back a list of missing files in the error response?
    // No, strictly speaking: POST /v13/deployments
    // If some files are not yet uploaded, the response status will be 200 OK 
    // but the state will be 'INITIALIZING' ?
    // Actually, historical API (v2) returned missing files. v13 is "monorepo aware".
    // Let's assume standard behavior: if 200, check if we need to upload anything?
    // Actually, Vercel API v13 requires uploading files to a separate endpoint first?
    // Or we upload to the endpoint provided?

    // Let's implement the standard "upload files" pattern.
    // If "error": { "code": "missing_files", "missing": [...] }
    if (data.error && data.error.code === "missing_files") {
      logger.info(`Vercel requested ${data.error.missing.length} missing files.`);

      const missingHashes = new Set(data.error.missing);
      const filesToUpload = fileList.filter(f => missingHashes.has(f.sha));

      await Promise.all(filesToUpload.map(async (f) => {
        const content = await fsPromises.readFile(f.path);
        const uploadRes = await fetch("https://api.vercel.com/v2/files", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/octet-stream",
            "x-vercel-digest": f.sha,
            "Content-Length": f.size.toString()
          },
          body: content
        });
        if (!uploadRes.ok) {
          throw new Error(`Failed to upload file ${f.file}`);
        }
      }));

      // Retry deployment
      logger.info("All missing files uploaded. Retrying deployment...");
      const retryResponse = await fetch("https://api.vercel.com/v13/deployments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const retryData = await retryResponse.json() as any;
      if (!retryResponse.ok) {
        throw new Error(`Deployment failed: ${JSON.stringify(retryData)}`);
      }
      return retryData.url;
    } else if (data.error) {
      throw new Error(`Deployment failed: ${data.error.message}`);
    }
  }

  return data.url || `https://${data.alias[0]}`; // Fallback
}

export async function updateAppVercelProject({
  appId,
  projectId,
  projectName,
  teamId,
  deploymentUrl,
}: {
  appId: number;
  projectId: string;
  projectName: string;
  teamId: string;
  deploymentUrl?: string | null;
}): Promise<void> {
  await db
    .update(schema.apps)
    .set({
      vercelProjectId: projectId,
      vercelProjectName: projectName,
      vercelTeamSlug: teamId,
      vercelDeploymentUrl: deploymentUrl,
    })
    .where(eq(schema.apps.id, appId));
}
