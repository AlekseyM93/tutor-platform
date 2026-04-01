import { LessonStatus } from '@prisma/client';
import { db } from '@/lib/db';

export async function listLessonsForTutor(tutorId: string) {
  return db.lesson.findMany({
    where: { tutorId },
    orderBy: { scheduledAt: 'asc' },
    include: {
      students: {
        include: { student: { select: { id: true, email: true, name: true } } }
      }
    }
  });
}

/** Уроки, к которым приглашён ученик (не отменённые). */
export async function listUpcomingLessonsForStudent(studentId: string) {
  return db.lesson.findMany({
    where: {
      status: { not: LessonStatus.CANCELED },
      students: { some: { studentId } }
    },
    orderBy: { scheduledAt: 'asc' },
    take: 50,
    include: {
      tutor: { select: { name: true, email: true } }
    }
  });
}

/** Генерация уникального имени комнаты LiveKit (стабильный URL-сегмент). */
export function generateRoomName(): string {
  const rnd = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  return `lesson-${rnd}`;
}
