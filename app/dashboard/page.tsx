import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth';
import { db, isDatabaseConfigured } from '@/lib/db';
import { subscriptions } from '@/db/schema';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
    title: 'Dashboard',
    description: 'Signed-in home for the BuildSmiths starter.',
    path: '/dashboard',
    index: false,
});

const nextSteps = [
    {
        href: '/start',
        title: 'Start page',
        body: 'The one doc for you and your agent. Commands, rules, and add-ons.',
    },
    {
        href: '/blueprints/billing-stripe',
        title: 'Stripe billing',
        body: 'npx skills add stripe/ai@stripe-best-practices then map onto subscriptions.',
    },
    {
        href: '/blueprints/ai-sdk',
        title: 'AI chat',
        body: 'npx skills add vercel/ai@ai-sdk. Not bundled in this kernel.',
    },
] as const;

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/auth');
    }

    const userId = session.user.id;
    const email = session.user.email || 'signed in';

    let plan = 'free';
    let status = 'none';
    if (isDatabaseConfigured() && userId) {
        try {
            const rows = await db
                .select({
                    tier: subscriptions.tier,
                    status: subscriptions.status,
                })
                .from(subscriptions)
                .where(eq(subscriptions.userId, userId))
                .limit(1);
            plan = rows[0]?.tier || 'free';
            status = rows[0]?.status || 'none';
        } catch (error) {
            console.error('dashboard.subscription.failed', error);
        }
    }

    return (
        <main aria-label="Dashboard" className="max-w-5xl mx-auto px-4 py-10 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Home</h1>
                    <p className="text-muted-foreground">
                        Your session, plan row, and audit log. Fake admin charts are gone on purpose.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-medium">{email}</p>
                </div>
            </header>

            <section className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Plan</CardTitle>
                        <CardDescription>From the subscriptions table</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="uppercase text-sm text-muted-foreground">{plan} · {status}</span>
                        <Badge variant="secondary">{plan === 'premium' ? 'Premium' : 'Free'}</Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Next</CardTitle>
                        <CardDescription>Extend the kernel with vendor skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/start">Open Start</Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>

            <section className="grid md:grid-cols-3 gap-4">
                {nextSteps.map((step) => (
                    <Link key={step.href} href={step.href} className="group">
                        <Card className="h-full transition-colors group-hover:border-primary/50">
                            <CardHeader>
                                <CardTitle className="text-base">{step.title}</CardTitle>
                                <CardDescription>{step.body}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </section>

            <RecentActivity />
        </main>
    );
}
