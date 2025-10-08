'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Menu Items' },
    { number: '2+', label: 'Years Serving Lagos' },
    { number: '100%', label: 'Authentic Recipes' },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-hotpot-charcoal via-hotpot-charcoal-light to-hotpot-charcoal"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-hotpot-red opacity-5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-hotpot-orange opacity-5 rounded-full blur-[150px]"></div>

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
            Our Story
          </motion.p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-hotpot-red to-hotpot-orange bg-clip-text text-transparent">
            About The Hotpot
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Founded in the heart of Lagos, <span className="text-hotpot-orange font-semibold">The Hotpot</span> was 
                born from a passion for authentic Nigerian cuisine and a desire to share the rich flavors of our heritage 
                with food lovers across the city.
              </p>
              <p>
                Every dish we serve is prepared with traditional recipes passed down through generations, using only the 
                finest local ingredients. From our signature Egusi soup to our perfectly seasoned Jollof rice, we bring 
                the warmth of a home-cooked Nigerian meal right to your doorstep.
              </p>
              <p>
                Our mission is simple: <span className="text-hotpot-orange font-semibold">to preserve and celebrate 
                Nigerian culinary traditions</span> while providing exceptional service and unforgettable taste 
                experiences to every customer.
              </p>
            </div>

            <motion.div
              className="mt-8 p-6 bg-gradient-to-r from-hotpot-orange/10 to-hotpot-red/10 rounded-2xl border border-hotpot-orange/30"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-hotpot-orange font-bold text-xl mb-2">
                "Bringing Lagos homes together, one meal at a time."
              </p>
              <p className="text-gray-400 text-sm">— The Hotpot Team</p>
            </motion.div>
          </motion.div>

          {/* Decorative Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] bg-gradient-to-br from-hotpot-charcoal-light to-hotpot-charcoal rounded-3xl overflow-hidden border-2 border-hotpot-orange/20 shadow-2xl">
              {/* Placeholder for image - replace with actual restaurant image */}
              <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-30">
                🍲
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-hotpot-charcoal via-transparent to-transparent"></div>
            </div>
            
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-hotpot-orange/20 rounded-full blur-xl"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-hotpot-red/20 rounded-full blur-xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center p-8 bg-hotpot-charcoal-light rounded-2xl border border-hotpot-orange/20 hover:border-hotpot-orange/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(255, 122, 0, 0.2)' }}
            >
              <motion.h3 
                className="text-4xl md:text-5xl font-black text-hotpot-orange mb-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-400 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            { 
              icon: '🔥', 
              title: 'Authentic Flavors', 
              description: 'Traditional recipes with genuine Nigerian spices and cooking methods' 
            },
            { 
              icon: '⚡', 
              title: 'Fast Delivery', 
              description: 'Hot meals delivered quickly across Lagos, maintaining freshness and quality' 
            },
            { 
              icon: '❤️', 
              title: 'Made with Love', 
              description: 'Every dish prepared with passion and care, just like home cooking' 
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-gradient-to-br from-hotpot-charcoal-light to-hotpot-charcoal p-8 rounded-2xl border border-hotpot-orange/20 text-center hover:border-hotpot-orange/50 transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="text-6xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
