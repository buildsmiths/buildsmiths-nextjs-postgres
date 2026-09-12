import { db, isDatabaseConfigured } from '@/lib/db';
import { auditEvents } from '@/db/schema';

export async function logAuditEvent(
    type: string,
    actor?: string | null,
    payload?: unknown,
) {
    if (!isDatabaseConfigured()) return;
    try {
        await db.insert(auditEvents).values({
            type,
            actor: actor ?? null,
            payload: payload ?? null,
        });
    } catch (error) {
        console.error('audit.write.failed', error);
    }
}
