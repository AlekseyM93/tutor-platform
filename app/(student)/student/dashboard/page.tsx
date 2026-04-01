import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function StudentDashboardPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }
  if (session.user.role !== 'STUDENT') {
    redirect('/teacher/dashboard');
  }

  return (
    <main className="container-shell space-y-8 py-10 md:py-12">
      <section className="card p-8 md:p-10">
        <div className="text-theme-subtle text-xs font-semibold uppercase tracking-[0.2em]">Кабинет ученика</div>
        <h1 className="font-display text-theme mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Здравствуйте, {session.user.name ?? session.user.email}
        </h1>
        <p className="text-theme-muted mt-3 max-w-2xl">
          Здесь будет расписание, домашние задания, материалы и доступ к урокам.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/rooms/demo-room" className="btn-primary">
            Войти в комнату урока
          </Link>
          <Link href="/" className="btn-secondary">
            На главную
          </Link>
        </div>
      </section>
    </main>
  );
}
