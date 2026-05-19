'use client';

export default function UniverseBackground() {
  return (
    <>
      <style>{`
        @keyframes slowPan {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-1%, 2%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes floatReverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(25px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-bg-pan {
          animation: slowPan 40s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float 10s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: floatReverse 14s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float 18s ease-in-out infinite;
        }
      `}</style>

      {/* Contenedor del Cosmos, absoluto y fijo detrás de todo */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-transparent">

        {/* Capa 1: Fondo eliminado para mantener transparencia total y limpieza visual */}

        {/* Capa 2: Elementos Radiactivos del Ecosistema Flotando como astros/hongos en el espacio 
            Usamos posiciones relativas a las esquinas para asegurarnos de que la Casa Isometrica 
            no los bloquee visualmente por completo */}
        <div className="absolute inset-0 w-full h-full max-w-[1920px] mx-auto">
          {/* Nodo Izquierdo Superior */}
          <img
            src="/universo/Recurso 322.png"
            className="absolute top-[5%] left-[2%] w-40 md:w-64 lg:w-80 opacity-[0.15] animate-float-1"
            style={{ filter: 'brightness(0) invert(1)' }}
            alt="Mycelium Node"
          />

          {/* Nodo Derecho Superior */}
          <img
            src="/universo/Recurso 366.png"
            className="absolute top-[8%] right-[2%] w-48 md:w-72 lg:w-96 opacity-[0.15] animate-float-2"
            style={{ animationDelay: '1s', filter: 'brightness(0) invert(1)' }}
            alt="Bio Structure"
          />

          {/* Raíces Izquierdas Inferiores */}
          <img
            src="/universo/Recurso 330.png"
            className="absolute bottom-[10%] left-[4%] w-56 md:w-80 lg:w-[450px] opacity-[0.15] animate-float-3"
            style={{ animationDelay: '2.5s', filter: 'brightness(0) invert(1)' }}
            alt="Roots"
          />

          {/* Gran Complejo Biológico Derecho Inferior */}
          <img
            src="/universo/Recurso 400.png"
            className="absolute bottom-[5%] right-[0%] w-64 md:w-96 lg:w-[600px] opacity-[0.15] animate-float-1"
            style={{ animationDelay: '4s', filter: 'brightness(0) invert(1)' }}
            alt="Organic Matter"
          />
        </div>

        {/* Capa 3: Viñeta / Neblina de enmarcado para asegurar que UI y botones resalten */}
        <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
        <div className="absolute top-0 w-full h-1/5 bg-gradient-to-b from-black/90 to-transparent z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-black/10 z-10"></div>
      </div>
    </>
  );
}
