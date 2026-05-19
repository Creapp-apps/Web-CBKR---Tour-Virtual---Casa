'use client';

import IsometricScene from '@/components/IsometricScene';
import IsometricHotspot from '@/components/IsometricHotspot';
import CinematicPreloader from '@/components/CinematicPreloader';
import { useCinematicRouter } from '@/hooks/useCinematicRouter';

const hotspots = [
    {
        id: 'bunker-beds',
        name: 'Camas Bunker',
        description: 'Entorno de Living Soil con volumen ideal para microbiología activa.',
        top: '65%',
        left: '70%',
        color: '#39FF14',
    },
    {
        id: 'led-lights',
        name: 'Iluminación Avanzada',
        description: 'Espectro lumínico óptimo para desarrollo vegetativo y floración.',
        top: '30%',
        left: '20%',
        color: '#00FFFF',
    },
    {
        id: 'nutrients',
        name: 'Insumos y Nutrientes',
        description: 'Nutrición biológica y enmiendas minerales seleccionadas.',
        top: '35%',
        left: '50%',
        color: '#FF00FF',
    }
];

export default function StoreRoom() {
    const { cinematicNavigate, isTransitioning } = useCinematicRouter();

    return (
        <main className="w-full h-screen bg-black relative">
            <CinematicPreloader skipLogo={true} />
            <div
                className={`fixed inset-0 bg-black z-[9998] pointer-events-none transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
            ></div>

            <IsometricScene backgroundImage="/TIENDA4K.jpg">

                {hotspots.map((spot) => (
                    <IsometricHotspot
                        key={spot.id}
                        top={spot.top}
                        left={spot.left}
                        color={spot.color}
                        pulse={true}
                    >
                        <div className="flex flex-col gap-2 relative">
                            <h2 className="text-xl tracking-wide font-black uppercase flex items-center gap-3" style={{ color: spot.color }}>
                                {spot.name}
                            </h2>
                            <p className="text-white/80 text-sm leading-relaxed mb-3">
                                {spot.description}
                            </p>
                            <button className="w-full py-3 bg-white/5 hover:bg-white/20 transition-all rounded-xl border border-white/10 text-white text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 group backdrop-blur-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.1)]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Agregar al Carrito
                            </button>
                        </div>
                    </IsometricHotspot>
                ))}

                <div className="absolute top-6 left-6 z-50">
                    <button
                        onClick={() => cinematicNavigate('/casa')}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 hover:bg-black/90 border border-[#39FF14]/40 text-[#39FF14] backdrop-blur-xl transition-all duration-300 group shadow-[0_0_20px_rgba(57,255,20,0.1)] justify-center font-bold tracking-widest text-xs uppercase"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                        Volver a La Casa
                    </button>
                </div>

            </IsometricScene>
        </main>
    );
}
