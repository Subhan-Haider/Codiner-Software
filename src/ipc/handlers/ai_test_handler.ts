import { generateText } from "ai";
import { getModelClient } from "../utils/get_model_client";
import { readSettings, writeSettings } from "../../main/settings";
import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";
import { parseAiErrorMessage } from "../utils/errorMessage";
import { getLanguageModels } from "../shared/language_model_helpers";

const logger = log.scope("ai_test_handler");
const handle = createLoggedHandler(logger);

export function registerAiTestHandlers() {
    handle("ai:test-connectivity", async (event: any, providerId?: string): Promise<{ success: boolean; message: string; latency?: number; capabilities?: string[] }> => {
        const startTime = Date.now();
        let settings: any;
        try {
            settings = readSettings();
            let targetModel = settings.selectedModel;

            if (providerId && providerId !== settings.selectedModel.provider) {
                const models = await getLanguageModels({ providerId });
                if (models.length === 0) {
                    throw new Error(`No models available for provider: ${providerId}`);
                }
                targetModel = {
                    provider: providerId,
                    name: models[0].apiName,
                };
            }

            const { modelClient } = await getModelClient(
                targetModel,
                settings,
            );

            const { text } = await generateText({
                model: modelClient.model,
                prompt: "Hello! If you can hear me, respond with exactly: 'Protocol connectivity established.'",
                // @ts-ignore
                maxTokens: 10,
            });

            const latency = Date.now() - startTime;
            const success = text.toLowerCase().includes("connectivity established");
            const resultMessage = success
                ? "AI systems are fully operational and communicating within normal parameters."
                : `AI responded, but with unexpected output: "${text.trim()}". Connectivity verified.`;

            // Simplified capabilities check
            const capabilities = ["Text Generation"];
            if (targetModel.provider === "openai" || targetModel.provider === "anthropic") {
                capabilities.push("Tools", "Vision", "Streaming");
            }

            // Only save to settings if it's the currently selected model being tested
            if (settings && (!providerId || providerId === settings.selectedModel.provider)) {
                writeSettings({
                    lastAiTestResult: {
                        success: true,
                        message: resultMessage,
                        timestamp: Date.now(),
                        latency,
                        capabilities,
                    } as any,
                });
            }

            return {
                success: true,
                message: resultMessage,
                latency,
                capabilities,
            };
        } catch (error: any) {
            logger.error("AI Connectivity Test Failed:", error);
            const errorMessage = parseAiErrorMessage(error);
            const fullError = `Your API is not working: ${errorMessage}`;
            const latency = Date.now() - startTime;

            // Safe check for settings
            if (settings && (!providerId || providerId === settings.selectedModel?.provider)) {
                writeSettings({
                    lastAiTestResult: {
                        success: false,
                        message: fullError,
                        timestamp: Date.now(),
                        latency,
                    } as any,
                });
            }

            return {
                success: false,
                message: fullError,
                latency,
            };
        }
    });
}
