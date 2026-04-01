import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { listUpcomingLessonsForStudent } from '@/modules/lessons/server/queries';
import { LESSON_STATUS_LABEL } from '@/modules/lessons/constants';
import { formatLessonDateTime } from '@/lib/format/lesson-dates';

export default async function StudentDashboardPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }
  if (session.user.role !== 'STUDENT') {
    redirect('/teacher/dashboard');
  }

  const lessons = await listUpcomingLessonsForStudent(session.user.id);

  return (
    <main className="container-shell space-y-8 py-10 md:py-12">
      <section className="card p-8 md:p-10">
        <div className="text-theme-subtle text-xs font-semibold uppercase tracking-[0.2em]">Кабинет ученика</div>
        <h1 className="font-display text-theme mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Здравствуйте, {session.user.name ?? session.user.email}
        </h1>
        <p className="text-theme-muted mt-3 max-w-2xl">
          Ниже — уроки, к которым вас пригласили. Войти в комнату можно только после приглашения репетитором.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn-secondary">
            На главную
          </Link>
        </div>
      </section>

      <section className="card p-6 md:p-8">
        <h2 className="font-display text-theme mb-6 text-2xl font-bold">Мои уроки</h2>
        {lessons.length === 0 ? (
          <p className="text-theme-muted">
            Пока нет приглашений. Попросите репетитора добавить ваш email к уроку.
          </p>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-2xl border border-slate-200/70 bg-white/30 p-5 dark:border-white/10 dark:bg-slate-950/20"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-theme text-lg font-semibold">{lesson.title}</div>
                    <div className="text-theme-subtle text-sm">
                      {formatLessonDateTime(lesson.scheduledAt)} · {lesson.durationMin} мин · репетитор:{' '}
                      {lesson.tutor.name ?? lesson.tutor.email}
                    </div>
                  </div>
                  <span className="badge">{LESSON_STATUS_LABEL[lesson.status]}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/rooms/${lesson.roomName}`} className="btn-primary inline-block">
                    Войти в комнату
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
