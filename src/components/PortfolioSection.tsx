import React, { useState } from 'react';
import { Language, PillarId, PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS, TRANSLATIONS } from '../data/content';
import { Code2, Gamepad2, Music, Video, Play, ExternalLink, X, Shield, Cpu, Tag } from 'lucide-react';

interface PortfolioSectionProps {
  currentLang: Language;
  onSelectTrackForPlayer?: (track: { title: string; artist: string }) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  currentLang,
  onSelectTrackForPlayer,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const t = TRANSLATIONS[currentLang];

  const filteredItems = selectedFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.pillarId === selectedFilter);

  const getPillarLabel = (pillarId: PillarId) => {
    switch (pillarId) {
      case 'programming': return 'IA & Code';
      case 'game': return 'Jeux Vidéo';
      case 'music': return 'Musique Studio';
      case 'film': return 'Cinématique';
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-950 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Showcase Réalisations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.portfolioTitle}
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            {t.portfolioSub}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'programming', label: 'Programmation & IA' },
            { id: 'game', label: 'Jeux Vidéo 3D' },
            { id: 'music', label: 'Production Musicale' },
            { id: 'film', label: 'Films & Cinématique' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all backdrop-blur-md ${
                selectedFilter === filter.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:border-emerald-500/40'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden cursor-pointer group shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] flex flex-col justify-between backdrop-blur-xl"
            >
              <div>
                <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title[currentLang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    {getPillarLabel(item.pillarId)}
                  </div>

                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-400 text-xs font-mono border border-white/10 backdrop-blur-md">
                    {item.year}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-emerald-400 text-xs font-mono font-bold uppercase">
                    {item.clientOrProject}
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {item.title[currentLang]}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {item.shortDesc[currentLang]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-white/10 mt-4">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-[10px] font-mono border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-emerald-400 text-xs font-bold font-mono group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Détails</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900/90 border-2 border-emerald-500/50 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto backdrop-blur-xl">
            
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase">
                {getPillarLabel(activeModalItem.pillarId)} • {activeModalItem.clientOrProject}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-100">
                {activeModalItem.title[currentLang]}
              </h3>
            </div>

            <img
              src={activeModalItem.image}
              alt={activeModalItem.title[currentLang]}
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover rounded-2xl border border-white/10"
            />

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold">
                Présentation Détaillée :
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {activeModalItem.fullDesc[currentLang]}
              </p>
            </div>

            {/* Audio Track Player Trigger */}
            {activeModalItem.audioTrack && (
              <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 flex items-center justify-between gap-4 backdrop-blur-md">
                <div>
                  <div className="text-xs font-bold text-emerald-300 font-mono">
                    🎵 Track Audio: {activeModalItem.audioTrack.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Artiste: {activeModalItem.audioTrack.artist} ({activeModalItem.audioTrack.duration})
                  </div>
                </div>

                <a
                  href="#sound-lab"
                  onClick={() => {
                    if (onSelectTrackForPlayer && activeModalItem.audioTrack) {
                      onSelectTrackForPlayer(activeModalItem.audioTrack);
                    }
                    setActiveModalItem(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase flex items-center gap-2 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Écouter au Sound Lab</span>
                </a>
              </div>
            )}

            {/* Tech Specs */}
            {activeModalItem.techSpecs && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-md">
                <div className="text-xs font-mono text-slate-400 font-bold">Spécifications Techniques :</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {activeModalItem.techSpecs.engine && (
                    <div className="text-slate-300"><span className="text-emerald-400">Moteur:</span> {activeModalItem.techSpecs.engine}</div>
                  )}
                  {activeModalItem.techSpecs.language && (
                    <div className="text-slate-300"><span className="text-emerald-400">Langage:</span> {activeModalItem.techSpecs.language}</div>
                  )}
                  {activeModalItem.techSpecs.aiModel && (
                    <div className="text-slate-300"><span className="text-emerald-400">Modèle IA:</span> {activeModalItem.techSpecs.aiModel}</div>
                  )}
                  {activeModalItem.techSpecs.renderTech && (
                    <div className="text-slate-300"><span className="text-emerald-400">Rendu:</span> {activeModalItem.techSpecs.renderTech}</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 text-slate-200 text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
