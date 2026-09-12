'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function getSession() {
    return await getServerSession(authOptions as any);
}

export async function upgradeSubscription() {
    const session = await getSession();
    if (!session || !((session as any).user as any)?.id) {
        redirect('/auth');
    }
    redirect('/blueprints/billing-stripe');
}

export async function manageSubscription() {
    const session = await getSession();
    if (!session || !((session as any).user as any)?.id) {
        redirect('/auth');
    }
    redirect('/blueprints/billing-stripe');
}
