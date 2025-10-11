import React, { useState, useEffect } from 'react';
import { Type } from '@google/genai';
import GlassCard from './GlassCard';
import { Trend } from '../types';
import { renderMarkdown } from '../utils';


interface GlobalTrendingProps {
}

// Define the expected JSON schema for the AI response to improve readability.
const trendsSchema = {
    type: Type.OBJECT,
    properties: {
        trends: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    topic: { type: Type.STRING },
                    summary: { type: Type.STRING }
                },
                required: ["topic", "summary"]
            }
        }
    },
    required: ["trends"]
};

const TrendCard: React.FC<{ trend: Trend, style?: React.CSSProperties, onSelect: () => void }> = ({ trend, style, onSelect }) => (
  <GlassCard className="flex flex-col p-6 aspect-square" style={style}>
    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{trend.topic}</h3>
    <p className="text-gray-300 text-sm flex-grow line-clamp-3">{trend.summary}</p>
    <div className="mt-auto pt-4 border-t border-white/10">
      <button 
        onClick={onSelect} 
        className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
      >
        Read Full Analysis &rarr;
      </button>
    </div>
  </GlassCard>
);

const SkeletonCard: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
    <GlassCard className="flex flex-col p-6 aspect-square animate-pulse" style={style}>
      <div className="h-6 bg-gray-600/50 rounded w-3/4 mb-4"></div>
      <div className="space-y-2 flex-grow">
        <div className="h-4 bg-gray-600/50 rounded w-full"></div>
        <div className="h-4 bg-gray-600/50 rounded w-5/6"></div>
        <div className="h-4 bg-gray-600/50 rounded w-full"></div>
      </div>
    </GlassCard>
);

const ArticleSkeletonLoader: React.FC = () => (
    <div className="animate-pulse max-w-4xl mx-auto">
        <div className="h-6 bg-gray-600/50 rounded w-1/4 mb-8"></div>
        <div className="h-10 bg-gray-600/50 rounded w-3/4 mb-6"></div>
        <div className="h-6 bg-gray-600/50 rounded w-full mb-8 pb-8"></div>
        <div className="space-y-4">
            <div className="h-5 bg-gray-600/50 rounded w-full"></div>
            <div className="h-5 bg-gray-600/50 rounded w-full"></div>
            <div className="h-5 bg-gray-600/50 rounded w-5/6"></div>
            <div className="h-5 bg-gray-600/50 rounded w-1/2 mb-8"></div>
            <div className="h-5 bg-gray-600/50 rounded w-full"></div>
            <div className="h-5 bg-gray-600/50 rounded w-5/6"></div>
        </div>
    </div>
);

const GlobalTrending: React.FC<GlobalTrendingProps> = () => {
  const [trends, setTrends] = useState<Trend[] | null>(null);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [listError, setListError] = useState<string | null>(null);

  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [trendingArticle, setTrendingArticle] = useState<string | null>(null);
  const [isArticleLoading, setIsArticleLoading] = useState<boolean>(false);
  const [articleError, setArticleError] = useState<string | null>(null);


  // Effect to fetch the list of 3 trends
  useEffect(() => {
    const fetchTrends = async () => {
      setIsListLoading(true);
      setListError(null);

      const CACHE_KEY = 'novus_global_trends';
      const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { timestamp, data } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setTrends(data);
            setIsListLoading(false);
            return;
          }
        }
      } catch (e) { console.error("Error reading from cache", e); }

      try {
        const prompt = `Act as a geopolitical and economic analyst. Identify the three most pressing global trending topics right now. For each topic, provide a concise, one-paragraph summary explaining its significance. Focus on topics related to international relations, supply chains, economic shifts, or major policy changes.`;
        
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: trendsSchema,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch trends');
        }

        const result = await response.json();
        
        const parsedResult = JSON.parse(result.text);
        if (parsedResult.trends && parsedResult.trends.length > 0) {
            setTrends(parsedResult.trends.slice(0,3));
            localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: parsedResult.trends.slice(0,3) }));
        } else {
            throw new Error("Invalid response format from AI.");
        }
      } catch (err) {
        console.error("Failed to fetch trending topics:", err);
        setListError("Could not load trending topics. The AI may be experiencing high demand.");
      } finally {
        setIsListLoading(false);
      }
    };

    fetchTrends();
  }, []);

  // Effect to fetch the full article when a trend is selected
  useEffect(() => {
    const fetchTrendingArticle = async () => {
        if (!selectedTrend) return;

        setIsArticleLoading(true);
        setTrendingArticle(null);
        setArticleError(null);

        try {
            const prompt = `You are a world-class investigative journalist for 'Novus Exchange'. Your writing style is clear, insightful, and engaging. Based on the following topic and summary, write a full, in-depth news article of at least 5 paragraphs. The article must be well-structured with a compelling introduction, a detailed body, and a strong conclusion.
            
            IMPORTANT FORMATTING RULES:
            - Do NOT use any markdown (e.g., no '##', '**', '*', '-', or numbered lists).
            - Format the output as clean, plain text.
            - Separate each paragraph with a single newline character ('\\n').
            
            TOPIC: "${selectedTrend.topic}"
            
            SUMMARY: "${selectedTrend.summary}"`;

            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate article');
            }

            const result = await response.json();
            setTrendingArticle(result.text.trim());
        } catch (error) {
            console.error("Failed to generate trending article:", error);
            setArticleError('We are sorry, but there was an error generating the full analysis. Our AI systems may be experiencing high demand. Please try again later.');
        } finally {
            setIsArticleLoading(false);
        }
    };

    fetchTrendingArticle();
  }, [selectedTrend]);

  const handleSelectTrend = (trend: Trend) => {
    setSelectedTrend(trend);
  };

  const handleBackToTrends = () => {
    setSelectedTrend(null);
    setTrendingArticle(null);
    setArticleError(null);
  };
  
  const renderArticleContent = () => {
    if (!trendingArticle) return null;
    return renderMarkdown(trendingArticle);
  };


  if (selectedTrend) {
    return (
        <div className="w-full max-w-7xl mx-auto page-transition-wrapper">
            {isArticleLoading ? (
                <ArticleSkeletonLoader />
            ) : (
            <div className="max-w-4xl mx-auto">
                <button onClick={handleBackToTrends} className="mb-8 text-sm font-semibold text-white hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Trends
                </button>
                <article>
                    <span className="text-cyan-400 uppercase tracking-wider text-sm font-semibold">AI-Generated Analysis</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-8 pb-8 border-b border-white/20">{selectedTrend.topic}</h1>
                    {articleError ? (
                         <p className="text-red-400">{articleError}</p>
                    ) : (
                        <div className="prose prose-lg prose-invert max-w-none text-gray-200">
                            {renderArticleContent()}
                        </div>
                    )}
                </article>
            </div>
            )}
        </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-white mb-4">Global Trending</h2>
      <p className="text-lg text-center text-gray-400 max-w-3xl mx-auto mb-10">
        AI-powered summaries of the most pressing geopolitical and economic topics, refreshed twice daily.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 stagger-fade-in-up">
        {isListLoading ? (
          Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} style={{ transitionDelay: `${index * 100}ms` }} />)
        ) : listError ? (
          <div className="col-span-full text-center py-10"><p className="text-red-400">{listError}</p></div>
        ) : (
          trends?.map((trend, index) => (
            <TrendCard key={index} trend={trend} style={{ transitionDelay: `${index * 100}ms` }} onSelect={() => handleSelectTrend(trend)} />
          ))
        )}
      </div>
    </div>
  );
};

export default GlobalTrending;
