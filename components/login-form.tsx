'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { loginAction, type AuthActionState } from '@/app/auth/actions';
import { AuthSubmitButton } from '@/components/auth-submit-button';

const initialState: AuthActionState = {};

type LoginFormProps = {
  callbackUrl?: string;
};

export function LoginForm({ callbackUrl: callbackUrlProp }: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = callbackUrlProp ?? searchParams.get('callbackUrl') ?? '';
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

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
          autoComplete="current-password"
          required
          placeholder="Не менее 8 символов"
          className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none transition-[border,box-shadow] placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>

      {state.error ? <p className="text-sm font-medium text-rose-500 dark:text-rose-400">{state.error}</p> : null}

      <AuthSubmitButton label="Войти" pendingLabel="Входим…" />

      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Нет аккаунта?{' '}
        <Link
          href="/auth/register"
          className="font-semibold text-violet-600 underline-offset-4 hover:underline dark:text-violet-300"
        >
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
}
