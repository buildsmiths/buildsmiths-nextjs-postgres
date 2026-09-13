---
name: add-ai-sdk
description: Add a streaming AI chat UI with the Vercel AI SDK to this BuildSmiths starter. Use when the user wants a chatbot, completions, or Anthropic/OpenAI via AI SDK. Install vercel/ai@ai-sdk from skills.sh. Do not add AI SDK unless they asked.
---

# Add AI SDK chat to this kernel

Chat is **not** in the default clone.

1. Vendor skill:

```bash
npx skills add vercel/ai@ai-sdk
```

2. Keep keys server-side. Use `streamText` / `generateText`. Gate `/api/chat` behind the existing Auth.js session.
3. Store threads in Postgres with Drizzle if they need history; do not add Redis unless they asked.
4. Model via env (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or OpenRouter). Do not hardcode a vendor.

Human copy: `blueprints/ai-sdk.md`.
