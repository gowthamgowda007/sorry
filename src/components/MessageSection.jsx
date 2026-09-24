import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Quote, Edit3, CheckCircle2 } from 'lucide-react';

export default function MessageSection({ letterText, onOpenCustomize }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [speed, setSpeed] = useState(35); // milliseconds per character

  // Typewriter effect logic
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(true);
  }, [letterText]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < letterText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + letterText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, letterText, isTyping, speed]);

  const restartTyping = () => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(true);
  };

  const skipTyping = () => {
    setDisplayedText(letterText);
    setCurrentIndex(letterText.length);
    setIsTyping(false);
  };

  return (
    <section id="message" className="min-h-screen relative flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full glass-card rounded-3xl p-6 sm:p-10 border border-white/90 shadow-2xl relative"
      >
        {/* Decorative Top Stamp / Wax Seal Badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 text-white p-3 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
          <Heart size={20} className="fill-white text-white animate-pulse" />
        </div>

        {/* Section Header */}
        <div className="text-center mt-4 mb-6">
          <div className="flex justify-center text-pink-300 mb-2">
            <Quote size={28} className="rotate-180 opacity-70" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-dancing font-bold text-slate-800">
            A Letter From My Heart
          </h2>
          <p className="text-xs sm:text-sm text-pink-500 font-poppins font-medium mt-1">
            Words spoken with gentle honesty
          </p>
        </div>

        {/* Letter Text Box */}
        <div className="bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-pink-100/80 shadow-inner min-h-[220px] font-poppins text-slate-700 leading-relaxed sm:text-lg whitespace-pre-line relative">
          <span>{displayedText}</span>
          {isTyping && (
            <span className="inline-block w-2 h-5 bg-pink-400 ml-1 animate-pulse align-middle" />
          )}
        </div>

        {/* Controls Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-pink-100/80">
          <div className="flex items-center gap-2">
            <button
              onClick={restartTyping}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-pink-600 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors"
              title="Replay Typewriter Animation"
            >
              <RotateCcw size={13} />
              <span>Replay</span>
            </button>

            {isTyping ? (
              <button
                onClick={skipTyping}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Read Full</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 size={13} /> Written with warmth
              </span>
            )}
          </div>

          <button
            onClick={onOpenCustomize}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          >
            <Edit3 size={13} />
            <span>Edit Letter</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
