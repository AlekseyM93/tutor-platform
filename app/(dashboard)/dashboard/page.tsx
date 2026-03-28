import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

const lessons = [
  {
    id: 'lesson-1',
    title: 'Математика — квадратные уравнения',
    time: 'Сегодня · 18:00',
    room: 'demo-room',
    status: 'LIVE'
  },
  {
    id: 'lesson-2',
    title: 'Физика — законы Ньютона',
    time: 'Завтра · 16:00',
    room: 'physics-room',
    status: 'SCHEDULED'
  }
];

const materials = [
  'Алгебра 8 класс.pdf',
  'Формулы по тригонометрии.docx',
  'Домашнее задание №4.pdf'
];

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <main className="container-shell space-y-6 py-10">
      <section className="card flex flex-col gap-4 p-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Dashboard
          </div>
          <h1 className="mt-2 text-3xl font-black">Привет, {session.user.name ?? session.user.email}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Роль: {session.user.role}. Здесь репетитор управляет уроками, материалами и записями.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/rooms/demo-room" className="btn-primary">
            Открыть комнату
          </Link>
          <button className="btn-secondary">Создать урок</button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Ближайшие уроки</h2>
            <span className="badge">{lessons.length} урока</span>
          </div>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="rounded-2xl border border-slate-200/60 dark:border-white/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold">{lesson.title}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{lesson.time}</div>
                  </div>
                  <span className="badge">{lesson.status}</span>
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
          <div className="card p-6">
            <h2 className="text-2xl font-bold">База знаний</h2>
            <div className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
              {materials.map((material) => (
                <div
                  key={material}
                  className="rounded-2xl border border-slate-200/60 dark:border-white/10 px-4 py-3"
                >
                  {material}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold">Записи уроков</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              После подключения LiveKit Egress и webhook здесь будет список видео, статусов
              обработки и ссылок на воспроизведение.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
