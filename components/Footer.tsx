'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com', color: '#1877F2' },
    { icon: FaInstagram, href: 'https://instagram.com', color: '#E4405F' },
    { icon: FaTwitter, href: 'https://twitter.com', color: '#1DA1F2' },
    { icon: FaWhatsapp, href: 'https://wa.me/2348012345678', color: '#25D366' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-hotpot-charcoal to-black border-t border-hotpot-orange/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-hotpot-orange opacity-5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-hotpot-red opacity-5 rounded-full blur-[150px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-hotpot-red to-hotpot-orange bg-clip-text text-transparent">
              The Hotpot
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Bringing authentic Nigerian flavors to every corner of Lagos. 
              Experience the taste of home, delivered fresh.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-hotpot-charcoal-light rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: social.color,
                    boxShadow: `0 0 20px ${social.color}40`
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'Menu', 'Order', 'About'].map((link) => (
                <li key={link}>
                  <Link 
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-hotpot-orange transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-hotpot-orange group-hover:w-4 transition-all duration-300"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-hotpot-orange mt-1 flex-shrink-0" />
                <span>
                  Unilag Estate, Magodo,<br />
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-hotpot-orange flex-shrink-0" />
                <a href="tel:+2348012345678" className="hover:text-hotpot-orange transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-hotpot-orange flex-shrink-0" />
                <a href="mailto:customercare@thehotpot.app" className="hover:text-hotpot-orange transition-colors">
                  customercare@thehotpot.app
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Business Hours
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-hotpot-orange font-semibold">9AM - 7PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-hotpot-orange font-semibold">10AM - 7PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-red-500 font-semibold">Closed</span>
              </li>
            </ul>
            <motion.div 
              className="mt-6 bg-hotpot-orange/10 border border-hotpot-orange/30 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-hotpot-orange text-sm font-semibold">
                🔥 Order now for same-day delivery!
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-hotpot-orange/20 my-8"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm"
        >
          <p>
            © {currentYear} <span className="text-hotpot-orange font-semibold">The Hotpot</span>. 
            All rights reserved. Made with ❤️ in Lagos.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-hotpot-orange transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-hotpot-orange transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-hotpot-red via-hotpot-orange to-hotpot-red"></div>
    </footer>
  );
}
