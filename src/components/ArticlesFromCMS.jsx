import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const ArticlesFromCMS = React.memo(({ onSelectArticle, showFilters = false, maxArticles = 3 }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Attempting to fetch from Firebase posts collection...');
        const q = query(
          collection(db, 'posts'),
          where('status', '==', 'Published'),
          orderBy('createdAt', 'desc'),
          limit(maxArticles)
        );
        
        const querySnapshot = await getDocs(q);
        const articlesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            excerpt: data.content?.substring(0, 150) || 'No description',
            content: data.content || '',
            category: data.platform || 'ARTICLES',
            readTime: '5 min read',
            image: data.imageUrl || '/images/default-article.jpg',
            tags: data.platform ? [data.platform] : [],
            date: data.createdAt?.toDate?.() || new Date().toISOString(),
            author: {
              id: data.userId || 'marcio-novus',
              name: 'Marcio Novus',
              bio: 'Content Creator at Novus Exchange',
              image: '/images/author-default.jpg'
            }
          };
        });
        
        setArticles(articlesData);
      } catch (err) {
        console.error('Error fetching from CMS:', err);
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [maxArticles]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return 'Recently';
    }
  };

  const handleImageError = (e) => {
    e.target.src = '/images/default-article.jpg';
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading articles from CMS...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-300 mb-4">Failed to load articles: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-400 text-lg">No published articles yet.</p>
        <p className="text-gray-500 text-sm mt-2">Publish some articles from your CMS dashboard!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Latest Articles</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          In-depth analysis and commentary on today's most critical issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {articles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            onKeyDown={(e) => e.key === 'Enter' && onSelectArticle(article)}
            role="button"
            tabIndex={0}
            aria-label={`Read article: ${article.title}`}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                onError={handleImageError}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-cyan-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {article.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="truncate">By {article.author.name}</span>
                <time dateTime={article.date} className="shrink-0 ml-2">
                  {formatDate(article.date)}
                </time>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
});

ArticlesFromCMS.displayName = 'ArticlesFromCMS';

export default ArticlesFromCMS;