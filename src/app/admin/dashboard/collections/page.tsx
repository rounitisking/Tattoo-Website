'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import ImageUpload from '@/components/admin/ImageUpload';
import { Collection } from '@/types';

type FormData = Omit<Collection, 'id'>;
const EMPTY: FormData = { slug: '', name: '', description: '', image: '', category: '', items: [] };

export default function AdminCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const token = () => localStorage.getItem('inkrise_admin_token') || '';

  const load = async () => { const r = await fetch('/api/collections'); setCollections(await r.json()); };
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (c: Collection) => { setEditing(c); setForm({ slug: c.slug, name: c.name, description: c.description, image: c.image, category: c.category, items: c.items }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const url = editing ? `/api/collections/${editing.id}` : '/api/collections';
    await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(form) });
    await load(); setShowForm(false); setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this collection?')) return;
    await fetch(`/api/collections/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    await load();
  };

  const set = (k: keyof FormData, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  return (
    <AdminShell title="Collections" subtitle="Group related tattoo work into curated collections">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#888] text-sm font-inter">{collections.length} collections</p>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-semibold text-sm rounded-xl hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all cursor-pointer">
          <Plus size={16} /> Add Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((col) => (
          <div key={col.id} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#c9a84c]/30 transition-all">
            <div className="relative h-44">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {col.image && <img src={col.image} alt={col.name} className="w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <p className="font-cinzel font-bold text-[#f5f5f5]">{col.name}</p>
                <p className="text-[#c9a84c] text-xs">{col.category} · {col.items.length} items</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-[#888] text-xs font-inter line-clamp-2 mb-3">{col.description}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(col)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-xs text-[#888] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all cursor-pointer"><Pencil size={12} /> Edit</button>
                <button onClick={() => handleDelete(col.id)} className="w-9 h-9 flex items-center justify-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#888] hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
        {collections.length === 0 && <p className="col-span-3 py-12 text-center text-[#555] font-inter text-sm">No collections yet.</p>}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-cinzel font-bold text-lg text-[#f5f5f5]">{editing ? 'Edit Collection' : 'Add Collection'}</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] hover:text-[#f5f5f5] cursor-pointer"><X size={16} /></button>
              </div>
              <div className="space-y-4">
                {[['name', 'Name *'], ['slug', 'Slug'], ['category', 'Category Tag']].map(([k, label]) => (
                  <div key={k} className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">{label}</label>
                    <input type="text" value={form[k as keyof FormData] as string} onChange={e => set(k as keyof FormData, e.target.value)} className="form-input" />
                  </div>
                ))}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className="form-input resize-none" />
                </div>
                <ImageUpload value={form.image} onChange={url => set('image', url)} label="Cover Image *" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 border border-[#2a2a2a] text-[#888] rounded-xl text-sm font-semibold hover:border-[#444] cursor-pointer">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.name} className="flex-1 py-3 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
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
