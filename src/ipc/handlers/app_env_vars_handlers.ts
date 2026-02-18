/**
 * DO NOT USE LOGGER HERE.
 * Environment variables are sensitive and should not be logged.
 */
import { ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";
import { db } from "../../db";
import { apps } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getCodinerAppPath } from "../../paths/paths";
import { GetAppEnvVarsParams, SetAppEnvVarsParams } from "../ipc_types";
import {
  ENV_FILE_NAME,
  parseEnvFile,
  serializeEnvFile,
} from "../utils/app_env_var_utils";

import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";
import { discoverEnvVarsInCodebase } from "../utils/app_env_var_discovery";

const logger = log.scope("env_vars");
const handle = createLoggedHandler(logger);

export function registerAppEnvVarsHandlers() {
  // Handler to get app environment variables
  handle(
    "get-app-env-vars",
    async (event, { appId, fileName = ENV_FILE_NAME }: GetAppEnvVarsParams) => {
      try {
        const app = await db.query.apps.findFirst({
          where: eq(apps.id, appId),
        });

        if (!app) {
          throw new Error("App not found");
        }

        const appPath = getCodinerAppPath(app.path);
        const envFilePath = path.join(appPath, fileName);

        // If file doesn't exist, return empty array
        try {
          await fs.promises.access(envFilePath);
        } catch {
          return [];
        }

        const content = await fs.promises.readFile(envFilePath, "utf8");
        const envVars = parseEnvFile(content);

        return envVars;
      } catch (error) {
        console.error("Error getting app environment variables:", error);
        throw new Error(
          `Failed to get environment variables: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    },
  );

  // Handler to set app environment variables
  handle(
    "set-app-env-vars",
    async (event, { appId, envVars, fileName = ENV_FILE_NAME }: SetAppEnvVarsParams) => {
      try {
        const app = await db.query.apps.findFirst({
          where: eq(apps.id, appId),
        });

        if (!app) {
          throw new Error("App not found");
        }

        const appPath = getCodinerAppPath(app.path);
        const envFilePath = path.join(appPath, fileName);

        // Serialize environment variables to format
        const content = serializeEnvFile(envVars);

        // Write to file
        await fs.promises.writeFile(envFilePath, content, "utf8");
      } catch (error) {
        console.error("Error setting app environment variables:", error);
        throw new Error(
          `Failed to set environment variables: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    },
  );

  // Handler to discover environment variables in codebase
  handle(
    "discover-app-env-vars",
    async (event, { appId }: { appId: number }) => {
      try {
        const app = await db.query.apps.findFirst({
          where: eq(apps.id, appId),
        });

        if (!app) {
          throw new Error("App not found");
        }

        const discoveredKeys = await discoverEnvVarsInCodebase(app.path);

        return { discoveredKeys };
      } catch (error) {
        console.error("Error discovering environment variables:", error);
        throw new Error(
          `Failed to discover environment variables: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }
  );
}
