import React, { useState, useEffect, useMemo } from 'react';
import {
  Filter,
  Grid,
  List,
  Sparkles,
  Flame,
  Bookmark,
  Search,
  PenSquare,
  Volume2,
  ChevronRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { MediaArticle, NewsCategory, ArticleComment } from './types';
import { INITIAL_ARTICLES, INITIAL_COMMENTS, BREAKING_NEWS_ITEMS } from './data/newsData';
import { Header } from './components/Header';
import { HeroHeadline } from './components/HeroHeadline';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { CitizenJournalismModal } from './components/CitizenJournalismModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { TrendingSidebar } from './components/TrendingSidebar';
import { Footer } from './components/Footer';

export default function App() {
  // Articles state with localStorage fallback
  const [articles, setArticles] = useState<MediaArticle[]>(() => {
    try {
      const saved = localStorage.getItem('portal_media_articles');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ARTICLES;
  });

  // Comments state with localStorage
  const [comments, setComments] = useState<ArticleComment[]>(() => {
    try {
      const saved = localStorage.getItem('portal_media_comments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COMMENTS;
  });

  // Saved bookmarks
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('portal_media_saved_ids');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return ['art-2'];
  });

  // Liked article IDs
  const [likedArticleIds, setLikedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('portal_media_liked_ids');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // View & Filter States
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('Semua');
  const [sortBy, setSortBy] = useState<'terbaru' | 'terpopuler' | 'pilihan'>('terbaru');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<MediaArticle | null>(null);
  const [isCitizenModalOpen, setIsCitizenModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [cardLayout, setCardLayout] = useState<'grid' | 'compact'>('grid');

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('portal_media_theme') === 'dark';
    } catch {
      return false;
    }
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('portal_media_articles', JSON.stringify(articles));
    } catch (e) {
      console.error(e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_media_comments', JSON.stringify(comments));
    } catch (e) {
      console.error(e);
    }
  }, [comments]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_media_saved_ids', JSON.stringify(savedArticleIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedArticleIds]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_media_liked_ids', JSON.stringify(likedArticleIds));
    } catch (e) {
      console.error(e);
    }
  }, [likedArticleIds]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_media_theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Bookmark actions
  const handleToggleBookmark = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  // Like article actions
  const handleLikeArticle = (articleId: string) => {
    const hasLiked = likedArticleIds.includes(articleId);
    if (hasLiked) {
      setLikedArticleIds((prev) => prev.filter((id) => id !== articleId));
      setArticles((prev) =>
        prev.map((a) => (a.id === articleId ? { ...a, likesCount: Math.max(0, a.likesCount - 1) } : a))
      );
      if (selectedArticle && selectedArticle.id === articleId) {
        setSelectedArticle((curr) => curr ? { ...curr, likesCount: Math.max(0, curr.likesCount - 1) } : null);
      }
    } else {
      setLikedArticleIds((prev) => [...prev, articleId]);
      setArticles((prev) =>
        prev.map((a) => (a.id === articleId ? { ...a, likesCount: a.likesCount + 1 } : a))
      );
      if (selectedArticle && selectedArticle.id === articleId) {
        setSelectedArticle((curr) => curr ? { ...curr, likesCount: curr.likesCount + 1 } : null);
      }
    }
  };

  // Comments actions
  const handleAddComment = (articleId: string, authorName: string, text: string) => {
    const newComment: ArticleComment = {
      id: `comm-${Date.now()}`,
      articleId,
      authorName,
      commentText: text,
      timestamp: 'Baru saja',
      likes: 0,
      userLiked: false
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const nextUserLiked = !c.userLiked;
          return {
            ...c,
            userLiked: nextUserLiked,
            likes: nextUserLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
          };
        }
        return c;
      })
    );
  };

  // Citizen submission
  const handleSubmitCitizenArticle = (newArticle: MediaArticle) => {
    setArticles((prev) => [newArticle, ...prev]);
    // Also automatically open it to view
    setSelectedArticle(newArticle);
  };

  // Click on breaking news ticker
  const handleSelectBreakingNews = (index: number) => {
    // If index matches article or select headline
    const target = articles[index % articles.length];
    if (target) {
      setSelectedArticle(target);
    }
  };

  // Filtered & Sorted Articles
  const filteredArticles = useMemo(() => {
    let list = [...articles];

    // Filter by category
    if (activeCategory !== 'Semua') {
      list = list.filter((a) => a.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.tags?.some((t) => t.toLowerCase().includes(q)) ||
          a.content.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (sortBy === 'terpopuler') {
      list.sort((a, b) => b.viewsCount - a.viewsCount);
    } else if (sortBy === 'pilihan') {
      list.sort((a, b) => (b.isEditorsPick ? 1 : 0) - (a.isEditorsPick ? 1 : 0));
    }

    return list;
  }, [articles, activeCategory, searchQuery, sortBy]);

  // Lead Headline Story
  const headlineStory = useMemo(() => {
    return articles.find((a) => a.isHeadline) || articles[0];
  }, [articles]);

  // Secondary stories for hero
  const secondaryStories = useMemo(() => {
    return articles.filter((a) => a.id !== headlineStory?.id).slice(0, 3);
  }, [articles, headlineStory]);

  // Popular & Opinion articles for sidebar
  const popularArticles = useMemo(() => {
    return [...articles].sort((a, b) => b.viewsCount - a.viewsCount);
  }, [articles]);

  const opinionArticles = useMemo(() => {
    return articles.filter((a) => a.category === 'Opini');
  }, [articles]);

  // Saved articles list
  const savedArticlesList = useMemo(() => {
    return articles.filter((a) => savedArticleIds.includes(a.id));
  }, [articles, savedArticleIds]);

  // Comments for selected article
  const currentComments = useMemo(() => {
    if (!selectedArticle) return [];
    return comments.filter((c) => c.articleId === selectedArticle.id);
  }, [comments, selectedArticle]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0f1115] text-neutral-100' : 'bg-[#f8f9fa] text-neutral-900'
    }`}>
      {/* Navigation & Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenCitizenModal={() => setIsCitizenModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onSelectBreakingNews={handleSelectBreakingNews}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        {/* Category Page Title / Search Banner */}
        {searchQuery ? (
          <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-[#16191f] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Search className="w-4 h-4" />
              <span>Hasil Pencarian</span>
            </div>
            <h1 className="font-headline text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Menampilkan {filteredArticles.length} warta untuk "{searchQuery}"
            </h1>
          </div>
        ) : activeCategory !== 'Semua' ? (
          <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-[#16191f] border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4" />
                <span>Kanal Berita</span>
              </div>
              <h1 className="font-headline text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
                {activeCategory}
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Koleksi warta, liputan investigasi, dan analisis seputar topik {activeCategory}.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {filteredArticles.length} Artikel
              </span>
            </div>
          </div>
        ) : (
          /* When on "Semua", render Featured Hero Headline at Top */
          <HeroHeadline
            headlineArticle={headlineStory}
            secondaryArticles={secondaryStories}
            onReadArticle={(art) => setSelectedArticle(art)}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={(id) => savedArticleIds.includes(id)}
            onListenAudio={(art) => setSelectedArticle(art)}
          />
        )}

        {/* Section Header & View Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {activeCategory === 'Semua' ? 'Laporan & Terbitan Terkini' : `Warta ${activeCategory}`}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold">
              {filteredArticles.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Filter Tabs */}
            <div className="flex items-center bg-neutral-100 dark:bg-[#16191f] p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-medium">
              <button
                onClick={() => setSortBy('terbaru')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  sortBy === 'terbaru'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Terbaru
              </button>
              <button
                onClick={() => setSortBy('terpopuler')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  sortBy === 'terpopuler'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Terpopuler
              </button>
              <button
                onClick={() => setSortBy('pilihan')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  sortBy === 'pilihan'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Pilihan Redaksi
              </button>
            </div>

            {/* Layout view toggle */}
            <div className="hidden sm:flex items-center border border-neutral-200 dark:border-neutral-800 rounded-lg p-1 text-neutral-500">
              <button
                onClick={() => setCardLayout('grid')}
                className={`p-1 rounded ${cardLayout === 'grid' ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white' : ''}`}
                title="Tampilan Kisi"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCardLayout('compact')}
                className={`p-1 rounded ${cardLayout === 'compact' ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white' : ''}`}
                title="Tampilan Ringkas"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout (Articles Feed on Left, Trending & Columns on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed Column (8 cols on lg) */}
          <div className="lg:col-span-8">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#16191f] rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <Search className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
                <h3 className="font-headline text-lg font-bold mb-1">
                  Tidak Ada Berita yang Cocok
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4">
                  Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('Semua');
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  Tampilkan Semua Berita
                </button>
              </div>
            ) : cardLayout === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onReadArticle={(art) => setSelectedArticle(art)}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={savedArticleIds.includes(article.id)}
                    onListenAudio={(art) => setSelectedArticle(art)}
                    layout="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#16191f] rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-5 divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onReadArticle={(art) => setSelectedArticle(art)}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={savedArticleIds.includes(article.id)}
                    onListenAudio={(art) => setSelectedArticle(art)}
                    layout="compact"
                  />
                ))}
              </div>
            )}

            {/* Public Community Contribution Callout */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white shadow-md flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-md">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-rose-200 mb-1">
                  Jurnalisme Publik & Komunitas
                </span>
                <h3 className="font-headline text-xl font-bold leading-tight mb-2">
                  Punya informasi peristiwa penting di sekitar Anda?
                </h3>
                <p className="text-xs text-rose-100 leading-relaxed">
                  Tuliskan fakta lapangan, kronologi, dan foto dokumentasi Anda untuk disiarkan di Portal Media melalui verifikasi redaksi.
                </p>
              </div>
              <button
                onClick={() => setIsCitizenModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white text-rose-700 hover:bg-neutral-100 text-xs font-bold transition-transform hover:scale-105 shadow-md flex items-center gap-2"
              >
                <PenSquare className="w-4 h-4" />
                <span>Kirim Liputan Sekarang</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4">
            <TrendingSidebar
              popularArticles={popularArticles}
              opinionArticles={opinionArticles}
              onReadArticle={(art) => setSelectedArticle(art)}
              onListenAudio={(art) => setSelectedArticle(art)}
            />
          </div>
        </div>
      </main>

      {/* Reader Modal (Full screen immersive reader) */}
      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onLikeArticle={handleLikeArticle}
        hasLiked={selectedArticle ? likedArticleIds.includes(selectedArticle.id) : false}
        comments={currentComments}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
        relatedArticles={articles.filter((a) => a.id !== selectedArticle?.id && a.category === selectedArticle?.category)}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      {/* Citizen Journalism Modal */}
      <CitizenJournalismModal
        isOpen={isCitizenModalOpen}
        onClose={() => setIsCitizenModalOpen(false)}
        onSubmitArticle={handleSubmitCitizenArticle}
      />

      {/* Saved Articles Modal */}
      <SavedArticlesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedArticles={savedArticlesList}
        onReadArticle={(art) => setSelectedArticle(art)}
        onRemoveSaved={handleToggleBookmark}
        onClearAll={() => setSavedArticleIds([])}
      />

      {/* Portal Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        onOpenCitizenModal={() => setIsCitizenModalOpen(true)}
      />
    </div>
  );
}
