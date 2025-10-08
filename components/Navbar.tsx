'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Order', href: '#order' },
    { name: 'About', href: '#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-hotpot-charcoal/95 backdrop-blur-md shadow-lg border-b border-hotpot-orange/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-hotpot-red to-hotpot-orange rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">TH</span>
              </div>
              <span className="text-white font-black text-2xl hidden sm:block">
                The <span className="text-hotpot-orange">Hotpot</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-hotpot-orange transition-colors duration-300 font-semibold relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hotpot-orange group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
            
            <motion.a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-hotpot-orange text-white px-6 py-2.5 rounded-full font-bold hover:bg-hotpot-red transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 122, 0, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white text-2xl"
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-hotpot-charcoal border-t border-hotpot-orange/20"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-hotpot-orange transition-colors duration-300 font-semibold text-lg py-2"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-hotpot-orange text-white text-center px-6 py-3 rounded-full font-bold hover:bg-hotpot-red transition-all duration-300 shadow-lg mt-4"
                whileTap={{ scale: 0.95 }}
              >
                Order Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
