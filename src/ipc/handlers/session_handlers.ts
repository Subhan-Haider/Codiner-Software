import { session } from "electron";
import fs from "node:fs/promises";
import { getTypeScriptCachePath } from "@/paths/paths";
import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";

const logger = log.scope("session_handlers");
const handle = createLoggedHandler(logger);

export const registerSessionHandlers = () => {
  handle("clear-session-data", async (_event) => {
    const defaultAppSession = session.defaultSession;

    await defaultAppSession.clearStorageData({
      storages: ["cookies", "localstorage"],
    });
    console.info(`[IPC] All session data cleared for default session`);

    // Clear custom cache data (like tsbuildinfo)
    try {
      await fs.rm(getTypeScriptCachePath(), { recursive: true, force: true });
    } catch {
      // Directory might not exist
    }
  });
};
