import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function AdminPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }
  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <main className="container-shell py-10 md:py-12">
      <section className="card p-8 md:p-10">
        <div className="text-theme-subtle text-xs font-semibold uppercase tracking-[0.2em]">Admin foundation</div>
        <h1 className="font-display text-theme mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Админ-панель (базовая основа)
        </h1>
        <p className="text-theme-muted mt-3 max-w-2xl">
          Здесь будет управление пользователями, ролями, контентом, аудитом и системными настройками.
        </p>
      </section>
    </main>
  );
}
