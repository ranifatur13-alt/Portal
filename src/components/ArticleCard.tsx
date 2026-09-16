import React from 'react';
import { Clock, Bookmark, Heart, Volume2, UserCheck, Eye } from 'lucide-react';
import { MediaArticle } from '../types';

interface ArticleCardProps {
  article: MediaArticle;
  onReadArticle: (article: MediaArticle) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
  onListenAudio?: (article: MediaArticle) => void;
  layout?: 'grid' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onReadArticle,
  onToggleBookmark,
  isBookmarked,
  onListenAudio,
  layout = 'grid'
}) => {
  if (layout === 'compact') {
    return (
      <article className="flex gap-4 py-3 group cursor-pointer border-b border-neutral-100 dark:border-neutral-800 last:border-0" onClick={() => onReadArticle(article)}>
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
            <span className="font-semibold text-rose-600">{article.category}</span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>
          <h4 className="font-headline text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
            {article.title}
          </h4>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-neutral-400">
            <span>{article.readTimeMinutes} menit baca</span>
            <span>•</span>
            <span>{article.likesCount} suka</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#16191e] border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all group">
      {/* Article Image Container */}
      <div
        className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800"
        onClick={() => onReadArticle(article)}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-neutral-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            {article.category}
          </span>
          {article.isUserSubmitted && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <UserCheck className="w-3 h-3" /> Warga
            </span>
          )}
        </div>

        {/* Quick Audio badge */}
        {article.audioLength && (
          <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-neutral-200 text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-rose-400" />
            <span>{article.audioLength}</span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Bar */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 mb-2">
            <span>{article.publishedAt}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTimeMinutes} menit baca
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onReadArticle(article)}
            className="font-headline text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug mb-2.5 line-clamp-2 cursor-pointer group-hover:text-rose-600 transition-colors"
          >
            {article.title}
          </h3>

          {/* Summary / Excerpt */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {article.summary}
          </p>
        </div>

        {/* Footer info & action buttons */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
            />
            <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium truncate max-w-[120px]">
              {article.author.name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {onListenAudio && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onListenAudio(article);
                }}
                className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors rounded"
                title="Dengarkan audio berita"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              className={`p-1.5 rounded transition-colors ${
                isBookmarked
                  ? 'text-rose-600'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
              }`}
              title={isBookmarked ? 'Hapus dari Tersimpan' : 'Simpan Berita'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
