'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const next = getInitialTheme();
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.dataset.theme = next;
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.dataset.theme = next;
  }

  const Icon = theme === 'dark' ? Sun : Moon;
  const label = theme === 'dark' ? 'Светлая тема' : 'Темная тема';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="text-theme-muted inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/50 px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-slate-100 dark:border-white/12 dark:bg-slate-900/40 dark:hover:bg-white/10"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{theme === 'dark' ? 'Светлая' : 'Темная'}</span>
    </button>
  );
}

