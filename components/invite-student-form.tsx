'use client';

import { useActionState } from 'react';
import { inviteStudentToLessonAction, type LessonActionState } from '@/modules/lessons/server/actions';

const initial: LessonActionState = {};

type Props = {
  lessonId: string;
};

export function InviteStudentForm({ lessonId }: Props) {
  const [state, formAction] = useActionState(inviteStudentToLessonAction, initial);

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
      <input type="hidden" name="lessonId" value={lessonId} />
      <div className="min-w-0 flex-1">
        <label htmlFor={`student-${lessonId}`} className="text-theme-subtle sr-only">
          Email ученика
        </label>
        <input
          id={`student-${lessonId}`}
          name="studentEmail"
          type="email"
          required
          placeholder="email ученика"
          className="input-field w-full text-sm"
        />
      </div>
      <button type="submit" className="btn-secondary shrink-0 text-sm">
        Пригласить
      </button>
      {state.error ? (
        <span className="text-xs text-rose-600 dark:text-rose-400 sm:ml-2">{state.error}</span>
      ) : null}
      {state.ok ? (
        <span className="text-xs text-emerald-600 dark:text-emerald-400 sm:ml-2">Добавлено</span>
      ) : null}
    </form>
  );
}
