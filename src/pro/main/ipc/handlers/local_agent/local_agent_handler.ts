/**
 * Local Agent v2 Handler
 * Main orchestrator for tool-based agent mode with parallel execution
 */

import { IpcMainInvokeEvent } from "electron";
import { streamText, ToolSet, stepCountIs, ModelMessage } from "ai";
import log from "electron-log";
import { db } from "@/db";
import { chats, messages } from "@/db/schema";
import { eq } from "drizzle-orm";

import { isCodinerProEnabled } from "@/lib/schemas";
import { readSettings } from "@/main/settings";
import { getCodinerAppPath } from "@/paths/paths";
import { getModelClient } from "@/ipc/utils/get_model_client";
import { safeSend } from "@/ipc/utils/safe_sender";
import { getMaxTokens, getTemperature } from "@/ipc/utils/token_utils";
import { getProviderOptions, getAiHeaders } from "@/ipc/utils/provider_options";

import {
  AgentToolName,
  buildAgentToolSet,
  requireAgentToolConsent,
  clearPendingConsentsForChat,
} from "./tool_definitions";
import {
  deployAllFunctionsIfNeeded,
  commitAllChanges,
} from "./processors/file_operations";
import { mcpManager } from "@/ipc/utils/mcp_manager";
import { mcpServers } from "@/db/schema";
import { requireMcpToolConsent } from "@/ipc/utils/mcp_consent";
import { getAiMessagesJsonIfWithinLimit } from "@/ipc/utils/ai_messages_utils";

import type { ChatStreamParams, ChatResponseEnd } from "@/ipc/ipc_types";
import {
  AgentContext,
  parsePartialJson,
  escapeXmlAttr,
  escapeXmlContent,
} from "./tools/types";
import { TOOL_DEFINITIONS } from "./tool_definitions";
import { parseAiMessagesJson } from "@/ipc/utils/ai_messages_utils";
import { parseMcpToolKey, sanitizeMcpName } from "@/ipc/utils/mcp_tool_utils";

const logger = log.scope("local_agent_handler");

// ============================================================================
// Tool Streaming State Management
// ============================================================================

/**
 * Track streaming state per tool call ID
 */
interface ToolStreamingEntry {
  toolName: string;
  argsAccumulated: string;
}
const toolStreamingEntries = new Map<string, ToolStreamingEntry>();

function getOrCreateStreamingEntry(
  id: string,
  toolName?: string,
): ToolStreamingEntry | undefined {
  let entry = toolStreamingEntries.get(id);
  if (!entry && toolName) {
    entry = {
      toolName,
      argsAccumulated: "",
    };
    toolStreamingEntries.set(id, entry);
  }
  return entry;
}

function cleanupStreamingEntry(id: string): void {
  toolStreamingEntries.delete(id);
}

function findToolDefinition(toolName: string) {
  return TOOL_DEFINITIONS.find((t) => t.name === toolName);
}

/**
 * Handle a chat stream in local-agent mode
 */
export async function handleLocalAgentStream(
  event: IpcMainInvokeEvent,
  req: ChatStreamParams,
  abortController: AbortController,
  {
    placeholderMessageId,
    systemPrompt,
  }: { placeholderMessageId: number; systemPrompt: string },
): Promise<void> {
  const settings = readSettings();

  // Check Pro status
  if (!isCodinerProEnabled(settings)) {
    safeSend(event.sender, "chat:response:error", {
      chatId: req.chatId,
      error:
        "Agent v2 requires Codiner Pro. Please enable Codiner Pro in Settings → Pro.",
    });
    return;
  }

  // Get the chat and app
  const chat = await db.query.chats.findFirst({
    where: eq(chats.id, req.chatId),
    with: {
      messages: {
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      },
      app: true,
    },
  });

  if (!chat || !chat.app) {
    throw new Error(`Chat not found: ${req.chatId}`);
  }

  const appPath = getCodinerAppPath(chat.app.path);

  // Send initial message update
  safeSend(event.sender, "chat:response:chunk", {
    chatId: req.chatId,
    messages: chat.messages,
  });

  try {
    const manager = AgentManager.getInstance();
    const agent = await manager.createAgent({
      chatId: chat.id,
      appId: chat.app.id,
      appPath,
      systemPrompt,
      placeholderMessageId,
    }, abortController, event);

    const ctx = agent.getContext();
    const mcpTools = await manager.getMcpTools(event, ctx);

    await agent.run(mcpTools);

    // After agent completes, run final processors
    await deployAllFunctionsIfNeeded(ctx);
    const commitResult = await commitAllChanges(ctx, ctx.chatSummary);

    if (commitResult.commitHash) {
      await db
        .update(messages)
        .set({ commitHash: commitResult.commitHash })
        .where(eq(messages.id, placeholderMessageId));
    }

    // Mark as approved (auto-approve for local-agent)
    await db
      .update(messages)
      .set({ approvalState: "approved" })
      .where(eq(messages.id, placeholderMessageId));

    // Send completion
    safeSend(event.sender, "chat:response:end", {
      chatId: req.chatId,
      updatedFiles: true,
    } satisfies ChatResponseEnd);

  } catch (error) {
    clearPendingConsentsForChat(req.chatId);

    if (abortController.signal.aborted) {
      const currentMsg = await db.query.messages.findFirst({
        where: eq(messages.id, placeholderMessageId)
      });
      if (currentMsg?.content) {
        await db
          .update(messages)
          .set({ content: `${currentMsg.content}\n\n[Response cancelled by user]` })
          .where(eq(messages.id, placeholderMessageId));
      }
      return;
    }

    logger.error("Local agent error:", error);
    safeSend(event.sender, "chat:response:error", {
      chatId: req.chatId,
      error: `Error: ${error}`,
    });
  } finally {
    AgentManager.getInstance().clearAgents(req.chatId);
  }
}

async function updateResponseInDb(messageId: number, content: string) {
  await db
    .update(messages)
    .set({ content })
    .where(eq(messages.id, messageId))
    .catch((err) => logger.error("Failed to update message", err));
}

function sendResponseChunk(
  event: IpcMainInvokeEvent,
  chatId: number,
  chat: any,
  fullResponse: string,
) {
  const currentMessages = [...chat.messages];
  if (currentMessages.length > 0) {
    const lastMsg = currentMessages[currentMessages.length - 1];
    if (lastMsg.role === "assistant") {
      lastMsg.content = fullResponse;
    }
  }
  safeSend(event.sender, "chat:response:chunk", {
    chatId,
    messages: currentMessages,
  });
}

async function getMcpTools(
  event: IpcMainInvokeEvent,
  ctx: AgentContext,
): Promise<ToolSet> {
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
            try {
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

              // Emit XML for UI (MCP tools don't stream, so use onXmlComplete directly)
              const { serverName, toolName } = parseMcpToolKey(key);
              const content = JSON.stringify(args, null, 2);
              ctx.onXmlComplete(
                `<codiner-mcp-tool-call server="${serverName}" tool="${toolName}">\n${content}\n</codiner-mcp-tool-call>`,
              );

              const res = await original.execute?.(args, execCtx);
              const resultStr =
                typeof res === "string" ? res : JSON.stringify(res);

              ctx.onXmlComplete(
                `<codiner-mcp-tool-result server="${serverName}" tool="${toolName}">\n${resultStr}\n</codiner-mcp-tool-result>`,
              );

              return resultStr;
            } catch (error) {
              const errorMessage =
                error instanceof Error ? error.message : String(error);
              const errorStack =
                error instanceof Error && error.stack ? error.stack : "";
              ctx.onXmlComplete(
                `<codiner-output type="error" message="MCP tool '${key}' failed: ${escapeXmlAttr(errorMessage)}">${escapeXmlContent(errorStack || errorMessage)}</codiner-output>`,
              );
              throw error;
            }
          },
        };
      }
    }
  } catch (e) {
    logger.warn("Failed building MCP toolset for local-agent", e);
  }

  return mcpToolSet;
}
