import Link from 'next/link';
import { BookOpen, PlayCircle, ScreenShare, Video } from 'lucide-react';
import { getSession } from '@/lib/auth';

const features = [
  {
    title: 'Онлайн-уроки',
    description: 'Видео, аудио, screen share и вход в комнату по ссылке.',
    icon: Video
  },
  {
    title: 'Записи уроков',
    description: 'Сохраняй занятия и выдавай доступ ученикам после урока.',
    icon: PlayCircle
  },
  {
    title: 'Интерактивная доска',
    description: 'Объясняй темы визуально прямо во время занятия.',
    icon: ScreenShare
  },
  {
    title: 'База знаний',
    description: 'Материалы, PDF, ссылки, конспекты и домашние задания.',
    icon: BookOpen
  }
];

export default async function HomePage() {
  const session = await getSession();
  const loginForDashboard = `/auth/login?callbackUrl=${encodeURIComponent('/dashboard')}`;
  const loginForRoom = `/auth/login?callbackUrl=${encodeURIComponent('/rooms/demo-room')}`;

  return (
    <main className="container-shell space-y-8 py-12">
      <section className="card grid gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div className="space-y-6">
          <span className="badge">MVP для разработки в Cursor</span>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Платформа для репетиторов и учеников с видеоуроками, доской и материалами.
          </h1>
          <p className="max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Готовый стартовый fullstack-каркас под развитие: комнаты, уроки, знания, записи и
            хранение файлов.
          </p>
          <div className="flex flex-wrap gap-3">
            {session?.user ? (
              <>
                <Link href="/dashboard" className="btn-primary">
                  Открыть dashboard
                </Link>
                <Link href="/rooms/demo-room" className="btn-secondary">
                  Зайти в demo room
                </Link>
              </>
            ) : (
              <>
                <Link href={loginForDashboard} className="btn-primary">
                  Войти и открыть dashboard
                </Link>
                <Link href={loginForRoom} className="btn-secondary">
                  Зайти в demo room
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="card grid gap-4 p-5">
          <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-4">
            <div className="text-sm text-slate-700 dark:text-slate-300">Сценарий урока</div>
            <div className="mt-2 text-2xl font-bold">Алгебра · 1 на 1</div>
            <div className="mt-2 text-slate-700 dark:text-slate-300">Сегодня · 18:00 · 60 минут</div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/60 dark:border-white/10 p-4">
              <div className="text-sm text-slate-500 dark:text-slate-400">Статус</div>
              <div className="mt-1 text-xl font-semibold">Room ready</div>
            </div>
            <div className="rounded-2xl border border-slate-200/60 dark:border-white/10 p-4">
              <div className="text-sm text-slate-500 dark:text-slate-400">Материалы</div>
              <div className="mt-1 text-xl font-semibold">12 файлов</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="card p-6">
              <Icon className="mb-4 h-8 w-8" />
              <h2 className="text-xl font-bold">{feature.title}</h2>
              <p className="mt-2 text-slate-700 dark:text-slate-300">{feature.description}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
