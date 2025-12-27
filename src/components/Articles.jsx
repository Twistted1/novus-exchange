import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(
          collection(db, 'publishedArticles'),
          orderBy('publishedAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const articlesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className=\"text-center py-12 text-white\">Loading articles...</div>;
  }

  return (
    <div className=\"max-w-7xl mx-auto px-4 py-12\">
      <h2 className=\"text-3xl font-bold mb-8 text-white\">Latest Articles</h2>
      
      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">
        {articles.map(article => (
          <article key={article.id} className=\"bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden hover:bg-white/20 transition-all border border-white/20\">
            {article.imageUrl && (
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className=\"w-full h-48 object-cover\"
              />
            )}
            <div className=\"p-6\">
              <h3 className=\"text-xl font-bold mb-2 text-white\">{article.title}</h3>
              <p className=\"text-gray-300 mb-4\">{article.summary}</p>
              <div className=\"flex items-center justify-between text-sm text-gray-400\">
                <span>👁 {article.views || 0} views</span>
                <span>❤️ {article.likes || 0} likes</span>
              </div>
              <button className=\"mt-4 text-blue-400 font-semibold hover:text-blue-300\">
                Read More →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Articles;
