/**
 * Pattern Analyzer
 * 
 * Analyzes code to extract patterns, learn from user decisions,
 * and provide personalized recommendations.
 */

import { db } from '@/db';
import { codingPatterns, userPreferences, learningSessions } from '@/db/schema-paike';
import { eq, desc, sql } from 'drizzle-orm';
import * as parser from '@babel/parser';
import _traverse from '@babel/traverse';
const traverse = (_traverse as any).default || _traverse;

// ============================================================================
// Types
// ============================================================================

export type PatternType =
    | 'naming_convention'
    | 'architecture_style'
    | 'library_preference'
    | 'code_style'
    | 'file_structure'
    | 'import_pattern'
    | 'component_pattern'
    | 'state_management'
    | 'styling_approach'
    | 'testing_pattern';

export interface CodeContext {
    fileType: string;
    fileName: string;
    projectType?: string;
    existingCode?: string;
    userPrompt?: string;
}

export interface CodingPatternData {
    type: PatternType;
    data: Record<string, any>;
    frequency: number;
    confidence: number;
    examples?: string[];
}

export interface UserDecision {
    context: CodeContext;
    aiSuggestion: string;
    userChoice: string;
    accepted: boolean;
    timestamp: Date;
}

export interface Recommendation {
    type: PatternType;
    suggestion: string;
    confidence: number;
    reasoning: string;
    examples?: string[];
}

// ============================================================================
// Pattern Analyzer Class
// ============================================================================

export class PatternAnalyzer {
    /**
     * Analyze code to extract patterns
     */
    async analyzeCode(code: string, fileType: string): Promise<CodingPatternData[]> {
        const patterns: CodingPatternData[] = [];

        try {
            // Parse the code
            const ast = parser.parse(code, {
                sourceType: 'module',
                plugins: ['typescript', 'jsx'],
            });

            // Extract patterns
            patterns.push(...this.extractNamingPatterns(ast));
            patterns.push(...this.extractImportPatterns(ast));
            patterns.push(...this.extractComponentPatterns(ast));
            patterns.push(...this.extractStylePatterns(code));

            // Save patterns to database
            await this.savePatterns(patterns);

            return patterns;
        } catch (error) {
            console.error('Error analyzing code:', error);
            return [];
        }
    }

    /**
     * Extract naming convention patterns
     */
    private extractNamingPatterns(ast: any): CodingPatternData[] {
        const patterns: CodingPatternData[] = [];
        const namingStyles = {
            camelCase: 0,
            PascalCase: 0,
            snake_case: 0,
            SCREAMING_SNAKE_CASE: 0,
            'kebab-case': 0,
        };

        traverse(ast, {
            VariableDeclarator(path) {
                const name = path.node.id.type === 'Identifier' ? path.node.id.name : '';
                if (name) {
                    if (/^[a-z][a-zA-Z0-9]*$/.test(name)) namingStyles.camelCase++;
                    else if (/^[A-Z][a-zA-Z0-9]*$/.test(name)) namingStyles.PascalCase++;
                    else if (/^[a-z][a-z0-9_]*$/.test(name)) namingStyles.snake_case++;
                    else if (/^[A-Z][A-Z0-9_]*$/.test(name)) namingStyles.SCREAMING_SNAKE_CASE++;
                }
            },
            FunctionDeclaration(path) {
                const name = path.node.id?.name || '';
                if (name) {
                    if (/^[a-z][a-zA-Z0-9]*$/.test(name)) namingStyles.camelCase++;
                    else if (/^[A-Z][a-zA-Z0-9]*$/.test(name)) namingStyles.PascalCase++;
                }
            },
        });

        // Determine dominant naming style
        const dominantStyle = Object.entries(namingStyles).reduce((a, b) =>
            a[1] > b[1] ? a : b
        );

        if (dominantStyle[1] > 0) {
            patterns.push({
                type: 'naming_convention',
                data: {
                    style: dominantStyle[0],
                    distribution: namingStyles,
                },
                frequency: dominantStyle[1],
                confidence: dominantStyle[1] / Object.values(namingStyles).reduce((a, b) => a + b, 0),
            });
        }

        return patterns;
    }

    /**
     * Extract import patterns
     */
    private extractImportPatterns(ast: any): CodingPatternData[] {
        const patterns: CodingPatternData[] = [];
        const libraries: Record<string, number> = {};

        traverse(ast, {
            ImportDeclaration(path) {
                const source = path.node.source.value;
                libraries[source] = (libraries[source] || 0) + 1;
            },
        });

        if (Object.keys(libraries).length > 0) {
            patterns.push({
                type: 'library_preference',
                data: {
                    libraries,
                    mostUsed: Object.entries(libraries).sort((a, b) => b[1] - a[1]).slice(0, 5),
                },
                frequency: Object.values(libraries).reduce((a, b) => a + b, 0),
                confidence: 0.7,
            });
        }

        return patterns;
    }

    /**
     * Extract component patterns (React/Vue)
     */
    private extractComponentPatterns(ast: any): CodingPatternData[] {
        const patterns: CodingPatternData[] = [];
        let functionalComponents = 0;
        let classComponents = 0;
        let usesHooks = false;

        traverse(ast, {
            FunctionDeclaration(path) {
                // Check if it's a React component (returns JSX)
                const hasJSXReturn = path.node.body.body.some((statement: any) => {
                    return statement.type === 'ReturnStatement' &&
                        statement.argument?.type === 'JSXElement';
                });
                if (hasJSXReturn) functionalComponents++;
            },
            ArrowFunctionExpression(path) {
                // Check for functional components
                if (path.node.body.type === 'JSXElement') {
                    functionalComponents++;
                }
            },
            ClassDeclaration(path) {
                // Check if it extends React.Component
                const superClass = path.node.superClass;
                if (superClass &&
                    ((superClass.type === 'Identifier' && superClass.name === 'Component') ||
                        (superClass.type === 'MemberExpression' &&
                            superClass.property.type === 'Identifier' &&
                            superClass.property.name === 'Component'))) {
                    classComponents++;
                }
            },
            CallExpression(path) {
                // Check for React hooks
                const callee = path.node.callee;
                if (callee.type === 'Identifier' && callee.name.startsWith('use')) {
                    usesHooks = true;
                }
            },
        });

        if (functionalComponents > 0 || classComponents > 0) {
            patterns.push({
                type: 'component_pattern',
                data: {
                    functionalComponents,
                    classComponents,
                    usesHooks,
                    preferredStyle: functionalComponents > classComponents ? 'functional' : 'class',
                },
                frequency: functionalComponents + classComponents,
                confidence: Math.abs(functionalComponents - classComponents) /
                    (functionalComponents + classComponents),
            });
        }

        return patterns;
    }

    /**
     * Extract styling patterns
     */
    private extractStylePatterns(code: string): CodingPatternData[] {
        const patterns: CodingPatternData[] = [];
        const stylingApproaches = {
            tailwind: (code.match(/className="[^"]*"/g) || []).length,
            cssModules: (code.match(/styles\.[a-zA-Z]+/g) || []).length,
            styledComponents: (code.match(/styled\.[a-z]+/g) || []).length,
            inlineStyles: (code.match(/style={{/g) || []).length,
        };

        const dominantApproach = Object.entries(stylingApproaches).reduce((a, b) =>
            a[1] > b[1] ? a : b
        );

        if (dominantApproach[1] > 0) {
            patterns.push({
                type: 'styling_approach',
                data: {
                    approach: dominantApproach[0],
                    distribution: stylingApproaches,
                },
                frequency: dominantApproach[1],
                confidence: dominantApproach[1] / Object.values(stylingApproaches).reduce((a, b) => a + b, 0),
            });
        }

        return patterns;
    }

    /**
     * Save patterns to database
     */
    private async savePatterns(patterns: CodingPatternData[]): Promise<void> {
        for (const pattern of patterns) {
            try {
                // Check if pattern already exists
                const existing = await db
                    .select()
                    .from(codingPatterns)
                    .where(eq(codingPatterns.patternType, pattern.type))
                    .limit(1);

                if (existing.length > 0) {
                    // Update existing pattern
                    await db
                        .update(codingPatterns)
                        .set({
                            frequency: sql`${codingPatterns.frequency} + ${pattern.frequency}`,
                            confidenceScore: (existing[0].confidenceScore + pattern.confidence) / 2,
                            lastUsed: new Date(),
                        })
                        .where(eq(codingPatterns.id, existing[0].id));
                } else {
                    // Insert new pattern
                    await db.insert(codingPatterns).values({
                        patternType: pattern.type,
                        patternData: pattern.data,
                        frequency: pattern.frequency,
                        confidenceScore: pattern.confidence,
                    });
                }
            } catch (error) {
                console.error('Error saving pattern:', error);
            }
        }
    }

    /**
     * Learn from user decision
     */
    async learnFromDecision(decision: UserDecision): Promise<void> {
        try {
            // Analyze the difference between AI suggestion and user choice
            const patterns = await this.analyzeCode(decision.userChoice, decision.context.fileType);

            // Update confidence based on acceptance
            for (const pattern of patterns) {
                const existing = await db
                    .select()
                    .from(codingPatterns)
                    .where(eq(codingPatterns.patternType, pattern.type))
                    .limit(1);

                if (existing.length > 0) {
                    const newConfidence = decision.accepted
                        ? Math.min(existing[0].confidenceScore + 0.1, 1.0)
                        : Math.max(existing[0].confidenceScore - 0.05, 0.0);

                    await db
                        .update(codingPatterns)
                        .set({ confidenceScore: newConfidence })
                        .where(eq(codingPatterns.id, existing[0].id));
                }
            }

            // Record learning session
            await db.insert(learningSessions).values({
                sessionType: 'pattern',
                learningData: {
                    context: decision.context,
                    accepted: decision.accepted,
                    patterns: patterns.map(p => p.type),
                },
                qualityScore: decision.accepted ? 8 : 5,
            });
        } catch (error) {
            console.error('Error learning from decision:', error);
        }
    }

    /**
     * Get recommendations based on context
     */
    async getRecommendations(context: CodeContext): Promise<Recommendation[]> {
        try {
            const recommendations: Recommendation[] = [];

            // Get all patterns sorted by confidence
            const patterns = await db
                .select()
                .from(codingPatterns)
                .orderBy(desc(codingPatterns.confidenceScore))
                .limit(10);

            for (const pattern of patterns) {
                if (pattern.confidenceScore > 0.6) {
                    recommendations.push({
                        type: pattern.patternType as PatternType,
                        suggestion: this.generateSuggestion(pattern),
                        confidence: pattern.confidenceScore,
                        reasoning: this.generateReasoning(pattern),
                    });
                }
            }

            return recommendations;
        } catch (error) {
            console.error('Error getting recommendations:', error);
            return [];
        }
    }

    /**
     * Generate suggestion text from pattern
     */
    private generateSuggestion(pattern: any): string {
        const data = pattern.patternData;

        switch (pattern.patternType) {
            case 'naming_convention':
                return `Use ${data.style} for naming`;
            case 'component_pattern':
                return `Use ${data.preferredStyle} components`;
            case 'styling_approach':
                return `Use ${data.approach} for styling`;
            case 'library_preference':
                return `Consider using ${data.mostUsed[0]?.[0] || 'preferred libraries'}`;
            default:
                return 'Follow established patterns';
        }
    }

    /**
     * Generate reasoning text from pattern
     */
    private generateReasoning(pattern: any): string {
        return `Based on ${pattern.frequency} observations with ${Math.round(pattern.confidenceScore * 100)}% confidence`;
    }

    /**
     * Get personalization score (0-100)
     */
    async getPersonalizationScore(): Promise<number> {
        try {
            const patterns = await db.select().from(codingPatterns);

            if (patterns.length === 0) return 0;

            const avgConfidence = patterns.reduce((sum, p) => sum + p.confidenceScore, 0) / patterns.length;
            const patternCount = patterns.length;

            // Score based on both confidence and number of patterns
            const score = (avgConfidence * 0.7 + Math.min(patternCount / 20, 1) * 0.3) * 100;

            return Math.round(score);
        } catch (error) {
            console.error('Error calculating personalization score:', error);
            return 0;
        }
    }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const patternAnalyzer = new PatternAnalyzer();
