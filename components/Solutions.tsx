"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

interface Product {
    title: string;
    subtitle?: string;
    description: string;
    icon: React.ReactNode;
    cta: string;
    status: string;
    statusColor: string;
    link: string;
    accent: string;
}

const products: Product[] = [
    {
        title: 'AI Media Suite',
        description: 'The all-in-one creative powerhouse. Generate high-fidelity images, edit video, and leverage our advanced AI chat for content ideation.',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        cta: 'Join Waitlist',
        status: 'COMING SOON',
        statusColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
        link: '#contact',
        accent: 'purple'
    },
    {
        title: 'Media Hub Enterprise',
        description: 'End-to-end content automation. Script generation, voice cloning in 30+ languages, and automated social scheduling.',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        ),
        cta: 'Request Beta Access',
        status: 'COMING SOON',
        statusColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
        link: '#contact',
        accent: 'blue'
    },
    {
        title: 'Content Hub',
        subtitle: 'Headless CMS',
        description: 'A professional-grade headless CMS designed for speed and flexibility. Perfect for high-traffic news and media sites.',
        icon: (
            <div className="w-8 h-8 flex items-center justify-center font-bold text-lg bg-emerald-400/20 text-emerald-400 rounded-lg">CH</div>
        ),
        cta: 'View Features',
        status: 'COMING SOON',
        statusColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
        link: '#contact',
        accent: 'emerald'
    },
    {
        title: 'ContentFlow PRO',
        subtitle: 'Your All-In-One Solution',
        description: 'The ultimate publishing engine. Advanced roles, multi-site management, and dedicated support for large-scale organizations.',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        cta: 'Contact Sales',
        status: 'COMING SOON',
        statusColor: 'text-red-400 border-red-400/30 bg-red-400/10',
        link: '#contact',
        accent: 'red'
    }
];

export default function Solutions() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="solutions" className="py-32 px-4 relative overflow-hidden bg-black">
            {/* Dynamic Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#000_100%)]" />
                <AnimatePresence>
                    {hoveredIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 bg-gradient-to-br from-${products[hoveredIndex].accent}-500/10 to-transparent blur-[120px]`}
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-6"
                    >
                        Digital Infrastructure
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter"
                    >
                        The Novus <span className="text-red-600">Ecosystem</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Advanced tools for the next generation of digital architects and media visionaries.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative group"
                        >
                            <GlassCard className="h-full flex flex-col p-0 overflow-hidden border-white/5 bg-black/40 hover:bg-black/60 transition-all duration-500 rounded-[2rem] border-t-white/10 shadow-2xl">
                                {/* Header Decoration */}
                                <div className={`h-1.5 w-full bg-gradient-to-r from-transparent via-${product.accent}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                                {product.icon}
                                            </div>
                                            <div className={`absolute -inset-1 bg-${product.accent}-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />
                                        </div>
                                        <div className={`text-[10px] font-bold px-3 py-1 rounded-full border ${product.statusColor} backdrop-blur-md`}>
                                            {product.status}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-red-500 transition-colors duration-300">
                                            {product.title}
                                        </h3>
                                        {product.subtitle && (
                                            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                                                {product.subtitle}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-grow font-light">
                                        {product.description}
                                    </p>

                                    <a
                                        href={product.link}
                                        className="group/btn relative inline-flex items-center justify-center p-4 overflow-hidden font-bold rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white hover:border-white shadow-lg"
                                    >
                                        <span className="relative text-xs uppercase tracking-[0.2em] text-white group-hover/btn:text-black transition-colors">
                                            {product.cta}
                                        </span>
                                    </a>
                                </div>

                                {/* Background Glow */}
                                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${product.accent}-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
