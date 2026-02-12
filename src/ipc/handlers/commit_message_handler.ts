/**
 * IPC Handlers for AI Commit Message Generator
 */

import { ipcMain } from "electron";
import {
    generateCommitSuggestions,
    getStagedFiles,
    validateCommitMessage,
} from "../../lib/git/commit-message-generator";
import log from "electron-log";

const logger = log.scope("commit-generator-ipc");

export function registerCommitMessageHandlers() {
    /**
     * Generate commit message suggestions
     */
    ipcMain.handle(
        "git:generate-commit-message",
        async (_, projectPath: string) => {
            try {
                logger.info(`Generating commit message for: ${projectPath}`);
                const suggestions = await generateCommitSuggestions(projectPath);
                return { success: true, suggestions };
            } catch (error) {
                logger.error("Error generating commit message:", error);
                return {
                    success: false,
                    error: (error as Error).message,
                };
            }
        },
    );

    /**
     * Get staged files
     */
    ipcMain.handle("git:get-staged-files", async (_, projectPath: string) => {
        try {
            const files = await getStagedFiles(projectPath);
            return { success: true, files };
        } catch (error) {
            logger.error("Error getting staged files:", error);
            return {
                success: false,
                error: (error as Error).message,
            };
        }
    });

    /**
     * Validate commit message
     */
    ipcMain.handle("git:validate-commit-message", async (_, message: string) => {
        try {
            const validation = validateCommitMessage(message);
            return { success: true, validation };
        } catch (error) {
            logger.error("Error validating commit message:", error);
            return {
                success: false,
                error: (error as Error).message,
            };
        }
    });

    logger.info("Commit message generator IPC handlers registered");
}
