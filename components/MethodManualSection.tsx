'use client';

import { useState } from 'react';

export default function MethodManualSection() {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    const handleDownload = () => {
        if (isDownloading) return;
        setIsDownloading(true);
        setDownloadProgress(0);

        // Simulated highly polished downloading animation progress
        const interval = setInterval(() => {
            setDownloadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsDownloading(false);
                        alert('¡Manual "Método CBKR - Suelo Vivo" descargado exitosamente!');
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
            
            {/* Left Column: Premium 3D Book Presentation */}
            <div className="lg:col-span-5 flex justify-center items-center anim-child perspective-[1500px]">
                <div className="relative group w-[260px] h-[360px] preserve-3d transition-transform duration-1000 ease-out hover:rotate-y-[-25deg] hover:rotate-x-[10deg] shadow-[0_30px_100px_rgba(57,255,20,0.1)] hover:shadow-[0_45px_120px_rgba(57,255,20,0.2)] rounded-r-xl">
                    
                    {/* Floating Bioluminescent Particle Effects Behind Book */}
                    <div className="absolute inset-0 bg-[#39FF14]/10 rounded-xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 -z-10" />
                    
                    {/* Book Spine (Lomo del libro en 3D) */}
                    <div className="absolute top-0 left-0 w-[40px] h-full bg-neutral-950 border-r border-white/10 origin-left rotate-y-[-90deg] translate-z-0 rounded-l-md flex flex-col justify-between py-8 px-2 text-white/30 text-[8px] font-mono select-none uppercase tracking-widest leading-none">
                        <span>CBKR</span>
                        <span className="rotate-180 transform tracking-[0.3em]">METODO CBKR V3</span>
                        <span>2026</span>
                    </div>

                    {/* Book Front Cover (Tapa frontal) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black rounded-r-xl border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_40px_rgba(255,255,255,0.03)] select-none">
                        
                        {/* Book Texture Overlay */}
                        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                        
                        {/* Golden Technical Accent Line */}
                        <div className="w-8 h-[2px] bg-[#39FF14] mb-4" />
                        
                        <div>
                            <span className="text-[9px] font-mono tracking-[0.25em] text-[#39FF14] uppercase font-bold block mb-2">
                                GUÍA MAESTRA
                            </span>
                            <h3 className="text-3xl font-black text-white leading-none tracking-tight uppercase mb-3">
                                Método<br />CBKR
                            </h3>
                            <p className="text-[10px] text-white/40 tracking-wider uppercase font-medium leading-relaxed">
                                El arte del suelo vivo y la nutrición orgánica de precisión.
                            </p>
                        </div>

                        {/* Immersive technical wireframe graphic in middle */}
                        <div className="relative w-full h-24 my-4 flex items-center justify-center">
                            <div className="absolute w-20 h-20 rounded-full border border-dashed border-[#39FF14]/30 animate-spin" style={{ animationDuration: '20s' }} />
                            <div className="absolute w-14 h-14 rounded-full border border-white/5" />
                            {/* SVG plant core wireframe */}
                            <svg className="w-10 h-10 text-[#39FF14]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        </div>

                        <div className="mt-auto flex justify-between items-end border-t border-white/5 pt-6">
                            <div>
                                <span className="text-[8px] text-white/30 uppercase block font-mono">EDICIÓN ESPAÑOL</span>
                                <span className="text-[10px] text-white/60 font-mono tracking-widest">v3.0.4 - 2026</span>
                            </div>
                            <span className="text-[9px] bg-[#39FF14]/10 border border-[#39FF14]/20 text-[#39FF14] px-2 py-0.5 rounded font-mono font-bold">
                                PDF
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Information & Interactive Download Panel */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
                
                <div className="anim-child mb-4">
                    <span className="text-[10px] tracking-[0.3em] text-[#39FF14] font-bold uppercase mb-2 block">
                        DESCARGA DE RECURSO
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">
                        El Manual del Método
                    </h2>
                </div>

                <p className="anim-child text-white/60 text-sm md:text-base leading-relaxed mb-6 font-light">
                    Nutrir la tierra no es una tarea más: es una ciencia holística. Hemos condensado años de investigación botánica, metodologías de compostaje microbiológico y armado de camas de Living Soil en un manual definitivo paso a paso.
                </p>

                {/* Keypoints list */}
                <div className="anim-child grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14]">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-[10px] text-white/40 block tracking-widest uppercase">CAPÍTULO 1</span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Camas e Isometría</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14]">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-[10px] text-white/40 block tracking-widest uppercase">CAPÍTULO 2</span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Bunkers y Capas</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14]">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-[10px] text-white/40 block tracking-widest uppercase">CAPÍTULO 3</span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Microbiología</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14]">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-[10px] text-white/40 block tracking-widest uppercase">CAPÍTULO 4</span>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Ciclo Nutricional</span>
                        </div>
                    </div>
                </div>

                {/* Download Button Component */}
                <div className="anim-child flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <button
                        onClick={handleDownload}
                        className={`relative overflow-hidden group px-8 py-4 rounded-xl border border-[#39FF14]/40 font-bold uppercase tracking-widest text-xs transition-all duration-500 cursor-pointer flex items-center gap-3 shadow-[0_0_30px_rgba(57,255,20,0.1)] hover:shadow-[0_0_40px_rgba(57,255,20,0.25)] ${
                            isDownloading ? 'bg-black text-[#39FF14] border-[#39FF14]/60' : 'bg-[#39FF14] text-black hover:bg-black hover:text-[#39FF14]'
                        }`}
                    >
                        {/* Progress Bar background overlay */}
                        {isDownloading && (
                            <div 
                                className="absolute inset-y-0 left-0 bg-[#39FF14]/10 transition-all duration-300 ease-out" 
                                style={{ width: `${downloadProgress}%` }}
                            />
                        )}

                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isDownloading ? 'animate-bounce text-[#39FF14]' : 'group-hover:translate-y-0.5 transition-transform'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>

                        <span>
                            {isDownloading ? `Descargando Guía (${downloadProgress}%)` : 'Descargar Guía en PDF'}
                        </span>
                    </button>

                    <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase md:ml-2">
                        PDF Completo • 18.4 MB • Versión 3.0
                    </span>
                </div>

            </div>

            {/* Immersive isometric manual styles inside JSX */}
            <style jsx>{`
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .rotate-y-\[-25deg\] {
                    transform: rotateY(-25deg);
                }
                .rotate-x-\[10deg\] {
                    transform: rotateX(10deg) rotateY(-20deg);
                }
            `}</style>
        </div>
    );
}
