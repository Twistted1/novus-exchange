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
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Brand />
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Articles', 'Trending', 'Ask Novus', 'Contact'].map((item) => (
              <a key={item} href={item === 'Home' ? '#home' : `#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-300 hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                {item}
              </a>
            ))}
          </div>
          <div className="relative">
            <div className="flex items-center bg-white/5 backdrop-blur-md rounded border border-white/10 px-4 py-2 min-w-[200px]">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-white/40 focus:placeholder-white/60"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Brand() {
  const [fallback, setFallback] = useState(false)
  return (
    <a href="#home" className="flex items-center gap-2">
      {!fallback ? (
        <img src="/logo.svg" alt="Novus Exchange" className="h-10 w-auto" onError={() => setFallback(true)} />
      ) : (
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold text-white">Novus Exchange</div>
        </div>
      )}
    </a>
  )
}
