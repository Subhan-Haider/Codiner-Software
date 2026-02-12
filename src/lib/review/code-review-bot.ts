/**
 * Code Review Bot
 * Automatically reviews code on save with quality, security, and performance checks
 */

import * as fs from "fs/promises";
import * as path from "path";
import log from "electron-log";

const logger = log.scope("code-review-bot");

export interface ReviewIssue {
    severity: "critical" | "high" | "medium" | "low" | "info";
    category: "quality" | "security" | "performance" | "best-practice" | "style";
    line?: number;
    column?: number;
    message: string;
    suggestion?: string;
    code?: string;
}

export interface CodeReview {
    file: string;
    language: string;
    issues: ReviewIssue[];
    score: number; // 0-100
    summary: string;
    timestamp: Date;
}

/**
 * Detect programming language from file extension
 */
export function detectLanguage(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const languageMap: Record<string, string> = {
        ".ts": "typescript",
        ".tsx": "typescript",
        ".js": "javascript",
        ".jsx": "javascript",
        ".py": "python",
        ".java": "java",
        ".cpp": "cpp",
        ".c": "c",
        ".cs": "csharp",
        ".go": "go",
        ".rs": "rust",
        ".rb": "ruby",
        ".php": "php",
        ".swift": "swift",
        ".kt": "kotlin",
        ".sql": "sql",
        ".css": "css",
        ".scss": "scss",
        ".html": "html",
        ".json": "json",
        ".md": "markdown",
    };

    return languageMap[ext] || "unknown";
}

/**
 * Perform static analysis on code
 */
export function performStaticAnalysis(
    code: string,
    language: string,
): ReviewIssue[] {
    const issues: ReviewIssue[] = [];

    // Common security patterns
    const securityPatterns = [
        {
            pattern: /eval\(/gi,
            message: "Avoid using eval() - it's a security risk",
            severity: "critical" as const,
            category: "security" as const,
        },
        {
            pattern: /innerHTML\s*=/gi,
            message: "Using innerHTML can lead to XSS vulnerabilities",
            severity: "high" as const,
            category: "security" as const,
            suggestion: "Use textContent or createElement instead",
        },
        {
            pattern: /dangerouslySetInnerHTML/gi,
            message: "Ensure HTML is properly sanitized before using dangerouslySetInnerHTML",
            severity: "high" as const,
            category: "security" as const,
        },
        {
            pattern: /password\s*=\s*["'][^"']+["']/gi,
            message: "Hardcoded password detected - use environment variables",
            severity: "critical" as const,
            category: "security" as const,
        },
        {
            pattern: /api[_-]?key\s*=\s*["'][^"']+["']/gi,
            message: "Hardcoded API key detected - use environment variables",
            severity: "critical" as const,
            category: "security" as const,
        },
        {
            pattern: /exec\(/gi,
            message: "Using exec() can be dangerous - validate all inputs",
            severity: "high" as const,
            category: "security" as const,
        },
    ];

    // Performance patterns
    const performancePatterns = [
        {
            pattern: /console\.log\(/gi,
            message: "Remove console.log in production code",
            severity: "low" as const,
            category: "performance" as const,
            suggestion: "Use a proper logging library or remove before deployment",
        },
        {
            pattern: /for\s*\(\s*var\s+/gi,
            message: "Use 'let' or 'const' instead of 'var' in loops",
            severity: "medium" as const,
            category: "quality" as const,
        },
        {
            pattern: /==\s*(?!==)/g,
            message: "Use === instead of == for strict equality",
            severity: "medium" as const,
            category: "quality" as const,
        },
        {
            pattern: /!=\s*(?!==)/g,
            message: "Use !== instead of != for strict inequality",
            severity: "medium" as const,
            category: "quality" as const,
        },
    ];

    // TypeScript/JavaScript specific
    if (language === "typescript" || language === "javascript") {
        // Check for any type usage
        const anyTypeMatches = code.match(/:\s*any\b/g);
        if (anyTypeMatches && anyTypeMatches.length > 3) {
            issues.push({
                severity: "medium",
                category: "quality",
                message: `Excessive use of 'any' type (${anyTypeMatches.length} occurrences)`,
                suggestion: "Use specific types for better type safety",
            });
        }

        // Check for TODO comments
        const todoMatches = code.match(/\/\/\s*TODO:/gi);
        if (todoMatches) {
            issues.push({
                severity: "info",
                category: "quality",
                message: `${todoMatches.length} TODO comment(s) found`,
                suggestion: "Track TODOs in issue tracker",
            });
        }

        // Check for large functions
        const functionMatches = code.match(/function\s+\w+\s*\([^)]*\)\s*{/g);
        if (functionMatches) {
            functionMatches.forEach((match) => {
                const functionStart = code.indexOf(match);
                const functionBody = extractFunctionBody(code, functionStart);
                const lines = functionBody.split("\n").length;

                if (lines > 50) {
                    issues.push({
                        severity: "medium",
                        category: "quality",
                        message: `Function is too long (${lines} lines)`,
                        suggestion: "Consider breaking into smaller functions",
                    });
                }
            });
        }
    }

    // Apply security patterns
    securityPatterns.forEach((pattern) => {
        const matches = code.match(pattern.pattern);
        if (matches) {
            matches.forEach((match) => {
                const lineNumber = getLineNumber(code, code.indexOf(match));
                issues.push({
                    severity: pattern.severity,
                    category: pattern.category,
                    line: lineNumber,
                    message: pattern.message,
                    suggestion: pattern.suggestion,
                    code: match,
                });
            });
        }
    });

    // Apply performance patterns
    performancePatterns.forEach((pattern) => {
        const matches = code.match(pattern.pattern);
        if (matches) {
            matches.forEach((match) => {
                const lineNumber = getLineNumber(code, code.indexOf(match));
                issues.push({
                    severity: pattern.severity,
                    category: pattern.category,
                    line: lineNumber,
                    message: pattern.message,
                    suggestion: pattern.suggestion,
                    code: match,
                });
            });
        }
    });

    return issues;
}

/**
 * Get line number from character index
 */
function getLineNumber(code: string, index: number): number {
    return code.substring(0, index).split("\n").length;
}

/**
 * Extract function body (simplified)
 */
function extractFunctionBody(code: string, startIndex: number): string {
    let braceCount = 0;
    let inFunction = false;
    let body = "";

    for (let i = startIndex; i < code.length; i++) {
        const char = code[i];

        if (char === "{") {
            braceCount++;
            inFunction = true;
        }

        if (inFunction) {
            body += char;
        }

        if (char === "}") {
            braceCount--;
            if (braceCount === 0 && inFunction) {
                break;
            }
        }
    }

    return body;
}

/**
 * Review code using AI
 */
export async function reviewCodeWithAI(
    code: string,
    filePath: string,
    language: string,
    ollamaHost = "http://localhost:11434",
): Promise<ReviewIssue[]> {
    const prompt = `You are a senior software engineer performing a code review.

File: ${filePath}
Language: ${language}

Code:
\`\`\`${language}
${code.substring(0, 3000)}
\`\`\`

Perform a thorough code review focusing on:
1. **Security**: Vulnerabilities, injection risks, authentication issues
2. **Performance**: Inefficient algorithms, memory leaks, unnecessary operations
3. **Quality**: Code smells, complexity, maintainability
4. **Best Practices**: Language-specific conventions, design patterns

For each issue found, provide:
- Severity: critical/high/medium/low
- Category: security/performance/quality/best-practice
- Line number (if applicable)
- Clear message
- Actionable suggestion

Format as JSON array:
[
  {
    "severity": "high",
    "category": "security",
    "line": 15,
    "message": "SQL injection vulnerability",
    "suggestion": "Use parameterized queries"
  }
]

If no issues found, return empty array: []

IMPORTANT: Return ONLY valid JSON, no other text.`;

    try {
        const response = await fetch(`${ollamaHost}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "qwen2.5-coder:7b",
                prompt,
                stream: false,
                options: {
                    temperature: 0.3,
                    top_p: 0.9,
                },
            }),
        });

        if (!response.ok) {
            throw new Error("AI review failed");
        }

        const data = await response.json();
        let aiResponse = data.response.trim();

        // Extract JSON from response
        const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            aiResponse = jsonMatch[0];
        }

        const aiIssues = JSON.parse(aiResponse);

        return aiIssues.map((issue: any) => ({
            severity: issue.severity || "medium",
            category: issue.category || "quality",
            line: issue.line,
            message: issue.message,
            suggestion: issue.suggestion,
        }));
    } catch (error) {
        logger.error("AI review failed:", error);
        return [];
    }
}

/**
 * Calculate code quality score
 */
export function calculateScore(issues: ReviewIssue[]): number {
    let score = 100;

    const severityPenalties = {
        critical: 20,
        high: 10,
        medium: 5,
        low: 2,
        info: 0,
    };

    issues.forEach((issue) => {
        score -= severityPenalties[issue.severity];
    });

    return Math.max(0, Math.min(100, score));
}

/**
 * Generate review summary
 */
export function generateSummary(issues: ReviewIssue[], score: number): string {
    const criticalCount = issues.filter((i) => i.severity === "critical").length;
    const highCount = issues.filter((i) => i.severity === "high").length;
    const mediumCount = issues.filter((i) => i.severity === "medium").length;

    if (score >= 90) {
        return "✅ Excellent code quality! Minor improvements suggested.";
    } else if (score >= 75) {
        return "👍 Good code quality with some areas for improvement.";
    } else if (score >= 60) {
        return "⚠️ Code needs attention. Address high-priority issues.";
    } else if (score >= 40) {
        return "🔴 Significant issues found. Review and refactor recommended.";
    } else {
        return "🚨 Critical issues detected. Immediate action required.";
    }
}

/**
 * Perform complete code review
 */
export async function performCodeReview(
    filePath: string,
    useAI = true,
    ollamaHost = "http://localhost:11434",
): Promise<CodeReview> {
    try {
        logger.info(`Reviewing: ${filePath}`);

        // Read file
        const code = await fs.readFile(filePath, "utf-8");
        const language = detectLanguage(filePath);

        // Perform static analysis
        const staticIssues = performStaticAnalysis(code, language);

        // Perform AI review if enabled
        let aiIssues: ReviewIssue[] = [];
        if (useAI) {
            try {
                aiIssues = await reviewCodeWithAI(code, filePath, language, ollamaHost);
            } catch (error) {
                logger.warn("AI review skipped:", error);
            }
        }

        // Combine issues (remove duplicates)
        const allIssues = [...staticIssues, ...aiIssues];
        const uniqueIssues = deduplicateIssues(allIssues);

        // Calculate score and summary
        const score = calculateScore(uniqueIssues);
        const summary = generateSummary(uniqueIssues, score);

        return {
            file: filePath,
            language,
            issues: uniqueIssues,
            score,
            summary,
            timestamp: new Date(),
        };
    } catch (error) {
        logger.error(`Review failed for ${filePath}:`, error);
        throw error;
    }
}

/**
 * Remove duplicate issues
 */
function deduplicateIssues(issues: ReviewIssue[]): ReviewIssue[] {
    const seen = new Set<string>();
    return issues.filter((issue) => {
        const key = `${issue.line}-${issue.message}`;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

/**
 * Auto-review on file save
 */
export async function autoReviewOnSave(
    filePath: string,
    onReviewComplete?: (review: CodeReview) => void,
): Promise<void> {
    try {
        const review = await performCodeReview(filePath, true);

        logger.info(`Review complete: ${review.score}/100 - ${review.issues.length} issues`);

        // Callback with results
        onReviewComplete?.(review);
    } catch (error) {
        logger.error("Auto-review failed:", error);
    }
}
