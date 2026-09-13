---
name: add-async-jobs
description: Add a Postgres-backed job queue to this BuildSmiths Drizzle starter. Use when the user wants background jobs, email sending later, or a worker without Redis.
---

# Add async jobs

Prefer Postgres over Redis unless they asked for Redis (`npx skills add redis/agent-skills@redis-core`).

1. Add a `jobs` table in `db/schema.ts` (id, type, payload jsonb, status, timestamps, error). `npm run db:push`.
2. `lib/jobs/enqueue.ts` using Drizzle.
3. `scripts/worker.ts` claiming rows with `FOR UPDATE SKIP LOCKED`.
4. Do not add Bull/Redis “to be safe.”

Human copy: `blueprints/async-jobs.md`.
