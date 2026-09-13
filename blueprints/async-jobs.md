# Spec: Async jobs

Postgres-backed jobs on Drizzle. Skip Redis unless asked (`npx skills add redis/agent-skills@redis-core`).

Follow `.agents/skills/add-async-jobs/SKILL.md`.

## Shape

- `jobs` table in `db/schema.ts`
- `lib/jobs/enqueue.ts`
- `scripts/worker.ts` with `FOR UPDATE SKIP LOCKED`
- No BullMQ “for later”
