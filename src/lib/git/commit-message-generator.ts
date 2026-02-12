/**
 * AI Commit Message Generator
 * Analyzes git changes and generates professional commit messages
 */

import { exec } from "child_process";
import { promisify } from "util";
import log from "electron-log";

const execAsync = promisify(exec);
const logger = log.scope("commit-generator");

interface GitDiff {
    file: string;
    additions: number;
    deletions: number;
    changes: string;
}

interface CommitMessageSuggestion {
    message: string;
    type: string;
    scope?: string;
    description: string;
    confidence: number;
}

/**
 * Get git diff for staged files
 */
export async function getStagedDiff(projectPath: string): Promise<string> {
    try {
        const { stdout } = await execAsync("git diff --cached", {
            cwd: projectPath,
        });
        return stdout;
    } catch (error) {
        logger.error("Failed to get git diff:", error);
        throw new Error("Failed to get staged changes");
    }
}

/**
 * Get list of staged files with stats
 */
export async function getStagedFiles(
    projectPath: string,
): Promise<GitDiff[]> {
    try {
        const { stdout } = await execAsync("git diff --cached --numstat", {
            cwd: projectPath,
        });

        const files: GitDiff[] = [];
        const lines = stdout.trim().split("\n").filter(Boolean);

        for (const line of lines) {
            const [additions, deletions, file] = line.split("\t");
            files.push({
                file,
                additions: parseInt(additions) || 0,
                deletions: parseInt(deletions) || 0,
                changes: "",
            });
        }

        return files;
    } catch (error) {
        logger.error("Failed to get staged files:", error);
        return [];
    }
}

/**
 * Analyze changes and determine commit type
 */
export function analyzeCommitType(diff: string, files: GitDiff[]): string {
    const diffLower = diff.toLowerCase();

    // Check for specific patterns
    if (diffLower.includes("fix") || diffLower.includes("bug")) {
        return "fix";
    }

    if (
        diffLower.includes("test") ||
        files.some((f) => f.file.includes("test") || f.file.includes("spec"))
    ) {
        return "test";
    }

    if (
        diffLower.includes("doc") ||
        files.some((f) => f.file.endsWith(".md") || f.file.includes("README"))
    ) {
        return "docs";
    }

    if (
        diffLower.includes("style") ||
        diffLower.includes("format") ||
        files.some((f) => f.file.endsWith(".css") || f.file.endsWith(".scss"))
    ) {
        return "style";
    }

    if (diffLower.includes("refactor")) {
        return "refactor";
    }

    if (diffLower.includes("perf") || diffLower.includes("optimize")) {
        return "perf";
    }

    if (
        files.some(
            (f) =>
                f.file.includes("build") ||
                f.file.includes("webpack") ||
                f.file.includes("vite") ||
                f.file.includes("package.json"),
        )
    ) {
        return "build";
    }

    if (files.some((f) => f.file.includes(".github") || f.file.includes("ci"))) {
        return "ci";
    }

    // Default to feat for new files or significant additions
    const totalAdditions = files.reduce((sum, f) => sum + f.additions, 0);
    const totalDeletions = files.reduce((sum, f) => sum + f.deletions, 0);

    if (totalAdditions > totalDeletions * 2) {
        return "feat";
    }

    return "chore";
}

/**
 * Extract scope from file paths
 */
export function extractScope(files: GitDiff[]): string | undefined {
    if (files.length === 0) return undefined;

    // Common patterns for scope extraction
    const patterns = [
        /src\/components\/([^/]+)/,
        /src\/lib\/([^/]+)/,
        /src\/pages\/([^/]+)/,
        /src\/hooks\/([^/]+)/,
        /src\/utils\/([^/]+)/,
        /src\/services\/([^/]+)/,
        /src\/api\/([^/]+)/,
        /src\/([^/]+)/,
    ];

    for (const file of files) {
        for (const pattern of patterns) {
            const match = file.file.match(pattern);
            if (match) {
                return match[1].toLowerCase();
            }
        }
    }

    // If all files are in same directory, use that
    const dirs = files.map((f) => {
        const parts = f.file.split("/");
        return parts.length > 1 ? parts[0] : undefined;
    });

    const uniqueDirs = [...new Set(dirs)].filter(Boolean);
    if (uniqueDirs.length === 1) {
        return uniqueDirs[0];
    }

    return undefined;
}

/**
 * Generate commit message using Ollama
 */
export async function generateCommitMessage(
    diff: string,
    files: GitDiff[],
    ollamaHost = "http://localhost:11434",
): Promise<CommitMessageSuggestion> {
    try {
        const type = analyzeCommitType(diff, files);
        const scope = extractScope(files);

        // Build context for AI
        const fileList = files
            .map((f) => `- ${f.file} (+${f.additions}/-${f.deletions})`)
            .join("\n");

        const prompt = `You are a git commit message expert. Analyze the following code changes and generate a professional commit message.

Files changed:
${fileList}

Diff (first 2000 chars):
${diff.substring(0, 2000)}

Generate a commit message following Conventional Commits format:
<type>(<scope>): <description>

Rules:
1. Type must be one of: feat, fix, docs, style, refactor, perf, test, build, ci, chore
2. Scope is optional but recommended (e.g., auth, ui, api)
3. Description should be concise (max 72 chars)
4. Use imperative mood ("add" not "added")
5. Don't capitalize first letter
6. No period at the end

Detected type: ${type}
${scope ? `Suggested scope: ${scope}` : ""}

Respond with ONLY the commit message, nothing else.`;

        const response = await fetch(`${ollamaHost}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "qwen2.5-coder:7b",
                prompt,
                stream: false,
                options: {
                    temperature: 0.3, // Lower temperature for more consistent output
                    top_p: 0.9,
                },
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate commit message");
        }

        const data = await response.json();
        let message = data.response.trim();

        // Clean up the message
        message = message.replace(/^["']|["']$/g, ""); // Remove quotes
        message = message.split("\n")[0]; // Take first line only

        // Validate format
        const conventionalCommitRegex =
            /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\([a-z0-9-]+\))?: .+$/;

        if (!conventionalCommitRegex.test(message)) {
            // Fallback to manual construction
            const description = message.replace(/^[^:]+:\s*/, "");
            message = scope
                ? `${type}(${scope}): ${description}`
                : `${type}: ${description}`;
        }

        logger.info(`Generated commit message: ${message}`);

        return {
            message,
            type,
            scope,
            description: message.split(": ")[1] || message,
            confidence: 0.85,
        };
    } catch (error) {
        logger.error("Failed to generate commit message:", error);

        // Fallback to basic message
        const type = analyzeCommitType(diff, files);
        const scope = extractScope(files);
        const description = `update ${files.length} file${files.length > 1 ? "s" : ""}`;

        const message = scope
            ? `${type}(${scope}): ${description}`
            : `${type}: ${description}`;

        return {
            message,
            type,
            scope,
            description,
            confidence: 0.5,
        };
    }
}

/**
 * Generate multiple commit message suggestions
 */
export async function generateCommitSuggestions(
    projectPath: string,
    ollamaHost = "http://localhost:11434",
): Promise<CommitMessageSuggestion[]> {
    try {
        const diff = await getStagedDiff(projectPath);
        const files = await getStagedFiles(projectPath);

        if (files.length === 0) {
            throw new Error("No staged changes found");
        }

        // Generate primary suggestion
        const primary = await generateCommitMessage(diff, files, ollamaHost);

        // Generate alternative suggestions with different types
        const suggestions: CommitMessageSuggestion[] = [primary];

        // Add manual alternatives
        const type = analyzeCommitType(diff, files);
        const scope = extractScope(files);

        if (type !== "feat") {
            const featMessage = scope
                ? `feat(${scope}): add new functionality`
                : "feat: add new functionality";
            suggestions.push({
                message: featMessage,
                type: "feat",
                scope,
                description: "add new functionality",
                confidence: 0.6,
            });
        }

        if (type !== "fix") {
            const fixMessage = scope
                ? `fix(${scope}): resolve issue`
                : "fix: resolve issue";
            suggestions.push({
                message: fixMessage,
                type: "fix",
                scope,
                description: "resolve issue",
                confidence: 0.6,
            });
        }

        return suggestions;
    } catch (error) {
        logger.error("Failed to generate suggestions:", error);
        throw error;
    }
}

/**
 * Validate commit message format
 */
export function validateCommitMessage(message: string): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    // Check conventional commit format
    const conventionalCommitRegex =
        /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\([a-z0-9-]+\))?: .+$/;

    if (!conventionalCommitRegex.test(message)) {
        errors.push("Message must follow Conventional Commits format");
    }

    // Check length
    const firstLine = message.split("\n")[0];
    if (firstLine.length > 100) {
        errors.push("First line should be max 100 characters");
    }

    // Check capitalization
    const description = message.split(": ")[1];
    if (description && description[0] === description[0].toUpperCase()) {
        errors.push("Description should not be capitalized");
    }

    // Check period at end
    if (firstLine.endsWith(".")) {
        errors.push("First line should not end with a period");
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
