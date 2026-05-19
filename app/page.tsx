'use client';

import CinematicPreloader from '@/components/CinematicPreloader';
import IsometricScene from '@/components/IsometricScene';
import IsometricHotspot from '@/components/IsometricHotspot';
import { useCinematicRouter } from '@/hooks/useCinematicRouter';

export default function LandingSplash() {
    const { cinematicNavigate, isTransitioning } = useCinematicRouter();

    return (
        <main className="w-full h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center">

            <CinematicPreloader />

            <div
                className={`fixed inset-0 bg-black z-[9998] pointer-events-none transition-opacity duration-[1200ms] ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
            ></div>

            <div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    animation: 'scaleIn 20s ease-out forwards',
                    animationDelay: '100ms'
                }}
            >
                <IsometricScene
                    backgroundImage="/CBKRHOME.jpeg"
                    featherEdges={false}
                    interactiveHover={false}
                >
                    {/* El Hotspot debe ir DIRECTO como hijo de IsometricScene.
              Integramos el nuevo color "Cremita" #e3e3e3 y el Badge Moderno. */}
                    <IsometricHotspot
                        top="58.8112%"
                        left="50.5645%"
                        color="#e3e3e3"
                        pulse={true}
                        badge="Ingresar a CBKR"
                        onClick={() => cinematicNavigate('/casa')}
                    />
                </IsometricScene>
            </div>

            <style>{`
        @keyframes scaleIn {
          0% { transform: scale(1.1); filter: brightness(0.5); }
          100% { transform: scale(1); filter: brightness(1); }
        }
      `}</style>
        </main>
    );
}
