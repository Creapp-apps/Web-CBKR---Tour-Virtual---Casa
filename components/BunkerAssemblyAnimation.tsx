'use client';

import { useState, useEffect } from 'react';

const assemblySteps = [
    {
        id: 1,
        title: '1. Cama Geotextil',
        desc: 'Contenedor poroso de alta aireación que promueve la auto-poda radicular.',
        color: 'from-[#39FF14]/20 to-transparent',
        borderColor: 'border-[#39FF14]/30',
        textColor: 'text-[#39FF14]'
    },
    {
        id: 2,
        title: '2. Bio-Aireación',
        desc: 'Capa base de piedra pómez o chips para drenaje óptimo y oxigenación.',
        color: 'from-cyan-500/20 to-transparent',
        borderColor: 'border-cyan-400/30',
        textColor: 'text-cyan-400'
    },
    {
        id: 3,
        title: '3. Living Soil Activo',
        desc: 'Sustrato CBKR cargado de materia orgánica y microbiología viva.',
        color: 'from-yellow-500/20 to-transparent',
        borderColor: 'border-yellow-400/30',
        textColor: 'text-yellow-400'
    },
    {
        id: 4,
        title: '4. Mulch / Cobertura',
        desc: 'Paja de alfalfa premium para retener humedad y proteger el micelio activo.',
        color: 'from-orange-500/20 to-transparent',
        borderColor: 'border-orange-400/30',
        textColor: 'text-orange-400'
    }
];

export default function BunkerAssemblyAnimation() {
    const [activeStep, setActiveStep] = useState(1);

    // Auto-rotate steps every 2.5 seconds to simulate assembly progress dynamically
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev === 4 ? 1 : prev + 1));
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex flex-col gap-6 bg-black/60 border border-white/5 p-6 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md">
            
            {/* Visual Assembly Canvas (Tech Prototype style) */}
            <div className="w-full h-48 bg-black/80 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/10 group">
                
                {/* Tech grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px]" />
                
                {/* Tech Blueprint circles */}
                <div className="absolute w-64 h-64 border border-white/[0.02] rounded-full animate-pulse" />
                <div className="absolute w-40 h-40 border border-[#39FF14]/5 rounded-full" />

                {/* 3D Isometric Layers Assembly */}
                <div className="relative w-44 h-36 flex flex-col-reverse justify-center items-center transform rotate-x-[60deg] rotate-z-[45deg] scale-90 translate-y-2">
                    
                    {/* Layer 1: Geotextil Container */}
                    <div 
                        className={`absolute w-36 h-24 rounded-lg border-2 bg-gradient-to-br transition-all duration-700 ease-out flex items-center justify-center ${
                            activeStep >= 1 
                                ? 'translate-y-0 opacity-100 scale-100 border-[#39FF14] bg-[#39FF14]/10 shadow-[0_0_20px_rgba(57,255,20,0.2)]' 
                                : 'translate-y-16 opacity-0 scale-95 border-white/10 bg-transparent'
                        }`}
                        style={{ zIndex: 10, transform: 'translateZ(0px)' }}
                    >
                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#39FF14]/60 font-black">BUNKER</span>
                    </div>

                    {/* Layer 2: Bio-Drainage */}
                    <div 
                        className={`absolute w-[136px] h-[88px] rounded-lg border bg-gradient-to-br transition-all duration-700 ease-out ${
                            activeStep >= 2 
                                ? '-translate-y-4 opacity-95 scale-95 border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.25)]' 
                                : 'translate-y-12 opacity-0 scale-90 border-white/5 bg-transparent'
                        }`}
                        style={{ zIndex: 20, transform: 'translateZ(15px)' }}
                    />

                    {/* Layer 3: Living Soil */}
                    <div 
                        className={`absolute w-32 h-20 rounded-lg border bg-gradient-to-br transition-all duration-700 ease-out ${
                            activeStep >= 3 
                                ? '-translate-y-8 opacity-95 scale-90 border-yellow-400 bg-yellow-400/25 shadow-[0_0_15px_rgba(250,204,21,0.25)]' 
                                : 'translate-y-8 opacity-0 scale-85 border-white/5 bg-transparent'
                        }`}
                        style={{ zIndex: 30, transform: 'translateZ(30px)' }}
                    />

                    {/* Layer 4: Mulch Cobertura */}
                    <div 
                        className={`absolute w-[120px] h-[72px] rounded-lg border bg-gradient-to-br transition-all duration-700 ease-out ${
                            activeStep >= 4 
                                ? '-translate-y-12 opacity-95 scale-85 border-orange-400 bg-orange-400/25 shadow-[0_0_15px_rgba(249,115,22,0.25)]' 
                                : 'translate-y-4 opacity-0 scale-80 border-white/5 bg-transparent'
                        }`}
                        style={{ zIndex: 40, transform: 'translateZ(45px)' }}
                    />

                </div>

                {/* Step indicator floating tag */}
                <div className="absolute bottom-3 right-3 bg-black/90 border border-white/10 px-3 py-1 rounded-md text-[9px] font-mono tracking-widest text-white/70 uppercase">
                    Paso {activeStep} / 4
                </div>
            </div>

            {/* Steps interactive list */}
            <div className="flex flex-col gap-2.5">
                {assemblySteps.map((step) => {
                    const isActive = activeStep === step.id;
                    return (
                        <div
                            key={step.id}
                            onClick={() => setActiveStep(step.id)}
                            className={`p-3 rounded-xl border transition-all duration-500 cursor-pointer flex gap-3 items-start bg-gradient-to-r ${
                                isActive 
                                    ? `${step.color} ${step.borderColor} bg-black/40` 
                                    : 'border-white/5 hover:border-white/10 bg-transparent'
                            }`}
                        >
                            {/* Step index circle */}
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-black border transition-colors ${
                                isActive 
                                    ? `bg-transparent ${step.borderColor} ${step.textColor}` 
                                    : 'border-white/20 text-white/40'
                            }`}>
                                {step.id}
                            </div>
                            
                            <div className="flex-grow">
                                <h4 className={`text-[11px] font-black tracking-widest uppercase transition-colors ${
                                    isActive ? step.textColor : 'text-white/60'
                                }`}>
                                    {step.title}
                                </h4>
                                {isActive && (
                                    <p className="text-[10px] text-white/50 leading-relaxed mt-1 animate-fade-in font-medium">
                                        {step.desc}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            
        </div>
    );
}
