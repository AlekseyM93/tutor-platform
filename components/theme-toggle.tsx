'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

function subscribe(onChange: () => void) {
  const el = document.documentElement;
  const obs = new MutationObserver(onChange);
  obs.observe(el, { attributes: true, attributeFilter: ['class'] });

  function onStorage(e: StorageEvent) {
    if (e.key !== 'theme') return;
    const v = e.newValue;
    if (v !== 'light' && v !== 'dark') return;
    el.classList.toggle('dark', v === 'dark');
    el.dataset.theme = v;
    onChange();
  }
  window.addEventListener('storage', onStorage);
  return () => {
    obs.disconnect();
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.dataset.theme = next;
  }, [theme]);

  const Icon = theme === 'dark' ? Sun : Moon;
  const label = theme === 'dark' ? 'Светлая тема' : 'Темная тема';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="text-theme-muted inline-flex items-center gap-2 rounded-full border-2 border-sky-300/80 bg-white/90 px-3 py-2 text-sm font-bold shadow-[0_2px_0_#7dd3fc] transition-colors hover:bg-sky-50 dark:border-sky-600/50 dark:bg-slate-900/50 dark:shadow-[0_2px_0_#0e7490] dark:hover:bg-slate-800/80"
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      <span className="hidden sm:inline">{theme === 'dark' ? 'Светлая' : 'Темная'}</span>
    </button>
  );
}
