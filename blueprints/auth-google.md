# Spec: Google authentication

Enable Google OAuth on the existing Auth.js v4 credentials app.

## Already in this repo

- `GoogleProvider` in `lib/auth.ts` when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
- Sign-in button via `enableGoogle`
- `users.password_hash` is nullable
- `upsertUserByEmail` in `lib/users.ts` so Google users get our UUID

## Do this

1. Google Cloud OAuth client. Redirect `{SITE_URL}/api/auth/callback/google`.
2. Set env vars. Never commit them.
3. Keep email/password working. Link by verified email.

See `.agents/skills/add-google-auth/SKILL.md`.
