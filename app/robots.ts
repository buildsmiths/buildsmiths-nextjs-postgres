import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/start', '/blueprints', '/llms.txt', '/auth'],
                disallow: ['/dashboard', '/account', '/api/'],
            },
        ],
        sitemap: absoluteUrl('/sitemap.xml'),
        host: absoluteUrl('/'),
    };
}
