import React, { useState } from 'react';
import {
  TrendingUp,
  Flame,
  Mail,
  Check,
  Headphones,
  FileText,
  DollarSign,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { MediaArticle } from '../types';

interface TrendingSidebarProps {
  popularArticles: MediaArticle[];
  opinionArticles: MediaArticle[];
  onReadArticle: (article: MediaArticle) => void;
  onListenAudio: (article: MediaArticle) => void;
}

export const TrendingSidebar: React.FC<TrendingSidebarProps> = ({
  popularArticles,
  opinionArticles,
  onReadArticle,
  onListenAudio
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <aside className="space-y-8">
      {/* Top 5 Populer / Trending */}
      <div className="bg-white dark:bg-[#16191e] p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-4">
          <Flame className="w-5 h-5 text-rose-600" />
          <h3 className="font-headline text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Terpopuler Hari Ini
          </h3>
        </div>

        <div className="space-y-4">
          {popularArticles.slice(0, 5).map((art, idx) => (
            <div
              key={art.id}
              onClick={() => onReadArticle(art)}
              className="flex items-start gap-3.5 group cursor-pointer"
            >
              {/* Rank Number */}
              <span
                className={`font-headline text-2xl font-black italic shrink-0 w-7 text-center ${
                  idx === 0
                    ? 'text-rose-600'
                    : idx === 1
                    ? 'text-amber-500'
                    : idx === 2
                    ? 'text-orange-500'
                    : 'text-neutral-300 dark:text-neutral-700'
                }`}
              >
                0{idx + 1}
              </span>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block mb-0.5">
                  {art.category}
                </span>
                <h4 className="font-headline text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
                  {art.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1">
                  <span>{art.publishedAt}</span>
                  <span>•</span>
                  <span>{art.viewsCount.toLocaleString('id-ID')} dibaca</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Podcast / Audio Feature Card */}
      {popularArticles.length > 0 && (
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-5 rounded-2xl shadow-sm border border-neutral-800 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-rose-600/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 uppercase tracking-wider">
              <Headphones className="w-3.5 h-3.5" />
              Podcast Media
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/30 font-semibold">
              Edisi Sore
            </span>
          </div>

          <h4 className="font-headline text-sm font-bold leading-snug mb-2 text-white">
            {popularArticles[0].title}
          </h4>

          <p className="text-xs text-neutral-300 line-clamp-2 mb-4">
            Rangkuman audio analisis redaksi berdurasi 4 menit untuk menemani perjalanan pulang kerja Anda.
          </p>

          <button
            onClick={() => onListenAudio(popularArticles[0])}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Putar Rekaman Redaksi</span>
          </button>
        </div>
      )}

      {/* Kolom Opini & Esai */}
      {opinionArticles.length > 0 && (
        <div className="bg-white dark:bg-[#16191e] p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-600" />
              <h3 className="font-headline text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Kolom Opini
              </h3>
            </div>
            <span className="text-[11px] text-rose-600 font-semibold">Gagasan</span>
          </div>

          <div className="space-y-4">
            {opinionArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => onReadArticle(art)}
                className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/80 hover:border-rose-300 dark:hover:border-neutral-700 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <img
                    src={art.author.avatar}
                    alt={art.author.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      {art.author.name}
                    </h5>
                    <p className="text-[10px] text-neutral-400">{art.author.role}</p>
                  </div>
                </div>

                <h4 className="font-headline text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 group-hover:text-rose-600 transition-colors leading-snug">
                  "{art.title}"
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Subscription Box */}
      <div className="bg-rose-50/70 dark:bg-[#1a1417] p-5 rounded-2xl border border-rose-200/70 dark:border-rose-900/40 text-neutral-900 dark:text-neutral-100">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4" />
          <span>Buletin Redaksi Pagi</span>
        </div>

        <h4 className="font-headline text-base font-bold mb-1.5 leading-snug">
          Dapatkan rangkuman warta terpenting setiap jam 06:00 WIB
        </h4>

        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
          Kurasi berita pilihan bebas bias langsung di kotak masuk surel Anda.
        </p>

        <form onSubmit={handleSubscribe} className="space-y-2">
          <input
            type="email"
            placeholder="Masukkan alamat surel..."
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:border-rose-600"
          />
          <button
            type="submit"
            className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            {newsletterSubscribed ? 'Terima kasih, Anda Terdaftar!' : 'Langganan Gratis'}
          </button>
        </form>

        {newsletterSubscribed && (
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <Check className="w-3.5 h-3.5" /> Konfirmasi telah dikirim ke email Anda.
          </p>
        )}
      </div>

      {/* Indeks Pasar Finansial */}
      <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#16191e] text-xs">
        <div className="flex items-center justify-between font-bold border-b border-neutral-100 dark:border-neutral-800 pb-2 mb-3">
          <span>Indeks Pasar & Kurs</span>
          <span className="text-[10px] text-neutral-400 font-mono">LIVE 15:30</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">IHSG</span>
            <span className="font-mono font-bold text-emerald-600">7.425,80 (+0,42%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">USD / IDR</span>
            <span className="font-mono font-bold text-neutral-700 dark:text-neutral-300">Rp 15.620 (-0,18%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-600 dark:text-neutral-400 font-medium">Emas (Antam/gr)</span>
            <span className="font-mono font-bold text-amber-600">Rp 1.480.000 (+0,5%)</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
