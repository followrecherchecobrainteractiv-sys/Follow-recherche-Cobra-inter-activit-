import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_NAME, FOUNDER_NAME, TEAM_MEMBERS } from '../data/content';
import { Mail, Phone, MapPin, Send, MessageSquare, Shield, CheckCircle2, UserCheck } from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const founder = TEAM_MEMBERS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950/80 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Contact Studio Cobra</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            {t.contactTitle}
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            {t.contactSub}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Founder & Studio Profile */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-400 shrink-0 shadow-lg shadow-emerald-500/20">
                  <img
                    src={founder.avatar}
                    alt={founder.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{founder.name}</h3>
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase mt-0.5">
                    {founder.role[currentLang]}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    {COMPANY_NAME}
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">
                {founder.bio[currentLang]}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {founder.specialties.map((spec, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-emerald-300 text-[10px] font-mono">
                    #{spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 backdrop-blur-md">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono uppercase">Email Direct</div>
                  <a href="mailto:contact@cobra-interactivite.com" className="text-sm font-bold text-slate-100 hover:text-emerald-400 transition-colors">
                    contact@cobra-interactivite.com
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 backdrop-blur-md">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono uppercase">WhatsApp / Contact Rapide</div>
                  <a
                    href="https://wa.me/?text=Bonjour%20Cobra%20Inter%20Activit%C3%A9"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-emerald-400 hover:underline"
                  >
                    Démarrer une conversation WhatsApp →
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="p-8 rounded-3xl bg-white/5 border border-emerald-500 text-center space-y-4 backdrop-blur-xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-slate-100">Message Envoyé !</h3>
                <p className="text-xs text-slate-400">
                  Merci de nous avoir contactés. L'équipe de Rayan Ouarab vous répondra très rapidement.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Envoyer un Autre Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-xl">
                <h3 className="text-lg font-bold text-slate-100">
                  Formulaire de Message Direct
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Nom Complet</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Rayan Ouarab"
                      className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Adresse Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@domaine.com"
                      className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">Votre Message</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Expliquez-nous votre projet ou votre question..."
                    className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none backdrop-blur-md placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer le Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
