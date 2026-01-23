import { createLoggedHandler } from "./safe_handle";
import log from "electron-log";
import * as path from "path";
import { db } from "../../db";
import { apps, chats, messages } from "../../db/schema";
import { eq, and, like, desc } from "drizzle-orm";
import type { SecurityReviewResult, SecurityFinding } from "../ipc_types";
import { getUserDataPath, getCodinerAppPath } from "../../paths/paths";
import * as fs from "fs";

const logger = log.scope("security_handlers");
const handle = createLoggedHandler(logger);

export function registerSecurityHandlers() {
  handle("app:fetch-url", async (_, url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText} (${response.status})`);
      }
      return await response.text();
    } catch (error: any) {
      logger.error(`Error fetching URL ${url}:`, error);
      throw new Error(`Failed to fetch: ${error.message}`);
    }
  });

  handle("get-latest-security-review", async (event, appId: number) => {
    // ... (existing code remains if I use replace_file_content carefully)
    if (!appId) {
      throw new Error("App ID is required");
    }

    const result = await db
      .select({
        content: messages.content,
        createdAt: messages.createdAt,
        chatId: messages.chatId,
      })
      .from(messages)
      .innerJoin(chats, eq(messages.chatId, chats.id))
      .where(
        and(
          eq(chats.appId, appId),
          eq(messages.role, "assistant"),
          like(messages.content, "%<codiner-security-finding%"),
        ),
      )
      .orderBy(desc(messages.createdAt))
      .limit(1);

    if (result.length === 0) {
      throw new Error("No security review found for this app");
    }

    const message = result[0];
    const findings = parseSecurityFindings(message.content);

    if (findings.length === 0) {
      throw new Error("No security review found for this app");
    }

    return {
      findings,
      timestamp: message.createdAt.toISOString(),
      chatId: message.chatId,
    } satisfies SecurityReviewResult;
  });

  handle(
    "app:run-security-audit",
    async (event, appId: number): Promise<SecurityFinding[]> => {
      const app = await db.query.apps.findFirst({ where: eq(apps.id, appId) });
      if (!app) throw new Error("App not found");

      const appPath = path.join(getUserDataPath(), "apps", app.path); // Simplified path logic for illustration, should match getCodinerAppPath
      // Wait, let's use the actual getCodinerAppPath
      return performLocalSecurityAudit(appId, app.path);
    },
  );
}



async function performLocalSecurityAudit(
  appId: number,
  folderName: string,
): Promise<SecurityFinding[]> {
  const findings: SecurityFinding[] = [];
  const appPath = getCodinerAppPath(folderName);

  if (!fs.existsSync(appPath)) {
    throw new Error(`App path does not exist: ${appPath}`);
  }

  // Scan for secrets in common files
  const secretPatterns = [
    { name: "AWS Key", regex: /AKIA[0-9A-Z]{16}/g, level: "critical" },
    {
      name: "Generic Secret",
      regex: /secret|password|api_key|apikey/i,
      level: "medium",
    },
    {
      name: "Firebase Config",
      regex: /apiKey: "AIza[0-9A-Za-z-_]{35}"/,
      level: "high",
    },
  ];

  const filesToScan = [".env", "package.json", "src/config.ts", "src/main.ts"];

  for (const file of filesToScan) {
    const fullPath = path.join(appPath, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      for (const pattern of secretPatterns) {
        if (pattern.regex.test(content)) {
          findings.push({
            title: `Potential ${pattern.name} found`,
            level: pattern.level as any,
            description: `A pattern matching ${pattern.name} was detected in ${file}. Avoid committing secrets to version control.`,
          });
        }
      }
    }
  }

  // Check for insecure dependencies in package.json
  const packageJsonPath = path.join(appPath, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    if (pkg.dependencies?.["http-server"]) {
      findings.push({
        title: "Development server in production",
        level: "medium",
        description:
          "http-server is detected in dependencies. Ensure it's not used in production environments.",
      });
    }
  }

  if (findings.length === 0) {
    findings.push({
      title: "No major issues found",
      level: "low",
      description:
        "Local audit completed. No obvious secrets or common vulnerabilities detected.",
    });
  }

  return findings;
}

function parseSecurityFindings(content: string): SecurityFinding[] {
  const findings: SecurityFinding[] = [];

  // Regex to match codiner-security-finding tags
  // Using lazy quantifier with proper boundaries to prevent catastrophic backtracking
  const regex =
    /<codiner-security-finding\s+title="([^"]+)"\s+level="(critical|high|medium|low)">([\s\S]*?)<\/codiner-security-finding>/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const [, title, level, description] = match;
    findings.push({
      title: title.trim(),
      level: level as "critical" | "high" | "medium" | "low",
      description: description.trim(),
    });
  }

  return findings;
}
