import { NextRequest } from 'next/server';
import { readJSON, writeJSON, generateId } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Review } from '@/types';

const FILE = 'reviews.json';

/**
 * GET /api/reviews
 *
 * Priority order:
 * 1. If GOOGLE_MAPS_API_KEY + GOOGLE_PLACE_ID are set → fetch live from Google Places API
 *    (returns the most recent 5 reviews Google provides — this is a hard Google API limit)
 * 2. Otherwise → return admin-managed reviews from data/reviews.json
 *
 * Response is cached for 1 hour on the server (next.revalidate).
 * Cache-Control: no-store is intentionally NOT set here so Next.js can cache the
 * expensive Google API call. The client fetches fresh data on every page load anyway.
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // --- Try Google Places API if credentials are configured ---
  if (apiKey && placeId) {
    try {
      const fields = 'reviews,rating,user_ratings_total';
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&reviews_sort=newest&key=${apiKey}`;

      const res = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour server-side
      });

      if (res.ok) {
        const data = await res.json();
        const result = data?.result;

        if (result?.reviews && result.reviews.length > 0) {
          // Map Google's response shape to our Review type
          const googleReviews: Review[] = result.reviews.map(
            (r: {
              author_name: string;
              profile_photo_url?: string;
              rating: number;
              text: string;
              relative_time_description: string;
            }) => ({
              id: `g-${Buffer.from(r.author_name).toString('base64').slice(0, 8)}`,
              name: r.author_name,
              avatar: r.profile_photo_url || '',
              rating: r.rating,
              text: r.text,
              date: r.relative_time_description,
              verified: true, // All Google reviews are verified
            })
          );

          return Response.json(
            {
              source: 'google',
              placeRating: result.rating ?? null,
              totalRatings: result.user_ratings_total ?? null,
              reviews: googleReviews,
            },
            { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
          );
        }
      }
    } catch (err) {
      console.error('[/api/reviews] Google Places API error:', err);
      // Fall through to admin data
    }
  }

  // --- Fallback: return admin-managed reviews from data/reviews.json ---
  const reviews = readJSON<Review[]>(FILE);
  return Response.json(
    {
      source: 'admin',
      placeRating: null,
      totalRatings: null,
      reviews,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

/** POST /api/reviews — add a review (admin only) */
export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const reviews = readJSON<Review[]>(FILE);
  const newReview: Review = {
    id: generateId(),
    name: body.name || 'Anonymous',
    avatar: body.avatar || '',
    rating: body.rating ?? 5,
    text: body.text || '',
    date: body.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    verified: body.verified ?? true,
  };
  reviews.unshift(newReview); // Add newest first
  writeJSON(FILE, reviews);
  return Response.json(newReview, { status: 201 });
}
