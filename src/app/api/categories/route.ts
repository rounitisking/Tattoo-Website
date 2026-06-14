import { NextRequest } from 'next/server';
import { readJSON, writeJSON, generateId } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Category } from '@/types';

const FILE = 'categories.json';

export async function GET() {
  return Response.json(readJSON<Category[]>(FILE));
}

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const categories = readJSON<Category[]>(FILE);
  const newCategory: Category = {
    id: generateId(),
    slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    name: body.name,
    description: body.description || '',
    image: body.image || '',
    count: body.count || 0,
    intro: body.intro,
    meaning: body.meaning,
    types: body.types,
    placements: body.placements,
    painLevel: body.painLevel,
    pricing: body.pricing,
    designIdeas: body.designIdeas,
    faqs: body.faqs,
  };
  categories.push(newCategory);
  writeJSON(FILE, categories);
  return Response.json(newCategory, { status: 201 });
}
