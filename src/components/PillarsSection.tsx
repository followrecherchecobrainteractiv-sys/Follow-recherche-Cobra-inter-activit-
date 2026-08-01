import React, { useState } from 'react';
import { Language, PillarId } from '../types';
import { PILLARS, TRANSLATIONS } from '../data/content';
import { Code2, Gamepad2, Music, Video, CheckCircle2, ArrowUpRight, Sparkles, Cpu, Layers } from 'lucide-react';

interface PillarsSectionProps {
  currentLang: Language;
  onSelectPillarForQuote: (pillarId: PillarId) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({
  currentLang,
  onSelectPillarForQuote,
}) => {
  const [activePillarId, setActivePillarId] = useState<PillarId>('programming');
  const t = TRANSLATIONS[currentLang];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6" />;
      case 'Music':
        return <Music className="w-6 h-6" />;
      case 'Video':
        return <Video className="w-6 h-6" />;
      default:
        return <Cpu className="w-6 h-6" />;
    }
  };

  const activePillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];

  return (
    <section id="pillars" className="py-24 bg-slate-950 relative border-t border-white/10">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pôles de Compétences Cobra</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.pillarsSectionTitle}
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            {t.pillarsSectionSub}
          </p>
        </div>

        {/* 4 Pillar Selection Cards / Tab Nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`p-6 rounded-3xl text-left transition-all duration-300 relative overflow-hidden group backdrop-blur-xl ${
                  isActive
                    ? 'bg-white/10 border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/10'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500" />
                )}

                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                        : 'bg-white/10 text-emerald-400 group-hover:bg-emerald-500/20'
                    } transition-colors`}
                  >
                    {getIconComponent(pillar.icon)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                    {pillar.badgeText[currentLang]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-emerald-300 transition-colors">
                  {pillar.title[currentLang]}
                </h3>

                <p className="text-emerald-400 font-mono text-xs font-bold tracking-wider mb-2 uppercase">
                  {pillar.slogan[currentLang]}
                </p>

                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {pillar.shortDesc[currentLang]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Active Pillar Deep Dive Display */}
        <div className="rounded-3xl bg-slate-900/60 border border-white/15 p-6 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-emerald-400 font-mono text-xs font-extrabold uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{activePillar.slogan[currentLang]}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                  {activePillar.title[currentLang]}
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activePillar.fullDesc[currentLang]}
              </p>

              {/* Key Capabilities Bullet Points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Expertises & Services Inclus :
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activePillar.keyCapabilities[currentLang].map((capability, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs backdrop-blur-md"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onSelectPillarForQuote(activePillar.id)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                >
                  <span>Demander un projet dans ce pôle</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Showcase Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border border-white/15 shadow-xl relative group">
                <img
                  src={activePillar.image}
                  alt={activePillar.title[currentLang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15 text-xs text-emerald-200 font-mono">
                  <div className="font-bold flex items-center justify-between">
                    <span>COBRA {activePillar.id.toUpperCase()} MODULE</span>
                    <span className="text-emerald-400">READY</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
