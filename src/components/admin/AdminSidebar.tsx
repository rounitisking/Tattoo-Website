'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Image, FolderOpen, BookOpen, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/dashboard/artists', label: 'Artists', icon: Users },
  { href: '/admin/dashboard/portfolio', label: 'Portfolio', icon: Image },
  { href: '/admin/dashboard/categories', label: 'Categories', icon: FolderOpen },
  { href: '/admin/dashboard/collections', label: 'Collections', icon: BookOpen },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('inkrise_admin_token');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 shrink-0 bg-[#0d0d0d] border-r border-[#2a2a2a] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#a07c28] flex items-center justify-center shadow-lg shrink-0">
            <span className="text-black font-bold text-sm font-cinzel">IR</span>
          </div>
          <div>
            <p className="font-cinzel font-bold text-[#f5f5f5] text-sm tracking-wider">INK RISE</p>
            <p className="text-[#c9a84c] text-[10px] tracking-[0.2em] uppercase font-inter">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all duration-200 border-l-2 mx-0',
                isActive
                  ? 'text-[#c9a84c] border-[#c9a84c] bg-[#c9a84c]/5'
                  : 'text-[#888] border-transparent hover:text-[#f5f5f5] hover:bg-white/3 hover:border-[#c9a84c]/30'
              )}
            >
              <item.icon size={17} />
              {item.label}
              {isActive && <ChevronRight size={14} className="ml-auto text-[#c9a84c]" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-xs text-[#555] hover:text-[#888] transition-colors rounded-lg mb-2 font-inter"
        >
          View Live Site →
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#888] hover:text-red-400 hover:bg-red-500/5 transition-all rounded-lg font-inter cursor-pointer"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
