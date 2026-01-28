"use client";

import React from 'react';

const Hero: React.FC<{ onNavClick: (page: string) => void }> = ({ onNavClick }) => {

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative px-4 pt-20">
      <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl animate-fade-in-up uppercase tracking-tighter leading-tight max-w-5xl mx-auto">
        CUT THROUGH THE NOISE
        <br />
        STAY INFORMED
      </h1>
      <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto drop-shadow-lg animate-fade-in-up font-light delay-200">
        Critical, clear-eyed commentary on the issues shaping our world.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-[400ms]">
        <button
          onClick={() => onNavClick('articles')}
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-md transition-all duration-300 shadow-lg hover:shadow-red-500/40 hover:-translate-y-1 uppercase tracking-wider w-full sm:w-auto"
        >
          Read More
        </button>
        <a
          href="https://www.youtube.com/@NovusExchange/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-10 rounded-md transition-all duration-300 shadow-lg hover:shadow-white/20 hover:-translate-y-1 uppercase tracking-wider w-full sm:w-auto"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path>
          </svg>
          Watch on YouTube
        </a>
      </div>

      <div className="absolute bottom-10 animate-bounce transition-opacity duration-1000 opacity-30">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;