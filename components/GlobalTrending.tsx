"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { Trend } from '../types';
import { renderMarkdown } from '../markdownUtils';

const TrendCard: React.FC<{ trend: Trend, index: number, onSelect: () => void }> = ({ trend, index, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    animate={{ y: [0, -3, 0] }}
    transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 } }}
  >
    <GlassCard
      onClick={onSelect}
      className="flex flex-col p-6 aspect-square relative group cursor-pointer overflow-hidden border-white/5 hover:border-red-600/50 hover:glow-shadow-red transition-all duration-500"
    >
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <div className="mb-3">
        <span className="text-[9px] font-mono text-red-600 uppercase tracking-widest font-bold">Trending Intelligence</span>
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-3 leading-tight group-hover:text-red-500 transition-colors">
        {trend.topic}
      </h3>
      <p className="text-gray-400 text-xs flex-grow line-clamp-4 font-light leading-relaxed">
        {trend.summary}
      </p>
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover:translate-x-1 transition-transform">
          Full Analysis &rarr;
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
      </div>
    </GlassCard>
  </motion.div>
);

const GlobalTrending: React.FC = () => {
  const [trends, setTrends] = useState<Trend[] | null>(null);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [listError, setListError] = useState<string | null>(null);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [trendingArticle, setTrendingArticle] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      setIsListLoading(true);
      try {
        const response = await fetch('/api/trending');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTrends(data.trending.map((t: any) => ({ ...t, topic: t.title })));
      } catch (err) {
        setListError("Could not load topics.");
      } finally {
        setIsListLoading(false);
      }
    };
    fetchTrends();
  }, []);

  useEffect(() => {
    if (selectedTrend) {
      setTrendingArticle(selectedTrend.details || "No further details.");
      document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTrend]);

  return (
    <section id="trending" className="relative py-24 px-4 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {selectedTrend ? (
            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-3xl mx-auto">
              <button onClick={() => setSelectedTrend(null)} className="mb-8 group flex items-center gap-2 text-[10px] font-mono text-gray-400 hover:text-white transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Pulse
              </button>
              <article>
                <span className="text-red-500 uppercase tracking-[0.2em] text-[8px] font-black block mb-4">Deep Analysis</span>
                <h1 className="text-2xl md:text-3xl font-black text-white mb-8 leading-tight tracking-tighter">{selectedTrend.topic}</h1>
                <div className="prose prose-invert prose-sm max-w-none text-gray-300 font-light leading-relaxed">
                  {trendingArticle && renderMarkdown(trendingArticle)}
                </div>
              </article>
              <button onClick={() => setSelectedTrend(null)} className="mt-12 px-6 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Close</button>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-16">
                <motion.div className="text-red-600 font-mono text-[9px] font-black uppercase tracking-[0.5em] mb-4">Live Intelligence</motion.div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tighter uppercase">Global <span className="text-red-600">Trending</span></h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {isListLoading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="aspect-square bg-white/5 animate-pulse rounded-2xl" />) :
                  trends?.map((trend, index) => <TrendCard key={index} trend={trend} index={index} onSelect={() => setSelectedTrend(trend)} />)}
              </div>
              <div className="flex justify-start border-t border-white/5 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">
                    Intelligence by Novus AI • <span className="text-gray-400">AI Powered News</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GlobalTrending;