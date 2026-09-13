import './globals.css';
import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Providers from '@/components/Providers';
import { SetupBanner } from '@/components/SetupBanner';
import { SiteHeader } from '@/components/SiteHeader';
import { env } from '@/lib/env';
import { GITHUB_REPO, KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, jsonLdGraph } from '@/lib/seo';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    ],
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(env.siteUrl),
    title: {
        default: `${SITE_NAME} | ${SITE_TAGLINE}`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: [...KEYWORDS],
    authors: [{ name: 'BuildSmiths', url: GITHUB_REPO }],
    creator: 'BuildSmiths',
    publisher: 'BuildSmiths',
    category: 'technology',
    alternates: {
        canonical: '/',
        types: {
            'text/plain': '/llms.txt',
        },
    },
    openGraph: {
        type: 'website',
        url: '/',
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        siteName: SITE_NAME,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const reducedMotion = process.env.TEST_REDUCED_MOTION === '1';
    const jsonLd = jsonLdGraph();

    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
            <body className={`${geistSans.className} min-h-screen bg-background text-foreground flex flex-col font-sans antialiased ${reducedMotion ? 'reduced-motion' : ''}`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Providers>
                    <a href="#main" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-background focus:text-primary focus:ring-2 focus:ring-ring focus:px-3 focus:py-2 focus:rounded">
                        Skip to content
                    </a>
                    <SiteHeader />
                    <SetupBanner />
                    <main id="main" className="flex-1">{children}</main>
                    <footer className="text-xs text-muted-foreground py-6 border-t">
                        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p>&copy; {new Date().getFullYear()} {SITE_NAME}. MIT.</p>
                            <nav className="flex flex-wrap items-center justify-center gap-4">
                                <Link className="hover:text-foreground" href="/start">Start</Link>
                                <Link className="hover:text-foreground" href="/blueprints">Add-ons</Link>
                                <Link className="hover:text-foreground" href="/llms.txt">llms.txt</Link>
                                <a className="hover:text-foreground" href={GITHUB_REPO} target="_blank" rel="noreferrer">GitHub</a>
                            </nav>
                        </div>
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
