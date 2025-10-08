'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import CartDrawer, { CartItem } from './CartDrawer';
import FireButton from './FireButton';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
}

// Separate component for each menu card to avoid conditional hooks
interface MenuCardProps {
  item: MenuItem;
  index: number;
  inView: boolean;
  addToCart: (item: MenuItem) => void;
}

function MenuCard({ item, index, inView, addToCart }: MenuCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 200 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const xPct = (e.clientX - centerX) / (rect.width / 2);
    const yPct = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      key={item.id}
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative bg-hotpot-charcoal-light rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Popular Badge */}
      {item.popular && (
        <div className="absolute top-4 right-4 z-20 bg-hotpot-red text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          Popular
        </div>
      )}

      {/* Image Container with Gradient Overlay */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-hotpot-charcoal to-hotpot-charcoal-light">
        <div className="absolute inset-0 bg-gradient-to-t from-hotpot-charcoal via-transparent to-transparent z-10"></div>
        <motion.div
          className="w-full h-full flex items-center justify-center text-6xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.5 }}
        >
          {/* Placeholder - Replace with actual images */}
          <div className="text-hotpot-orange opacity-50">🍲</div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-hotpot-orange transition-colors duration-300">
            {item.name}
          </h3>
          <span className="text-hotpot-orange text-xl font-bold whitespace-nowrap ml-4">
            {item.price}
          </span>
        </div>
        
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-hotpot-orange-light uppercase tracking-wider font-semibold">
            {item.category}
          </span>
          
          <motion.button
            onClick={() => addToCart(item)}
            className="bg-hotpot-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-hotpot-red transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 122, 0, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart 🔥
          </motion.button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-hotpot-orange opacity-0 group-hover:opacity-100 rounded-3xl pointer-events-none transition-opacity duration-500"
        style={{ boxShadow: '0 0 30px rgba(255, 122, 0, 0.3)' }}
      />
    </motion.div>
  );
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Egusi Soup', category: 'Soups', description: 'Rich melon seed soup with assorted meat', price: '₦3,500', image: '/images/egusi.jpg', popular: true },
  { id: 2, name: 'Jollof Rice', category: 'Rice', description: 'Smoky party jollof with chicken', price: '₦2,500', image: '/images/jollof.jpg', popular: true },
  { id: 3, name: 'Pepper Soup', category: 'Soups', description: 'Spicy goat meat pepper soup', price: '₦4,000', image: '/images/pepper-soup.jpg' },
  { id: 4, name: 'Pounded Yam', category: 'Swallow', description: 'Smooth pounded yam', price: '₦1,500', image: '/images/pounded-yam.jpg' },
  { id: 5, name: 'Suya', category: 'Grills', description: 'Spicy grilled beef skewers', price: '₦3,000', image: '/images/suya.jpg', popular: true },
  { id: 6, name: 'Fried Rice', category: 'Rice', description: 'Mixed vegetable fried rice', price: '₦2,500', image: '/images/fried-rice.jpg' },
  { id: 7, name: 'Efo Riro', category: 'Soups', description: 'Spinach soup with assorted meat', price: '₦3,500', image: '/images/efo-riro.jpg' },
  { id: 8, name: 'Asun', category: 'Grills', description: 'Spicy grilled goat meat', price: '₦4,500', image: '/images/asun.jpg' },
  { id: 9, name: 'Amala', category: 'Swallow', description: 'Yam flour swallow', price: '₦1,200', image: '/images/amala.jpg' },
  { id: 10, name: 'Chapman', category: 'Drinks', description: 'Refreshing fruit cocktail', price: '₦1,000', image: '/images/chapman.jpg' },
  { id: 11, name: 'Ofada Rice', category: 'Rice', description: 'Local rice with special sauce', price: '₦3,000', image: '/images/ofada.jpg' },
  { id: 12, name: 'Zobo', category: 'Drinks', description: 'Hibiscus drink with ginger', price: '₦800', image: '/images/zobo.jpg' },
];

const categories = ['All', 'Soups', 'Rice', 'Swallow', 'Grills', 'Drinks'];

export default function MenuGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const addToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });

    // Show success feedback
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg z-50 animate-slide-in';
    toast.textContent = `${item.name} added to cart! 🔥`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 px-6 relative overflow-hidden" id="menu">
      {/* Floating Cart Button */}
      <motion.button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-24 right-6 z-30 bg-hotpot-orange text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center font-bold text-xl"
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(255, 122, 0, 0.8)' }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        🛒
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-hotpot-red w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-2 border-hotpot-charcoal"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-hotpot-orange opacity-5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-hotpot-red opacity-5 rounded-full blur-[150px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-hotpot-orange text-sm uppercase tracking-[0.3em] mb-4 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore Our Menu
          </motion.p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-hotpot-red to-hotpot-orange bg-clip-text text-transparent">
            Taste of Nigeria
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every dish crafted with authentic spices and love, bringing Lagos flavors to your doorstep.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-hotpot-orange text-white shadow-lg glow-orange'
                  : 'bg-hotpot-charcoal-light text-gray-400 hover:text-white hover:bg-hotpot-charcoal-light/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <MenuCard 
              key={item.id} 
              item={item} 
              index={index} 
              inView={inView} 
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

