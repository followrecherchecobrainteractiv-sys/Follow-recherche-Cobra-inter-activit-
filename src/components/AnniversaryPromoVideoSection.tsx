import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_NAME, FOUNDER_NAME } from '../data/content';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Award,
  Sparkles,
  Crown,
  Film,
  Music,
  Tv,
  ChevronRight,
  ChevronLeft,
  Share2,
  Check,
  ShieldAlert,
  Sliders,
  Flame,
  Star
} from 'lucide-react';

import anniversaryBannerImg from '../assets/images/rayan_ouarab_anniversary_banner_1785628196230.jpg';
import rdrWesternStudioImg from '../assets/images/rayan_ouarab_anniversary_banner_1785628196230.jpg';
import rayanGameStudioImg from '../assets/images/rayan_ouarab_anniversary_banner_1785628196230.jpg';
import rayanMusicLabImg from '../assets/images/rayan_ouarab_anniversary_banner_1785628196230.jpg';
import rayanCinemaDirectorImg from '../assets/images/rayan_ouarab_anniversary_banner_1785628196230.jpg';

interface AnniversaryPromoVideoSectionProps {
  currentLang: Language;
}

interface VideoScene {
  id: number;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  caption: Record<Language, string>;
  image: string;
  duration: number; // in seconds
  soundPreset: 'rdr_outlaw' | 'frontier' | 'golden_anniversary' | 'western_dust';
  zoomOrigin: string;
}

// Real High-Quality Western Acoustic OST Audio URLs
const WESTERN_AUDIO_TRACKS = {
  rdr_outlaw: {
    name: "Red Dead Outlaw - Acoustic Guitar & Whistle",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    type: "acoustic_outlaw"
  },
  frontier: {
    name: "Frontier Sunset - Wild West Acoustic Theme",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    type: "western_frontier"
  },
  golden_anniversary: {
    name: "Golden Anniversary - Epic Cobra Symphony",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    type: "symphonic_epic"
  },
  western_dust: {
    name: "Western Dust - Cowboy Fingerpicking",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    type: "fingerpick"
  }
};

export const AnniversaryPromoVideoSection: React.FC<AnniversaryPromoVideoSectionProps> = ({
  currentLang,
}) => {
  const isRtl = currentLang === 'ar';

  // Video State Controls
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [sceneProgress, setSceneProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [activeMusicTrack, setActiveMusicTrack] = useState<'rdr_outlaw' | 'frontier' | 'golden_anniversary' | 'western_dust'>('rdr_outlaw');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [sparksCount, setSparksCount] = useState<number>(0);
  const [selectedInspectImage, setSelectedInspectImage] = useState<string | null>(null);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Synth for realistic acoustic harmonics & sound FX
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeOscillatorsRef = useRef<any[]>([]);
  const rhythmTimerRef = useRef<any>(null);

  const scenes: VideoScene[] = [
    {
      id: 1,
      title: {
        ar: "الذكرى التأسيسية المجيدة — Follow Recherche Cobra Inter Activité",
        fr: "Anniversaire Fondateur Officiel — Follow Recherche Cobra Inter Activité",
        en: "Official Founding Anniversary — Follow Recherche Cobra Inter Activité"
      },
      subtitle: {
        ar: "تكريم رسمي للمالك والمؤسس: Ouarab Rayane (ريان وعراب)",
        fr: "Hommage Officiel au Fondateur et Propriétaire: Ouarab Rayane",
        en: "Official Tribute to Owner & Founder: Ouarab Rayane"
      },
      caption: {
        ar: "في هذا اليوم الأغلى، نحتفل بذكرى تأسيس Follow Recherche Cobra Inter Activité، رمز الابتكار والتميز التكنولوجي والفني بقيادة المؤسس والمالك الرسمي Ouarab Rayane.",
        fr: "En ce jour mémorable, nous célébrons la fondation de Follow Recherche Cobra Inter Activité, symbole d'excellence dirigé par le propriétaire officiel Rayan Ouarab.",
        en: "On this monumental day, we celebrate the founding of Follow Recherche Cobra Inter Activité, an epicenter of creative engineering led by official owner Rayan Ouarab."
      },
      image: anniversaryBannerImg,
      duration: 16,
      soundPreset: 'golden_anniversary',
      zoomOrigin: 'center center'
    },
    {
      id: 2,
      title: {
        ar: "روح Red Dead Redemption وسحر الغرب الإبداعي",
        fr: "Esprit Red Dead Redemption & Légende de l'Ouest",
        en: "Red Dead Redemption Outlaw Spirit & Western Legend"
      },
      subtitle: {
        ar: "مجسمات الأساطير الأيقونية مع ألحان الجيتار الغربي الأصيل",
        fr: "Figurines emblématiques et compositions guitare western acoustique",
        en: "Iconic western figurines paired with authentic acoustic outlaw soundtracks"
      },
      caption: {
        ar: "مزيج ساحر بين شخصيات Red Dead Redemption الأسطورية وأحدث شاشات تطوير كود C++ ومحرك Cobra Engine لبناء عوالم لا تُنسى.",
        fr: "Une alliance magistrale entre l'atmosphère de Red Dead Redemption, le code C++ et les moteurs graphiques de pointe.",
        en: "A cinematic fusion of legendary Red Dead Redemption outlaw themes, C++ code engines, and cutting-edge 3D graphics."
      },
      image: rdrWesternStudioImg,
      duration: 18,
      soundPreset: 'rdr_outlaw',
      zoomOrigin: 'top left'
    },
    {
      id: 3,
      title: {
        ar: "استوديو الألعاب ومحرك Cobra 3D AAA — ريان وعراب",
        fr: "Studio de Jeux Vidéo AAA & Moteur Cobra Engine — Rayan Ouarab",
        en: "AAA Game Studio & Cobra 3D Engine — Rayan Ouarab"
      },
      subtitle: {
        ar: "تطوير ألعاب ثلاثية الأبعاد بآليات قتال وفيزياء متطورة بقيادة ريان وعراب",
        fr: "Développement de jeux vidéo 3D et physique de pointe dirigé par Rayan Ouarab",
        en: "Next-generation 3D game design and real-time physics engines led by Rayan Ouarab"
      },
      caption: {
        ar: "يقوم المؤسس ريان وعراب (Ouarab Rayane) بقيادة ابتكارات محرك Cobra Engine لتطوير ألعاب عالم مفتوح برسوميات سينمائية ونظم ذكاء اصطناعي تفاعلية.",
        fr: "Le propriétaire officiel Rayan Ouarab dirige la conception de jeux vidéo 3D en monde ouvert avec des graphismes d'une précision inégalée.",
        en: "Official owner Rayan Ouarab leads open-world 3D game creation featuring high-fidelity graphics and realistic enemy AI."
      },
      image: rayanGameStudioImg,
      duration: 15,
      soundPreset: 'frontier',
      zoomOrigin: 'center right'
    },
    {
      id: 4,
      title: {
        ar: "مختبر الصوت والأوركيسترا — Cobra Audio Lab & Rayan Ouarab",
        fr: "Cobra Audio Lab — Production Musicale Spéciale Rayan Ouarab",
        en: "Cobra Audio Lab — Soundtracks by Rayan Ouarab"
      },
      subtitle: {
        ar: "إنتاج موسيقي سينمائي وتوزيع 24-Bit spatial audio بحضور المالك",
        fr: "Production musicale épique et mastering spatialisé haute résolution en studio",
        en: "Epic soundtrack production and Dolby Atmos spatial audio mastering in studio"
      },
      caption: {
        ar: "تأليف ألحان ملحمية تدمج الجيتار الخشبي، الصفير السينمائي، والمؤثرات الصوتية المحيطية في استوديو ريان وعراب الخاص.",
        fr: "Compositions musicales immersives mariant guitare acoustique, sifflements western et percussions épiques dans le studio de Rayan Ouarab.",
        en: "Crafting symphonic & western soundtracks with acoustic picking, cinematic whistles, and spatial soundscapes in Rayan Ouarab's studio."
      },
      image: rayanMusicLabImg,
      duration: 16,
      soundPreset: 'western_dust',
      zoomOrigin: 'bottom center'
    },
    {
      id: 5,
      title: {
        ar: "الذكرى الخالدة والإرث الذهبي — M. Rayan Ouarab",
        fr: "Héritage d'Excellence & Mémoire Éternelle — M. Rayan Ouarab",
        en: "Eternal Anniversary & Golden Legacy — Mr. Rayan Ouarab"
      },
      subtitle: {
        ar: "شكر وتقدير للمؤسس والمالك الرسمي Ouarab Rayane — ابتداءً من اليوم وإلى الأبد",
        fr: "Hommage perpétuel au propriétaire officiel Rayan Ouarab — Créer. Innover. Inspirer.",
        en: "Everlasting honor to official owner Rayan Ouarab — Create. Innovate. Inspire."
      },
      caption: {
        ar: "هذا الفيديو تذكار رسمي وعهد متجدد بالتميز للمالك والمدير ريان وعراب، يوثق لحظات تأسيس Follow Recherche Cobra Inter Activité بحروف من ذهب.",
        fr: "Ce film souvenir est un sceau officiel d'authenticité gravant l'histoire de Cobra Inter Activité et de son fondateur Rayan Ouarab dans la légende.",
        en: "This commemorative film serves as an official seal of authenticity marking the triumphant legacy of Cobra Inter Activité and its founder Rayan Ouarab."
      },
      image: rayanCinemaDirectorImg,
      duration: 18,
      soundPreset: 'golden_anniversary',
      zoomOrigin: 'center center'
    }
  ];

  const currentScene = scenes[currentSceneIdx];

  // Video Progress Loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 100 / (currentScene.duration * (10 / playbackSpeed));
      progressTimerRef.current = setInterval(() => {
        setSceneProgress((prev) => {
          if (prev >= 100) {
            // Advance to next scene
            if (currentSceneIdx < scenes.length - 1) {
              setCurrentSceneIdx(currentSceneIdx + 1);
              return 0;
            } else {
              // Loop back to start
              setCurrentSceneIdx(0);
              return 0;
            }
          }
          return prev + 1;
        });
      }, 100);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, currentSceneIdx, playbackSpeed, currentScene.duration]);

  // Real Audio Soundtrack & Sound Effects Management
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, isMuted, playbackSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Audio playback interrupted or blocked:", err);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, activeMusicTrack]);

  // Clean up audio on unmount or navigation
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Play Sound FX (Whistle, Acoustic Guitar Chords, Gunshot Echo)
  const playSoundEffect = (type: 'whistle' | 'guitar_chord' | 'gunshot' | 'gallop') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const master = ctx.createGain();
      master.gain.value = volume * 0.4;
      master.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'guitar_chord') {
        // Acoustic Guitar Strum simulation (E minor arpeggiated chord)
        const freqs = [164.81, 196.0, 246.94, 329.63, 392.0];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;

          const delay = idx * 0.04;
          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.25, now + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.2);

          osc.connect(gain);
          gain.connect(master);
          osc.start(now + delay);
          osc.stop(now + delay + 1.2);
        });
      } else if (type === 'whistle') {
        // Cowboy Whistle pitch bend (D5 -> G5 -> E5)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.6);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.7);
      } else if (type === 'gunshot') {
        // Western Revolver Gunshot echo effect
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        noise.connect(filter);
        filter.connect(master);
        noise.start(now);
      } else if (type === 'gallop') {
        // Horse gallop rhythm
        [0, 0.1, 0.15, 0.35, 0.45, 0.5].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(120, now + delay);
          gain.gain.setValueAtTime(0.3, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now + delay);
          osc.stop(now + delay + 0.09);
        });
      }
    } catch (err) {
      console.warn("Sound FX error:", err);
    }
  };

  // Update track when scene changes
  useEffect(() => {
    setActiveMusicTrack(currentScene.soundPreset);
  }, [currentSceneIdx]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    triggerSparks();
  };

  const handleNextScene = () => {
    setCurrentSceneIdx((prev) => (prev + 1) % scenes.length);
    setSceneProgress(0);
  };

  const handlePrevScene = () => {
    setCurrentSceneIdx((prev) => (prev - 1 + scenes.length) % scenes.length);
    setSceneProgress(0);
  };

  const handleReplay = () => {
    setCurrentSceneIdx(0);
    setSceneProgress(0);
    setIsPlaying(true);
    triggerSparks();
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const triggerSparks = () => {
    setSparksCount((prev) => prev + 1);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section id="anniversary-promo" className="py-20 bg-slate-950 relative overflow-hidden text-slate-100 border-b border-white/10">
      
      {/* Hidden HTML5 Audio Element for Real Western OST Track */}
      <audio
        ref={audioRef}
        src={WESTERN_AUDIO_TRACKS[activeMusicTrack].url}
        loop
      />

      {/* Background Golden & Emerald Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Celebration Badge */}
        <div className="text-center space-y-4 mb-12">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 border-2 border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.3)] backdrop-blur-md animate-pulse">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>
              {isRtl
                ? "الذكرى التأسيسية الميمونة — Follow Recherche Cobra Inter Activité"
                : "Anniversaire Fondateur Officiel — Follow Recherche Cobra Inter Activité"}
            </span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 bg-clip-text text-transparent">
              {isRtl ? "الفيديو الترويجي والذكرى الخالدة" : "Film Commémoratif & Vidéo Promotionnelle"}
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            {isRtl ? (
              <>
                إهداء خاص وحصري بمناسبة عِيد تأسيس شركة{" "}
                <strong className="text-amber-400 font-bold">Follow Recherche Cobra Inter Activité</strong>{" "}
                إلى المالك والمؤسس الرسمي{" "}
                <strong className="text-emerald-400 font-bold">Ouarab Rayane (ريان وعراب)</strong>، مع موسيقى وألحان هادفة ومستوحاة من أساطير <span className="text-amber-300 underline underline-offset-4 font-mono">Red Dead Redemption</span>.
              </>
            ) : (
              <>
                Tribut officiel pour l'anniversaire fondateur de{" "}
                <strong className="text-amber-400 font-bold">Follow Recherche Cobra Inter Activité</strong>{" "}
                dédié au propriétaire officiel{" "}
                <strong className="text-emerald-400 font-bold">Rayan Ouarab</strong>, accompagné d'une bande-son acoustique style <span className="text-amber-300 font-mono">Red Dead Redemption</span>.
              </>
            )}
          </p>

          {/* Sound FX & Track Selector Interactive Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              {isRtl ? "مؤثرات صوتية تفاعلية:" : "Effets Sonores Western:"}
            </span>

            <button
              onClick={() => playSoundEffect('guitar_chord')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              🎸 {isRtl ? "معزوفة جيتار غربية" : "Guitare Western"}
            </button>

            <button
              onClick={() => playSoundEffect('whistle')}
              className="px-3 py-1.5 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              🤠 {isRtl ? "صفير الكاوبوي" : "Sifflement Outlaw"}
            </button>

            <button
              onClick={() => playSoundEffect('gunshot')}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              💥 {isRtl ? "صدى المسدس" : "Coup de Feu Echo"}
            </button>

            <button
              onClick={() => playSoundEffect('gallop')}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              🐎 {isRtl ? "ركض الخيل" : "Galop de Cheval"}
            </button>
          </div>

          {/* Official Owner Badge Header */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{isRtl ? "المالك الرسمي:" : "Propriétaire Officiel:"} <strong>Ouarab Rayane</strong></span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>{isRtl ? "علامة توثيق الهوية:" : "Sceau d'Authenticité:"} <strong>Cobra Verified Hub</strong></span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-yellow-500/30 text-yellow-300">
              <Flame className="w-4 h-4 text-yellow-400" />
              <span>{isRtl ? "طابع أسلوب:" : "Style Sonic:"} <strong>Red Dead Western OST</strong></span>
            </div>
          </div>

        </div>

        {/* MAIN CINEMATIC VIDEO PLAYER BOARD */}
        <div
          ref={videoContainerRef}
          className={`relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-slate-950 shadow-[0_0_50px_rgba(245,158,11,0.25)] group transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'w-full aspect-[16/9] max-h-[720px]'
          }`}
        >
          {/* Active Image Background with Ken-Burns Smooth Motion */}
          <div className="absolute inset-0 overflow-hidden bg-black">
            <img
              src={currentScene.image}
              alt={currentScene.title[currentLang]}
              className={`w-full h-full object-cover transition-transform duration-[15000ms] ease-linear ${
                isPlaying ? 'scale-110' : 'scale-100'
              }`}
              style={{ transformOrigin: currentScene.zoomOrigin }}
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
          </div>

          {/* Golden Sparks Particle Animation Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="w-full h-full bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] animate-pulse" />
          </div>

          {/* Top Info Bar inside Video */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center backdrop-blur-md">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <span>COBRA CINEMATIC PROMO</span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[10px] text-red-400">ON AIR</span>
                </div>
                <div className="text-sm font-bold text-slate-100 truncate max-w-xs sm:max-w-md">
                  {currentScene.title[currentLang]}
                </div>
              </div>
            </div>

            {/* Scene Badge counter */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-xl bg-black/60 border border-white/20 text-xs font-mono font-bold text-amber-300 backdrop-blur-md">
                Scene {currentSceneIdx + 1} / {scenes.length}
              </div>

              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`p-2 rounded-xl border text-xs font-mono font-bold backdrop-blur-md transition-colors ${
                  showSubtitles
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-black/60 border-white/20 text-slate-400 hover:text-white'
                }`}
                title="Toggle Subtitles"
              >
                CC
              </button>
            </div>

          </div>

          {/* Center Play Big Button Overlay (shown when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-[2px]">
              <button
                onClick={togglePlay}
                className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-[0_0_50px_rgba(245,158,11,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current ml-1" />
                <span className="absolute -bottom-8 whitespace-nowrap text-xs font-mono font-bold text-amber-300 bg-slate-900/90 px-3 py-1 rounded-full border border-amber-500/40">
                  {isRtl ? "تشغيل العرض السينمائي" : "Lancer le Film Commémoratif"}
                </span>
              </button>
            </div>
          )}

          {/* Subtitles Overlay Box (Bottom Center) */}
          {showSubtitles && (
            <div className="absolute bottom-20 sm:bottom-24 left-4 right-4 sm:left-12 sm:right-12 z-20 text-center">
              <div className="inline-block max-w-3xl px-6 py-3 sm:py-4 rounded-2xl bg-slate-950/85 border border-amber-500/40 shadow-2xl backdrop-blur-md text-amber-100 text-xs sm:text-base font-semibold leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="text-amber-400 font-mono text-[10px] sm:text-xs block mb-1 uppercase tracking-widest">
                  🎙️ {currentScene.subtitle[currentLang]}
                </span>
                "{currentScene.caption[currentLang]}"
              </div>
            </div>
          )}

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
            
            {/* Timeline Progress Bar */}
            <div className="w-full mb-3 flex items-center gap-2">
              <div
                className="flex-1 h-2 rounded-full bg-slate-800/80 cursor-pointer overflow-hidden border border-white/10 relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const pct = (clickX / rect.width) * 100;
                  setSceneProgress(pct);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-150 relative"
                  style={{ width: `${sceneProgress}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-lg" />
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-amber-300 min-w-[50px] text-right">
                {Math.round((sceneProgress / 100) * currentScene.duration)}s / {currentScene.duration}s
              </span>
            </div>

            {/* Interactive Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              
              {/* Left Play/Pause & Nav */}
              <div className="flex items-center gap-2 sm:gap-3">
                
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:from-amber-400 hover:to-yellow-300 font-bold transition-all shadow-md active:scale-95"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={handleReplay}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="h-6 w-px bg-white/20 hidden sm:block" />

                <button
                  onClick={handlePrevScene}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
                  title="Previous Scene"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextScene}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
                  title="Next Scene"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono text-slate-300 hidden md:inline-block">
                  {currentScene.title[currentLang]}
                </span>

              </div>

              {/* Right Audio, Speed, Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-3">
                
                {/* Red Dead Western Sound Track Selector */}
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/30 text-xs font-mono">
                  <Music className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-200 font-bold">RDR Western OST</span>
                </div>

                {/* Mute/Volume */}
                <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1.5 rounded-xl border border-white/10">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-16 accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer hidden sm:block"
                  />
                </div>

                {/* Speed Toggle */}
                <button
                  onClick={() => {
                    const speeds = [1, 1.25, 1.5, 2];
                    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                    setPlaybackSpeed(speeds[nextIdx]);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-black/60 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-amber-300 transition-colors"
                >
                  {playbackSpeed}x
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-black/60 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors"
                  title="Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* SCENE THUMBNAILS CAROUSEL / SELECTOR & INSPECTOR */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-300 font-bold flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-400" />
              {isRtl ? "المشاهد الخمسة الرسمية للمالك ريان وعراب (انقر للتكبير والمعاينة):" : "Les 5 Scènes Officielles de Rayan Ouarab (Cliquer pour zoomer):"}
            </span>
            <span className="text-slate-400">HD Portrait Fidelity</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {scenes.map((scene, idx) => (
              <div
                key={scene.id}
                className={`group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 ${
                  currentSceneIdx === idx
                    ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                    : 'border-white/10 opacity-70 hover:opacity-100 hover:border-amber-500/40'
                }`}
              >
                <div
                  onClick={() => {
                    setCurrentSceneIdx(idx);
                    setSceneProgress(0);
                    setIsPlaying(true);
                  }}
                  className="aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer relative"
                >
                  <img
                    src={scene.image}
                    alt={scene.title[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Inspect Zoom Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInspectImage(scene.image);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                    title={isRtl ? "تكبير واستعراض ملامح الصورة" : "Zoom Portrait"}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2.5 bg-slate-900/95 border-t border-white/10">
                  <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center justify-between">
                    <span>Scene 0{scene.id}</span>
                    {currentSceneIdx === idx && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate mt-0.5">
                    {scene.title[currentLang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OFFICIAL FOUNDER DEDICATION CARD & CERTIFICATE */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-slate-950 border-2 border-amber-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>{isRtl ? "شهادة التوثيق والتقدير الرسمية" : "Attestation Officielle d'Honneur"}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                {isRtl ? "تحية وفاء للمؤسس والمالك الرسمي — Ouarab Rayane" : "Hommage au Fondateur & Propriétaire — Rayan Ouarab"}
              </h3>

              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                {isRtl ? (
                  <>
                    باسم كافة العاملين والمحبين لمجالات <strong className="text-amber-400">Follow Recherche Cobra Inter Activité</strong>، نُسجل هذه اللحظة التاريخية بمناسبة الذكرى التأسيسية. شكراً لك على الرؤية، الإصرار، وتقديم أرقى حلول البرمجة، الألعاب، الموسيقى، والسينما.
                  </>
                ) : (
                  <>
                    Au nom de l'équipe et des passionnés de <strong className="text-amber-400">Follow Recherche Cobra Inter Activité</strong>, nous gravons cet anniversaire fondateur en hommage à la vision et à l'excellence de Rayan Ouarab.
                  </>
                )}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? (isRtl ? "تم نسخ الرابط!" : "Lien Copié!") : (isRtl ? "مشاركة الرابط الترويجي" : "Partager la Vidéo")}</span>
                </button>

                <button
                  onClick={() => setSelectedInspectImage(currentScene.image)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition-all"
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>{isRtl ? "تكبير وتدقيق ملامح الصورة الحالية" : "Inspecter Portrait HD"}</span>
                </button>

                <button
                  onClick={triggerSparks}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 font-mono text-xs font-bold transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{isRtl ? "احتفال بالشرارات الذهبية 🎉" : "Célébrer 🎉"}</span>
                </button>
              </div>
            </div>

            {/* Founder Emblem Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-amber-950/60 border-2 border-amber-400/50 flex flex-col items-center justify-center p-4 text-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <Award className="w-12 h-12 text-amber-400 mb-2 animate-bounce" />
                <div className="font-extrabold text-sm text-slate-100 tracking-tight">
                  COBRA FOUNDER
                </div>
                <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                  OUARAB RAYANE
                </div>
                <div className="text-[10px] text-slate-400 mt-2 border-t border-amber-500/30 pt-1.5 w-full">
                  OFFICIAL OWNER & DIRECTEUR
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* LIGHTBOX INSPECTOR MODAL FOR HIGH RESOLUTION PORTRAIT REVIEW */}
      {selectedInspectImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedInspectImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-slate-950 p-2 shadow-[0_0_80px_rgba(245,158,11,0.4)] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="w-full p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs sm:text-sm font-bold">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>{isRtl ? "معاينة البورتريه الرسمي عالي الدقة — Ouarab Rayane" : "Portrait Officiel Haute Définition — Rayan Ouarab"}</span>
              </div>

              <button
                onClick={() => setSelectedInspectImage(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="w-full flex-1 overflow-auto flex items-center justify-center p-4 bg-black">
              <img
                src={selectedInspectImage}
                alt="Rayan Ouarab HD Portrait"
                className="max-h-[75vh] w-auto object-contain rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="w-full p-4 bg-slate-900/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="text-amber-200">
                ✓ {isRtl ? "ملامح الوجه موثقة وأصيلة 100%" : "Traits du visage authentiques à 100%"}
              </div>

              <button
                onClick={() => setSelectedInspectImage(null)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-all"
              >
                {isRtl ? "إغلاق المعاينة" : "Fermer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
