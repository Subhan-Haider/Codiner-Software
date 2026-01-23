import { z } from "zod";
import { ToolDefinition, AgentContext } from "./types";

const getDatabaseSchemaSchema = z.object({});

const XML_TAG = "<codiner-database-schema></codiner-database-schema>";

export const getDatabaseSchemaTool: ToolDefinition<
  z.infer<typeof getDatabaseSchemaSchema>
> = {
  name: "get_database_schema",
  description: "Fetch the database schema (disabled - Supabase removed)",
  inputSchema: getDatabaseSchemaSchema,
  defaultConsent: "always",
  isEnabled: () => false, // Disabled since Supabase was removed

  getConsentPreview: () => "Get database schema",

  buildXml: (_args, _isComplete) => {
    return XML_TAG;
  },

  execute: async (_args, _ctx: AgentContext) => {
    throw new Error("Database schema tool is disabled (Supabase integration removed)");
  },
};
