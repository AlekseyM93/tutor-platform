import { LessonStatus } from '@prisma/client';
import { z } from 'zod';

export const createLessonSchema = z.object({
  title: z.string().min(1, 'Укажите тему урока'),
  description: z.string().optional(),
  scheduledAt: z.string().min(1, 'Укажите дату и время'),
  durationMin: z.coerce.number().int().min(15).max(480),
  status: z.nativeEnum(LessonStatus).optional()
});

export const inviteStudentSchema = z.object({
  lessonId: z.string().min(1),
  studentEmail: z.email('Некорректный email')
});
