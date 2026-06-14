import { NextRequest } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Collection } from '@/types';

const FILE = 'collections.json';
interface Props { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Props) {
  const { id } = await params;
  const items = readJSON<Collection[]>(FILE);
  const item = items.find((c) => c.id === id || c.slug === id);
  if (!item) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(item);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const authError = requireAuth(req);
  if (authError) return authError;
  const { id } = await params;
  const body = await req.json();
  const items = readJSON<Collection[]>(FILE);
  const idx = items.findIndex((c) => c.id === id);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  items[idx] = { ...items[idx], ...body, id };
  writeJSON(FILE, items);
  return Response.json(items[idx]);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const authError = requireAuth(req);
  if (authError) return authError;
  const { id } = await params;
  const items = readJSON<Collection[]>(FILE);
  const filtered = items.filter((c) => c.id !== id);
  if (filtered.length === items.length) return Response.json({ error: 'Not found' }, { status: 404 });
  writeJSON(FILE, filtered);
  return Response.json({ success: true });
}
