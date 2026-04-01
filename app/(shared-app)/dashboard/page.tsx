import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function SharedDashboardRedirectPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }

  if (session.user.role === 'STUDENT') {
    redirect('/student/dashboard');
  }

  if (session.user.role === 'ADMIN') {
    redirect('/admin');
  }

  redirect('/teacher/dashboard');
}
