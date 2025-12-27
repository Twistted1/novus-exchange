"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header({ searchQuery, setSearchQuery } = {}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    // UPDATED LINE: Fixed position, High Z-Index, Solid Black Background
    <nav className="relative w-full z-50 ...">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Brand />
        <div className="flex items-center space-x-6">
          <button className="md:hidden p-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
          <div className="hidden md:flex space-x-8">
            {['About', 'Articles', 'Trending', 'Solutions', 'Ask Novus', 'Contact'].map((item) => {
              const id = item.toLowerCase().replace(' ', '-')
              return (
                <Link key={item} href={`/#${id}`} className="text-sm font-medium text-gray-300 hover:text-white transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {item}
                </Link>
              )
            })}
          </div>
          <div className="relative">
            <div className="flex items-center bg-white/5 backdrop-blur-md rounded border border-white/10 px-3 py-1.5 min-w-[180px] md:min-w-[220px]">
              <svg className="w-3.5 h-3.5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                type="text"
                placeholder="Search..."
                value={typeof searchQuery === 'string' ? searchQuery : localQuery}
                onChange={(e) => (typeof setSearchQuery === 'function' ? setSearchQuery(e.target.value) : setLocalQuery(e.target.value))}
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-white/40 focus:placeholder-white/60"
              />
            </div>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="absolute right-0 top-0 h-full w-72 bg-[#0b0b0b] border-l border-white/10 p-6">
            <div className="space-y-4">
              {['About', 'Articles', 'Trending', 'Solutions', 'Ask Novus', 'Contact'].map((item) => {
                const id = item.toLowerCase().replace(' ', '-')
                return (
                  <Link key={item} href={`/#${id}`} className="block text-white/90 hover:text-white text-sm font-medium" onClick={() => setMobileOpen(false)}>
                    {item}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function Brand() {
  const [fallback, setFallback] = useState(false)
  const sources = ['/novus-logo.png', '/logo.svg']
  const [idx, setIdx] = useState(0)
  return (
    <Link href="/#home" className="flex items-center gap-3">
      {!fallback ? (
        <img src={sources[idx]} alt="Novus Exchange" className="h-16 md:h-20 w-auto drop-shadow-[0_0_14px_rgba(255,215,0,0.3)]" onError={() => { if (idx < sources.length - 1) setIdx(idx + 1); else setFallback(true) }} />
      ) : (
        <div className="flex items-center gap-2">
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-white"><span className="text-yellow-400">Novus</span> Exchange</div>
        </div>
      )}
    </Link>
  )
}