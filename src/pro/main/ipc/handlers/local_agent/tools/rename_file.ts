import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import log from "electron-log";
import { ToolDefinition, AgentContext, escapeXmlAttr } from "./types";
import { safeJoin } from "@/ipc/utils/path_utils";
import { gitAdd, gitRemove } from "@/ipc/utils/git_utils";

const logger = log.scope("rename_file");

function getFunctionNameFromPath(input: string): string {
  return path.basename(path.extname(input) ? path.dirname(input) : input);
}

const renameFileSchema = z.object({
  from: z.string().describe("The current file path"),
  to: z.string().describe("The new file path"),
});

export const renameFileTool: ToolDefinition<z.infer<typeof renameFileSchema>> =
{
  name: "rename_file",
  description: "Rename or move a file in the codebase",
  inputSchema: renameFileSchema,
  defaultConsent: "always",

  getConsentPreview: (args) => `Rename ${args.from} to ${args.to}`,

  buildXml: (args, _isComplete) => {
    if (!args.from || !args.to) return undefined;
    return `<codiner-rename from="${escapeXmlAttr(args.from)}" to="${escapeXmlAttr(args.to)}"></codiner-rename>`;
  },

  execute: async (args, ctx: AgentContext) => {
    const fromFullPath = safeJoin(ctx.appPath, args.from);
    const toFullPath = safeJoin(ctx.appPath, args.to);

    // Ensure target directory exists
    const dirPath = path.dirname(toFullPath);
    fs.mkdirSync(dirPath, { recursive: true });

    if (fs.existsSync(fromFullPath)) {
      fs.renameSync(fromFullPath, toFullPath);
      logger.log(
        `Successfully renamed file: ${fromFullPath} -> ${toFullPath}`,
      );

      // Update git
      await gitAdd({ path: ctx.appPath, filepath: args.to });
      try {
        await gitRemove({ path: ctx.appPath, filepath: args.from });
      } catch (error) {
        logger.warn(`Failed to git remove old file ${args.from}:`, error);
      }
    } else {
      throw new Error(`Source file does not exist: ${args.from}`);
    }

    return `Successfully renamed ${args.from} to ${args.to}`;
  },
};
