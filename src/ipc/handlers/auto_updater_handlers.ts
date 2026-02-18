import { ipcMain, IpcMainInvokeEvent } from "electron";
import {
    checkForUpdates,
    downloadUpdate,
    quitAndInstall,
} from "../../main/auto_updater";
import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";
import { BrowserWindow } from "electron";

const logger = log.scope("auto_updater_handlers");
const handle = createLoggedHandler(logger);

export function registerAutoUpdaterHandlers() {
    // Check for updates manually
    handle("auto-updater:check-for-updates", async (event: IpcMainInvokeEvent) => {
        const mainWindow = BrowserWindow.fromWebContents(event.sender);
        await checkForUpdates(mainWindow, true);
        return { success: true };
    });

    // Download update
    handle("auto-updater:download-update", async () => {
        downloadUpdate();
        return { success: true };
    });

    // Quit and install
    handle("auto-updater:quit-and-install", async () => {
        quitAndInstall();
        return { success: true };
    });
}
