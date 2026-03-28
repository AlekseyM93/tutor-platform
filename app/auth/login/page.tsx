import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { LoginForm } from '@/components/login-form';

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard');
  }

  const params = await searchParams;

  return (
    <main className="container-shell py-12">
      <section className="mx-auto max-w-md card p-8">
        <h1 className="text-3xl font-black">Sign in</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Access your tutor platform dashboard and lesson rooms.
        </p>
        <div className="mt-6">
          <LoginForm callbackUrl={params.callbackUrl} />
        </div>
      </section>
    </main>
  );
}
