import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    callbackUrl: z.string().optional()
  })
  .strict();

export const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(['TUTOR', 'STUDENT'])
  })
  .strict();
