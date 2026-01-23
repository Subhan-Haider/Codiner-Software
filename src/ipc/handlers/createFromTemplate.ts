import path from "path";
import fs from "fs-extra";
import { app } from "electron";
import { copyDirectoryRecursive } from "../utils/file_utils";
import { gitClone, getCurrentCommitHash } from "../utils/git_utils";
import { readSettings } from "@/main/settings";
import { getTemplateOrThrow } from "../utils/template_utils";
import log from "electron-log";

const logger = log.scope("createFromTemplate");
const GITHUB_CHECK_CACHE_TTL = 15 * 60 * 1000; // 15 minutes cache
const githubCheckCache = new Map<string, number>();

export async function createFromTemplate({

  fullAppPath,
}: {
  fullAppPath: string;
}) {
  const settings = readSettings();
  const templateId = settings.selectedTemplateId;

  if (templateId === "react") {
    const scaffoldPath = path.join(app.getAppPath(), "scaffold");
    logger.info(`Copying from local scaffold at ${scaffoldPath} to ${fullAppPath}`);
    await copyDirectoryRecursive(
      scaffoldPath,
      fullAppPath,
    );
    return;
  }

  // Check if it's in community-templates first
  const communityTemplatesDir = path.join(app.getAppPath(), "community-templates");
  const possibleFolderNames = [templateId, `${templateId}-official`].filter(Boolean);

  for (const folderName of possibleFolderNames) {
    const communityPath = path.join(communityTemplatesDir, folderName);
    if (fs.existsSync(communityPath)) {
      logger.info(`Found local community template at ${communityPath}. Copying...`);
      await copyDirectoryRecursive(communityPath, fullAppPath);
      return;
    }
  }

  const template = await getTemplateOrThrow(templateId);
  if (!template.githubUrl) {
    throw new Error(`Template ${templateId} has no GitHub URL`);
  }
  const repoCachePath = await cloneRepo(template.githubUrl);
  await copyRepoToApp(repoCachePath, fullAppPath);
}

async function cloneRepo(repoUrl: string): Promise<string> {
  const settings = readSettings();
  const accessToken = settings.githubAccessToken?.value;
  const url = new URL(repoUrl);
  if (url.protocol !== "https:") {
    throw new Error("Repository URL must use HTTPS.");
  }
  if (url.hostname !== "github.com") {
    throw new Error("Repository URL must be a github.com URL.");
  }

  // Pathname will be like "/org/repo" or "/org/repo.git"
  const pathParts = url.pathname.split("/").filter((part) => part.length > 0);

  if (pathParts.length !== 2) {
    throw new Error(
      "Invalid repository URL format. Expected 'https://github.com/org/repo'",
    );
  }

  const orgName = pathParts[0];
  const repoName = path.basename(pathParts[1], ".git"); // Remove .git suffix if present

  if (!orgName || !repoName) {
    // This case should ideally be caught by pathParts.length !== 2
    throw new Error(
      "Failed to parse organization or repository name from URL.",
    );
  }
  logger.info(`Parsed org: ${orgName}, repo: ${repoName} from ${repoUrl}`);

  const cachePath = path.join(
    app.getPath("userData"),
    "templates",
    orgName,
    repoName,
  );

  if (fs.existsSync(cachePath)) {
    try {
      logger.info(
        `Repo ${repoName} already exists in cache at ${cachePath}. Checking for updates.`,
      );

      const lastChecked = githubCheckCache.get(repoUrl);
      const now = Date.now();
      if (lastChecked && now - lastChecked < GITHUB_CHECK_CACHE_TTL) {
        // Verify the cache directory is actually inhabited
        try {
          const files = fs.readdirSync(cachePath);
          if (files.length > 0) {
            logger.info(
              `Checked for updates for ${repoName} recently (${Math.round((now - lastChecked) / 1000)}s ago). Using existing cache.`,
            );
            return cachePath;
          }
          logger.warn(`Cache directory for ${repoName} is empty, re-checking GitHub...`);
        } catch (e) {
          logger.warn(`Failed to read cache directory for ${repoName}, re-checking GitHub...`);
        }
      }

      // Update last checked time
      githubCheckCache.set(repoUrl, now);

      // Construct GitHub API URL
      const apiUrl = `https://api.github.com/repos/${orgName}/${repoName}/commits/HEAD`;
      logger.info(`Fetching remote SHA from ${apiUrl}`);

      // Use native fetch instead of isomorphic-git http.request
      const headers: Record<string, string> = {
        "User-Agent": "Codiner", // GitHub API requires this
        Accept: "application/vnd.github.v3+json",
      };

      if (accessToken) {
        headers.Authorization = `token ${accessToken}`;
      }

      const response = await Promise.race([
        fetch(apiUrl, {
          method: "GET",
          headers,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`GitHub API request timed out for ${apiUrl}`)), 10000)
        ),
      ]);
      // Handle non-200 responses
      if (!response.ok) {
        logger.warn(
          `GitHub API request failed for ${apiUrl} with status ${response.status}: ${response.statusText}. Will attempt to clone the repository directly.`,
        );
        // Skip to cloning by jumping out of the try block
        throw new Error("API_CHECK_FAILED");
      }
      // Parse JSON directly (fetch handles streaming internally)
      const commitData = (await response.json()) as { sha: string };
      const remoteSha = commitData.sha;
      if (!remoteSha) {
        throw new Error(`SHA not found in GitHub API response for ${apiUrl}`);
      }

      logger.info(`Successfully fetched remote SHA for ${repoName}: ${remoteSha}`);

      // Compare with local SHA
      let localSha: string | null = null;
      try {
        localSha = await getCurrentCommitHash({ path: cachePath });
      } catch (e) {
        logger.warn(`Failed to get local SHA for ${repoName} at ${cachePath}, forcing re-clone.`);
      }

      if (remoteSha && localSha && remoteSha === localSha) {
        logger.info(
          `Local cache for ${repoName} is up to date (SHA: ${localSha}). Skipping clone.`,
        );
        return cachePath;
      } else {
        logger.info(
          `Local cache for ${repoName} (SHA: ${localSha}) is outdated (Remote SHA: ${remoteSha}). Removing and re-cloning.`,
        );
        fs.rmSync(cachePath, { recursive: true, force: true });
        // Continue to clone…
      }
    } catch (err) {
      logger.warn(
        `Error checking for updates or comparing SHAs for ${repoName} at ${cachePath}. Forcing re-clone. Error: `,
        err,
      );
      try {
        fs.rmSync(cachePath, { recursive: true, force: true });
      } catch (rmErr) {
        logger.error(`Failed to remove broken cache directory at ${cachePath}:`, rmErr);
      }
      // Continue to clone…
    }
  }

  fs.ensureDirSync(path.dirname(cachePath));

  logger.info(`Cloning ${repoUrl} to ${cachePath}`);
  try {
    await gitClone({ path: cachePath, url: repoUrl, accessToken, depth: 1 });
    logger.info(`Successfully cloned ${repoUrl} to ${cachePath}`);
  } catch (err: any) {
    const gitError = err?.message || String(err);
    logger.error(`Failed to clone ${repoUrl} to ${cachePath}: `, gitError);
    throw new Error(`Failed to clone template repository from ${repoUrl}. Original error: ${gitError}`);
  }
  return cachePath;
}

async function copyRepoToApp(repoCachePath: string, appPath: string) {
  logger.info(`Copying from ${repoCachePath} to ${appPath}`);
  try {
    await fs.copy(repoCachePath, appPath, {
      filter: (src, _dest) => {
        const excludedDirs = ["node_modules", ".git"];
        const relativeSrc = path.relative(repoCachePath, src);
        if (excludedDirs.includes(path.basename(relativeSrc))) {
          logger.info(`Excluding ${src} from copy`);
          return false;
        }
        return true;
      },
    });
    logger.info("Finished copying repository contents.");
  } catch (err) {
    logger.error(
      `Error copying repository from ${repoCachePath} to ${appPath}: `,
      err,
    );
    throw err; // Re-throw the error after logging
  }
}
