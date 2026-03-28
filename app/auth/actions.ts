'use server';

import { hash } from 'bcryptjs';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { db } from '@/lib/db';
import { signIn } from '@/lib/auth';

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

  const email = parsed.data.email.toLowerCase();
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: 'User with this email already exists.' };
  }

  const passwordHash = await hash(parsed.data.password, 12);

  await db.user.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash,
      role: parsed.data.role
    }
  });

  await signIn('credentials', {
    email,
    password: parsed.data.password,
    redirectTo: '/dashboard'
  });

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

  try {
    await signIn('credentials', {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirectTo: parsed.data.callbackUrl || '/dashboard'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Incorrect email or password.' };
    }
    throw error;
  }

  return {};
}
