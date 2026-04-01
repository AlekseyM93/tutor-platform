'use client';

import { LessonStatus } from '@prisma/client';
import { useActionState } from 'react';
import { createLessonAction, type LessonActionState } from '@/modules/lessons/server/actions';

const initial: LessonActionState = {};

export function CreateLessonForm() {
  const [state, formAction] = useActionState(createLessonAction, initial);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="title" className="text-theme-muted text-sm font-medium">
          Тема урока
        </label>
        <input
          id="title"
          name="title"
          required
          className="input-field w-full"
          placeholder="Например: Алгебра — квадратные уравнения"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-theme-muted text-sm font-medium">
          Описание (необязательно)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="input-field w-full resize-y"
          placeholder="Кратко о целях занятия"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="scheduledAt" className="text-theme-muted text-sm font-medium">
            Дата и время начала
          </label>
          <input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            required
            className="input-field w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="durationMin" className="text-theme-muted text-sm font-medium">
            Длительность (мин)
          </label>
          <input
            id="durationMin"
            name="durationMin"
            type="number"
            min={15}
            max={480}
            defaultValue={60}
            required
            className="input-field w-full"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="status" className="text-theme-muted text-sm font-medium">
          Статус
        </label>
        <select id="status" name="status" defaultValue={LessonStatus.SCHEDULED} className="input-field w-full">
          <option value={LessonStatus.DRAFT}>Черновик</option>
          <option value={LessonStatus.SCHEDULED}>Запланирован</option>
        </select>
      </div>
      {state.error ? <p className="text-sm text-rose-600 dark:text-rose-400">{state.error}</p> : null}
      {state.ok ? (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">Урок создан. Можно вернуться в кабинет.</p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          Создать урок
        </button>
      </div>
    </form>
  );
}
