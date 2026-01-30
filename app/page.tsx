"use client";

import Hero from '../components/Hero';
import About from '../components/About';
import LatestArticles from '../components/LatestArticles';
import GlobalTrending from '../components/GlobalTrending';
import Solutions from '../components/Solutions';
import Contact from '../components/Contact';

export default function Home() {
  const handleNavClick = (page: string) => {
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen text-white bg-black">
      <Hero onNavClick={handleNavClick} />
      <About />
      <LatestArticles searchQuery="" />
      <GlobalTrending />
      <Solutions />
      <Contact />
    </main>
  );
}