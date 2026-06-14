'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import ImageUpload from '@/components/admin/ImageUpload';
import { PortfolioItem } from '@/types';

const EMPTY: Omit<PortfolioItem, 'id'> = {
  title: '', category: '', categorySlug: '', image: '', artist: '', width: 600, height: 800, description: '',
};

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState<Omit<PortfolioItem, 'id'>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const token = () => localStorage.getItem('inkrise_admin_token') || '';

  const load = async () => { const r = await fetch('/api/portfolio'); setItems(await r.json()); };
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (p: PortfolioItem) => { setEditing(p); setForm({ title: p.title, category: p.category, categorySlug: p.categorySlug, image: p.image, artist: p.artist, width: p.width, height: p.height, description: p.description || '' }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const url = editing ? `/api/portfolio/${editing.id}` : '/api/portfolio';
    const body = { ...form, categorySlug: form.categorySlug || form.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') };
    await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(body) });
    await load(); setShowForm(false); setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return;
    await fetch(`/api/portfolio/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    await load();
  };

  const set = (k: keyof typeof form, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  return (
    <AdminShell title="Portfolio" subtitle="Manage tattoo work gallery">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#888] text-sm font-inter">{items.length} items</p>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-semibold text-sm rounded-xl hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all cursor-pointer">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden group hover:border-[#c9a84c]/30 transition-all">
            <div className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => openEdit(item)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#c9a84c]/80 transition-colors cursor-pointer"><Pencil size={13} /></button>
                <button onClick={() => handleDelete(item.id)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors cursor-pointer"><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-[#f5f5f5] text-xs font-semibold font-cinzel truncate">{item.title}</p>
              <p className="text-[#555] text-xs font-inter truncate">{item.category}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-4 py-12 text-center text-[#555] font-inter text-sm">No portfolio items yet.</div>}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-cinzel font-bold text-lg text-[#f5f5f5]">{editing ? 'Edit Item' : 'Add Item'}</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] hover:text-[#f5f5f5] cursor-pointer"><X size={16} /></button>
              </div>
              <div className="space-y-4">
                {[['title', 'Title *'], ['category', 'Category (e.g. Portrait Tattoo)'], ['categorySlug', 'Category Slug (e.g. portrait-tattoo)'], ['artist', 'Artist Name']].map(([k, label]) => (
                  <div key={k} className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">{label}</label>
                    <input type="text" value={form[k as keyof typeof form] as string} onChange={e => set(k as keyof typeof form, e.target.value)} className="form-input" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  {[['width', 'Width (px)'], ['height', 'Height (px)']].map(([k, label]) => (
                    <div key={k} className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">{label}</label>
                      <input type="number" value={form[k as keyof typeof form] as number} onChange={e => set(k as keyof typeof form, Number(e.target.value))} className="form-input" />
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">Description</label>
                  <textarea rows={2} value={form.description || ''} onChange={e => set('description', e.target.value)} className="form-input resize-none" />
                </div>
                <ImageUpload value={form.image} onChange={url => set('image', url)} label="Tattoo Image *" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 border border-[#2a2a2a] text-[#888] rounded-xl text-sm font-semibold hover:border-[#444] cursor-pointer">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.title || !form.image} className="flex-1 py-3 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                  {saving ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Check size={16} />}
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
