"use client";
// Force reload after component rename


import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import Hero from '../components/Hero'
import About from '../components/About'
import Solutions from '../components/Solutions'
import LatestArticles from '../components/LatestArticles'
import GlobalTrending from '../components/GlobalTrending'
import Contact from '../components/Contact'

export default function Home() {
  useReveal()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="min-h-screen text-white">
      <Hero onNavClick={function (page: string): void {
        throw new Error('Function not implemented.');
      }} />
      <About />
      <LatestArticles searchQuery={searchQuery} />
      <GlobalTrending />

      <Solutions />
      <Contact />
    </main>
  )
}