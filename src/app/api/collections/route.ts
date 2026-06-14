import { NextRequest } from 'next/server';
import { readJSON, writeJSON, generateId } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Collection } from '@/types';

const FILE = 'collections.json';

export async function GET() {
  return Response.json(readJSON<Collection[]>(FILE));
}

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const collections = readJSON<Collection[]>(FILE);
  const newCollection: Collection = {
    id: generateId(),
    slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    name: body.name,
    description: body.description || '',
    image: body.image || '',
    category: body.category || '',
    items: body.items || [],
  };
  collections.push(newCollection);
  writeJSON(FILE, collections);
  return Response.json(newCollection, { status: 201 });
}
