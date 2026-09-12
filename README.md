<div align="center">
  <!-- Place your hero screenshot image here! -->
  <!-- <img src="/public/hero-screenshot.png" alt="BuildSmiths SaaS Starter" width="100%" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" /> -->
  
  <h1>🛠️ BuildSmiths Next.js + Postgres Starter</h1>
  <p><strong>The minimal, AI-native SaaS foundation for 2026.</strong></p>
  
  <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
    <img src="https://img.shields.io/badge/Next.js_16-000?style=flat-square&logo=nextdotjs" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
    <img src="https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white" alt="Postgres" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </div>
</div>

**Live demo:** [buildsmiths-nextjs-postgres-stripe.vercel.app](https://buildsmiths-nextjs-postgres-stripe.vercel.app) — hosted Postgres (Neon) plus Vercel env vars. Do not put `DATABASE_URL` in git.

---

## ✨ Features

- **⚡ Next.js 16 & React 19:** Powered by App Router and Turbopack for lightning-fast development.
- **🔐 Auth.js v4:** Credentials (email + password) with JWT sessions. Route gating lives in `proxy.ts`.
- **🗄️ Fully Typed Database:** Pure **PostgreSQL** handled securely by **Drizzle ORM**. Zero monolith bloat, full edge-compatibility.
- **🎨 Zero Component Lock-In:** Lean layout wrappers built on pure **Tailwind CSS v4**.
- **🧩 AI-Native Blueprints:** A unique architecture where complex features (like Stripe billing) are stored as Markdown specs natively. Feed them directly to your AI agent for instant codebase generation.

---

## 🚀 Quickstart (5 Minutes)

### 1. Clone & Install
```bash
git clone https://github.com/buildsmiths/buildsmiths-nextjs-postgres.git my-saas
cd my-saas
npm install
```

### 2. Environment Setup
Copy the example environment variables:
```bash
cp .env.example .env.local
```
Then, update `.env.local` with your Postgres `DATABASE_URL` and generate a `NEXTAUTH_SECRET` (you can run `openssl rand -base64 32` to get a strong random string).

### 3. Database Schema & Seed
Push the Drizzle schema to your live database and seed a test user:
```bash
npm run db:push
npm run db:seed
```

### 4. Start Development
```bash
npm run dev
```
Visit `http://localhost:3000`, click **Sign In**, and log in with your freshly seeded user `dev@example.com` (Password: `Password123!`).

---

## 📘 AI Blueprints (Features & Integrations)

This starter is intentionally lightweight. Instead of forcing UI libraries or bloated API integrations on you, it includes **Blueprints** located in the `blueprints/` folder. 

Simply copy the content of any Blueprint markdown file and paste it to your modern AI coding agent (like GitHub Copilot, Cursor, or Aider) to instantly scaffold well-tested, properly-architected features securely into your app.

**Included Blueprint Examples:**
- 💳 `billing-stripe.md` - Integrates Stripe Checkout, Webhooks, and Customer Portal Sessions.
- 🔑 `auth-google.md` - Injects Google OAuth Provider cleanly into Auth.js.
- ✨ `ai-sdk.md` - Streaming chat with the Vercel AI SDK / OpenRouter.
- ⚙️ `async-jobs.md` - Postgres-backed background jobs without Redis.

---

## 📂 Project Structure

```text
app/               # Next.js App Router pages, layouts, and Server Actions
blueprints/        # AI spec documentation to securely prompt new features
components/        # Lean UI layout wrappers (Tailwind v4 only - make it your own)
db/                # Drizzle ORM schema definitions, natively typed
lib/               # Core configuration, auth handling, and Drizzle instances
scripts/           # Native Node TS scripts for Drizzle seeding without overhead
```

## 🛠️ Developer Commands

- `npm run dev`: Start Turbopack dev server.
- `npm run build`: Create optimized production build.
- `npm run db:generate`: Generate new Drizzle SQL migrations.
- `npm run db:push`: Push local Drizzle schema changes to your DB directly.
- `npm run typecheck`: Run strict TypeScript validation suite.

---

## 📈 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/buildsmiths/buildsmiths-nextjs-postgres&project-name=buildsmiths-starter&repository-name=buildsmiths-starter&framework=nextjs)

Import this repository on Vercel (or use the button above) **with default settings**. You do not need to fill environment variables on the first deploy. The landing page, Blueprints, and health check will come up; a setup banner lists what to add next.

`vercel.json` pins the **Next.js** framework plus install/build commands so Vercel does not skip `npm install` or treat this as a non-Next app.

**Do not set Root Directory to `app`.** That folder is the App Router, not a nested project. Leave Root Directory empty (repository root), where `package.json` declares `"next"`. Setting Root Directory to `app` produces `No Next.js version detected`.

Use these project settings (also encoded in `vercel.json`):

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | _leave empty_ (repo root, not `app`) |
| Install Command | `npm install` |
| Build Command | `next build` |
| Output Directory | _leave default_ (do not set `.next`, `out`, or `app`) |
| Node.js Version | 20.9+ (Vercel default 24.x is fine) |

After the first successful deploy, add these in Project Settings → Environment Variables and redeploy:

- `DATABASE_URL` — Postgres connection string
- `AUTH_SECRET` — `openssl rand -base64 32` (`NEXTAUTH_SECRET` is accepted as an alias)
- `NEXT_PUBLIC_SITE_URL` — optional on Vercel; falls back to `VERCEL_URL`

Then push the Drizzle schema (`npm run db:push`) against that same `DATABASE_URL`.

This repository is licensed under the MIT License. See `LICENSE`.
