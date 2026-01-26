"use client";

import React from 'react';
import GlassCard from './GlassCard';

const About: React.FC = () => {
  const videoId = 'cB2BENj1jaw';
  const playlistId = 'PL-CfrwN0sygN_N7sflltRA_yb9k3WY9uR';

  return (
    <section id="about" className="min-h-screen relative flex items-center justify-center py-24 px-6 w-full z-20">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">About</h2>
        <p className="text-lg text-center text-gray-400 max-w-3xl mx-auto mb-10">
          Novus Exchange is a media powerhouse providing clarity in an era of information overload.
        </p>

        <GlassCard className="overflow-hidden border-white/10 aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?list=${playlistId}&autoplay=0&rel=0`}
            title="Novus Exchange Playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </GlassCard>
      </div>
    </section>
  );
};

export default About;