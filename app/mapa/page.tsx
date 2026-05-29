'use client';

import IsometricScene from '@/components/IsometricScene';
import IsometricHotspot from '@/components/IsometricHotspot';
import CinematicPreloader from '@/components/CinematicPreloader';
import UniverseBackground from '@/components/UniverseBackground';
import { useCinematicRouter } from '@/hooks/useCinematicRouter';

export default function CasaMap() {
    const { cinematicNavigate, isTransitioning } = useCinematicRouter();

    return (
        <main className="w-full h-screen bg-black relative">

            <CinematicPreloader skipLogo={true} />

            <div
                className={`fixed inset-0 bg-black z-[9998] pointer-events-none transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
            ></div>

            <IsometricScene
                backgroundImage="/CASATENCENT.PNG"
                featherEdges={true}
                interactiveHover={true}
            >
                <div className="absolute inset-0 z-[-1]">
                    <UniverseBackground />
                </div>

                <IsometricHotspot top="58.8112%" left="50.5645%" color="#39FF14" pulse={true}>
                    <div className="flex flex-col gap-2 relative">
                        <h2 className="text-[#39FF14] text-xl tracking-widest font-black uppercase flex items-center gap-3">
                            Sala de Cultivo
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed mb-2">
                            El pulmón del ecosistema. Explora nuestros invernaderos y recursos regenerativos.
                        </p>

                        <button
                            onClick={() => cinematicNavigate('/tienda')}
                            className="w-full py-3 bg-[#39FF14]/10 hover:bg-[#39FF14]/30 transition-all rounded-xl border border-[#39FF14]/40 text-white text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 group backdrop-blur-md shadow-[inset_0_0_10px_rgba(57,255,20,0.2)]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39FF14] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Entrar a la Tienda
                        </button>
                    </div>
                </IsometricHotspot>

                {/* Botón Flotante para regresar al Atrio */}
                <div className="absolute top-6 left-6 z-50">
                    <button
                        onClick={() => cinematicNavigate('/')}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-xl transition-all duration-300 group shadow-[0_0_20px_rgba(0,0,0,0.5)] justify-center font-bold tracking-widest text-xs uppercase"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                        Volver al Atrio Central
                    </button>
                </div>

            </IsometricScene>
        </main>
    );
}
