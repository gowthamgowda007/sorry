import React, { useState, useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import MusicPlayer from './components/MusicPlayer';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MessageSection from './components/MessageSection';
import MemoriesSection from './components/MemoriesSection';
import PromiseSection from './components/PromiseSection';
import EndingSection from './components/EndingSection';
import CustomizeModal from './components/CustomizeModal';
import { Heart } from 'lucide-react';

const DEFAULT_LETTER = `I know I’ve hurt you, and I’m not going to pretend like it didn’t happen.

I’ve been thinking a lot about everything—my words, my behavior, and how it must have made you feel. I realize that my rudeness and insensitivity affected you more than I understood in the moment. You didn’t deserve that, especially from someone who says they loves you.

I’m truly sorry.

Not just for what I did, but for how it made you feel—unheard, hurt, and probably distant. I understand now that saying “sorry” once isn’t enough. What matters is change, and I’m willing to work on that, patiently and consistently.

I respect the space you’ve asked for. I won’t pressure you or rush you. You deserve time to process everything, and I want to be someone who supports that, not someone who adds to your stress.

I still care about you deeply. That hasn’t changed. But right now, more than anything, I want to become a better person—not just for you, but for myself too.

If one day you feel ready, I’ll be here. Not with pressure, not with expectations—just with honesty and respect.

Take care of yourself. You mean a lot to me, always.

— Yours`;

const DEFAULT_MEMORIES = [
  {
    id: 1,
    caption: '3D movie date & silly faces 🍿',
    url: '/assets/user_memory_1.jpg',
  },
  {
    id: 2,
    caption: 'Your beautiful smile with me 💕',
    url: '/assets/user_memory_2.jpg',
  },
  {
    id: 3,
    caption: 'Utsav fest together 🎉',
    url: '/assets/user_memory_3.jpg',
  },
];

const DEFAULT_PROMISES = [
  {
    id: 1,
    text: 'I’ll be more patient',
    subtitle: 'Giving you space & understanding without rush',
  },
  {
    id: 2,
    text: 'I’ll listen better',
    subtitle: 'Hearing your feelings with an open heart & full attention',
  },
  {
    id: 3,
    text: 'I’ll grow every day',
    subtitle: 'Learning from mistakes & becoming a better version of myself',
  },
  {
    id: 4,
    text: 'I’ll cherish your smile',
    subtitle: 'Making sure you feel safe, loved, and valued always',
  },
];

export default function App() {
  const [letterText, setLetterText] = useState(() => {
    return localStorage.getItem('sorry_app_letter_v3') || DEFAULT_LETTER;
  });

  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('sorry_app_memories_v3');
    return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
  });

  const [promises, setPromises] = useState(() => {
    const saved = localStorage.getItem('sorry_app_promises_v3');
    return saved ? JSON.parse(saved) : DEFAULT_PROMISES;
  });

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const handleResetDefaults = () => {
    localStorage.removeItem('sorry_app_letter_v3');
    localStorage.removeItem('sorry_app_memories_v3');
    localStorage.removeItem('sorry_app_promises_v3');
    setLetterText(DEFAULT_LETTER);
    setMemories(DEFAULT_MEMORIES);
    setPromises(DEFAULT_PROMISES);
  };

  return (
    <div className="relative min-h-screen text-slate-800 font-poppins selection:bg-pink-200 selection:text-pink-900">
      {/* Dynamic Background Particles & Bokeh Lights */}
      <BackgroundCanvas />

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Top Navigation Bar */}
      <Navbar onOpenCustomize={() => setIsCustomizeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-12">
        <HeroSection onOpenCustomize={() => setIsCustomizeOpen(true)} />
        <MessageSection
          letterText={letterText}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />
        <MemoriesSection
          memories={memories}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />
        <PromiseSection promises={promises} />
        <EndingSection />
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-slate-500 font-poppins border-t border-pink-100/60 bg-white/40 backdrop-blur-xs">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-slate-600">
          <span>Crafted with love & patience</span>
          <Heart size={12} className="fill-pink-400 text-pink-400 inline" />
        </div>
        <p className="text-slate-400">Take all the time you need ✨</p>
      </footer>

      {/* Live Customize Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        letterText={letterText}
        setLetterText={setLetterText}
        memories={memories}
        setMemories={setMemories}
        promises={promises}
        setPromises={setPromises}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
