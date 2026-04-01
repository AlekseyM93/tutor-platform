'use server';

import { LessonStatus, Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { createLessonSchema, inviteStudentSchema } from '@/modules/lessons/schemas/lesson.schemas';
import { generateRoomName } from '@/modules/lessons/server/queries';

export type LessonActionState = {
  error?: string;
  ok?: boolean;
};

function assertTutorOrAdmin(role: Role) {
  if (role !== 'TUTOR' && role !== 'ADMIN') {
    throw new Error('Forbidden');
  }
}

export async function createLessonAction(
  _prev: LessonActionState,
  formData: FormData
): Promise<LessonActionState> {
  const session = await getSession();
  if (!session?.user) {
    return { error: 'Требуется вход' };
  }
  try {
    assertTutorOrAdmin(session.user.role);
  } catch {
    return { error: 'Недостаточно прав' };
  }

  const raw = {
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    scheduledAt: formData.get('scheduledAt'),
    durationMin: formData.get('durationMin'),
    status: formData.get('status') || undefined
  };

  const parsed = createLessonSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Некорректные данные' };
  }

  const scheduledAt = new Date(parsed.data.scheduledAt);
  if (Number.isNaN(scheduledAt.getTime())) {
    return { error: 'Некорректная дата' };
  }

  let roomName = generateRoomName();
  for (let i = 0; i < 5; i++) {
    const exists = await db.lesson.findUnique({ where: { roomName }, select: { id: true } });
    if (!exists) break;
    roomName = generateRoomName();
  }

  await db.lesson.create({
    data: {
      title: parsed.data.title.trim(),
      description: parsed.data.description?.trim() || null,
      scheduledAt,
      durationMin: parsed.data.durationMin,
      status: parsed.data.status ?? LessonStatus.SCHEDULED,
      roomName,
      tutorId: session.user.id
    }
  });

  revalidatePath('/teacher/dashboard');
  return { ok: true };
}

export async function inviteStudentToLessonAction(
  _prev: LessonActionState,
  formData: FormData
): Promise<LessonActionState> {
  const session = await getSession();
  if (!session?.user) {
    return { error: 'Требуется вход' };
  }
  try {
    assertTutorOrAdmin(session.user.role);
  } catch {
    return { error: 'Недостаточно прав' };
  }

  const parsed = inviteStudentSchema.safeParse({
    lessonId: formData.get('lessonId'),
    studentEmail: formData.get('studentEmail')
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Некорректные данные' };
  }

  const lesson = await db.lesson.findUnique({
    where: { id: parsed.data.lessonId }
  });
  if (!lesson) {
    return { error: 'Урок не найден' };
  }
  if (lesson.tutorId !== session.user.id && session.user.role !== 'ADMIN') {
    return { error: 'Можно приглашать только в свои уроки' };
  }

  const email = parsed.data.studentEmail.toLowerCase();
  const student = await db.user.findUnique({ where: { email } });
  if (!student) {
    return { error: 'Пользователь с таким email не найден' };
  }
  if (student.role !== 'STUDENT') {
    return { error: 'Можно приглашать только пользователей с ролью ученик' };
  }

  const existing = await db.lessonStudent.findUnique({
    where: {
      lessonId_studentId: { lessonId: lesson.id, studentId: student.id }
    }
  });
  if (existing) {
    return { error: 'Ученик уже добавлен к этому уроку' };
  }

  await db.lessonStudent.create({
    data: {
      lessonId: lesson.id,
      studentId: student.id
    }
  });

  revalidatePath('/teacher/dashboard');
  revalidatePath('/student/dashboard');
  return { ok: true };
}
