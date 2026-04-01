import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { listLessonsForTutor } from '@/modules/lessons/server/queries';
import { LESSON_STATUS_LABEL } from '@/modules/lessons/constants';
import { formatLessonDateTime } from '@/lib/format/lesson-dates';
import { InviteStudentForm } from '@/components/invite-student-form';

const materials = ['Алгебра 8 класс.pdf', 'Формулы по тригонометрии.docx', 'Домашнее задание №4.pdf'];

function roleLabel(role: string) {
  if (role === 'TUTOR') return 'Репетитор';
  if (role === 'STUDENT') return 'Ученик';
  if (role === 'ADMIN') return 'Администратор';
  return role;
}

function lessonWord(n: number) {
  const m = n % 100;
  if (m >= 11 && m <= 14) return 'уроков';
  if (n % 10 === 1) return 'урок';
  if ([2, 3, 4].includes(n % 10)) return 'урока';
  return 'уроков';
}

export default async function TeacherDashboardPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }
  if (session.user.role === 'STUDENT') {
    redirect('/student/dashboard');
  }

  const lessons = await listLessonsForTutor(session.user.id);

  return (
    <main className="container-shell space-y-8 py-10 md:py-12">
      <section className="card flex flex-col gap-6 p-8 md:flex-row md:items-end md:justify-between md:p-10">
        <div>
          <div className="text-theme-subtle text-xs font-semibold uppercase tracking-[0.2em]">Кабинет репетитора</div>
          <h1 className="font-display text-theme mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Здравствуйте, {session.user.name ?? session.user.email}
          </h1>
          <p className="text-theme-muted mt-3 max-w-xl">
            Роль: {roleLabel(session.user.role)}. Управление уроками из базы данных; приглашайте учеников по email.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/teacher/lessons/new" className="btn-primary">
            Создать урок
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-theme text-2xl font-bold">Мои уроки</h2>
            <span className="badge">
              {lessons.length} {lessonWord(lessons.length)}
            </span>
          </div>
          {lessons.length === 0 ? (
            <p className="text-theme-muted">
              Пока нет уроков. Нажмите «Создать урок», чтобы добавить первое занятие.
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
                        {formatLessonDateTime(lesson.scheduledAt)} · {lesson.durationMin} мин · комната:{' '}
                        <code className="text-xs">{lesson.roomName}</code>
                      </div>
                    </div>
                    <span className="badge">{LESSON_STATUS_LABEL[lesson.status]}</span>
                  </div>
                  {lesson.description ? (
                    <p className="text-theme-muted mt-2 text-sm">{lesson.description}</p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={`/rooms/${lesson.roomName}`} className="btn-secondary inline-block">
                      Войти в комнату
                    </Link>
                  </div>
                  <div className="border-theme-muted/20 mt-4 border-t pt-4">
                    <p className="text-theme-subtle mb-2 text-xs font-medium uppercase tracking-wide">
                      Пригласить ученика
                    </p>
                    <InviteStudentForm lessonId={lesson.id} />
                    {lesson.students.length > 0 ? (
                      <ul className="text-theme-muted mt-3 list-inside list-disc text-sm">
                        {lesson.students.map((s) => (
                          <li key={s.id}>
                            {s.student.name ?? s.student.email}
                            <span className="text-theme-subtle"> ({s.student.email})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-theme-subtle mt-2 text-sm">Пока никого не приглашено</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-theme text-2xl font-bold">База знаний</h2>
            <div className="text-theme-muted mt-5 space-y-3">
              {materials.map((material) => (
                <div key={material} className="rounded-2xl border border-slate-200/60 px-4 py-3 dark:border-white/10">
                  {material}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <h2 className="font-display text-theme text-2xl font-bold">Записи уроков</h2>
            <p className="text-theme-muted mt-4 leading-relaxed">
              После настройки LiveKit Egress и вебхука здесь появятся видео, статусы обработки и ссылки для просмотра.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
