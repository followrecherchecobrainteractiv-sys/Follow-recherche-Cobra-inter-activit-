import React, { useState } from 'react';
import { Language, PillarId, QuoteFormData } from '../types';
import { TRANSLATIONS } from '../data/content';
import { Calculator, Check, Send, Sparkles, DollarSign, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface QuoteCalculatorProps {
  currentLang: Language;
  initialPillar?: PillarId;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  currentLang,
  initialPillar,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    selectedPillars: initialPillar ? [initialPillar] : ['programming', 'game'],
    timeline: '4-8 semaines',
    budgetRange: '5000€ - 15000€',
    projectName: '',
    clientName: '',
    email: '',
    phone: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const togglePillar = (id: PillarId) => {
    if (formData.selectedPillars.includes(id)) {
      if (formData.selectedPillars.length > 1) {
        setFormData({
          ...formData,
          selectedPillars: formData.selectedPillars.filter((p) => p !== id),
        });
      }
    } else {
      setFormData({
        ...formData,
        selectedPillars: [...formData.selectedPillars, id],
      });
    }
  };

  const calculateEstimate = () => {
    let base = formData.selectedPillars.length * 3500;
    if (formData.timeline === 'Express (2-3 semaines)') base *= 1.3;
    return base;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-950 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Estimateur & Devis Interactif</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.quoteTitle}
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            {t.quoteSub}
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white/5 border-2 border-emerald-500 text-center space-y-6 animate-in zoom-in-95 duration-200 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100">
              Demande de Devis Transmise avec Succès !
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Merci <span className="text-emerald-400 font-bold">{formData.clientName}</span>. L'équipe de <span className="text-emerald-400 font-bold">Follow Recherche Cobra Inter Activité</span> étudie votre demande et vous recontactera sous 24 heures avec une proposition technique détaillée.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Soumettre une Autre Demande
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-xl">
            
            {/* Step 1: Select Pillars */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                <span>1. Choisissez les Pôles Requis :</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: 'programming', name: 'Programmation & IA' },
                  { id: 'game', name: 'Développement Jeux 3D' },
                  { id: 'music', name: 'Production Musicale' },
                  { id: 'film', name: 'Films & Cinématiques' },
                ].map((item) => {
                  const active = formData.selectedPillars.includes(item.id as PillarId);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => togglePillar(item.id as PillarId)}
                      className={`p-4 rounded-2xl text-left border text-xs font-bold transition-all backdrop-blur-md ${
                        active
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span>{item.name}</span>
                        {active && <Check className="w-4 h-4 text-emerald-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Timeline & Budget */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  2. Délai Souhaité :
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md"
                >
                  <option value="Express (2-3 semaines)">Express (2-3 semaines)</option>
                  <option value="4-8 semaines">Standard (4-8 semaines)</option>
                  <option value="3 mois et plus">Projet d'Envergure (3 mois +)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  3. Budget Estimatif :
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md"
                >
                  <option value="2000€ - 5000€">2 000 € - 5 000 €</option>
                  <option value="5000€ - 15000€">5 000 € - 15 000 €</option>
                  <option value="15000€ - 50000€">15 000 € - 50 000 €</option>
                  <option value="Sur-mesure Sur Devis">Sur-mesure Sur Devis</option>
                </select>
              </div>

            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                4. Vos Coordonnées de Contact :
              </label>

              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Votre Nom & Prénom"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md placeholder:text-slate-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Adresse Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md placeholder:text-slate-500"
                />
                <input
                  type="tel"
                  placeholder="Numéro de Téléphone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md placeholder:text-slate-500"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Précisions complémentaires sur votre projet..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md placeholder:text-slate-500"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="text-xs font-mono text-slate-400">
                <span>Estimation indicative basée sur vos pôles choisis: </span>
                <span className="text-emerald-400 font-bold text-sm ml-1">
                  ~ {calculateEstimate()} € TTC
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer la Demande de Devis</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
