import React from 'react';
import { Article, Author, AskNovusHighlightFn } from '../../types';
import GlassCard from '../GlassCard';
import ArticleCard from './ArticleCard';

interface ArticlePageProps {
  article: Article;
  articles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectAuthor: (author: Author) => void;
  onAskNovusHighlight: AskNovusHighlightFn;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, articles, onBack, onSelectArticle, onSelectAuthor, onAskNovusHighlight }) => {
  
  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (selectedText && selectedText.length > 5 && selectedText.length < 200) {
      onAskNovusHighlight(selectedText);
    }
  };

  const renderContent = () => {
    const parts = article.content.split(/(\[IMAGE:.*?\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[IMAGE:')) {
        const url = part.substring(7, part.length - 1);
        return <img key={index} src={url} alt={`Article content image ${index}`} loading="lazy" className="w-full h-auto object-cover rounded-lg my-8 shadow-lg" />;
      }
      return <p key={index} className="mb-6 leading-relaxed">{part}</p>;
    });
  };

  const otherArticles = articles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-24 sm:pb-32 page-transition-wrapper">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-8 text-sm font-semibold text-white hover:underline flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <article>
          <span className="text-cyan-400 uppercase tracking-wider text-sm font-semibold">{article.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">{article.title}</h1>
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/20">
            <button onClick={() => onSelectAuthor(article.author)} className="flex items-center gap-3 group">
              <img src={article.author.avatarUrl} alt={article.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/30 group-hover:border-cyan-400 transition-colors" />
              <div>
                <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{article.author.name}</p>
                <p className="text-sm text-gray-400">{article.date} · {article.readTime} min read</p>
              </div>
            </button>
          </div>
          
          <img src={article.imageUrl} alt={article.title} loading="lazy" className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-2xl" />

          <div className="prose prose-lg prose-invert max-w-none text-gray-200" onMouseUp={handleMouseUp}>
            {renderContent()}
          </div>
        </article>
        
        <div className="mt-16 pt-12 border-t border-white/20">
            <h2 className="text-3xl font-bold text-center text-white mb-10">Read Next</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherArticles.map(nextArticle => (
                    <ArticleCard 
                        key={nextArticle.id} 
                        article={nextArticle} 
                        onClick={() => onSelectArticle(nextArticle)} 
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;