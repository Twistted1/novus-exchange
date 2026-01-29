"use client";

import React, { useState, useEffect } from 'react';
import Articles from '../../components/Articles';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../../src/components/lib/firebase';
import { Article } from '../../types';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(
          collection(db, 'posts'),
          where('status', '==', 'Published'),
          orderBy('createdAt', 'desc'),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        const fetchedArticles: Article[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            excerpt: data.excerpt || (data.content ? data.content.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...' : 'No summary available.'),
            content: data.content || '',
            imageUrl: data.imageUrl || 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Novus+Exchange',
            category: data.platform || 'Intelligence',
            tags: data.platform ? [data.platform] : [],
            author: {
              id: data.userId || 'marcio-novus',
              name: 'Marcio Novus',
              avatarUrl: '/images/author-default.jpg',
              bio: 'Content Creator'
            },
            date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString(),
            readTime: '5'
          };
        });
        setArticles(fetchedArticles);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      <Articles
        articles={articles}
        onSelectArticle={(article) => console.log("Selected", article)}
        showFilters={false}
      />
    </div>
  );
}
