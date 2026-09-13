import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SignInPanel } from '@/components/SignInPanel';
import { Button } from '@/components/ui/button';
import { env } from '@/lib/env';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
    title: 'Sign in',
    description: 'Sign in to the BuildSmiths starter dashboard.',
    path: '/auth',
    index: false,
});

export default async function AuthPage() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return (
            <main aria-label="Auth" className="max-w-md mx-auto p-6 space-y-4" data-auth-state="signed-in">
                <h1 className="text-2xl font-semibold tracking-tight">Already signed in</h1>
                <p className="text-sm text-muted-foreground">
                    {session.user.email ? (
                        <>Signed in as <span className="font-medium text-foreground">{session.user.email}</span>.</>
                    ) : (
                        <>You are signed in.</>
                    )}
                </p>
                <Button asChild>
                    <a href="/dashboard">Go to dashboard</a>
                </Button>
            </main>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-4" data-auth-state="signed-out">
            <SignInPanel enableGoogle={env.google.enabled} />
            <p className="text-xs text-muted-foreground text-center">
                After <code className="font-mono">npm run db:seed</code>: <span className="font-medium text-foreground">dev@example.com</span> / <span className="font-medium text-foreground">Password123!</span>
            </p>
        </div>
    );
}
