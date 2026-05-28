'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const IMAGE_SCALE = 1.15; // Fullscreen cover + crop watermark/edges

interface CanvasSequenceProps {
    onProgress?: (percent: number) => void;
    onComplete?: () => void;
}

export default function CanvasSequence({ onProgress, onComplete }: CanvasSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [frames, setFrames] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const framesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef<number>(-1);

    // Helpers to pad frame numbers (e.g., 0001)
    const padZero = (num: number, size = 4) => {
        let s = num + '';
        while (s.length < size) s = '0' + s;
        return s;
    };

    // 1. Preload image frames inside useEffect
    useEffect(() => {
        let loadedCount = 0;
        const loadedFrames: HTMLImageElement[] = [];

        const checkProgress = () => {
            const progress = Math.floor((loadedCount / FRAME_COUNT) * 100);
            if (onProgress) onProgress(progress);

            if (loadedCount === FRAME_COUNT) {
                framesRef.current = loadedFrames;
                setFrames(loadedFrames);
                setIsLoaded(true);
                if (onComplete) {
                    setTimeout(() => onComplete(), 500);
                }
            }
        };

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/frames/frame_${padZero(i)}.jpg`;

            img.onload = () => {
                loadedFrames[i - 1] = img;
                loadedCount++;
                checkProgress();
            };

            img.onerror = () => {
                console.error(`Error loading frame_${padZero(i)}.jpg`);
                // Still increment to prevent getting stuck
                loadedCount++;
                checkProgress();
            };
        }
    }, [onProgress, onComplete]);

    // Helper function to draw a frame into the Canvas
    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const img = framesRef.current[index];
        if (!img) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Cover calculations with physical scale adjustment
        const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        ctx.fillStyle = '#05050A';
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    };

    // Handle resizing keeping physical pixel ratio
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        // Render current active frame if loaded
        if (currentFrameRef.current >= 0) {
            drawFrame(currentFrameRef.current);
        }
    };

    // 2. Setup GSAP ScrollTrigger Sequence Scrubbing
    useGSAP(() => {
        if (!isLoaded || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;

        // Initial setup for sizing
        handleResize();
        window.addEventListener('resize', handleResize);

        // Draw initial frame
        currentFrameRef.current = 0;
        drawFrame(0);

        // Bind frames to global scroll container progress
        const FRAME_SPEED = 1.4; // Matches v3 accelerated scroll speed for video sequence

        ScrollTrigger.create({
            trigger: '.scrollytelling-layer',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
                const frameIndex = Math.min(Math.floor(accelerated * (FRAME_COUNT - 1)), FRAME_COUNT - 1);

                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex;
                    requestAnimationFrame(() => drawFrame(frameIndex));
                }
            }
        });

        // Cinematic Fade Out canvas at the end of the scroll trigger (85% → 100% progress)
        // Uses progress-based control for exact timing alignment with the page's atrium fade-in.
        ScrollTrigger.create({
            trigger: '.scrollytelling-layer',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                const p = self.progress;
                if (p >= 0.85) {
                    const fadeOut = 1 - ((p - 0.85) / 0.15); // 1 → 0 from 85% to 100%
                    canvas.style.opacity = Math.max(0, fadeOut).toString();
                    if (fadeOut <= 0) canvas.style.pointerEvents = 'none';
                } else {
                    canvas.style.opacity = '1';
                }
            }
        });

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, { scope: containerRef, dependencies: [isLoaded] });

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <canvas
                ref={canvasRef}
                className="fixed inset-0 w-full h-full block object-cover z-0 pointer-events-none transition-opacity duration-500"
                style={{
                    width: '100vw',
                    height: '100vh',
                }}
            />
        </div>
    );
}
