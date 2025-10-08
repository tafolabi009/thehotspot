'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import FloatingFoods from './FloatingFoods';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const xPct = (e.clientX - centerX) / (rect.width / 2);
    const yPct = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Floating Foods Background */}
      <FloatingFoods />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-hotpot-orange opacity-20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-hotpot-red opacity-15 rounded-full blur-[150px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hotpot-orange-light opacity-10 rounded-full blur-[200px]"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 122, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 122, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Tagline */}
          <motion.p 
            className="text-hotpot-orange text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Lagos • Authentic • Nigerian
          </motion.p>

          {/* Main Title */}
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)`,
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <span className="bg-gradient-to-r from-hotpot-red via-hotpot-orange to-hotpot-orange-light bg-clip-text text-transparent drop-shadow-2xl">
              The Hotpot
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Authentic Nigerian Taste.{' '}
            <span className="text-hotpot-orange font-semibold">Lagos Delivery Only.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Link href="/menu">
              <motion.button
                className="group relative px-10 py-5 bg-hotpot-orange text-white font-bold text-lg rounded-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Menu</span>
                <motion.div
                  className="absolute inset-0 bg-hotpot-red"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 glow-orange"></div>
              </motion.button>
            </Link>

            <Link href="#order">
              <motion.button
                className="px-10 py-5 bg-transparent border-2 border-hotpot-orange text-hotpot-orange font-bold text-lg rounded-full hover:bg-hotpot-orange hover:text-white transition-all duration-300 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Order Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-hotpot-orange rounded-full flex justify-center p-2">
              <motion.div 
                className="w-1 h-3 bg-hotpot-orange rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border-4 border-hotpot-orange opacity-20 rounded-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-24 h-24 border-4 border-hotpot-red opacity-20 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  );
}
