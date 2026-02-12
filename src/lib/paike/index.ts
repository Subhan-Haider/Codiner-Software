/**
 * PAIKE (Personal AI Knowledge Engine) - Main Export
 * 
 * Central export point for all PAIKE modules.
 */

// Core modules
export { patternAnalyzer, PatternAnalyzer } from './pattern-analyzer';
export { seoGenerator, SEOGenerator } from './seo-generator';
export { sitemapGenerator, SitemapGenerator } from './sitemap-generator';

// Types
export type {
    PatternType,
    CodeContext,
    CodingPatternData,
    UserDecision,
    Recommendation,
} from './pattern-analyzer';

export type {
    SEOMetadata,
    OpenGraphData,
    SchemaMarkup,
    PageData,
} from './seo-generator';

export type {
    ChangeFrequency,
    SitemapEntry,
    Sitemap,
    Page,
} from './sitemap-generator';

// Database schema
export * from '@/db/schema-paike';

/**
 * PAIKE API - Convenience wrapper for all PAIKE functionality
 */
export const PAIKE = {
    // Pattern Analysis
    patterns: {
        analyze: async (code: string, fileType: string) => {
            return await window.electron.ipcRenderer.invoke('paike:analyze-patterns', code, fileType);
        },
        getRecommendations: async (context: any) => {
            return await window.electron.ipcRenderer.invoke('paike:get-recommendations', context);
        },
        learnDecision: async (decision: any) => {
            return await window.electron.ipcRenderer.invoke('paike:learn-decision', decision);
        },
        getScore: async () => {
            return await window.electron.ipcRenderer.invoke('paike:get-personalization-score');
        },
    },

    // SEO Generation
    seo: {
        generate: async (filePath: string, content: string, projectId: string) => {
            return await window.electron.ipcRenderer.invoke('paike:generate-seo', filePath, content, projectId);
        },
        inject: async (html: string, metadata: any) => {
            return await window.electron.ipcRenderer.invoke('paike:inject-seo', html, metadata);
        },
        generateOG: async (pageData: any) => {
            return await window.electron.ipcRenderer.invoke('paike:generate-og-tags', pageData);
        },
        generateSchema: async (pageType: string, data: any) => {
            return await window.electron.ipcRenderer.invoke('paike:generate-schema', pageType, data);
        },
        getProject: async (projectId: string) => {
            return await window.electron.ipcRenderer.invoke('paike:get-project-seo', projectId);
        },
        update: async (projectId: string, filePath: string, metadata: any) => {
            return await window.electron.ipcRenderer.invoke('paike:update-seo', projectId, filePath, metadata);
        },
    },

    // Sitemap Generation
    sitemap: {
        generate: async (projectPath: string, projectId: string, baseUrl?: string) => {
            return await window.electron.ipcRenderer.invoke('paike:generate-sitemap', projectPath, projectId, baseUrl);
        },
        export: async (sitemap: any, format: 'xml' | 'html' | 'json') => {
            return await window.electron.ipcRenderer.invoke('paike:export-sitemap', sitemap, format);
        },
        write: async (sitemap: any, outputPath: string, format: 'xml' | 'html' | 'json') => {
            return await window.electron.ipcRenderer.invoke('paike:write-sitemap', sitemap, outputPath, format);
        },
        getProject: async (projectId: string) => {
            return await window.electron.ipcRenderer.invoke('paike:get-project-sitemap', projectId);
        },
    },

    // Utilities
    utils: {
        getStats: async () => {
            return await window.electron.ipcRenderer.invoke('paike:get-stats');
        },
        clearData: async () => {
            return await window.electron.ipcRenderer.invoke('paike:clear-data');
        },
        exportData: async () => {
            return await window.electron.ipcRenderer.invoke('paike:export-data');
        },
    },
};

/**
 * Usage Examples:
 * 
 * // Analyze code patterns
 * const patterns = await PAIKE.patterns.analyze(code, 'typescript');
 * 
 * // Generate SEO metadata
 * const seo = await PAIKE.seo.generate(filePath, content, projectId);
 * 
 * // Generate sitemap
 * const sitemap = await PAIKE.sitemap.generate(projectPath, projectId);
 * 
 * // Get personalization score
 * const score = await PAIKE.patterns.getScore();
 * 
 * // Get statistics
 * const stats = await PAIKE.utils.getStats();
 */
