'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ThreeDCube = dynamic(() => import('@/components/ThreeDCube'), {
  ssr: false,
  loading: () => (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center">
      <div className="text-cyan-400 text-xl">Cargando 3D...</div>
    </div>
  ),
});

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = scrolled 
    ? 'fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg py-4 transition-all duration-500'
    : 'fixed top-0 left-0 right-0 z-50 bg-transparent py-6 transition-all duration-500';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-cyan-400">BECUBO</div>
        <div className="flex gap-6">
          <a href="#inicio" className="text-white hover:text-cyan-400">Inicio</a>
          <a href="#tecnologia" className="text-white hover:text-cyan-400">Tecnología</a>
          <a href="#contacto" className="text-white hover:text-cyan-400">Contacto</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative">
      <ThreeDCube />
      <div className="text-center z-10">
        <h1 className="text-7xl md:text-9xl font-bold text-cyan-400">BECUBO</h1>
        <p className="text-xl md:text-2xl mt-6 text-gray-400">Innovación Tecnológica 3D</p>
        <p className="text-sm mt-2 text-cyan-400/70">Explora el futuro del diseño interactivo</p>
        <a href="#tecnologia" className="inline-block mt-10 px-8 py-3 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded-full hover:bg-cyan-500/30 transition">
          Descubrir más
        </a>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="text-cyan-400 text-4xl animate-bounce">↓</div>
      </div>
    </section>
  );
}

function Tech() {
  const features = [
    { title: '3D Interactivo', desc: 'Experiencias inmersivas en tiempo real', icon: '🎮' },
    { title: 'WebGL', desc: 'Gráficos de alta Performance', icon: '⚡' },
    { title: 'React Three', desc: 'Componentes modernos y rápidos', icon: '🔵' },
  ];

  return (
    <section id="tecnologia" className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-cyan-400">TECNOLOGÍA</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div key={i} className="p-8 bg-gray-900/50 border border-cyan-500/30 rounded-2xl hover:border-cyan-500 transition hover:scale-105">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contacto" className="py-20 bg-gray-900/30 text-center">
      <h2 className="text-4xl font-bold text-cyan-400 mb-8">BECUBO</h2>
      <p className="text-gray-400">© 2024 Becubo - Tecnología 3D</p>
      <p className="text-gray-500 text-sm mt-4">Construido con Next.js + Three.js</p>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Tech />
      <Footer />
    </main>
  );
}