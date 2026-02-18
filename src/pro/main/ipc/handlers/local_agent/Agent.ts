import { streamText, ToolSet, stepCountIs, ModelMessage } from "ai";
import log from "electron-log";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getModelClient } from "@/ipc/utils/get_model_client";
import { safeSend } from "@/ipc/utils/safe_sender";
import { getMaxTokens, getTemperature, estimateTokens, getContextWindow } from "@/ipc/utils/token_utils";
import { getProviderOptions, getAiHeaders } from "@/ipc/utils/provider_options";
import { readSettings } from "@/main/settings";
import { AgentContext, parsePartialJson } from "./tools/types";
import { buildAgentToolSet, clearPendingConsentsForChat } from "./tool_definitions";
import { parseAiMessagesJson, getAiMessagesJsonIfWithinLimit } from "@/ipc/utils/ai_messages_utils";
import { AgentToolName } from "./tool_definitions";
import { requireAgentToolConsent } from "./tool_definitions";

const logger = log.scope("Agent");

export interface AgentOptions {
    chatId: number;
    appId: number;
    appPath: string;
    systemPrompt: string;
    placeholderMessageId: number;
    model?: string;
    provider?: string;
}

export class Agent {
    private fullResponse = "";
    private streamingPreview = "";
    private inThinkingBlock = false;
    private options: AgentOptions;
    private abortController: AbortController;
    private ctx: AgentContext;
    private chatMessages: any[] = [];

    constructor(options: AgentOptions, abortController: AbortController, event: any) {
        this.options = options;
        this.abortController = abortController;

        this.ctx = {
            event,
            appPath: options.appPath,
            appId: options.appId,
            chatId: options.chatId,
            supabaseProjectId: null,
            supabaseOrganizationSlug: null,
            messageId: options.placeholderMessageId,
            isSharedModulesChanged: false,
            onXmlStream: (accumulatedXml: string) => {
                this.streamingPreview = accumulatedXml;
                this.updateUI(event);
            },
            onXmlComplete: (finalXml: string) => {
                this.fullResponse += finalXml + "\n";
                this.streamingPreview = "";
                this.updateDbAndUI(event);
            },
            requireConsent: async (params: {
                toolName: string;
                toolDescription?: string | null;
                inputPreview?: string | null;
            }) => {
                return requireAgentToolConsent(event, {
                    chatId: options.chatId,
                    toolName: params.toolName as AgentToolName,
                    toolDescription: params.toolDescription,
                    inputPreview: params.inputPreview,
                });
            },
        };
    }

    public async run(mcpTools: ToolSet = {}): Promise<void> {
        const settings = readSettings();
        const { modelClient } = await getModelClient(
            this.options.model && this.options.provider
                ? { name: this.options.model, provider: this.options.provider }
                : settings.selectedModel,
            settings
        );

        const agentTools = buildAgentToolSet(this.ctx);
        const allTools: ToolSet = { ...agentTools, ...mcpTools };

        const chat = await db.query.chats.findFirst({
            where: (chats, { eq }) => eq(chats.id, this.options.chatId),
            with: {
                messages: {
                    orderBy: (messages, { asc }) => [asc(messages.createdAt)],
                },
            },
        });

        if (!chat) throw new Error("Chat not found");
        this.chatMessages = [...chat.messages];

        const fullMessageHistory: ModelMessage[] = chat.messages
            .filter((msg) => msg.content || msg.aiMessagesJson)
            .flatMap((msg) => parseAiMessagesJson(msg));

        // Context Window Management
        const contextWindow = await getContextWindow();
        const maxTokens = (await getMaxTokens(settings.selectedModel)) || 4096;
        const systemTokens = estimateTokens(this.options.systemPrompt);

        // Reserve space for response and buffer
        const availableTokens = contextWindow - maxTokens - systemTokens - 2000;

        // Truncate history to fit context
        const messageHistory: ModelMessage[] = [];
        let currentTokens = 0;

        // Always iterate from newest to oldest
        for (let i = fullMessageHistory.length - 1; i >= 0; i--) {
            const msg = fullMessageHistory[i];
            const tokens = this.estimateModelMessageTokens(msg);

            // If this message fits, add it. Otherwise stop.
            if (currentTokens + tokens > availableTokens) {
                if (messageHistory.length === 0) {
                    // Ensure at least one message validation if possible or log warning
                    logger.warn("Message history truncation dropped all messages or single message too large");
                }
                break;
            }

            messageHistory.unshift(msg);
            currentTokens += tokens;
        }

        const streamResult = streamText({
            model: modelClient.model,
            headers: getAiHeaders({
                builtinProviderId: modelClient.builtinProviderId,
            }),
            providerOptions: getProviderOptions({
                codinerAppId: this.options.appId,
                codinerDisableFiles: true,
                files: [],
                mentionedAppsCodebases: [],
                builtinProviderId: modelClient.builtinProviderId,
                settings,
            }),
            maxOutputTokens: maxTokens,
            temperature: await getTemperature(settings.selectedModel),
            maxRetries: 2,
            system: this.options.systemPrompt,
            messages: messageHistory,
            tools: allTools,
            stopWhen: stepCountIs(25),
            abortSignal: this.abortController.signal,
            onFinish: async (response: any) => {
                const totalTokens = response.usage?.totalTokens;
                if (typeof totalTokens === "number") {
                    await db
                        .update(messages)
                        .set({ maxTokensUsed: totalTokens })
                        .where(eq(messages.id, this.options.placeholderMessageId))
                        .catch((err) => logger.error("Failed to save token count", err));
                }

                // Save AI messages JSON
                try {
                    const finishedResult = (await streamResult.response) as any;
                    const aiMessagesJson = getAiMessagesJsonIfWithinLimit(finishedResult.messages);
                    if (aiMessagesJson) {
                        await db
                            .update(messages)
                            .set({ aiMessagesJson })
                            .where(eq(messages.id, this.options.placeholderMessageId));
                    }
                } catch (err) {
                    logger.warn("Failed to save AI messages JSON:", err);
                }
            },
        });

        for await (const part of streamResult.fullStream) {
            if (this.abortController.signal.aborted) {
                clearPendingConsentsForChat(this.options.chatId);
                break;
            }

            let chunk = "";
            if (this.inThinkingBlock && !["reasoning-delta", "reasoning-end", "reasoning-start"].includes(part.type)) {
                chunk = "</think>\n";
                this.inThinkingBlock = false;
            }

            switch (part.type) {
                case "text-delta":
                    chunk += part.text;
                    break;
                case "reasoning-start":
                    if (!this.inThinkingBlock) { chunk = "<think>"; this.inThinkingBlock = true; }
                    break;
                case "reasoning-delta":
                    if (!this.inThinkingBlock) { chunk = "<think>"; this.inThinkingBlock = true; }
                    chunk += part.text;
                    break;
                case "reasoning-end":
                    if (this.inThinkingBlock) { chunk = "</think>\n"; this.inThinkingBlock = false; }
                    break;
                case "tool-input-start": break; // Managed by SDK
                case "tool-input-delta": break; // Managed by SDK
                case "tool-input-end": break; // Managed by SDK
            }

            if (chunk) {
                this.fullResponse += chunk;
                await this.updateDbAndUI(this.ctx.event);
            }
        }

        if (this.inThinkingBlock) {
            this.fullResponse += "</think>\n";
            await this.updateDbAndUI(this.ctx.event);
        }
    }

    private estimateModelMessageTokens(msg: ModelMessage): number {
        if (typeof msg.content === 'string') {
            return estimateTokens(msg.content);
        }
        if (Array.isArray(msg.content)) {
            return msg.content.reduce((acc, part) => {
                if (part.type === 'text') return acc + estimateTokens(part.text);
                if (part.type === 'tool-call') return acc + estimateTokens(JSON.stringify(part.args)) + estimateTokens(part.toolName);
                if (part.type === 'tool-result') {
                    // Convert result to string estimation
                    const resultStr = typeof part.result === 'string' ? part.result : JSON.stringify(part.result);
                    return acc + estimateTokens(resultStr);
                }
                if (part.type === 'image') return acc + 1000;
                return acc;
            }, 0);
        }
        return 0;
    }

    private async updateDbAndUI(event: any) {
        await db
            .update(messages)
            .set({ content: this.fullResponse })
            .where(eq(messages.id, this.options.placeholderMessageId))
            .catch((err) => logger.error("Failed to update message", err));
        this.updateUI(event);
    }

    private updateUI(event: any) {
        const displayContent = this.fullResponse + this.streamingPreview;
        const currentMessages = [...this.chatMessages];
        if (currentMessages.length > 0) {
            const lastMsg = currentMessages[currentMessages.length - 1];
            if (lastMsg.id === this.options.placeholderMessageId) {
                lastMsg.content = displayContent;
            } else {
                // If the placeholder is not the last message, find it
                const msg = currentMessages.find(m => m.id === this.options.placeholderMessageId);
                if (msg) msg.content = displayContent;
            }
        }

        safeSend(event.sender, "chat:response:chunk", {
            chatId: this.options.chatId,
            messages: currentMessages,
        });
    }

    public getContext(): AgentContext {
        return this.ctx;
    }

    public getFullResponse(): string {
        return this.fullResponse;
    }
}
