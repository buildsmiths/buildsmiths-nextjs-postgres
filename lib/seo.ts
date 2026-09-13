import type { Metadata } from 'next';
import { env } from '@/lib/env';

export const SITE_NAME = 'BuildSmiths StarterKit';
export const SITE_TAGLINE = 'Next.js 16 + Postgres + Drizzle + Auth.js v4 kernel';
export const SITE_DESCRIPTION =
    'A lean open-source starter for Next.js 16, Postgres, Drizzle ORM, and Auth.js v4. Clone it, sign in, then add Stripe, AI chat, or Google with vendor skills from skills.sh.';
export const GITHUB_REPO = 'https://github.com/buildsmiths/buildsmiths-nextjs-postgres';
export const GITHUB_SLUG = 'buildsmiths/buildsmiths-nextjs-postgres';

export const KEYWORDS = [
    'Next.js starter',
    'Next.js 16',
    'Postgres',
    'Drizzle ORM',
    'Auth.js',
    'NextAuth',
    'SaaS starter',
    'Vercel',
    'Neon',
    'AI agent skills',
    'skills.sh',
] as const;

export function absoluteUrl(path = '/'): string {
    const base = env.siteUrl.replace(/\/$/, '');
    if (!path || path === '/') return base;
    return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildMetadata({
    title,
    description = SITE_DESCRIPTION,
    path = '/',
    index = true,
}: {
    title: string;
    description?: string;
    path?: string;
    index?: boolean;
}): Metadata {
    const url = absoluteUrl(path);
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

    return {
        title,
        description,
        keywords: [...KEYWORDS],
        authors: [{ name: 'BuildSmiths', url: GITHUB_REPO }],
        creator: 'BuildSmiths',
        publisher: 'BuildSmiths',
        category: 'technology',
        alternates: {
            canonical: url,
        },
        robots: index
            ? { index: true, follow: true }
            : { index: false, follow: false },
        openGraph: {
            type: 'website',
            url,
            title: fullTitle,
            description,
            siteName: SITE_NAME,
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
        },
    };
}

export const faqItems = [
    {
        question: 'What is in the BuildSmiths starter kernel?',
        answer: 'Next.js 16 App Router, React 19, Tailwind CSS v4, Postgres with Drizzle ORM, and Auth.js v4 email/password auth. Stripe, AI chat, Redis, and Google OAuth are optional add-ons.',
    },
    {
        question: 'How do I add Stripe, AI chat, or Redis?',
        answer: 'Do not fork extra boilerplate. Read START.md, then install vendor skills from skills.sh (for example npx skills add stripe/ai@stripe-best-practices or vercel/ai@ai-sdk) and map them onto db/schema.ts.',
    },
    {
        question: 'Does the first Vercel deploy need environment variables?',
        answer: 'No. The app boots in setup mode. Add DATABASE_URL and AUTH_SECRET afterwards, push the Drizzle schema, and seed a user.',
    },
] as const;

export function jsonLdGraph() {
    const url = absoluteUrl('/');
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                name: SITE_NAME,
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Web',
                license: 'https://opensource.org/licenses/MIT',
                url,
                codeRepository: GITHUB_REPO,
                description: SITE_DESCRIPTION,
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
                author: {
                    '@type': 'Organization',
                    name: 'BuildSmiths',
                    url: GITHUB_REPO,
                },
            },
            {
                '@type': 'WebSite',
                name: SITE_NAME,
                url,
                description: SITE_DESCRIPTION,
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqItems.map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer,
                    },
                })),
            },
        ],
    };
}

export function llmsTxt(): string {
    const origin = absoluteUrl('/');
    return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

This repository is a cloneable kernel, not a full SaaS. Do not add Stripe, Redis, or an AI chat UI unless the user asked for them.

## Canonical docs

- [START.md](${origin}/start): the one page for humans and coding agents
- [GitHub](${GITHUB_REPO})
- [Add-ons](${origin}/blueprints)
- [llms.txt](${origin}/llms.txt)

## Kernel (already in the repo)

- Next.js 16 App Router, React 19, Tailwind v4
- Postgres + Drizzle (\`db/schema.ts\`: users, subscriptions, audit_events)
- Auth.js v4 credentials in \`lib/auth.ts\`
- Setup mode when DATABASE_URL / AUTH_SECRET are missing

## Optional add-ons (vendor skills, not bundled)

Install with the skills CLI, then map onto this schema:

- Neon: \`npx skills add neondatabase/agent-skills@neon-postgres\`
- Stripe: \`npx skills add stripe/ai@stripe-best-practices\`
- AI SDK / chatbot: \`npx skills add vercel/ai@ai-sdk\`
- Redis: \`npx skills add redis/agent-skills@redis-core\`
- Email: \`npx skills add resend/resend-skills@resend\`

Project skills live in \`.agents/skills/\`. Read those before inventing new patterns.

## Seed user (after npm run db:seed)

- Email: dev@example.com
- Password: Password123!
`;
}
