import { VideoRoom } from '@/components/video-room';
import { Whiteboard } from '@/components/whiteboard';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return [{ id: 'demo-room' }, { id: 'physics-room' }];
}

function roleLabel(role: string) {
  if (role === 'TUTOR') return 'Репетитор';
  if (role === 'STUDENT') return 'Ученик';
  if (role === 'ADMIN') return 'Администратор';
  return role;
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }
  const { id } = await params;

  return (
    <main className="container-shell space-y-8 py-8 md:py-10">
      <section className="card flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <div className="text-theme-subtle text-xs font-semibold uppercase tracking-[0.2em]">
            Комната урока
          </div>
          <h1 className="font-display text-theme mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Комната: {id}
          </h1>
          <p className="text-theme-muted mt-3">
            Участник: {session.user.name ?? session.user.email} · роль: {roleLabel(session.user.role)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-secondary">
            Начать запись
          </button>
          <button type="button" className="btn-primary">
            Пригласить ученика
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <VideoRoom roomName={id} userName={session.user.name ?? session.user.email ?? 'Пользователь'} />
        <Whiteboard />
      </section>
    </main>
  );
}
