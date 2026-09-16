import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Clock,
  Bookmark,
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Check,
  Send,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { MediaArticle, ArticleComment } from '../types';

interface ArticleReaderModalProps {
  article: MediaArticle | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onLikeArticle: (articleId: string) => void;
  hasLiked: boolean;
  comments: ArticleComment[];
  onAddComment: (articleId: string, authorName: string, text: string) => void;
  onLikeComment: (commentId: string) => void;
  relatedArticles: MediaArticle[];
  onSelectArticle: (article: MediaArticle) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onLikeArticle,
  hasLiked,
  comments,
  onAddComment,
  onLikeComment,
  relatedArticles,
  onSelectArticle
}) => {
  if (!article) return null;

  // Reader Preferences
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Audio Speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Comment Form state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Share notification
  const [copiedLink, setCopiedLink] = useState(false);

  const articleContainerRef = useRef<HTMLDivElement>(null);

  // Scroll listener for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!articleContainerRef.current) return;
      const el = articleContainerRef.current;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight <= 0) return;
      const current = el.scrollTop;
      setScrollProgress(Math.min(100, Math.max(0, (current / totalHeight) * 100)));
    };

    const container = articleContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [article]);

  // Clean up speech synthesis when unmounted or article changes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Speech synthesis handlers
  const startSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Maaf, peramban Anda belum mendukung fitur sintesis suara.');
      return;
    }

    if (isAudioPaused) {
      window.speechSynthesis.resume();
      setIsAudioPaused(false);
      setIsPlayingAudio(true);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare clean text for narration
    const fullText = `${article.title}. Diterbitkan oleh ${article.author.name}. ${article.summary}. ${article.content.join(' ')}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'id-ID';
    utterance.rate = speechRate;

    // Try finding Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find((v) => v.lang.includes('id') || v.name.toLowerCase().includes('indonesia'));
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsAudioPaused(false);
  };

  const pauseSpeech = () => {
    if ('speechSynthesis' in window && isPlayingAudio) {
      window.speechSynthesis.pause();
      setIsAudioPaused(true);
      setIsPlayingAudio(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
    }
  };

  const handleRateChange = (newRate: number) => {
    setSpeechRate(newRate);
    if (isPlayingAudio) {
      stopSpeech();
      setTimeout(startSpeech, 100);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Baca berita: "${article.title}" di Portal Media - ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" via @PortalMedia`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    onAddComment(article.id, commentName.trim(), commentText.trim());
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  // Styling maps based on readerTheme
  const themeStyles = {
    light: {
      modalBg: 'bg-white text-neutral-900',
      headerBg: 'bg-white/95 border-neutral-200',
      boxBg: 'bg-neutral-50 border-neutral-200',
      textMuted: 'text-neutral-500',
      border: 'border-neutral-200'
    },
    sepia: {
      modalBg: 'bg-[#fbf0d9] text-[#433422]',
      headerBg: 'bg-[#f5e7cb]/95 border-[#e5d0aa]',
      boxBg: 'bg-[#f3e3c2] border-[#e2ce9e]',
      textMuted: 'text-[#7d654c]',
      border: 'border-[#e2ce9e]'
    },
    dark: {
      modalBg: 'bg-[#15171c] text-neutral-100',
      headerBg: 'bg-[#1a1d24]/95 border-neutral-800',
      boxBg: 'bg-[#1e222b] border-neutral-800',
      textMuted: 'text-neutral-400',
      border: 'border-neutral-800'
    }
  }[readerTheme];

  const fontSizeClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 overflow-hidden">
      {/* Main Container */}
      <div
        className={`relative w-full h-full sm:max-w-4xl sm:h-[94vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-colors duration-200 ${themeStyles.modalBg}`}
      >
        {/* Scroll Progress Bar at Top */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1 z-20">
          <div
            className="bg-rose-600 h-1 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Top Navbar */}
        <div
          className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between gap-3 sticky top-0 z-10 backdrop-blur-md ${themeStyles.headerBg}`}
        >
          {/* Left: Back / Close button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 ml-1">
              {article.category}
            </span>
          </div>

          {/* Center: Quick Controls (Text size, Theme, Audio) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font Size toggles */}
            <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-rose-600 text-white' : ''}`}
                title="Ukuran Font Standar"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-rose-600 text-white' : ''}`}
                title="Ukuran Font Besar"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded hidden sm:inline-block ${fontSize === 'xlarge' ? 'bg-rose-600 text-white' : ''}`}
                title="Ukuran Font Ekstra Besar"
              >
                A++
              </button>
            </div>

            {/* Reading theme */}
            <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setReaderTheme('light')}
                className={`w-5 h-5 rounded-full bg-white border border-neutral-300 mx-1 ${readerTheme === 'light' ? 'ring-2 ring-rose-600' : ''}`}
                title="Tema Terang"
              />
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`w-5 h-5 rounded-full bg-[#fbf0d9] border border-[#d9c79f] mx-1 ${readerTheme === 'sepia' ? 'ring-2 ring-rose-600' : ''}`}
                title="Tema Sepia / Kertas"
              />
              <button
                onClick={() => setReaderTheme('dark')}
                className={`w-5 h-5 rounded-full bg-[#121417] border border-neutral-700 mx-1 ${readerTheme === 'dark' ? 'ring-2 ring-rose-600' : ''}`}
                title="Tema Gelap / Malam"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/30 text-rose-600'
                  : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500'
              }`}
              title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Berita'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-rose-600' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Tutup (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Content */}
        <div
          ref={articleContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-10 md:px-16 py-8"
        >
          <div className="max-w-3xl mx-auto">
            {/* Metadata Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 text-xs mb-3 opacity-75">
                <span className="font-semibold text-rose-600">{article.category}</span>
                <span>•</span>
                <span>{article.publishedAt}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} menit waktu baca
                </span>
              </div>

              <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="text-base sm:text-lg font-medium opacity-85 leading-relaxed mb-6">
                  {article.subtitle}
                </p>
              )}

              {/* Author Strip */}
              <div className="flex items-center justify-between py-4 border-y border-neutral-200 dark:border-neutral-800 gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
                  />
                  <div>
                    <h2 className="text-sm font-bold">{article.author.name}</h2>
                    <p className="text-xs opacity-75">{article.author.role}</p>
                  </div>
                </div>

                {/* Social Share Strip */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
                    title="Salin Tautan"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    {copiedLink && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                        Tautan Disalin!
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleShareWhatsApp}
                    className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-emerald-600 hover:text-white transition-colors text-xs font-semibold"
                    title="Bagikan via WhatsApp"
                  >
                    WA
                  </button>
                  <button
                    onClick={handleShareTwitter}
                    className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-sky-600 hover:text-white transition-colors text-xs font-semibold"
                    title="Bagikan via X (Twitter)"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>

            {/* Audio Player Bar (Dengarkan Berita Ini) */}
            <div className={`p-4 rounded-xl mb-8 flex flex-wrap items-center justify-between gap-4 border ${themeStyles.boxBg}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-full ${isPlayingAudio ? 'bg-rose-600 text-white animate-pulse' : 'bg-rose-100 dark:bg-rose-950/50 text-rose-600'}`}>
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold">
                    {isPlayingAudio ? 'Sedang Membacakan Narasi Berita' : 'Dengarkan Berita Ini'}
                  </h3>
                  <p className="text-[11px] opacity-75">
                    {isPlayingAudio ? 'Tekan jeda atau atur kecepatan baca sesuai selera.' : 'Teknologi Text-to-Speech untuk kenyamanan saat mobilitas.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isPlayingAudio ? (
                  <button
                    onClick={startSpeech}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isAudioPaused ? 'Lanjutkan' : 'Putar Audio'}</span>
                  </button>
                ) : (
                  <button
                    onClick={pauseSpeech}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 text-xs font-semibold transition-colors"
                  >
                    <Pause className="w-3.5 h-3.5 fill-white" />
                    <span>Jeda</span>
                  </button>
                )}

                {(isPlayingAudio || isAudioPaused) && (
                  <button
                    onClick={stopSpeech}
                    className="p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    title="Hentikan Audio"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Speed buttons */}
                <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-md p-0.5 text-[11px] font-semibold">
                  {[1, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleRateChange(rate)}
                      className={`px-1.5 py-0.5 rounded ${speechRate === rate ? 'bg-rose-600 text-white' : 'opacity-70 hover:opacity-100'}`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Image with Caption */}
            <div className="mb-8 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[480px] object-cover"
              />
              {article.imageCaption && (
                <p className="p-3 text-xs italic opacity-75 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
                  Foto: {article.imageCaption}
                </p>
              )}
            </div>

            {/* Key Takeaways Box (3 Poin Kunci) */}
            {article.keyPoints && article.keyPoints.length > 0 && (
              <div className="p-5 rounded-xl bg-gradient-to-br from-rose-50 to-orange-50/50 dark:from-rose-950/20 dark:to-neutral-900 border border-rose-200/70 dark:border-rose-900/40 mb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>3 Poin Kunci Berita (Ringkasan Redaksi)</span>
                </div>
                <ul className="space-y-2.5">
                  {article.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                      <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Body Content */}
            <div className={`font-body-serif ${fontSizeClass} space-y-5 mb-10`}>
              {article.content.map((para, idx) => (
                <p key={idx} className="first-letter:text-4xl first-letter:font-headline first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags / Topik Terkait */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-semibold opacity-75 uppercase tracking-wider block mb-2">
                  Topik Terkait:
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-neutral-300 dark:border-neutral-700 opacity-85 hover:opacity-100 transition-opacity"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback & Reaction Strip */}
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 mb-12">
              <div>
                <h4 className="text-sm font-bold mb-0.5">Apakah laporan ini memberikan wawasan baru?</h4>
                <p className="text-xs opacity-75">Dukung jurnalisme berkualitas dengan apresiasi pembaca.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onLikeArticle(article.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    hasLiked
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'border border-neutral-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'text-rose-600'}`} />
                  <span>{hasLiked ? 'Disukai' : 'Suka Berita Ini'} ({article.likesCount})</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <section className="mb-14">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-rose-600" />
                  <h3 className="font-headline text-lg sm:text-xl font-bold">
                    Opini & Tanggapan Pembaca ({comments.length})
                  </h3>
                </div>
                <span className="text-xs opacity-75">Moderasi Sesuai Kode Etik Media</span>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 opacity-75">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda..."
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-75">Tanggapan Anda</label>
                  <textarea
                    rows={3}
                    placeholder="Sampaikan opini atau sudut pandang Anda dengan santun dan berimbang..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none focus:border-rose-600"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  {commentSuccess && (
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Tanggapan berhasil dipublikasikan!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold hover:bg-rose-600 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Tanggapan</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-xs text-center py-6 opacity-60">
                    Belum ada tanggapan untuk artikel ini. Jadilah yang pertama berkomentar!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2 bg-neutral-50/50 dark:bg-neutral-900/20"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">{c.authorName}</span>
                        <span className="opacity-60">{c.timestamp}</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-90">{c.commentText}</p>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => onLikeComment(c.id)}
                          className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${
                            c.userLiked ? 'text-rose-600' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${c.userLiked ? 'fill-rose-600' : ''}`} />
                          <span>Mendukung ({c.likes})</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Related Articles */}
            {relatedArticles && relatedArticles.length > 0 && (
              <section className="pt-8 border-t border-neutral-200 dark:border-neutral-800 mb-6">
                <h3 className="font-headline text-lg font-bold mb-4">Warta Terkait Lainnya</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArticles.slice(0, 2).map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectArticle(rel)}
                      className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-rose-600/50 cursor-pointer group flex gap-3 transition-colors"
                    >
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-rose-600 block mb-1">
                          {rel.category}
                        </span>
                        <h4 className="font-headline text-xs font-bold line-clamp-2 group-hover:text-rose-600 transition-colors">
                          {rel.title}
                        </h4>
                        <span className="text-[10px] opacity-60 mt-1 block">
                          {rel.publishedAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
