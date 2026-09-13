# BuildSmiths Next.js + Postgres

Read **`START.md`** first (also served at `/start`). That is the one page for humans and agents.

Then open `.agents/skills/buildsmiths/SKILL.md`. Optional add-ons are sibling skills plus vendor packages on https://skills.sh (`npx skills add owner/repo@skill`).

Do not add Stripe, AI SDK, Redis, or a second auth library unless the user asked.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
