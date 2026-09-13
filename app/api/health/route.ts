import { NextResponse } from 'next/server';
import { env, isSetupComplete } from '@/lib/env';

export const dynamic = 'force-dynamic';

export function GET() {
    return NextResponse.json(
        {
            ok: true,
            time: new Date().toISOString(),
            setupComplete: isSetupComplete(),
            database: env.isDatabaseConfigured,
            authSecret: env.isAuthSecretConfigured,
        },
        {
            headers: {
                'Cache-Control': 'no-store',
            },
        },
    );
}
