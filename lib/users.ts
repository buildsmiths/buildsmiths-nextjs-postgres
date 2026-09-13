import { sql } from 'drizzle-orm';
import { db, isDatabaseConfigured } from '@/lib/db';
import { subscriptions, users } from '@/db/schema';

export async function upsertUserByEmail(email: string, passwordHash?: string | null) {
    if (!isDatabaseConfigured()) {
        throw new Error('DATABASE_URL is not configured');
    }

    const existing = await db
        .select()
        .from(users)
        .where(sql`lower(${users.email}) = lower(${email})`)
        .limit(1);

    const user = existing[0];
    if (user) return user;

    const inserted = await db
        .insert(users)
        .values({ email, passwordHash: passwordHash ?? null })
        .returning();
    const created = inserted[0];
    if (!created) throw new Error('Failed to create user');

    await db
        .insert(subscriptions)
        .values({ userId: created.id, tier: 'free', status: 'none' })
        .onConflictDoNothing();

    return created;
}
