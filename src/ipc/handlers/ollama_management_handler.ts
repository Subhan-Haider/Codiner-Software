/**
 * IPC Handlers for Ollama Model Management
 */

import { ipcMain } from "electron";
import {
    checkOllamaInstalled,
    checkOllamaRunning,
    startOllamaService,
    getInstalledModels,
    installModel,
    deleteModel,
    getSystemRAM,
    getRecommendedModels,
    installModelPack,
    validateModelName,
    chooseModelForTask,
    getModelHealth,
} from "../../lib/ai/ollama-manager";
import log from "electron-log";

const logger = log.scope("ollama-ipc");

export function registerOllamaManagementHandlers() {
    /**
     * Check if Ollama is installed
     */
    ipcMain.handle("ollama:check-installed", async (_, customPath?: string) => {
        try {
            return await checkOllamaInstalled(customPath);
        } catch (error) {
            logger.error("Error checking Ollama installation:", error);
            return false;
        }
    });

    /**
     * Check if Ollama service is running
     */
    ipcMain.handle("ollama:check-running", async () => {
        try {
            return await checkOllamaRunning();
        } catch (error) {
            logger.error("Error checking Ollama status:", error);
            return false;
        }
    });

    /**
     * Start Ollama service
     */
    ipcMain.handle("ollama:start-service", async (_, customPath?: string) => {
        try {
            await startOllamaService(customPath);
            return { success: true };
        } catch (error) {
            logger.error("Error starting Ollama service:", error);
            return { success: false, error: (error as Error).message };
        }
    });

    /**
     * Get installed models
     */
    ipcMain.handle("ollama:get-installed-models", async () => {
        try {
            return await getInstalledModels();
        } catch (error) {
            logger.error("Error getting installed models:", error);
            throw error;
        }
    });

    /**
     * Install a model
     */
    ipcMain.handle(
        "ollama:install-model",
        async (event, modelName: string) => {
            try {
                // Validate model name for security
                if (!validateModelName(modelName)) {
                    throw new Error(`Invalid model name: ${modelName}`);
                }

                await installModel(modelName, (progress) => {
                    // Send progress updates to renderer
                    event.sender.send("ollama:install-progress", {
                        model: modelName,
                        progress,
                    });
                });

                return { success: true };
            } catch (error) {
                logger.error(`Error installing model ${modelName}:`, error);
                return { success: false, error: (error as Error).message };
            }
        },
    );

    /**
     * Delete a model
     */
    ipcMain.handle("ollama:delete-model", async (_, modelName: string) => {
        try {
            await deleteModel(modelName);
            return { success: true };
        } catch (error) {
            logger.error(`Error deleting model ${modelName}:`, error);
            return { success: false, error: (error as Error).message };
        }
    });

    /**
     * Get system RAM
     */
    ipcMain.handle("ollama:get-system-ram", () => {
        return getSystemRAM();
    });

    /**
     * Get recommended models
     */
    ipcMain.handle("ollama:get-recommended-models", () => {
        return getRecommendedModels();
    });

    /**
     * Install model pack
     */
    ipcMain.handle("ollama:install-model-pack", async (event) => {
        try {
            await installModelPack((model, progress) => {
                event.sender.send("ollama:install-progress", {
                    model,
                    progress,
                });
            });
            return { success: true };
        } catch (error) {
            logger.error("Error installing model pack:", error);
            return { success: false, error: (error as Error).message };
        }
    });

    /**
     * Choose best model for task
     */
    ipcMain.handle(
        "ollama:choose-model-for-task",
        async (
            _,
            taskType: "generate" | "refactor" | "docs" | "security" | "explain",
        ) => {
            try {
                const installedModels = await getInstalledModels();
                return chooseModelForTask(taskType, installedModels);
            } catch (error) {
                logger.error("Error choosing model for task:", error);
                return "qwen2.5-coder:7b"; // Fallback
            }
        },
    );

    /**
     * Get model health
     */
    ipcMain.handle("ollama:get-model-health", async (_, modelName: string) => {
        try {
            return await getModelHealth(modelName);
        } catch (error) {
            logger.error(`Error checking health for ${modelName}:`, error);
            return { available: false };
        }
    });

    logger.info("Ollama management IPC handlers registered");
}
