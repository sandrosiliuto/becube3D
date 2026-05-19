'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ThreeDCube = dynamic(() => import('@/components/ThreeDCube'), {
  ssr: false,
  loading: () => (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-gradient-to-b from-dark-800 to-dark-900 flex items-center justify-center">
      <div className="text-cyan-400 text-xl animate-pulse">Cargando 3D...</div>
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-dark-900/90 backdrop-blur-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wider">
          <span