'use client';

import React, { MouseEvent } from 'react';

interface IsometricSceneProps {
    backgroundImage: string;
    children?: React.ReactNode;
    featherEdges?: boolean;    // Activa un fundido suave en los bordes
    interactiveHover?: boolean; // Activa un zoom inmersivo al pasar el mouse
}

export default function IsometricScene({ backgroundImage, children, featherEdges = false, interactiveHover = false }: IsometricSceneProps) {
    // Constantes de relación matemática basadas en los renders aportados por el usuario
    const IMAGE_WIDTH = 5708;
    const IMAGE_HEIGHT = 2944;

    const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickXPercent = ((x / rect.width) * 100).toFixed(4);
        const clickYPercent = ((y / rect.height) * 100).toFixed(4);

        console.log(`📡 Radar Interactivo -> top: '${clickYPercent}%', left: '${clickXPercent}%'`);
    };

    return (
        <div className="w-full h-screen bg-[#0B0B1A] relative overflow-hidden select-none">

            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible transition-transform duration-[2000ms] ease-out ${interactiveHover ? 'hover:scale-[1.03] cursor-pointer' : ''}`}
                style={{
                    // MATEMÁTICA PERFECTA PARA CUBRIR PANTALLA MANTENIENDO PROPORCIÓN EXACTA
                    // ¡ESTA ES LA CORRECCIÓN CLAVE! Al usar max() garantizamos que el contenedor 
                    // NUNCA pierda la relación de aspecto 5708:2944 al escalar.
                    width: `max(100vw, calc(100vh * (${IMAGE_WIDTH} / ${IMAGE_HEIGHT})))`,
                    height: `max(100vh, calc(100vw * (${IMAGE_HEIGHT} / ${IMAGE_WIDTH})))`,
                }}
                onClick={handleImageClick}
            >
                <img
                    src={backgroundImage}
                    alt="Mundo Isométrico"
                    // Al tener el div la proporción exacta fijada, w-full y h-full llenan la caja
                    // perfectamente 1:1, asegurando que los porcentajes TOP / LEFT sean inamovibles.
                    className="w-full h-full object-cover pointer-events-none"
                    style={{
                        // Aplica una máscara radial difuminada al borde de la imagen
                        maskImage: featherEdges ? 'radial-gradient(ellipse 80% 80% at 50% 50%, black 60%, transparent 100%)' : 'none',
                        WebkitMaskImage: featherEdges ? 'radial-gradient(ellipse 80% 80% at 50% 50%, black 60%, transparent 100%)' : 'none',
                    }}
                />

                {/* Aquí se montan dinámicamente todos los Hotspots */}
                {children}

            </div>
        </div>
    );
}
