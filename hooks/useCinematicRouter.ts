'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useCinematicRouter() {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const cinematicNavigate = useCallback((href: string) => {
        // Inicia el Curtain (Fade to Black)
        setIsTransitioning(true);

        // Espera a que la pantalla se vuelva negra (800ms) y navega
        setTimeout(() => {
            router.push(href);
        }, 800);
    }, [router]);

    return { cinematicNavigate, isTransitioning };
}
