/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../src/components/lib/firebase'

const fallbackArticles = [
  {
    id: 'placeholder-1',
    title: 'The Future of AI in Global Finance',
    summary: 'How artificial intelligence is reshaping market strategies and predictive analytics in the financial sector.',
    fullText: '<p>Artificial Intelligence is revolutionary...</p>',
    image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=AI+Finance',
    category: 'Technology',
    author: 'Novus AI',
    date: new Date().toLocaleDateString(),
    readTime: '5 min read'
  },
  {
    id: 'placeholder-2',
    title: '2025 Market Outlook: Emerging Trends',
    summary: 'A comprehensive analysis of emerging markets and the shift towards digital assets in the coming year.',
    fullText: '<p>The markets are shifting...</p>',
    image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Market+Outlook',
    category: 'Economy',
    author: 'Novus Analyst',
    date: new Date().toLocaleDateString(),
    readTime: '7 min read'
  },
  {
    id: 'placeholder-3',
    title: 'Sustainable Energy: The New Gold Rush',
    summary: 'Why renewable energy investments are silently outperforming traditional assets in the long-term portfolio.',
    fullText: '<p>Renewable energy is not just...</p>',
    image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Clean+Energy',
    category: 'Energy',
    author: 'Eco Tech',
    date: new Date().toLocaleDateString(),
    readTime: '6 min read'
  }
];

function ArticleCard({ article, index, onClick }) {
  const fallbackImage = 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Novus+Exchange'
  const [imgSrc, setImgSrc] = useState(article.image || fallbackImage)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer flex flex-col transition-all duration-500 hover:border-red-600/30 hover:-translate-y-2 shadow-2xl"
      onClick={onClick}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
          src={imgSrc}
          alt={article.title}
          unoptimized
          onError={() => setImgSrc(fallbackImage)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        <div className="absolute bottom-6 left-8 flex items-center gap-2">
          <span className="px-3 py-1 bg-red-600 text-[10px] font-black uppercase tracking-widest text-white rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight tracking-tight group-hover:text-red-500 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-10 line-clamp-3 font-light">
          {article.summary}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{article.author}</span>
          </div>
          <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{article.readTime}</span>
        </div>
      </div>

      {/* Glow on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

function ArticleModal({ article, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="bg-[#050505] text-white rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-6xl h-full flex flex-col overflow-hidden border border-white/10"
      >
        <div className="p-6 md:p-10 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-red-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Intelligence Briefing</span>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all group">
            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 md:p-20 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-8">
              <span className="text-white">{article.category}</span>
              <span className="opacity-20">/</span>
              <span>{article.date}</span>
              <span className="opacity-20">/</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black mb-12 leading-none tracking-tighter drop-shadow-2xl">
              {article.title}
            </h1>

            <div className="rounded-[2.5rem] overflow-hidden border border-white/5 mb-16 shadow-2xl">
              <Image
                src={article.image}
                alt={article.title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>

            <div
              className="prose prose-invert prose-2xl max-w-none text-gray-300 leading-relaxed font-light first-letter:text-7xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left"
              dangerouslySetInnerHTML={{ __html: article.fullText }}
            />

            <div className="mt-24 p-12 bg-white/5 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Editor in Chief</p>
                <p className="text-2xl font-bold text-white">Marcio Rodrigues</p>
              </div>
              <button
                onClick={onClose}
                className="px-10 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white hover:text-black transition-all"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function LatestArticles({ searchQuery }) {
  const [articles, setArticles] = useState([])
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        const q = query(
          collection(db, 'publishedArticles'),
          orderBy('publishedAt', 'desc'),
          limit(6)
        );
        const querySnapshot = await getDocs(q);

        let fetchedArticles = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const dateObj = data.publishedAt?.toDate ? data.publishedAt.toDate() : new Date();
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            summary: data.body ? data.body.substring(0, 180).replace(/<[^>]*>?/gm, '') + '...' : 'No summary available.',
            fullText: data.body || '',
            image: data.mainImage || 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Novus+Exchange',
            category: data.category || 'Intelligence',
            author: 'Marcio Rodrigues',
            date: dateObj.toLocaleDateString(),
            readTime: '5 min read'
          };
        });

        if (fetchedArticles.length === 0) {
          fetchedArticles = fallbackArticles;
        }

        setArticles(fetchedArticles);
      } catch (err) {
        console.error('Failed to fetch articles from CMS:', err);
        setArticles(fallbackArticles);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles()
  }, [])

  const filtered = articles.filter(a => {
    const q = (searchQuery || '').toLowerCase()
    return a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
  })

  return (
    <section id="articles" className="py-32 px-4 bg-black relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.5em] mb-4"
          >
            The Feed
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            Latest <span className="text-red-600">Articles</span>
          </h2>
          <div className="w-20 h-1 bg-white/10 mx-auto" />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={index}
                onClick={() => setSelectedArticleId(article.id)}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-20 border border-white/5 rounded-[3rem] bg-white/5">
            <p className="text-gray-500 font-mono uppercase tracking-widest">No intelligence found matching query.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {!!selectedArticleId && (
          <ArticleModal
            article={articles.find(a => a.id === selectedArticleId)}
            onClose={() => setSelectedArticleId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}