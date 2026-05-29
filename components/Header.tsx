'use client';

import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'py-4 backdrop-blur-md bg-black/60 border-b border-white/10 shadow-lg'
                : 'py-6 bg-transparent'
            }`}>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <img src="/logocbkr.png" alt="CBKR Logo" className="h-6 w-auto object-contain" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8">
                    <Link href="#kits" className="text-sm uppercase tracking-widest text-white/80 hover:text-brand-cream transition-colors font-medium">Kits Living Soil</Link>
                    <Link href="#materiales" className="text-sm uppercase tracking-widest text-white/80 hover:text-brand-cream transition-colors font-medium">Materiales</Link>
                    <Link href="#metodo" className="text-sm uppercase tracking-widest text-white/80 hover:text-white transition-colors font-medium">Método cbkr.</Link>
                    <Link href="#nosotros" className="text-sm uppercase tracking-widest text-white/80 hover:text-white transition-colors font-medium">Nosotros</Link>
                </nav>

                {/* Utilities */}
                <div className="flex items-center space-x-6">
                    <button aria-label="Search" className="text-white hover:text-brand-cream transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button aria-label="Cart" className="text-white hover:text-brand-cream transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                    <button aria-label="Menu" className="md:hidden text-white hover:text-brand-cream transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
