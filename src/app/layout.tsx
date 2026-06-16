import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import { SITE_CONFIG } from '@/constants/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://inkrisetattoo.com'),
  title: {
    default: `${SITE_CONFIG.name} — Premium Tattoo Studio`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'tattoo studio',
    'ink rise tattoo',
    'tattoo artist',
    'portrait tattoo',
    'geometric tattoo',
    'mandala tattoo',
    'body piercing',
    'custom tattoo design',
    'tattoo noida',
    'best tattoo studio',
  ],
  openGraph: {
    siteName: SITE_CONFIG.name,
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/logo.webp',
    apple: '/logo.webp',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cinzel.variable}`}>
      <body className="bg-[#0a0a0a] text-[#f5f5f5] font-inter antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
