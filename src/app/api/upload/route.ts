import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth';
import path from 'path';
import fs from 'fs';
import { generateId } from '@/lib/db';

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return Response.json({ error: 'No file provided' }, { status: 400 });
  }

  // Enforce MP4 (H.264) only for optimal compatibility and performance
  const isVideo = file.type.startsWith('video/');
  if (isVideo && file.type !== 'video/mp4') {
    return Response.json({ error: 'Only MP4 videos are supported for optimal website performance.' }, { status: 400 });
  }

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!isVideo && !allowedImageTypes.includes(file.type)) {
    return Response.json({ error: 'Invalid file type. Only JPG, PNG, WebP, GIF, and MP4 allowed.' }, { status: 400 });
  }

  const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024; // 50MB video, 10MB image
  if (file.size > maxSize) {
    return Response.json({ error: `File too large. Maximum ${isVideo ? '50MB' : '10MB'}.` }, { status: 400 });
  }

  let ext = file.type.split('/')[1].replace('jpeg', 'jpg');
  if (file.type === 'video/mp4') ext = 'mp4';
  const filename = `${generateId()}.${ext}`;

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  return Response.json({ url: `/uploads/${filename}` }, { status: 201 });
}
