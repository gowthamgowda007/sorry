import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioCtxRef = useRef(null);
  const isSetupRef = useRef(false);
  const intervalRef = useRef(null);

  // Web Audio Synth setup for soft ambient lullaby
  const startAmbientSynth = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Soft warm chord frequencies (Hz)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23], // G7
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      const now = ctx.currentTime;
      const currentNotes = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      currentNotes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Soft sine wave for warm lullaby tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Soft attack & long decay
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(volume * 0.12, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 4.2);
      });
    };

    playChord();
    intervalRef.current = setInterval(playChord, 4200);
  };

  const stopAmbientSynth = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    setShowTooltip(false);
    if (isPlaying) {
      stopAmbientSynth();
      setIsPlaying(false);
    } else {
      startAmbientSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
      {/* Tooltip hint */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-pink-600 font-medium shadow-md border border-pink-200 animate-pulse">
          <span>Click for soothing music</span>
          <Heart size={12} className="fill-pink-400 text-pink-400" />
        </div>
      )}

      {/* Main Music Toggle Button */}
      <button
        onClick={toggleMusic}
        aria-label="Toggle Soft Background Music"
        className={`relative group p-3 rounded-full glass-card-hover transition-all duration-300 flex items-center justify-center border shadow-lg ${
          isPlaying
            ? 'bg-pink-100/90 text-pink-600 border-pink-300 ring-2 ring-pink-300/50'
            : 'bg-white/80 text-slate-500 border-white/80 hover:text-pink-500'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <Volume2 size={20} className="text-pink-500 animate-bounce" />
            {/* Animated Sound Bars */}
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 bg-pink-400 rounded-full animate-[ping_1.2s_ease-in-out_infinite] h-3"></span>
              <span className="w-1 bg-pink-500 rounded-full animate-[ping_0.9s_ease-in-out_infinite_0.2s] h-4"></span>
              <span className="w-1 bg-pink-400 rounded-full animate-[ping_1.4s_ease-in-out_infinite_0.4s] h-2.5"></span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Music size={20} />
            <VolumeX size={14} className="opacity-60" />
          </div>
        )}
      </button>
    </div>
  );
}
