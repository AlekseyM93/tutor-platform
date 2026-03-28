import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Manrope, Unbounded } from 'next/font/google';
import { getSession } from '@/lib/auth';
import { SiteHeader } from '@/components/site-header';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap'
});

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-unbounded',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'РепетиторПлатформа',
  description: 'Онлайн-платформа для репетиторов и учеников: видеоуроки, доска и материалы'
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  return (
    <html lang="ru" suppressHydrationWarning className={`${manrope.variable} ${unbounded.variable}`}>
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
      <body className="min-h-dvh font-sans antialiased selection:bg-violet-500/25 selection:text-inherit">
        <SiteHeader user={session?.user} />
        {children}
      </body>
    </html>
  );
}
