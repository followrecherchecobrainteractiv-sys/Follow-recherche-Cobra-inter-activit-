import React, { useState } from 'react';
import { Language } from '../types';
import { MessageSquare, Phone, X, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface AdBannerProps {
  currentLang: Language;
  slot: 'leaderboard' | 'inline' | 'rectangle' | 'footer-sticky';
  onOpenSettings?: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({ currentLang, slot }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  const phone1 = "0563214888";
  const phone2 = "0796683288";
  const whatsappUrl1 = `https://wa.me/213563214888?text=${encodeURIComponent("السلام عليكم أخي Rayane Ouarab، أتواصل معك بخصوص مشاريع وخدمات استوديو Cobra.")}`;
  const whatsappUrl2 = `https://wa.me/213796683288?text=${encodeURIComponent("السلام عليكم أخي Rayane Ouarab، أتواصل معك بخصوص مشاريع وخدمات استوديو Cobra.")}`;

  // Sticky bottom bar
  if (slot === 'footer-sticky') {
    return (
      <aside aria-label="شريط التواصل السريع" className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-emerald-500/40 backdrop-blur-xl px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Founder Identity & Full Address */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shrink-0 shadow-md">
              <img
                src="/assets/aistudio/file_00000000ccd88246b01893fc97aae17e_2d0b1a6d.png"
                alt="Rayane Ouarab"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {currentLang === 'ar' ? 'تواصل مع Rayane Ouarab' : 'Contact Direct avec Rayane Ouarab'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 hidden md:inline-block">
                  WhatsApp Direct
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                <span>
                  {currentLang === 'ar'
                    ? 'بلدية تيميزار - سوق الحد - دائرة واڨنون - ولاية تيزي وزو'
                    : 'Commune de Timizart, Souk El Had, Daïra d\'Ouaguenoun, Tizi Ouzou'}
                </span>
              </p>
            </div>
          </div>

          {/* Contact Numbers & Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={whatsappUrl1}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>واتساب 1: 0563214888</span>
            </a>

            <a
              href={whatsappUrl2}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">واتساب 2: </span>
              <span>0796683288</span>
            </a>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors ml-1"
              title="إغلاق الشريط"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>
    );
  }

  // Leaderboard slot (placed beneath hero)
  if (slot === 'leaderboard') {
    return (
      <aside aria-label="شريط التواصل السريع" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="relative group bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 rounded-2xl p-4 md:p-5 shadow-2xl hover:border-emerald-400 transition-all duration-300">
          
          {/* Top Info Bar */}
          <div className="flex items-center justify-between text-xs text-emerald-400/90 font-mono mb-2 pb-2 border-b border-emerald-500/20">
            <span className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {currentLang === 'ar' ? 'خط التواصل المباشر' : 'Ligne Directe'}
            </span>
            <span className="flex items-center gap-1 text-slate-300 font-medium text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>
                {currentLang === 'ar'
                  ? 'بلدية تيميزار - سوق الحد - دائرة واڨنون - ولاية تيزي وزو'
                  : 'Timizart, Souk El Had, Daïra d\'Ouaguenoun, Tizi Ouzou'}
              </span>
            </span>
          </div>

          {/* Banner Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-400 p-0.5 shadow-lg shrink-0">
                <img
                  src="/assets/aistudio/file_00000000ccd88246b01893fc97aae17e_2d0b1a6d.png"
                  alt="Rayane Ouarab"
                  className="w-full h-full object-cover object-top rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                  <span>{currentLang === 'ar' ? 'تواصل مع Rayane Ouarab' : 'Contact Direct avec Rayane Ouarab'}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                    WhatsApp
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {currentLang === 'ar'
                    ? 'مؤسس Follow Recherche Cobra ومناضل في حزب RND بتيميزار - تواصل فوري لمناقشة المشاريع والاستشارات'
                    : 'Fondateur de Cobra Inter Activité & Militant RND Timizart - Échange immédiat sur vos projets.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <a
                href={whatsappUrl1}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>واتساب 1: 0563214888</span>
              </a>

              <a
                href={whatsappUrl2}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>واتساب 2: 0796683288</span>
              </a>

              <a
                href="tel:0563214888"
                className="px-3 py-2.5 bg-white/5 hover:bg-white/15 text-slate-300 text-xs font-semibold rounded-xl border border-white/10 transition-colors"
                title="مكالمة هاتفية"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </aside>
    );
  }

  // Inline slot (middle of content)
  if (slot === 'inline') {
    return (
      <aside aria-label="شريط التواصل السريع" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-teal-950/60 border border-emerald-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-400 shrink-0 shadow-lg">
              <img
                src="/assets/aistudio/file_00000000ccd88246b01893fc97aae17e_2d0b1a6d.png"
                alt="Rayane Ouarab"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentLang === 'ar' ? 'تواصل مع Rayane Ouarab' : 'Contact Direct avec Rayane Ouarab'}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">
                {currentLang === 'ar' ? 'جاهزون لمرافقتكم في كل مشاريعكم الرقمية والتقنية' : 'À votre écoute pour concrétiser vos projets numériques'}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>
                  {currentLang === 'ar'
                    ? 'بلدية تيميزار - سوق الحد - دائرة واڨنون - ولاية تيزي وزو'
                    : 'Commune de Timizart, Souk El Had, Daïra d\'Ouaguenoun, Wilaya de Tizi Ouzou'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <a
              href={whatsappUrl1}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>واتساب: 0563214888</span>
            </a>
            <a
              href={whatsappUrl2}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-300 font-bold text-xs flex items-center gap-2 border border-emerald-500/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>واتساب: 0796683288</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  return null;
};
