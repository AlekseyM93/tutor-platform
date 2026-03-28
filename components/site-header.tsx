'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from '@/components/theme-toggle';

type SiteHeaderProps = {
  user?: { name?: string | null; email?: string | null } | null;
};

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="border-b border-slate-200/70 backdrop-blur dark:border-white/10">
      <div className="container-shell flex items-center justify-between gap-4 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Tutor Platform
        </Link>
        <nav className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/rooms/demo-room">Demo room</Link>
          {!user ? (
            <>
              <Link href="/auth/login">Sign in</Link>
              <Link href="/auth/register">Register</Link>
            </>
          ) : (
            <button
              type="button"
              className="cursor-pointer text-slate-700 dark:text-slate-200"
              onClick={() => signOut({ redirectTo: '/' })}
            >
              Sign out
            </button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
