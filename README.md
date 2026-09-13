<div align="center">
  <h1>BuildSmiths Next.js + Postgres</h1>
  <p><strong>A lean kernel: Next.js 16, Drizzle, Auth.js v4.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js_16-000?style=flat-square&logo=nextdotjs" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
    <img src="https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white" alt="Postgres" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

**Docs:** [START.md](./START.md) (also `/start`) · **Agents:** `AGENTS.md` · **llms.txt:** `/llms.txt`  
**Demo:** [buildsmiths-nextjs-postgres-stripe.vercel.app](https://buildsmiths-nextjs-postgres-stripe.vercel.app) — never put `DATABASE_URL` in git.

## Quickstart

```bash
git clone https://github.com/buildsmiths/buildsmiths-nextjs-postgres.git my-app
cd my-app
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev
```

Seed login: `dev@example.com` / `Password123!`. Generate `AUTH_SECRET` with `openssl rand -base64 32`.

## Add-ons (skills.sh)

Keep the kernel lean. Install vendor skills, then map them onto `db/schema.ts`:

```bash
npx skills add neondatabase/agent-skills@neon-postgres
npx skills add stripe/ai@stripe-best-practices
npx skills add vercel/ai@ai-sdk
npx skills add redis/agent-skills@redis-core
```

This repo’s thin skills: `.agents/skills/`. Human copies: `blueprints/`.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/buildsmiths/buildsmiths-nextjs-postgres&project-name=buildsmiths-starter&repository-name=buildsmiths-starter&framework=nextjs)

Import at the **repository root** (not `app/`). First deploy can omit env vars. Then set `DATABASE_URL`, `AUTH_SECRET`, push the schema.

MIT — see `LICENSE`.
