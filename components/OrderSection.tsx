'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaCopy, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function OrderSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const accountDetails = {
    bankName: 'First Bank of Nigeria',
    accountName: 'The Hotpot Restaurant',
    accountNumber: '1234567890',
  };

  const whatsappNumber = '2348012345678';
  const whatsappMessage = encodeURIComponent(
    "Hello! I'd like to place an order from The Hotpot menu. Here are the items I want:"
  );

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden" id="order">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-hotpot-charcoal via-hotpot-charcoal-light to-hotpot-charcoal"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hotpot-orange opacity-5 rounded-full blur-[200px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            Ready to Order?
          </motion.p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-hotpot-red to-hotpot-orange bg-clip-text text-transparent">
            How to Order
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fast delivery across Lagos. Pay, order via WhatsApp, and we'll bring the heat to your doorstep! 🔥
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-hotpot-charcoal-light to-hotpot-charcoal rounded-3xl p-8 border-2 border-hotpot-orange/20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-hotpot-orange/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Payment Details</h3>
            </div>

            <p className="text-gray-400 mb-6">
              Transfer to our account below, then confirm your order via WhatsApp:
            </p>

            <div className="space-y-4">
              {/* Bank Name */}
              <div className="bg-hotpot-charcoal rounded-xl p-4 border border-hotpot-orange/10">
                <label className="text-xs text-hotpot-orange uppercase tracking-wider font-semibold block mb-2">
                  Bank Name
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">{accountDetails.bankName}</span>
                  <motion.button
                    onClick={() => copyToClipboard(accountDetails.bankName, 'bank')}
                    className="text-hotpot-orange hover:text-hotpot-orange-light transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedField === 'bank' ? <FaCheckCircle /> : <FaCopy />}
                  </motion.button>
                </div>
              </div>

              {/* Account Name */}
              <div className="bg-hotpot-charcoal rounded-xl p-4 border border-hotpot-orange/10">
                <label className="text-xs text-hotpot-orange uppercase tracking-wider font-semibold block mb-2">
                  Account Name
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">{accountDetails.accountName}</span>
                  <motion.button
                    onClick={() => copyToClipboard(accountDetails.accountName, 'name')}
                    className="text-hotpot-orange hover:text-hotpot-orange-light transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedField === 'name' ? <FaCheckCircle /> : <FaCopy />}
                  </motion.button>
                </div>
              </div>

              {/* Account Number */}
              <div className="bg-hotpot-charcoal rounded-xl p-4 border border-hotpot-orange/10">
                <label className="text-xs text-hotpot-orange uppercase tracking-wider font-semibold block mb-2">
                  Account Number
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-xl tracking-wider">
                    {accountDetails.accountNumber}
                  </span>
                  <motion.button
                    onClick={() => copyToClipboard(accountDetails.accountNumber, 'account')}
                    className="text-hotpot-orange hover:text-hotpot-orange-light transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedField === 'account' ? <FaCheckCircle /> : <FaCopy />}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Order Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-hotpot-charcoal-light to-hotpot-charcoal rounded-3xl p-8 border-2 border-hotpot-orange/20 shadow-2xl flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-2xl text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Order via WhatsApp</h3>
            </div>

            <p className="text-gray-400 mb-8">
              After making payment, send us your order details and payment proof on WhatsApp.
            </p>

            <div className="bg-hotpot-charcoal rounded-xl p-6 mb-8 border border-hotpot-orange/10">
              <h4 className="text-hotpot-orange font-semibold mb-3 uppercase text-sm tracking-wider">
                Include in your message:
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-hotpot-orange">✓</span>
                  <span>Your name and delivery address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-hotpot-orange">✓</span>
                  <span>Items you want to order</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-hotpot-orange">✓</span>
                  <span>Payment confirmation/screenshot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-hotpot-orange">✓</span>
                  <span>Preferred delivery time</span>
                </li>
              </ul>
            </div>

            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-8 rounded-full flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transition-all duration-300 mt-auto group"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp className="text-2xl group-hover:animate-bounce" />
              <span className="text-lg">Chat with Us on WhatsApp</span>
            </motion.a>

            <p className="text-center text-xs text-gray-500 mt-4">
              Available Mon-Sat, 10AM - 10PM
            </p>
          </motion.div>
        </div>

        {/* Delivery Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-hotpot-red/20 to-hotpot-orange/20 rounded-2xl p-6 border border-hotpot-orange/30 text-center"
        >
          <p className="text-white text-lg">
            🚗 <span className="font-bold text-hotpot-orange">Free delivery</span> on orders above ₦10,000 within Lagos
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Currently delivering across all Lagos mainland and island locations
          </p>
        </motion.div>
      </div>
    </section>
  );
}
