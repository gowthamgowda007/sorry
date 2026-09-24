import React, { useState } from 'react';
import { Heart, Edit3, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenCustomize }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 flex justify-center">
      <nav className="max-w-4xl w-full bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-5 py-2.5 shadow-md flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
            <Heart size={16} className="fill-pink-500" />
          </div>
          <span className="font-dancing text-xl font-bold text-slate-800 tracking-wide">
            For You ❤️
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 font-poppins text-xs font-medium text-slate-600">
          <a href="#message" className="hover:text-pink-600 transition-colors">
            Letter
          </a>
          <a href="#memories" className="hover:text-pink-600 transition-colors">
            Memories
          </a>
          <a href="#promises" className="hover:text-pink-600 transition-colors">
            Promises
          </a>
          <a href="#ending" className="hover:text-pink-600 transition-colors">
            Wait for You
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenCustomize}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 text-xs font-medium transition-all"
          >
            <Edit3 size={13} />
            <span>Customize</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 bg-white/95 backdrop-blur-xl border border-pink-100 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 font-poppins text-sm text-slate-700 z-50">
          <a
            href="#message"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 border-b border-slate-100 text-slate-700 hover:text-pink-600"
          >
            💌 Apology Letter
          </a>
          <a
            href="#memories"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 border-b border-slate-100 text-slate-700 hover:text-pink-600"
          >
            📸 Cherished Memories
          </a>
          <a
            href="#promises"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 border-b border-slate-100 text-slate-700 hover:text-pink-600"
          >
            🌸 My Promises
          </a>
          <a
            href="#ending"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1 border-b border-slate-100 text-slate-700 hover:text-pink-600"
          >
            ❤️ Take Your Time
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCustomize();
            }}
            className="mt-2 w-full py-2.5 rounded-full bg-pink-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow"
          >
            <Edit3 size={14} /> Customize Letter & Content
          </button>
        </div>
      )}
    </header>
  );
}
