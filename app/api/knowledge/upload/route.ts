import { NextResponse } from 'next/server';
import { uploadBuffer } from '@/lib/s3';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const key = `knowledge/${session.user.id}/${Date.now()}-${file.name}`;

    await uploadBuffer({
      key,
      body: bytes,
      contentType: file.type || 'application/octet-stream'
    });

    const material = await db.knowledgeMaterial.create({
      data: {
        title: file.name,
        storageKey: key,
        mimeType: file.type || 'application/octet-stream',
        sizeBytes: bytes.byteLength,
        uploadedById: session.user.id
      }
    });

    return NextResponse.json({ ok: true, material });
  } catch (error) {
    console.error('[KNOWLEDGE_UPLOAD_ERROR]', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
