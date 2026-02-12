/**
 * Sitemap Generator
 * 
 * Automatically generates sitemaps for web projects with intelligent
 * priority calculation and change frequency detection.
 */

import { db } from '@/db';
import { sitemapEntries } from '@/db/schema-paike';
import { eq } from 'drizzle-orm';
import * as fs from 'fs/promises';
import * as path from 'path';

// ============================================================================
// Types
// ============================================================================

export type ChangeFrequency =
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';

export interface SitemapEntry {
    url: string;
    priority: number;
    changeFrequency: ChangeFrequency;
    lastModified: Date;
}

export interface Sitemap {
    entries: SitemapEntry[];
    baseUrl?: string;
}

export interface Page {
    path: string;
    lastModified: Date;
    importance: number; // 0-1 scale
}

// ============================================================================
// Sitemap Generator Class
// ============================================================================

export class SitemapGenerator {
    /**
     * Generate sitemap from project structure
     */
    async generateSitemap(
        projectPath: string,
        projectId: string,
        baseUrl?: string
    ): Promise<Sitemap> {
        try {
            // Scan project for HTML/JSX files
            const pages = await this.scanProjectPages(projectPath);

            // Generate sitemap entries
            const entries: SitemapEntry[] = [];

            for (const page of pages) {
                const priority = await this.calculatePriority(page);
                const changeFreq = await this.getChangeFrequency(page.path);

                const entry: SitemapEntry = {
                    url: this.generateUrl(page.path, projectPath, baseUrl),
                    priority,
                    changeFrequency: changeFreq,
                    lastModified: page.lastModified,
                };

                entries.push(entry);

                // Save to database
                await this.saveSitemapEntry(projectId, entry);
            }

            return { entries, baseUrl };
        } catch (error) {
            console.error('Error generating sitemap:', error);
            throw error;
        }
    }

    /**
     * Scan project for pages
     */
    private async scanProjectPages(projectPath: string): Promise<Page[]> {
        const pages: Page[] = [];

        try {
            await this.scanDirectory(projectPath, projectPath, pages);
        } catch (error) {
            console.error('Error scanning project:', error);
        }

        return pages;
    }

    /**
     * Recursively scan directory for page files
     */
    private async scanDirectory(
        dirPath: string,
        rootPath: string,
        pages: Page[]
    ): Promise<void> {
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);

                // Skip node_modules, .git, etc.
                if (this.shouldSkip(entry.name)) continue;

                if (entry.isDirectory()) {
                    await this.scanDirectory(fullPath, rootPath, pages);
                } else if (this.isPageFile(entry.name)) {
                    const stats = await fs.stat(fullPath);
                    const importance = this.calculateImportance(fullPath, rootPath);

                    pages.push({
                        path: fullPath,
                        lastModified: stats.mtime,
                        importance,
                    });
                }
            }
        } catch (error) {
            console.error(`Error scanning directory ${dirPath}:`, error);
        }
    }

    /**
     * Check if file should be skipped
     */
    private shouldSkip(name: string): boolean {
        const skipPatterns = [
            'node_modules',
            '.git',
            '.next',
            'dist',
            'build',
            'out',
            '.cache',
            'coverage',
        ];

        return skipPatterns.some(pattern => name.includes(pattern));
    }

    /**
     * Check if file is a page file
     */
    private isPageFile(filename: string): boolean {
        const pageExtensions = ['.html', '.jsx', '.tsx', '.vue', '.astro'];
        return pageExtensions.some(ext => filename.endsWith(ext));
    }

    /**
     * Calculate page importance (0-1)
     */
    private calculateImportance(filePath: string, rootPath: string): number {
        const relativePath = path.relative(rootPath, filePath).toLowerCase();

        // Homepage is most important
        if (relativePath.includes('index') || relativePath.includes('home')) {
            return 1.0;
        }

        // Top-level pages are important
        if (relativePath.split(path.sep).length <= 2) {
            return 0.8;
        }

        // About, contact, etc. are moderately important
        if (
            relativePath.includes('about') ||
            relativePath.includes('contact') ||
            relativePath.includes('services')
        ) {
            return 0.7;
        }

        // Blog posts, articles
        if (relativePath.includes('blog') || relativePath.includes('article')) {
            return 0.6;
        }

        // Default importance
        return 0.5;
    }

    /**
     * Calculate page priority for sitemap
     */
    async calculatePriority(page: Page): Promise<number> {
        // Priority is based on importance
        return Math.round(page.importance * 10) / 10;
    }

    /**
     * Determine change frequency based on file modification history
     */
    async getChangeFrequency(filePath: string): Promise<ChangeFrequency> {
        try {
            const stats = await fs.stat(filePath);
            const now = new Date();
            const lastModified = stats.mtime;
            const daysSinceModified = (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24);

            // Determine frequency based on how recently it was modified
            if (daysSinceModified < 1) return 'hourly';
            if (daysSinceModified < 7) return 'daily';
            if (daysSinceModified < 30) return 'weekly';
            if (daysSinceModified < 365) return 'monthly';
            return 'yearly';
        } catch (error) {
            return 'weekly'; // Default
        }
    }

    /**
     * Generate URL from file path
     */
    private generateUrl(filePath: string, rootPath: string, baseUrl?: string): string {
        const relativePath = path.relative(rootPath, filePath);

        // Convert file path to URL path
        let urlPath = relativePath
            .replace(/\\/g, '/') // Windows paths
            .replace(/\.(jsx|tsx|vue|astro)$/, '') // Remove extensions
            .replace(/\/index$/, ''); // Remove index

        // Ensure starts with /
        if (!urlPath.startsWith('/')) {
            urlPath = '/' + urlPath;
        }

        // Add base URL if provided
        if (baseUrl) {
            return baseUrl.replace(/\/$/, '') + urlPath;
        }

        return urlPath;
    }

    /**
     * Save sitemap entry to database
     */
    private async saveSitemapEntry(projectId: string, entry: SitemapEntry): Promise<void> {
        try {
            await db.insert(sitemapEntries).values({
                projectId,
                url: entry.url,
                priority: entry.priority,
                changeFrequency: entry.changeFrequency,
                lastModified: entry.lastModified,
            });
        } catch (error) {
            console.error('Error saving sitemap entry:', error);
        }
    }

    /**
     * Export sitemap as XML
     */
    async exportSitemapXML(sitemap: Sitemap): Promise<string> {
        const entries = sitemap.entries
            .map(entry => {
                return `  <url>
    <loc>${this.escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified.toISOString().split('T')[0]}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
            })
            .join('\n');

        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
    }

    /**
     * Export sitemap as HTML
     */
    async exportSitemapHTML(sitemap: Sitemap): Promise<string> {
        const entries = sitemap.entries
            .sort((a, b) => b.priority - a.priority)
            .map(entry => {
                return `    <li>
      <a href="${entry.url}">${entry.url}</a>
      <span class="priority">Priority: ${entry.priority.toFixed(1)}</span>
      <span class="updated">Updated: ${entry.lastModified.toLocaleDateString()}</span>
    </li>`;
            })
            .join('\n');

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sitemap</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    ul { list-style: none; padding: 0; }
    li { padding: 10px; border-bottom: 1px solid #eee; }
    a { color: #0066cc; text-decoration: none; font-weight: bold; }
    a:hover { text-decoration: underline; }
    .priority, .updated { margin-left: 20px; color: #666; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>Sitemap</h1>
  <ul>
${entries}
  </ul>
</body>
</html>`;
    }

    /**
     * Export sitemap as JSON
     */
    async exportSitemapJSON(sitemap: Sitemap): Promise<string> {
        return JSON.stringify(sitemap, null, 2);
    }

    /**
     * Escape XML special characters
     */
    private escapeXml(str: string): string {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    /**
     * Get sitemap for a project
     */
    async getProjectSitemap(projectId: string): Promise<Sitemap> {
        try {
            const entries = await db
                .select()
                .from(sitemapEntries)
                .where(eq(sitemapEntries.projectId, projectId));

            return {
                entries: entries.map(entry => ({
                    url: entry.url,
                    priority: entry.priority,
                    changeFrequency: entry.changeFrequency as ChangeFrequency,
                    lastModified: new Date(entry.lastModified),
                })),
            };
        } catch (error) {
            console.error('Error getting project sitemap:', error);
            return { entries: [] };
        }
    }

    /**
     * Write sitemap to file
     */
    async writeSitemapToFile(
        sitemap: Sitemap,
        outputPath: string,
        format: 'xml' | 'html' | 'json' = 'xml'
    ): Promise<void> {
        try {
            let content: string;

            switch (format) {
                case 'xml':
                    content = await this.exportSitemapXML(sitemap);
                    break;
                case 'html':
                    content = await this.exportSitemapHTML(sitemap);
                    break;
                case 'json':
                    content = await this.exportSitemapJSON(sitemap);
                    break;
            }

            await fs.writeFile(outputPath, content, 'utf-8');
            console.log(`Sitemap written to ${outputPath}`);
        } catch (error) {
            console.error('Error writing sitemap to file:', error);
            throw error;
        }
    }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const sitemapGenerator = new SitemapGenerator();
