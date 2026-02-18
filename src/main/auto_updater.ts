import { autoUpdater } from "electron-updater";
import { BrowserWindow, dialog } from "electron";
import log from "electron-log";

const logger = log.scope("auto-updater");

// Configure auto-updater
autoUpdater.logger = logger;
autoUpdater.autoDownload = false; // We'll ask user first
autoUpdater.autoInstallOnAppQuit = true;

// Configure GitHub as update source
autoUpdater.setFeedURL({
    provider: "github",
    owner: "Subhan-Haider",
    repo: "Codiner-Software",
});

let updateCheckInProgress = false;

/**
 * Initialize auto-updater and set up event listeners
 */
export function initializeAutoUpdater(mainWindow: BrowserWindow | null) {
    // Check for updates on app start (after a delay to let app settle)
    setTimeout(() => {
        checkForUpdates(mainWindow, false); // Silent check on startup
    }, 10000); // Wait 10 seconds after app starts

    // Event: Checking for update
    autoUpdater.on("checking-for-update", () => {
        logger.info("Checking for updates...");
        sendStatusToWindow(mainWindow, "checking-for-update");
    });

    // Event: Update available
    autoUpdater.on("update-available", (info) => {
        logger.info("Update available:", info);
        sendStatusToWindow(mainWindow, "update-available", info);

        // Ask user if they want to download
        if (mainWindow) {
            dialog
                .showMessageBox(mainWindow, {
                    type: "info",
                    title: "Update Available",
                    message: `A new version (${info.version}) is available!`,
                    detail: "Would you like to download it now? The update will be installed when you restart the app.",
                    buttons: ["Download", "Later"],
                    defaultId: 0,
                    cancelId: 1,
                })
                .then((result) => {
                    if (result.response === 0) {
                        // User clicked "Download"
                        autoUpdater.downloadUpdate();
                    }
                });
        }
    });

    // Event: Update not available
    autoUpdater.on("update-not-available", (info) => {
        logger.info("Update not available:", info);
        sendStatusToWindow(mainWindow, "update-not-available", info);
    });

    // Event: Download progress
    autoUpdater.on("download-progress", (progressObj) => {
        logger.info(`Download progress: ${progressObj.percent}%`);
        sendStatusToWindow(mainWindow, "download-progress", {
            percent: progressObj.percent,
            transferred: progressObj.transferred,
            total: progressObj.total,
        });
    });

    // Event: Update downloaded
    autoUpdater.on("update-downloaded", (info) => {
        logger.info("Update downloaded:", info);
        sendStatusToWindow(mainWindow, "update-downloaded", info);

        // Notify user that update is ready
        if (mainWindow) {
            dialog
                .showMessageBox(mainWindow, {
                    type: "info",
                    title: "Update Ready",
                    message: "Update downloaded successfully!",
                    detail:
                        "The update will be installed when you restart the application. Would you like to restart now?",
                    buttons: ["Restart Now", "Later"],
                    defaultId: 0,
                    cancelId: 1,
                })
                .then((result) => {
                    if (result.response === 0) {
                        // User clicked "Restart Now"
                        autoUpdater.quitAndInstall(false, true);
                    }
                });
        }
    });

    // Event: Error
    autoUpdater.on("error", (error) => {
        logger.error("Auto-updater error:", error);
        sendStatusToWindow(mainWindow, "update-error", {
            message: error.message,
        });
    });
}

/**
 * Manually check for updates
 */
export async function checkForUpdates(
    mainWindow: BrowserWindow | null,
    showNoUpdateDialog = true
): Promise<void> {
    if (updateCheckInProgress) {
        logger.info("Update check already in progress, skipping...");
        return;
    }

    try {
        updateCheckInProgress = true;
        const result = await autoUpdater.checkForUpdates();

        if (!result) {
            logger.info("No update check result");
            return;
        }

        // We don't need to show a native dialog here.
        // The 'update-not-available' event will be emitted by autoUpdater,
        // which triggers sendStatusToWindow, and the renderer will show a toast.

    } catch (error) {
        logger.error("Error checking for updates:", error);
        // Send error to renderer so it can show a toast
        if (mainWindow) {
            sendStatusToWindow(mainWindow, "update-error", {
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    } finally {
        updateCheckInProgress = false;
    }
}

/**
 * Send update status to renderer process
 */
function sendStatusToWindow(
    mainWindow: BrowserWindow | null,
    event: string,
    data?: any
) {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send("auto-updater-event", {
            event,
            data,
        });
    }
}

/**
 * Download update (called from renderer)
 */
export function downloadUpdate(): void {
    autoUpdater.downloadUpdate();
}

/**
 * Quit and install update (called from renderer)
 */
export function quitAndInstall(): void {
    autoUpdater.quitAndInstall(false, true);
}
