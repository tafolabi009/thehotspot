'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface FireButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function FireButton({ children, onClick, className = '', variant = 'primary' }: FireButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const baseStyles = variant === 'primary'
    ? 'bg-hotpot-orange text-white hover:bg-hotpot-red'
    : 'bg-transparent border-2 border-hotpot-orange text-hotpot-orange hover:bg-hotpot-orange hover:text-white';

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative px-8 py-4 font-bold text-lg rounded-full overflow-hidden shadow-2xl transition-colors duration-300 ${baseStyles} ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Fire Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 122, 0, 0.8) 0%, rgba(230, 0, 0, 0.6) 50%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        whileHover={{
          opacity: [0, 0.8, 0.6],
          scale: [0.8, 1.2, 1],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
        whileTap={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.3, 1],
          transition: { duration: 0.3 },
        }}
      />

      {/* Shimmer Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        whileHover={{
          opacity: [0, 0.3, 0],
          x: ['-100%', '100%'],
          transition: { duration: 1, repeat: Infinity },
        }}
      />

      {/* Button Content */}
      <span className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </span>

      {/* Glow Border */}
      <motion.div
        className="absolute inset-0 border-2 border-hotpot-orange rounded-full opacity-0"
        whileHover={{
          opacity: 1,
          boxShadow: [
            '0 0 20px rgba(255, 122, 0, 0.5)',
            '0 0 40px rgba(255, 122, 0, 0.8)',
            '0 0 20px rgba(255, 122, 0, 0.5)',
          ],
          transition: { duration: 1.5, repeat: Infinity },
        }}
      />
    </motion.button>
  );
}
