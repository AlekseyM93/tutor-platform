'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction, type AuthActionState } from '@/app/auth/actions';
import { AuthSubmitButton } from '@/components/auth-submit-button';

const initialState: AuthActionState = {};

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-slate-700 dark:text-slate-300">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          minLength={2}
          required
          className="w-full rounded-xl border border-slate-200/60 bg-slate-50 px-4 py-3 text-slate-900 dark:border-white/15 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

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

      <div className="space-y-2">
        <label htmlFor="role" className="text-sm text-slate-700 dark:text-slate-300">
          Role
        </label>
        <select
          id="role"
          name="role"
          required
          defaultValue="STUDENT"
          className="w-full rounded-xl border border-slate-200/60 bg-slate-50 px-4 py-3 text-slate-900 dark:border-white/15 dark:bg-slate-950 dark:text-slate-100"
        >
          <option value="STUDENT">Student</option>
          <option value="TUTOR">Tutor</option>
        </select>
      </div>

      {state.error ? <p className="text-sm text-rose-400">{state.error}</p> : null}

      <AuthSubmitButton label="Create account" pendingLabel="Creating account..." />

      <p className="text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="text-indigo-600 dark:text-indigo-300 underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
