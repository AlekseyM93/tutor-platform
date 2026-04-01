import type { Lesson, Role } from '@prisma/client';
import { db } from '@/lib/db';

export async function getLessonByRoomName(roomName: string): Promise<Lesson | null> {
  return db.lesson.findUnique({
    where: { roomName }
  });
}

/**
 * Может ли пользователь подключиться к комнате урока (видео, токен LiveKit).
 */
export function canAccessLessonRoom(
  lesson: Lesson,
  userId: string,
  role: Role
): boolean {
  if (role === 'ADMIN') {
    return true;
  }
  if (lesson.tutorId === userId) {
    return true;
  }
  return false;
}

/**
 * Ученик допускается только если запись в LessonStudent существует.
 * Для проверки после загрузки связи students.
 */
export async function canStudentAccessLesson(lessonId: string, studentId: string): Promise<boolean> {
  const link = await db.lessonStudent.findUnique({
    where: {
      lessonId_studentId: { lessonId, studentId }
    }
  });
  return Boolean(link);
}

/**
 * Полная проверка: тьютор, админ или приглашённый ученик.
 */
export async function assertUserCanJoinLessonRoom(
  lesson: Lesson,
  userId: string,
  role: Role
): Promise<boolean> {
  if (canAccessLessonRoom(lesson, userId, role)) {
    return true;
  }
  if (role === 'STUDENT') {
    return canStudentAccessLesson(lesson.id, userId);
  }
  return false;
}
