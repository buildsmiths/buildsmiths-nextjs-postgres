import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MarkdownDoc } from '@/components/MarkdownDoc';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
    params: Promise<{ slug: string }>;
}

function titleFromSlug(slug: string) {
    return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateStaticParams() {
    const files = await fs.readdir(path.join(process.cwd(), 'blueprints'));
    return files.filter((file) => file.endsWith('.md')).map((file) => ({ slug: file.replace('.md', '') }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const title = titleFromSlug(slug);
    return buildMetadata({
        title,
        description: `Add-on spec for ${title} on the BuildSmiths Next.js + Postgres kernel.`,
        path: `/blueprints/${slug}`,
    });
}

export default async function BlueprintPage({ params }: PageProps) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'blueprints', `${slug}.md`);

    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const title = titleFromSlug(slug);

        return (
            <div className="mx-auto max-w-3xl px-4 py-12 space-y-8">
                <Button variant="ghost" asChild className="-ml-2">
                    <Link href="/blueprints">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to add-ons
                    </Link>
                </Button>
                <div className="space-y-3">
                    <Badge variant="outline" className="font-mono text-xs">blueprints/{slug}.md</Badge>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">
                        Point your agent at this file or the matching skill in <code className="font-mono text-sm">.agents/skills/</code>.
                    </p>
                </div>
                <MarkdownDoc source={content} />
            </div>
        );
    } catch {
        notFound();
    }
}
