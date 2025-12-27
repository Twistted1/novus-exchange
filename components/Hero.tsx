import React from 'react';
import { Page } from '../types';

interface HeroProps {
  onNavClick: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavClick }) => {

  return (
    <div className="text-center relative">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up">
        CUT THROUGH THE NOISE
        <br />
        STAY INFORMED
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Critical, clear-eyed commentary on the issues shaping our world.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={() => onNavClick(Page.Articles)}
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 uppercase tracking-wider w-full sm:w-auto"
        >
          Read More
        </button>
        <a
          href="https://www.youtube.com/@NovusExchange/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-white/20 hover:-translate-y-1 uppercase tracking-wider w-full sm:w-auto"
        >
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
             <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path>
           </svg>
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default Hero;