'use client';

import React, { useState, useRef, useEffect, MouseEvent } from 'react';

interface IsometricSceneProps {
    backgroundImage: string;
    children?: React.ReactNode;
    featherEdges?: boolean;    // Activa un fundido suave en los bordes
    interactiveHover?: boolean; // Activa un zoom inmersivo al pasar el mouse
}

export default function IsometricScene({ backgroundImage, children, featherEdges = false, interactiveHover = false }: IsometricSceneProps) {
    const isMobileImage = backgroundImage.includes('isometricoresponsive');
    
    // Constantes de relación matemática basadas en los renders aportados por el usuario
    const IMAGE_WIDTH = isMobileImage ? 1536 : 5708;
    const IMAGE_HEIGHT = isMobileImage ? 2752 : 2944;

    // Premium Touch Pan System for Mobile
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const touchStart = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickXPercent = ((x / rect.width) * 100).toFixed(4);
        const clickYPercent = ((y / rect.height) * 100).toFixed(4);

        console.log(`📡 Radar Interactivo -> top: '${clickYPercent}%', left: '${clickXPercent}%'`);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isMobileImage && e.touches.length === 1) {
            touchStart.current = {
                x: e.touches[0].clientX - panOffset.x,
                y: e.touches[0].clientY - panOffset.y
            };
            isDragging.current = true;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging.current && e.touches.length === 1 && containerRef.current) {
            const clientX = e.touches[0].clientX;
            const clientY = e.touches[0].clientY;
            
            let deltaX = clientX - touchStart.current.x;
            let deltaY = clientY - touchStart.current.y;

            // Constrain dragging to prevent showing background empty space
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const imgWidth = Math.max(viewportWidth, viewportHeight * (IMAGE_WIDTH / IMAGE_HEIGHT));
            const imgHeight = Math.max(viewportHeight, viewportWidth * (IMAGE_HEIGHT / IMAGE_WIDTH));

            const maxPanX = Math.max(0, (imgWidth - viewportWidth) / 2);
            const maxPanY = Math.max(0, (imgHeight - viewportHeight) / 2);

            deltaX = Math.max(-maxPanX, Math.min(maxPanX, deltaX));
            deltaY = Math.max(-maxPanY, Math.min(maxPanY, deltaY));

            setPanOffset({ x: deltaX, y: deltaY });
        }
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    return (
        <div 
            className="w-full h-screen bg-[#0B0B1A] relative overflow-hidden select-none touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Exploration Hint for Mobile Users */}
            {isMobileImage && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 pointer-events-none animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Desliza para explorar sala</span>
                </div>
            )}

            <div
                ref={containerRef}
                className={`absolute top-1/2 left-1/2 overflow-visible transition-transform duration-[2000ms] ease-out ${
                    interactiveHover && !isMobileImage ? 'hover:scale-[1.03] cursor-pointer' : ''
                }`}
                style={{
                    width: `max(100vw, calc(100vh * (${IMAGE_WIDTH} / ${IMAGE_HEIGHT})))`,
                    height: `max(100vh, calc(100vw * (${IMAGE_HEIGHT} / ${IMAGE_WIDTH})))`,
                    transform: `translate(calc(-50% + ${panOffset.x}px), calc(-50% + ${panOffset.y}px))`,
                    transition: isDragging.current ? 'none' : 'transform 0.5s cubic-bezier(0.1, 0.8, 0.2, 1)'
                }}
                onClick={handleImageClick}
            >
                <img
                    src={backgroundImage}
                    alt="Mundo Isométrico"
                    className="w-full h-full object-cover pointer-events-none"
                    style={{
                        maskImage: featherEdges ? 'radial-gradient(ellipse 85% 85% at 50% 50%, black 65%, transparent 100%)' : 'none',
                        WebkitMaskImage: featherEdges ? 'radial-gradient(ellipse 85% 85% at 50% 50%, black 65%, transparent 100%)' : 'none',
                    }}
                />

                {/* Aquí se montan dinámicamente todos los Hotspots */}
                {children}

            </div>
        </div>
    );
}
