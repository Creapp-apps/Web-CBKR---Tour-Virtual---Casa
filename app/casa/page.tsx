'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CanvasSequence from '@/components/CanvasSequence';
import StatsCounter from '@/components/StatsCounter';
import FeaturedProducts from '@/components/FeaturedProducts';
import BunkerAssemblyAnimation from '@/components/BunkerAssemblyAnimation';
import MethodManualSection from '@/components/MethodManualSection';
import LibrarySection from '@/components/LibrarySection';
import UniverseBackground from '@/components/UniverseBackground';
import IsometricScene from '@/components/IsometricScene';
import IsometricHotspot from '@/components/IsometricHotspot';
import { useCinematicRouter } from '@/hooks/useCinematicRouter';

gsap.registerPlugin(ScrollTrigger);

const hotspots = [
    {
        id: 'bunker-beds',
        name: 'Camas Bunker',
        description: 'Entorno de Living Soil con volumen ideal para microbiología activa.',
        top: '65%',
        left: '70%',
        mobileTop: '73%',
        mobileLeft: '50%',
        color: '#39FF14',
    },
    {
        id: 'led-lights',
        name: 'Iluminación Avanzada',
        description: 'Espectro lumínico óptimo para desarrollo vegetativo y floración.',
        top: '30%',
        left: '20%',
        mobileTop: '25%',
        mobileLeft: '50%',
        color: '#00FFFF',
    },
    {
        id: 'nutrients',
        name: 'Insumos y Nutrientes',
        description: 'Nutrición biológica y enmiendas minerales seleccionadas.',
        top: '35%',
        left: '50%',
        mobileTop: '48%',
        mobileLeft: '48%',
        color: '#FF00FF',
    }
];

export default function CasaAtrium() {
    const { cinematicNavigate, isTransitioning } = useCinematicRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollLayerRef = useRef<HTMLDivElement>(null);
    const atriumRef = useRef<HTMLDivElement>(null);

    // States for assets preloading
    const [loadPercent, setLoadPercent] = useState(0);
    const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
    
    // Mobile viewport state & interactive details active state
    const [isMobile, setIsMobile] = useState(false);
    const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Modern state for added product toast notifications
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Diagnostics System for Live Inspection
    const [debugInfo, setDebugInfo] = useState({
        scrollProgress: 0,
        sectionOpacity: '0',
        childCount: 0,
        childrenStates: [] as string[]
    });

    useEffect(() => {
        if (!isAssetsLoaded) return;
        const handleScroll = () => {
            const mainEl = document.querySelector('main') as HTMLElement;
            const progress = mainEl ? parseFloat(mainEl.getAttribute('data-scroll-progress') || '0') : 0;

            const sections = [
                { id: 'Concepto (sec-1)', sel: '.scrolly-sec-1' },
                { id: 'Productos (sec-products)', sel: '.scrolly-sec-products' },
                { id: 'Manual (sec-manual)', sel: '.scrolly-sec-manual' },
                { id: 'Biblioteca (sec-library)', sel: '.scrolly-sec-library' },
                { id: 'Armar Sala (sec-build)', sel: '.scrolly-sec-build-room' }
            ];

            const childrenStates = sections.map((sec) => {
                const el = document.querySelector(sec.sel) as HTMLElement;
                if (!el) return `${sec.id}: NO ENCONTRADO EN EL DOM`;
                const style = window.getComputedStyle(el);
                return `${sec.id}: Opacity=${style.opacity}, PointerEvents=${style.pointerEvents}`;
            });

            setDebugInfo({
                scrollProgress: progress,
                sectionOpacity: 'N/A',
                childCount: sections.length,
                childrenStates
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Force update on load & resize
        const timer = setTimeout(handleScroll, 1000);
        window.addEventListener('resize', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            clearTimeout(timer);
        };
    }, [isAssetsLoaded]);

    useGSAP(() => {
        if (!isAssetsLoaded || !containerRef.current || !scrollLayerRef.current || !atriumRef.current) return;

        // --- 1. HERO OVERLAY FADE ---
        // Fades out from 0% scroll to 8% scroll trigger
        ScrollTrigger.create({
            trigger: scrollLayerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                const heroOverlay = document.getElementById('hero-scrollytelling-overlay');
                const p = self.progress;

                // Inject global scroll progress attribute into main for debug
                const mainEl = document.querySelector('main') as HTMLElement;
                if (mainEl) {
                    mainEl.setAttribute('data-scroll-progress', p.toString());
                }

                if (heroOverlay) {
                    const opacity = Math.max(0, 1 - p / 0.08);
                    heroOverlay.style.opacity = opacity.toString();
                    heroOverlay.style.pointerEvents = opacity > 0.01 ? 'auto' : 'none';
                }
            }
        });

        // --- 2. DARK OVERLAY TRIGGER FOR STATS ---
        // Turns background darker (0.8 opacity) during Stats phase (60% to 69%)
        ScrollTrigger.create({
            trigger: scrollLayerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                const overlay = document.getElementById('scrollytelling-dark-overlay');
                if (overlay) {
                    const p = self.progress;
                    const enter = 0.52;
                    const leave = 0.72;
                    const fadeRange = 0.04;
                    let opacity = 0;

                    if (p >= enter - fadeRange && p <= enter) {
                        opacity = (p - (enter - fadeRange)) / fadeRange * 0.82;
                    } else if (p > enter && p < leave) {
                        opacity = 0.82;
                    } else if (p >= leave && p <= leave + fadeRange) {
                        opacity = 0.82 * (1 - (p - leave) / fadeRange);
                    }

                    overlay.style.opacity = opacity.toString();
                }
            }
        });

        // --- 3. SECTIONS CHOREOGRAPHY ---
        const sectionsConfig: Array<{ selector: string; enter: number; leave: number; type: string; persist?: boolean }> = [
            { selector: '.scrolly-sec-1', enter: 0.10, leave: 0.18, type: 'fade-up' },
            { selector: '.scrolly-sec-products', enter: 0.24, leave: 0.32, type: 'fade-up-simple' },
            { selector: '.scrolly-sec-manual', enter: 0.38, leave: 0.46, type: 'fade-up' },
            { selector: '.scrolly-sec-library', enter: 0.52, leave: 0.72, type: 'fade-up-simple' },
            { selector: '.scrolly-sec-build-room', enter: 0.74, leave: 0.82, type: 'fade-up' },
        ];

        const WINDOW = 0.03; // Window of scrolling percentage for entry/exit animation

        sectionsConfig.forEach((sec) => {
            const elements = gsap.utils.toArray(`${sec.selector} .anim-child`);
            const tl = gsap.timeline({ paused: true });

            if (elements.length > 0) {
                if (sec.type === 'fade-up') {
                    tl.from(elements, { y: 60, opacity: 0, stagger: 0.15, duration: 1.0, ease: 'power3.out' });
                } else if (sec.type === 'fade-up-simple') {
                    tl.from(elements, { y: 40, opacity: 0, duration: 1.0, ease: 'power3.out' });
                } else if (sec.type === 'stagger-up') {
                    tl.from(elements, { y: 70, opacity: 0, stagger: 0.18, duration: 0.9, ease: 'power2.out' });
                } else if (sec.type === 'scale-up') {
                    tl.from(elements, { y: 50, scale: 0.85, opacity: 0, stagger: 0.15, duration: 1.1, ease: 'power3.out' });
                }
            }

            const updateOpacity = (progress: number) => {
                const isPersist = sec.persist === true;
                if (progress >= sec.enter - WINDOW && (isPersist || progress <= sec.leave + WINDOW)) {
                    let localProgress = 0;
                    if (progress < sec.enter) {
                        localProgress = (progress - (sec.enter - WINDOW)) / WINDOW;
                    } else if (!isPersist && progress > sec.leave) {
                        localProgress = 1 - ((progress - sec.leave) / WINDOW);
                    } else {
                        localProgress = 1;
                    }
                    
                    if (elements.length > 0) {
                        tl.progress(localProgress);
                    }
                    
                    const el = document.querySelector(sec.selector) as HTMLElement;
                    if (el) {
                        el.style.opacity = localProgress.toString();
                        el.style.pointerEvents = localProgress > 0.5 ? 'auto' : 'none';
                    }
                } else {
                    if (elements.length > 0) {
                        tl.progress(0);
                    }
                    const el = document.querySelector(sec.selector) as HTMLElement;
                    if (el) {
                        el.style.opacity = '0';
                        el.style.pointerEvents = 'none';
                    }
                }
            };

            ScrollTrigger.create({
                trigger: scrollLayerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (self) => updateOpacity(self.progress)
            });

            // Force immediate synchronous layout setup to override classes
            updateOpacity(0);
        });

        // --- 4. ATRIUM & UNIVERSE BACKGROUND FADE-IN (Fase 3: 85% → 100%) ---
        // Uses the same progress-based pattern as sections above so 85% means exactly 85% scroll.
        // The percentage-based start/end ('85% top') doesn't map linearly to scroll progress,
        // so we control the fade manually via onUpdate.
        ScrollTrigger.create({
            trigger: scrollLayerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                const p = self.progress;
                const atrium = atriumRef.current;
                const universe = document.querySelector('.universe-background-wrapper') as HTMLElement;

                // Fade range: 0.85 → 1.0 (maps to 0..1 locally)
                const ENTER = 0.85;
                const LEAVE = 1.0;
                let localProgress = 0;

                if (p >= ENTER && p <= LEAVE) {
                    localProgress = (p - ENTER) / (LEAVE - ENTER); // 0 → 1
                } else if (p > LEAVE) {
                    localProgress = 1;
                }

                if (atrium) {
                    atrium.style.opacity = localProgress.toString();
                    atrium.style.filter = `blur(${(1 - localProgress) * 15}px)`;
                    atrium.style.transform = `translateY(${(1 - localProgress) * 40}px)`;
                    atrium.style.pointerEvents = localProgress > 0.8 ? 'auto' : 'none';
                }

                if (universe) {
                    universe.style.opacity = localProgress.toString();
                    universe.style.filter = `blur(${(1 - localProgress) * 10}px)`;
                }
            }
        });

    }, { scope: containerRef, dependencies: [isAssetsLoaded] });

    return (
        <main ref={containerRef} className="bg-[#05050A] text-white relative select-none overflow-x-hidden selection:bg-[#39FF14] selection:text-black">
            
            {/* Cinematic Preloader for assets loading */}
            {!isAssetsLoaded && (
                <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none">
                    <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                        <img
                            src="/logocbkr.png"
                            alt="CBKR Logo Base"
                            className="absolute inset-0 w-full h-full object-contain opacity-25 grayscale brightness-50"
                        />
                        <img
                            src="/logocbkr.png"
                            alt="CBKR Logo Active"
                            className="absolute inset-0 w-full h-full object-contain"
                            style={{
                                filter: 'brightness(0) invert(1)',
                                clipPath: `inset(${100 - loadPercent}% 0 0 0)`,
                                transition: 'clip-path 0.1s linear'
                            }}
                        />
                    </div>
                    {/* Modern tech progress bar */}
                    <div className="w-48 h-[2px] bg-white/10 overflow-hidden relative mb-2">
                        <div 
                            className="h-full bg-white transition-all duration-100 ease-out" 
                            style={{ width: `${loadPercent}%` }}
                        />
                    </div>
                    <div className="text-[10px] tracking-[0.25em] font-semibold text-white/50 uppercase">
                        Cargando Experiencia CBKR _ {loadPercent}%
                    </div>
                </div>
            )}

            {/* Cinematic Router Overlay */}
            <div
                className={`fixed inset-0 bg-black z-[9998] pointer-events-none transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
            ></div>
            {/* FIXED LAYER FOR BACKGROUND EFFECTS */}
            <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
                {/* 1. Canvas Sequence Scrollytelling (Video) */}
                <CanvasSequence 
                    onProgress={(p) => setLoadPercent(p)}
                    onComplete={() => setIsAssetsLoaded(true)}
                />

                {/* 2. Universe Background (3D Organics) - Blended with the canvas */}
                <div className="universe-background-wrapper absolute inset-0 w-full h-full opacity-0 z-[1] pointer-events-none transition-opacity duration-700">
                    <UniverseBackground />
                </div>

                {/* 3. Dark Overlay for Stats Section */}
                <div id="scrollytelling-dark-overlay" className="absolute inset-0 bg-black opacity-0 z-[2] pointer-events-none transition-opacity duration-500" />
            </div>

            {/* SCROLLYTELLING CONTAINER LAYER (780vh height to span scrollytelling phases) */}
            <div ref={scrollLayerRef} className="scrollytelling-layer relative w-full h-[780vh] z-10 pointer-events-none">
                
                {/* --- PHASE 1: HERO SCROLLYTELLING OVERLAY --- */}
                <div 
                    id="hero-scrollytelling-overlay" 
                    className="fixed inset-0 z-20 flex items-center justify-center text-center transition-opacity duration-500 pointer-events-none"
                    style={{ opacity: isAssetsLoaded ? 1 : 0 }}
                >
                    <div className="flex flex-col items-center justify-center max-w-4xl px-6">
                        <div className="flex items-center justify-center gap-6 mb-6">
                            <h1 className="logo-main text-5xl md:text-8xl font-black uppercase tracking-tight text-white">
                                método cbkr.
                            </h1>
                            <div className="logo-star w-10 h-10 md:w-16 md:h-16 text-white animate-spin" style={{ animationDuration: '30s' }}>
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <g fill="currentColor">
                                        <path d="M48 5 L52 48 L95 52 L52 52 L48 95 L48 52 L5 48 L48 48 Z" />
                                        <path d="M48 5 L52 48 L95 52 L52 52 L48 95 L48 52 L5 48 L48 48 Z" transform="rotate(45 50 50)" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-white/60 tracking-[0.3em] font-medium text-xs md:text-sm uppercase">suelo vivo</span>
                            <span className="text-[#39FF14]/80 tracking-[0.2em] font-bold text-[10px] md:text-xs uppercase">cultivo natural, sin químicos</span>
                        </div>
                        
                        <div className="absolute bottom-12 flex flex-col items-center gap-3">
                            <span className="text-white/40 tracking-[0.25em] text-[9px] uppercase animate-pulse">Desliza para Iniciar</span>
                            <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* --- SECTION 1: CONCEPTO / ARMADO (10% - 20%) --- */}
                <div className="scrolly-sec-1 fixed inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0">
                    <div className="w-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <span className="text-[10px] tracking-[0.3em] text-[#39FF14] font-bold uppercase mb-4 block anim-child">001. EL PROCESO</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none mb-6 uppercase anim-child">
                                Nosotros te<br />guiamos en todo.
                            </h2>
                            <p className="text-white/60 text-base leading-relaxed mb-6 font-medium anim-child">
                                Te acompañamos paso a paso en el proceso del armado de tu suelo vivo. Diseñamos el hábitat perfecto para colonizar microbiología benéfica y potenciar tus raíces.
                            </p>
                            <div className="flex gap-4 items-center anim-child">
                                <span className="text-xs font-bold text-[#39FF14] tracking-widest uppercase">MÉTODO CBKR SOIL</span>
                                <div className="h-px w-16 bg-white/20" />
                            </div>
                        </div>
                        <div className="anim-child w-full">
                            <BunkerAssemblyAnimation />
                        </div>
                    </div>
                </div>

                {/* --- SECTION: PRODUCTOS DESTACADOS (25%) --- */}
                <div className="scrolly-sec-products fixed inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0">
                    <FeaturedProducts />
                </div>

                {/* --- SECTION: MANUAL CBKR (41%) --- */}
                <div className="scrolly-sec-manual fixed inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0">
                    <MethodManualSection />
                </div>

                {/* --- SECTION: BIBLIOTECA DE CONTENIDOS (52% a 72%) --- */}
                <div className="scrolly-sec-library fixed inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0">
                    <LibrarySection />
                </div>

                {/* --- SECTION 5: ARMA TU SALA CBKR (75%) --- */}
                <div className="scrolly-sec-build-room fixed inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0">
                    <div className="w-full max-w-4xl mx-auto px-6 text-center">
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <span className="text-[10px] tracking-[0.35em] text-[#39FF14] font-black uppercase mb-4 block anim-child">005. CONFIGURACIÓN</span>
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none mb-6 uppercase anim-child">
                                ARMA TU SALA CBKR
                            </h2>
                            <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 font-medium anim-child">
                                Tenemos todo lo necesario para montar tu sistema de suelo vivo.
                            </p>
                            <div className="flex justify-center items-center gap-4 anim-child">
                                <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#39FF14]" />
                                <span className="text-xs font-bold text-white/50 tracking-[0.3em] uppercase">Ecosistema Regenerativo</span>
                                <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#39FF14]" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- PHASE 3: INTERACTIVE CULTIVATION ROOM LAYOUT --- */}
            <div 
                ref={atriumRef} 
                className="fixed bottom-0 left-0 z-30 bg-[#0B0B1A] text-white w-full h-screen overflow-hidden border-t border-white/10 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
                style={{ opacity: 0, pointerEvents: 'none' }}
            >
                <IsometricScene backgroundImage={isMobile ? "/isometricoresponsive.jpeg" : "/TIENDA4K.jpg"} featherEdges={true} interactiveHover={false}>
                    {hotspots.map((spot) => (
                        <IsometricHotspot
                            key={spot.id}
                            top={isMobile ? (spot.mobileTop || spot.top) : spot.top}
                            left={isMobile ? (spot.mobileLeft || spot.left) : spot.left}
                            color={spot.color}
                            pulse={true}
                            onClick={() => {
                                if (isMobile) {
                                    setActiveHotspotId(spot.id);
                                }
                            }}
                        >
                            {!isMobile && (
                                <div className="flex flex-col gap-2 relative text-left">
                                    <h2 className="text-xl tracking-wide font-black uppercase flex items-center gap-3" style={{ color: spot.color }}>
                                        {spot.name}
                                    </h2>
                                    <p className="text-white/80 text-sm leading-relaxed mb-3">
                                        {spot.description}
                                    </p>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setToastMessage(`Añadido: ${spot.name}`);
                                            setTimeout(() => setToastMessage(null), 3000);
                                        }}
                                        className="w-full py-3 bg-white/5 hover:bg-white/20 transition-all rounded-xl border border-white/10 text-white text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 group backdrop-blur-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.1)] cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Agregar al Carrito
                                    </button>
                                </div>
                            )}
                        </IsometricHotspot>
                    ))}
                </IsometricScene>

                {/* Bottom Sheet Drawer for Mobile Hotspots (Hi-Fi Touch UX) */}
                <AnimatePresence>
                    {isMobile && activeHotspotId && (() => {
                        const spot = hotspots.find(s => s.id === activeHotspotId);
                        if (!spot) return null;
                        return (
                            <>
                                {/* Translucent backdrop filter overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm pointer-events-auto"
                                    onClick={() => setActiveHotspotId(null)}
                                />
                                {/* Slide-up panel */}
                                <motion.div
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                                    className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B1A]/95 backdrop-blur-3xl border-t border-white/10 rounded-t-3xl p-6 flex flex-col gap-4 text-left shadow-[0_-20px_50px_rgba(0,0,0,0.9)] pb-12 pointer-events-auto"
                                >
                                    {/* Handle bar decor */}
                                    <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-2" />
                                    
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-2xl tracking-wide font-black uppercase flex items-center gap-3" style={{ color: spot.color }}>
                                            {spot.name}
                                        </h2>
                                        <button 
                                            onClick={() => setActiveHotspotId(null)}
                                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    
                                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                                        {spot.description}
                                    </p>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveHotspotId(null);
                                            setToastMessage(`Añadido: ${spot.name}`);
                                            setTimeout(() => setToastMessage(null), 3000);
                                        }}
                                        className="w-full py-4 bg-[#39FF14] hover:bg-[#39FF14]/90 transition-all rounded-2xl text-black text-xs font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.3)] cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Agregar al Carrito
                                    </button>
                                </motion.div>
                            </>
                        );
                    })()}
                </AnimatePresence>

                {/* High fidelity toast notification banner */}
                <AnimatePresence>
                    {toastMessage && (
                        <motion.div 
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                            className="fixed bottom-10 left-6 right-6 md:left-10 md:right-auto z-50 px-6 py-4 bg-black/90 border border-[#39FF14] text-white rounded-2xl shadow-[0_10px_45px_rgba(57,255,20,0.25)] backdrop-blur-2xl flex items-center gap-4 font-sans border-l-4"
                        >
                            <div className="w-8 h-8 rounded-full bg-[#39FF14]/20 flex items-center justify-center text-[#39FF14] font-black text-sm">
                                ✓
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#39FF14]">Sistema CBKR</span>
                                <span className="text-sm font-bold tracking-wide uppercase text-white/90">{toastMessage}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Diagnostic Console Float Panel */}
            <div className="fixed top-4 right-4 z-[999] hidden md:flex bg-black/90 border border-[#39FF14]/40 p-4 rounded-xl text-[10px] font-mono text-[#39FF14] w-80 shadow-[0_0_30px_rgba(57,255,20,0.15)] pointer-events-none select-none flex flex-col gap-1">
                <div className="font-bold text-[#39FF14] mb-2 uppercase border-b border-[#39FF14]/20 pb-1 flex justify-between">
                    <span>CBKR Diagnostic OS</span>
                    <span className="animate-pulse">● LIVE</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-white/40">Global Scroll:</span>
                    <span>{(debugInfo.scrollProgress * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-white/40">Products Section Opacity:</span>
                    <span>{debugInfo.sectionOpacity}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-white/40">Total anim-children:</span>
                    <span>{debugInfo.childCount}</span>
                </div>
                <div className="mt-2 border-t border-white/10 pt-2 flex flex-col gap-1 max-h-40 overflow-y-auto">
                    {debugInfo.childrenStates.map((state, idx) => (
                        <div key={idx} className="text-white/70">{state}</div>
                    ))}
                </div>
            </div>

            {/* Custom fonts and styling directly embedded for high fidelity */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
                
                .logo-main {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    letter-spacing: -0.03em;
                    text-shadow: 0 10px 40px rgba(0,0,0,0.5);
                }
            `}</style>
        </main>
    );
}
