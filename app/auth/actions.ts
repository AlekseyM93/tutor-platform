'use client';

import { signIn } from 'next-auth/react';
import { z } from 'zod';

const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(['TUTOR', 'STUDENT'])
  })
  .strict();

const loginSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    callbackUrl: z.string().optional()
  })
  .strict();

export type AuthActionState = {
  error?: string;
};

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role')
  });

  if (!parsed.success) {
    return { error: 'Invalid form data.' };
  }

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data)
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string };

  if (!res.ok) {
    return { error: data.error ?? 'Registration failed.' };
  }

  const signInResult = await signIn('credentials', {
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
    redirect: false
  });

  if (signInResult?.error) {
    return { error: 'Account created but sign-in failed. Try logging in.' };
  }

  window.location.assign('/dashboard');
  return {};
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    callbackUrl: formData.get('callbackUrl')
  });

  if (!parsed.success) {
    return { error: 'Invalid email or password format.' };
  }

  const signInResult = await signIn('credentials', {
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
    redirect: false
  });

  if (signInResult?.error) {
    return { error: 'Incorrect email or password.' };
  }

  window.location.assign(parsed.data.callbackUrl || '/dashboard');
  return {};
}
