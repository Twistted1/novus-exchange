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
        description: 'The all-in-one creative powerhouse. Generate high-fidelity images, edit video, and leverage our advanced AI chat.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        description: 'End-to-end content automation. Script generation, voice cloning, and automated social scheduling.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        ),
        cta: 'Beta Access',
        status: 'COMING SOON',
        statusColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
        link: '#contact',
        accent: 'blue'
    },
    {
        title: 'Content Hub',
        subtitle: 'Headless CMS',
        description: 'A professional-grade headless CMS designed for speed. Perfect for high-traffic news and media sites.',
        icon: (
            <div className="w-6 h-6 flex items-center justify-center font-bold text-sm bg-emerald-400/20 text-emerald-400 rounded-lg">CH</div>
        ),
        cta: 'View Features',
        status: 'COMING SOON',
        statusColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
        link: '#contact',
        accent: 'emerald'
    },
    {
        title: 'ContentFlow PRO',
        subtitle: 'All-In-One Solution',
        description: 'The ultimate publishing engine. Advanced roles, multi-site management, and dedicated support.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <section id="solutions" className="py-24 px-4 relative overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-4"
                    >
                        Tools & Services
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter"
                    >
                        The Novus <span className="text-red-600">Ecosystem</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed"
                    >
                        Precision tools for the next generation of digital media architects.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -5, 0],
                                rotate: [0, 0.5, 0, -0.5, 0]
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative group h-full"
                        >
                            <GlassCard className={`h-full flex flex-col p-0 overflow-hidden border-white/5 bg-black/40 hover:bg-black/60 transition-all duration-500 rounded-3xl border-t-white/10 shadow-2xl group-hover:glow-shadow-${product.accent}`}>
                                <div className={`h-1 w-full bg-${product.accent}-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="relative">
                                            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-${product.accent}-500/50 transition-all`}>
                                                {product.icon}
                                            </div>
                                        </div>
                                        <div className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${product.statusColor} backdrop-blur-md`}>
                                            {product.status}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="text-lg font-bold text-white tracking-tight mb-0.5 group-hover:text-red-500 transition-colors">
                                            {product.title}
                                        </h3>
                                        {product.subtitle && (
                                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                                {product.subtitle}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow font-light">
                                        {product.description}
                                    </p>

                                    <a
                                        href={product.link}
                                        className={`group/btn relative inline-flex items-center justify-center py-2.5 px-4 overflow-hidden font-bold rounded-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white hover:border-white`}
                                    >
                                        <span className="relative text-[10px] uppercase tracking-[0.2em] text-white group-hover/btn:text-black transition-colors">
                                            {product.cta}
                                        </span>
                                    </a>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
