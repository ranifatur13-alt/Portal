import React from 'react';
import { Clock, Volume2, Bookmark, Heart, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { MediaArticle } from '../types';

interface HeroHeadlineProps {
  headlineArticle: MediaArticle;
  secondaryArticles: MediaArticle[];
  onReadArticle: (article: MediaArticle) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onListenAudio: (article: MediaArticle) => void;
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({
  headlineArticle,
  secondaryArticles,
  onReadArticle,
  onToggleBookmark,
  isBookmarked,
  onListenAudio,
}) => {
  if (!headlineArticle) return null;

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Lead Story (Left / 7 cols on lg) */}
        <div className="lg:col-span-8 group">
          <div className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm transition-all hover:shadow-md">
            {/* Image Banner */}
            <div
              className="relative aspect-video sm:aspect-[16/9] w-full overflow-hidden cursor-pointer"
              onClick={() => onReadArticle(headlineArticle)}
            >
              <img
                src={headlineArticle.imageUrl}
                alt={headlineArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Badges on Top */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  BERITA UTAMA
                </span>
                <span className="bg-black/60 backdrop-blur-sm text-neutral-200 text-xs font-medium px-2.5 py-1 rounded-full">
                  {headlineArticle.category}
                </span>
              </div>

              {/* Bottom overlay info on image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-3 text-xs text-neutral-300 mb-2">
                  <span>{headlineArticle.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {headlineArticle.readTimeMinutes} menit baca
                  </span>
                </div>
                <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-sm group-hover:text-rose-200 transition-colors">
                  {headlineArticle.title}
                </h1>
              </div>
            </div>

            {/* Sub-content & controls */}
            <div className="p-5 sm:p-6 bg-white dark:bg-[#16181d]">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                {headlineArticle.subtitle || headlineArticle.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={headlineArticle.author.avatar}
                    alt={headlineArticle.author.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {headlineArticle.author.name}
                    </h2>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {headlineArticle.author.role}
                    </p>
                  </div>
                </div>

                {/* Interactive Tool Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    id={`btn-listen-headline-${headlineArticle.id}`}
                    onClick={() => onListenAudio(headlineArticle)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold transition-colors"
                    title="Dengarkan narasi berita"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                    <span className="hidden sm:inline">Dengarkan</span>
                  </button>

                  <button
                    id={`btn-bookmark-headline-${headlineArticle.id}`}
                    onClick={() => onToggleBookmark(headlineArticle.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isBookmarked(headlineArticle.id)
                        ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/30 text-rose-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    title={isBookmarked(headlineArticle.id) ? 'Hapus Simpanan' : 'Simpan Berita'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked(headlineArticle.id) ? 'fill-rose-600' : ''}`} />
                  </button>

                  <button
                    id={`btn-read-headline-${headlineArticle.id}`}
                    onClick={() => onReadArticle(headlineArticle)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold shadow-sm transition-colors"
                  >
                    <span>Baca Lengkap</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stories / Top Editorial Picks (Right / 4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
            <h2 className="font-headline text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Kabar Terhangat
            </h2>
            <span className="text-xs text-rose-600 font-semibold tracking-wider uppercase">
              Pilihan Redaksi
            </span>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
            {secondaryArticles.slice(0, 3).map((art, idx) => (
              <article
                key={art.id}
                className="py-3.5 first:pt-0 last:pb-0 group/card cursor-pointer"
                onClick={() => onReadArticle(art)}
              >
                <div className="flex gap-3.5">
                  <div className="w-24 sm:w-28 aspect-4/3 shrink-0 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                      <span className="text-rose-600 font-semibold">{art.category}</span>
                      <span>•</span>
                      <span>{art.publishedAt}</span>
                    </div>

                    <h3 className="font-headline text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2 group-hover/card:text-rose-600 transition-colors">
                      {art.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {art.readTimeMinutes} mnt
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500" /> {art.likesCount}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Podcast / Audio Banner Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-sm flex items-center justify-between gap-4">
            <div>
              <span className="inline-block text-[10px] font-bold tracking-wider text-rose-400 uppercase mb-1">
                Kanal Audio Digital
              </span>
              <p className="text-xs font-semibold text-neutral-100">
                Putar rangkuman berita utama langsung dengan suara narator AI.
              </p>
            </div>
            <button
              onClick={() => onListenAudio(headlineArticle)}
              className="p-3 bg-rose-600 hover:bg-rose-700 rounded-full text-white shrink-0 shadow transition-transform hover:scale-105"
              title="Putar audio berita hari ini"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
