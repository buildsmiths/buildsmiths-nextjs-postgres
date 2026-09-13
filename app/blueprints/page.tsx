import React from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Terminal, CreditCard, Sparkles, Server, Shield, ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Add-ons',
    description: 'Optional Stripe, Google OAuth, AI SDK, and job queue skills for the BuildSmiths Next.js starter.',
    path: '/blueprints',
});

const addons = [
    {
        title: 'Stripe Billing',
        id: 'billing-stripe',
        file: 'blueprints/billing-stripe.md',
        skill: 'npx skills add stripe/ai@stripe-best-practices',
        icon: CreditCard,
        description: 'Checkout, portal, webhooks. Map onto the existing subscriptions table.',
    },
    {
        title: 'Google Authentication',
        id: 'auth-google',
        file: 'blueprints/auth-google.md',
        skill: 'Env keys + existing GoogleProvider',
        icon: Shield,
        description: 'Optional OAuth. password_hash is nullable so Google users can exist.',
    },
    {
        title: 'AI SDK',
        id: 'ai-sdk',
        file: 'blueprints/ai-sdk.md',
        skill: 'npx skills add vercel/ai@ai-sdk',
        icon: Sparkles,
        description: 'Streaming chat when you want it. Not in the default clone.',
    },
    {
        title: 'Async Jobs',
        id: 'async-jobs',
        file: 'blueprints/async-jobs.md',
        skill: 'Postgres jobs, or Redis via skills.sh',
        icon: Server,
        description: 'Background work on Postgres first. Redis only if you ask.',
    },
] as const;

export default function BlueprintsPage() {
    return (
        <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
            <div className="space-y-4">
                <Badge variant="secondary">skills.sh</Badge>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Add-ons</h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    Vendor skills on <a className="underline" href="https://skills.sh" target="_blank" rel="noreferrer">skills.sh</a> stay current.
                    This repo only records how they attach to Drizzle and Auth.js v4. Read <Link className="underline" href="/start">Start</Link> first.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {addons.map((item) => (
                    <Link href={`/blueprints/${item.id}`} key={item.id} className="block h-full group">
                        <Card className="flex flex-col h-full hover:shadow-md hover:border-primary/50 transition-all group-hover:bg-muted/5">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="font-mono text-xs text-muted-foreground break-all">{item.skill}</p>
                                <p className="font-mono text-xs text-muted-foreground">{item.file}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <Card className="bg-muted/30 border-dashed">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Terminal className="h-5 w-5" />
                        Example prompt
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-mono text-sm">
                        Read START.md. Keep Drizzle. Then npx skills add vercel/ai@ai-sdk and add a signed-in chat route.
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
