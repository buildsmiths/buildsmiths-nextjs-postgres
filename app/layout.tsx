import './globals.css';
import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import { SetupBanner } from '@/components/SetupBanner';
import { SiteHeader } from '@/components/SiteHeader';
import { env } from '@/lib/env';

import { Metadata } from 'next';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        template: '%s | BuildSmiths StarterKit',
        default: 'BuildSmiths StarterKit | The AI-Native SaaS Starter',
    },
    description: 'A minimalist foundation for 2026. Next.js 16, Postgres, and AI-ready Blueprints.',
    metadataBase: new URL(env.siteUrl),
    openGraph: {
        title: 'BuildSmiths StarterKit | The AI-Native SaaS Starter',
        description: 'A minimalist foundation for 2026. Next.js 16, Postgres, and AI-ready Blueprints.',
        url: '/',
        siteName: 'BuildSmiths StarterKit',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BuildSmiths StarterKit',
        description: 'A minimalist foundation for 2026. Next.js 16, Postgres, and AI-ready Blueprints.',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const reducedMotion = process.env.TEST_REDUCED_MOTION === '1';
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
            <body className={`${geistSans.className} min-h-screen bg-background text-foreground flex flex-col font-sans antialiased ${reducedMotion ? 'reduced-motion' : ''}`}>
                <Providers>
                    {/* Skip to content link (visually hidden, visible on focus) */}
                    <a href="#main" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-background focus:text-primary focus:ring-2 focus:ring-ring focus:px-3 focus:py-2 focus:rounded">
                        Skip to content
                    </a>
                    <SiteHeader />
                    <SetupBanner />
                    <main id="main" className="flex-1">{children}</main>
                    <footer className="text-xs text-muted-foreground py-6 text-center border-t">
                        &copy; {new Date().getFullYear()} BuildSmiths StarterKit
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
