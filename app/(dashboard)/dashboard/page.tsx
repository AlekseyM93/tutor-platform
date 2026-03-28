import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

const lessons = [
  {
    id: 'lesson-1',
    title: 'Математика — квадратные уравнения',
    time: 'Сегодня · 18:00',
    room: 'demo-room',
    status: 'LIVE' as const
  },
  {
    id: 'lesson-2',
    title: 'Физика — законы Ньютона',
    time: 'Завтра · 16:00',
    room: 'physics-room',
    status: 'SCHEDULED' as const
  }
];

const lessonStatusLabel: Record<(typeof lessons)[number]['status'], string> = {
  LIVE: 'В эфире',
  SCHEDULED: 'Запланирован'
};

const materials = [
  'Алгебра 8 класс.pdf',
  'Формулы по тригонометрии.docx',
  'Домашнее задание №4.pdf'
];

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

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <main className="container-shell space-y-8 py-10 md:py-12">
      <section className="card flex flex-col gap-6 p-8 md:flex-row md:items-end md:justify-between md:p-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Рабочая панель
          </div>
          <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Здравствуйте, {session.user.name ?? session.user.email}
          </h1>
          <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
            Роль: {roleLabel(session.user.role)}. Здесь вы управляете уроками, материалами и записями.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/rooms/demo-room" className="btn-primary">
            Открыть комнату
          </Link>
          <button type="button" className="btn-secondary">
            Создать урок
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Ближайшие уроки</h2>
            <span className="badge">
              {lessons.length} {lessonWord(lessons.length)}
            </span>
          </div>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-2xl border border-slate-200/70 bg-white/30 p-5 dark:border-white/10 dark:bg-slate-950/20"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">{lesson.title}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{lesson.time}</div>
                  </div>
                  <span className="badge">{lessonStatusLabel[lesson.status]}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/rooms/${lesson.room}`} className="btn-secondary inline-block">
                    Войти в комнату
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">База знаний</h2>
            <div className="mt-5 space-y-3 text-slate-600 dark:text-slate-400">
              {materials.map((material) => (
                <div
                  key={material}
                  className="rounded-2xl border border-slate-200/60 px-4 py-3 dark:border-white/10"
                >
                  {material}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Записи уроков</h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              После настройки LiveKit Egress и вебхука здесь появятся видео, статусы обработки и ссылки для
              просмотра.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
