'use server';

import { hash } from 'bcryptjs';
import { db, isDatabaseConfigured } from '@/lib/db';
import { subscriptions, users } from '@/db/schema';
import { logAuditEvent } from '@/lib/audit';

export async function registerAction(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!isDatabaseConfigured()) {
        return { ok: false, code: 'SETUP_REQUIRED', message: 'Add DATABASE_URL in Vercel (or .env.local) before creating an account.' };
    }

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return { ok: false, code: 'BAD_REQUEST', message: 'Invalid email or password.' };
    }

    if (password.length < 8) {
        return { ok: false, code: 'WEAK_PASSWORD', message: 'Password must be at least 8 characters.' };
    }

    const pw = await hash(password, 12);

    try {
        const inserted = await db.insert(users).values({ email, passwordHash: pw }).returning({ id: users.id });
        const userId = inserted[0]?.id;
        if (userId) {
            await db.insert(subscriptions).values({ userId, tier: 'free', status: 'none' });
            await logAuditEvent('auth.register', email, { userId });
        }
    } catch (e: any) {
        if (/unique|duplicate/i.test(e?.message || '')) {
            return { ok: false, code: 'EMAIL_IN_USE', message: 'This email is already registered.' };
        }
        console.error('Registration error:', e);
        return { ok: false, code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again.' };
    }

    return { ok: true, code: 'SUCCESS', message: 'Account created.' };
}
