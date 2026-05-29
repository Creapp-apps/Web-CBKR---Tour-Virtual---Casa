'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NextImage from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollyTellingLayer() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // The master timeline scrubbed by scroll progress
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom', // The timeline spans the entire 500vh
                scrub: 1.2, // Smooth interpolation
            }
        });

        // Scene 0 -> 1: Hero exits, Método enters
        tl.to('.scene-hero', { opacity: 0, scale: 1.15, duration: 1, ease: 'power1.inOut' })
            .to('.scene-metodo', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.5")
            .to({}, { duration: 1.5 }) // Hold Método
            .to('.scene-metodo', { opacity: 0, y: -50, scale: 0.95, duration: 1 });

        // Scene 1 -> 2: Ecosistemas Listos enters
        tl.to('.scene-ecosistemas', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.5")
            // Stagger camas from bottom simultaneously
            .from('.ecosistemas-products .product-item', {
                opacity: 0, y: 150, scale: 0.8, rotation: -5, stagger: 0.15, duration: 1.5, ease: 'power3.out'
            }, "<0.2")
            .to({}, { duration: 1.5 }) // Hold Ecosistemas
            .to('.scene-ecosistemas', { opacity: 0, y: -50, scale: 0.95, duration: 1 });

        // Scene 2 -> 3: Nutrición Viva enters
        tl.to('.scene-nutricion', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.5")
            // Stagger buckets
            .from('.nutricion-products .product-item', {
                opacity: 0, y: 150, scale: 0.8, rotation: 5, stagger: 0.15, duration: 1.5, ease: 'power3.out'
            }, "<0.2")
            .to({}, { duration: 1.5 }) // Hold Nutricion
            .to('.scene-nutricion', { opacity: 0, y: -50, scale: 0.95, duration: 1 });

        // Scene 3 -> 4: Footer CTA enters
        tl.to('.scene-footer', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.5")
            .to({}, { duration: 1 }); // Hold till the end of the scroll track

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="scrollytelling-layer w-full relative z-10 h-[500vh]">

            {/* STICKY CANVAS: Stops the user's viewport physically moving past this point while scrolling down */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">

                {/* ---------------- SCENE 0: HERO ---------------- */}
                <div className="scene-hero absolute inset-0 flex items-center justify-center">

                    {/* Cinematic Background Image (Real Photo) */}
                    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                        <NextImage
                            src="/foto1.jpg"
                            alt="Resultados Método CBKR"
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                        {/* Gradient overlays to blend into the Dark Bio theme seamlessly */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B1A]/40 via-[#0B0B1A]/30 to-[#0B0B1A]"></div>
                    </div>

                    <div className="text-center pt-20 pointer-events-auto z-10">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl mb-4 uppercase">
                            cbkr.
                        </h1>
                        <p className="text-xl md:text-3xl text-brand-cream tracking-[0.3em] uppercase font-light drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] max-w-3xl mx-auto px-4">
                            Suelo vivo, cultivo natural y sin químicos
                        </p>
                    </div>
                </div>

                {/* ---------------- SCENE 1: MÉTODO ---------------- */}
                <div className="scene-metodo absolute inset-0 flex items-center justify-end px-6 md:pr-32 opacity-0 translate-y-24">
                    <div className="glass-card max-w-md pointer-events-auto border-[#00FFFF]/30 shadow-[0_0_40px_rgba(0,255,255,0.15)] relative z-40">
                        <h2 className="text-3xl font-bold mb-4 text-[#00FFFF]">Método cbkr.</h2>
                        <p className="text-white/90 leading-relaxed text-lg">
                            Debajo de la superficie, la naturaleza hace el trabajo por ti. Las redes miceliales conectan las plantas, distribuyendo nutrientes y creando un cerebro plantario resiliente.
                        </p>
                    </div>
                </div>

                {/* ---------------- SCENE 2: ECOSISTEMAS (CAMAS) ---------------- */}
                <div className="scene-ecosistemas absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-[10%] opacity-0 translate-y-24 gap-8 md:gap-0 mt-20 md:mt-0">

                    <div className="glass-card max-w-md pointer-events-auto border-brand-cream/30 shadow-[0_0_40px_rgba(255,255,255,0.05)] relative z-40 w-full mb-8 md:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-cream">Ecosistemas Listos</h2>
                        <p className="text-white/90 leading-relaxed text-lg">
                            Nuestros Kits Living Soil, desde macetas Bunker de 50L hasta camas de cultivo de 700L, emulan el suelo del bosque. Solo agrega agua, el ecosistema se encarga del resto.
                        </p>
                    </div>

                    <div className="ecosistemas-products relative w-full md:w-[45%] h-[300px] md:h-[500px] pointer-events-auto">
                        {/* 700L */}
                        <div className="product-item absolute top-[0%] left-[0%] md:left-[10%] w-[220px] md:w-[400px] z-10 drop-shadow-xl opacity-100">
                            <NextImage src="/camas/700L.png" alt="Cama 700L" width={600} height={400} className="object-contain" />
                        </div>
                        {/* 530L */}
                        <div className="product-item absolute top-[30%] left-[10%] md:left-[20%] w-[180px] md:w-[280px] z-20 drop-shadow-2xl opacity-100">
                            <NextImage src="/camas/530L.png" alt="Cama 530L" width={380} height={300} className="object-contain saturate-110" />
                        </div>
                        {/* 250L */}
                        <div className="product-item absolute top-[55%] left-[25%] md:left-[45%] w-[140px] md:w-[220px] z-30 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] blur-[0.5px] opacity-100">
                            <NextImage src="/camas/250L.png" alt="Cama 250L" width={280} height={200} className="object-contain brightness-110" />
                        </div>
                        {/* 50L */}
                        <div className="product-item absolute top-[75%] left-[40%] md:left-[65%] w-[80px] md:w-[130px] z-40 drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)] opacity-100">
                            <NextImage src="/camas/50L.png" alt="Cama 50L" width={150} height={150} className="object-contain" />
                        </div>
                    </div>
                </div>

                {/* ---------------- SCENE 3: NUTRICIÓN VIVA (BUCKETS) ---------------- */}
                <div className="scene-nutricion absolute inset-0 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-6 md:px-[10%] opacity-0 translate-y-24 gap-8 md:gap-0 mt-20 md:mt-0">

                    <div className="nutricion-products relative w-full md:w-1/2 h-[300px] md:h-[600px] pointer-events-auto">
                        {/* Bolsa Verde */}
                        <div className="product-item absolute top-[10%] left-[25%] md:left-[30%] w-[140px] md:w-[350px] z-10 drop-shadow-2xl opacity-100">
                            <NextImage src="/productos/Copy of Foto producto Web_bolsa verde (1).png" alt="Bolsa Verde" width={400} height={600} className="object-contain" />
                        </div>
                        {/* Biochar */}
                        <div className="product-item absolute top-[40%] left-[10%] w-[100px] md:w-[180px] z-0 blur-[1px] opacity-100">
                            <NextImage src="/productos/baldes_biochar 5lt (1).png" alt="Biochar 5lt" width={200} height={300} className="object-contain saturate-150" />
                        </div>
                        {/* Kashi */}
                        <div className="product-item absolute top-[45%] right-[20%] md:right-[15%] w-[120px] md:w-[220px] z-20 opacity-100">
                            <NextImage src="/productos/baldes_kashi 5lt (1).png" alt="Kashi 5lt" width={250} height={350} className="object-contain brightness-110" />
                        </div>
                        {/* Gypsum */}
                        <div className="product-item absolute bottom-[-10%] md:bottom-[0%] left-[20%] md:left-[35%] w-[140px] md:w-[280px] z-30 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] opacity-100">
                            <NextImage src="/productos/baldes_gypsum 5lt (1).png" alt="Gypsum 5lt" width={300} height={400} className="object-contain" />
                        </div>
                    </div>

                    <div className="glass-card max-w-lg p-8 md:p-12 text-left pointer-events-auto relative z-40 border-[#FFA500]/30 shadow-[0_0_40px_rgba(255,165,0,0.15)] w-full">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#FFA500] mb-6">Nutrición Viva</h2>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                            Mantén la vida activa. Con nuestras enmiendas especializadas (Alga Kelp, Kashi Mix, Melaza Blackstrap) alimentas al suelo, no a la planta.
                        </p>
                    </div>
                </div>

                {/* ---------------- SCENE 4: CTA FINAL ---------------- */}
                <div className="scene-footer absolute inset-0 flex items-center justify-center px-6 opacity-0 translate-y-24">
                    <div className="glass-card max-w-2xl w-full text-center pointer-events-auto bg-black/60 shadow-[0_0_50px_rgba(255,255,255,0.02)] flex flex-col items-center py-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase tracking-wider">Tu Cultivo Vivo</h2>
                        <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
                            Todo lo que necesitas para iniciar tu viaje hacia la agricultura regenerativa. Respeto por la tierra, resultados extraordinarios.
                        </p>
                        <button className="px-10 py-4 rounded-full bg-brand-cream text-brand-gray font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                            Descubrir Productos
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
