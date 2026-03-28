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
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-slate-700 dark:text-slate-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-slate-200/60 bg-slate-50 px-4 py-3 text-slate-900 dark:border-white/15 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-slate-700 dark:text-slate-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          required
          className="w-full rounded-xl border border-slate-200/60 bg-slate-50 px-4 py-3 text-slate-900 dark:border-white/15 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      {state.error ? <p className="text-sm text-rose-400">{state.error}</p> : null}

      <AuthSubmitButton label="Sign in" pendingLabel="Signing in..." />

      <p className="text-sm text-slate-600 dark:text-slate-300">
        No account yet?{' '}
        <Link href="/auth/register" className="text-indigo-600 dark:text-indigo-300 underline-offset-4 hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
