# Spec: Stripe billing

Add Stripe to this kernel. Do not copy a frozen SDK tutorial from 2025.

## Do this

```bash
npx skills add stripe/ai@stripe-best-practices
```

Then follow `.agents/skills/add-stripe/SKILL.md`.

## Already in this repo

- `subscriptions` in `db/schema.ts` (`tier`, `status`, period columns)
- Account page explains billing is an add-on
- No `stripe` package until you install it

## Map onto the kernel

- Add `stripeCustomerId` and `stripeSubscriptionId` on `subscriptions`
- `npm run db:push`
- Checkout / portal from `app/account/actions.ts`
- Webhook `app/api/webhooks/stripe/route.ts` with signature verification
- Keep a no-keys local path
