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
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string; // Relaxed from enum for CMS flexibility
  author: Author;
  date: string;
  readTime: string | number; // in minutes or string description
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
  details?: string;
}