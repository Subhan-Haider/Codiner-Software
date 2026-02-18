import { IpcMainInvokeEvent } from "electron";
import { Agent, AgentOptions } from "./Agent";
import { ToolSet } from "ai";
import { mcpManager } from "@/ipc/utils/mcp_manager";
import { mcpServers, chats } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { sanitizeMcpName, parseMcpToolKey } from "@/ipc/utils/mcp_tool_utils";
import { requireMcpToolConsent } from "@/ipc/utils/mcp_consent";
import { escapeXmlAttr, escapeXmlContent, AgentContext } from "./tools/types";
import log from "electron-log";
import { readSettings } from "@/main/settings";

const logger = log.scope("AgentManager");

export class AgentManager {
    private static instance: AgentManager;
    private activeAgents = new Map<number, Agent[]>();

    private constructor() { }

    public static getInstance(): AgentManager {
        if (!AgentManager.instance) {
            AgentManager.instance = new AgentManager();
        }
        return AgentManager.instance;
    }

    public async createAgent(options: AgentOptions, abortController: AbortController, event: IpcMainInvokeEvent): Promise<Agent> {
        const agent = new Agent(options, abortController, event);
        const chatId = options.chatId;

        if (!this.activeAgents.has(chatId)) {
            this.activeAgents.set(chatId, []);
        }
        this.activeAgents.get(chatId)!.push(agent);

        return agent;
    }

    public async getMcpTools(event: IpcMainInvokeEvent, ctx: AgentContext): Promise<ToolSet> {
        const mcpToolSet: ToolSet = {};
        try {
            const servers = await db
                .select()
                .from(mcpServers)
                .where(eq(mcpServers.enabled, true as any));

            for (const s of servers) {
                const client = await mcpManager.getClient(s.id);
                const toolSet = await client.tools();

                for (const [name, tool] of Object.entries(toolSet)) {
                    const key = `${sanitizeMcpName(s.name || "")}__${sanitizeMcpName(name)}`;
                    const original = tool;

                    mcpToolSet[key] = {
                        description: original?.description,
                        inputSchema: original?.inputSchema,
                        execute: async (args: any, execCtx: any) => {
                            const inputPreview =
                                typeof args === "string"
                                    ? args
                                    : Array.isArray(args)
                                        ? args.join(" ")
                                        : JSON.stringify(args).slice(0, 500);

                            const ok = await requireMcpToolConsent(event, {
                                serverId: s.id,
                                serverName: s.name,
                                toolName: name,
                                toolDescription: original?.description,
                                inputPreview,
                            });

                            if (!ok) throw new Error(`User declined running tool ${key}`);

                            const { serverName, toolName } = parseMcpToolKey(key);
                            const content = JSON.stringify(args, null, 2);
                            ctx.onXmlComplete(
                                `<codiner-mcp-tool-call server="${serverName}" tool="${toolName}">\n${content}\n</codiner-mcp-tool-call>`,
                            );

                            const res = await original.execute?.(args, execCtx);
                            const resultStr = typeof res === "string" ? res : JSON.stringify(res);

                            ctx.onXmlComplete(
                                `<codiner-mcp-tool-result server="${serverName}" tool="${toolName}">\n${resultStr}\n</codiner-mcp-tool-result>`,
                            );

                            return resultStr;
                        },
                    };
                }
            }
        } catch (e) {
            logger.warn("Failed building MCP toolset", e);
        }
        return mcpToolSet;
    }

    public async getConnectedProviders(): Promise<string[]> {
        const settings = readSettings();
        const providers = Object.keys(settings.providerSettings).filter(p => !!settings.providerSettings[p].apiKey?.value);
        return providers;
    }

    public clearAgents(chatId: number) {
        this.activeAgents.delete(chatId);
    }
}
