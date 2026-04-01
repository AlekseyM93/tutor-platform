import { NextResponse } from 'next/server';
import { registerUser } from '@/modules/auth/server/register-user';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await registerUser(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
