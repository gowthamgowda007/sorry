import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, Edit3 } from 'lucide-react';

export default function HeroSection({ onOpenCustomize }) {
  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center px-4 pt-16 pb-12 overflow-hidden">
      {/* Gentle Floating Pastel Glow background highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Glass Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl w-full text-center p-8 sm:p-12 glass-card rounded-3xl border border-white/80 shadow-2xl backdrop-blur-xl"
      >
        {/* Floating Sparkle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-600 text-xs sm:text-sm font-medium mb-6 shadow-sm"
        >
          <Sparkles size={14} className="text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A message for someone special</span>
          <Sparkles size={14} className="text-pink-500" />
        </motion.div>

        {/* Heart Animation Illustration */}
        <motion.div
          animate={{ scale: [1, 1.12, 1, 1.08, 1] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative inline-block mb-6 cursor-pointer group"
          onClick={() => {
            // Heart pop effect
          }}
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-pink-300 via-rose-200 to-purple-200 flex items-center justify-center shadow-lg shadow-pink-300/40 border-4 border-white">
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 fill-pink-500 text-pink-500 drop-shadow-md group-hover:scale-110 transition-transform" />
          </div>
          {/* Sparkles around heart */}
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-pink-400 animate-bounce" />
          <Sparkles className="absolute -bottom-1 -left-1 w-5 h-5 text-purple-400 animate-pulse" />
        </motion.div>

        {/* Big Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl sm:text-6xl font-bold font-dancing text-slate-800 tracking-wide mb-3 drop-shadow-sm"
        >
          I'm Sorry <span className="text-pink-500 inline-block animate-pulse">❤️</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-lg sm:text-xl text-slate-600 font-poppins font-light italic mb-8"
        >
          From my heart to yours…
        </motion.p>

        {/* Customize button hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-3"
        >
          <a
            href="#message"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Read My Letter
          </a>
          <button
            onClick={onOpenCustomize}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white/70 hover:bg-white text-slate-600 border border-slate-200 text-xs sm:text-sm font-medium transition-all shadow-sm"
            title="Customize letter, photos, or promises"
          >
            <Edit3 size={15} className="text-pink-500" />
            <span>Customize</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Down Arrow Floating Indicator */}
      <motion.a
        href="#message"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="mt-12 text-pink-400 hover:text-pink-600 transition-colors cursor-pointer p-2 flex flex-col items-center gap-1"
        aria-label="Scroll down"
      >
        <span className="text-xs font-poppins font-medium tracking-wider uppercase text-pink-400/80">Scroll gently</span>
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
