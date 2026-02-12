/**
 * IPC Handlers for Documentation Generator
 */

import { ipcMain } from "electron";
import {
    generateFullDocumentation,
    saveDocumentation,
    analyzeProjectStructure,
} from "../../lib/docs/documentation-generator";
import log from "electron-log";

const logger = log.scope("doc-generator-ipc");

export function registerDocumentationHandlers() {
    /**
     * Generate full project documentation
     */
    ipcMain.handle(
        "docs:generate-full",
        async (event, projectPath: string) => {
            try {
                logger.info(`Generating documentation for: ${projectPath}`);

                // Send progress updates
                event.sender.send("docs:progress", {
                    step: "analyzing",
                    message: "Analyzing project structure...",
                });

                const docs = await generateFullDocumentation(projectPath);

                event.sender.send("docs:progress", {
                    step: "saving",
                    message: "Saving documentation files...",
                });

                await saveDocumentation(projectPath, docs);

                event.sender.send("docs:progress", {
                    step: "complete",
                    message: "Documentation generated successfully!",
                });

                return { success: true, docs };
            } catch (error) {
                logger.error("Error generating documentation:", error);
                return {
                    success: false,
                    error: (error as Error).message,
                };
            }
        },
    );

    /**
     * Analyze project structure only
     */
    ipcMain.handle("docs:analyze-structure", async (_, projectPath: string) => {
        try {
            const structure = await analyzeProjectStructure(projectPath);
            return { success: true, structure };
        } catch (error) {
            logger.error("Error analyzing structure:", error);
            return {
                success: false,
                error: (error as Error).message,
            };
        }
    });

    /**
     * Generate specific documentation type
     */
    ipcMain.handle(
        "docs:generate-specific",
        async (
            _,
            projectPath: string,
            type: "readme" | "architecture" | "setup" | "structure",
        ) => {
            try {
                const docs = await generateFullDocumentation(projectPath);
                const content = docs[type];

                return { success: true, content };
            } catch (error) {
                logger.error(`Error generating ${type} documentation:`, error);
                return {
                    success: false,
                    error: (error as Error).message,
                };
            }
        },
    );

    logger.info("Documentation generator IPC handlers registered");
}
