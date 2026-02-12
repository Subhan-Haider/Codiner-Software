/**
 * IPC Handlers for Docker Generator
 */

import { ipcMain } from "electron";
import {
    generateDockerConfig,
    saveDockerConfig,
    analyzeProject,
} from "../../lib/docker/docker-generator";
import log from "electron-log";

const logger = log.scope("docker-generator-ipc");

export function registerDockerGeneratorHandlers() {
    /**
     * Generate Docker configuration
     */
    ipcMain.handle("docker:generate", async (event, projectPath: string) => {
        try {
            logger.info(`Generating Docker config for: ${projectPath}`);

            event.sender.send("docker:progress", {
                step: "analyzing",
                message: "Analyzing project...",
            });

            const config = await generateDockerConfig(projectPath);

            event.sender.send("docker:progress", {
                step: "saving",
                message: "Saving Docker files...",
            });

            await saveDockerConfig(projectPath, config);

            event.sender.send("docker:progress", {
                step: "complete",
                message: "Docker configuration generated!",
            });

            return { success: true, config };
        } catch (error) {
            logger.error("Failed to generate Docker config:", error);
            return {
                success: false,
                error: (error as Error).message,
            };
        }
    });

    /**
     * Analyze project only
     */
    ipcMain.handle("docker:analyze", async (_, projectPath: string) => {
        try {
            const info = await analyzeProject(projectPath);
            return { success: true, info };
        } catch (error) {
            logger.error("Failed to analyze project:", error);
            return {
                success: false,
                error: (error as Error).message,
            };
        }
    });

    /**
     * Preview Docker configuration
     */
    ipcMain.handle("docker:preview", async (_, projectPath: string) => {
        try {
            const config = await generateDockerConfig(projectPath);
            return { success: true, config };
        } catch (error) {
            logger.error("Failed to preview Docker config:", error);
            return {
                success: false,
                error: (error as Error).message,
            };
        }
    });

    logger.info("Docker generator IPC handlers registered");
}
