# BuildSmiths starter

One page for humans and coding agents. This repo is a **kernel**: Next.js 16, Postgres, Drizzle, Auth.js v4. It is not a chatbot, not a Stripe app, and not a marketplace.

Live demo: https://buildsmiths-nextjs-postgres-stripe.vercel.app
Source: https://github.com/buildsmiths/buildsmiths-nextjs-postgres

## What you get

- App Router pages in `app/`
- Auth (email + password) in `lib/auth.ts` and `/auth`
- Drizzle schema in `db/schema.ts`: `users`, `subscriptions`, `audit_events`
- Dashboard and account that read that schema
- Setup mode on Vercel if env vars are missing
- Optional add-ons as skills (`.agents/skills/`) plus vendor skills on [skills.sh](https://skills.sh)

## What you do not get until you ask

Stripe, Google OAuth UI, Vercel AI SDK, Redis, Resend. Those stay out of `package.json` so every clone stays predictable.

## First commands

```bash
git clone https://github.com/buildsmiths/buildsmiths-nextjs-postgres.git my-app
cd my-app
npm install
cp .env.example .env.local
# set DATABASE_URL and AUTH_SECRET (openssl rand -base64 32)
npm run db:push
npm run db:seed
npm run dev
```

Seed login: `dev@example.com` / `Password123!`

Vercel: import the **repository root** (not `app/`). First deploy can omit env vars.

## After clone, ask the human

1. Local Postgres or Neon?
2. Credentials only, or Google too?
3. Billing (Stripe) or not?
4. Chat / AI SDK or not?
5. Email (Resend) or Redis or neither?

Then install **only** the matching vendor skills and map them onto `db/schema.ts`. Do not scaffold a second auth stack or a second ORM.

## Add-ons (skills.sh)

The skills CLI is how agents load vendor docs. Prefer the vendor owner on [skills.sh](https://skills.sh).

```bash
npx skills add neondatabase/agent-skills@neon-postgres
npx skills add stripe/ai@stripe-best-practices
npx skills add vercel/ai@ai-sdk
npx skills add redis/agent-skills@redis-core
npx skills add resend/resend-skills@resend
```

This repo’s thin skills (how those map onto *this* kernel):

- `.agents/skills/buildsmiths/SKILL.md` — first session
- `.agents/skills/add-stripe/SKILL.md`
- `.agents/skills/add-ai-sdk/SKILL.md`
- `.agents/skills/add-google-auth/SKILL.md`
- `.agents/skills/add-async-jobs/SKILL.md`

Human-readable copies live in `blueprints/`.

## Example paste prompt

> Clone buildsmiths/buildsmiths-nextjs-postgres. Read START.md. Keep Drizzle and Auth.js v4. Then `npx skills add vercel/ai@ai-sdk neondatabase/agent-skills@neon-postgres` and add a signed-in chat page on the existing `users` table.

## Layout

- `app/` — routes, layouts, server actions
- `.agents/skills/` — agent skills
- `blueprints/` — same add-ons as markdown
- `db/schema.ts` — Drizzle
- `lib/` — env, db, auth, seo
- `scripts/seed.ts` — seed user

## Rules for agents

- Read `START.md` and `.agents/skills/buildsmiths/SKILL.md` before editing.
- Do not replace Auth.js v4 with Auth.js v5 / Better Auth / Clerk unless asked.
- Do not replace Drizzle with Prisma unless asked.
- Do not commit `.env` or `DATABASE_URL`.
- `users.password_hash` is nullable so Google OAuth users can exist without a password.
