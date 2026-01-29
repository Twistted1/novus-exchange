/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../src/components/lib/firebase'

interface Article {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

const fallbackArticles: Article[] = [
  {
    id: 'placeholder-1',
    title: 'The Future of AI in Global Finance',
    summary: 'How artificial intelligence is reshaping market strategies and predictive analytics in the financial sector.',
    fullText: '<p>Artificial Intelligence is revolutionary...</p>',
    image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=AI+Finance',
    category: 'Technology',
    author: 'Marcio Rodrigues',
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
    author: 'Marcio Rodrigues',
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
    author: 'Marcio Rodrigues',
    date: new Date().toLocaleDateString(),
    readTime: '6 min read'
  }
];

function ArticleCard({ article, index, onClick }: { article: Article, index: number, onClick: () => void }) {
  const fallbackImage = 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Nonpm run buildvus+Exchange'
  const [imgSrc, setImgSrc] = useState(article.image || fallbackImage)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#0a0a0a] rounded-[1.5rem] overflow-hidden border border-white/5 cursor-pointer flex flex-col transition-colors duration-500 hover:border-red-600/30 hover:glow-shadow-red shadow-xl"
      onClick={onClick}
    >
      <motion.div
        className="flex flex-col flex-grow h-full w-full"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 0.5, 0, -0.5, 0]
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
        }}
      >
        <div className="relative h-48 w-full overflow-hidden shrink-0">
          <Image
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            src={imgSrc}
            alt={article.title}
            unoptimized
            onError={() => setImgSrc(fallbackImage)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-600 mb-2">{article.category}</span>
          <h3 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight group-hover:text-red-500 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-3 font-light">
            {article.summary}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{article.author}</span>
            <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{article.readTime}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ArticleModal({ article, onClose }: { article: Article, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-[#050505] text-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-white/10"
      >
        <div className="p-6 flex justify-between items-center border-b border-white/10 shrink-0">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-red-600">Article Briefing</span>
          <button onClick={onClose} aria-label="Close modal" className="p-2 hover:bg-white/5 rounded-full transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 md:p-12 custom-scrollbar">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-black mb-8 leading-tight tracking-tighter">
              {article.title}
            </h1>
            <div className="rounded-2xl overflow-hidden mb-8">
              <Image src={article.image} alt={article.title} width={800} height={450} className="w-full h-auto object-cover" />
            </div>
            <div
              className="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300 leading-relaxed font-light"
              dangerouslySetInnerHTML={{ __html: article.fullText }}
            />
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
                <span className="text-gray-500">Published: {article.date}</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="text-white font-bold">Author: {article.author}</span>
              </div>
              <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-red-600 hover:text-white transition-colors">Close</button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function LatestArticles({ searchQuery }: { searchQuery: string }) {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        const q = query(collection(db, 'publishedArticles'), orderBy('publishedAt', 'desc'), limit(6));
        const querySnapshot = await getDocs(q);
        let fetchedArticles: Article[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const dateObj = data.publishedAt?.toDate ? data.publishedAt.toDate() : new Date();
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            summary: data.body ? data.body.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...' : 'No summary available.',
            fullText: data.body || '',
            image: data.mainImage || 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Novus+Exchange',
            category: data.category || 'Intelligence',
            author: 'Marcio Rodrigues',
            date: dateObj.toLocaleDateString(),
            readTime: '5 min read'
          };
        });
        if (fetchedArticles.length === 0) fetchedArticles = fallbackArticles;
        setArticles(fetchedArticles);
      } catch (err) {
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
    <section id="articles" className="py-24 px-4 bg-black relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-red-600 font-mono text-[9px] font-black uppercase tracking-[0.5em] mb-4">The Feed</motion.div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
            Latest <span className="text-red-600">Articles</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} onClick={() => setSelectedArticleId(article.id)} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {!!selectedArticleId && (
          <ArticleModal article={articles.find(a => a.id === selectedArticleId)!} onClose={() => setSelectedArticleId(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}