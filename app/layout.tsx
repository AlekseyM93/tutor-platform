import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { auth, signOut } from '@/lib/auth';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Tutor Platform',
  description: 'Онлайн-платформа для репетиторов и учеников'
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  async function logout() {
    'use server';
    await signOut({ redirectTo: '/' });
  }

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.dataset.theme = theme;
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body>
        <header className="border-b border-slate-200/70 backdrop-blur dark:border-white/10">
          <div className="container-shell flex items-center justify-between gap-4 py-5">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Tutor Platform
            </Link>
            <nav className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/rooms/demo-room">Demo room</Link>
              {!session?.user ? (
                <>
                  <Link href="/auth/login">Sign in</Link>
                  <Link href="/auth/register">Register</Link>
                </>
              ) : (
                <form action={logout}>
                  <button
                    type="submit"
                    className="cursor-pointer text-slate-700 dark:text-slate-200"
                  >
                    Sign out
                  </button>
                </form>
              )}
              <ThemeToggle />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
