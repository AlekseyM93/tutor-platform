import { hash } from 'bcryptjs';
import { db } from '@/lib/db';
import { registerSchema } from '@/modules/auth/schemas/auth.schemas';

export async function registerUser(rawInput: unknown) {
  const parsed = registerSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { ok: false as const, status: 400, error: 'Проверьте корректность полей формы.' };
  }

  const email = parsed.data.email.toLowerCase();
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      ok: false as const,
      status: 409,
      error: 'Пользователь с такой почтой уже зарегистрирован.'
    };
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

  return { ok: true as const };
}
