import React, { useState } from 'react';
import { X, PenSquare, Upload, Check, AlertCircle, Sparkles } from 'lucide-react';
import { MediaArticle, NewsCategory } from '../types';

interface CitizenJournalismModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitArticle: (newArticle: MediaArticle) => void;
}

const CATEGORY_OPTIONS: NewsCategory[] = [
  'Nasional',
  'Ekonomi',
  'Teknologi',
  'Gaya Hidup',
  'Olahraga',
  'Opini',
  'Lingkungan'
];

export const CitizenJournalismModal: React.FC<CitizenJournalismModalProps> = ({
  isOpen,
  onClose,
  onSubmitArticle
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [category, setCategory] = useState<NewsCategory>('Nasional');
  const [summary, setSummary] = useState('');
  const [contentRaw, setContentRaw] = useState('');
  const [keyPointsRaw, setKeyPointsRaw] = useState('');
  const [tagsRaw, setTagsRaw] = useState('');
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80');

  const SAMPLE_IMAGES = [
    { label: 'Jurnalisme & Media', url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Komunitas & Warga', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Kota & Transportasi', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Lingkungan Alam', url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80' }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim() || !summary.trim() || !contentRaw.trim()) {
      return;
    }

    // Split content into paragraphs
    const contentParagraphs = contentRaw
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    // Split key points
    const keyPoints = keyPointsRaw
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    // Split tags
    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const newArticle: MediaArticle = {
      id: `citizen-${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subtitle: subtitle.trim() || undefined,
      summary: summary.trim(),
      content: contentParagraphs.length > 0 ? contentParagraphs : [contentRaw.trim()],
      category,
      author: {
        name: authorName.trim(),
        role: authorRole.trim() || 'Jurnalis Warga / Kontributor Publik',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80'
      },
      publishedAt: 'Baru saja',
      readTimeMinutes: Math.max(2, Math.ceil(contentRaw.length / 500)),
      imageUrl: selectedImage,
      imageCaption: 'Dokumentasi liputan warga independen.',
      isHeadline: false,
      isBreaking: false,
      isEditorsPick: false,
      viewsCount: 1,
      likesCount: 0,
      audioLength: '3:00',
      keyPoints: keyPoints.length > 0 ? keyPoints : [
        'Laporan independen dari perspektif warga masyarakat.',
        'Mendorong partisipasi publik dalam pemantauan fasilitas dan kebijakan.',
        'Diverifikasi oleh tim kurasi redaksi jurnalisme publik.'
      ],
      tags: tags.length > 0 ? tags : ['LiputanWarga', category, 'JurnalismePublik'],
      isUserSubmitted: true
    };

    onSubmitArticle(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#16191f] text-neutral-900 dark:text-neutral-100 rounded-2xl max-w-2xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-600 text-white">
              <PenSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold">Kirim Berita Warga</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Wadah liputan independen, suara komunitas, dan jurnalisme publik.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Info banner */}
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p>
              Tulisan Anda akan langsung ditayangkan di beranda dengan lencana khusus <strong>"Liputan Warga"</strong> dan dapat dinikmati seluruh pembaca setia Portal Media.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
              Judul Berita *
            </label>
            <input
              type="text"
              placeholder="Contoh: Warga Kompak Bangun Bank Sampah Mandiri dan Hasilkan Energi Kompos"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
              Sub-judul / Lead (Opsional)
            </label>
            <input
              type="text"
              placeholder="Satu kalimat pengantar yang mempertegas inti berita..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewsCategory)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:border-rose-600"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
                Nama Penulis / Pelapor *
              </label>
              <input
                type="text"
                placeholder="Nama Anda"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
                Profesi / Afiliasi
              </label>
              <input
                type="text"
                placeholder="cth: Penggiat Lingkungan"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
              Ringkasan Singkat (Lead Berita) *
            </label>
            <textarea
              rows={2}
              placeholder="Rangkum inti berita dalam 2-3 kalimat untuk pratinjau kartu berita..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
              Isi Berita Lengkap * (Pisahkan antar-paragraf dengan baris kosong)
            </label>
            <textarea
              rows={5}
              placeholder="Tuliskan laporan lengkap, kronologi, kutipan narasumber, dan data pendukung..."
              value={contentRaw}
              onChange={(e) => setContentRaw(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600 font-body-serif"
            />
          </div>

          {/* Key Takeaways & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
                Poin Kunci Redaksi (1 baris per poin)
              </label>
              <textarea
                rows={3}
                placeholder="Poin 1&#10;Poin 2&#10;Poin 3"
                value={keyPointsRaw}
                onChange={(e) => setKeyPointsRaw(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-neutral-600 dark:text-neutral-400">
                Tagar Berita (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                placeholder="Warga, Swadaya, Kompos, PeduliBumi"
                value={tagsRaw}
                onChange={(e) => setTagsRaw(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
              />
            </div>
          </div>

          {/* Header Image Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-600 dark:text-neutral-400">
              Pilih Foto Ilustrasi Utama
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_IMAGES.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === img.url ? 'border-rose-600 ring-2 ring-rose-600/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] bg-black/70 text-white px-1 py-0.5 rounded truncate text-center">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Terbitkan Liputan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
