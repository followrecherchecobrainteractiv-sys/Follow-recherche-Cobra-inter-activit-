import React from 'react';
import { Language } from '../types';
import { COMPANY_NAME, FOUNDER_NAME, TRANSLATIONS } from '../data/content';
import { Shield, Sparkles, Code2, Gamepad2, Music, Video } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-emerald-500/30 flex items-center justify-center text-emerald-400 backdrop-blur-md">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-100 text-lg tracking-tight bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
                  COBRA INTER ACTIVITÉ
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  Follow Recherche Cobra
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Structure créative de premier plan, spécialisée dans le développement de jeux vidéo, la programmation avancée & IA, la production musicale et la création de films & cinématiques.
            </p>

            <div className="text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase">
              {t.heroSlogan}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-slate-200 font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#pillars" className="hover:text-emerald-400 transition-colors">{t.navPillars}</a></li>
              <li><a href="#ai-architect" className="hover:text-emerald-400 transition-colors">{t.navAiArchitect}</a></li>
              <li><a href="#portfolio" className="hover:text-emerald-400 transition-colors">{t.navPortfolio}</a></li>
              <li><a href="#sound-lab" className="hover:text-emerald-400 transition-colors">{t.navSoundLab}</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">{t.navQuote}</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">{t.navContact}</a></li>
            </ul>
          </div>

          {/* Pillars List */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase text-slate-200 font-bold">
              Nos 4 Pôles
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Programmation</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Jeux Vidéo</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Music className="w-3.5 h-3.5 text-emerald-400" />
                <span>Musique Studio</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>Films Cinéma</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-2">
          <div>
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </div>
          <div>
            Dirigé par <span className="text-emerald-400 font-bold">{FOUNDER_NAME}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
