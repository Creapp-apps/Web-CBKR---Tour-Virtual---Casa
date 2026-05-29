'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FeaturedProducts from '@/components/FeaturedProducts';
import BunkerAssemblyAnimation from '@/components/BunkerAssemblyAnimation';
import MethodManualSection from '@/components/MethodManualSection';
import LibrarySection from '@/components/LibrarySection';
import UniverseBackground from '@/components/UniverseBackground';
import StickyPurchaseBar from '@/components/StickyPurchaseBar';
import CinematicPreloader from '@/components/CinematicPreloader';
import { useCinematicRouter } from '@/hooks/useCinematicRouter';

gsap.registerPlugin(ScrollTrigger);

// StepConfigurator Catalog Types
interface BunkerOption {
    id: string;
    name: string;
    capacity: number;
    price: number;
    image: string;
    dimensions: string;
    yield: string;
    desc: string;
}

interface SubstrateOption {
    id: string;
    name: string;
    price: number;
    image: string;
    desc: string;
    volume: number;
}

interface AdditiveOption {
    id: string;
    name: string;
    price: number;
    image: string;
    desc: string;
    impact: string;
}

// Configurator Catalog Data
const bunkers: BunkerOption[] = [
    {
        id: 'bunker-xs',
        name: 'Bunker XS',
        capacity: 50,
        price: 75000,
        image: '/camas/50L.png',
        dimensions: '50 x 50 x 30 cm',
        yield: '75 - 100g',
        desc: 'Optimizado para armarios pequeños de 60x60 y micro-cultivo urbano.'
    },
    {
        id: 'bunker-s',
        name: 'Bunker S',
        capacity: 250,
        price: 180000,
        image: '/camas/250L.png',
        dimensions: '80 x 80 x 45 cm',
        yield: '350 - 500g',
        desc: 'El estándar óptimo recomendado para cultivadores personales residenciales.'
    },
    {
        id: 'bunker-m',
        name: 'Bunker M',
        capacity: 530,
        price: 320000,
        image: '/camas/530L.png',
        dimensions: '120 x 120 x 45 cm',
        yield: '700 - 1000g',
        desc: 'Para cultivadores avanzados con alta densidad de siembra y gran volumen radicular.'
    },
    {
        id: 'bunker-l',
        name: 'Bunker L',
        capacity: 700,
        price: 450000,
        image: '/camas/700L.png',
        dimensions: '150 x 150 x 45 cm',
        yield: '1100 - 1500g',
        desc: 'El atrio biológico definitivo. Recrea con absoluta precisión un suelo forestal virgen.'
    }
];

const substrates: SubstrateOption[] = [
    {
        id: 'coco-premium',
        name: 'Fibra de Coco Premium',
        price: 22000,
        image: '/productos/Copy of Foto producto Web_bolsa verde (1).png',
        desc: 'Sustrato de coco estructurado y lavado. Aporta una excelente oxigenación y aireación al sistema radicular.',
        volume: 25
    },
    {
        id: 'kashi-mix',
        name: 'Kashi Mix Activo',
        price: 28000,
        image: '/products/kashi_mix_25l.png',
        desc: 'Sustrato biológicamente potenciado y pre-inoculado con Bokashi. Estimula un crecimiento explosivo de raíces y hongos benéficos.',
        volume: 25
    }
];

const additives: AdditiveOption[] = [
    {
        id: 'bokashi',
        name: 'Bokashi Inoculante 5L',
        price: 12500,
        image: '/productos/baldes_kashi 5lt (1).png',
        desc: 'Inóculo orgánico de microorganismos eficientes. Acelera el reciclaje de nutrientes y el metabolismo biológico.',
        impact: '+40% Actividad Microbiana'
    },
    {
        id: 'biochar',
        name: 'Biochar Premium 5L',
        price: 9800,
        image: '/productos/baldes_biochar 5lt (1).png',
        desc: 'Carbón vegetal activo que actúa como una esponja biológica reteniendo agua, minerales y albergando hongos.',
        impact: '+30 meq/100g Intercambio Catiónico'
    },
    {
        id: 'gypsum',
        name: 'Gypsum Mineral 5L',
        price: 8500,
        image: '/productos/baldes_gypsum 5lt (1).png',
        desc: 'Aporte puro de Calcio y Azufre solubles sin alterar el pH del suelo vivo. Mejora la agregación física del sustrato.',
        impact: 'Aporte de Calcio y Azufre'
    },
    {
        id: 'kelp',
        name: 'Alga Kelp Premium 1Kg',
        price: 15000,
        image: '/products/alga_kelp_1kg.png',
        desc: 'Harina de algas marinas del Atlántico Norte. Cargada de más de 60 minerales y hormonas naturales de crecimiento radicular.',
        impact: 'Estimulación Hormonal Natural'
    }
];

export default function CasaAtrium() {
    const { cinematicNavigate, isTransitioning } = useCinematicRouter();
    const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // StepConfigurator States
    const [activeStep, setActiveStep] = useState(1);
    const [selectedBunker, setSelectedBunker] = useState<BunkerOption>(bunkers[1]); // Default to Bunker S
    const [selectedSubstrate, setSelectedSubstrate] = useState<SubstrateOption | null>(null);
    const [selectedAdditives, setSelectedAdditives] = useState<AdditiveOption[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAssetsLoaded(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll trigger fade-in animations for editorial sections
    useGSAP(() => {
        if (!isAssetsLoaded) return;

        const fadeEls = gsap.utils.toArray('.fade-in-scroll');
        fadeEls.forEach((el: any) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 35 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }, [isAssetsLoaded]);

    // Dynamic specs calculations
    const totalSoilVolume = selectedBunker.capacity + (selectedSubstrate ? selectedSubstrate.volume : 0);
    
    let microbialIndex = 25;
    if (selectedSubstrate?.id === 'kashi-mix') microbialIndex += 35;
    if (selectedAdditives.some(a => a.id === 'bokashi')) microbialIndex += 40;
    microbialIndex = Math.min(microbialIndex, 100);

    let cationExchange = 55;
    if (selectedAdditives.some(a => a.id === 'biochar')) cationExchange += 30;
    if (selectedAdditives.some(a => a.id === 'kelp')) cationExchange += 15;

    const totalPrice = selectedBunker.price + 
                       (selectedSubstrate ? selectedSubstrate.price : 0) + 
                       selectedAdditives.reduce((sum, item) => sum + item.price, 0);

    let baseYieldMin = 0;
    let baseYieldMax = 0;
    if (selectedBunker.id === 'bunker-xs') { baseYieldMin = 75; baseYieldMax = 100; }
    else if (selectedBunker.id === 'bunker-s') { baseYieldMin = 350; baseYieldMax = 500; }
    else if (selectedBunker.id === 'bunker-m') { baseYieldMin = 700; baseYieldMax = 1000; }
    else if (selectedBunker.id === 'bunker-l') { baseYieldMin = 1100; baseYieldMax = 1500; }

    const yieldMultiplier = 1 + (selectedAdditives.length * 0.05) + (selectedSubstrate?.id === 'kashi-mix' ? 0.05 : 0);
    const finalYieldMin = Math.round(baseYieldMin * yieldMultiplier);
    const finalYieldMax = Math.round(baseYieldMax * yieldMultiplier);

    // Determine current step visual preview image
    let currentPreviewImage = selectedBunker.image;
    if (activeStep === 2 && selectedSubstrate) {
        currentPreviewImage = selectedSubstrate.image;
    } else if (activeStep === 3 && selectedAdditives.length > 0) {
        currentPreviewImage = selectedAdditives[selectedAdditives.length - 1].image;
    }

    const handleAdditiveToggle = (additive: AdditiveOption) => {
        if (selectedAdditives.some(a => a.id === additive.id)) {
            setSelectedAdditives(selectedAdditives.filter(a => a.id !== additive.id));
        } else {
            setSelectedAdditives([...selectedAdditives, additive]);
        }
    };

    const handleWhatsAppCheckout = () => {
        const text = `¡Hola CBKR! He armado mi Sala de Cultivo Orgánico a medida desde el configurador con los siguientes detalles:\n\n` +
            `• Ecosistema Base: ${selectedBunker.name} (${selectedBunker.capacity}L)\n` +
            (selectedSubstrate ? `• Sustrato: ${selectedSubstrate.name} (${selectedSubstrate.volume}L)\n` : '• Sustrato: Ninguno\n') +
            (selectedAdditives.length > 0 ? `• Enmiendas y Microbiología: ${selectedAdditives.map(a => a.name).join(', ')}\n` : '• Enmiendas: Ninguna\n') +
            `\n⚡ Especificaciones Estimadas:\n` +
            ` - Volumen de Suelo Vivo: ${totalSoilVolume} Litros\n` +
            ` - Potencial de Cosecha Teórico: ${finalYieldMin}g - ${finalYieldMax}g\n` +
            ` - Actividad Microbiológica: ${microbialIndex}%\n` +
            ` - Intercambio Catiónico (CIC): ${cationExchange} meq/100g\n\n` +
            `💵 Total Estimado de Configuración: $${totalPrice.toLocaleString('es-AR')}\n\n` +
            `Quiero coordinar la compra y el envío del kit completo.`;
        
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/5491136458585?text=${encodedText}`, '_blank');
    };

    const formatCurrency = (val: number) => {
        return `$${val.toLocaleString('es-AR')}`;
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="w-full relative overflow-x-hidden min-h-screen bg-[#F5F4F0] text-[#151515]">
            
            {/* Preloader */}
            <AnimatePresence mode="wait">
                {!isAssetsLoaded && (
                    <CinematicPreloader />
                )}
            </AnimatePresence>

            {isAssetsLoaded && (
                <>
                    {/* Sticky floating purchase helper bar */}
                    <StickyPurchaseBar />

                    {/* HERO SECTION - Premium Dark Cover with Universe Canvas */}
                    <section className="relative w-full h-screen bg-[#05050C] text-white flex flex-col justify-between overflow-hidden">
                        {/* 3D Nebula Background Canvas */}
                        <div className="absolute inset-0 z-0 opacity-80">
                            <UniverseBackground />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050C]/20 to-[#05050C] z-10" />

                        {/* Top Navbar */}
                        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
                            <div className="flex items-center gap-2.5">
                                <span className="text-[#39FF14] text-lg font-black select-none">★</span>
                                <span className="text-xs font-mono font-black uppercase tracking-[0.3em]">CBKR</span>
                            </div>
                            <button
                                onClick={() => scrollToSection('productos-vitrina')}
                                className="text-[10px] text-white/60 hover:text-[#39FF14] font-black uppercase tracking-widest border border-white/10 hover:border-[#39FF14]/30 px-5 py-2.5 rounded-full transition-all cursor-pointer bg-white/5"
                            >
                                Catálogo Tienda
                            </button>
                        </div>

                        {/* Hero Center Editorial Copy */}
                        <div className="relative z-20 flex-grow flex flex-col justify-center items-center text-center px-6">
                            <span className="text-[#39FF14] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block animate-pulse">
                                LA NUEVA ERA DEL CULTIVO ORGÁNICO
                            </span>
                            
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic font-bold tracking-tight uppercase leading-none max-w-5xl mb-6 select-none text-white">
                                Método CBKR
                            </h1>
                            
                            <p className="text-white/60 text-sm md:text-lg max-w-2xl font-light tracking-wide leading-relaxed mb-10">
                                La inteligencia de la tierra al servicio del cultivo biológico de precisión. Ecosistemas autorregulados con el máximo potencial genético.
                            </p>

                            {/* Conversion Focus CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={() => scrollToSection('productos-vitrina')}
                                    className="w-48 sm:w-auto px-8 py-4 rounded-full bg-[#39FF14] text-black font-black text-xs uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all cursor-pointer shadow-[0_0_20px_rgba(57,255,20,0.15)]"
                                >
                                    Ver Productos
                                </button>
                                <button
                                    onClick={() => scrollToSection('arma-tu-sala')}
                                    className="w-48 sm:w-auto px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-widest hover:border-white/35 transition-all cursor-pointer"
                                >
                                    Diseñar Sala
                                </button>
                            </div>
                        </div>

                        {/* Bottom Hero & Scroll Indicator */}
                        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-8 flex justify-between items-center text-white/30 text-[10px] font-mono tracking-widest uppercase">
                            <span>EDICIÓN 2026</span>
                            <div 
                                onClick={() => scrollToSection('el-proceso')}
                                className="flex flex-col items-center gap-1 cursor-pointer hover:text-white transition-colors"
                            >
                                <span className="animate-bounce">↓</span>
                                <span>SCROLL PARA EXPLORAR</span>
                            </div>
                            <span>SOIL INTELLIGENCE</span>
                        </div>
                    </section>


                    {/* SECTION 01. EL PROCESO - Interactive Bunker Assembly */}
                    <section id="el-proceso" className="relative w-full py-24 bg-[#F5F4F0] text-[#151515] border-b border-black/[0.04] scroll-mt-6">
                        <div className="w-full max-w-6xl mx-auto px-6">
                            
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                                {/* Left: Headline & editorial description */}
                                <div className="lg:col-span-5 text-left fade-in-scroll">
                                    <span className="text-[10px] tracking-[0.35em] text-neutral-400 font-bold uppercase mb-2 block">
                                        01. EL PROCESO BIOLÓGICO
                                    </span>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic font-bold tracking-tight uppercase leading-none mb-6">
                                        El Ensamblado
                                    </h2>
                                    <div className="w-12 h-[2px] bg-[#39FF14] mb-6" />
                                    
                                    <p className="text-[#151515]/75 text-sm md:text-base leading-relaxed mb-6 font-light">
                                        Nuestros sistemas Bunker recrean exactamente la complejidad termodinámica y microbiológica de un suelo forestal virgen.
                                    </p>
                                    <p className="text-[#151515]/60 text-xs md:text-sm leading-relaxed font-light">
                                        A través de capas estratificadas de materia orgánica inoculada con consorcios fúngicos y bacterianos activos, logramos un sistema metabólicamente autosostenible que alimenta directamente las raíces sin requerir sales sintéticas.
                                    </p>
                                </div>

                                {/* Right: Assembly canvas container */}
                                <div className="lg:col-span-7 flex justify-center items-center w-full fade-in-scroll">
                                    <div className="w-full bg-[#EBEAE5] border border-black/[0.04] rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
                                        <div className="absolute top-4 left-6 flex items-center gap-2 text-neutral-400 font-mono text-[9px] uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-ping" />
                                            Simulación In-Situ Activa
                                        </div>
                                        
                                        <div className="w-full min-h-[350px] md:min-h-[420px] flex items-center justify-center relative">
                                            <BunkerAssemblyAnimation />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>


                    {/* SECTION 02. PRODUCTOS DESTACADOS */}
                    <section id="productos-vitrina" className="relative w-full py-16 bg-[#F5F4F0] text-[#151515] border-b border-black/[0.04] scroll-mt-6">
                        <div className="fade-in-scroll">
                            <FeaturedProducts />
                        </div>
                    </section>


                    {/* SECTION 03. ARMA TU SALA - Apple Store Configurador */}
                    <section id="arma-tu-sala" className="relative w-full min-h-screen py-24 bg-[#05050C] text-white overflow-hidden scroll-mt-0">
                        {/* Background ambience overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,255,20,0.03)_0%,transparent_60%)] pointer-events-none" />

                        <div className="w-full max-w-6xl mx-auto px-6">
                            
                            {/* Title block */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16 border-b border-white/5 pb-8">
                                <div className="text-left">
                                    <span className="text-[10px] tracking-[0.35em] text-[#39FF14] font-bold uppercase mb-2 block">
                                        03. ARMA TU SALA CBKR
                                        <span className="ml-2.5 px-2 py-0.5 rounded bg-[#39FF14]/10 border border-[#39FF14]/20 font-mono text-[9px] uppercase tracking-widest text-[#39FF14]">
                                            Configurador Premium
                                        </span>
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-serif italic font-bold tracking-tight uppercase leading-none text-white">
                                        Personalizar Ecosistema
                                    </h2>
                                </div>
                                <p className="text-white/40 text-xs tracking-widest uppercase font-medium max-w-xs text-left md:text-right">
                                    Selecciona las especificaciones y componentes para tu sustrato forestal vivo.
                                </p>
                            </div>

                            {/* Main split grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
                                
                                {/* Left sticky column: Live Render Preview & Scientific Stats */}
                                <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6 w-full">
                                    
                                    {/* Glassmorphic Render Box */}
                                    <div className="relative w-full aspect-square bg-gradient-to-br from-neutral-900/60 to-black/90 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05)_0%,transparent_60%)] pointer-events-none" />
                                        
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentPreviewImage}
                                                src={currentPreviewImage}
                                                alt="Ecosistema CBKR"
                                                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                                className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
                                            />
                                        </AnimatePresence>

                                        {/* Watermark brand details */}
                                        <div className="absolute bottom-4 left-6 flex items-center gap-1.5 text-[8.5px] font-mono tracking-widest uppercase text-white/30">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                                            Live Biological simulation
                                        </div>
                                    </div>

                                    {/* Scientific Stats HUD Panel */}
                                    <div className="w-full bg-neutral-900/40 border border-white/5 rounded-3xl p-6 flex flex-col gap-5 backdrop-blur-md">
                                        <div className="text-left border-b border-white/5 pb-3">
                                            <span className="text-[9px] font-mono tracking-[0.25em] text-[#39FF14] uppercase block mb-1">
                                                Especificaciones Técnicas
                                            </span>
                                            <span className="text-xs text-white/50 font-light block">
                                                Estimación teórica del sustrato seleccionado.
                                            </span>
                                        </div>

                                        {/* Soil Volume & Cosecha metrics */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-left">
                                                <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest block mb-0.5">Living Soil</span>
                                                <span className="text-xl font-bold text-white tracking-wide">
                                                    {totalSoilVolume} <span className="text-xs text-white/50 font-light">Litros</span>
                                                </span>
                                            </div>
                                            <div className="text-left">
                                                <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest block mb-0.5">Potencial Cosecha</span>
                                                <span className="text-xl font-serif italic font-bold text-[#39FF14] tracking-wide">
                                                    {finalYieldMin}g - {finalYieldMax}g
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress bars: Microbial activity */}
                                        <div className="flex flex-col gap-1.5 text-left">
                                            <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase text-white/60">
                                                <span>Actividad Microbiológica</span>
                                                <span className="text-[#39FF14]">{microbialIndex}%</span>
                                            </div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${microbialIndex}%` }}
                                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                                    className="h-full bg-gradient-to-r from-[#39FF14] to-emerald-400 rounded-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Progress bars: Cation Exchange */}
                                        <div className="flex flex-col gap-1.5 text-left">
                                            <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase text-white/60">
                                                <span>Intercambio Catiónico (CIC)</span>
                                                <span className="text-[#00FFFF]">{cationExchange} meq/100g</span>
                                            </div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(cationExchange / 120) * 100}%` }}
                                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                                    className="h-full bg-gradient-to-r from-[#00FFFF] to-blue-400 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right scrolling column: Selection steps */}
                                <div className="lg:col-span-7 flex flex-col gap-12 w-full text-left">
                                    
                                    {/* Visual Apple step navigation bar */}
                                    <div className="flex justify-between border border-white/10 bg-white/5 rounded-full p-1.5 backdrop-blur-sm z-30">
                                        {[1, 2, 3, 4].map((step) => {
                                            const labels = ['Cama', 'Sustrato', 'Enmiendas', 'Resumen'];
                                            const isActive = activeStep === step;
                                            return (
                                                <button
                                                    key={step}
                                                    onClick={() => setActiveStep(step)}
                                                    className={`flex-1 py-3 px-2 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-center transition-all ${
                                                        isActive 
                                                        ? 'bg-white text-black shadow-[0_5px_15px_rgba(255,255,255,0.1)]' 
                                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                                    }`}
                                                >
                                                    {step}. {labels[step - 1]}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Active step contents rendering */}
                                    <div className="min-h-[400px]">
                                        <AnimatePresence mode="wait">
                                            
                                            {/* STEP 1: CAMAS BUNKER */}
                                            {activeStep === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="flex flex-col gap-6"
                                                >
                                                    <div>
                                                        <span className="text-xs text-[#39FF14] font-mono tracking-widest uppercase font-bold block mb-1">Paso 1 de 4</span>
                                                        <h3 className="text-2xl font-serif italic text-white font-black uppercase">Ecosistema Base</h3>
                                                        <p className="text-white/50 text-xs font-light mt-1.5">
                                                            El contenedor biológico principal fabricado con materiales geotextiles transpirables de última generación.
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-col gap-4">
                                                        {bunkers.map((opt) => {
                                                            const isSelected = selectedBunker.id === opt.id;
                                                            return (
                                                                <div
                                                                    key={opt.id}
                                                                    onClick={() => setSelectedBunker(opt)}
                                                                    className={`w-full p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex justify-between items-center gap-4 ${
                                                                        isSelected 
                                                                        ? 'bg-white/5 border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.06)]' 
                                                                        : 'bg-[#0F0F1D]/40 border-white/5 hover:border-white/15'
                                                                    }`}
                                                                >
                                                                    <div className="flex flex-col gap-1.5 max-w-[70%]">
                                                                        <span className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                                                                            {opt.name} 
                                                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono font-medium text-white/50 uppercase">
                                                                                {opt.capacity}L
                                                                            </span>
                                                                        </span>
                                                                        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                                                                            {opt.dimensions} · Cosecha: {opt.yield}
                                                                        </span>
                                                                        <p className="text-[11px] text-white/60 font-light leading-relaxed mt-1">
                                                                            {opt.desc}
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-right flex flex-col items-end gap-1.5">
                                                                        <span className="text-lg font-bold text-white">
                                                                            {formatCurrency(opt.price)}
                                                                        </span>
                                                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                                                            isSelected ? 'border-[#39FF14] bg-[#39FF14]' : 'border-white/20 bg-transparent'
                                                                        }`}>
                                                                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    <button
                                                        onClick={() => setActiveStep(2)}
                                                        className="w-full py-4 mt-4 bg-white hover:bg-[#39FF14] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                                                    >
                                                        <span>Siguiente: Elegir Sustrato</span>
                                                        <span>→</span>
                                                    </button>
                                                </motion.div>
                                            )}

                                            {/* STEP 2: SUSTRATOS */}
                                            {activeStep === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="flex flex-col gap-6"
                                                >
                                                    <div>
                                                        <span className="text-xs text-[#39FF14] font-mono tracking-widest uppercase font-bold block mb-1">Paso 2 de 4</span>
                                                        <h3 className="text-2xl font-serif italic text-white font-black uppercase">Sustrato Biolgico</h3>
                                                        <p className="text-white/50 text-xs font-light mt-1.5">
                                                            El medio de cultivo orgánico que nutre directamente la red de filamentos de la biósfera radicular.
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-col gap-4">
                                                        {substrates.map((opt) => {
                                                            const isSelected = selectedSubstrate?.id === opt.id;
                                                            return (
                                                                <div
                                                                    key={opt.id}
                                                                    onClick={() => setSelectedSubstrate(isSelected ? null : opt)}
                                                                    className={`w-full p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex justify-between items-center gap-4 ${
                                                                        isSelected 
                                                                        ? 'bg-white/5 border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.06)]' 
                                                                        : 'bg-[#0F0F1D]/40 border-white/5 hover:border-white/15'
                                                                    }`}
                                                                >
                                                                    <div className="flex flex-col gap-1.5 max-w-[70%]">
                                                                        <span className="text-base font-black text-white uppercase tracking-wider">
                                                                            {opt.name}
                                                                        </span>
                                                                        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                                                                            Volumen: {opt.volume} Litros
                                                                        </span>
                                                                        <p className="text-[11px] text-white/60 font-light leading-relaxed mt-1">
                                                                            {opt.desc}
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-right flex flex-col items-end gap-1.5">
                                                                        <span className="text-lg font-bold text-white">
                                                                            {formatCurrency(opt.price)}
                                                                        </span>
                                                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                                                            isSelected ? 'border-[#39FF14] bg-[#39FF14]' : 'border-white/20 bg-transparent'
                                                                        }`}>
                                                                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="flex gap-4 mt-4">
                                                        <button
                                                            onClick={() => setActiveStep(1)}
                                                            className="flex-1 py-4 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                                        >
                                                            <span>← Volver</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setActiveStep(3)}
                                                            className="flex-[2] py-4 bg-white hover:bg-[#39FF14] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                                                        >
                                                            <span>Siguiente: Insumos Orgánicos</span>
                                                            <span>→</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: ENMIENDAS Y MICROBIOLOGIA */}
                                            {activeStep === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="flex flex-col gap-6"
                                                >
                                                    <div>
                                                        <span className="text-xs text-[#39FF14] font-mono tracking-widest uppercase font-bold block mb-1">Paso 3 de 4</span>
                                                        <h3 className="text-2xl font-serif italic text-white font-black uppercase">Insumos y Aditivos</h3>
                                                        <p className="text-white/50 text-xs font-light mt-1.5">
                                                            Añade inóculos de hongos y minerales para potenciar el intercambio catiónico y la microbiología del sustrato. (Multi-selección)
                                                        </p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {additives.map((opt) => {
                                                            const isSelected = selectedAdditives.some(a => a.id === opt.id);
                                                            return (
                                                                <div
                                                                    key={opt.id}
                                                                    onClick={() => handleAdditiveToggle(opt)}
                                                                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left gap-4 h-full ${
                                                                        isSelected 
                                                                        ? 'bg-white/5 border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.06)]' 
                                                                        : 'bg-[#0F0F1D]/40 border-white/5 hover:border-white/15'
                                                                    }`}
                                                                >
                                                                    <div className="flex flex-col gap-1.5">
                                                                        <div className="flex justify-between items-start gap-2">
                                                                            <span className="text-sm font-black text-white uppercase tracking-wider">
                                                                                {opt.name}
                                                                            </span>
                                                                            <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                                                                                isSelected ? 'border-[#39FF14] bg-[#39FF14]' : 'border-white/20 bg-transparent'
                                                                            }`}>
                                                                                {isSelected && <span className="w-1.5 h-1.5 rounded bg-black" />}
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-[8.5px] font-mono text-[#39FF14] tracking-widest uppercase font-bold">
                                                                            {opt.impact}
                                                                        </span>
                                                                        <p className="text-[10.5px] text-white/50 font-light leading-relaxed mt-1">
                                                                            {opt.desc}
                                                                        </p>
                                                                    </div>
                                                                    <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                                                                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">Valor Unitario</span>
                                                                        <span className="text-base font-bold text-white">
                                                                            {formatCurrency(opt.price)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="flex gap-4 mt-4">
                                                        <button
                                                            onClick={() => setActiveStep(2)}
                                                            className="flex-1 py-4 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                                        >
                                                            <span>← Volver</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setActiveStep(4)}
                                                            className="flex-[2] py-4 bg-white hover:bg-[#39FF14] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                                                        >
                                                            <span>Siguiente: Ver Resumen</span>
                                                            <span>→</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 4: SUMMARY & CHECKOUT */}
                                            {activeStep === 4 && (
                                                <motion.div
                                                    key="step4"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="flex flex-col gap-6"
                                                >
                                                    <div>
                                                        <span className="text-xs text-[#39FF14] font-mono tracking-widest uppercase font-bold block mb-1">Paso 4 de 4</span>
                                                        <h3 className="text-2xl font-serif italic text-white font-black uppercase">Resumen de Sala</h3>
                                                        <p className="text-white/50 text-xs font-light mt-1.5">
                                                            Confirma los componentes seleccionados para tu ecosistema de Living Soil premium.
                                                        </p>
                                                    </div>

                                                    {/* Custom Invoice Summary Box */}
                                                    <div className="w-full bg-[#0F0F1D]/60 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
                                                        
                                                        {/* Items listing */}
                                                        <div className="flex flex-col gap-3.5 border-b border-white/5 pb-4">
                                                            {/* Bunker */}
                                                            <div className="flex justify-between items-start text-left text-xs">
                                                                <div>
                                                                    <span className="font-bold text-white block uppercase tracking-wide">{selectedBunker.name}</span>
                                                                    <span className="text-[10px] text-white/40 font-mono tracking-wider uppercase">Capa Geotextil Base ({selectedBunker.capacity}L)</span>
                                                                </div>
                                                                <span className="font-bold text-white">{formatCurrency(selectedBunker.price)}</span>
                                                            </div>

                                                            {/* Substrate */}
                                                            {selectedSubstrate ? (
                                                                <div className="flex justify-between items-start text-left text-xs">
                                                                    <div>
                                                                        <span className="font-bold text-white block uppercase tracking-wide">{selectedSubstrate.name}</span>
                                                                        <span className="text-[10px] text-white/40 font-mono tracking-wider uppercase">Sustrato Biolgico (25L)</span>
                                                                    </div>
                                                                    <span className="font-bold text-white">{formatCurrency(selectedSubstrate.price)}</span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex justify-between items-start text-left text-xs text-white/30">
                                                                    <span>Sustrato: Ninguno</span>
                                                                    <span>$0</span>
                                                                </div>
                                                            )}

                                                            {/* Additives list */}
                                                            {selectedAdditives.map((add) => (
                                                                <div key={add.id} className="flex justify-between items-start text-left text-xs">
                                                                    <div>
                                                                        <span className="font-bold text-white block uppercase tracking-wide">{add.name}</span>
                                                                        <span className="text-[10px] text-[#39FF14] font-mono tracking-wider uppercase">{add.impact}</span>
                                                                    </div>
                                                                    <span className="font-bold text-white">{formatCurrency(add.price)}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Total summary */}
                                                        <div className="flex justify-between items-center py-2">
                                                            <div className="text-left">
                                                                <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest block mb-0.5">Total Estimado</span>
                                                                <span className="text-3xl font-black text-white tracking-wide">
                                                                    {formatCurrency(totalPrice)}
                                                                </span>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="text-[9px] text-[#39FF14] font-mono uppercase tracking-widest block font-bold border border-[#39FF14]/20 bg-[#39FF14]/5 px-2.5 py-1 rounded">
                                                                    Listo para Cotizar
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                                        <button
                                                            onClick={() => setActiveStep(3)}
                                                            className="w-full sm:w-1/3 py-4 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                                        >
                                                            <span>← Volver</span>
                                                        </button>
                                                        
                                                        {/* High Conversion CTA Checkout Button */}
                                                        <button
                                                            onClick={handleWhatsAppCheckout}
                                                            className="w-full sm:w-2/3 py-4 bg-[#39FF14] hover:bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:shadow-none"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.49-3.238c1.65.981 3.264 1.499 4.901 1.5l.562-.001c5.462-.003 9.904-4.407 9.907-9.87.001-2.648-1.02-5.136-2.879-6.999-1.859-1.863-4.339-2.887-6.994-2.888-5.467 0-9.911 4.412-9.914 9.877-.001 1.734.485 3.426 1.408 4.909l.348.56-1.025 3.738 3.823-1.002.564.334zm11.93-6.827c-.299-.149-1.766-.867-2.04-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.646.074-.299-.15-1.262-.465-2.403-1.477-.889-.79-1.489-1.766-1.662-2.063-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.766-.719 2.014-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                                                            </svg>
                                                            <span>Completar en WhatsApp</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </section>


                    {/* SECTION 04. BIBLIOTECA & MANUAL - Unified resource grids */}
                    <section id="manual-y-biblioteca" className="relative w-full py-24 bg-[#F5F4F0] text-[#151515] scroll-mt-6">
                        <div className="w-full max-w-6xl mx-auto px-6">
                            
                            {/* Manual block */}
                            <div className="w-full mb-28 fade-in-scroll">
                                <MethodManualSection />
                            </div>

                            {/* Library block */}
                            <div className="w-full fade-in-scroll">
                                <LibrarySection />
                            </div>

                        </div>
                    </section>

                    {/* Minimal Brand Footer */}
                    <footer className="w-full py-16 bg-[#05050C] text-white/40 border-t border-white/5 relative z-10 text-center">
                        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[#39FF14] text-base font-black select-none">★</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-white">CBKR EXPERIENCIA VIRTUAL</span>
                            </div>
                            <p className="text-[9px] font-mono uppercase tracking-widest">
                                © 2026 CBKR S.A. ALL RIGHTS RESERVED. HEADLESS FRONTEND DESIGNS.
                            </p>
                        </div>
                    </footer>
                </>
            )}
        </main>
    );
}
