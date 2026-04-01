'use client';

import { signIn } from 'next-auth/react';
import { loginSchema, registerSchema } from '@/modules/auth/schemas/auth.schemas';
import type { AuthActionState } from '@/modules/auth/types/auth.types';
export type { AuthActionState } from '@/modules/auth/types/auth.types';

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

  window.location.assign('/teacher/dashboard');
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
