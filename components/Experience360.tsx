'use client';

import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

// Hotspots predeterminados - Las posiciones (top/left) son porcentajes relativos
// al contenedor padre para que el hotspot siempre se mantenga sobre el objeto
// incluso si la pantalla se hace más pequeña.
const hotspots = [
    {
        id: 'camas',
        name: 'Camas Bunker',
        description: 'Entorno de Living Soil con volumen ideal para microbiología activa.',
        top: '65%',
        left: '70%',
        color: '#39FF14',
    },
    {
        id: 'luces',
        name: 'Iluminación Avanzada',
        description: 'Espectro lumínico óptimo para desarrollo vegetativo y floración.',
        top: '30%',
        left: '20%',
        color: '#00FFFF',
    },
    {
        id: 'estantes',
        name: 'Insumos y Nutrientes',
        description: 'Nutrición biológica y enmiendas minerales seleccionadas.',
        top: '35%',
        left: '50%',
        color: '#FF00FF',
    }
];

export default function Experience360() {
    const router = useRouter();
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    // Utilidad interactiva para que el desarrollador pueda clickear la imagen
    // y la consola/pantalla le diga exactamente los porcentajes a cargar en el array superior.
    const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickXPercent = ((x / rect.width) * 100).toFixed(2);
        const clickYPercent = ((y / rect.height) * 100).toFixed(2);

        // alert(`Coordenadas del click para Hotspot:\ntop: '${clickYPercent}%'\nleft: '${clickXPercent}%'`);
        console.log(`Radar Isométrico -> top: '${clickYPercent}%', left: '${clickXPercent}%'`);
    };

    return (
        <div className="w-full h-screen bg-[#0B0B1A] relative overflow-hidden">

            {/* Botón Volver */}
            <div className="absolute top-6 left-6 z-50">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-xl transition-all duration-300 group shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Volver al Inicio
                </button>
            </div>

            {/* Contenedor Fullscreen del Plano Isométrico 
          Forzamos matemáticamente que el div cubra 100% de ancho y 100% de alto (mínimos),
          mientras mantiene una relación de aspecto 16:9. Esto garantiza que no haya márgenes negros 
          y los Hotspots (%) sigan anclados milimétricamente al gráfico sin importar el tamaño de pantalla. */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] min-h-[100vh] h-[calc(100vw*1080/1920)] min-w-[calc(100vh*1920/1080)] overflow-hidden"
                onClick={handleImageClick}
            >
                <img
                    src="/isometrico.jpeg"
                    alt="Tienda Isométrica"
                    className="w-full h-full object-cover pointer-events-none"
                />

                {/* Hotspots Renderizados Dinámicamente */}
                {hotspots.map((spot) => (
                    <div
                        key={spot.id}
                        className="absolute z-20"
                        style={{ top: spot.top, left: spot.left }}
                        onMouseEnter={() => setActiveHotspot(spot.id)}
                        onMouseLeave={() => setActiveHotspot(null)}
                    >
                        {/* Contenedor del pin interactivo */}
                        <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">

                            {/* Círculo pulsante */}
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${spot.color}30`, border: `2px solid ${spot.color}` }}
                            >
                                <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: spot.color, color: spot.color }}></div>
                            </div>

                            {/* Tarjeta de Detalles (Glassmorphism emergente) */}
                            <div
                                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 md:w-80 p-6 bg-[#0B0B1A]/85 backdrop-blur-xl border rounded-2xl transition-all duration-300 origin-bottom flex flex-col gap-3 ${activeHotspot === spot.id ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}
                                style={{ borderColor: `${spot.color}50`, boxShadow: `0 15px 50px ${spot.color}20` }}
                            >
                                <h3 className="font-bold text-xl tracking-wide" style={{ color: spot.color }}>{spot.name}</h3>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    {spot.description}
                                </p>
                                <button className="w-full mt-2 py-3 bg-white/5 hover:bg-white/20 transition-colors rounded-xl border border-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[inset_0_1px_3px_rgba(255,255,255,0.1)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Agregar al Carrito
                                </button>
                            </div>

                            {/* Conector visual (línea desde el pin a la tarjeta) */}
                            <div
                                className={`absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-6 transition-all duration-300 ${activeHotspot === spot.id ? 'opacity-100' : 'opacity-0'}`}
                                style={{ backgroundColor: `${spot.color}50` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cartel Inferior */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none text-center z-10 w-[90%] max-w-md">
                <div className="bg-[#39FF14]/10 px-6 py-4 rounded-full text-white/90 shadow-[0_0_40px_rgba(57,255,20,0.2)] border border-[#39FF14]/50 flex gap-4 items-center justify-center backdrop-blur-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <div className="flex flex-col text-left">
                        <span className="font-bold tracking-wide text-sm text-[#39FF14]">TIENDA ISOMÉTRICA ACTIVA</span>
                        <span className="text-xs text-white/80">Pasa el mouse sobre el cuarto para revelar los productos.</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
