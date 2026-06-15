import { NavItem } from '@/types';

/**
 * GOOGLE PLACE ID — Required for:
 *  1. "Write a Review" button deep-link
 *  2. Live Google Places API review fetching (via GOOGLE_PLACE_ID env var)
 *
 * HOW TO FIND YOUR PLACE ID:
 *  1. Go to https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 *  2. Search for "Ink Rise Tattoo Studio" and select the correct listing
 *  3. Copy the Place ID shown (format: ChIJ...)
 *  4. Paste it below AND add it to your .env.local as GOOGLE_PLACE_ID=ChIJ...
 *
 * TEMPORARY: Replace 'YOUR_PLACE_ID_HERE' with the real Place ID once found.
 */
const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'YOUR_PLACE_ID_HERE';

// The deep-link that opens Google Maps directly to the "Write a review" dialog
const googleReviewLink =
  GOOGLE_PLACE_ID !== 'YOUR_PLACE_ID_HERE'
    ? `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`
    : 'https://share.google/tcQbFLmllbSwLIyhV'; // Fallback to business profile link

export const SITE_CONFIG = {
  name: 'Ink Rise Tattoo Studio',
  tagline: 'Where Skin Becomes a Canvas, and Art Lives Forever',
  description:
    'Ink Rise Tattoo Studio — Premium tattoo artistry and body piercing in the heart of the city. Custom designs, realism, portraits, geometric, and more.',
  phone: '+917351636806',
  phoneDisplay: '+91 73516 36806',
  whatsapp: '917351636806',
  whatsappMessage: 'Hello! I would like to book a consultation at Ink Rise Tattoo Studio.',
  email: 'inkrise.tattoos@gmail.com',
  address: 'Ink Rise Tattoo Studio, Shop No. 12, Sector 18 Market, Noida, Uttar Pradesh 201301',
  addressShort: 'Sector 18, Noida, UP',
  mapLink: 'https://maps.app.goo.gl/bJ2euhbNBVVrPzz38',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=28.642836,77.3409119&t=&z=15&ie=UTF8&iwloc=&output=embed',
  instagram: 'https://www.instagram.com/ink_rise_tattoos?igsh=MTI0aGR0a29pYTg1aQ==',
  facebook: 'https://www.instagram.com/ink_rise_tattoos?igsh=MTI0aGR0a29pYTg1aQ==',
  youtube: 'https://www.instagram.com/ink_rise_tattoos?igsh=MTI0aGR0a29pYTg1aQ==',
  hours: 'Mon – Sun: 10:00 AM – 9:00 PM',
  googlePlaceId: GOOGLE_PLACE_ID,
  googleReviewLink,
  year: new Date().getFullYear(),
};


export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Artists', href: '/artists' },
  { label: 'Offers', href: '/offers' },
  { label: 'After Care', href: '/after-care' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
