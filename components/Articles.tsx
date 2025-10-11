// FIX: Created file content for the Articles component.
import React from 'react';
import { Article } from '../types';
import ArticleCard from './articles/ArticleCard';

interface ArticlesProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  showFilters: boolean;
}

const Articles: React.FC<ArticlesProps> = ({ articles, onSelectArticle, showFilters }) => {
  // A simple state for category filtering could be added here if needed
  // For now, we'll just display the articles passed in.
  
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-center text-white mb-4">Articles</h2>
      <p className="text-lg text-center text-gray-400 max-w-3xl mx-auto mb-10">
        In-depth analysis and commentary on today's most critical issues.
      </p>

      {/* A potential spot for filter buttons if `showFilters` were to be implemented */}

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto stagger-fade-in-up">
          {articles.map((article, index) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => onSelectArticle(article)} 
              style={{ transitionDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-16">
            <h3 className="text-2xl font-semibold mb-2">No Articles Found</h3>
            <p>Your search did not match any articles. Please try a different query.</p>
        </div>
      )}
    </div>
  );
};

export default Articles;