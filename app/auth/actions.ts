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
    return { error: 'Проверьте корректность полей формы.' };
  }

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data)
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string };

  if (!res.ok) {
    return { error: data.error ?? 'Не удалось зарегистрироваться.' };
  }

  const signInResult = await signIn('credentials', {
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
    redirect: false
  });

  if (signInResult?.error) {
    return { error: 'Аккаунт создан, но вход не удался. Попробуйте войти вручную.' };
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
    return { error: 'Некорректный формат почты или пароля.' };
  }

  const signInResult = await signIn('credentials', {
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
    redirect: false
  });

  if (signInResult?.error) {
    return { error: 'Неверная почта или пароль.' };
  }

  window.location.assign(parsed.data.callbackUrl || '/dashboard');
  return {};
}
