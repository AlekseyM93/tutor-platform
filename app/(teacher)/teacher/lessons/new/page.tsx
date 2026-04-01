import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { CreateLessonForm } from '@/components/create-lesson-form';

export default async function NewLessonPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }
  if (session.user.role === 'STUDENT') {
    redirect('/student/dashboard');
  }

  return (
    <main className="container-shell space-y-8 py-10 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-theme-subtle text-xs font-semibold uppercase tracking-[0.2em]">Новый урок</div>
          <h1 className="font-display text-theme mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Создать урок
          </h1>
          <p className="text-theme-muted mt-2 max-w-xl text-sm">
            После сохранения появится уникальная комната; ссылку можно отправить ученику после приглашения по email.
          </p>
        </div>
        <Link href="/teacher/dashboard" className="btn-secondary">
          ← К кабинету
        </Link>
      </div>

      <section className="card mx-auto max-w-2xl p-6 md:p-8">
        <CreateLessonForm />
      </section>
    </main>
  );
}
