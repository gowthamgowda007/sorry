import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function PromiseSection({ promises }) {
  const [checkedPromises, setCheckedPromises] = useState({});

  const toggleCheck = (id) => {
    setCheckedPromises((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="promises" className="min-h-screen relative py-20 px-4 flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 max-w-lg z-10"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-3 border border-rose-200 shadow-sm">
          <Sparkles size={13} /> Sincere Commitment
        </span>
        <h2 className="text-3xl sm:text-5xl font-dancing font-bold text-slate-800 mb-3">
          My Promises To You
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-poppins">
          Small steps I am taking to care for you better every day
        </p>
      </motion.div>

      {/* Promises Animated List */}
      <div className="max-w-xl w-full flex flex-col gap-4 z-10 px-2">
        {promises.map((promise, index) => (
          <motion.div
            key={promise.id || index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => toggleCheck(promise.id || index)}
            className={`glass-card p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer group shadow-md ${
              checkedPromises[promise.id || index]
                ? 'bg-pink-100/80 border-pink-300 shadow-pink-200/40'
                : 'bg-white/75 border-white/90 hover:bg-white/95 hover:border-pink-200'
            }`}
          >
            {/* Heart Checkbox Icon */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0 ${
                checkedPromises[promise.id || index]
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-pink-50 text-pink-400 group-hover:bg-pink-100 border border-pink-200'
              }`}
            >
              <Heart
                size={18}
                className={
                  checkedPromises[promise.id || index]
                    ? 'fill-white text-white'
                    : 'fill-pink-300 text-pink-400'
                }
              />
            </div>

            {/* Promise Text */}
            <div className="flex-1">
              <p
                className={`text-lg sm:text-xl font-poppins font-medium transition-colors ${
                  checkedPromises[promise.id || index]
                    ? 'text-pink-900 line-through opacity-80'
                    : 'text-slate-800 group-hover:text-pink-600'
                }`}
              >
                {promise.text}
              </p>
              {promise.subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 font-poppins mt-0.5">
                  {promise.subtitle}
                </p>
              )}
            </div>

            <Sparkles
              size={16}
              className="text-pink-300 group-hover:text-pink-500 transition-colors opacity-0 group-hover:opacity-100"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
