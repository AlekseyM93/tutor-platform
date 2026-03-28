'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from '@/components/theme-toggle';

type SiteHeaderProps = {
  user?: { name?: string | null; email?: string | null } | null;
};

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="font-display text-theme text-lg font-bold tracking-tight transition-opacity hover:opacity-85 md:text-xl"
        >
          РепетиторПлатформа
        </Link>
        <nav className="text-theme-muted flex flex-wrap items-center gap-1 text-sm font-medium">
          <Link
            href="/dashboard"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-violet-500/10 hover:text-violet-700 dark:hover:bg-white/5 dark:hover:text-violet-200"
          >
            Панель
          </Link>
          <Link
            href="/rooms/demo-room"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-violet-500/10 hover:text-violet-700 dark:hover:bg-white/5 dark:hover:text-violet-200"
          >
            Демо-комната
          </Link>
          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="rounded-lg px-3 py-2 transition-colors hover:bg-violet-500/10 hover:text-violet-700 dark:hover:bg-white/5 dark:hover:text-violet-200"
              >
                Вход
              </Link>
              <Link
                href="/auth/register"
                className="rounded-lg px-3 py-2 transition-colors hover:bg-violet-500/10 hover:text-violet-700 dark:hover:bg-white/5 dark:hover:text-violet-200"
              >
                Регистрация
              </Link>
            </>
          ) : (
            <button
              type="button"
              className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-rose-500/10 hover:text-rose-700 dark:hover:bg-white/5 dark:hover:text-rose-200"
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
