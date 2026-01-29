"use client";

// FIX: Created file content for the ArticleCard component.
import React from 'react';
import { Article } from '../../types';
import GlassCard from '../GlassCard';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  style?: React.CSSProperties;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, style }) => {
  return (
    <GlassCard
      onClick={onClick}
      className="cursor-pointer group overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10"
      style={style}
    >
      <div className="relative">
        <img src={article.imageUrl} alt={article.title} loading="lazy" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">{article.category}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-300 mb-4 flex-grow line-clamp-3">{article.excerpt}</p>
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>By {article.author.name}</span>
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default ArticleCard;