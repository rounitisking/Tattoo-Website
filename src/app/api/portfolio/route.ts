import { NextRequest } from 'next/server';
import { readJSON, writeJSON, generateId } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { PortfolioItem } from '@/types';

const FILE = 'portfolio.json';

export async function GET() {
  return Response.json(readJSON<PortfolioItem[]>(FILE));
}

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const items = readJSON<PortfolioItem[]>(FILE);
  const newItem: PortfolioItem = {
    id: generateId(),
    title: body.title || 'Untitled',
    category: body.category || '',
    categorySlug: body.categorySlug || body.category?.toLowerCase().replace(/\s+/g, '-') || '',
    image: body.image || '',
    artist: body.artist || '',
    width: body.width || 600,
    height: body.height || 800,
    description: body.description || '',
  };
  items.push(newItem);
  writeJSON(FILE, items);
  return Response.json(newItem, { status: 201 });
}
