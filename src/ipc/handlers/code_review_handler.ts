/**
 * IPC Handlers for Code Review Bot
 */

import { ipcMain, BrowserWindow } from "electron";
import {
    performCodeReview,
    autoReviewOnSave,
} from "../../lib/review/code-review-bot";
import log from "electron-log";
import * as fs from "fs";
import * as path from "path";

const logger = log.scope("code-review-ipc");

// Track file watchers
const fileWatchers = new Map<string, fs.FSWatcher>();

export function registerCodeReviewHandlers() {
    /**
     * Perform code review on a file
     */
    ipcMain.handle(
        "code-review:review-file",
        async (_, filePath: string, useAI = true) => {
            try {
                logger.info(`Reviewing file: ${filePath}`);
                const review = await performCodeReview(filePath, useAI);
                return { success: true, review };
            } catch (error) {
                logger.error("Review failed:", error);
                return {
                    success: false,
                    error: (error as Error).message,
                };
            }
        },
    );

    /**
     * Enable auto-review on file save
     */
    ipcMain.handle(
        "code-review:enable-auto-review",
        async (event, filePath: string) => {
            try {
                // Stop existing watcher if any
                if (fileWatchers.has(filePath)) {
                    fileWatchers.get(filePath)?.close();
                }

                // Create new watcher
                const watcher = fs.watch(filePath, async (eventType) => {
                    if (eventType === "change") {
                        logger.info(`File changed, auto-reviewing: ${filePath}`);

                        await autoReviewOnSave(filePath, (review) => {
                            // Send review to renderer
                            event.sender.send("code-review:auto-review-complete", {
                                filePath,
                                review,
                            });
                        });
                    }
                });

                fileWatchers.set(filePath, watcher);

                logger.info(`Auto-review enabled for: ${filePath}`);
                return { success: true };
            } catch (error) {
                logger.error("Failed to enable auto-review:", error);
                return {
                    success: false,
                    error: (error as Error).message,
                };
            }
        },
    );

    /**
     * Disable auto-review
     */
    ipcMain.handle("code-review:disable-auto-review", async (_, filePath: string) => {
        try {
            if (fileWatchers.has(filePath)) {
                fileWatchers.get(filePath)?.close();
                fileWatchers.delete(filePath);
                logger.info(`Auto-review disabled for: ${filePath}`);
            }

            return { success: true };
        } catch (error) {
            logger.error("Failed to disable auto-review:", error);
            return {
                success: false,
                error: (error as Error).message,
            };
        }
    });

    /**
     * Review multiple files
     */
    ipcMain.handle(
        "code-review:review-multiple",
        async (event, filePaths: string[]) => {
            try {
                const reviews = [];

                for (const filePath of filePaths) {
                    event.sender.send("code-review:progress", {
                        current: reviews.length + 1,
                        total: filePaths.length,
                        file: filePath,
                    });

                    const review = await performCodeReview(filePath, true);
                    reviews.push(review);
                }

                return { success: true, reviews };
            } catch (error) {
                logger.error("Batch review failed:", error);
                return {
                    success: false,
                    error: (error as Error).message,
                };
            }
        },
    );

    logger.info("Code review IPC handlers registered");
}

/**
 * Clean up watchers on app quit
 */
export function cleanupCodeReviewWatchers() {
    fileWatchers.forEach((watcher) => watcher.close());
    fileWatchers.clear();
    logger.info("Code review watchers cleaned up");
}
