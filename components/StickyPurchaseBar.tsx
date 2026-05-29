'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyPurchaseBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show bar after scrolling past 600px (past the Hero section)
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl h-16 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_20px_rgba(255,255,255,0.03)] z-50 px-4 md:px-8 flex items-center justify-between overflow-hidden"
                >
                    {/* Left: CBKR Branding & Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-black to-neutral-900 border border-white/10 flex items-center justify-center">
                            <span className="text-brand-cream text-xs font-black select-none">★</span>
                        </div>
                        <div className="hidden sm:block text-left">
                            <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase block leading-none mb-0.5">
                                Experiencia CBKR
                            </span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider block leading-none">
                                Cultivo Living Soil
                            </span>
                        </div>
                    </div>

                    {/* Middle: Highlight or Promo */}
                    <div className="hidden lg:flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[10px] text-cyan-400 tracking-widest uppercase font-bold">
                            Envío Gratis en Kits Bunker
                        </span>
                    </div>

                    {/* Right: Quick Conversion Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scrollToSection('arma-tu-sala')}
                            className="px-4 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all text-[9.5px] uppercase font-bold tracking-widest cursor-pointer bg-white/5 hover:bg-white/10"
                        >
                            Armá tu bunker
                        </button>
                        
                        <a
                            href="https://cbkr.tiendanube.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full bg-brand-cream hover:bg-white text-brand-gray transition-all text-[9.5px] uppercase font-black tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-none cursor-pointer flex items-center gap-1.5"
                        >
                            <span>Tienda Oficial</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
