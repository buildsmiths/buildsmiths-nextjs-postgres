---
name: buildsmiths
description: First session after cloning the BuildSmiths Next.js + Postgres starter. Use when the user cloned this repo, wants to start an app, add features, or asks how the kernel works. Read START.md. Ask what add-ons they want. Do not install Stripe, AI SDK, Redis, or a new ORM unless they asked.
---

# BuildSmiths kernel

You are working in `buildsmiths/buildsmiths-nextjs-postgres` (or a clone).

1. Read `/START.md`.
2. Ask the human (skip what they already answered):
   - Postgres: local or Neon?
   - Auth: credentials only, or Google too?
   - Stripe billing?
   - AI chat (Vercel AI SDK)?
   - Email (Resend) or Redis?
3. Install **only** matching vendor skills from skills.sh, then follow the sibling skill in this folder.
4. Map new tables/columns onto `db/schema.ts`. Keep Auth.js v4 and Drizzle.

## Kernel map

| Piece | Path |
| --- | --- |
| Env / setup banner | `lib/env.ts`, `components/SetupBanner.tsx` |
| Drizzle | `db/schema.ts`, `lib/db.ts` |
| Auth | `lib/auth.ts`, `app/auth/` |
| Gating | `proxy.ts` |
| SEO | `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `/llms.txt` |

## Commands

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev
npm run typecheck
```

Never commit secrets. Never set Vercel Root Directory to `app/`.
