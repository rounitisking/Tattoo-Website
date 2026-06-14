import { NextRequest } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Artist } from '@/types';

const FILE = 'artists.json';

interface Props { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Props) {
  const { id } = await params;
  const artists = readJSON<Artist[]>(FILE);
  const artist = artists.find((a) => a.id === id || a.slug === id);
  if (!artist) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(artist);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const { id } = await params;
  const body = await req.json();
  const artists = readJSON<Artist[]>(FILE);
  const idx = artists.findIndex((a) => a.id === id);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });

  artists[idx] = { ...artists[idx], ...body, id };
  writeJSON(FILE, artists);
  return Response.json(artists[idx]);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const { id } = await params;
  const artists = readJSON<Artist[]>(FILE);
  const filtered = artists.filter((a) => a.id !== id);
  if (filtered.length === artists.length) return Response.json({ error: 'Not found' }, { status: 404 });
  writeJSON(FILE, filtered);
  return Response.json({ success: true });
}
