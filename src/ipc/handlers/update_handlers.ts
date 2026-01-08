import { autoUpdater } from "electron";
import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";

const logger = log.scope("update_handlers");
const handle = createLoggedHandler(logger);

export function registerUpdateHandlers() {
    handle("check-for-updates", async () => {
        logger.info("Manual update check requested");
        try {
            // Logic to trigger update check
            // Note: autoUpdater.checkForUpdates() only works if a feed URL has been set.
            // updateElectronApp sets it internally.
            autoUpdater.checkForUpdates();
            return { success: true };
        } catch (error: any) {
            logger.error("Failed to check for updates:", error);
            throw new Error(`Failed to check for updates: ${error.message}`);
        }
    });

    // Listen for update events and notify renderer if needed
    autoUpdater.on("update-available", () => {
        logger.info("Update available");
        // We could send an IPC message to renderer here
    });

    autoUpdater.on("update-not-available", () => {
        logger.info("Update not available");
    });

    autoUpdater.on("update-downloaded", () => {
        logger.info("Update downloaded");
    });

    autoUpdater.on("error", (error) => {
        logger.error("AutoUpdater error:", error);
    });
}
