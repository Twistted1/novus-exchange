import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 relative z-10">
      <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight mb-6 text-white drop-shadow-2xl">
          CUT THROUGH THE NOISE
          <br />
          <span className="text-white">STAY INFORMED</span>
        </h1>
        <p className="text-base md:text-lg text-gray-300 font-light mb-10 max-w-2xl leading-relaxed">
          Critical, clear-eyed commentary on the issues shaping our world.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="#articles"
            className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-full transition-all text-base tracking-widest uppercase shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.7)] hover:scale-105"
          >
            Read More
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-black py-4 px-10 rounded-full transition-all text-base tracking-widest uppercase flex items-center justify-center gap-3 hover:scale-105"
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
