---
name: add-stripe
description: Add Stripe Checkout, Customer Portal, and webhooks to this BuildSmiths starter. Use when the user wants billing, subscriptions, payments, or Stripe. Install the official Stripe skill from skills.sh, then map it onto the existing subscriptions table.
---

# Add Stripe to this kernel

This repo already has `subscriptions` (`tier`, `status`, period timestamps) and an Account page that links here. There is **no** Stripe SDK in `package.json`.

1. Install vendor docs (they stay current; we do not fork them):

```bash
npx skills add stripe/ai@stripe-best-practices
```

2. Add columns on `subscriptions` in `db/schema.ts`: `stripeCustomerId`, `stripeSubscriptionId`. `npm run db:push`.
3. Checkout / portal server actions from `app/account/actions.ts`. Webhook at `app/api/webhooks/stripe/route.ts`.
4. Keep a no-keys local path. Do not add a second billing provider.
5. Wire Account “Upgrade” to Checkout. Do not invent a fake success state.

Human copy: `blueprints/billing-stripe.md`.
