---
name: add-google-auth
description: Enable Google OAuth on this BuildSmiths Auth.js v4 starter. Use when the user wants Sign in with Google. password_hash is already nullable. Keep the credentials provider.
---

# Add Google OAuth

`lib/auth.ts` already registers `GoogleProvider` when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set. `SignInPanel` already has an `enableGoogle` button.

1. Create OAuth credentials in Google Cloud. Redirect: `{SITE_URL}/api/auth/callback/google`.
2. Set env vars. Do not commit them.
3. `upsertUserByEmail` in `lib/users.ts` must run on Google sign-in so `users.id` is our UUID (`password_hash` may be null).
4. Keep email+password working. Link by verified email if the row already exists.

Human copy: `blueprints/auth-google.md`.
