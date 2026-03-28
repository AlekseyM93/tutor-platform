'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction, type AuthActionState } from '@/app/auth/actions';
import { AuthSubmitButton } from '@/components/auth-submit-button';

const initialState: AuthActionState = {};

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Имя и фамилия
        </label>
        <input
          id="name"
          name="name"
          type="text"
          minLength={2}
          autoComplete="name"
          required
          placeholder="Как к вам обращаться"
          className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none transition-[border,box-shadow] placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Электронная почта
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="имя@почта.ru"
          className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none transition-[border,box-shadow] placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          autoComplete="new-password"
          required
          placeholder="Не менее 8 символов"
          className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none transition-[border,box-shadow] placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Роль
        </label>
        <select
          id="role"
          name="role"
          required
          defaultValue="STUDENT"
          className="w-full cursor-pointer rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none transition-[border,box-shadow] focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-100"
        >
          <option value="STUDENT">Ученик</option>
          <option value="TUTOR">Репетитор</option>
        </select>
      </div>

      {state.error ? <p className="text-sm font-medium text-rose-500 dark:text-rose-400">{state.error}</p> : null}

      <AuthSubmitButton label="Создать аккаунт" pendingLabel="Создаём аккаунт…" />

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Уже есть аккаунт?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-violet-600 underline-offset-4 hover:underline dark:text-violet-300"
        >
          Войти
        </Link>
      </p>
    </form>
  );
}
