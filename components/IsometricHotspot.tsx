'use client';

import React, { useState } from 'react';

interface HotspotProps {
    top: string;
    left: string;
    color?: string;
    pulse?: boolean;
    onClick?: () => void;
    badge?: string;
    children?: React.ReactNode;
}

export default function IsometricHotspot({ top, left, color = '#39FF14', pulse = true, onClick, badge, children }: HotspotProps) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div
            className="absolute z-20 group"
            style={{ top, left }}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={onClick}
        >
            <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer">

                {/* Marcador Físico HUD (El "Anillo" que late hiper-visible) */}
                <div
                    className="relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-transform duration-[400ms] group-hover:scale-[1.2]"
                    style={{
                        backgroundColor: `${color}40`,
                        border: `2px solid ${color}`,
                        boxShadow: `0 0 25px ${color}A0, inset 0 0 15px ${color}60`,
                        backdropFilter: 'blur(3px)' // Crea contraste absorbiendo la luz del fondo de la puerta
                    }}
                >
                    {/* Ondas Sonar/Radar de Alta Visibilidad */}
                    {pulse && (
                        <>
                            <div
                                className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                                style={{ backgroundColor: `${color}80`, animationDuration: '2.5s' }}
                            ></div>
                            <div
                                className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                                style={{ backgroundColor: `${color}60`, animationDuration: '2.5s', animationDelay: '1.25s' }}
                            ></div>
                        </>
                    )}

                    {/* Núcleo Central Opaco e Hiper Brillante */}
                    <div
                        className="relative z-10 w-3 h-3 md:w-4 md:h-4 rounded-full transition-transform duration-[400ms] ease-out group-hover:scale-[1.5]"
                        style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}, 0 0 5px white` }}
                    ></div>
                </div>

                {/* Badge Elegante Flotante (Solo aparece si se pasó badge y NO hay niños) */}
                {badge && !children && (
                    <div
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-5 px-6 py-3 whitespace-nowrap bg-black/90 backdrop-blur-xl border rounded-full transition-all duration-[400ms] ease-out origin-bottom pointer-events-none ${isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4'}`}
                        style={{ borderColor: `${color}60`, boxShadow: `0 15px 50px ${color}40` }}
                    >
                        <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase" style={{ color: color, textShadow: `0 0 10px ${color}80` }}>
                            {badge}
                        </span>
                    </div>
                )}

                {/* Tarjeta Emergente Completa Holográfica */}
                {children && (
                    <>
                        <div
                            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 md:w-80 p-5 bg-[#0B0B1A]/85 backdrop-blur-xl border rounded-2xl transition-all duration-300 origin-bottom flex flex-col gap-3 ${isActive ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}
                            style={{ borderColor: `${color}50`, boxShadow: `0 15px 50px ${color}30` }}
                        >
                            {children}
                        </div>

                        {/* Conector Visual */}
                        <div
                            className={`absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-6 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                            style={{ backgroundColor: `${color}80` }}
                        ></div>
                    </>
                )}

            </div>
        </div>
    );
}
