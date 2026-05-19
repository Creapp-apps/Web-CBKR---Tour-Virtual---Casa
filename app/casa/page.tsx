'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CinematicPreloader from '@/components/CinematicPreloader';
import UniverseBackground from '@/components/UniverseBackground';
import { useCinematicRouter } from '@/hooks/useCinematicRouter';

export default function CasaAtrium() {
    const { cinematicNavigate, isTransitioning } = useCinematicRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // Lógica de Scroll Parallax inmersiva
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
    const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <main ref={containerRef} className="bg-[#05050A] text-white min-h-[200vh] relative selection:bg-[#39FF14] selection:text-black">

            <CinematicPreloader skipLogo={true} />

            <div
                className={`fixed inset-0 bg-black z-[9998] pointer-events-none transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
            ></div>

            {/* 1. SECCIÓN HERO (El Recibidor Biológico Fijo) */}
            <div className="h-screen w-full sticky top-0 flex flex-col items-center justify-center overflow-hidden">

                {/* Fondo del Universo Atrapado en el Parallax */}
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A]/70 to-[#05050A] z-10 pointer-events-none" />
                    <UniverseBackground />
                </motion.div>

                {/* Tipografía Cinematográfica */}
                <motion.div
                    style={{ y: yHero, opacity: opacityHero }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="z-20 text-center flex flex-col items-center px-4 w-full"
                >
                    <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-[#39FF14] mb-8 opacity-50" />

                    <h1 className="text-3xl md:text-7xl font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] leading-tight">
                        Biología.<br />
                        Tecnología.<br />
                        Evolución.
                    </h1>

                    <p className="text-white/50 tracking-widest text-[10px] md:text-sm max-w-xl font-light uppercase leading-relaxed px-4">
                        Bienvenido al epicentro del ecosistema CBKR. Redefiniendo la agricultura regenerativa.
                    </p>

                    <div className="w-px h-16 md:h-24 bg-gradient-to-t from-transparent to-[#39FF14] mt-8 opacity-50" />
                    <p className="mt-4 text-[#39FF14]/50 text-[9px] md:text-xs tracking-[0.3em] font-medium animate-pulse">
                        Sigue Explorando
                    </p>
                </motion.div>
            </div>

            {/* 2. TABLERO DE MANDOS (Contenido que scrollea y oculta el Hero) */}
            <div className="relative z-30 bg-[#05050A] min-h-screen pt-24 pb-32 px-4 md:px-12 xl:px-24 rounded-t-[3rem] md:rounded-t-[4rem] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">

                <div className="max-w-7xl mx-auto">

                    {/* Grilla Holográfica de Módulos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">

                        {/* Tarjeta 1: La Tienda (Sala de Cultivo) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="group cursor-pointer relative"
                            onClick={() => cinematicNavigate('/tienda')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-[#39FF14]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                            <div className="relative h-[26rem] rounded-3xl bg-black border border-white/5 group-hover:border-[#39FF14]/40 overflow-hidden flex flex-col p-8 md:p-10 transition-all duration-700 group-hover:-translate-y-3 shadow-2xl">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#39FF14]/10 rounded-bl-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
                                <div className="flex-1">
                                    <span className="text-[#39FF14] tracking-widest text-[10px] font-bold uppercase mb-3 block opacity-80">Módulo _ 01</span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-4">Sala de Cultivo</h2>
                                    <p className="text-white/50 text-sm leading-relaxed font-light">
                                        Nuestra botica digital. Explora el mapa isométrico para adquirir genéticas exclusivas, enmiendas biológicas e insumos.
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center gap-3 text-white/80 group-hover:text-[#39FF14] transition-colors uppercase tracking-widest text-xs font-bold bg-white/5 w-fit px-5 py-3 rounded-full border border-white/10 group-hover:border-[#39FF14]/30">
                                    Ingresar
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tarjeta 2: Mapa Macro Arquitectura */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="group cursor-pointer relative"
                            onClick={() => cinematicNavigate('/mapa')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                            <div className="relative h-[26rem] rounded-3xl bg-black border border-white/5 group-hover:border-white/30 overflow-hidden flex flex-col p-8 md:p-10 transition-all duration-700 group-hover:-translate-y-3 shadow-2xl">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
                                <div className="flex-1">
                                    <span className="text-white/40 tracking-widest text-[10px] font-bold uppercase mb-3 block">Módulo _ 02</span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-4">Arquitectura</h2>
                                    <p className="text-white/50 text-sm leading-relaxed font-light">
                                        Visualiza el plano isométrico del Complejo Biológico y recorre la fachada de nuestras instalaciones regenerativas de forma macro.
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center gap-3 text-white/80 group-hover:text-white transition-colors uppercase tracking-widest text-xs font-bold bg-white/5 w-fit px-5 py-3 rounded-full border border-white/10 group-hover:border-white/30">
                                    Explorar
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tarjeta 3: Filosofia (Informativa / Futuro Blog) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="group cursor-pointer relative"
                            onClick={() => alert('Próximamente: Manifiesto CBKR')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                            <div className="relative h-[26rem] rounded-3xl bg-black border border-white/5 group-hover:border-cyan-400/40 overflow-hidden flex flex-col p-8 md:p-10 transition-all duration-700 group-hover:-translate-y-3 shadow-2xl">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-bl-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
                                <div className="flex-1">
                                    <span className="text-cyan-400 tracking-widest text-[10px] font-bold uppercase mb-3 block opacity-80">Módulo _ 03</span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-4">La Filosofía</h2>
                                    <p className="text-white/50 text-sm leading-relaxed font-light">
                                        El suelo está vivo. Nuestra ciencia busca nutrir holísticamente a la tierra para que ella nutra y potencialice a la planta.
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center gap-3 text-white/80 group-hover:text-cyan-400 transition-colors uppercase tracking-widest text-xs font-bold bg-white/5 w-fit px-5 py-3 rounded-full border border-white/10 group-hover:border-cyan-400/30">
                                    Conocer Más
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </main>
    );
}
