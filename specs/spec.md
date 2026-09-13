# Project spec

Kernel: Next.js 16 App Router, Auth.js v4 credentials, Postgres + Drizzle, Tailwind v4.

Read `START.md` for humans and agents. Skills in `.agents/skills/`. Vendor add-ons via [skills.sh](https://skills.sh).

## Env

Optional on first Vercel import. Runtime: `DATABASE_URL`, `AUTH_SECRET` (or `NEXTAUTH_SECRET`), optional `NEXT_PUBLIC_SITE_URL` / `VERCEL_URL`.

## Data

`users` (email, nullable `password_hash`), `subscriptions`, `audit_events` in `db/schema.ts`.

## Auth

Credentials + optional Google. `upsertUserByEmail` on Google sign-in. `proxy.ts` gates `/dashboard` and `/account` only.

## Public / SEO

`/`, `/start`, `/blueprints`, `/llms.txt`, `sitemap.xml`, `robots.txt`, JSON-LD, Open Graph image. Dashboard and account are `noindex`.

## Commands

`npm run db:push` · `db:seed` · `dev` · `build` · `typecheck`
