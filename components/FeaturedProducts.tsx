'use client';

export default function FeaturedProducts() {
    const products = [
        {
            id: 'kit-bunker-100l',
            name: 'Kit Bunker 100L',
            category: 'Kits Living Soil',
            price: '$145.000',
            image: '/products/kit_bunker_100l.png',
            tag: '- 10%',
            tags: ['Ecosistema Listo', 'Popular'],
            accentColor: 'hover:border-[#39FF14]/40 hover:shadow-[0_20px_50px_rgba(57,255,20,0.12)]',
            btnBg: 'group-hover:bg-[#39FF14] group-hover:text-black group-hover:border-[#39FF14]',
            link: 'https://cbkr.tiendanube.com/productos/kit-bunker-100l'
        },
        {
            id: 'kit-bunker-350l',
            name: 'Kit Bunker 350L',
            category: 'Kits Living Soil',
            price: '$320.000',
            image: '/products/kit_bunker_350l.png',
            tag: '- 10%',
            tags: ['Para Expertos', 'Gran Volumen'],
            accentColor: 'hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(34,211,238,0.12)]',
            btnBg: 'group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400',
            link: 'https://cbkr.tiendanube.com/productos/kit-bunker-350l'
        },
        {
            id: 'alga-kelp-1kg',
            name: 'Alga Kelp 1 KG',
            category: 'Enmiendas',
            price: '$25.000',
            image: '/products/alga_kelp_1kg.png',
            tag: null,
            tags: ['Nutrición Viva'],
            accentColor: 'hover:border-yellow-400/40 hover:shadow-[0_20px_50px_rgba(250,204,21,0.12)]',
            btnBg: 'group-hover:bg-yellow-400 group-hover:text-black group-hover:border-yellow-400',
            link: 'https://cbkr.tiendanube.com/productos/alga-kelp-1kg'
        },
        {
            id: 'kashi-mix-25l',
            name: 'Kashi Mix - 25L',
            category: 'Enmiendas',
            price: '$45.000',
            image: '/products/kashi_mix_25l.png',
            tag: null,
            tags: ['Biología Rápida'],
            accentColor: 'hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)]',
            btnBg: 'group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-500',
            link: 'https://cbkr.tiendanube.com/productos/kashi-mix-25l'
        }
    ];

    console.log("CBKR: FeaturedProducts rendered with Crema Editorial styling");

    return (
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col justify-center py-16">
            
            {/* Header del Bloque */}
            <div className="text-center mb-12 anim-child">
                <span className="text-[10px] tracking-[0.3em] text-[#151515]/60 font-bold uppercase mb-2.5 block">
                    VITRINA EXCLUSIVA · PRODUCTOS DESTACADOS
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic font-bold tracking-tight text-[#151515] uppercase leading-none">
                    Productos del Mes
                </h2>
                <p className="text-[#151515]/50 text-xs tracking-widest uppercase mt-3 font-medium">
                    Insumos y sistemas de cultivo biológico de alto rendimiento
                </p>
            </div>

            {/* Grid de 4 Productos Estáticos (Estilo Editorial Blanco sobre Crema) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-10">
                {products.map((prod) => (
                    <a
                        key={prod.id}
                        href={prod.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative rounded-3xl bg-white border border-black/[0.04] p-5 flex flex-col transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.02)] ${prod.accentColor} anim-child`}
                    >
                        {prod.tag && (
                            <span className="absolute top-5 right-5 bg-black text-[#39FF14] text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider z-10 shadow-md">
                                {prod.tag}
                            </span>
                        )}

                        <div className="w-full aspect-[1.1/1] rounded-2xl flex items-center justify-center relative overflow-hidden border border-black/[0.03] mb-5 bg-[#FBFBF9]">
                            <img 
                                src={prod.image} 
                                alt={prod.name} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.97] group-hover:brightness-100" 
                            />
                            {/* Ambient hover overlay */}
                            <div className="absolute inset-0 bg-black/[0.02] opacity-100 group-hover:opacity-0 transition-opacity" />
                        </div>

                        <div className="flex-grow flex flex-col">
                            <span className="text-[9px] text-[#151515]/40 tracking-[0.2em] font-bold uppercase mb-1.5 block">
                                {prod.category}
                            </span>
                            <h3 className="text-base font-bold text-[#151515] uppercase tracking-wider line-clamp-1 mb-2">
                                {prod.name}
                            </h3>
                            
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {prod.tags.map((t, i) => (
                                    <span key={i} className="text-[8px] bg-black/[0.03] border border-black/[0.04] text-[#151515]/60 px-2 py-0.5 rounded-md font-sans font-medium tracking-wide uppercase">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-black/[0.04]">
                                <span className="text-lg font-mono font-black text-[#151515]/90">
                                    {prod.price}
                                </span>
                                <div className={`w-9 h-9 rounded-full bg-black/[0.03] text-black transition-all duration-300 flex items-center justify-center border border-black/[0.04] ${prod.btnBg}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Call To Action */}
            <div className="text-center anim-child mt-4">
                <a 
                    href="https://cbkr.tiendanube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] text-black hover:text-[#39FF14] border-b border-black hover:border-[#39FF14] transition-all pb-1.5 tracking-[0.25em] uppercase font-bold cursor-pointer"
                >
                    Ir a Tienda Oficial en Tiendanube
                </a>
            </div>
            
        </div>
    );
}
