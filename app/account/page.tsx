import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth';
import { db, isDatabaseConfigured } from '@/lib/db';
import { subscriptions } from '@/db/schema';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
    title: 'Account',
    description: 'Account and subscription for the signed-in user.',
    path: '/account',
    index: false,
});

export default async function AccountPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/auth');
    }

    const user = {
        id: session.user.id,
        email: session.user.email || '',
    };

    let subscription: { tier: string; status: string } | null = null;
    if (isDatabaseConfigured() && user.id) {
        try {
            const rows = await db
                .select({
                    tier: subscriptions.tier,
                    status: subscriptions.status,
                })
                .from(subscriptions)
                .where(eq(subscriptions.userId, user.id))
                .limit(1);
            subscription = rows[0] ?? null;
        } catch (error) {
            console.error('account.subscription.failed', error);
        }
    }

    const tier = subscription?.tier || 'free';
    const status = subscription?.status || 'none';
    const isPremium = tier === 'premium';

    return (
        <main aria-label="Account Settings" className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                Email is stored on the <code className="font-mono text-xs">users</code> table. Name and avatars are not in this starter schema.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" defaultValue={user.email} disabled />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscription</CardTitle>
                            <CardDescription>Plan rows live in Postgres. Stripe is an add-on, not bundled code.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">Current Plan</p>
                                    <p className="text-sm text-muted-foreground uppercase">{tier} · {status}</p>
                                </div>
                                <Badge variant={isPremium ? 'default' : 'secondary'}>
                                    {isPremium ? 'Premium' : 'Free Tier'}
                                </Badge>
                            </div>

                            <div className="mt-4 p-4 border rounded-lg bg-muted/50 border-dashed">
                                <p className="text-sm text-muted-foreground">
                                    Billing is not wired. Follow <code className="font-mono bg-muted px-1 rounded">.agents/skills/add-stripe/SKILL.md</code> or install <code className="font-mono bg-muted px-1 rounded">npx skills add stripe/ai@stripe-best-practices</code>.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild>
                                <Link href="/blueprints/billing-stripe">Open Stripe add-on</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <CardDescription>Irreversible account actions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Account deletion is not implemented. Add a server action that removes the <code className="font-mono text-xs">users</code> row (subscriptions cascade) when you need it.
                            </p>
                            <Button variant="destructive" disabled>Delete Account</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
