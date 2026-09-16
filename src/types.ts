export type NewsCategory =
  | 'Semua'
  | 'Nasional'
  | 'Ekonomi'
  | 'Teknologi'
  | 'Gaya Hidup'
  | 'Olahraga'
  | 'Opini'
  | 'Lingkungan';

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface MediaArticle {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  summary: string;
  content: string[];
  category: NewsCategory;
  author: ArticleAuthor;
  publishedAt: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageCaption?: string;
  isHeadline?: boolean;
  isBreaking?: boolean;
  isEditorsPick?: boolean;
  viewsCount: number;
  likesCount: number;
  audioLength?: string;
  keyPoints: string[];
  tags: string[];
  isUserSubmitted?: boolean;
}

export interface ArticleComment {
  id: string;
  articleId: string;
  authorName: string;
  commentText: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
}
