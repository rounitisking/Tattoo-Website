import { NextRequest } from 'next/server';
import { readJSON, writeJSON, generateId } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Artist } from '@/types';

const FILE = 'artists.json';

export async function GET() {
  const artists = readJSON<Artist[]>(FILE);
  return Response.json(artists, {
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const artists = readJSON<Artist[]>(FILE);

  const newArtist: Artist = {
    id: generateId(),
    slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    name: body.name,
    photo: body.photo || '',
    specialty: body.specialty || '',
    experience: body.experience || '',
    bio: body.bio || '',
    instagram: body.instagram || '',
    specializations: body.specializations || [],
    awards: body.awards || [],
  };

  artists.push(newArtist);
  writeJSON(FILE, artists);
  return Response.json(newArtist, { status: 201 });
}
