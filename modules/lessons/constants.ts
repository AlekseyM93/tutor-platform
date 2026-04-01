import { LessonStatus } from '@prisma/client';

export const LESSON_STATUS_LABEL: Record<LessonStatus, string> = {
  [LessonStatus.DRAFT]: 'Черновик',
  [LessonStatus.SCHEDULED]: 'Запланирован',
  [LessonStatus.LIVE]: 'В эфире',
  [LessonStatus.FINISHED]: 'Завершён',
  [LessonStatus.CANCELED]: 'Отменён'
};
