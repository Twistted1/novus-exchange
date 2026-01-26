"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative px-4 pt-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
      >
        CUT THROUGH THE NOISE
        <br />
        STAY INFORMED
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-sm md:text-base tracking-[0.3em] text-cyan-400 font-medium mb-8"
      >
        AI-POWERED RESEARCH ASSISTANT
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <a
          href="#about"
          className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-lg shadow-white/10"
        >
          EXPLORE MISSION
        </a>
      </motion.div>

      <div className="absolute bottom-10 animate-bounce">
        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;