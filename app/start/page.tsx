import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { MarkdownDoc } from '@/components/MarkdownDoc';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Start',
    description:
        'How to clone the BuildSmiths Next.js + Postgres kernel, run it, and add Stripe, AI chat, or Neon with skills.sh.',
    path: '/start',
});

export default async function StartPage() {
    const source = await fs.readFile(path.join(process.cwd(), 'START.md'), 'utf-8');

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <MarkdownDoc source={source} />
        </div>
    );
}
