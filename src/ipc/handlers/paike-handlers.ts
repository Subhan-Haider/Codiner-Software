/**
 * PAIKE IPC Handlers
 * 
 * Handles IPC communication between renderer and main process
 * for the Personal AI Knowledge Engine.
 */

import { ipcMain } from 'electron';
import { patternAnalyzer } from '../../lib/paike/pattern-analyzer';
import { seoGenerator } from '../../lib/paike/seo-generator';
import { sitemapGenerator } from '../../lib/paike/sitemap-generator';
import type { CodeContext, UserDecision } from '../../lib/paike/pattern-analyzer';
import type { PageData } from '../../lib/paike/seo-generator';

// ============================================================================
// Register Function
// ============================================================================

export function registerPaikeHandlers() {
    // ============================================================================
    // Pattern Analyzer Handlers
    // ============================================================================

    /**
     * Analyze code patterns
     */
    ipcMain.handle(
        'paike:analyze-patterns',
        async (event, code: string, fileType: string) => {
            try {
                const patterns = await patternAnalyzer.analyzeCode(code, fileType);
                return { success: true, data: patterns };
            } catch (error) {
                console.error('Error analyzing patterns:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Get recommendations based on context
     */
    ipcMain.handle(
        'paike:get-recommendations',
        async (event, context: CodeContext) => {
            try {
                const recommendations = await patternAnalyzer.getRecommendations(context);
                return { success: true, data: recommendations };
            } catch (error) {
                console.error('Error getting recommendations:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Learn from user decision
     */
    ipcMain.handle(
        'paike:learn-decision',
        async (event, decision: UserDecision) => {
            try {
                await patternAnalyzer.learnFromDecision(decision);
                return { success: true };
            } catch (error) {
                console.error('Error learning from decision:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Get personalization score
     */
    ipcMain.handle('paike:get-personalization-score', async () => {
        try {
            const score = await patternAnalyzer.getPersonalizationScore();
            return { success: true, data: score };
        } catch (error) {
            console.error('Error getting personalization score:', error);
            return { success: false, error: String(error) };
        }
    });

    // ============================================================================
    // SEO Generator Handlers
    // ============================================================================

    /**
     * Generate SEO metadata
     */
    ipcMain.handle(
        'paike:generate-seo',
        async (event, filePath: string, content: string, projectId: string) => {
            try {
                const metadata = await seoGenerator.generateMetadata(filePath, content, projectId);
                return { success: true, data: metadata };
            } catch (error) {
                console.error('Error generating SEO metadata:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Inject SEO metadata into HTML
     */
    ipcMain.handle(
        'paike:inject-seo',
        async (event, html: string, metadata: any) => {
            try {
                const injectedHtml = await seoGenerator.injectMetadata(html, metadata);
                return { success: true, data: injectedHtml };
            } catch (error) {
                console.error('Error injecting SEO metadata:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Generate Open Graph tags
     */
    ipcMain.handle('paike:generate-og-tags', async (event, pageData: PageData) => {
        try {
            const ogTags = seoGenerator.generateOGTags(pageData);
            return { success: true, data: ogTags };
        } catch (error) {
            console.error('Error generating OG tags:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Generate Schema.org markup
     */
    ipcMain.handle(
        'paike:generate-schema',
        async (event, pageType: string, data: any) => {
            try {
                const schema = seoGenerator.generateSchema(pageType, data);
                return { success: true, data: schema };
            } catch (error) {
                console.error('Error generating schema:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Get project SEO metadata
     */
    ipcMain.handle('paike:get-project-seo', async (event, projectId: string) => {
        try {
            const metadata = await seoGenerator.getProjectMetadata(projectId);
            return { success: true, data: metadata };
        } catch (error) {
            console.error('Error getting project SEO:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Update SEO metadata
     */
    ipcMain.handle(
        'paike:update-seo',
        async (event, projectId: string, filePath: string, metadata: any) => {
            try {
                await seoGenerator.updateMetadata(projectId, filePath, metadata);
                return { success: true };
            } catch (error) {
                console.error('Error updating SEO metadata:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    // ============================================================================
    // Sitemap Generator Handlers
    // ============================================================================

    /**
     * Generate sitemap
     */
    ipcMain.handle(
        'paike:generate-sitemap',
        async (event, projectPath: string, projectId: string, baseUrl?: string) => {
            try {
                const sitemap = await sitemapGenerator.generateSitemap(projectPath, projectId, baseUrl);
                return { success: true, data: sitemap };
            } catch (error) {
                console.error('Error generating sitemap:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Export sitemap
     */
    ipcMain.handle(
        'paike:export-sitemap',
        async (event, sitemap: any, format: 'xml' | 'html' | 'json') => {
            try {
                let content: string;

                switch (format) {
                    case 'xml':
                        content = await sitemapGenerator.exportSitemapXML(sitemap);
                        break;
                    case 'html':
                        content = await sitemapGenerator.exportSitemapHTML(sitemap);
                        break;
                    case 'json':
                        content = await sitemapGenerator.exportSitemapJSON(sitemap);
                        break;
                }

                return { success: true, data: content };
            } catch (error) {
                console.error('Error exporting sitemap:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Write sitemap to file
     */
    ipcMain.handle(
        'paike:write-sitemap',
        async (event, sitemap: any, outputPath: string, format: 'xml' | 'html' | 'json') => {
            try {
                await sitemapGenerator.writeSitemapToFile(sitemap, outputPath, format);
                return { success: true };
            } catch (error) {
                console.error('Error writing sitemap:', error);
                return { success: false, error: String(error) };
            }
        }
    );

    /**
     * Get project sitemap
     */
    ipcMain.handle('paike:get-project-sitemap', async (event, projectId: string) => {
        try {
            const sitemap = await sitemapGenerator.getProjectSitemap(projectId);
            return { success: true, data: sitemap };
        } catch (error) {
            console.error('Error getting project sitemap:', error);
            return { success: false, error: String(error) };
        }
    });

    // ============================================================================
    // Utility Handlers
    // ============================================================================

    /**
     * Get PAIKE statistics
     */
    ipcMain.handle('paike:get-stats', async () => {
        try {
            const score = await patternAnalyzer.getPersonalizationScore();

            // Get counts from database
            const { db } = await import('../../db');
            const { codingPatterns, solvedProblems, userPreferences } = await import('../../db/schema-paike');

            const [patterns, problems, preferences] = await Promise.all([
                db.select().from(codingPatterns),
                db.select().from(solvedProblems),
                db.select().from(userPreferences),
            ]);

            return {
                success: true,
                data: {
                    personalizationScore: score,
                    patternsLearned: patterns.length,
                    problemsSolved: problems.length,
                    preferencesIdentified: preferences.length,
                },
            };
        } catch (error) {
            console.error('Error getting PAIKE stats:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Clear all PAIKE data
     */
    ipcMain.handle('paike:clear-data', async () => {
        try {
            const { db } = await import('../../db');
            const {
                codingPatterns,
                solvedProblems,
                userPreferences,
                seoMetadata,
                performanceMetrics,
                sitemapEntries,
                learningSessions,
                personalizationMetrics,
            } = await import('../../db/schema-paike');

            // Delete all data
            await Promise.all([
                db.delete(codingPatterns),
                db.delete(solvedProblems),
                db.delete(userPreferences),
                db.delete(seoMetadata),
                db.delete(performanceMetrics),
                db.delete(sitemapEntries),
                db.delete(learningSessions),
                db.delete(personalizationMetrics),
            ]);

            return { success: true };
        } catch (error) {
            console.error('Error clearing PAIKE data:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Export PAIKE data
     */
    ipcMain.handle('paike:export-data', async () => {
        try {
            const { db } = await import('../../db');
            const {
                codingPatterns,
                solvedProblems,
                userPreferences,
                seoMetadata,
                sitemapEntries,
            } = await import('../../db/schema-paike');

            const [patterns, problems, preferences, seo, sitemap] = await Promise.all([
                db.select().from(codingPatterns),
                db.select().from(solvedProblems),
                db.select().from(userPreferences),
                db.select().from(seoMetadata),
                db.select().from(sitemapEntries),
            ]);

            const exportData = {
                version: '1.0.0',
                exportDate: new Date().toISOString(),
                data: {
                    patterns,
                    problems,
                    preferences,
                    seo,
                    sitemap,
                },
            };

            return { success: true, data: exportData };
        } catch (error) {
            console.error('Error exporting PAIKE data:', error);
            return { success: false, error: String(error) };
        }
    });

    console.log('✅ PAIKE IPC handlers registered');
}
