'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.8, duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-hotpot-charcoal flex items-center justify-center"
      onAnimationComplete={() => setIsLoading(false)}
    >
      <div className="relative">
        {/* Animated Circles */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-32 h-32 border-4 border-hotpot-orange rounded-full opacity-50"></div>
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 0] }}
          transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-32 h-32 border-4 border-hotpot-red rounded-full opacity-50"></div>
        </motion.div>

        {/* Logo/Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.h1 
            className="text-6xl font-black bg-gradient-to-r from-hotpot-red to-hotpot-orange bg-clip-text text-transparent"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255, 122, 0, 0.5)',
                '0 0 40px rgba(230, 0, 0, 0.5)',
                '0 0 20px rgba(255, 122, 0, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            The Hotpot
          </motion.h1>
          <motion.p 
            className="text-hotpot-orange text-center mt-4 uppercase tracking-widest text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading...
          </motion.p>
        </motion.div>

        {/* Loading Dots */}
        <motion.div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-hotpot-orange rounded-full"
              animate={{ y: [0, -20, 0] }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
