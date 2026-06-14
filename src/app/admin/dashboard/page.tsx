'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Image, FolderOpen, BookOpen, ArrowRight, TrendingUp } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';

interface Stats { artists: number; portfolio: number; categories: number; collections: number; }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ artists: 0, portfolio: 0, categories: 0, collections: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/artists').then(r => r.json()),
      fetch('/api/portfolio').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/collections').then(r => r.json()),
    ]).then(([artists, portfolio, categories, collections]) => {
      setStats({
        artists: Array.isArray(artists) ? artists.length : 0,
        portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
        categories: Array.isArray(categories) ? categories.length : 0,
        collections: Array.isArray(collections) ? collections.length : 0,
      });
    });
  }, []);

  const statCards = [
    { label: 'Artists', value: stats.artists, icon: Users, href: '/admin/dashboard/artists', color: 'from-[#c9a84c] to-[#a07c28]' },
    { label: 'Portfolio Items', value: stats.portfolio, icon: Image, href: '/admin/dashboard/portfolio', color: 'from-[#7c3aed] to-[#5b21b6]' },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, href: '/admin/dashboard/categories', color: 'from-[#059669] to-[#047857]' },
    { label: 'Collections', value: stats.collections, icon: BookOpen, href: '/admin/dashboard/collections', color: 'from-[#dc2626] to-[#b91c1c]' },
  ];

  const quickActions = [
    { label: 'Add New Artist', href: '/admin/dashboard/artists', desc: 'Create an artist profile' },
    { label: 'Upload Portfolio', href: '/admin/dashboard/portfolio', desc: 'Add tattoo work photos' },
    { label: 'Edit Category', href: '/admin/dashboard/categories', desc: 'Update category content & SEO' },
    { label: 'Create Collection', href: '/admin/dashboard/collections', desc: 'Group related tattoo work' },
  ];

  return (
    <AdminShell title="Dashboard" subtitle="Manage your tattoo studio content">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#c9a84c]/10 to-[#a07c28]/5 border border-[#c9a84c]/20 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={20} className="text-[#c9a84c]" />
          <h2 className="font-cinzel font-bold text-[#f5f5f5] text-lg">Welcome back, Admin</h2>
        </div>
        <p className="text-[#888] text-sm font-inter">Manage your studio content from here. All changes are instantly reflected on the live website.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#c9a84c]/30 transition-all duration-200 card-hover group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-lg`}>
                <card.icon size={18} className="text-white" />
              </div>
              <div className="font-cinzel font-black text-3xl text-[#f5f5f5] mb-1">{card.value}</div>
              <div className="text-[#888] text-xs font-inter">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="font-cinzel font-semibold text-[#f5f5f5] text-lg mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#c9a84c]/40 transition-all duration-200 group flex items-center justify-between">
              <div>
                <p className="text-[#f5f5f5] font-semibold text-sm font-cinzel group-hover:text-[#c9a84c] transition-colors">{action.label}</p>
                <p className="text-[#666] text-xs font-inter mt-0.5">{action.desc}</p>
              </div>
              <ArrowRight size={16} className="text-[#555] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
