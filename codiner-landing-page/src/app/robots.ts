import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/dashboard/',
                '/login',
                '/signup',
                '/forgot-password',
                '/profile'
            ],
        },
        sitemap: 'https://codiner.online/sitemap.xml',
    }
}
