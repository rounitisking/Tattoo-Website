'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminShell({ children, title, subtitle }: AdminShellProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('inkrise_admin_token');
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-[#2a2a2a] px-8 py-6 bg-[#0d0d0d]">
          <h1 className="font-cinzel font-bold text-2xl text-[#f5f5f5]">{title}</h1>
          {subtitle && <p className="text-[#888] text-sm font-inter mt-1">{subtitle}</p>}
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
