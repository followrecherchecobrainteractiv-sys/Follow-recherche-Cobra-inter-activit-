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
            
            <div className="rounded-3xl bg-white/5 border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-400 shrink-0 shadow-lg shadow-emerald-500/30">
                  <img
                    src={founder.avatar}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] text-center text-emerald-300 font-mono py-0.5">
                    DIR
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <span>{founder.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                      RND
                    </span>
                  </h3>
                  <div className="text-emerald-400 font-medium text-xs mt-0.5">
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

              {/* Special municipal badge & fast link */}
              <a
                href="#rnd-timizart-offer"
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-semibold hover:border-emerald-300 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>{currentLang === 'ar' ? 'عرض خاص لمناضلي RND ببلدية تيميزار' : 'Offre exclusive militants RND Timizart'}</span>
                </div>
                <span className="group-hover:translate-x-1 transition-transform font-mono text-[11px]">→</span>
              </a>

              <div className="pt-1 flex flex-wrap gap-1.5">
                {founder.specialties.map((spec, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-emerald-300 text-[10px] font-mono">
                    #{spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3">
              {/* Email */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 backdrop-blur-md">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono uppercase">{currentLang === 'ar' ? 'البريد الإلكتروني المباشر' : 'Email Direct'}</div>
                  <a href="mailto:rayaneouarab2000@gmail.com" className="text-sm font-bold text-slate-100 hover:text-emerald-400 transition-colors">
                    rayaneouarab2000@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp 1 & Call */}
              <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 flex items-center justify-between gap-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono uppercase">{currentLang === 'ar' ? 'واتساب وهاتف 1' : 'WhatsApp & Appel 1'}</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">05 63 21 48 88</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://wa.me/213563214888?text=Bonjour%20Rayan%20Ouarab%20Cobra%20Inter%20Activit%C3%A9"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 text-xs font-bold transition-all"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:0563214888"
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 text-xs font-bold transition-all"
                  >
                    📞
                  </a>
                </div>
              </div>

              {/* WhatsApp 2 & Call */}
              <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 flex items-center justify-between gap-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono uppercase">{currentLang === 'ar' ? 'واتساب وهاتف 2' : 'WhatsApp & Appel 2'}</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">07 96 68 32 88</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://wa.me/213796683288?text=Bonjour%20Rayan%20Ouarab%20Cobra%20Inter%20Activit%C3%A9"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 text-xs font-bold transition-all"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:0796683288"
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 text-xs font-bold transition-all"
                  >
                    📞
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 backdrop-blur-md">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono uppercase">{currentLang === 'ar' ? 'المقر والبلدية' : 'Localisation'}</div>
                  <div className="text-sm font-bold text-slate-200">
                    {currentLang === 'ar' 
                      ? 'بلدية تيميزار - سوق الحد - دائرة واڨنون - ولاية تيزي وزو، الجزائر' 
                      : 'Commune de Timizart - Souk El Had - Daïra d\'Ouaguenoun - Wilaya de Tizi Ouzou, Algérie'}
                  </div>
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
