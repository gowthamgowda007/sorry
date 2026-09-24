import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Smile, X, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EndingSection() {
  const [showModal, setShowModal] = useState(false);

  // Trigger floating heart confetti burst
  const handleTakeYourTime = () => {
    setShowModal(true);

    // Canvas Confetti Heart Burst
    const count = 60;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f472b6', '#ec4899', '#fbcfe8', '#e879f9', '#c084fc'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      shapes: ['circle'],
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section id="ending" className="min-h-screen relative flex flex-col items-center justify-center px-4 py-24 text-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-100/60 via-purple-50/40 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full glass-card rounded-3xl p-8 sm:p-12 border border-white/90 shadow-2xl relative z-10"
      >
        {/* Animated Floating Double Hearts Icon */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center shadow-md border border-pink-200"
          >
            <Heart size={26} className="fill-pink-500 text-pink-500" />
          </motion.div>
          <motion.div
            animate={{ y: [4, -4, 4], rotate: [4, -4, 4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shadow-sm border border-purple-200"
          >
            <Sparkles size={20} className="text-purple-500" />
          </motion.div>
        </div>

        {/* Heading text */}
        <h2 className="text-3xl sm:text-5xl font-dancing font-bold text-slate-800 mb-4">
          I’ll wait, no pressure <span className="inline-block text-pink-500 animate-pulse">❤️</span>
        </h2>

        {/* Supporting warm paragraph */}
        <p className="text-slate-600 font-poppins text-base sm:text-lg mb-8 leading-relaxed max-w-md mx-auto">
          Your feelings, comfort, and peace of mind mean the world to me. Take as much time as you need.
        </p>

        {/* Take Your Time Main Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleTakeYourTime}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-white font-poppins font-semibold text-lg shadow-xl shadow-pink-300/40 hover:shadow-2xl hover:shadow-pink-400/50 border border-white/40 transition-all cursor-pointer"
        >
          <HeartHandshake size={22} />
          <span>Take your time</span>
          <Sparkles size={18} className="animate-spin" style={{ animationDuration: '4s' }} />
        </motion.button>
      </motion.div>

      {/* Pop-up Warm Hug Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border border-pink-200 relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-500 hover:text-pink-600 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-500 mx-auto flex items-center justify-center mb-4 border-2 border-pink-200 shadow-inner">
                <Smile size={32} />
              </div>

              <h3 className="text-2xl font-dancing font-bold text-slate-800 mb-2">
                Sending You A Gentle Warm Hug 🌸
              </h3>

              <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed mb-6">
                Whenever you feel ready to talk or share a smile, I’ll be right here. Thank you for reading my heart.
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-full bg-pink-500 text-white font-poppins font-medium shadow-md hover:bg-pink-600 transition-colors"
              >
                Always here for you ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
