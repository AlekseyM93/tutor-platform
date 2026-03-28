import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { RegisterForm } from '@/components/register-form';

export default async function RegisterPage() {
  const session = await getSession();
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <main className="container-shell py-12">
      <section className="mx-auto max-w-md card p-8">
        <h1 className="text-3xl font-black">Create account</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Register as a tutor or student in the platform.
        </p>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
