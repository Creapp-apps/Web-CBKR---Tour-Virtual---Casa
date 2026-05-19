'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { Loader2 } from 'lucide-react';

interface PreloaderProps {
    progress: number;
    isLoaded: boolean;
}

export default function Preloader({ progress, isLoaded }: PreloaderProps) {
    useEffect(() => {
        if (isLoaded) {
            gsap.to('.preloader-container', {
                opacity: 0,
                duration: 1,
                ease: 'power3.inOut',
                delay: 0.5,
                onComplete: () => {
                    gsap.set('.preloader-container', { display: 'none' });
                }
            });
        }
    }, [isLoaded]);

    return (
        <div className="preloader-container fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B1A] text-white">
            <div className="flex flex-col items-center">
                <div className="text-sm uppercase tracking-[0.3em] mb-6 opacity-60 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-[#39FF14]" />
                    Sincronizando Micelio
                </div>
                <div className="text-7xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                    {progress}%
                </div>
                <div className="w-80 h-[2px] bg-white/10 mt-8 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00FFFF] to-[#39FF14] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(57,255,20,0.8)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
