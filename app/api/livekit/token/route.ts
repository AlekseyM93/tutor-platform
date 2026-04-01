import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createLiveKitToken } from '@/lib/livekit';
import { getSession } from '@/lib/auth';
import { getLessonByRoomName, assertUserCanJoinLessonRoom } from '@/modules/lessons/server/access';

const bodySchema = z.object({
  roomName: z.string().min(2),
  userName: z.string().min(2)
});

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = bodySchema.parse(await request.json());

    const lesson = await getLessonByRoomName(body.roomName);
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }
    const allowed = await assertUserCanJoinLessonRoom(lesson, session.user.id, session.user.role);
    if (!allowed) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const token = createLiveKitToken({
      room: body.roomName,
      identity: session.user.id,
      name: session.user.name ?? body.userName
    });

    return NextResponse.json({
      token,
      wsUrl: process.env.LIVEKIT_WS_URL
    });
  } catch (error) {
    console.error('[LIVEKIT_TOKEN_ERROR]', error);
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 400 });
  }
}
