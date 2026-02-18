import { z } from "zod";
import { ToolDefinition, AgentContext } from "./types";
import { AgentManager } from "../AgentManager";
import { messages } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const spawnSubAgentTool: ToolDefinition = {
    name: "spawn_sub_agent",
    description: "Spawn a sub-agent to handle a specific sub-task or more complex operation. Returns the result of the sub-agent's work.",
    inputSchema: z.object({
        task: z.string().describe("The specific task for the sub-agent to perform."),
        model: z.string().optional().describe("Optional model name to use for the sub-agent."),
        provider: z.string().optional().describe("Optional provider name to use for the sub-agent."),
    }),
    defaultConsent: "always",
    execute: async (args, ctx) => {
        const manager = AgentManager.getInstance();

        ctx.onXmlComplete(`<codiner-sub-agent-spawn task="${args.task}" />`);

        const agent = await manager.createAgent({
            chatId: ctx.chatId,
            appId: ctx.appId,
            appPath: ctx.appPath,
            systemPrompt: `You are a sub-agent tasked with: ${args.task}. Be concise and return only the results of your work.`,
            placeholderMessageId: -1, // No DB message for now
        }, new AbortController(), ctx.event);

        await agent.run();

        const result = agent.getFullResponse();

        ctx.onXmlComplete(`<codiner-sub-agent-result task="${args.task}">\n${result}\n</codiner-sub-agent-result>`);

        return result;
    },
};
