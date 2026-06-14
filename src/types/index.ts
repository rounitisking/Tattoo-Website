export interface Artist {
  id: string;
  slug: string;
  name: string;
  photo: string;
  specialty: string;
  experience: string;
  bio: string;
  instagram: string;
  specializations: string[];
  awards: string[];
}

export interface CategoryType {
  name: string;
  description: string;
}

export interface CategoryPlacement {
  area: string;
  reason: string;
}

export interface CategoryPainLevel {
  score: number; // 1–10
  description: string;
}

export interface CategoryPricing {
  small: string;
  medium: string;
  large: string;
  note: string;
}

export interface CategoryFAQ {
  q: string;
  a: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
  // Rich content fields (optional — populated from admin)
  intro?: string;
  meaning?: string;
  types?: CategoryType[];
  placements?: CategoryPlacement[];
  painLevel?: CategoryPainLevel;
  pricing?: CategoryPricing;
  designIdeas?: string[];
  faqs?: CategoryFAQ[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  image: string;
  artist: string;
  width: number;
  height: number;
  description?: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  items: string[]; // portfolio item IDs
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AfterCareContent {
  en: AfterCareSection[];
  hi: AfterCareSection[];
}

export interface AfterCareSection {
  title: string;
  items: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
