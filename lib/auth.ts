import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { db, isDatabaseConfigured } from './db';
import { users } from '@/db/schema';
import { getServerSession } from 'next-auth';
import { sql } from 'drizzle-orm';
import { env } from './env';
import { logAuditEvent } from './audit';

const providers: any[] = [
    Credentials({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' }
        },
        async authorize(creds: Record<string, unknown> | undefined) {
            const email = creds?.email as string | undefined;
            const password = creds?.password as string | undefined;
            if (!email || !password) return null;
            if (!isDatabaseConfigured()) return null;

            try {
                const userRows = await db.select({
                    id: users.id,
                    email: users.email,
                    password_hash: users.passwordHash
                })
                    .from(users)
                    .where(sql`lower(${users.email}) = lower(${email})`)
                    .limit(1);

                const user = userRows[0];
                if (!user) return null;
                const ok = await compare(password, user.password_hash);
                return ok ? { id: user.id, email: user.email } : null;
            } catch (error) {
                console.error('auth.authorize.failed', error);
                return null;
            }
        }
    })
];

if (env.google.enabled) {
    providers.push(GoogleProvider({
        clientId: env.google.clientId!,
        clientSecret: env.google.clientSecret!
    }));
}

export const authOptions = {
    secret: env.authSecret,
    session: { strategy: 'jwt' as const },
    pages: {
        signIn: '/auth',
        error: '/auth'
    },
    providers,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user?.id) token.sub = user.id;
            if (user?.email) token.email = user.email;
            return token;
        },
        async session({ session, token }: any) {
            if (token?.sub) (session.user as any).id = token.sub;
            return session;
        }
    },
    events: {
        async signIn({ user }: any) {
            await logAuditEvent('auth.signin', user?.email ?? user?.id ?? null, {
                userId: user?.id,
            });
        },
        async signOut({ token }: any) {
            await logAuditEvent('auth.signout', token?.email ?? token?.sub ?? null, {
                userId: token?.sub,
            });
        },
    }
};

export type AppAuthOptions = typeof authOptions;

export interface AuthSession {
    userId: string;
    email?: string;
}

export async function getServerAuthSession(): Promise<AuthSession | null> {
    try {
        const session: any = await getServerSession(authOptions as any);
        const user: any = session?.user as any;
        const id: string | undefined = user?.id as string | undefined;
        if (id) {
            const out: AuthSession = { userId: id };
            if (user?.email) (out as any).email = user.email as string;
            return out;
        }
        return null;
    } catch {
        return null;
    }
}
