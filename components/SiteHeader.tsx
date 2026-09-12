'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AuthButton } from '@/components/AuthButton';
import NavLink from '@/components/NavLink';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#quickstart', label: 'Quickstart' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/blueprints', label: 'Blueprints' },
    { href: '/account', label: 'Account' },
];

export function SiteHeader() {
    const [open, setOpen] = useState(false);

    return (
        <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Link href="/" className="font-semibold text-sm shrink-0">
                    BuildSmiths StarterKit
                </Link>
                <nav className="hidden md:flex items-center gap-4 text-muted-foreground">
                    {navItems.map((item) => (
                        <NavLink key={item.href} className="hover:text-foreground" href={item.href}>
                            {item.label}
                        </NavLink>
                    ))}
                    <ThemeToggle />
                    <AuthButton />
                </nav>
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={() => setOpen((value) => !value)}
                    >
                        {open ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>
            {open ? (
                <nav className="md:hidden border-t px-4 py-3 flex flex-col gap-3">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            className="hover:text-foreground py-1"
                            href={item.href}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    <AuthButton />
                </nav>
            ) : null}
        </header>
    );
}
