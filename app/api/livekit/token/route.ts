import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createLiveKitToken } from '@/lib/livekit';
import { getSession } from '@/lib/auth';

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
