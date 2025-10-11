export enum Page {
  Home = 'home',
  About = 'about',
  Articles = 'articles',
  GlobalTrending = 'trending',
  AskNovusAI = 'ask-novus',
  Contact = 'contact',
  Author = 'Author', // Internal page, not in nav
  Article = 'Article', // Internal page, not in nav
}

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: 'Economic Insights' | 'Political Commentary' | 'Social Responsibility';
  author: Author;
  date: string;
  readTime: number; // in minutes
  tags: string[];
}

export interface NovusMessage {
  id: number;
  source: 'user' | 'model';
  text?: string;
  imageUrl?: string;
  isLoading?: boolean;
}

export type AskNovusHighlightFn = (text: string) => void;

export interface Trend {
  topic: string;
  summary: string;
}