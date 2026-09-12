import { NextResponse } from 'next/server';
import { env, isSetupComplete } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    setupComplete: isSetupComplete(),
    database: env.isDatabaseConfigured,
    authSecret: env.isAuthSecretConfigured,
  });
}
