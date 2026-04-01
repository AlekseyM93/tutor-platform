import Link from 'next/link';
import { BookOpen, PlayCircle, ScreenShare, Star, Video } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { CanvaDesignEmbed } from '@/components/canva-design-embed';

const tiles = [
  { label: 'Онлайн-уроки', sub: 'видео и звук', emoji: '📹', className: 'uchi-tile-a' },
  { label: 'Записи', sub: 'смотреть позже', emoji: '▶️', className: 'uchi-tile-b' },
  { label: 'Доска', sub: 'рисуем вместе', emoji: '✏️', className: 'uchi-tile-c' },
  { label: 'Материалы', sub: 'файлы и ссылки', emoji: '📚', className: 'uchi-tile-d' }
];

export default async function PublicHomePage() {
  const session = await getSession();

  return (
    <main className="uchi-main">
      <div className="uchi-container space-y-10 md:space-y-14">
        <section className="uchi-hero anim-reveal-up">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-sky-800 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-200">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" aria-hidden />
              Учимся с удовольствием
            </div>
            <h1 className="uchi-hero-title">
              Репетиторы и ученики <span>на одной волне</span>
            </h1>
            <p className="uchi-hero-lead">
              Яркий экран, крупные кнопки и всё для урока в одном месте — в духе любимых школьных
              курсов. Заходите в комнату по ссылке и учитесь без лишней суеты.
            </p>
            {!session?.user ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/auth/login" className="uchi-btn-main">
                  Войти
                </Link>
                <Link href="/auth/register" className="uchi-btn-outline">
                  Регистрация
                </Link>
              </div>
            ) : null}
            <div className="uchi-stats">
              <div className="uchi-stat">
                <div className="uchi-stat-num">1:1</div>
                <div className="uchi-stat-label">формат урока</div>
              </div>
              <div className="uchi-stat">
                <div className="uchi-stat-num">24/7</div>
                <div className="uchi-stat-label">доступ к материалам</div>
              </div>
              <div className="uchi-stat">
                <div className="uchi-stat-num">∞</div>
                <div className="uchi-stat-label">идей на доске</div>
              </div>
            </div>
          </div>

          <div className="uchi-illustration">
            <div className="uchi-blob uchi-blob-1" aria-hidden />
            <div className="uchi-blob uchi-blob-2" aria-hidden />
            <div className="uchi-blob uchi-blob-3" aria-hidden />
            <div className="uchi-card-float">
              <div className="text-center text-sm font-extrabold text-sky-800 dark:text-sky-100">
                Следующий урок
              </div>
              <div className="mt-2 text-center font-display text-2xl font-black text-sky-600 dark:text-sky-300">
                Сегодня 18:00
              </div>
              <div className="mt-3 flex justify-center gap-1">
                {[Video, ScreenShare, BookOpen].map((Icon, i) => (
                  <span
                    key={i}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                ))}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
              </div>
              <div className="text-theme-muted mt-2 text-center text-xs font-semibold">
                Прогресс подготовки: почти готово!
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="uchi-section-title">Что умеет платформа</h2>
          <div className="uchi-tiles">
            {tiles.map((t) => (
              <div key={t.label} className={`uchi-tile ${t.className}`}>
                <span className="uchi-tile-icon" aria-hidden>
                  {t.emoji}
                </span>
                {t.label}
                <div className="mt-1 text-xs font-semibold opacity-80">{t.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="uchi-panel space-y-4">
          <div>
            <h2 className="font-display text-center text-xl font-extrabold text-sky-900 dark:text-sky-100 md:text-2xl">
              Презентация про этикет онлайн-класса
            </h2>
            <p className="text-theme-muted mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed">
              Встроенный макет из Canva — можно открыть на весь экран или перейти по ссылке под
              блоком.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <CanvaDesignEmbed />
          </div>
        </section>

        <section>
          <h2 className="uchi-section-title">Подробнее о возможностях</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-sky-200 bg-white/90 p-5 shadow-[0_4px_0_#81d4fa] dark:border-sky-800 dark:bg-slate-900/60 dark:shadow-[0_4px_0_#0369a1]">
              <div className="mb-3 inline-flex rounded-xl bg-sky-100 p-2.5 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300">
                <Video className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-extrabold text-sky-900 dark:text-sky-50">
                Онлайн-уроки
              </h3>
              <p className="text-theme-muted mt-2 text-sm leading-relaxed">
                Видео, аудио, демонстрация экрана и вход в комнату по ссылке — как привыкли в
                современных школах.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-amber-200 bg-white/90 p-5 shadow-[0_4px_0_#ffcc80] dark:border-amber-800 dark:bg-slate-900/60 dark:shadow-[0_4px_0_#b45309]">
              <div className="mb-3 inline-flex rounded-xl bg-amber-100 p-2.5 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                <PlayCircle className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-extrabold text-amber-950 dark:text-amber-100">
                Записи уроков
              </h3>
              <p className="text-theme-muted mt-2 text-sm leading-relaxed">
                Сохраняйте занятия и открывайте доступ ученикам после урока.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-orange-200 bg-white/90 p-5 shadow-[0_4px_0_#ffab91] dark:border-orange-800 dark:bg-slate-900/60 dark:shadow-[0_4px_0_#c2410c]">
              <div className="mb-3 inline-flex rounded-xl bg-orange-100 p-2.5 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                <ScreenShare className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-extrabold text-orange-950 dark:text-orange-50">
                Интерактивная доска
              </h3>
              <p className="text-theme-muted mt-2 text-sm leading-relaxed">
                Объясняйте темы наглядно прямо во время занятия.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-violet-200 bg-white/90 p-5 shadow-[0_4px_0_#b39ddb] dark:border-violet-800 dark:bg-slate-900/60 dark:shadow-[0_4px_0_#6d28d9]">
              <div className="mb-3 inline-flex rounded-xl bg-violet-100 p-2.5 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                <BookOpen className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-extrabold text-violet-950 dark:text-violet-50">
                База знаний
              </h3>
              <p className="text-theme-muted mt-2 text-sm leading-relaxed">
                Материалы, PDF, ссылки и домашние задания в одном месте.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
