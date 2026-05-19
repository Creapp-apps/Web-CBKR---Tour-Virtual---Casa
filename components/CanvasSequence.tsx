'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface CanvasSequenceProps {
    images: HTMLImageElement[];
    isLoaded: boolean;
}

export default function CanvasSequence({ images, isLoaded }: CanvasSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderFrameRef = useRef<(index: number) => void>(() => { });

    useGSAP(() => {
        if (!isLoaded || images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Helper: object-fit cover logic
        renderFrameRef.current = (index: number) => {
            const img = images[index];
            if (!img || !img.complete) return;

            const cw = window.innerWidth;
            const ch = window.innerHeight;

            // Update canvas logical size to match exact physical pixels without blur
            if (canvas.width !== cw || canvas.height !== ch) {
                canvas.width = cw;
                canvas.height = ch;
            }

            const iw = img.width;
            const ih = img.height;

            const canvasRatio = cw / ch;
            const imgRatio = iw / ih;

            let drawWidth = cw;
            let drawHeight = ch;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                drawWidth = cw;
                drawHeight = cw / imgRatio;
                offsetY = (ch - drawHeight) / 2;
            } else {
                drawHeight = ch;
                drawWidth = ch * imgRatio;
                offsetX = (cw - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Draw Initial Frame
        renderFrameRef.current(0);

        const sequenceState = { frame: 0 };

        // 1. Sequence Mapping Trigger
        ScrollTrigger.create({
            trigger: '.scrollytelling-layer',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.1, // Smooth scrubbing
            onUpdate: (self) => {
                // Map 0-1 progress to 0-(frames.length-1)
                const frameIndex = Math.floor(self.progress * (images.length - 1));

                // Only draw if frame is different to save CPU
                if (sequenceState.frame !== frameIndex) {
                    sequenceState.frame = frameIndex;
                    requestAnimationFrame(() => renderFrameRef.current(frameIndex));
                }
            },
        });

        // 2. Opacity and Blur Reveal Trigger
        gsap.fromTo(canvas,
            { opacity: 0, filter: 'blur(12px)' },
            {
                opacity: 1,
                filter: 'blur(0px)',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.scrollytelling-layer',
                    start: 'top top',
                    end: 'top -100%', // Fades in smoothly over the first 100vh of scrolling
                    scrub: true,
                }
            }
        );

        const handleResize = () => {
            requestAnimationFrame(() => renderFrameRef.current(sequenceState.frame));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [isLoaded, images]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        />
    );
}
