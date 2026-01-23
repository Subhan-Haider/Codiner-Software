import { z } from "zod";
import { spawn } from "child_process";
import {
    type ToolDefinition,
    type AgentContext,
    escapeXmlAttr,
} from "./types";

export const firebaseCommandTool: ToolDefinition = {
    name: "firebase-command",
    description: "Run a Firebase CLI command (e.g., 'deploy', 'use', 'init', 'firestore:rules:update').",
    inputSchema: z.object({
        command: z.string().describe("The firebase command to run (without 'firebase' prefix, e.g. 'deploy --only hosting')"),
    }),
    defaultConsent: "ask",
    getConsentPreview: (args) => `firebase ${args.command}`,
    buildXml: (args, isComplete) => {
        const command = args.command ?? "";
        if (isComplete) {
            return `<codiner-firebase-command command="${escapeXmlAttr(command)}" />`;
        }
        return `<codiner-firebase-command command="${escapeXmlAttr(command)}" ...`;
    },
    execute: async (args, ctx: AgentContext) => {
        const { command } = args;
        const fullCommand = `firebase ${command}`;

        try {
            const result = await new Promise<string>((resolve, reject) => {
                const process = spawn(fullCommand, {
                    shell: true,
                    cwd: ctx.appPath,
                    stdio: ["ignore", "pipe", "pipe"],
                });

                let output = "";
                process.stdout?.on("data", (data) => (output += data.toString()));
                process.stderr?.on("data", (data) => (output += data.toString()));

                process.on("close", (code) => {
                    if (code === 0) resolve(output);
                    else reject(new Error(`Command failed with code ${code}. Output: ${output}`));
                });
            });

            ctx.onXmlComplete(
                `<codiner-output type="info" message="Firebase command: ${escapeXmlAttr(fullCommand)}">Executed successfully</codiner-output>`
            );

            return result;
        } catch (error: any) {
            throw new Error(`Firebase command failed: ${error.message}`);
        }
    },
};
