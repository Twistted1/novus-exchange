/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
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

function ArticleCard({ article, onClick }) {
  const fallbackImage = 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Novus+Exchange'
  const [imgSrc, setImgSrc] = useState(article.image || fallbackImage)
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 cursor-pointer group flex flex-col aspect-video neon-card shine-hover" onClick={onClick} role="button" tabIndex="0" aria-label={`Read article: ${article.title}`} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(e)}>
      <div className="relative overflow-hidden h-1/2 w-full">
        <Image fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" src={imgSrc} alt={article.title} unoptimized onError={() => setImgSrc(fallbackImage)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 drop-shadow-md">{article.category}</div>
        <h3 className="text-xl font-bold mb-3 leading-snug text-white transition-colors drop-shadow-sm neon-text">{article.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 font-light">{article.summary}</p>
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">By {article.author || 'Marcio R.'}</span>
          <span>{article.readTime || '5 min read'}</span>
        </div>
      </div>
    </div>
  )
}

function ArticleModal({ articleId, onClose, fallbackArticle }) {
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    if (!fallbackArticle) {
      setArticle(null)
      setIsLoading(false)
      return
    }
    setArticle(fallbackArticle)
    setIsLoading(false)
  }, [articleId, fallbackArticle])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (modalRef.current && !isLoading && article) {
      const focusables = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (!focusables.length) return
      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]
      if (closeButtonRef.current) closeButtonRef.current.focus(); else firstEl.focus()
      const trap = (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) { if (document.activeElement === firstEl) { lastEl.focus(); event.preventDefault() } }
          else { if (document.activeElement === lastEl) { firstEl.focus(); event.preventDefault() } }
        }
      }
      const m = modalRef.current
      m.addEventListener('keydown', trap)
      return () => m.removeEventListener('keydown', trap)
    }
  }, [isLoading, article])

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="article-modal-title">
      <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl text-white rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto border border-white/10" ref={modalRef}>
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
          <h2 id="article-modal-title" className="text-xl font-bold truncate text-cyan-400 tracking-widest uppercase text-xs drop-shadow-md">{article ? 'Intelligence Briefing' : 'Loading...'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Close modal" ref={closeButtonRef}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        {isLoading && <div className="p-12 text-center text-cyan-400 animate-pulse font-mono">DECRYPTING CONTENT...</div>}
        {error && <div className="p-12 text-center text-red-500 font-mono">ERROR: {error}</div>}
        {article && (
          <div className="p-8 md:p-12">
            <h1 className="text-2xl md:text-4xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl text-white">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-10 border-b border-white/10 pb-8 font-mono uppercase tracking-wider">
              <span className="text-cyan-400 font-bold">{article.category}</span>
              <span className="text-white/20">/</span>
              <span>{article.date}</span>
              <span className="text-white/20">/</span>
              <span>{article.readTime}</span>
              <span className="text-white/20">/</span>
              <span className="text-white">Authored by {article.author}</span>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-12">
              <Image src={article.image} alt={article.title} width={1200} height={800} className="w-full h-auto max-h-[500px] object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed drop-shadow-md" dangerouslySetInnerHTML={{ __html: article.fullText }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function LatestArticles({ searchQuery }) {
  const [articles, setArticles] = useState([])
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const lastClickedArticleRef = useRef(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        // Query 'posts' collection for Published articles from CMS
        const q = query(
          collection(db, 'posts'),
          where('status', '==', 'Published'),
          orderBy('createdAt', 'desc'),
          limit(9)
        );
        const querySnapshot = await getDocs(q);

        let fetchedArticles = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            summary: data.content ? data.content.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...' : 'No summary available.',
            fullText: data.content || '', // HTML content for Modal
            image: data.imageUrl || 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Novus+Exchange',
            category: data.platform || 'General',
            author: 'Marcio Novus', // Can map data.userId if available
            date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Recently',
            readTime: '5 min read'
          };
        });

        if (fetchedArticles.length === 0) {
          fetchedArticles = fallbackArticles;
        }

        setArticles(fetchedArticles);
      } catch (err) {
        console.error('Failed to fetch articles from CMS:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles()
  }, [])


  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setSelectedArticleId(null) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const filtered = articles.filter(a => {
    const q = (searchQuery || '').toLowerCase()
    return a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
  })

  return (
    <section id="articles" className="min-h-screen relative reveal scroll-mt-0 flex items-center justify-center py-32 z-10">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">Articles</h2>
        <p className="text-sm text-white/70 mb-10 text-center max-w-2xl mx-auto font-light">In-depth analysis and commentary on today&apos;s most critical issues, updated weekly.</p>
        {isLoading && <div className="text-center text-cyan-400 animate-pulse text-xl font-mono">LOADING INTELLIGENCE...</div>}
        {!isLoading && (
          filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-xl">No results found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filtered.map(article => (
                <ArticleCard key={article.id} article={article} onClick={(e) => { setSelectedArticleId(article.id); lastClickedArticleRef.current = e.currentTarget }} />
              ))}
            </div>
          )
        )}
      </div>
      {!!selectedArticleId && (
        <ArticleModal articleId={selectedArticleId} fallbackArticle={articles.find(a => a.id === selectedArticleId)} onClose={() => { setSelectedArticleId(null); if (lastClickedArticleRef.current) lastClickedArticleRef.current.focus() }} />
      )}
    </section>
  )
}
