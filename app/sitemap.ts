import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    const publicPaths = ['/', '/start', '/blueprints', '/blueprints/billing-stripe', '/blueprints/auth-google', '/blueprints/ai-sdk', '/blueprints/async-jobs', '/auth'];

    return publicPaths.map((path) => ({
        url: absoluteUrl(path),
        lastModified,
        changeFrequency: path === '/' || path === '/start' ? 'weekly' : 'monthly',
        priority: path === '/' || path === '/start' ? 1 : 0.6,
    }));
}
