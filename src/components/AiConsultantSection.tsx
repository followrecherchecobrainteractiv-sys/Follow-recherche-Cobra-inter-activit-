import React, { useState } from 'react';
import { Language, PillarId, AiProposalData } from '../types';
import { TRANSLATIONS } from '../data/content';
import { Sparkles, Bot, Send, CheckCircle, Clock, Cpu, Layers, Music, Video, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface AiConsultantSectionProps {
  currentLang: Language;
  onApplyProposalToQuote: (proposal: AiProposalData) => void;
}

export const AiConsultantSection: React.FC<AiConsultantSectionProps> = ({
  currentLang,
  onApplyProposalToQuote,
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedPillars, setSelectedPillars] = useState<PillarId[]>(['game', 'programming', 'music', 'film']);
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<AiProposalData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang];

  const togglePillar = (id: PillarId) => {
    if (selectedPillars.includes(id)) {
      if (selectedPillars.length > 1) {
        setSelectedPillars(selectedPillars.filter((p) => p !== id));
      }
    } else {
      setSelectedPillars([...selectedPillars, id]);
    }
  };

  const generateProposal = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          pillars: selectedPillars,
          language: currentLang,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success && json.data) {
        setProposal(json.data);
      } else {
        // Fallback intelligent simulation if server key is not configured or fails
        fallbackSimulation();
      }
    } catch (err) {
      console.warn('AI Server endpoint unreachable, using client-side Cobra AI generator fallback', err);
      fallbackSimulation();
    } finally {
      setLoading(false);
    }
  };

  const fallbackSimulation = () => {
    setTimeout(() => {
      setProposal({
        title: `Projet Cobra Custom: ${prompt.slice(0, 30)}...`,
        tagline: "Architecture Réseau, Moteur Graphique 3D & Spatial Audio",
        executiveSummary: `Follow Recherche Cobra Inter Activité a conçu une proposition sur-mesure combinant ${selectedPillars.join(', ')}. Notre équipe intégrera le Cobra AI Engine pour garantir une expérience utilisateur immersive et une scalabilité optimale.`,
        pillarsInvolved: selectedPillars,
        technicalArchitecture: [
          "Moteur Unreal Engine 5 / C++20 avec système Nanite",
          "Microservices Cloud Python & Modèle LLM Gemini",
          "Audio FMOD / Wwise avec composition orchestrale originale 24-bit",
          "Rendu 3D Octane / Blender pour cinématiques 4K"
        ],
        creativeHighlights: [
          "Graphismes 3D photoréalistes avec rendu volumétrique",
          "Algorithmes d'IA adaptatifs pour la prise de décision",
          "Bande-son dynamique réagissant aux actions de l'utilisateur",
          "Bande-annonce cinématographique de lancement"
        ],
        musicSoundConcept: "Ambiance sonore hybride (symphonique et électronique sombre) avec motifs de percussions épiques.",
        estimatedTimeline: "6 à 10 Semaines (3 Phases)",
        recommendedPhasePlan: [
          {
            phase: "Phase 1: Architecture & Prototype IA",
            duration: "2 Semaines",
            details: "Validation du cahier des charges, modélisation 3D initiale et intégration du noyau d'IA."
          },
          {
            phase: "Phase 2: Développement Jeux, Sound Design & Code",
            duration: "4 Semaines",
            details: "Production des assets 3D, composition musicale studio et programmation des systèmes."
          },
          {
            phase: "Phase 3: Montage Cinématique, Post-Production & Livrables",
            duration: "2 Semaines",
            details: "Mixage son Dolby Atmos, rendu vidéo 8K et déploiement final."
          }
        ]
      });
    }, 1200);
  };

  return (
    <section id="ai-architect" className="py-24 bg-slate-950/80 relative border-t border-white/10">
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            <Bot className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>Cobra AI Studio Architect</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.aiSectionTitle}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.aiSectionSub}
          </p>
        </div>

        {/* AI Input Form */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          
          {/* Pillar Selector Toggles */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              1. Sélectionnez les Pôles Concernés :
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'programming', label: 'IA & Programmation' },
                { id: 'game', label: 'Jeux Vidéo 3D' },
                { id: 'music', label: 'Musique & Audio' },
                { id: 'film', label: 'Films & Cinématique' },
              ].map((item) => {
                const isSelected = selectedPillars.includes(item.id as PillarId);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => togglePillar(item.id as PillarId)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between border backdrop-blur-md ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelected && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              2. Décrivez votre Vision ou Concept :
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.aiPlaceholder}
              className="w-full p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-500 backdrop-blur-md"
            />
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-mono">Exemples rapides:</span>
            <button
              onClick={() => setPrompt("Jeu de cartes tactique 3D avec système d'IA prédictive et musique électro-symphonique")}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/40 text-slate-300 transition-colors backdrop-blur-md"
            >
              Jeu Tactique 3D + IA
            </button>
            <button
              onClick={() => setPrompt("Bande-annonce cinématographique 3D pour un projet logiciel de santé avec voix-off et effets VFX")}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/40 text-slate-300 transition-colors backdrop-blur-md"
            >
              Cinématique VFX 3D
            </button>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={generateProposal}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t.aiBtnLoading}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{t.aiBtnGenerate}</span>
              </>
            )}
          </button>

        </div>

        {/* AI Proposal Results Box */}
        {proposal && (
          <div className="max-w-4xl mx-auto mt-10 rounded-3xl bg-slate-900/80 border-2 border-emerald-500 p-6 sm:p-10 shadow-[0_0_50px_rgba(16,185,129,0.25)] space-y-8 animate-in fade-in duration-300 backdrop-blur-xl">
            
            <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase border border-emerald-500/30">
                  BLUEPRINT CONCEPTION IA
                </span>
                <h3 className="text-2xl font-extrabold text-slate-100 mt-2">
                  {proposal.title}
                </h3>
                <p className="text-emerald-400 font-mono text-xs font-bold uppercase mt-1">
                  {proposal.tagline}
                </p>
              </div>

              <button
                onClick={() => onApplyProposalToQuote(proposal)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span>Transformer en Devis Direct</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                Résumé Exécutif :
              </h4>
              <p className="text-slate-200 text-sm leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                {proposal.executiveSummary}
              </p>
            </div>

            {/* Tech Architecture & Highlights */}
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
                  <Cpu className="w-4 h-4" />
                  <span>Architecture Technique :</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {proposal.technicalArchitecture.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
                  <Music className="w-4 h-4" />
                  <span>Concept Sonore & Cinéma :</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {proposal.musicSoundConcept}
                </p>
              </div>

            </div>

            {/* Recommended Phases */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Planning Recommandé ({proposal.estimatedTimeline}) :</span>
                </h4>
              </div>

              <div className="grid gap-3">
                {proposal.recommendedPhasePlan.map((phase, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
                    <div>
                      <div className="font-bold text-slate-100 text-xs">{phase.phase}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{phase.details}</div>
                    </div>
                    <span className="shrink-0 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold">
                      {phase.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
