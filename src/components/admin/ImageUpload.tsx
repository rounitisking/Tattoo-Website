'use client';

import { useState, useRef } from 'react';
import { Upload, X, Link2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<'url' | 'upload'>('url');
  const fileRef = useRef<HTMLInputElement>(null);

  const getToken = () => localStorage.getItem('inkrise_admin_token') || '';

  const handleFile = async (file: File) => {
    // Frontend validation: Only MP4 (H.264) is supported for optimal website performance
    if (file.type.startsWith('video/') && file.type !== 'video/mp4') {
      alert('Only MP4 videos are supported for optimal website performance.');
      return;
    }

    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: form,
      });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else if (data.error) alert(data.error);
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const isVideo = value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.ogg');

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold tracking-wider text-[#888] uppercase font-inter">{label}</label>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-3">
        {(['url', 'upload'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === t ? 'bg-[#c9a84c] text-black' : 'bg-[#1a1a1a] text-[#888] hover:text-[#f5f5f5]'}`}
          >
            {t === 'url' ? <span className="flex items-center gap-1"><Link2 size={12} /> URL</span> : <span className="flex items-center gap-1"><Upload size={12} /> Upload</span>}
          </button>
        ))}
      </div>

      {tab === 'url' ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or /uploads/..."
          className="form-input"
        />
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          className="border-2 border-dashed border-[#2a2a2a] hover:border-[#c9a84c]/50 rounded-xl p-6 text-center cursor-pointer transition-colors"
        >
          <Upload size={24} className="text-[#555] mx-auto mb-2" />
          <p className="text-[#888] text-sm font-inter">Drag & drop or click to upload</p>
          <p className="text-[#555] text-xs mt-1">JPG, PNG, WebP, MP4 — max 50MB</p>
          <input ref={fileRef} type="file" accept="image/*,video/mp4" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {uploading && <p className="text-[#c9a84c] text-xs mt-2 font-inter">Uploading…</p>}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative mt-2 rounded-xl overflow-hidden border border-[#2a2a2a] group" style={{ height: 160 }}>
          {isVideo ? (
            <video src={value} autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover" />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
