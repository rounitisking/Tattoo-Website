import { NextRequest } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Category } from '@/types';

const FILE = 'categories.json';
interface Props { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Props) {
  const { id } = await params;
  const categories = readJSON<Category[]>(FILE);
  const cat = categories.find((c) => c.id === id || c.slug === id);
  if (!cat) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(cat);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const authError = requireAuth(req);
  if (authError) return authError;
  const { id } = await params;
  const body = await req.json();
  const categories = readJSON<Category[]>(FILE);
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 });
  categories[idx] = { ...categories[idx], ...body, id };
  writeJSON(FILE, categories);
  return Response.json(categories[idx]);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const authError = requireAuth(req);
  if (authError) return authError;
  const { id } = await params;
  const categories = readJSON<Category[]>(FILE);
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) return Response.json({ error: 'Not found' }, { status: 404 });
  writeJSON(FILE, filtered);
  return Response.json({ success: true });
}
