import { VideoRoom } from '@/components/video-room';
import { Whiteboard } from '@/components/whiteboard';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/login');
  }
  const { id } = await params;

  return (
    <main className="container-shell space-y-6 py-8">
      <section className="card flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Lesson room
          </div>
          <h1 className="mt-2 text-3xl font-black">Комната: {id}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Участник: {session.user.name ?? session.user.email} · роль: {session.user.role}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">Старт записи</button>
          <button className="btn-primary">Пригласить ученика</button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <VideoRoom roomName={id} userName={session.user.name ?? session.user.email ?? 'User'} />
        <Whiteboard />
      </section>
    </main>
  );
}
