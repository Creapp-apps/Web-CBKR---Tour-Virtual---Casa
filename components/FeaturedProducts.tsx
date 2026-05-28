'use client';

import { useCinematicRouter } from '@/hooks/useCinematicRouter';

export default function FeaturedProducts() {
    const { cinematicNavigate } = useCinematicRouter();

    // Log rendering for foolproof debugging in browser console
    console.log("CBKR: FeaturedProducts mounted and rendering statically");

    return (
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col justify-center h-full">
            
            {/* Header del Bloque */}
            <div className="text-center mb-6 anim-child">
                <span className="text-[10px] tracking-[0.3em] text-[#39FF14] font-bold uppercase mb-1.5 block">
                    DESTACADOS DEL MES
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase leading-none">
                    Productos del Mes
                </h2>
                <p className="text-white/40 text-[10px] tracking-widest uppercase mt-1.5">
                    Insumos y sistemas de cultivo biológico de alto rendimiento
                </p>
            </div>

            {/* Grid de 4 Productos Estáticos (Inmunes a hydration mismatches) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12">
                
                {/* Producto 1: Kit Bunker 100L */}
                <div
                    onClick={() => cinematicNavigate('/tienda')}
                    className="group relative rounded-2xl bg-black/85 border border-white/5 p-4 md:p-5 flex flex-col transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-2 cursor-pointer hover:bg-black/90 hover:border-[#39FF14]/50 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] anim-child"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="absolute top-4 right-4 bg-[#39FF14] text-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider z-10 shadow-lg">
                        - 10%
                    </span>

                    <div className="w-full aspect-[1.15/1] rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5 mb-4 group-hover:border-white/10 transition-colors bg-neutral-900/40">
                        <img 
                            src="/products/kit_bunker_100l.png" 
                            alt="Kit Bunker 100L" 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>

                    <div className="flex-grow flex flex-col">
                        <span className="text-[9px] text-[#39FF14]/80 tracking-[0.2em] font-bold uppercase mb-1">
                            Kits Living Soil
                        </span>
                        <h3 className="text-lg font-black text-white uppercase tracking-wider line-clamp-1 mb-2">
                            Kit Bunker 100L
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            <span className="text-[8px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-md font-mono">
                                Ecosistema Listo
                            </span>
                            <span className="text-[8px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-md font-mono">
                                Popular
                            </span>
                        </div>
                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-lg font-mono font-black text-white/90">
                                $145,000
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#39FF14] group-hover:text-black transition-all duration-300 flex items-center justify-center border border-white/10 group-hover:border-[#39FF14]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Producto 2: Kit Bunker 350L */}
                <div
                    onClick={() => cinematicNavigate('/tienda')}
                    className="group relative rounded-2xl bg-black/85 border border-white/5 p-4 md:p-5 flex flex-col transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-2 cursor-pointer hover:bg-black/90 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] anim-child"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="absolute top-4 right-4 bg-[#39FF14] text-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider z-10 shadow-lg">
                        - 10%
                    </span>

                    <div className="w-full aspect-[1.15/1] rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5 mb-4 group-hover:border-white/10 transition-colors bg-neutral-900/40">
                        <img 
                            src="/products/kit_bunker_350l.png" 
                            alt="Kit Bunker 350L" 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>

                    <div className="flex-grow flex flex-col">
                        <span className="text-[9px] text-cyan-400/80 tracking-[0.2em] font-bold uppercase mb-1">
                            Kits Living Soil
                        </span>
                        <h3 className="text-lg font-black text-white uppercase tracking-wider line-clamp-1 mb-2">
                            Kit Bunker 350L
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            <span className="text-[8px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-md font-mono">
                                Para Expertos
                            </span>
                            <span className="text-[8px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-md font-mono">
                                Gran Volumen
                            </span>
                        </div>
                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-lg font-mono font-black text-white/90">
                                $320,000
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 flex items-center justify-center border border-white/10 group-hover:border-cyan-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Producto 3: Alga Kelp 1 KG */}
                <div
                    onClick={() => cinematicNavigate('/tienda')}
                    className="group relative rounded-2xl bg-black/85 border border-white/5 p-4 md:p-5 flex flex-col transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-2 cursor-pointer hover:bg-black/90 hover:border-yellow-400/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] anim-child"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="w-full aspect-[1.15/1] rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5 mb-4 group-hover:border-white/10 transition-colors bg-neutral-900/40">
                        <img 
                            src="/products/alga_kelp_1kg.png" 
                            alt="Alga Kelp 1 KG" 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>

                    <div className="flex-grow flex flex-col">
                        <span className="text-[9px] text-yellow-400/80 tracking-[0.2em] font-bold uppercase mb-1">
                            Enmiendas
                        </span>
                        <h3 className="text-lg font-black text-white uppercase tracking-wider line-clamp-1 mb-2">
                            Alga Kelp 1 KG
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            <span className="text-[8px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-md font-mono">
                                Nutrición Viva
                            </span>
                        </div>
                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-lg font-mono font-black text-white/90">
                                $25,000
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300 flex items-center justify-center border border-white/10 group-hover:border-yellow-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Producto 4: Kashi Mix - 25L */}
                <div
                    onClick={() => cinematicNavigate('/tienda')}
                    className="group relative rounded-2xl bg-black/85 border border-white/5 p-4 md:p-5 flex flex-col transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-2 cursor-pointer hover:bg-black/90 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] anim-child"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="w-full aspect-[1.15/1] rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5 mb-4 group-hover:border-white/10 transition-colors bg-neutral-900/40">
                        <img 
                            src="/products/kashi_mix_25l.png" 
                            alt="Kashi Mix - 25L" 
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>

                    <div className="flex-grow flex flex-col">
                        <span className="text-[9px] text-orange-500/80 tracking-[0.2em] font-bold uppercase mb-1">
                            Enmiendas
                        </span>
                        <h3 className="text-lg font-black text-white uppercase tracking-wider line-clamp-1 mb-2">
                            Kashi Mix - 25L
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            <span className="text-[8px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-md font-mono">
                                Biología Rápida
                            </span>
                        </div>
                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-lg font-mono font-black text-white/90">
                                $45,000
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300 flex items-center justify-center border border-white/10 group-hover:border-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Call To Action */}
            <div className="text-center anim-child mt-4 md:mt-6">
                <button 
                    onClick={() => cinematicNavigate('/tienda')}
                    className="text-[10px] text-[#39FF14] hover:text-white border-b border-[#39FF14] hover:border-white transition-all pb-1 tracking-[0.2em] uppercase font-bold cursor-pointer"
                >
                    Ver catálogo completo de tienda
                </button>
            </div>
            
        </div>
    );
}
