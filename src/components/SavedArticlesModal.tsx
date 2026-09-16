import React from 'react';
import { X, Bookmark, Trash2, Clock, ChevronRight } from 'lucide-react';
import { MediaArticle } from '../types';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: MediaArticle[];
  onReadArticle: (article: MediaArticle) => void;
  onRemoveSaved: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onReadArticle,
  onRemoveSaved,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#16191f] text-neutral-900 dark:text-neutral-100 rounded-2xl max-w-xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-600 text-white">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold">Berita Tersimpan</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {savedArticles.length} artikel disimpan untuk dibaca nanti
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

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-3" />
              <h3 className="font-headline text-base font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Belum Ada Berita Tersimpan
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                Klik ikon markah buku (bookmark) pada artikel mana saja untuk menyimpannya ke daftar bacaan pribadi Anda.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="flex items-center gap-3.5 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-rose-300 dark:hover:border-neutral-700 transition-colors group bg-neutral-50/50 dark:bg-neutral-900/30"
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onReadArticle(art);
                    onClose();
                  }}
                >
                  <span className="text-[10px] font-bold text-rose-600 block mb-0.5">
                    {art.category}
                  </span>
                  <h4 className="font-headline text-xs sm:text-sm font-bold line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
                    {art.title}
                  </h4>
                  <span className="text-[10px] text-neutral-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> {art.readTimeMinutes} menit baca
                  </span>
                </div>

                <button
                  onClick={() => onRemoveSaved(art.id)}
                  className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors shrink-0"
                  title="Hapus dari tersimpan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900/40">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
            >
              Hapus Semua Markah
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
