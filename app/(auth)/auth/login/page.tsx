import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { LoginForm } from '@/components/login-form';

export default async function LoginPage() {
  const session = await getSession();
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <main className="container-shell py-12 md:py-16">
      <section className="card mx-auto max-w-md p-8 md:p-10">
        <h1 className="font-display text-theme text-3xl font-bold tracking-tight md:text-4xl">Вход</h1>
        <p className="text-theme-muted mt-3">Войдите, чтобы открыть панель репетитора и комнаты для уроков.</p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-52 animate-pulse rounded-xl bg-slate-200/60 dark:bg-slate-700/40" />}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
