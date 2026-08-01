import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_NAME, FOUNDER_NAME } from '../data/content';
import { Shield, Sparkles, ArrowRight, Code2, Gamepad2, Music, Video, Play, Terminal } from 'lucide-react';
import heroBanner from '../assets/images/cobra_hero_banner_1785551170571.jpg';

interface HeroProps {
  currentLang: Language;
  onOpenAiArchitect: () => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenAiArchitect,
  onOpenQuote,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20 bg-slate-950">
      
      {/* Background Graphic Grid & Ambient Emerald Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-slate-950/90 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Floating Glowing Elements */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{t.heroBadge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight text-slate-100 leading-none">
                {COMPANY_NAME.split(' Cobra ')[0]}{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-100 bg-clip-text text-transparent underline decoration-emerald-500/40 decoration-wavy">
                  COBRA
                </span>{' '}
                {COMPANY_NAME.split(' Cobra ')[1] || 'INTER ACTIVITÉ'}
              </h1>
              <p className="text-emerald-400 font-mono tracking-widest text-sm sm:text-base uppercase font-bold">
                {t.heroSlogan}
              </p>
            </div>

            {/* Subtitle Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              {t.heroSub}
            </p>

            {/* CTAs & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenAiArchitect}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>{t.ctaConsultAi}</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-emerald-300 font-bold text-sm tracking-wide backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>{t.ctaQuote}</span>
              </button>
            </div>

            {/* Quick 4-Pillar Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <a href="#pillars" className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md transition-all group">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Programmation</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">CODE IS POWER</div>
              </a>

              <a href="#pillars" className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md transition-all group">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <Gamepad2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Jeux Vidéo</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">PLAY. CREATE.</div>
              </a>

              <a href="#pillars" className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md transition-all group">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <Music className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Musique Studio</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">SONS UNIQUE</div>
              </a>

              <a href="#pillars" className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md transition-all group">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <Video className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Films & Cinéma</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">DONNER VIE</div>
              </a>
            </div>

          </div>

          {/* Right Visual Card - Cobra Studio Showcase Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(16,185,129,0.2)] group bg-slate-900/80 backdrop-blur-xl">
              
              <img
                src={heroBanner}
                alt="Follow Recherche Cobra Inter Activité Studio"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating Metallic Shield Stamp */}
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-lg">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>COBRA STUDIOS</span>
              </div>

              {/* Bottom Card Content Info */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent backdrop-blur-md">
                <div className="text-emerald-400 text-xs font-mono tracking-widest uppercase font-bold flex items-center justify-between">
                  <span>DIR. {FOUNDER_NAME.toUpperCase()}</span>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/30">VERIFIED CREATIVE HUB</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  Follow Recherche Cobra Inter Activité
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                  Jeux vidéo, IA & programmation, musique d'exception et réalisation cinématographique de pointe.
                </p>
              </div>

            </div>

            {/* Glowing Corner Accents */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
