'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FireButton from '@/components/FireButton';
import { FaSearch, FaCheckCircle, FaClock, FaReceipt } from 'react-icons/fa';

interface Order {
  code: string;
  items: Array<{ name: string; quantity: number; price: string }>;
  total: number;
  timestamp: string;
}

export default function SellerPage() {
  const [orderCode, setOrderCode] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!orderCode.trim()) return;

    setIsLoading(true);
    setNotFound(false);
    setSearchedOrder(null);

    // Simulate network delay
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('hotpot_orders') || '[]');
      const found = orders.find((order: Order) => 
        order.code.toUpperCase() === orderCode.toUpperCase()
      );

      if (found) {
        setSearchedOrder(found);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    }, 800);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-hotpot-orange to-hotpot-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <FaReceipt className="text-white text-3xl" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-hotpot-red to-hotpot-orange bg-clip-text text-transparent">
              Seller Dashboard
            </h1>
            <p className="text-gray-400 text-lg">
              Enter an order code to view order details
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-hotpot-charcoal-light rounded-3xl p-8 border-2 border-hotpot-orange/20 shadow-2xl mb-8"
          >
            <label className="text-hotpot-orange font-semibold uppercase tracking-wider text-sm block mb-4">
              Order Code
            </label>
            
            <div className="flex gap-4">
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="THP-XXXX-XXX"
                className="flex-1 bg-hotpot-charcoal text-white px-6 py-4 rounded-full text-lg font-mono tracking-wider border-2 border-hotpot-orange/30 focus:border-hotpot-orange focus:outline-none transition-colors"
              />
              
              <FireButton onClick={handleSearch} className="px-8">
                <FaSearch className="inline mr-2" />
                Search
              </FireButton>
            </div>
          </motion.div>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-hotpot-orange border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-gray-400">Searching for order...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Not Found */}
          <AnimatePresence>
            {notFound && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 text-center"
              >
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-2xl font-bold text-red-400 mb-2">Order Not Found</h3>
                <p className="text-gray-400">
                  No order found with code <span className="font-mono font-bold text-white">{orderCode}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Order Details */}
          <AnimatePresence>
            {searchedOrder && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="space-y-6"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-hotpot-orange/20 to-hotpot-red/20 border-2 border-hotpot-orange/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-hotpot-orange text-sm font-semibold uppercase tracking-wider mb-2">
                        Order Code
                      </p>
                      <p className="text-3xl font-black text-white font-mono tracking-wider">
                        {searchedOrder.code}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-green-500/20 px-6 py-3 rounded-full border-2 border-green-500/50">
                      <FaCheckCircle className="text-green-400 text-xl" />
                      <span className="text-green-400 font-bold">Order Found</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-hotpot-orange/30 flex items-center gap-2 text-gray-400">
                    <FaClock />
                    <span>Placed on {formatDate(searchedOrder.timestamp)}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-hotpot-charcoal-light rounded-2xl p-6 border-2 border-hotpot-orange/20">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span>📋</span> Order Items
                  </h3>
                  
                  <div className="space-y-4">
                    {searchedOrder.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-hotpot-charcoal rounded-xl p-4 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-hotpot-orange/20 rounded-full flex items-center justify-center">
                            <span className="text-hotpot-orange font-black text-lg">
                              {item.quantity}x
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-bold text-lg">{item.name}</p>
                            <p className="text-gray-400 text-sm">{item.price} each</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-hotpot-orange font-bold text-xl">
                            ₦{(parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-6 pt-6 border-t-2 border-hotpot-orange/30 flex justify-between items-center">
                    <span className="text-gray-400 font-semibold text-xl">Total Amount:</span>
                    <span className="text-hotpot-orange font-black text-4xl">
                      ₦{searchedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => window.print()}
                    className="flex-1 bg-hotpot-charcoal-light text-white px-6 py-4 rounded-full font-bold hover:bg-hotpot-charcoal-light/80 transition-colors border-2 border-hotpot-orange/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🖨️ Print Order
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      setSearchedOrder(null);
                      setOrderCode('');
                    }}
                    className="flex-1 bg-hotpot-orange text-white px-6 py-4 rounded-full font-bold hover:bg-hotpot-red transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🔍 Search Another
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}
