"use client";

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
      <Hero />
      <About />
      <LatestArticles searchQuery={searchQuery} />
      <GlobalTrending />

      <Solutions />
      <Contact />
    </main>
  )
}