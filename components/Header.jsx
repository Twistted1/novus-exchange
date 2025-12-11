import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Header({ searchQuery, setSearchQuery }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ${scrolled ? 'liquid-glass' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Brand />
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-8">
            {['About', 'Articles', 'Trending', 'Solutions', 'Ask Novus', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-300 hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                {item}
              </a>
            ))}
          </div>
          <div className="relative">
            <div className={`flex items-center bg-white/5 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 ${isSearchOpen ? 'w-64 px-3 shadow-[0_0_15px_rgba(34,211,238,0.2)] border-cyan-500/30' : 'w-10 h-10 justify-center cursor-pointer hover:bg-white/10 hover:border-white/30'}`}>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`bg-transparent border-none outline-none text-sm text-white ml-2 w-full placeholder-white/30 ${isSearchOpen ? 'block' : 'hidden'}`} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Brand() {
  const sources = ['/logo.svg', '/logo.png', '/logo@2x.png']
  const [idx, setIdx] = useState(0)
  const [fallback, setFallback] = useState(false)
  const src = sources[idx]
  return (
    <a href="#home" className="flex items-center gap-3 shine-hover">
      {!fallback ? (
        <Image src="/logo.svg" alt="Novus Exchange" width={40} height={40} className="h-10 w-auto" unoptimized onError={() => setFallback(true)} />
      ) : (
        <div className="text-2xl font-black tracking-tighter text-white drop-shadow-lg neon-text">Novus<span className="text-[var(--accent)]">.</span>Exchange</div>
      )}
    </a>
  )
}
