import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_NAME } from '../data/content';
import { Shield, Sparkles, Globe, Menu, X, Cpu, Music, Gamepad2, Video, Calculator, Send } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenQuote: () => void;
  onOpenAiArchitect: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenQuote,
  onOpenAiArchitect,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  const navLinks = [
    { href: "#pillars", label: t.navPillars },
    { href: "#ai-architect", label: t.navAiArchitect },
    { href: "#portfolio", label: t.navPortfolio },
    { href: "#sound-lab", label: t.navSoundLab },
    { href: "#calculator", label: t.navQuote },
    { href: "#contact", label: t.navContact },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10 text-slate-100 transition-all duration-300 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Emblem */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 via-slate-900/80 to-emerald-950/40 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] transition-all backdrop-blur-md">
            <Shield className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-emerald-400/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-200 bg-clip-text text-transparent flex items-center gap-2">
              COBRA <span className="text-xs font-normal px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 uppercase tracking-widest hidden sm:inline-block backdrop-blur-sm">INTER ACTIVITÉ</span>
            </div>
            <div className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">
              Follow Recherche Cobra
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-300 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="hidden sm:flex items-center gap-3">
          {/* AI Architect Quick Launch Button */}
          <button
            onClick={onOpenAiArchitect}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>AI Architect</span>
          </button>

          {/* Quote Button */}
          <button
            onClick={onOpenQuote}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold tracking-wide shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/40 transition-all duration-200 active:scale-95"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.ctaQuote}</span>
          </button>

          {/* Language Switcher */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs cursor-pointer hover:border-emerald-500/40 transition-colors backdrop-blur-md">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="uppercase font-mono font-bold text-emerald-200">{currentLang}</span>
            </div>
            <div className="absolute right-0 top-full mt-1 w-28 py-1 rounded-xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
              <button
                onClick={() => onLanguageChange('fr')}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-500/10 ${currentLang === 'fr' ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}
              >
                <span>Français</span>
                <span className="text-[10px] opacity-60 font-mono">FR</span>
              </button>
              <button
                onClick={() => onLanguageChange('ar')}
                className={`w-full text-right px-3 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-500/10 ${currentLang === 'ar' ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}
              >
                <span>العربية</span>
                <span className="text-[10px] opacity-60 font-mono">AR</span>
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-500/10 ${currentLang === 'en' ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}
              >
                <span>English</span>
                <span className="text-[10px] opacity-60 font-mono">EN</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Lang toggle for mobile */}
          <button
            onClick={() => {
              const next: Record<Language, Language> = { fr: 'ar', ar: 'en', en: 'fr' };
              onLanguageChange(next[currentLang]);
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 text-xs font-mono font-bold backdrop-blur-md"
          >
            {currentLang.toUpperCase()}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 backdrop-blur-md"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiArchitect();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Studio Architect</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-sm font-bold shadow-lg shadow-emerald-500/20"
            >
              <Calculator className="w-4 h-4" />
              <span>{t.ctaQuote}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
