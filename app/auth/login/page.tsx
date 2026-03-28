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
    <main className="container-shell py-12">
      <section className="mx-auto max-w-md card p-8">
        <h1 className="text-3xl font-black">Sign in</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Access your tutor platform dashboard and lesson rooms.
        </p>
        <div className="mt-6">
          <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
