import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/db/schema';
import { env } from './env';

let pool: pg.Pool | null = null;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

const POOL_CONFIG: pg.PoolConfig = {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
};

export function isDatabaseConfigured(): boolean {
    return env.isDatabaseConfigured;
}

export function getPool(): pg.Pool {
    if (!env.isDatabaseConfigured || !env.databaseUrl) {
        throw new Error('DATABASE_URL is not configured');
    }

    if (!pool) {
        pool = new pg.Pool({
            connectionString: env.databaseUrl,
            ...POOL_CONFIG,
        });

        pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
        });
    }
    return pool;
}

export function getDb() {
    if (!dbInstance) {
        dbInstance = drizzle(getPool(), { schema });
    }
    return dbInstance;
}

export const db = new Proxy({} as ReturnType<typeof getDb>, {
    get(_target, prop, receiver) {
        return Reflect.get(getDb(), prop, receiver);
    },
});
