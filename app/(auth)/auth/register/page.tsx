import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { RegisterForm } from '@/components/register-form';

export default async function RegisterPage() {
  const session = await getSession();
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <main className="container-shell py-12 md:py-16">
      <section className="card mx-auto max-w-md p-8 md:p-10">
        <h1 className="font-display text-theme text-3xl font-bold tracking-tight md:text-4xl">Регистрация</h1>
        <p className="text-theme-muted mt-3">
          Создайте аккаунт репетитора или ученика — дальше можно заходить в уроки и панель.
        </p>
        <div className="mt-8">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
