'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check, ChevronDown } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import ImageUpload from '@/components/admin/ImageUpload';
import { Category, CategoryType, CategoryPlacement, CategoryFAQ } from '@/types';

type FormData = Omit<Category, 'id'>;

const EMPTY: FormData = {
  slug: '', name: '', description: '', image: '', count: 0,
  intro: '', meaning: '',
  types: [], placements: [], designIdeas: [], faqs: [],
  painLevel: { score: 5, description: '' },
  pricing: { small: '', medium: '', large: '', note: '' },
};

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#2a2a2a] rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 bg-[#0d0d0d] text-left cursor-pointer hover:bg-[#151515] transition-colors">
        <span className="text-xs font-semibold text-[#888] uppercase tracking-wider font-inter">{title}</span>
        <ChevronDown size={14} className={`text-[#555] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="p-4 space-y-3 bg-[#111111]">{children}</div>}
    </div>
  );
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const token = () => localStorage.getItem('inkrise_admin_token') || '';

  const load = async () => { const r = await fetch('/api/categories'); setCategories(await r.json()); };
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (c: Category) => {
    setEditing(c);
    setForm({ slug: c.slug, name: c.name, description: c.description, image: c.image, count: c.count, intro: c.intro || '', meaning: c.meaning || '', types: c.types || [], placements: c.placements || [], painLevel: c.painLevel || { score: 5, description: '' }, pricing: c.pricing || { small: '', medium: '', large: '', note: '' }, designIdeas: c.designIdeas || [], faqs: c.faqs || [] });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const url = editing ? `/api/categories/${editing.id}` : '/api/categories';
    await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(form) });
    await load(); setShowForm(false); setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await fetch(`/api/categories/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    await load();
  };

  const set = (k: keyof FormData, v: unknown) => setForm(f => ({ ...f, [k]: v }));
  const setNested = (parent: keyof FormData, k: string, v: unknown) => setForm(f => ({ ...f, [parent]: { ...(f[parent] as unknown as Record<string, unknown>), [k]: v } }));

  const addType = () => set('types', [...(form.types || []), { name: '', description: '' }]);
  const updateType = (i: number, k: keyof CategoryType, v: string) => { const arr = [...(form.types || [])]; arr[i] = { ...arr[i], [k]: v }; set('types', arr); };
  const removeType = (i: number) => set('types', (form.types || []).filter((_, idx) => idx !== i));

  const addPlacement = () => set('placements', [...(form.placements || []), { area: '', reason: '' }]);
  const updatePlacement = (i: number, k: keyof CategoryPlacement, v: string) => { const arr = [...(form.placements || [])]; arr[i] = { ...arr[i], [k]: v }; set('placements', arr); };
  const removePlacement = (i: number) => set('placements', (form.placements || []).filter((_, idx) => idx !== i));

  const addFAQ = () => set('faqs', [...(form.faqs || []), { q: '', a: '' }]);
  const updateFAQ = (i: number, k: keyof CategoryFAQ, v: string) => { const arr = [...(form.faqs || [])]; arr[i] = { ...arr[i], [k]: v }; set('faqs', arr); };
  const removeFAQ = (i: number) => set('faqs', (form.faqs || []).filter((_, idx) => idx !== i));

  return (
    <AdminShell title="Categories" subtitle="Manage tattoo style categories and their rich content">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#888] text-sm font-inter">{categories.length} categories</p>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-semibold text-sm rounded-xl hover:from-[#e8c76a] hover:to-[#c9a84c] transition-all cursor-pointer">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#c9a84c]/30 transition-all group">
            <div className="relative h-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {cat.image && <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-[#f5f5f5] font-cinzel font-bold text-sm">{cat.name}</p>
                <p className="text-[#c9a84c] text-xs">{cat.count} designs</p>
              </div>
            </div>
            <div className="p-3 flex items-center gap-2">
              <button onClick={() => openEdit(cat)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-xs text-[#888] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all cursor-pointer"><Pencil size={12} /> Edit</button>
              <button onClick={() => handleDelete(cat.id)} className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#888] hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-cinzel font-bold text-lg text-[#f5f5f5]">{editing ? 'Edit Category' : 'Add Category'}</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888] hover:text-[#f5f5f5] cursor-pointer"><X size={16} /></button>
              </div>

              <div className="space-y-4">
                {/* Basic */}
                <Section title="Basic Info" defaultOpen>
                  <div className="grid grid-cols-2 gap-3">
                    {[['name', 'Name *'], ['slug', 'Slug']].map(([k, label]) => (
                      <div key={k} className="space-y-1">
                        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider font-inter">{label}</label>
                        <input type="text" value={form[k as keyof FormData] as string} onChange={e => set(k as keyof FormData, e.target.value)} className="form-input text-sm" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#666] uppercase tracking-wider font-inter">Description</label>
                    <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} className="form-input text-sm resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#666] uppercase tracking-wider font-inter">Count (# of designs)</label>
                    <input type="number" value={form.count} onChange={e => set('count', Number(e.target.value))} className="form-input text-sm" />
                  </div>
                  <ImageUpload value={form.image} onChange={url => set('image', url)} label="Cover Image" />
                </Section>

                {/* Rich content */}
                <Section title="Introduction & Meaning">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#666] uppercase tracking-wider font-inter">Introduction</label>
                    <textarea rows={3} value={form.intro || ''} onChange={e => set('intro', e.target.value)} className="form-input text-sm resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#666] uppercase tracking-wider font-inter">Meaning & Symbolism</label>
                    <textarea rows={3} value={form.meaning || ''} onChange={e => set('meaning', e.target.value)} className="form-input text-sm resize-none" />
                  </div>
                </Section>

                <Section title="Types">
                  {(form.types || []).map((type, i) => (
                    <div key={i} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-3 space-y-2 relative">
                      <button type="button" onClick={() => removeType(i)} className="absolute top-2 right-2 w-6 h-6 text-[#555] hover:text-red-400 flex items-center justify-center cursor-pointer"><X size={12} /></button>
                      <input type="text" placeholder="Type name" value={type.name} onChange={e => updateType(i, 'name', e.target.value)} className="form-input text-xs" />
                      <textarea rows={2} placeholder="Description" value={type.description} onChange={e => updateType(i, 'description', e.target.value)} className="form-input text-xs resize-none" />
                    </div>
                  ))}
                  <button type="button" onClick={addType} className="w-full py-2 border border-dashed border-[#2a2a2a] rounded-xl text-xs text-[#555] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all cursor-pointer flex items-center justify-center gap-1"><Plus size={12} /> Add Type</button>
                </Section>

                <Section title="Best Placements">
                  {(form.placements || []).map((p, i) => (
                    <div key={i} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-3 space-y-2 relative">
                      <button type="button" onClick={() => removePlacement(i)} className="absolute top-2 right-2 w-6 h-6 text-[#555] hover:text-red-400 flex items-center justify-center cursor-pointer"><X size={12} /></button>
                      <input type="text" placeholder="Area (e.g. Upper Arm)" value={p.area} onChange={e => updatePlacement(i, 'area', e.target.value)} className="form-input text-xs" />
                      <input type="text" placeholder="Reason" value={p.reason} onChange={e => updatePlacement(i, 'reason', e.target.value)} className="form-input text-xs" />
                    </div>
                  ))}
                  <button type="button" onClick={addPlacement} className="w-full py-2 border border-dashed border-[#2a2a2a] rounded-xl text-xs text-[#555] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all cursor-pointer flex items-center justify-center gap-1"><Plus size={12} /> Add Placement</button>
                </Section>

                <Section title="Pain Level & Pricing">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#666] uppercase tracking-wider font-inter">Pain Score (1–10)</label>
                      <input type="number" min={1} max={10} value={form.painLevel?.score || 5} onChange={e => setNested('painLevel', 'score', Number(e.target.value))} className="form-input text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#666] uppercase tracking-wider font-inter">Pain Description</label>
                      <input type="text" value={form.painLevel?.description || ''} onChange={e => setNested('painLevel', 'description', e.target.value)} className="form-input text-sm" />
                    </div>
                  </div>
                  {['small', 'medium', 'large', 'note'].map(k => (
                    <div key={k} className="space-y-1">
                      <label className="text-xs font-semibold text-[#666] uppercase tracking-wider font-inter">Pricing — {k.charAt(0).toUpperCase() + k.slice(1)}</label>
                      <input type="text" value={(form.pricing as unknown as Record<string, string>)?.[k] || ''} onChange={e => setNested('pricing', k, e.target.value)} className="form-input text-sm" placeholder={k === 'note' ? 'Additional note...' : '₹2,000 – ₹5,000'} />
                    </div>
                  ))}
                </Section>

                <Section title="Design Ideas">
                  {(form.designIdeas || []).map((idea, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={idea} onChange={e => { const arr = [...(form.designIdeas || [])]; arr[i] = e.target.value; set('designIdeas', arr); }} className="form-input text-sm flex-1" />
                      <button type="button" onClick={() => set('designIdeas', (form.designIdeas || []).filter((_, idx) => idx !== i))} className="w-8 h-10 text-[#555] hover:text-red-400 flex items-center justify-center cursor-pointer"><X size={14} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => set('designIdeas', [...(form.designIdeas || []), ''])} className="w-full py-2 border border-dashed border-[#2a2a2a] rounded-xl text-xs text-[#555] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 cursor-pointer flex items-center justify-center gap-1"><Plus size={12} /> Add Design Idea</button>
                </Section>

                <Section title="FAQs">
                  {(form.faqs || []).map((faq, i) => (
                    <div key={i} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-3 space-y-2 relative">
                      <button type="button" onClick={() => removeFAQ(i)} className="absolute top-2 right-2 w-6 h-6 text-[#555] hover:text-red-400 flex items-center justify-center cursor-pointer"><X size={12} /></button>
                      <input type="text" placeholder="Question" value={faq.q} onChange={e => updateFAQ(i, 'q', e.target.value)} className="form-input text-xs" />
                      <textarea rows={2} placeholder="Answer" value={faq.a} onChange={e => updateFAQ(i, 'a', e.target.value)} className="form-input text-xs resize-none" />
                    </div>
                  ))}
                  <button type="button" onClick={addFAQ} className="w-full py-2 border border-dashed border-[#2a2a2a] rounded-xl text-xs text-[#555] hover:text-[#c9a84c] hover:border-[#c9a84c]/30 cursor-pointer flex items-center justify-center gap-1"><Plus size={12} /> Add FAQ</button>
                </Section>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 border border-[#2a2a2a] text-[#888] rounded-xl text-sm font-semibold hover:border-[#444] cursor-pointer">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.name} className="flex-1 py-3 bg-gradient-to-r from-[#c9a84c] to-[#a07c28] text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                  {saving ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Check size={16} />}
                  {saving ? 'Saving…' : 'Save Category'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
