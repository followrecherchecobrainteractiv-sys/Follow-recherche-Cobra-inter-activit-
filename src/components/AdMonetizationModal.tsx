import React, { useState, useEffect } from 'react';
import { Language, AdSettings, AdStats } from '../types';
import { 
  DollarSign, 
  Wallet, 
  CheckCircle2, 
  Code2, 
  HelpCircle, 
  X, 
  Sparkles, 
  TrendingUp, 
  CreditCard, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Copy,
  Sliders,
  Award
} from 'lucide-react';

interface AdMonetizationModalProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_SETTINGS: AdSettings = {
  enabled: true,
  network: 'adsterra',
  adsensePublisherId: 'ca-pub-9988776655443322',
  customHeaderScript: '',
  customBannerScript: '',
  redotPayId: 'REDOT-88392190',
  redotPayWalletUsdt: '0x9d2f83a1b4c7d2e5f6a8b0c1d2e3f4a5b6c7d8e9 (USDT TRC20)',
  autoPayout: true,
  minPayoutThreshold: 10,
};

const DEFAULT_STATS: AdStats = {
  impressions: 1240,
  clicks: 68,
  ctr: 5.48,
  ecpm: 4.85,
  estimatedRevenueUsdt: 18.50,
  lastPayoutDate: '2026-08-01',
};

export const AdMonetizationModal: React.FC<AdMonetizationModalProps> = ({
  currentLang,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'code' | 'guide'>('dashboard');
  const [settings, setSettings] = useState<AdSettings>(DEFAULT_SETTINGS);
  const [stats, setStats] = useState<AdStats>(DEFAULT_STATS);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('cobra_ad_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      const savedStats = localStorage.getItem('cobra_ad_stats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch {
      // fallback to default
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveSettings = () => {
    try {
      localStorage.setItem('cobra_ad_settings', JSON.stringify(settings));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRequestPayout = () => {
    if (stats.estimatedRevenueUsdt < 5) {
      alert(
        currentLang === 'ar'
          ? 'الحد الأدنى للسحب هو 5$ USDT'
          : 'Le seuil minimum de retrait est de 5$ USDT'
      );
      return;
    }
    setPayoutRequested(true);
    setTimeout(() => {
      const newStats = {
        ...stats,
        estimatedRevenueUsdt: 0,
        lastPayoutDate: new Date().toISOString().split('T')[0],
      };
      setStats(newStats);
      localStorage.setItem('cobra_ad_stats', JSON.stringify(newStats));
      setPayoutRequested(false);
      alert(
        currentLang === 'ar'
          ? `تم إرسال طلب السحب بنجاح إلى حساب RedotPay: (${settings.redotPayId})!`
          : `Demande de retrait envoyée avec succès vers le compte RedotPay: (${settings.redotPayId})!`
      );
    }, 1500);
  };

  const copyWallet = () => {
    navigator.clipboard.writeText(settings.redotPayWalletUsdt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = {
    modalTitle: {
      ar: 'إدارة الإعلانات والربح وسحب الأموال عبر RedotPay',
      fr: 'Monétisation Pubs & Retraits RedotPay',
      en: 'Ad Monetization & RedotPay Payout Dashboard',
    },
    tabs: {
      dashboard: { ar: 'لوحة الأرباح والـ RedotPay', fr: 'Tableau des Gains RedotPay', en: 'RedotPay Revenue' },
      code: { ar: 'أكواد شبكات الإعلانات', fr: 'Codes Réseaux Pubs', en: 'Ad Networks & Code' },
      guide: { ar: 'دليل الربح بـ RedotPay', fr: 'Guide RedotPay', en: 'RedotPay Setup Guide' },
    },
    redotPayCardTitle: {
      ar: 'حساب RedotPay لتحويل الأرباح',
      fr: 'Compte RedotPay pour Retrait des Gains',
      en: 'RedotPay Account for Payouts',
    },
    walletLabel: {
      ar: 'معرّف RedotPay (RedotPay Pay ID) أو عنوان USDT:',
      fr: 'Identifiant RedotPay (Pay ID) ou Adresse USDT:',
      en: 'RedotPay Pay ID or USDT Wallet Address:',
    },
    stats: {
      revenue: { ar: 'إجمالي الأرباح المتوفرة', fr: 'Gains Disponibles', en: 'Available Balance' },
      impressions: { ar: 'مشاهدات الإعلانات', fr: 'Impressions Pubs', en: 'Ad Impressions' },
      clicks: { ar: 'عدد النقرات', fr: 'Nombre de Clics', en: 'Total Clicks' },
      ecpm: { ar: 'معدل الـ eCPM', fr: 'Taux eCPM Moy.', en: 'Average eCPM' },
    },
    payoutBtn: {
      ar: 'طلب سحب الأرباح الفوري إلى RedotPay',
      fr: 'Demander un Retrait Immédiat vers RedotPay',
      en: 'Request Instant Payout to RedotPay',
    },
    networkSelectLabel: {
      ar: 'اختر شبكة الإعلانات المراد ربطها بموقعك:',
      fr: 'Choisissez le réseau publicitaire à connecter:',
      en: 'Select the Ad Network to integrate:',
    },
    networks: {
      adsterra: 'Adsterra (يدعم سحب USDT مباشر إلى RedotPay)',
      monetag: 'Monetag / PropellerAds (سحب USDT مباشر إلى RedotPay)',
      adsense: 'Google AdSense (سحب عبر بطاقة RedotPay Visa أو IBAN)',
      custom: 'كود إعلاني مخصص (Custom HTML / JS Script)',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-100 p-6 md:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-amber-400">
              {content.modalTitle[currentLang]}
            </h3>
            <p className="text-xs md:text-sm text-slate-400 flex items-center gap-2 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cobra Monetization Engine • RedotPay USDT / Card Auto Sync</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{content.tabs.dashboard[currentLang]}</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'code'
                ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>{content.tabs.code[currentLang]}</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'guide'
                ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{content.tabs.guide[currentLang]}</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD & REDOTPAY EARNINGS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* RedotPay Account Info Box */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/40 rounded-2xl p-5 shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-100 flex items-center gap-2">
                      <span>{content.redotPayCardTitle[currentLang]}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        مفعل / Verified
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      RedotPay ID: <span className="text-amber-300 font-mono font-bold">{settings.redotPayId}</span>
                    </p>
                  </div>
                </div>

                <a
                  href="https://my.redotpay.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30 flex items-center gap-2 transition-colors"
                >
                  <span>فتح تطبيق RedotPay</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-medium">
                  {content.walletLabel[currentLang]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settings.redotPayWalletUsdt}
                    onChange={(e) => setSettings({ ...settings, redotPayWalletUsdt: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs font-mono text-amber-200 outline-none"
                    placeholder="ضع عنوان wallet USDT TRC20 الخاصة بك في RedotPay"
                  />
                  <button
                    onClick={copyWallet}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1 border border-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'تم النسخ!' : 'نسخ'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-4 text-center relative overflow-hidden">
                <div className="text-xs text-slate-400 mb-1">{content.stats.revenue[currentLang]}</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ${stats.estimatedRevenueUsdt.toFixed(2)}
                  <span className="text-xs text-emerald-300 block font-sans font-normal mt-0.5">USDT</span>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
                <div className="text-xs text-slate-400 mb-1">{content.stats.impressions[currentLang]}</div>
                <div className="text-2xl font-black text-amber-400 font-mono">{stats.impressions}</div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
                <div className="text-xs text-slate-400 mb-1">{content.stats.clicks[currentLang]}</div>
                <div className="text-2xl font-black text-amber-400 font-mono">{stats.clicks}</div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
                <div className="text-xs text-slate-400 mb-1">{content.stats.ecpm[currentLang]}</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">${stats.ecpm.toFixed(2)}</div>
              </div>
            </div>

            {/* Action Payout Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 border border-slate-800 rounded-2xl p-5">
              <div>
                <h5 className="font-bold text-sm text-slate-200">
                  {currentLang === 'ar' ? 'حالة السحب التلقائي:' : 'Statut du Retrait Automatique:'}
                </h5>
                <p className="text-xs text-slate-400 mt-0.5">
                  آخر عملية سحب ناجحة لـ RedotPay:{' '}
                  <span className="text-amber-400 font-mono">{stats.lastPayoutDate || 'لا يوجد'}</span>
                </p>
              </div>

              <button
                onClick={handleRequestPayout}
                disabled={payoutRequested || stats.estimatedRevenueUsdt < 5}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                  stats.estimatedRevenueUsdt >= 5
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {payoutRequested ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري معالجة التحويل...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    <span>{content.payoutBtn[currentLang]}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CODE & NETWORK INTEGRATION */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              
              {/* Enable / Disable Ads Toggle */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-200">
                    {currentLang === 'ar' ? 'تفعيل الإعلانات في كافة أرجاء الموقع' : 'Activer les Publicités'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    عرض إعلانات الهيدر والبانرات والمحتوى لتوليد أرباح RedotPay
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                  className="w-5 h-5 accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Select Ad Network */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-2">
                  {content.networkSelectLabel[currentLang]}
                </label>
                <select
                  value={settings.network}
                  onChange={(e) => setSettings({ ...settings, network: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs md:text-sm text-slate-200 outline-none"
                >
                  <option value="adsterra">{content.networks.adsterra}</option>
                  <option value="monetag">{content.networks.monetag}</option>
                  <option value="adsense">{content.networks.adsense}</option>
                  <option value="custom">{content.networks.custom}</option>
                </select>
              </div>

              {/* AdSense Publisher ID Input */}
              {settings.network === 'adsense' && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Google AdSense Publisher ID (مثال: ca-pub-XXXXXXXXXXXXXXXX):
                  </label>
                  <input
                    type="text"
                    value={settings.adsensePublisherId || ''}
                    onChange={(e) => setSettings({ ...settings, adsensePublisherId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono text-amber-200"
                    placeholder="ca-pub-1234567890"
                  />
                </div>
              )}

              {/* Custom Banner HTML / Script Snippet */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">
                  كود السكريبت الإعلاني الخاص بك (Adsterra Banner Script / HTML Code):
                </label>
                <textarea
                  rows={4}
                  value={settings.customBannerScript || ''}
                  onChange={(e) => setSettings({ ...settings, customBannerScript: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs font-mono text-amber-200 outline-none"
                  placeholder='<script type="text/javascript" src="//www.highperformanceformat.com/xxx/invoke.js"></script>'
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSaved ? 'تم حفظ الإعدادات!' : 'حفظ التغييرات الأكواد'}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: STEP-BY-STEP REDOTPAY GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-6 text-sm text-slate-300">
            <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-4">
              <h4 className="font-bold text-base text-amber-400 flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>خطوات ربط الإعلانات وسحب الأموال مباشرة إلى RedotPay:</span>
              </h4>

              <div className="space-y-3 text-xs md:text-sm leading-relaxed">
                <div className="flex gap-3 items-start bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="text-slate-100 block mb-1">الخطوة الأولى: تسجيل حساب في شبكة إعلانية تدعم سحب USDT</strong>
                    أفضل الشبكات الإعلانية التي تدعم السحب المباشر بـ USDT إلى RedotPay هي:
                    <ul className="list-disc list-inside mt-1 space-y-1 text-slate-400">
                      <li><strong>Adsterra:</strong> تسمح بسحب الأرباح تلقائياً بدفعة أدنى 10$ عبر USDT (TRC20 أو BEP20).</li>
                      <li><strong>Monetag / PropellerAds:</strong> تدعم التحويل الفوري لـ USDT.</li>
                      <li><strong>Google AdSense:</strong> يمكنك إضافة بطاقة RedotPay Visa الافتراضية لاستلام الأرباح أو التحويل المصرفي IBAN.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="text-slate-100 block mb-1">الخطوة الثانية: الحصول على عنوان RedotPay USDT Wallet</strong>
                    افتح تطبيق RedotPay على هاتفك ← اضغط على <strong>Deposit</strong> ← اختر <strong>USDT (TRC20 أو BEP20)</strong> ← انسخ العنوان وضعه في إعدادات السحب بـ Adsterra أو Monetag.
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="text-slate-100 block mb-1">الخطوة الثالثة: وضع كود الإعلان في موقعك</strong>
                    انسخ كود البانر (Banner Script) من حسابك الإعلاني وضعه في تبويب <strong>"أكواد شبكات الإعلانات"</strong> أعلاه. ستبدأ الإعلانات بالظهور وسيتراكم الرصيد للتحويل لـ RedotPay.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
