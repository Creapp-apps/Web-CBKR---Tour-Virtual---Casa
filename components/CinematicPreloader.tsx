'use client';

import { useEffect, useState } from 'react';

interface CinematicPreloaderProps {
    // Opcional: si queremos que esta cortina también actúe como Fade-in inicial sin el preloader entero
    skipLogo?: boolean;
}

export default function CinematicPreloader({ skipLogo = false }: CinematicPreloaderProps) {
    const [loadingStage, setLoadingStage] = useState(0);
    // Stages:
    // 0: Initial hiding
    // 1: Filling logo (if skipLogo is false)
    // 2: Fade out logo & background
    // 3: Unmount from DOM

    useEffect(() => {
        if (skipLogo) {
            // Si solo es una transición de página (fade-in desde negro),
            // revelamos la habitación inmediatamente sin la animación del logo.
            const t1 = setTimeout(() => setLoadingStage(2), 100);
            const t2 = setTimeout(() => setLoadingStage(3), 1200);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        } else {
            // Preloader inicial al entrar por primera vez al dominio
            const t1 = setTimeout(() => setLoadingStage(1), 200); // Empezar a llenar
            const t2 = setTimeout(() => setLoadingStage(2), 2500); // Desvanecer a negro -> transparente
            const t3 = setTimeout(() => setLoadingStage(3), 3500); // Desmontar
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        }
    }, [skipLogo]);

    if (loadingStage === 3) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out pointer-events-none ${loadingStage === 2 ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {!skipLogo && (
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">

                    {/* Logo Base (Apagado y oscuro) */}
                    <img
                        src="/logocbkr.png"
                        alt="CBKR Logo Placeholder"
                        className="absolute inset-0 w-full h-full object-contain opacity-20 grayscale brightness-50"
                    />

                    {/* Logo Activo (Relleno Blanco Puro) 
              Al quitar el drop-shadow evitamos el bug visual del recuadro cuadrado
              generado por bordes sucios en el PNG original. */}
                    <img
                        src="/logocbkr.png"
                        alt="CBKR Logo Filling"
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{
                            // Filtro CSS para hacerlo Blanco Puro sin generar recuadros fantasma
                            filter: 'brightness(0) invert(1)',
                            // inset(top right bottom left)
                            clipPath: loadingStage >= 1 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
                            transition: 'clip-path 2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    />

                </div>
            )}
        </div>
    );
}
