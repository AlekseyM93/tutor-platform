import Link from 'next/link';
import { BookOpen, PlayCircle, ScreenShare, Video } from 'lucide-react';
import { getSession } from '@/lib/auth';

const features = [
  {
    title: 'Онлайн-уроки',
    description: 'Видео, аудио, демонстрация экрана и вход в комнату по ссылке.',
    icon: Video
  },
  {
    title: 'Записи уроков',
    description: 'Сохраняйте занятия и открывайте доступ ученикам после урока.',
    icon: PlayCircle
  },
  {
    title: 'Интерактивная доска',
    description: 'Объясняйте темы наглядно прямо во время занятия.',
    icon: ScreenShare
  },
  {
    title: 'База знаний',
    description: 'Материалы, PDF, ссылки, конспекты и домашние задания в одном месте.',
    icon: BookOpen
  }
];

export default async function HomePage() {
  const session = await getSession();
  const loginForDashboard = `/auth/login?callbackUrl=${encodeURIComponent('/dashboard')}`;
  const loginForRoom = `/auth/login?callbackUrl=${encodeURIComponent('/rooms/demo-room')}`;

  return (
    <main className="container-shell space-y-10 py-10 md:space-y-14 md:py-16">
      <section className="card grid gap-10 p-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:p-12">
        <div className="space-y-6">
          <span className="badge">Стартовый каркас для разработки</span>
          <h1 className="font-display text-theme max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Платформа для репетиторов и учеников: видео, доска и материалы в одном месте.
          </h1>
          <p className="text-theme-muted max-w-2xl text-lg leading-relaxed">
            Готовая основа для развития продукта: комнаты, уроки, база знаний, записи и загрузка
            файлов — с понятным кодом под доработку в Cursor.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {session?.user ? (
              <>
                <Link href="/dashboard" className="btn-primary">
                  Открыть панель
                </Link>
                <Link href="/rooms/demo-room" className="btn-secondary">
                  Демо-комната
                </Link>
              </>
            ) : (
              <>
                <Link href={loginForDashboard} className="btn-primary">
                  Войти и открыть панель
                </Link>
                <Link href={loginForRoom} className="btn-secondary">
                  Войти в демо-комнату
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="card grid gap-4 border border-violet-500/15 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/5 p-6 shadow-none md:p-7">
          <div className="rounded-2xl border border-violet-400/25 bg-white/50 p-5 dark:bg-slate-900/40">
            <div className="text-theme-muted text-sm font-medium">Сценарий урока</div>
            <div className="font-display text-theme mt-2 text-2xl font-semibold">
              Алгебра · 1 на 1
            </div>
            <div className="text-theme-muted mt-2 text-sm">Сегодня · 18:00 · 60 минут</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white/40 p-4 dark:border-white/10 dark:bg-slate-950/30">
              <div className="text-theme-subtle text-xs font-semibold uppercase tracking-wider">
                Статус
              </div>
              <div className="text-theme mt-1 text-lg font-semibold">Комната готова</div>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/40 p-4 dark:border-white/10 dark:bg-slate-950/30">
              <div className="text-theme-subtle text-xs font-semibold uppercase tracking-wider">
                Материалы
              </div>
              <div className="text-theme mt-1 text-lg font-semibold">12 файлов</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="card group border border-transparent p-6 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-violet-500/20"
            >
              <div className="mb-4 inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-600 dark:text-violet-300">
                <Icon className="h-7 w-7" aria-hidden />
              </div>
              <h2 className="font-display text-theme text-xl font-semibold">
                {feature.title}
              </h2>
              <p className="text-theme-muted mt-2 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
