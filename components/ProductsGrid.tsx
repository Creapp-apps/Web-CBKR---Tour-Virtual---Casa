'use client';

const products = [
    {
        id: 1,
        name: 'Kit Bunker 100L',
        category: 'Kits Living Soil',
        discount: '- 10%',
        price: '$145,000',
        tags: ['Ecosistema Listo', 'Popular'],
        color: 'from-brand-cream/15'
    },
    {
        id: 2,
        name: 'Kit Bunker 350L',
        category: 'Kits Living Soil',
        discount: '- 10%',
        price: '$320,000',
        tags: ['Para Expertos', 'Gran Volumen'],
        color: 'from-cyan-500/15'
    },
    {
        id: 3,
        name: 'Alga Kelp 1 KG',
        category: 'Enmiendas',
        discount: null,
        price: '$25,000',
        tags: ['Nutrición Viva'],
        color: 'from-yellow-400/20'
    },
    {
        id: 4,
        name: 'Kashi Mix - 25L',
        category: 'Enmiendas',
        discount: null,
        price: '$45,000',
        tags: ['Biología Rápida'],
        color: 'from-orange-500/20'
    },
    {
        id: 5,
        name: 'LED LUX CREE J SERIES 480W',
        category: 'Iluminación',
        discount: null,
        price: '$1,250,000',
        tags: ['Premium'],
        color: 'from-purple-500/20'
    },
    {
        id: 6,
        name: 'Kit Enmienda - Hasta 5m²',
        category: 'Materiales',
        discount: '- 10%',
        price: '$95,000',
        tags: ['Mantenimiento'],
        color: 'from-brand-cream/15'
    }
];

export default function ProductsGrid() {
    return (
        <section id="tienda" className="w-full min-h-screen bg-transparent py-32 px-6 md:px-12 relative z-20">
            {/* Banner de Promos */}
            <div className="container mx-auto max-w-5xl mb-24">
                <div className="glass-card flex flex-col md:flex-row justify-between items-center gap-8 bg-gradient-to-r from-black/80 to-brand-cream/5 border-white/10">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-white mb-2">30% OFF</h3>
                        <p className="text-white/70">Abonando en efectivo o transferencia.</p>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-white/20"></div>
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-cyan-400 mb-2">6 Cuotas</h3>
                        <p className="text-white/70">Sin interés con todas las tarjetas.</p>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-white/20"></div>
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold text-brand-cream mb-2">Envío Gratis</h3>
                        <p className="text-white/70">En CABA a partir de $200K.</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">Materiales</h2>
                        <p className="text-white/50 text-xl tracking-widest uppercase">Encuentra tu kit ideal</p>
                    </div>
                    <button className="hidden md:block text-brand-cream hover:text-white border-b border-brand-cream/40 hover:border-white transition-all pb-1 tracking-widest uppercase text-sm">
                        Ver todos los productos
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className={`group glass-card relative overflow-hidden flex flex-col border-white/5 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br ${product.color} to-transparent`}>

                            {product.discount && (
                                <div className="absolute top-4 right-4 bg-brand-cream text-brand-gray text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {product.discount}
                                </div>
                            )}

                            {/* Placeholder para la imagen del producto */}
                            <div className="w-full aspect-square bg-black/40 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                                <span className="text-white/10 uppercase tracking-[0.3em] text-sm transform -rotate-45 block">CBKR.</span>
                                {/* Glow interactivie */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50" />
                            </div>

                            <div className="flex-grow flex flex-col">
                                <div className="text-xs text-white/50 tracking-widest uppercase mb-2">{product.category}</div>
                                <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2">{product.name}</h3>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {product.tags.map(tag => (
                                        <span key={tag} className="text-xs border border-white/20 text-white/70 px-2 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex justify-between items-center">
                                    <span className="text-2xl font-mono font-bold text-cyan-400">{product.price}</span>
                                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-cream group-hover:text-brand-gray transition-colors border border-white/20 group-hover:border-brand-cream">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="md:hidden w-full mt-12 py-4 border border-brand-cream text-brand-cream rounded-full text-sm uppercase tracking-widest text-center hover:bg-brand-cream hover:text-brand-gray transition-all">
                    Ver todos los productos
                </button>
            </div>
        </section>
    );
}
