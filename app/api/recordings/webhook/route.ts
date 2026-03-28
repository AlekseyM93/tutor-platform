import { NextResponse } from 'next/server';

/**
 * Сюда LiveKit может присылать события о комнате, треках и записи.
 * В production нужно:
 * 1. валидировать signature/webhook secret
 * 2. матчить roomName -> Lesson
 * 3. создавать или обновлять Recording в БД
 * 4. сохранять статусы PENDING/PROCESSING/READY/FAILED
 */
export async function POST(request: Request) {
  const payload = await request.text();

  console.log('[LIVEKIT_WEBHOOK_PAYLOAD]', payload);

  return NextResponse.json({ received: true });
}
