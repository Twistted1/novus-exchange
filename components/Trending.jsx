import { useState, useEffect } from 'react'
import Image from 'next/image'

function TrendCard({ item, onClick }) {
  const [imgSrc, setImgSrc] = useState(item.image)
  const fallbackImage = 'https://placehold.co/1920x1080/111111/ffffff?text=Trending'
  return (
    <div onClick={onClick} className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 group cursor-pointer neon-card shine-hover aspect-video flex flex-col">
      <div className="relative h-1/2 overflow-hidden w-full">
        <Image src={imgSrc || fallbackImage} alt={item.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized onError={() => setImgSrc(fallbackImage)} />
        <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg border border-red-500/50">Live</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold leading-snug mb-2 neon-text">{item.title}</h3>
        <p className="text-xs text-gray-400 line-clamp-3 mb-4">{item.summary}</p>
        <button onClick={(e) => { e.stopPropagation(); onClick(); }} className="text-cyan-400 text-xs font-medium hover:text-cyan-300 transition-colors flex items-center gap-1">
          Read Full Analysis →
        </button>
      </div>
    </div>
  )
}

export default function Trending() {
  const [trendingItems, setTrendingItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch('/api/trending')
        if (res.ok) {
          const data = await res.json()
          setTrendingItems(data.trending || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])
  const [selectedTrend, setSelectedTrend] = useState(null)
  return (
    <section id="trending" className="min-h-screen relative bg-black/40 reveal scroll-mt-0 flex items-center justify-center py-32 z-10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">Global Trending</h2>
        <p className="text-sm text-white/70 mb-10 text-center max-w-2xl mx-auto font-light">AI-powered summaries of the most pressing geopolitical and economic topics, refreshed twice daily.</p>
        {loading ? (
          <div className="text-center text-cyan-400 animate-pulse text-xl font-mono">CALCULATING TRENDS...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingItems.map(item => (
              <TrendCard key={item.id} item={item} onClick={() => setSelectedTrend(item)} />
            ))}
          </div>
        )}
      </div>
      {selectedTrend && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedTrend(null)}>
          <div className="bg-[#111] border border-white/20 rounded-2xl max-w-lg w-full p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedTrend(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">{selectedTrend.title}</h3>
            <Image src={selectedTrend.image} alt={selectedTrend.title} width={1200} height={800} className="w-full h-48 object-cover rounded-lg mb-6" unoptimized />
            <p className="text-gray-300 leading-relaxed">{selectedTrend.details}</p>
          </div>
        </div>
      )}
    </section>
  )
}
