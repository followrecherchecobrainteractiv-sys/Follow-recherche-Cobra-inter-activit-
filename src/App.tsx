import React, { useState, useEffect } from 'react';
import { Language, PillarId, AiProposalData } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AnniversaryPromoVideoSection } from './components/AnniversaryPromoVideoSection';
import { PillarsSection } from './components/PillarsSection';
import { AiConsultantSection } from './components/AiConsultantSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { QuoteCalculator } from './components/QuoteCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';
import { AdMonetizationModal } from './components/AdMonetizationModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [selectedPillarForQuote, setSelectedPillarForQuote] = useState<PillarId | undefined>(undefined);
  const [activeTrackTitle, setActiveTrackTitle] = useState<string | undefined>(undefined);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  // Set document direction for RTL when Arabic is selected
  useEffect(() => {
    if (currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPillarForQuote = (pillarId: PillarId) => {
    setSelectedPillarForQuote(pillarId);
    scrollToSection('calculator');
  };

  const handleApplyProposalToQuote = (proposal: AiProposalData) => {
    scrollToSection('calculator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Navbar */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenQuote={() => scrollToSection('calculator')}
        onOpenAiArchitect={() => scrollToSection('ai-architect')}
        onOpenMonetization={() => setIsAdModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner */}
        <Hero
          currentLang={currentLang}
          onOpenAiArchitect={() => scrollToSection('ai-architect')}
          onOpenQuote={() => scrollToSection('calculator')}
        />

        {/* Top Monetization Leaderboard Ad Banner */}
        <AdBanner
          currentLang={currentLang}
          slot="leaderboard"
          onOpenSettings={() => setIsAdModalOpen(true)}
        />

        {/* Official Founding Anniversary Promotional Video Showcase */}
        <AnniversaryPromoVideoSection
          currentLang={currentLang}
        />

        {/* 4 Pillars of Excellence */}
        <PillarsSection
          currentLang={currentLang}
          onSelectPillarForQuote={handleSelectPillarForQuote}
        />

        {/* Inline Content Ad Banner */}
        <AdBanner
          currentLang={currentLang}
          slot="inline"
          onOpenSettings={() => setIsAdModalOpen(true)}
        />

        {/* Cobra AI Studio Architect */}
        <AiConsultantSection
          currentLang={currentLang}
          onApplyProposalToQuote={handleApplyProposalToQuote}
        />

        {/* Portfolio & Showcase */}
        <PortfolioSection
          currentLang={currentLang}
          onSelectTrackForPlayer={(track) => setActiveTrackTitle(track.title)}
        />

        {/* Cobra Audio Lab Live Player */}
        <AudioPlayerBar
          currentLang={currentLang}
          selectedTrackTitle={activeTrackTitle}
        />

        {/* Quote & Project Estimator Calculator */}
        <QuoteCalculator
          currentLang={currentLang}
          initialPillar={selectedPillarForQuote}
        />

        {/* Contact & Founder Profile */}
        <ContactSection
          currentLang={currentLang}
        />
      </main>

      {/* Sticky Bottom Ad Banner */}
      <AdBanner
        currentLang={currentLang}
        slot="footer-sticky"
        onOpenSettings={() => setIsAdModalOpen(true)}
      />

      {/* RedotPay & Ad Monetization Settings Modal */}
      <AdMonetizationModal
        currentLang={currentLang}
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
      />

      {/* Footer */}
      <Footer currentLang={currentLang} />

    </div>
  );
}

