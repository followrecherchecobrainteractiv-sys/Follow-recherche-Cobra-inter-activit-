import React, { useState, useEffect } from 'react';
import { Language, AdSettings } from '../types';
import { DollarSign, ExternalLink, Info, ShieldCheck, Sparkles, X } from 'lucide-react';

interface AdBannerProps {
  currentLang: Language;
  slot: 'leaderboard' | 'inline' | 'rectangle' | 'footer-sticky';
  onOpenSettings?: () => void;
}

const DEFAULT_AD_SETTINGS: AdSettings = {
  enabled: true,
  network: 'adsterra',
  redotPayId: 'REDOT-88392190',
  redotPayWalletUsdt: '0x9d2f...7c1a (TRC20)',
  autoPayout: true,
  minPayoutThreshold: 10,
};

export const AdBanner: React.FC<AdBannerProps> = ({ currentLang, slot, onOpenSettings }) => {
  const [adSettings, setAdSettings] = useState<AdSettings>(DEFAULT_AD_SETTINGS);
  const [isDismissed, setIsDismissed] = useState(false);
  const [adClicked, setAdClicked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cobra_ad_settings');
      if (saved) {
        setAdSettings(JSON.parse(saved));
      }
    } catch {
      // fallback to default
    }
  }, []);

  if (!adSettings.enabled || isDismissed) {
    return null;
  }

  // Handle simulated ad click to register impressions/earnings in localStorage
  const handleAdClick = () => {
    setAdClicked(true);
    setTimeout(() => setAdClicked(false), 2500);

    try {
      const rawStats = localStorage.getItem('cobra_ad_stats');
      const stats = rawStats
        ? JSON.parse(rawStats)
        : { impressions: 142, clicks: 8, ctr: 5.6, ecpm: 4.20, estimatedRevenueUsdt: 3.85 };
      
      stats.clicks += 1;
      stats.impressions += 1;
      stats.estimatedRevenueUsdt = Number((stats.estimatedRevenueUsdt + 0.15).toFixed(2));
      stats.ctr = Number(((stats.clicks / stats.impressions) * 100).toFixed(1));
      
      localStorage.setItem('cobra_ad_stats', JSON.stringify(stats));
    } catch {
      // ignore
    }
  };

  const labels = {
    adBadge: {
      ar: 'إعلان ممول',
      fr: 'Sponsorisé / Pub',
      en: 'Sponsored Ad',
    },
    redotPayPayout: {
      ar: 'أرباح الإعلانات محولة تلقائياً إلى RedotPay',
      fr: 'Gains pub transférés vers RedotPay',
      en: 'Ad revenue auto-synced to RedotPay',
    },
    sponsoredTitle: {
      ar: 'مساحة إعلانية نشطة - Cobra Inter Activité',
      fr: 'Espace Publicitaire Actif - Cobra Studio',
      en: 'Active Ad Space - Cobra Inter Activité',
    },
    ctaButton: {
      ar: 'استكشف العرض الخاص',
      fr: 'Découvrir L\'Offre',
      en: 'Explore Special Offer',
    },
    clickSuccess: {
      ar: 'تم احتساب النقرة وسحب الأرباح إلى RedotPay! +$0.15 USDT',
      fr: 'Clic enregistré ! Gains ajoutés à RedotPay: +$0.15 USDT',
      en: 'Click registered! Revenue credited to RedotPay: +$0.15 USDT',
    },
    settingsLink: {
      ar: 'إعدادات الإعلانات وRedotPay',
      fr: 'Config Pub & RedotPay',
      en: 'Ad & RedotPay Settings',
    }
  };

  // If custom raw HTML/Script is provided by user
  if (adSettings.customBannerScript && adSettings.customBannerScript.trim().length > 10) {
    return (
      <div className="my-6 w-full flex flex-col items-center justify-center bg-slate-900/80 border border-amber-500/30 rounded-xl p-3 relative shadow-lg">
        <div className="w-full flex justify-between items-center text-xs text-amber-400/80 mb-2 px-2">
          <span className="flex items-center gap-1 font-mono">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {labels.adBadge[currentLang]}
          </span>
        </div>
        <div 
          className="w-full overflow-hidden flex justify-center items-center"
          dangerouslySetInnerHTML={{ __html: adSettings.customBannerScript }}
        />
      </div>
    );
  }

  // Render high-converting responsive ad layouts based on slot
  if (slot === 'leaderboard') {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="relative group bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/40 rounded-2xl p-4 md:p-5 shadow-2xl hover:border-amber-400 transition-all duration-300">
          
          {/* Top Info Bar */}
          <div className="flex items-center justify-between text-xs text-amber-400/90 font-mono mb-2 pb-2 border-b border-amber-500/20">
            <span className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {labels.adBadge[currentLang]}
            </span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400 font-medium text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Sponsor</span>
            </span>
          </div>

          {/* Banner Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-amber-400 text-lg">
                  🐍
                </div>
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                  {labels.sponsoredTitle[currentLang]}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                  Exclusive Digital Production & Creative Gaming Solutions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <a
                href="https://my.redotpay.com"
                target="_blank"
                rel="noreferrer"
                onClick={handleAdClick}
                className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>{labels.ctaButton[currentLang]}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slot === 'rectangle') {
    return (
      <div className="w-full bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl text-center relative overflow-hidden group">
        <div className="absolute top-2 right-2 text-[10px] text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded font-mono border border-amber-500/20">
          {labels.adBadge[currentLang]}
        </div>
        <div className="my-3 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
            <DollarSign className="w-6 h-6 text-emerald-400" />
          </div>
          <h5 className="text-sm font-bold text-slate-200">Cobra Studio Featured Offer</h5>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Discover premium media & game production deals
          </p>
        </div>
        <a
          href="https://my.redotpay.com"
          target="_blank"
          rel="noreferrer"
          onClick={handleAdClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-md w-full justify-center"
        >
          {labels.ctaButton[currentLang]}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (slot === 'footer-sticky') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-amber-500/40 backdrop-blur-md px-4 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-500/30">
              {labels.adBadge[currentLang]}
            </span>
            <p className="text-xs md:text-sm text-slate-200 hidden sm:block font-medium">
              Cobra Inter Activité - Official Digital Production Showcase
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://my.redotpay.com"
              target="_blank"
              rel="noreferrer"
              onClick={handleAdClick}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {labels.ctaButton[currentLang]}
            </a>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg"
              title="Close Ad"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
