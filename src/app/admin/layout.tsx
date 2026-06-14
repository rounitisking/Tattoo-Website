import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin — Ink Rise Tattoo Studio',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root-wrapper min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-inter antialiased">
      {children}
    </div>
  );
}
