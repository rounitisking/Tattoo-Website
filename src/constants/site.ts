import { NavItem } from '@/types';

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
  mapLink: 'https://share.google/u01QeClTVGspQsrvz',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.234!2d77.3106!3d28.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzA0LjEiTiA3N8KwMTgnMzguMiJF!5e0!3m2!1sen!2sin!4v1623456789012',
  instagram: 'https://www.instagram.com/ink_rise_tattoos?igsh=MTI0aGR0a29pYTg1aQ==',
  facebook: 'https://www.instagram.com/ink_rise_tattoos?igsh=MTI0aGR0a29pYTg1aQ==',
  youtube: 'https://www.instagram.com/ink_rise_tattoos?igsh=MTI0aGR0a29pYTg1aQ==',
  hours: 'Mon – Sun: 10:00 AM – 9:00 PM',
  googleReviewLink: 'https://g.page/r/inkrise-tattoos/review',
  year: new Date().getFullYear(),
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Artists', href: '/artists' },
  { label: 'After Care', href: '/after-care' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
