import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ZoomIn, Sparkles } from 'lucide-react';

export default function MemoriesSection({ memories, onOpenCustomize }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Default tilt angles for Polaroid organic aesthetic look
  const tilts = ['-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2'];

  return (
    <section id="memories" className="min-h-screen relative py-20 px-4 flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 relative z-10 max-w-xl"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/90 text-pink-600 text-xs font-semibold tracking-wide uppercase mb-3 border border-pink-200 shadow-sm">
          <Sparkles size={13} /> Cherished Memories
        </span>
        <h2 className="text-3xl sm:text-5xl font-dancing font-bold text-slate-800 mb-3">
          Moments We Shared
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-poppins italic">
          “Our moments mean everything to me”
        </p>
      </motion.div>

      {/* Polaroid Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full relative z-10 px-2">
        {memories.map((item, index) => {
          const tiltClass = tilts[index % tilts.length];
          return (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`polaroid-card cursor-pointer relative group ${tiltClass}`}
              onClick={() => setSelectedPhoto(item)}
            >
              {/* Cute Washi Tape Decor on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/70 border border-pink-300/40 rounded-xs shadow-sm transform -rotate-1 z-10 backdrop-blur-xs opacity-90" />

              {/* Photo Frame */}
              <div className="relative aspect-square w-full overflow-hidden rounded bg-slate-100 mb-4 border border-slate-100">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 p-2.5 rounded-full shadow-md text-pink-600">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="text-center font-dancing text-xl text-slate-700 font-semibold px-2">
                {item.caption}
              </div>

              {/* Small Heart Icon */}
              <div className="absolute bottom-2 right-3 text-pink-300 group-hover:text-pink-500 transition-colors">
                <Heart size={14} className="fill-current" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-5 sm:p-7 rounded-2xl max-w-lg w-full shadow-2xl relative border border-pink-100"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-600 hover:text-pink-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="rounded-xl overflow-hidden aspect-square w-full mb-4 border border-slate-100 shadow-sm">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center font-dancing text-2xl text-slate-800 font-bold mb-1">
                {selectedPhoto.caption}
              </div>
              <p className="text-center text-xs text-slate-500 font-poppins">
                Always locked safely in my heart ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
