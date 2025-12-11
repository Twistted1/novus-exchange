import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 pt-24">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-6 text-white">
          Cut Through The Noise
          <br />
          <span className="text-white">Stay Informed</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light mb-10 max-w-2xl leading-relaxed">
          Critical, clear-eyed commentary on the issues shaping our world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#articles"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors text-sm tracking-wide uppercase shadow-sm"
          >
            Read More
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-md transition-colors text-sm tracking-wide uppercase flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
