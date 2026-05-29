'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface StatsCounterProps {
    value: number;
    suffix?: string;
    decimals?: number;
    label: string;
}

export default function StatsCounter({ value, suffix = '', decimals = 0, label }: StatsCounterProps) {
    const numberRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!numberRef.current || !containerRef.current) return;

        const el = numberRef.current;
        const proxy = { val: 0 };

        // ScrollTrigger to trigger counter animation when section enters viewport
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(proxy, {
                    val: value,
                    duration: 2.0,
                    ease: 'power2.out',
                    onUpdate: () => {
                        if (el) {
                            el.textContent = decimals > 0 
                                ? proxy.val.toFixed(decimals) 
                                : Math.round(proxy.val).toString();
                        }
                    }
                });
            },
            onLeaveBack: () => {
                // Reset counter when scrolling back up
                gsap.killTweensOf(proxy);
                proxy.val = 0;
                if (el) el.textContent = '0';
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center p-4">
            <div className="text-5xl md:text-8xl font-black tracking-tighter text-white flex items-baseline">
                <span ref={numberRef} className="font-black">0</span>
                {suffix && <span className="text-brand-cream ml-1 font-bold text-3xl md:text-5xl">{suffix}</span>}
            </div>
            <span className="text-[10px] md:text-xs tracking-[0.3em] font-semibold text-white/40 uppercase mt-4 text-center">
                {label}
            </span>
        </div>
    );
}
