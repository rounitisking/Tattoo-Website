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

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
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
