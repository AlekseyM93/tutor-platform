'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const ThemeToggle = dynamic(() => import('@/components/theme-toggle').then((m) => m.ThemeToggle), {
  ssr: false,
  loading: () => (
    <span
      className="inline-block h-9 min-w-[5.5rem] shrink-0 rounded-full bg-sky-100/80 dark:bg-slate-800/60"
      aria-hidden
    />
  )
});

type SiteHeaderProps = {
  user?: { name?: string | null; email?: string | null } | null;
};

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="font-display site-brand text-xl font-extrabold tracking-tight md:text-2xl"
        >
          РепетиторПлатформа
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {!user ? (
            <>
              <Link href="/auth/login" className="nav-link">
                Вход
              </Link>
              <Link href="/auth/register" className="nav-link">
                Регистрация
              </Link>
            </>
          ) : (
            <button
              type="button"
              className="nav-link cursor-pointer"
              onClick={() => signOut({ redirectTo: '/' })}
            >
              Выйти
            </button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
