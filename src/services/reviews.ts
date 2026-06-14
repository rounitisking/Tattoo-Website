import { Review } from '@/types';
import { reviews as mockReviews } from '@/data/reviews';

/**
 * Fetch Google Reviews
 * Currently returns mock data.
 * Future: Replace with Google Places API call + server-side caching using next/cache
 *
 * Example production implementation:
 * const res = await fetch(
 *   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${API_KEY}`,
 *   { next: { revalidate: 3600 } } // Cache for 1 hour
 * );
 */
export async function fetchGoogleReviews(): Promise<Review[]> {
  // TODO: Replace with real Google Places API call
  // const placeId = process.env.GOOGLE_PLACE_ID;
  // const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  return mockReviews;
}

export async function fetchAverageRating(): Promise<number> {
  const reviews = await fetchGoogleReviews();
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return Math.round(avg * 10) / 10;
}
