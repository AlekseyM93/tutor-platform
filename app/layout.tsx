import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getSession } from '@/lib/auth';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Tutor Platform',
  description: 'Онлайн-платформа для репетиторов и учеников'
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

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
        <SiteHeader user={session?.user} />
        {children}
      </body>
    </html>
  );
}
