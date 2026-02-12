/**
 * Ollama Model Manager for Codiner
 * Handles model installation, detection, and management
 */

import { exec } from "child_process";
import { promisify } from "util";
import os from "os";
import log from "electron-log";

const execAsync = promisify(exec);

export interface OllamaModel {
    name: string;
    size: number;
    modified_at: string;
    digest?: string;
}

export interface ModelRecommendation {
    name: string;
    displayName: string;
    bestFor: string;
    ramNeeded: string;
    sizeGB: number;
    recommended: boolean;
}

const logger = log.scope("ollama-manager");

/**
 * Get the command to run ollama, using absolute path if necessary on Windows
 */
/**
 * Get the command to run ollama, using absolute path if necessary on Windows
 */
async function getOllamaCommand(customPath?: string): Promise<string> {
    if (customPath) {
        // Should verify it exists if it's an absolute path
        if (customPath.includes("/") || customPath.includes("\\")) {
            return `"${customPath}"`;
        }
        return customPath;
    }

    if (os.platform() !== "win32") return "ollama";

    try {
        await execAsync("ollama --version");
        return "ollama";
    } catch {
        const localAppData = process.env.LOCALAPPDATA || "";
        const commonPaths = [
            `${localAppData}\\Programs\\Ollama\\ollama.exe`,
            `${os.homedir()}\\AppData\\Local\\Ollama\\ollama.exe`,
            "C:\\Program Files\\Ollama\\ollama.exe",
        ];

        const { existsSync } = await import("fs");
        for (const p of commonPaths) {
            if (existsSync(p)) return `"${p}"`;
        }
    }
    return "ollama";
}

/**
 * Check if Ollama is installed on the system
 */
export async function checkOllamaInstalled(customPath?: string): Promise<boolean> {
    try {
        const cmd = await getOllamaCommand(customPath);
        const { stdout } = await execAsync(`${cmd} --version`);
        logger.info(`Ollama is installed: ${stdout.trim()}`);
        return true;
    } catch (error) {
        logger.warn("Ollama is not installed or not detectable");
        return false;
    }
}

/**
 * Check if Ollama service is running
 */
export async function checkOllamaRunning(): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:11434/api/tags", {
            signal: AbortSignal.timeout(3000),
        });
        return response.ok;
    } catch (error) {
        logger.warn("Ollama service is not running");
        return false;
    }
}

/**
 * Start Ollama service
 */
/**
 * Start Ollama service
 */
export async function startOllamaService(customPath?: string): Promise<void> {
    try {
        const cmd = await getOllamaCommand(customPath);
        logger.info(`Starting Ollama service with command: ${cmd} serve`);
        exec(`${cmd} serve`);
        // Wait a bit for service to start
        await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
        logger.error("Failed to start Ollama service:", error);
        throw new Error("Failed to start Ollama service");
    }
}

/**
 * Get list of installed Ollama models
 */
export async function getInstalledModels(): Promise<OllamaModel[]> {
    try {
        const response = await fetch("http://localhost:11434/api/tags");
        if (!response.ok) {
            throw new Error("Failed to fetch models");
        }
        const data = await response.json();
        logger.info(`Found ${data.models?.length || 0} installed models`);
        return data.models || [];
    } catch (error) {
        logger.error("Failed to get installed models:", error);
        throw error;
    }
}

/**
 * Install a model with progress tracking
 */
export async function installModel(
    modelName: string,
    onProgress?: (progress: string) => void,
    customPath?: string,
): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const cmd = await getOllamaCommand(customPath);
        logger.info(`Installing model: ${modelName} using ${cmd}`);

        const child = exec(`${cmd} pull ${modelName}`);

        child.stdout?.on("data", (data: Buffer) => {
            const progress = data.toString();
            logger.info(`Install progress: ${progress}`);
            onProgress?.(progress);
        });

        child.stderr?.on("data", (data: Buffer) => {
            logger.error(`Install error: ${data.toString()}`);
        });

        child.on("close", (code) => {
            if (code === 0) {
                logger.info(`Successfully installed ${modelName}`);
                resolve();
            } else {
                logger.error(`Failed to install ${modelName}, exit code: ${code}`);
                reject(new Error(`Installation failed with code ${code}`));
            }
        });

        child.on("error", (error) => {
            logger.error(`Installation error:`, error);
            reject(error);
        });
    });
}

/**
 * Delete a model
 */
export async function deleteModel(modelName: string, customPath?: string): Promise<void> {
    try {
        const cmd = await getOllamaCommand(customPath);
        logger.info(`Deleting model: ${modelName} using ${cmd}`);
        await execAsync(`${cmd} rm ${modelName}`);
        logger.info(`Successfully deleted ${modelName}`);
    } catch (error) {
        logger.error(`Failed to delete ${modelName}:`, error);
        throw new Error(`Failed to delete model: ${modelName}`);
    }
}

/**
 * Get system RAM in GB
 */
export function getSystemRAM(): number {
    const totalRAM = os.totalmem() / (1024 * 1024 * 1024);
    return Math.round(totalRAM);
}

/**
 * Get recommended models based on system specs
 */
export function getRecommendedModels(): ModelRecommendation[] {
    const ramGB = getSystemRAM();

    const allModels: ModelRecommendation[] = [
        {
            name: "qwen2.5-coder:7b",
            displayName: "Qwen 2.5 Coder 7B",
            bestFor: "Code Generation & Refactoring",
            ramNeeded: "8GB",
            sizeGB: 4.7,
            recommended: ramGB >= 8,
        },
        {
            name: "deepseek-coder:6.7b",
            displayName: "DeepSeek Coder 6.7B",
            bestFor: "Fast Code Completion",
            ramNeeded: "8GB",
            sizeGB: 3.8,
            recommended: ramGB >= 8,
        },
        {
            name: "codellama:7b",
            displayName: "CodeLlama 7B",
            bestFor: "Documentation & Explanation",
            ramNeeded: "8GB",
            sizeGB: 3.8,
            recommended: ramGB >= 8,
        },
        {
            name: "llama3.2:3b",
            displayName: "Llama 3.2 3B",
            bestFor: "Quick Tasks (Low RAM)",
            ramNeeded: "4GB",
            sizeGB: 2.0,
            recommended: ramGB < 8,
        },
        {
            name: "qwen2.5-coder:14b",
            displayName: "Qwen 2.5 Coder 14B",
            bestFor: "Complex Projects (High Quality)",
            ramNeeded: "16GB",
            sizeGB: 9.0,
            recommended: ramGB >= 16,
        },
        {
            name: "mistral:7b",
            displayName: "Mistral 7B",
            bestFor: "General Purpose & Analysis",
            ramNeeded: "8GB",
            sizeGB: 4.1,
            recommended: ramGB >= 8,
        },
    ];

    return allModels;
}

/**
 * Install recommended model pack
 */
export async function installModelPack(
    onProgress?: (model: string, progress: string) => void,
): Promise<void> {
    const ramGB = getSystemRAM();
    const modelsToInstall: string[] = [];

    if (ramGB < 8) {
        modelsToInstall.push("llama3.2:3b");
    } else if (ramGB < 16) {
        modelsToInstall.push("qwen2.5-coder:7b", "deepseek-coder:6.7b");
    } else {
        modelsToInstall.push(
            "qwen2.5-coder:14b",
            "deepseek-coder:6.7b",
            "mistral:7b",
        );
    }

    logger.info(`Installing model pack for ${ramGB}GB RAM:`, modelsToInstall);

    for (const model of modelsToInstall) {
        await installModel(model, (progress) => {
            onProgress?.(model, progress);
        });
    }
}

/**
 * Validate model name against allowed list (security)
 */
export function validateModelName(modelName: string): boolean {
    const allowedModels = [
        "qwen2.5-coder:7b",
        "qwen2.5-coder:14b",
        "deepseek-coder:6.7b",
        "codellama:7b",
        "llama3.2:3b",
        "mistral:7b",
        "nomic-embed-text",
    ];

    return allowedModels.includes(modelName);
}

/**
 * Choose best model for task type
 */
export function chooseModelForTask(
    taskType: "generate" | "refactor" | "docs" | "security" | "explain",
    installedModels: OllamaModel[],
): string {
    const modelPreferences = {
        generate: ["qwen2.5-coder:14b", "qwen2.5-coder:7b", "deepseek-coder:6.7b"],
        refactor: ["deepseek-coder:6.7b", "qwen2.5-coder:7b"],
        docs: ["codellama:7b", "qwen2.5-coder:7b"],
        security: ["mistral:7b", "qwen2.5-coder:7b"],
        explain: ["codellama:7b", "mistral:7b"],
    };

    const preferences = modelPreferences[taskType];
    const installedNames = installedModels.map((m) => m.name);

    // Find first preferred model that's installed
    for (const preferred of preferences) {
        if (installedNames.includes(preferred)) {
            return preferred;
        }
    }

    // Fallback to first installed model
    return installedModels[0]?.name || "qwen2.5-coder:7b";
}

/**
 * Get model health and performance metrics
 */
export async function getModelHealth(modelName: string): Promise<{
    available: boolean;
    latency?: number;
}> {
    const startTime = Date.now();

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: modelName,
                prompt: "test",
                stream: false,
            }),
            signal: AbortSignal.timeout(10000),
        });

        const latency = Date.now() - startTime;

        return {
            available: response.ok,
            latency,
        };
    } catch (error) {
        return {
            available: false,
        };
    }
}
