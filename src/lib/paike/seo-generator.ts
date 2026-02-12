/**
 * SEO Generator
 * 
 * Automatically generates SEO metadata, Open Graph tags, and Schema.org markup
 * for web projects.
 */

import { db } from '@/db';
import { seoMetadata } from '@/db/schema-paike';
import { eq, and } from 'drizzle-orm';
import * as cheerio from 'cheerio';

// ============================================================================
// Types
// ============================================================================

export interface SEOMetadata {
    title: string;
    description: string;
    keywords: string[];
    ogData: OpenGraphData;
    schemaMarkup: SchemaMarkup;
}

export interface OpenGraphData {
    title: string;
    description: string;
    type: 'website' | 'article' | 'product' | 'profile';
    url?: string;
    image?: string;
    siteName?: string;
}

export interface SchemaMarkup {
    '@context': 'https://schema.org';
    '@type': string;
    [key: string]: any;
}

export interface PageData {
    title?: string;
    description?: string;
    content?: string;
    url?: string;
    imageUrl?: string;
    author?: string;
    publishDate?: Date;
    modifiedDate?: Date;
}

// ============================================================================
// SEO Generator Class
// ============================================================================

export class SEOGenerator {
    /**
     * Generate comprehensive SEO metadata for a file
     */
    async generateMetadata(
        filePath: string,
        content: string,
        projectId: string
    ): Promise<SEOMetadata> {
        try {
            // Check if metadata already exists
            const existing = await this.getExistingMetadata(projectId, filePath);
            if (existing) {
                return existing;
            }

            // Extract page data from content
            const pageData = this.extractPageData(content);

            // Generate metadata
            const metadata: SEOMetadata = {
                title: this.generateTitle(pageData),
                description: this.generateDescription(pageData),
                keywords: this.generateKeywords(pageData),
                ogData: this.generateOGTags(pageData),
                schemaMarkup: this.generateSchema('WebPage', pageData),
            };

            // Save to database
            await this.saveMetadata(projectId, filePath, metadata);

            return metadata;
        } catch (error) {
            console.error('Error generating SEO metadata:', error);
            throw error;
        }
    }

    /**
     * Get existing metadata from database
     */
    private async getExistingMetadata(
        projectId: string,
        filePath: string
    ): Promise<SEOMetadata | null> {
        try {
            const result = await db
                .select()
                .from(seoMetadata)
                .where(
                    and(
                        eq(seoMetadata.projectId, projectId),
                        eq(seoMetadata.filePath, filePath)
                    )
                )
                .limit(1);

            if (result.length > 0) {
                const data = result[0];
                return {
                    title: data.title || '',
                    description: data.description || '',
                    keywords: data.keywords?.split(',') || [],
                    ogData: data.ogData as OpenGraphData,
                    schemaMarkup: data.schemaMarkup as SchemaMarkup,
                };
            }

            return null;
        } catch (error) {
            console.error('Error getting existing metadata:', error);
            return null;
        }
    }

    /**
     * Extract page data from HTML/JSX content
     */
    private extractPageData(content: string): PageData {
        const pageData: PageData = {};

        try {
            // Try to parse as HTML
            const $ = cheerio.load(content);

            // Extract title
            pageData.title = $('h1').first().text() || $('title').text();

            // Extract description from first paragraph
            pageData.description = $('p').first().text();

            // Extract all text content
            pageData.content = $('body').text() || content;

            // Extract images
            const firstImg = $('img').first();
            if (firstImg.length) {
                pageData.imageUrl = firstImg.attr('src');
            }
        } catch (error) {
            // If not HTML, extract from plain text
            const lines = content.split('\n');
            pageData.title = lines.find(line => line.trim().startsWith('#'))?.replace(/^#+\s*/, '') || 'Untitled';
            pageData.content = content;
        }

        return pageData;
    }

    /**
     * Generate optimized title
     */
    private generateTitle(pageData: PageData): string {
        if (pageData.title) {
            // Ensure title is between 50-60 characters (optimal for SEO)
            const title = pageData.title.trim();
            if (title.length > 60) {
                return title.substring(0, 57) + '...';
            }
            return title;
        }

        return 'Untitled Page';
    }

    /**
     * Generate meta description
     */
    private generateDescription(pageData: PageData): string {
        if (pageData.description) {
            // Ensure description is between 150-160 characters
            const desc = pageData.description.trim();
            if (desc.length > 160) {
                return desc.substring(0, 157) + '...';
            }
            return desc;
        }

        // Generate from content
        if (pageData.content) {
            const content = pageData.content.trim();
            if (content.length > 160) {
                return content.substring(0, 157) + '...';
            }
            return content;
        }

        return 'A page created with Codiner';
    }

    /**
     * Generate keywords from content
     */
    private generateKeywords(pageData: PageData): string[] {
        const keywords: string[] = [];

        if (!pageData.content) return keywords;

        // Extract common words (simple implementation)
        const words = pageData.content
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 4); // Only words longer than 4 chars

        // Count word frequency
        const wordCount: Record<string, number> = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });

        // Get top 10 most frequent words
        const topWords = Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word]) => word);

        return topWords;
    }

    /**
     * Generate Open Graph tags
     */
    generateOGTags(pageData: PageData): OpenGraphData {
        return {
            title: pageData.title || 'Untitled Page',
            description: pageData.description || 'A page created with Codiner',
            type: 'website',
            url: pageData.url,
            image: pageData.imageUrl,
            siteName: 'Codiner App',
        };
    }

    /**
     * Generate Schema.org markup
     */
    generateSchema(pageType: string, data: PageData): SchemaMarkup {
        const baseSchema: SchemaMarkup = {
            '@context': 'https://schema.org',
            '@type': pageType,
        };

        switch (pageType) {
            case 'WebPage':
                return {
                    ...baseSchema,
                    name: data.title,
                    description: data.description,
                    url: data.url,
                    datePublished: data.publishDate?.toISOString(),
                    dateModified: data.modifiedDate?.toISOString(),
                };

            case 'Article':
                return {
                    ...baseSchema,
                    headline: data.title,
                    description: data.description,
                    image: data.imageUrl,
                    author: {
                        '@type': 'Person',
                        name: data.author || 'Unknown',
                    },
                    datePublished: data.publishDate?.toISOString(),
                    dateModified: data.modifiedDate?.toISOString(),
                };

            case 'Product':
                return {
                    ...baseSchema,
                    name: data.title,
                    description: data.description,
                    image: data.imageUrl,
                };

            default:
                return baseSchema;
        }
    }

    /**
     * Inject metadata into HTML
     */
    async injectMetadata(html: string, metadata: SEOMetadata): Promise<string> {
        try {
            const $ = cheerio.load(html);

            // Inject title
            if ($('title').length === 0) {
                $('head').append(`<title>${metadata.title}</title>`);
            } else {
                $('title').text(metadata.title);
            }

            // Inject meta description
            if ($('meta[name="description"]').length === 0) {
                $('head').append(`<meta name="description" content="${metadata.description}">`);
            } else {
                $('meta[name="description"]').attr('content', metadata.description);
            }

            // Inject keywords
            if (metadata.keywords.length > 0) {
                const keywordsStr = metadata.keywords.join(', ');
                if ($('meta[name="keywords"]').length === 0) {
                    $('head').append(`<meta name="keywords" content="${keywordsStr}">`);
                } else {
                    $('meta[name="keywords"]').attr('content', keywordsStr);
                }
            }

            // Inject Open Graph tags
            this.injectOGTags($, metadata.ogData);

            // Inject Schema.org markup
            this.injectSchema($, metadata.schemaMarkup);

            return $.html();
        } catch (error) {
            console.error('Error injecting metadata:', error);
            return html;
        }
    }

    /**
     * Inject Open Graph tags into HTML
     */
    private injectOGTags($: cheerio.CheerioAPI, ogData: OpenGraphData): void {
        const ogTags = [
            { property: 'og:title', content: ogData.title },
            { property: 'og:description', content: ogData.description },
            { property: 'og:type', content: ogData.type },
        ];

        if (ogData.url) {
            ogTags.push({ property: 'og:url', content: ogData.url });
        }

        if (ogData.image) {
            ogTags.push({ property: 'og:image', content: ogData.image });
        }

        if (ogData.siteName) {
            ogTags.push({ property: 'og:site_name', content: ogData.siteName });
        }

        ogTags.forEach(tag => {
            if ($(`meta[property="${tag.property}"]`).length === 0) {
                $('head').append(`<meta property="${tag.property}" content="${tag.content}">`);
            } else {
                $(`meta[property="${tag.property}"]`).attr('content', tag.content);
            }
        });

        // Twitter Card tags
        $('head').append(`<meta name="twitter:card" content="summary_large_image">`);
        $('head').append(`<meta name="twitter:title" content="${ogData.title}">`);
        $('head').append(`<meta name="twitter:description" content="${ogData.description}">`);
        if (ogData.image) {
            $('head').append(`<meta name="twitter:image" content="${ogData.image}">`);
        }
    }

    /**
     * Inject Schema.org markup into HTML
     */
    private injectSchema($: cheerio.CheerioAPI, schema: SchemaMarkup): void {
        const schemaScript = `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
        $('head').append(schemaScript);
    }

    /**
     * Save metadata to database
     */
    private async saveMetadata(
        projectId: string,
        filePath: string,
        metadata: SEOMetadata
    ): Promise<void> {
        try {
            await db.insert(seoMetadata).values({
                projectId,
                filePath,
                title: metadata.title,
                description: metadata.description,
                keywords: metadata.keywords.join(','),
                ogData: metadata.ogData,
                schemaMarkup: metadata.schemaMarkup,
            });
        } catch (error) {
            console.error('Error saving SEO metadata:', error);
        }
    }

    /**
     * Update existing metadata
     */
    async updateMetadata(
        projectId: string,
        filePath: string,
        metadata: Partial<SEOMetadata>
    ): Promise<void> {
        try {
            await db
                .update(seoMetadata)
                .set({
                    title: metadata.title,
                    description: metadata.description,
                    keywords: metadata.keywords?.join(','),
                    ogData: metadata.ogData,
                    schemaMarkup: metadata.schemaMarkup,
                    lastUpdated: new Date(),
                })
                .where(
                    and(
                        eq(seoMetadata.projectId, projectId),
                        eq(seoMetadata.filePath, filePath)
                    )
                );
        } catch (error) {
            console.error('Error updating SEO metadata:', error);
        }
    }

    /**
     * Get all metadata for a project
     */
    async getProjectMetadata(projectId: string): Promise<SEOMetadata[]> {
        try {
            const results = await db
                .select()
                .from(seoMetadata)
                .where(eq(seoMetadata.projectId, projectId));

            return results.map(data => ({
                title: data.title || '',
                description: data.description || '',
                keywords: data.keywords?.split(',') || [],
                ogData: data.ogData as OpenGraphData,
                schemaMarkup: data.schemaMarkup as SchemaMarkup,
            }));
        } catch (error) {
            console.error('Error getting project metadata:', error);
            return [];
        }
    }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const seoGenerator = new SEOGenerator();
