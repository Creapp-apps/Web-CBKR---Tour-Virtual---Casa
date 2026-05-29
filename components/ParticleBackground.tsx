'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    r: number;
    dx: number;
    dy: number;
    opacity: number;
    color: string;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const colors = ['#e3e3e3', '#a5a5b5', '#FFFFFF']; // Brand Cream, Gray, White

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor(window.innerWidth / 12); // Responsive count: more on desktop, less on mobile
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 1.5 + 0.5, // 0.5px to 2px (very subtle)
                    dx: (Math.random() - 0.5) * 0.3, // Ultra-slow horizontal drift
                    dy: (Math.random() * -0.4) - 0.1, // Float upwards slowly
                    opacity: Math.random() * 0.6 + 0.1, // Soft opacity
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();

                // Move
                p.x += p.dx;
                p.y += p.dy;

                // Reset if off screen (top or sides)
                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
            });

            // Reset alpha
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1] opacity-70"
        />
    );
}
