import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 relative z-10">
      <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight leading-tight mb-4 text-white">
          CUT THROUGH THE NOISE
          <br />
          <span className="text-white">STAY INFORMED</span>
        </h1>
        <p className="text-sm md:text-base text-gray-400 font-light mb-8 max-w-2xl leading-relaxed">
          Critical, clear-eyed commentary on the issues shaping our world.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="#articles"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all text-sm tracking-wide uppercase"
          >
            Read More
          </a>
          <a
            href="https://www.youtube.com/@NovusExchange"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-lg transition-all text-sm tracking-wide uppercase flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
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
