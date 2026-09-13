import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { db, isDatabaseConfigured } from './db';
import { users } from '@/db/schema';
import { getServerSession } from 'next-auth';
import { sql } from 'drizzle-orm';
import { env } from './env';
import { logAuditEvent } from './audit';
import { upsertUserByEmail } from './users';

const providers: AuthOptions['providers'] = [
    Credentials({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(creds) {
            const email = creds?.email;
            const password = creds?.password;
            if (!email || !password) return null;
            if (!isDatabaseConfigured()) return null;

            try {
                const userRows = await db
                    .select({
                        id: users.id,
                        email: users.email,
                        passwordHash: users.passwordHash,
                    })
                    .from(users)
                    .where(sql`lower(${users.email}) = lower(${email})`)
                    .limit(1);

                const user = userRows[0];
                if (!user?.passwordHash) return null;
                const ok = await compare(password, user.passwordHash);
                return ok ? { id: user.id, email: user.email } : null;
            } catch (error) {
                console.error('auth.authorize.failed', error);
                return null;
            }
        },
    }),
];

if (env.google.enabled) {
    providers.push(
        GoogleProvider({
            clientId: env.google.clientId!,
            clientSecret: env.google.clientSecret!,
        }),
    );
}

export const authOptions: AuthOptions = {
    secret: env.authSecret,
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/auth',
        error: '/auth',
    },
    providers,
    callbacks: {
        async jwt({ token, user, account }) {
            if (user?.email && account?.provider === 'google' && isDatabaseConfigured()) {
                try {
                    const row = await upsertUserByEmail(user.email);
                    token.sub = row.id;
                    token.email = row.email;
                    return token;
                } catch (error) {
                    console.error('auth.google.upsert.failed', error);
                }
            }
            if (user?.id) token.sub = user.id;
            if (user?.email) token.email = user.email;
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    events: {
        async signIn({ user }) {
            await logAuditEvent('auth.signin', user?.email ?? user?.id ?? null, {
                userId: user?.id,
            });
        },
        async signOut({ token }) {
            await logAuditEvent('auth.signout', token?.email ?? token?.sub ?? null, {
                userId: token?.sub,
            });
        },
    },
};

export type AppAuthOptions = typeof authOptions;

export interface AuthSession {
    userId: string;
    email?: string;
}

export async function getServerAuthSession(): Promise<AuthSession | null> {
    try {
        const session = await getServerSession(authOptions);
        const id = session?.user?.id;
        if (!id) return null;
        const out: AuthSession = { userId: id };
        if (session.user.email) out.email = session.user.email;
        return out;
    } catch {
        return null;
    }
}
