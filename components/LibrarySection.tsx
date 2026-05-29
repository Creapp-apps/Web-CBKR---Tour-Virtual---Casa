'use client';

import { useState } from 'react';
import { BookOpen, PlayCircle, FileDown, Search, ArrowUpRight, Compass, Sparkles, BookMarked } from 'lucide-react';

interface Resource {
    title: string;
    description: string;
    type: 'pdf' | 'video' | 'book';
    url: string;
    sizeOrDuration: string;
}

interface Category {
    id: string;
    title: string;
    subtitle: string;
    accentColor: string;
    glowColor: string;
    icon: any;
    resources: Resource[];
}

export default function LibrarySection() {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [hoveredResource, setHoveredResource] = useState<string | null>(null);

    const categories: Category[] = [
        {
            id: 'science',
            title: 'Bibliografía Científica',
            subtitle: 'Estudios, ensayos y fundamentos académicos del suelo vivo.',
            accentColor: 'text-brand-cream',
            glowColor: 'group-hover:border-brand-cream/40 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]',
            icon: BookOpen,
            resources: [
                {
                    title: 'Microbiología y Red Trófica del Suelo',
                    description: 'Fundamentos acerca de bacterias, hongos y nematodos en el Living Soil.',
                    type: 'book',
                    url: '#',
                    sizeOrDuration: 'PDF - 4.2 MB'
                },
                {
                    title: 'El Despertar Orgánico (Manual CBKR)',
                    description: 'Cómo activar microbiología benéfica y acelerar la absorción radicular.',
                    type: 'pdf',
                    url: '#',
                    sizeOrDuration: 'PDF - 8.7 MB'
                },
                {
                    title: 'Dinámica de Humus y Regeneración',
                    description: 'Estudio de la agregación del suelo y la retención biológica de carbono.',
                    type: 'book',
                    url: '#',
                    sizeOrDuration: 'PDF - 3.1 MB'
                }
            ]
        },
        {
            id: 'video',
            title: 'Videografía Práctica',
            subtitle: 'Guías visuales, preparaciones de té de compost y técnicas de enmienda.',
            accentColor: 'text-cyan-400',
            glowColor: 'group-hover:border-cyan-400/40 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]',
            icon: PlayCircle,
            resources: [
                {
                    title: 'Té de Compost Activo Aeróbico',
                    description: 'Paso a paso de la preparación y aplicación de tés biológicos.',
                    type: 'video',
                    url: '#',
                    sizeOrDuration: 'Video - 12 Min'
                },
                {
                    title: 'Armado Completo de Bunker Living Soil',
                    description: 'Proceso de cargado, enmiendas y estabilización de camas de cultivo.',
                    type: 'video',
                    url: '#',
                    sizeOrDuration: 'Video - 24 Min'
                },
                {
                    title: 'Aplicación de Bio-insumos y Kashi Mix',
                    description: 'El arte de la inoculación de bacterias ácido-lácticas en el cultivo.',
                    type: 'video',
                    url: '#',
                    sizeOrDuration: 'Video - 8 Min'
                }
            ]
        },
        {
            id: 'guides',
            title: 'Guías e Infografías',
            subtitle: 'Tablas de aplicación, calendarios de enmiendas y fichas de bio-insumos.',
            accentColor: 'text-orange-400',
            glowColor: 'group-hover:border-orange-400/40 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]',
            icon: FileDown,
            resources: [
                {
                    title: 'Tabla de Enmiendas y Dosificación v2',
                    description: 'Ficha de referencia rápida para el cálculo de enmiendas de primavera.',
                    type: 'pdf',
                    url: '#',
                    sizeOrDuration: 'PDF - 1.5 MB'
                },
                {
                    title: 'Guía de Colonización de Micorrizas',
                    description: 'Infografía paso a paso para asegurar la simbiosis radicular perfecta.',
                    type: 'pdf',
                    url: '#',
                    sizeOrDuration: 'Ficha - 980 KB'
                },
                {
                    title: 'Ficha Técnica: Kashi Mix & Algas',
                    description: 'Análisis nutricional e instrucciones detalladas de uso biológico.',
                    type: 'pdf',
                    url: '#',
                    sizeOrDuration: 'PDF - 2.1 MB'
                }
            ]
        }
    ];

    const getResourceIcon = (type: 'pdf' | 'video' | 'book') => {
        switch (type) {
            case 'pdf': return FileDown;
            case 'video': return PlayCircle;
            case 'book': return BookOpen;
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col justify-center h-full">
            
            {/* Header Conceptual */}
            <div className="text-center mb-8 anim-child">
                <span className="text-[10px] tracking-[0.3em] text-brand-cream font-bold uppercase mb-2 block flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> BIBLIOTECA DE CONTENIDOS
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase leading-none">
                    Crónicas del Suelo Vivo
                </h2>
                <p className="text-white/40 text-[10px] tracking-widest uppercase mt-1.5">
                    Ciencia, pedagogía y manuales interactivos para llevar tu cultivo al límite orgánico
                </p>
            </div>

            {/* Grid de 3 Pilares Inmersivos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-8">
                {categories.map((cat) => {
                    const CategoryIcon = cat.icon;
                    return (
                        <div
                            key={cat.id}
                            className={`group relative rounded-2xl bg-black/85 border border-white/5 p-5 md:p-6 flex flex-col transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-1.5 cursor-default hover:bg-black/90 ${cat.glowColor} anim-child`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/3 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Header de Categoría */}
                            <div className="flex items-center gap-3.5 mb-4 border-b border-white/5 pb-3">
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ${cat.accentColor}`}>
                                    <CategoryIcon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none">
                                        {cat.title}
                                    </h3>
                                    <span className="text-[9px] text-white/40 uppercase tracking-wider block mt-1 font-mono">
                                        {cat.resources.length} Recursos Disponibles
                                    </span>
                                </div>
                            </div>
                            
                            <p className="text-white/50 text-[10.5px] leading-relaxed mb-5 text-left font-light min-h-[32px]">
                                {cat.subtitle}
                            </p>

                            {/* Lista de Recursos Interactivos */}
                            <div className="flex flex-col gap-3 flex-grow justify-start">
                                {cat.resources.map((res, idx) => {
                                    const ResIcon = getResourceIcon(res.type);
                                    const resId = `${cat.id}-${idx}`;
                                    const isHovered = hoveredResource === resId;

                                    return (
                                        <a
                                            key={idx}
                                            href={res.url}
                                            onMouseEnter={() => setHoveredResource(resId)}
                                            onMouseLeave={() => setHoveredResource(null)}
                                            className="group/item flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 text-left cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3 flex-grow max-w-[80%]">
                                                <ResIcon className={`w-4 h-4 transition-transform duration-300 ${isHovered ? `${cat.accentColor} scale-110` : 'text-white/40'}`} />
                                                <div className="truncate">
                                                    <h4 className="text-[11px] font-bold text-white/90 group-hover/item:text-white transition-colors uppercase tracking-wide truncate">
                                                        {res.title}
                                                    </h4>
                                                    <span className="text-[8px] text-white/30 group-hover/item:text-white/50 font-mono transition-colors block mt-0.5 leading-none">
                                                        {res.description}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                <span className="text-[7.5px] font-mono text-white/30 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded uppercase leading-none">
                                                    {res.sizeOrDuration}
                                                </span>
                                                <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-300 ${isHovered ? `translate-x-0.5 -translate-y-0.5 ${cat.accentColor}` : 'text-white/20'}`} />
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer de Biblioteca */}
            <div className="text-center anim-child mt-4 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cream animate-pulse" />
                <p className="text-[9px] text-white/40 tracking-[0.25em] uppercase font-bold">
                    BIBLIOTECA ABIERTA Y EN CONSTANTE EXPANSIÓN ORGÁNICA
                </p>
            </div>
            
        </div>
    );
}
