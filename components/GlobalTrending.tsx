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
    transition={{ delay: index * 0.1 }}
  >
    <GlassCard
      onClick={onSelect}
      className="flex flex-col p-8 aspect-square relative group cursor-pointer overflow-hidden border-white/5 hover:border-red-600/50 transition-all duration-500"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
        <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <div className="mb-4">
        <span className="text-[10px] font-mono text-red-600 uppercase tracking-widest font-bold">Trending Intelligence</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 line-clamp-3 leading-tight group-hover:text-red-500 transition-colors">
        {trend.topic}
      </h3>
      <p className="text-gray-400 text-sm flex-grow line-clamp-4 font-light leading-relaxed">
        {trend.summary}
      </p>
      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold text-white uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
          Full Analysis &rarr;
        </span>
        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
      </div>

      {/* Decorative gradient corner */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-red-600/5 blur-3xl rounded-full" />
    </GlassCard>
  </motion.div>
);

const SkeletonCard: React.FC = () => (
  <GlassCard className="flex flex-col p-8 aspect-square animate-pulse border-white/5">
    <div className="h-4 bg-white/5 rounded w-1/4 mb-6"></div>
    <div className="h-8 bg-white/5 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
    <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
    <div className="h-4 bg-white/5 rounded w-2/3"></div>
    <div className="mt-auto h-10 bg-white/5 rounded w-full"></div>
  </GlassCard>
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
      setListError(null);
      try {
        const response = await fetch('/api/trending');
        if (!response.ok) throw new Error('Failed to fetch trending topics');
        const data = await response.json();
        const mappedTrends = data.trending.map((t: any) => ({
          ...t,
          topic: t.title,
          summary: t.summary,
          details: t.details
        }));
        setTrends(mappedTrends);
      } catch (err: any) {
        console.error("Failed to fetch trending topics:", err);
        setListError("Could not load trending topics. Fallback data active.");
      } finally {
        setIsListLoading(false);
      }
    };
    fetchTrends();
  }, []);

  useEffect(() => {
    if (selectedTrend) {
      setTrendingArticle(selectedTrend.details || "No further details available.");
      window.scrollTo({ top: document.getElementById('trending')?.offsetTop, behavior: 'smooth' });
    }
  }, [selectedTrend]);

  return (
    <section id="trending" className="relative py-32 px-4 bg-black overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {selectedTrend ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => { setSelectedTrend(null); setTrendingArticle(null); }}
                className="mb-12 group flex items-center gap-3 text-sm font-mono text-gray-400 hover:text-white transition-colors"
              >
                <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Pulse
              </button>

              <article>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-red-600" />
                  <span className="text-red-500 uppercase tracking-[0.3em] text-[10px] font-black">Deep Analysis</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-12 leading-none tracking-tighter">
                  {selectedTrend.topic}
                </h1>
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed">
                  {trendingArticle && renderMarkdown(trendingArticle)}
                </div>
              </article>

              <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center bg-black/50 backdrop-blur p-8 rounded-3xl">
                <div>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Source Analysis</p>
                  <p className="text-sm text-white font-bold">Novus Intelligence Engine</p>
                </div>
                <button
                  onClick={() => { setSelectedTrend(null); setTrendingArticle(null); }}
                  className="px-8 py-3 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                >
                  Close Briefing
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-24">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-red-600 font-mono text-[10px] font-black uppercase tracking-[0.5em] mb-4"
                >
                  Live Intelligence
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
                  Global <span className="text-red-600">Trending</span>
                </h2>
                <div className="w-20 h-1 bg-white/10 mx-auto mb-8" />
                <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                  AI-powered summaries of the most pressing geopolitical and economic topics, refreshed twice daily.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {isListLoading ? (
                  Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                ) : listError ? (
                  <div className="col-span-full border border-red-900/50 bg-red-900/10 p-12 rounded-3xl text-center">
                    <p className="text-red-400 font-mono uppercase tracking-widest">{listError}</p>
                  </div>
                ) : (
                  trends?.map((trend, index) => (
                    <TrendCard key={index} trend={trend} index={index} onSelect={() => setSelectedTrend(trend)} />
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GlobalTrending;