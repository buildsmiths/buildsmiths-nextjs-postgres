/**
 * Runtime config for a beginner-friendly deploy.
 * Missing vars do not crash the build or the landing page.
 * Vercel system env (VERCEL_URL) fills in the public site URL when unset.
 */

const FALLBACK_AUTH_SECRET =
    'buildsmiths-starter-dev-only-not-for-production-use';

function isUsableUrl(value: string | undefined): value is string {
    return !!value && value.startsWith('http');
}

function isUsableSecret(value: string | undefined): value is string {
    return !!value && value !== 'X' && value.length >= 16;
}

function isUsableDatabaseUrl(value: string | undefined): value is string {
    if (!value || value === 'X') return false;
    return value.startsWith('postgres://') || value.startsWith('postgresql://');
}

function resolveSiteUrl(): string {
    if (isUsableUrl(process.env.NEXT_PUBLIC_SITE_URL)) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
    }
    const vercelHost =
        process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
    if (vercelHost) {
        return vercelHost.startsWith('http') ? vercelHost.replace(/\/$/, '') : `https://${vercelHost}`;
    }
    return 'http://localhost:3000';
}

function resolveAuthSecret(): { secret: string; isFallback: boolean } {
    const configured =
        process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    if (isUsableSecret(configured)) {
        return { secret: configured, isFallback: false };
    }
    return { secret: FALLBACK_AUTH_SECRET, isFallback: true };
}

const siteUrl = resolveSiteUrl();
const { secret: authSecret, isFallback: isAuthSecretFallback } = resolveAuthSecret();
const databaseUrl = process.env.DATABASE_URL;
const isDatabaseConfigured = isUsableDatabaseUrl(databaseUrl);

if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = siteUrl;
}
if (!process.env.NEXTAUTH_SECRET) {
    process.env.NEXTAUTH_SECRET = authSecret;
}
if (!process.env.AUTH_SECRET) {
    process.env.AUTH_SECRET = authSecret;
}

export const env = {
    siteUrl,
    authSecret,
    databaseUrl: isDatabaseConfigured ? databaseUrl : undefined,
    isDatabaseConfigured,
    isAuthSecretConfigured: !isAuthSecretFallback,
    isAuthSecretFallback,
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        enabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
};

export type MissingSetupItem = {
    name: string;
    why: string;
};

export function getMissingSetup(): MissingSetupItem[] {
    const missing: MissingSetupItem[] = [];
    if (!env.isDatabaseConfigured) {
        missing.push({
            name: 'DATABASE_URL',
            why: 'Postgres connection string. Auth and the dashboard need this.',
        });
    }
    if (!env.isAuthSecretConfigured) {
        missing.push({
            name: 'AUTH_SECRET',
            why: 'Random secret for sessions. Generate with openssl rand -base64 32. NEXTAUTH_SECRET also works.',
        });
    }
    return missing;
}

export function isSetupComplete(): boolean {
    return getMissingSetup().length === 0;
}
