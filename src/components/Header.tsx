import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  Sun,
  Moon,
  CloudSun,
  PenSquare,
  TrendingUp,
  Volume2,
  Share2,
  Menu,
  X,
  Radio,
  Flame,
  ChevronRight
} from 'lucide-react';
import { NewsCategory } from '../types';
import { BREAKING_NEWS_ITEMS } from '../data/newsData';

interface HeaderProps {
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenCitizenModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onSelectBreakingNews: (index: number) => void;
}

const CATEGORIES: NewsCategory[] = [
  'Semua',
  'Nasional',
  'Ekonomi',
  'Teknologi',
  'Gaya Hidup',
  'Olahraga',
  'Opini',
  'Lingkungan'
];

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onOpenCitizenModal,
  searchQuery,
  onSearchChange,
  isDarkMode,
  onToggleDarkMode,
  onSelectBreakingNews
}) => {
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    setCurrentDateStr(now.toLocaleDateString('id-ID', options));

    // Breaking news ticker cycle
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % BREAKING_NEWS_ITEMS.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`border-b transition-colors duration-200 ${
      isDarkMode ? 'bg-[#121417] border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
    }`}>
      {/* Top Utility Bar */}
      <div className={`border-b text-xs py-2 px-4 md:px-8 ${
        isDarkMode ? 'border-neutral-800 bg-[#0c0e11] text-neutral-400' : 'border-neutral-100 bg-neutral-50 text-neutral-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Date & Location Weather */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-medium tracking-wide">{currentDateStr || 'Edisi Digital'}</span>
            <span className="hidden sm:inline-block text-neutral-300 dark:text-neutral-700">|</span>
            <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-500" />
              <span>Jakarta 29°C Cerah Berawan</span>
            </div>
            <span className="hidden md:inline-block text-neutral-300 dark:text-neutral-700">|</span>
            <div className="hidden md:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>IHSG 7.425 (+0.42%)</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              id="header-btn-saved"
              onClick={onOpenSaved}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                isDarkMode
                  ? 'hover:bg-neutral-800 text-neutral-300'
                  : 'hover:bg-neutral-200/70 text-neutral-700'
              }`}
              title="Lihat Berita Tersimpan"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Tersimpan</span>
              {savedCount > 0 && (
                <span className="ml-0.5 bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              id="header-btn-darkmode"
              onClick={onToggleDarkMode}
              className={`p-1.5 rounded transition-colors ${
                isDarkMode ? 'hover:bg-neutral-800 text-amber-400' : 'hover:bg-neutral-200/70 text-neutral-600'
              }`}
              title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            id="header-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
            aria-label="Toggle menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Media Brand / Logo */}
          <div className="text-center md:text-left flex-1 md:flex-initial">
            <a href="#" className="inline-flex flex-col group">
              <span className="font-headline text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase group-hover:text-rose-600 transition-colors">
                PORTAL MEDIA
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
                Jurnalisme Independen & Warta Digital Nusantara
              </span>
            </a>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            {/* Citizen Journalism / Kirim Tulisan */}
            <button
              id="header-btn-citizen-journalism"
              onClick={onOpenCitizenModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-rose-700 dark:hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <PenSquare className="w-4 h-4" />
              <span>Kirim Berita Warga</span>
            </button>

            {/* Quick Search Toggle */}
            <div className="relative">
              <div className={`hidden md:flex items-center border rounded-full px-3 py-1.5 transition-all ${
                isDarkMode ? 'border-neutral-700 bg-neutral-900/60' : 'border-neutral-200 bg-neutral-50'
              }`}>
                <Search className="w-4 h-4 text-neutral-400 mr-2" />
                <input
                  type="text"
                  placeholder="Cari topik, nama, warta..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs outline-none w-36 lg:w-48 placeholder:text-neutral-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                id="header-btn-search-mobile"
                onClick={() => setShowSearchInput(!showSearchInput)}
                className="md:hidden p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                aria-label="Cari"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search input expand */}
        {showSearchInput && (
          <div className="mt-3 md:hidden">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
              <Search className="w-4 h-4 text-neutral-400 mr-2" />
              <input
                type="text"
                placeholder="Cari topik atau nama tokoh..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent text-sm outline-none w-full"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => onSearchChange('')} className="p-1">
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Category Navigation Bar */}
      <nav className={`border-t border-b ${
        isDarkMode ? 'border-neutral-800 bg-[#16191e]' : 'border-neutral-200 bg-neutral-50/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center overflow-x-auto no-scrollbar py-1 gap-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`nav-category-${cat.toLowerCase()}`}
                  onClick={() => onSelectCategory(cat)}
                  className={`whitespace-nowrap px-3.5 py-2 text-xs md:text-sm font-semibold rounded-md transition-all ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 px-4 py-4 space-y-3 bg-white dark:bg-[#121417]">
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs font-semibold rounded ${
                  activeCategory === cat
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCitizenModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold"
            >
              <PenSquare className="w-4 h-4" />
              <span>Kirim Berita / Liputan Warga</span>
            </button>
          </div>
        </div>
      )}

      {/* Breaking News Ticker Ribbon */}
      <div className={`border-b text-xs flex items-center overflow-hidden ${
        isDarkMode ? 'border-neutral-800 bg-[#1e1414]' : 'border-rose-100 bg-rose-50/70'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 w-full flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0 bg-rose-600 text-white font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
            <Radio className="w-3 h-3 animate-pulse text-white" />
            <span>TERKINI</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <button
              onClick={() => onSelectBreakingNews(tickerIndex)}
              className="text-left truncate w-full text-neutral-800 dark:text-neutral-200 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors flex items-center gap-2"
            >
              <span className="truncate">{BREAKING_NEWS_ITEMS[tickerIndex]}</span>
              <ChevronRight className="w-3 h-3 shrink-0 text-neutral-400" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
            <span>{tickerIndex + 1}</span>
            <span>/</span>
            <span>{BREAKING_NEWS_ITEMS.length}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
