import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Terminal, Layers, Code2, Box, GitBranch, ExternalLink, FolderTree } from 'lucide-react';
import { GITHUB_REPO, GITHUB_SLUG, SITE_TAGLINE } from '@/lib/seo';

export default function Landing() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-16 space-y-24">
            <section className="space-y-6 text-center pt-8">
                <Badge variant="secondary" className="mb-4">Next.js 16 · Drizzle · Auth.js v4</Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground/90">
                    A kernel you can clone
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                    {SITE_TAGLINE}. Add Stripe, chat, or Redis with vendor skills from skills.sh — not extra boilerplate in this repo.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <Button asChild size="lg" className="h-12 px-8 text-base">
                        <a href="/start">Read Start</a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-12 px-8">
                        <a href="/dashboard">Sign in</a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-12 px-8">
                        <a href={GITHUB_REPO} target="_blank" rel="noreferrer">GitHub</a>
                    </Button>
                </div>
            </section>

            <section id="quickstart" aria-labelledby="quickstart-title" className="space-y-8">
                <div className="text-center mb-8">
                    <h2 id="quickstart-title" className="text-3xl font-bold tracking-tight mb-2">Get running</h2>
                    <p className="text-muted-foreground">Same commands as <a className="underline" href="/start">Start</a>.</p>
                </div>

                <Card className="w-full border-2 shadow-sm">
                    <CardHeader className="border-b bg-muted/20 pb-6">
                        <CardTitle className="text-2xl">Quickstart</CardTitle>
                        <CardDescription>For you and for the agent that cloned this repo.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-10 pt-8">
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 font-semibold text-lg text-foreground">
                                <Terminal className="h-5 w-5 text-primary" />
                                Commands
                            </h3>
                            <div className="bg-zinc-950 text-zinc-50 rounded-lg border shadow-sm overflow-hidden">
                                <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">bash</div>
                                <pre className="p-4 text-sm font-mono overflow-x-auto leading-relaxed">{`git clone https://github.com/buildsmiths/buildsmiths-nextjs-postgres.git my-app
cd my-app
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev`}</pre>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 font-semibold text-lg text-foreground">
                                <FolderTree className="h-5 w-5 text-primary" />
                                Layout
                            </h3>
                            <div className="border rounded-lg divide-y text-sm">
                                {[
                                    ['app/', 'App Router pages and actions'],
                                    ['.agents/skills/', 'Agent skills for this kernel'],
                                    ['blueprints/', 'Human copies of the same add-ons'],
                                    ['db/', 'Drizzle schema.ts'],
                                    ['lib/', 'Env, auth, db, SEO'],
                                    ['START.md', 'The one doc page'],
                                ].map(([name, desc]) => (
                                    <div key={name} className="grid grid-cols-[140px_1fr] p-3 gap-2 hover:bg-muted/30 transition-colors">
                                        <span className="font-mono text-muted-foreground">{name}</span>
                                        <span className="text-foreground">{desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="h-full border-muted-foreground/20 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Box className="h-5 w-5 text-primary" />
                                Kernel
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span><strong>Auth.js v4</strong> email + password</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span><strong>Drizzle</strong> users, subscriptions, audit_events</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span><strong>SEO</strong> sitemap, robots, JSON-LD, llms.txt</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="h-full border-muted-foreground/20 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Layers className="h-5 w-5 text-primary" />
                                Stack
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-primary mt-0.5" />
                                    <span><strong>Next.js 16</strong> App Router</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-primary mt-0.5" />
                                    <span><strong>Postgres</strong> + Drizzle</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-primary mt-0.5" />
                                    <span><strong>Tailwind v4</strong> + shadcn/ui</span>
                                </li>
                            </ul>
                            <div className="mt-8 pt-4 border-t">
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <a href="/blueprints">
                                        Add-ons <ExternalLink className="ml-2 h-3 w-3" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="h-full border-muted-foreground/20 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code2 className="h-5 w-5 text-primary" />
                                Source
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">MIT. Free to clone.</p>
                            <div className="bg-muted/50 p-3 rounded text-xs font-mono">{GITHUB_SLUG}</div>
                            <Button className="w-full" asChild>
                                <a href={GITHUB_REPO} target="_blank" rel="noreferrer">
                                    <GitBranch className="mr-2 h-4 w-4" />
                                    GitHub
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Add-ons via skills.sh</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Vendor skills stay current. This repo only maps them onto <code className="font-mono text-sm">db/schema.ts</code>.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-xl p-6 bg-muted/30">
                        <Badge variant="outline">npx skills add vercel/ai@ai-sdk</Badge>
                        <h3 className="text-xl font-semibold mt-4 mb-2">AI chat</h3>
                        <p className="text-sm text-muted-foreground">Not in package.json until you ask. Gate it behind the existing session.</p>
                    </div>
                    <div className="border rounded-xl p-6 bg-muted/30">
                        <Badge variant="outline">npx skills add stripe/ai@stripe-best-practices</Badge>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Stripe</h3>
                        <p className="text-sm text-muted-foreground">subscriptions table is already here. Checkout is an add-on.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
