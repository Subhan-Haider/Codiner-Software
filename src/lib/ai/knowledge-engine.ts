/**
 * Personal AI Knowledge Engine
 * Learns from user's coding patterns and adapts over time
 */

import * as fs from "fs/promises";
import * as path from "path";
import log from "electron-log";

const logger = log.scope("knowledge-engine");

interface CodePattern {
    id: string;
    type: "solution" | "preference" | "style" | "architecture";
    category: string;
    pattern: string;
    context: string;
    frequency: number;
    lastUsed: Date;
    confidence: number; // 0-1
    metadata: {
        language?: string;
        framework?: string;
        tags?: string[];
    };
}

interface UserPreference {
    id: string;
    category: string;
    preference: string;
    strength: number; // 0-1
    examples: string[];
    learnedAt: Date;
    updatedAt: Date;
}

interface ProblemSolution {
    id: string;
    problem: string;
    solution: string;
    approach: string;
    language: string;
    framework?: string;
    tags: string[];
    timestamp: Date;
    effectiveness: number; // User feedback 0-1
}

interface KnowledgeBase {
    patterns: CodePattern[];
    preferences: UserPreference[];
    solutions: ProblemSolution[];
    metadata: {
        userId: string;
        createdAt: Date;
        lastUpdated: Date;
        totalInteractions: number;
        learningVersion: string;
    };
}

/**
 * Knowledge Engine class
 */
export class KnowledgeEngine {
    private knowledgeBase: KnowledgeBase;
    private knowledgePath: string;
    private autoSaveInterval: NodeJS.Timeout | null = null;

    constructor(userDataPath: string) {
        this.knowledgePath = path.join(userDataPath, "knowledge-base.json");
        this.knowledgeBase = this.createEmptyKnowledgeBase();
    }

    /**
     * Initialize knowledge engine
     */
    async initialize(): Promise<void> {
        try {
            await this.loadKnowledgeBase();
            this.startAutoSave();
            logger.info("Knowledge engine initialized");
        } catch (error) {
            logger.error("Failed to initialize knowledge engine:", error);
            throw error;
        }
    }

    /**
     * Create empty knowledge base
     */
    private createEmptyKnowledgeBase(): KnowledgeBase {
        return {
            patterns: [],
            preferences: [],
            solutions: [],
            metadata: {
                userId: this.generateUserId(),
                createdAt: new Date(),
                lastUpdated: new Date(),
                totalInteractions: 0,
                learningVersion: "1.0.0",
            },
        };
    }

    /**
     * Generate unique user ID
     */
    private generateUserId(): string {
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Load knowledge base from disk
     */
    private async loadKnowledgeBase(): Promise<void> {
        try {
            const data = await fs.readFile(this.knowledgePath, "utf-8");
            this.knowledgeBase = JSON.parse(data);

            // Convert date strings back to Date objects
            this.knowledgeBase.metadata.createdAt = new Date(this.knowledgeBase.metadata.createdAt);
            this.knowledgeBase.metadata.lastUpdated = new Date(this.knowledgeBase.metadata.lastUpdated);

            logger.info(`Loaded knowledge base with ${this.knowledgeBase.patterns.length} patterns`);
        } catch (error) {
            logger.info("No existing knowledge base found, creating new one");
            await this.saveKnowledgeBase();
        }
    }

    /**
     * Save knowledge base to disk
     */
    async saveKnowledgeBase(): Promise<void> {
        try {
            this.knowledgeBase.metadata.lastUpdated = new Date();
            await fs.writeFile(
                this.knowledgePath,
                JSON.stringify(this.knowledgeBase, null, 2),
                "utf-8"
            );
            logger.debug("Knowledge base saved");
        } catch (error) {
            logger.error("Failed to save knowledge base:", error);
        }
    }

    /**
     * Start auto-save interval
     */
    private startAutoSave(): void {
        // Save every 5 minutes
        this.autoSaveInterval = setInterval(() => {
            this.saveKnowledgeBase();
        }, 5 * 60 * 1000);
    }

    /**
     * Stop auto-save
     */
    stopAutoSave(): void {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }

    /**
     * Learn from a code solution
     */
    async learnFromSolution(
        problem: string,
        solution: string,
        context: {
            language: string;
            framework?: string;
            tags?: string[];
        }
    ): Promise<void> {
        // Extract patterns from solution
        const patterns = await this.extractPatterns(solution, context);

        // Save solution
        const problemSolution: ProblemSolution = {
            id: this.generateId(),
            problem,
            solution,
            approach: await this.classifyApproach(solution),
            language: context.language,
            framework: context.framework,
            tags: context.tags || [],
            timestamp: new Date(),
            effectiveness: 1.0, // Default to effective
        };

        this.knowledgeBase.solutions.push(problemSolution);

        // Update or create patterns
        for (const pattern of patterns) {
            await this.updatePattern(pattern);
        }

        // Update preferences based on solution
        await this.updatePreferences(solution, context);

        this.knowledgeBase.metadata.totalInteractions++;
        await this.saveKnowledgeBase();

        logger.info(`Learned from solution: ${problem.substring(0, 50)}...`);
    }

    /**
     * Extract patterns from code
     */
    private async extractPatterns(
        code: string,
        context: { language: string; framework?: string }
    ): Promise<CodePattern[]> {
        const patterns: CodePattern[] = [];

        // Detect common patterns
        const patternDetectors = [
            {
                name: "async-await",
                regex: /async\s+\w+\s*\([^)]*\)\s*{[\s\S]*?await\s+/g,
                category: "async-programming",
            },
            {
                name: "error-handling",
                regex: /try\s*{[\s\S]*?}\s*catch\s*\(/g,
                category: "error-handling",
            },
            {
                name: "arrow-function",
                regex: /\([^)]*\)\s*=>\s*{/g,
                category: "function-style",
            },
            {
                name: "destructuring",
                regex: /const\s*{[^}]+}\s*=/g,
                category: "syntax-preference",
            },
            {
                name: "template-literals",
                regex: /`[^`]*\${[^}]+}[^`]*`/g,
                category: "string-formatting",
            },
            {
                name: "optional-chaining",
                regex: /\?\./g,
                category: "null-safety",
            },
            {
                name: "nullish-coalescing",
                regex: /\?\?/g,
                category: "null-safety",
            },
        ];

        for (const detector of patternDetectors) {
            const matches = code.match(detector.regex);
            if (matches && matches.length > 0) {
                patterns.push({
                    id: this.generateId(),
                    type: "style",
                    category: detector.category,
                    pattern: detector.name,
                    context: matches[0].substring(0, 200),
                    frequency: matches.length,
                    lastUsed: new Date(),
                    confidence: 0.5,
                    metadata: {
                        language: context.language,
                        framework: context.framework,
                    },
                });
            }
        }

        return patterns;
    }

    /**
     * Classify solution approach
     */
    private async classifyApproach(solution: string): Promise<string> {
        // Simple classification based on keywords
        if (solution.includes("class ") || solution.includes("extends ")) {
            return "object-oriented";
        } else if (solution.includes("=>") && solution.includes("map")) {
            return "functional";
        } else if (solution.includes("async") || solution.includes("await")) {
            return "async-first";
        } else {
            return "procedural";
        }
    }

    /**
     * Update pattern in knowledge base
     */
    private async updatePattern(newPattern: CodePattern): Promise<void> {
        const existing = this.knowledgeBase.patterns.find(
            (p) => p.pattern === newPattern.pattern && p.category === newPattern.category
        );

        if (existing) {
            // Update existing pattern
            existing.frequency += newPattern.frequency;
            existing.lastUsed = new Date();
            existing.confidence = Math.min(1.0, existing.confidence + 0.05);
        } else {
            // Add new pattern
            this.knowledgeBase.patterns.push(newPattern);
        }
    }

    /**
     * Update user preferences
     */
    private async updatePreferences(
        solution: string,
        context: { language: string; framework?: string }
    ): Promise<void> {
        // Detect preferences
        const preferences = [
            {
                category: "naming-convention",
                check: /const\s+[a-z][a-zA-Z0-9]*\s*=/g,
                preference: "camelCase",
            },
            {
                category: "quote-style",
                check: /"/g,
                preference: "double-quotes",
            },
            {
                category: "quote-style",
                check: /'/g,
                preference: "single-quotes",
            },
            {
                category: "semicolons",
                check: /;$/gm,
                preference: "use-semicolons",
            },
            {
                category: "indentation",
                check: /^  /gm,
                preference: "2-spaces",
            },
            {
                category: "indentation",
                check: /^    /gm,
                preference: "4-spaces",
            },
        ];

        for (const pref of preferences) {
            const matches = solution.match(pref.check);
            if (matches && matches.length > 5) {
                await this.updatePreference(pref.category, pref.preference);
            }
        }
    }

    /**
     * Update single preference
     */
    private async updatePreference(category: string, preference: string): Promise<void> {
        const existing = this.knowledgeBase.preferences.find(
            (p) => p.category === category && p.preference === preference
        );

        if (existing) {
            existing.strength = Math.min(1.0, existing.strength + 0.05);
            existing.updatedAt = new Date();
        } else {
            this.knowledgeBase.preferences.push({
                id: this.generateId(),
                category,
                preference,
                strength: 0.3,
                examples: [],
                learnedAt: new Date(),
                updatedAt: new Date(),
            });
        }
    }

    /**
     * Get suggestions based on learned patterns
     */
    async getSuggestions(context: {
        problem?: string;
        language: string;
        framework?: string;
    }): Promise<string[]> {
        const suggestions: string[] = [];

        // Get relevant patterns
        const relevantPatterns = this.knowledgeBase.patterns
            .filter((p) => p.metadata.language === context.language)
            .filter((p) => p.confidence > 0.5)
            .sort((a, b) => b.frequency - a.frequency)
            .slice(0, 5);

        for (const pattern of relevantPatterns) {
            suggestions.push(
                `Consider using ${pattern.pattern} (used ${pattern.frequency} times)`
            );
        }

        // Get relevant solutions
        if (context.problem) {
            const similarSolutions = await this.findSimilarSolutions(context.problem);
            for (const solution of similarSolutions.slice(0, 3)) {
                suggestions.push(
                    `Similar problem solved with: ${solution.approach}`
                );
            }
        }

        return suggestions;
    }

    /**
     * Find similar solutions
     */
    private async findSimilarSolutions(problem: string): Promise<ProblemSolution[]> {
        // Simple keyword matching (can be enhanced with AI)
        const keywords = problem.toLowerCase().split(/\s+/);

        return this.knowledgeBase.solutions
            .filter((s) => {
                const solutionText = (s.problem + " " + s.solution).toLowerCase();
                return keywords.some((keyword) => solutionText.includes(keyword));
            })
            .sort((a, b) => b.effectiveness - a.effectiveness);
    }

    /**
     * Get user's coding style summary
     */
    getCodingStyle(): {
        preferences: UserPreference[];
        topPatterns: CodePattern[];
        favoriteApproach: string;
    } {
        // Get top preferences
        const topPreferences = this.knowledgeBase.preferences
            .sort((a, b) => b.strength - a.strength)
            .slice(0, 10);

        // Get top patterns
        const topPatterns = this.knowledgeBase.patterns
            .sort((a, b) => b.frequency - a.frequency)
            .slice(0, 10);

        // Determine favorite approach
        const approaches = this.knowledgeBase.solutions.map((s) => s.approach);
        const approachCounts = approaches.reduce((acc, approach) => {
            acc[approach] = (acc[approach] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const favoriteApproach = Object.entries(approachCounts)
            .sort(([, a], [, b]) => b - a)[0]?.[0] || "unknown";

        return {
            preferences: topPreferences,
            topPatterns,
            favoriteApproach,
        };
    }

    /**
     * Export knowledge base
     */
    async exportKnowledge(exportPath: string): Promise<void> {
        await fs.writeFile(
            exportPath,
            JSON.stringify(this.knowledgeBase, null, 2),
            "utf-8"
        );
        logger.info(`Knowledge base exported to: ${exportPath}`);
    }

    /**
     * Import knowledge base
     */
    async importKnowledge(importPath: string): Promise<void> {
        const data = await fs.readFile(importPath, "utf-8");
        this.knowledgeBase = JSON.parse(data);
        await this.saveKnowledgeBase();
        logger.info("Knowledge base imported");
    }

    /**
     * Get statistics
     */
    getStatistics(): {
        totalPatterns: number;
        totalPreferences: number;
        totalSolutions: number;
        totalInteractions: number;
        learningAge: number; // days
    } {
        const now = new Date();
        const created = new Date(this.knowledgeBase.metadata.createdAt);
        const learningAge = Math.floor(
            (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
            totalPatterns: this.knowledgeBase.patterns.length,
            totalPreferences: this.knowledgeBase.preferences.length,
            totalSolutions: this.knowledgeBase.solutions.length,
            totalInteractions: this.knowledgeBase.metadata.totalInteractions,
            learningAge,
        };
    }

    /**
     * Generate unique ID
     */
    private generateId(): string {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Cleanup
     */
    async cleanup(): Promise<void> {
        this.stopAutoSave();
        await this.saveKnowledgeBase();
        logger.info("Knowledge engine cleaned up");
    }
}
