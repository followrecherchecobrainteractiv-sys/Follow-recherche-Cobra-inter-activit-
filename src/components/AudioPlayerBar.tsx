import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_NAME } from '../data/content';
import { Play, Pause, Volume2, VolumeX, Music, Disc, Sparkles, Sliders } from 'lucide-react';

interface AudioPlayerBarProps {
  currentLang: Language;
  selectedTrackTitle?: string;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentLang,
  selectedTrackTitle,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [currentTrackName, setCurrentTrackName] = useState(
    selectedTrackTitle || "Theme of Cobra Dynasty (Epic Studio Composition)"
  );
  const [activePreset, setActivePreset] = useState<'epic' | 'cyber' | 'ambient'>('epic');

  const t = TRANSLATIONS[currentLang];

  // Web Audio Synth Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (selectedTrackTitle) {
      setCurrentTrackName(selectedTrackTitle);
    }
  }, [selectedTrackTitle]);

  const togglePlay = () => {
    if (isPlaying) {
      stopSynthAudio();
      setIsPlaying(false);
    } else {
      startSynthAudio();
      setIsPlaying(true);
    }
  };

  const startSynthAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.value = muted ? 0 : volume * 0.15;
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm harmonic chord progression (Cobra Theme: F minor / Ab major cinematic vibe)
      const frequencies =
        activePreset === 'epic'
          ? [174.61, 207.65, 261.63, 349.23] // F3, Ab3, C4, F4
          : activePreset === 'cyber'
          ? [130.81, 196.0, 246.94, 293.66] // C3, G3, B3, D4
          : [110.0, 164.81, 220.0, 277.18]; // A2, E3, A3, C#4

      oscillatorsRef.current = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sawtooth' : 'sine';
        osc.frequency.value = freq;

        // Subtle detune for rich analog chorus feel
        osc.detune.value = (i - 1.5) * 8;

        oscGain.gain.value = 0.2;
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        return osc;
      });
    } catch (err) {
      console.warn("Web Audio API error:", err);
    }
  };

  const stopSynthAudio = () => {
    try {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      oscillatorsRef.current = [];
    } catch (e) {}
  };

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = muted ? 0 : volume * 0.15;
    }
  }, [volume, muted]);

  useEffect(() => {
    return () => {
      stopSynthAudio();
    };
  }, []);

  return (
    <section id="sound-lab" className="py-16 bg-slate-950 border-t border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-white/5 border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left Info */}
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md">
                <Music className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cobra Audio Lab Live Synthesizer</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-100 flex items-center justify-center lg:justify-start gap-3">
                <Disc className={`w-6 h-6 text-emerald-400 ${isPlaying ? 'animate-spin' : ''}`} />
                <span>{currentTrackName}</span>
              </h3>
              <p className="text-slate-400 text-xs font-mono">
                Studio Quality • 24-Bit Spatial Audio Composition • Rayan Ouarab Production
              </p>
            </div>

            {/* Middle Presets */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <button
                onClick={() => {
                  setActivePreset('epic');
                  if (isPlaying) {
                    stopSynthAudio();
                    setTimeout(startSynthAudio, 100);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activePreset === 'epic'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                Epic Theme
              </button>

              <button
                onClick={() => {
                  setActivePreset('cyber');
                  if (isPlaying) {
                    stopSynthAudio();
                    setTimeout(startSynthAudio, 100);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activePreset === 'cyber'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                Cyber Synth
              </button>

              <button
                onClick={() => {
                  setActivePreset('ambient');
                  if (isPlaying) {
                    stopSynthAudio();
                    setTimeout(startSynthAudio, 100);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activePreset === 'ambient'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                Ambient OST
              </button>
            </div>

            {/* Right Playback Controls */}
            <div className="flex items-center gap-4">
              
              {/* Main Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMuted(!muted)}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {muted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={muted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
