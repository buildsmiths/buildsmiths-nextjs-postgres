import { NextResponse } from 'next/server';
import { llmsTxt } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export function GET() {
    return new NextResponse(llmsTxt(), {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
