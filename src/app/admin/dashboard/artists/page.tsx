'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import ImageUpload from '@/components/admin/ImageUpload';
import { Artist } from '@/types';

const EMPTY: Omit<Artist, 'id'> = {
  slug: '', name: '', photo: '', specialty: '', experience: '', bio: '',
  instagram: '', specializations: [], awards: [],
};

export default function AdminArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Artist | null>(null);
  const [form, setForm] = useState<Omit<Artist, 'id'>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const token = () => localStorage.getItem('inkrise_admin_token') || '';

  const load = async () => {
    const res = await fetch('/api/artists');
    setArtists(await res.json());
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (a: Artist) => { setEditing(a); setForm({ slug: a.slug, name: a.name, photo: a.photo, specialty: a.specialty, experience: a.experience, bio: a.bio, instagram: a.instagram, specializations: a.specializations, awards: a.awards }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    const url = editing ? `/api/artists/${editing.id}` : '/api/artists';
    const method = editing ? 'PUT' : 'POST';
    const body = { ...form, specializations: typeof form.specializations === 'string' ? (form.specializations as unknown as string).split(',').map((s: string) => s.trim()).filter(Boolean) : form.specializations, awards: typeof form.awards === 'string' ? (form.awards as unknown as string).split(',').map((s: string) => s.trim()).filter(Boolean) : form.awards };
    await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(body) });
    await load();
    setShowForm(false);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this artist? This cannot be undone.')) return;
    setDeleting(id);
    await fetch(`/api/artists/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    await load();
    setDeleting(null);
  };

  const set = (k: keyof typeof form, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  return (
    <AdminShell title="Artists" subtitle="Manage your tattoo artist profiles">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#888] text-sm font-inter">{artists.length} artists</p>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-semibold text-sm rounded-xl hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all cursor-pointer">
          <Plus size={16} /> Add Artist
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[#2a2a2a]">
            <tr>
              {['Artist', 'Specialty', 'Experience', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[#555] uppercase tracking-wider px-6 py-4 font-inter">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {artists.map((artist) => (
              <tr key={artist.id} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {artist.photo && <img src={artist.photo} alt={artist.name} className="w-10 h-10 rounded-full object-cover border border-[#2a2a2a]" />}
                    <div>
                      <p className="text-[#f5f5f5] font-semibold text-sm font-cinzel">{artist.name}</p>
                      <p className="text-[#555] text-xs font-inter">@{artist.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#888] text-sm font-inter">{artist.specialty}</td>
                <td className="px-6 py-4 text-[#888] text-sm font-inter">{artist.experience}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(artist)} className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all cursor-pointer">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDelete(artist.id)} disabled={deleting === artist.id} className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer disabled:opacity-50">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {artists.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-[#555] font-inter text-sm">No artists yet. Click &quot;Add Artist&quot; to create one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-cinzel font-bold text-lg text-[#f5f5f5]">{editing ? 'Edit Artist' : 'Add Artist'}</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] hover:text-[#f5f5f5] transition-colors cursor-pointer"><X size={16} /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[['name', 'Name *'], ['slug', 'Slug (auto-generated)'], ['specialty', 'Specialty'], ['experience', 'Experience (e.g. 5 Years)']].map(([k, label]) => (
                  <div key={k} className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">{label}</label>
                    <input type="text" value={form[k as keyof typeof form] as string} onChange={e => set(k as keyof typeof form, e.target.value)} className="form-input" />
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-1.5">
                <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">Instagram URL</label>
                <input type="url" value={form.instagram} onChange={e => set('instagram', e.target.value)} className="form-input" placeholder="https://instagram.com/..." />
              </div>

              <div className="mt-4 space-y-1.5">
                <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">Bio</label>
                <textarea rows={4} value={form.bio} onChange={e => set('bio', e.target.value)} className="form-input resize-none" />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">Specializations (comma-separated)</label>
                  <input type="text" value={Array.isArray(form.specializations) ? form.specializations.join(', ') : form.specializations} onChange={e => set('specializations', e.target.value)} className="form-input" placeholder="Realism, Portrait, Geometric" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">Awards (comma-separated)</label>
                  <input type="text" value={Array.isArray(form.awards) ? form.awards.join(', ') : form.awards} onChange={e => set('awards', e.target.value)} className="form-input" placeholder="Best Realism 2023, ..." />
                </div>
              </div>

              <div className="mt-4">
                <ImageUpload value={form.photo} onChange={url => set('photo', url)} label="Artist Photo" />
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 border border-[#2a2a2a] text-[#888] rounded-xl text-sm font-semibold hover:text-[#f5f5f5] hover:border-[#444] transition-all cursor-pointer">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.name} className="flex-1 py-3 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm rounded-xl hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                  {saving ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Check size={16} />}
                  {saving ? 'Saving…' : 'Save Artist'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
