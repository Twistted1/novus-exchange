"use client";

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const About: React.FC = () => {
  const videoId = 'cB2BENj1jaw'; // Starting video from the user's playlist
  const playlistId = 'PL-CfrwN0sygN_N7sflltRA_yb9k3WY9uR'; // The user's playlist ID

  return (
    <section id="about" className="py-24 px-4 w-full relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">
            Our <span className="text-red-600">Mission</span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            People deserve more than just headlines. Novus Exchange was founded to provide the full story, challenging conventional narratives and exposing the complexities of pressing issues.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GlassCard className="max-w-6xl mx-auto overflow-hidden bg-black/40 backdrop-blur-2xl border-white/10 group">
            <div className="grid lg:grid-cols-5 gap-0 items-stretch">
              <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="w-12 h-1 bg-red-600 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Novus Exchange</h3>
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed font-light">
                    Our mission is to inform, provoke thought, and foster discussion by shining a light on the injustices and abuses of power impacting individuals and society.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed font-light italic">
                    "We don't just report the news. We build the engines that power the next generation of media."
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Global Perspectives</span>
                </div>
              </div>

              <div className="lg:col-span-3 bg-black relative aspect-video lg:aspect-auto min-h-[400px]">
                <iframe
                  className="absolute inset-0 w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                  src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1`}
                  title="YouTube video player for Novus Exchange"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>

                {/* Subtle overlay when not hovered */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;