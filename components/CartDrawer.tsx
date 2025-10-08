'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import FireButton from './FireButton';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return total + price * item.quantity;
    }, 0);
  };

  const generateOrderCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const part2 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `THP-${part1}-${part2}`;
  };

  const handleCompleteOrder = () => {
    const code = generateOrderCode();
    setOrderCode(code);
    
    // Store order in localStorage
    const order = {
      code,
      items,
      total: calculateTotal(),
      timestamp: new Date().toISOString(),
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('hotpot_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('hotpot_orders', JSON.stringify(existingOrders));
    
    setOrderPlaced(true);
  };

  const handleSendToWhatsApp = () => {
    const total = calculateTotal();
    const itemsList = items
      .map((item) => `${item.quantity}x ${item.name} - ${item.price}`)
      .join('\n');
    
    const message = encodeURIComponent(
      `Hi, I just placed an order on The Hotpot!\n\n` +
      `Order Code: ${orderCode}\n\n` +
      `Here's my order summary:\n${itemsList}\n\n` +
      `Total: ₦${total.toLocaleString()}\n\n` +
      `Please confirm my order. Thank you!`
    );
    
    window.open(`https://wa.me/2348012345678?text=${message}`, '_blank');
    
    // Reset after sending
    setTimeout(() => {
      setOrderPlaced(false);
      onClearCart();
      onClose();
    }, 2000);
  };

  const total = calculateTotal();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-hotpot-charcoal border-l-2 border-hotpot-orange/30 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-hotpot-orange/20 flex justify-between items-center">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                🛒 Your Cart
                {items.length > 0 && (
                  <span className="bg-hotpot-orange text-white text-sm px-3 py-1 rounded-full">
                    {items.length}
                  </span>
                )}
              </h2>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-hotpot-orange text-2xl"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Order Placed Success Modal */}
            <AnimatePresence>
              {orderPlaced && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-hotpot-charcoal z-10 flex items-center justify-center p-6"
                >
                  <div className="text-center max-w-md">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl"
                      >
                        ✓
                      </motion.span>
                    </motion.div>
                    
                    <h3 className="text-3xl font-black text-white mb-4">Order Placed!</h3>
                    <p className="text-gray-400 mb-6">Your order code is:</p>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-hotpot-charcoal-light border-2 border-hotpot-orange rounded-xl p-6 mb-6"
                    >
                      <p className="text-4xl font-black text-hotpot-orange tracking-wider">
                        {orderCode}
                      </p>
                    </motion.div>

                    <p className="text-gray-400 text-sm mb-6">
                      Save this code! You'll need it to track your order.
                    </p>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <FireButton onClick={handleSendToWhatsApp} className="w-full">
                        <FaWhatsapp className="inline mr-2" />
                        Send to Seller via WhatsApp
                      </FireButton>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <p className="text-6xl mb-4">🍽️</p>
                  <p className="text-lg">Your cart is empty</p>
                  <p className="text-sm mt-2">Add some delicious items from our menu!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-hotpot-charcoal-light rounded-xl p-4 border border-hotpot-orange/20"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg">{item.name}</h3>
                          <p className="text-hotpot-orange font-semibold">{item.price}</p>
                        </div>
                        <motion.button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-400"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 bg-hotpot-charcoal rounded-full text-white font-bold hover:bg-hotpot-orange transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          -
                        </motion.button>
                        <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                        <motion.button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-hotpot-charcoal rounded-full text-white font-bold hover:bg-hotpot-orange transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-hotpot-orange/20 space-y-4">
                <div className="flex justify-between items-center text-xl">
                  <span className="text-gray-400 font-semibold">Total:</span>
                  <span className="text-hotpot-orange font-black text-2xl">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <FireButton onClick={handleCompleteOrder} className="w-full">
                  Complete Order 🔥
                </FireButton>

                <motion.button
                  onClick={onClearCart}
                  className="w-full px-6 py-3 text-red-400 hover:text-red-300 font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear Cart
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
