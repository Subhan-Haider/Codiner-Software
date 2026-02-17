import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://codiner.online'

    // Static routes
    const routes = [
        '',
        '/about',
        '/ai-features',
        '/blog',
        '/changelog',
        '/community',
        '/contact',
        '/deployment',
        '/docs',
        '/docs/installation',
        '/docs/getting-started',
        '/docs/local-setup',
        '/docs/api-reference',
        '/docs/paike-engine',
        '/docs/foundry-cli',
        '/download',
        '/faq',
        '/features',
        '/github',
        '/integrations',
        '/local-ai',
        '/paike',
        '/pricing',
        '/privacy',
        '/roadmap',
        '/showcase',
        '/templates',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Blog posts
    const blogPosts = [
        'v0-32-0-release',
        '10-tips-ai-apps',
        'understanding-typescript',
        'community-spotlight',
        'deploying-your-first-app',
        'security-best-practices'
    ].map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...routes, ...blogPosts]
}
