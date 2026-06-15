'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Tag, X, Upload, Video, Image as ImageIcon } from 'lucide-react';
import { Offer } from '@/types';

export default function OffersAdmin() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Offer>>({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image',
    ctaText: '',
    ctaLink: '',
    isActive: true,
    order: 0,
  });

  const [isUploading, setIsUploading] = useState(false);

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers');
      const data = await res.json();
      setOffers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch offers', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOffers();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    // Frontend validation: Only MP4 (H.264) is supported for optimal website performance
    if (file.type.startsWith('video/') && file.type !== 'video/mp4') {
      alert('Only MP4 videos are supported for optimal website performance.');
      return;
    }

    setIsUploading(true);
    const form = new FormData();
    form.append('file', file);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.url) {
        // Auto-detect type
        const ext = data.url.split('.').pop()?.toLowerCase();
        const type = ['mp4', 'webm', 'mov', 'ogg'].includes(ext || '') ? 'video' : 'image';
        
        setFormData(prev => ({
          ...prev,
          mediaUrl: data.url,
          mediaType: type
        }));
      }
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`/api/offers/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/offers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: Date.now().toString() }),
        });
      }
      setIsModalOpen(false);
      fetchOffers();
    } catch (err) {
      console.error('Submit failed', err);
      alert('Failed to save offer');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    try {
      await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      fetchOffers();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete offer');
    }
  };

  const toggleActive = async (offer: Offer) => {
    try {
      await fetch(`/api/offers/${offer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !offer.isActive }),
      });
      fetchOffers();
    } catch (err) {
      console.error('Toggle failed', err);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      mediaUrl: '',
      mediaType: 'image',
      ctaText: '',
      ctaLink: '',
      isActive: true,
      order: offers.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setEditingId(offer.id);
    setFormData(offer);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#f5f5f5] flex items-center gap-2">
          <Tag className="text-[#c9a84c]" />
          Manage Offers
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black rounded-lg font-medium hover:bg-[#e8c76a] transition-colors"
        >
          <Plus size={18} />
          Add Offer
        </button>
      </div>

      <div className="bg-[#111111] rounded-xl border border-[#2a2a2a] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[#888]">Loading offers...</div>
        ) : offers.length === 0 ? (
          <div className="p-8 text-center text-[#888]">No offers found. Create one above!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
                  <th className="p-4 text-[#888] font-medium text-sm">Order</th>
                  <th className="p-4 text-[#888] font-medium text-sm">Media</th>
                  <th className="p-4 text-[#888] font-medium text-sm">Title</th>
                  <th className="p-4 text-[#888] font-medium text-sm">Status</th>
                  <th className="p-4 text-[#888] font-medium text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]/50 transition-colors">
                    <td className="p-4 text-[#f5f5f5]">{offer.order}</td>
                    <td className="p-4">
                      {offer.mediaUrl ? (
                        offer.mediaType === 'video' ? (
                          <div className="w-16 h-12 bg-black rounded flex items-center justify-center border border-[#2a2a2a]">
                            <Video size={16} className="text-[#888]" />
                          </div>
                        ) : (
                          <img src={offer.mediaUrl} alt={offer.title} className="w-16 h-12 object-cover rounded border border-[#2a2a2a]" />
                        )
                      ) : (
                        <div className="w-16 h-12 bg-[#1a1a1a] rounded flex items-center justify-center border border-[#2a2a2a]">
                          <ImageIcon size={16} className="text-[#555]" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-[#f5f5f5] font-medium">{offer.title}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(offer)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          offer.isActive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                        }`}
                      >
                        {offer.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(offer)}
                        className="p-2 text-[#888] hover:text-[#c9a84c] bg-[#1a1a1a] rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(offer.id)}
                        className="p-2 text-[#888] hover:text-red-500 bg-[#1a1a1a] rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl w-full max-w-2xl shadow-2xl mt-10 mb-10">
            <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
              <h2 className="text-xl font-bold text-[#f5f5f5]">{editingId ? 'Edit Offer' : 'Add Offer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#888] hover:text-[#f5f5f5]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium text-[#888]">Title *</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-[#f5f5f5] focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="E.g., Summer Flash Sale!"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium text-[#888]">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-[#f5f5f5] focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium text-[#888]">Media Upload (Image or Video) *</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c9a84c] text-[#f5f5f5] rounded-lg cursor-pointer transition-colors">
                      <Upload size={16} />
                      {isUploading ? 'Uploading...' : 'Upload File'}
                      <input type="file" className="hidden" accept="image/*,video/mp4" onChange={handleFileUpload} disabled={isUploading} />
                    </label>
                    {formData.mediaUrl && (
                      <span className="text-sm text-[#888] truncate flex-1">
                        {formData.mediaUrl.split('/').pop()} ({formData.mediaType})
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#888]">CTA Text</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-[#f5f5f5] focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="E.g., Book Now"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#888]">CTA Link</label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-[#f5f5f5] focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="E.g., /contact"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#888]">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-[#f5f5f5] focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>

                <div className="space-y-2 flex flex-col justify-center">
                  <label className="flex items-center gap-3 cursor-pointer mt-7">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 accent-[#c9a84c] rounded bg-[#1a1a1a] border-[#2a2a2a]"
                    />
                    <span className="text-sm font-medium text-[#f5f5f5]">Active on Website</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-[#2a2a2a] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg font-medium text-[#888] hover:text-[#f5f5f5] hover:bg-[#1a1a1a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.title || !formData.mediaUrl}
                  className="px-6 py-2.5 bg-[#c9a84c] text-black rounded-lg font-bold hover:bg-[#e8c76a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
