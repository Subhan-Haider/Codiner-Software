import { z } from "zod";
import { ToolDefinition } from "./types";
import { AgentManager } from "../AgentManager";
import { Agent } from "../Agent";
import log from "electron-log";

const logger = log.scope("aggregate_ai_tool");

export const aggregateAiTool: ToolDefinition = {
    name: "aggregate_ai_knowledge",
    description: "Consult ALL connected AI providers (e.g., OpenAI, Anthropic, Google) to get a diverse set of perspectives or verified information on a specific query. Returns a consolidated summary.",
    inputSchema: z.object({
        query: z.string().describe("The query or task to send to all connected AI providers."),
    }),
    defaultConsent: "always",
    execute: async (args, ctx) => {
        const manager = AgentManager.getInstance();
        const providers = await manager.getConnectedProviders();

        if (providers.length === 0) {
            return "No AI providers are currently connected with API keys.";
        }

        ctx.onXmlComplete(`<codiner-ai-aggregation query="${args.query}" providers="${providers.join(', ')}">`);

        const results = await Promise.all(providers.map(async (provider) => {
            try {
                // Spawn a hidden agent for each provider
                const agent = await manager.createAgent({
                    chatId: ctx.chatId,
                    appId: ctx.appId,
                    appPath: ctx.appPath,
                    systemPrompt: `You are a specialist providing knowledge on: ${args.query}. Be concise and factual.`,
                    placeholderMessageId: -1,
                    provider: provider,
                }, new AbortController(), ctx.event);

                await agent.run();
                const response = agent.getFullResponse();
                ctx.onXmlStream(`  <provider-response name="${provider}">${response.slice(0, 100)}...</provider-response>\n`);
                return { provider, response };
            } catch (e) {
                logger.error(`Error with provider ${provider}:`, e);
                return { provider, response: `Error: ${e}` };
            }
        }));

        const finalSummary = results.map(r => `### From ${r.provider}:\n${r.response}`).join("\n\n");
        ctx.onXmlComplete(`</codiner-ai-aggregation>`);

        return finalSummary;
    },
};
