'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveUniverse() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position state inside refs to avoid re-renders
    const mouse = useRef({ x: 0, y: 0 });

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. SCROLL PARALLAX (Y-AXIS)
        // The main tower stays relatively central but moves up slightly as we scroll deep into it.
        gsap.to('.tower', {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.universe-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            }
        });

        // We select all elements that have a 'data-depth' attribute.
        // data-depth=1 means foreground (moves fast), data-depth=0.1 means background (moves slow).
        const parallaxElements = gsap.utils.toArray('.parallax-item');
        parallaxElements.forEach((el: any) => {
            const depth = parseFloat(el.getAttribute('data-depth') || '0.5');
            // For elements, we move them up as the user scrolls down, giving a deep 3D effect.
            gsap.to(el, {
                yPercent: -150 * depth,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.universe-container',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                }
            });
        });

        // 2. ISABL-STYLE REVEAL (The initial fade-in and unblur)
        // The entire universe starts hidden and blury, becoming visible as user scrolls first 100vh.
        gsap.fromTo('.universe-wrapper',
            { opacity: 0, filter: 'blur(20px)', scale: 1.1 },
            {
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.universe-container',
                    start: 'top top',
                    end: 'top -100%',
                    scrub: true,
                }
            }
        );

        // 3. MOUSE FOLLOWER (X/Y-AXIS) - Organic Movement
        const onMouseMove = (e: MouseEvent) => {
            // Normalize mouse between -1 and 1
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;

            parallaxElements.forEach((el: any) => {
                const depth = parseFloat(el.getAttribute('data-depth') || '0.5');
                // The closer the object (higher depth), the more it reacts to the mouse
                gsap.to(el, {
                    x: mouse.current.x * 50 * depth,
                    y: mouse.current.y * 50 * depth,
                    duration: 2,
                    ease: 'power3.out',
                    overwrite: 'auto',
                });
            });

            // Tower subtle movement
            gsap.to('.tower', {
                x: mouse.current.x * -10,
                y: mouse.current.y * -10,
                duration: 3,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="universe-container absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-0">

            {/* Fixed wrapper where the layers exist */}
            <div className="universe-wrapper fixed top-0 left-0 w-full h-screen overflow-hidden">

                <div className="absolute inset-0 bg-[#0B0B1A] -z-10" />

                {/* --- MAIN TOWER BACKGROUND --- */}
                <div className="tower absolute left-1/2 top-0 w-full min-w-[800px] h-[150vh] -translate-x-1/2 opacity-70">
                    <Image
                        src="/universo/Torre CBKR (1).png"
                        alt="Torre CBKR"
                        fill
                        className="object-contain object-top"
                        priority
                    />
                </div>

                {/* --- FOREGROUND & BACKGROUND ELEMENTS --- */}
                {/* Layer 1: Background distant elements (Slow scroll, blurry) */}
                <Image src="/universo/Recurso 322.png" alt="" width={150} height={150} data-depth="0.2" className="parallax-item absolute top-[10%] left-[10%] opacity-40 blur-[2px]" />
                <Image src="/universo/Recurso 327.png" alt="" width={100} height={100} data-depth="0.3" className="parallax-item absolute top-[25%] right-[15%] opacity-50 blur-[1px]" />
                <Image src="/universo/Recurso 330.png" alt="" width={80} height={80} data-depth="0.1" className="parallax-item absolute top-[60%] left-[20%] opacity-30 blur-[3px]" />

                {/* Layer 2: Midground elements (Normal scroll) */}
                <Image src="/universo/Recurso 366.png" alt="" width={300} height={300} data-depth="0.8" className="parallax-item absolute top-[40%] left-[-5%] opacity-80" />
                <Image src="/universo/Recurso 367.png" alt="" width={250} height={250} data-depth="0.9" className="parallax-item absolute top-[70%] right-[5%] opacity-80" />
                <Image src="/universo/Recurso 370.png" alt="" width={350} height={350} data-depth="0.7" className="parallax-item absolute top-[120%] left-[10%] opacity-60" />

                {/* Layer 3: Foreground elements (Fast scroll, very big, out of focus) */}
                <Image src="/universo/Recurso 383.png" alt="" width={500} height={500} data-depth="1.5" className="parallax-item absolute top-[30%] right-[-10%] opacity-90 blur-[4px]" />
                <Image src="/universo/Recurso 400.png" alt="" width={400} height={400} data-depth="1.8" className="parallax-item absolute top-[90%] left-[-15%] opacity-95 blur-[6px]" />
                <Image src="/universo/Recurso 401.png" alt="" width={450} height={450} data-depth="2.0" className="parallax-item absolute top-[150%] right-[10%] opacity-100 blur-[8px]" />

                {/* Vignette / Overlay to blend edges into the dark background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0B1A_100%)] pointer-events-none" />
            </div>
        </div>
    );
}
