# Spec: AI SDK chat

Chat is not in the default clone.

```bash
npx skills add vercel/ai@ai-sdk
```

Then follow `.agents/skills/add-ai-sdk/SKILL.md`.

## Rules

- Keys stay on the server
- Use `streamText` / `generateText`
- Gate `/api/chat` with the existing Auth.js session
- Postgres for history if needed; Redis only if the user asked
- Model via env, not a hardcoded vendor
