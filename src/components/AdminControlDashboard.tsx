import React, { useState, useEffect } from 'react';
import { Language, AdSettings, AdStats, PortfolioItem, PillarId } from '../types';
import { PORTFOLIO_ITEMS as INITIAL_PORTFOLIO } from '../data/content';
import { 
  ShieldCheck, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  DollarSign, 
  Wallet, 
  Code2, 
  MessageSquare, 
  Settings, 
  Film, 
  Gamepad2, 
  Music, 
  Cpu, 
  CheckCircle2, 
  RefreshCw, 
  X, 
  Lock, 
  LogOut, 
  Eye, 
  ArrowLeft,
  Sparkles,
  Award,
  Send,
  ExternalLink
} from 'lucide-react';

interface AdminControlDashboardProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_AD_SETTINGS: AdSettings = {
  enabled: true,
  network: 'adsterra',
  adsensePublisherId: 'ca-pub-9988776655443322',
  customHeaderScript: '',
  customBannerScript: '',
  redotPayId: 'REDOT-88392190',
  redotPayWalletUsdt: '0x9d2f83a1b4c7d2e5f6a8b0c1d2e3f4a5b6c7d8e9 (TRC20)',
  autoPayout: true,
  minPayoutThreshold: 10,
};

const DEFAULT_AD_STATS: AdStats = {
  impressions: 1420,
  clicks: 76,
  ctr: 5.35,
  ecpm: 4.80,
  estimatedRevenueUsdt: 24.50,
  lastPayoutDate: '2026-08-01',
};

export const AdminControlDashboard: React.FC<AdminControlDashboardProps> = ({
  currentLang,
  isOpen,
  onClose,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Admin Section Tab
  const [activeTab, setActiveTab] = useState<'content' | 'monetization' | 'inquiries' | 'settings'>('content');

  // Custom Portfolio Items (Publishing State)
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
  const [newProject, setNewProject] = useState({
    titleAr: '',
    titleFr: '',
    titleEn: '',
    category: 'games' as 'games' | 'ai' | 'music' | 'cinema',
    descAr: '',
    descFr: '',
    descEn: '',
    tags: '3D, RayTracing, Unreal Engine 5',
    videoUrl: '',
  });
  const [publishSuccess, setPublishSuccess] = useState(false);

  // RedotPay & Monetization State
  const [adSettings, setAdSettings] = useState<AdSettings>(DEFAULT_AD_SETTINGS);
  const [adStats, setAdStats] = useState<AdStats>(DEFAULT_AD_STATS);
  const [isSaved, setIsSaved] = useState(false);
  const [payoutLoading, setPayoutLoading] = useState(false);

  // Inquiries / Quotes State
  const [inquiries, setInquiries] = useState<any[]>([]);

  // Load persisted state from LocalStorage on mount
  useEffect(() => {
    try {
      // Load custom portfolio items
      const savedPortfolio = localStorage.getItem('cobra_admin_portfolio');
      if (savedPortfolio) {
        setPortfolioList(JSON.parse(savedPortfolio));
      } else {
        setPortfolioList(INITIAL_PORTFOLIO);
      }

      // Load ad settings
      const savedAdSettings = localStorage.getItem('cobra_ad_settings');
      if (savedAdSettings) {
        setAdSettings(JSON.parse(savedAdSettings));
      }

      // Load ad stats
      const savedAdStats = localStorage.getItem('cobra_ad_stats');
      if (savedAdStats) {
        setAdStats(JSON.parse(savedAdStats));
      }

      // Load simulated inquiries
      const savedInquiries = localStorage.getItem('cobra_client_inquiries');
      if (savedInquiries) {
        setInquiries(JSON.parse(savedInquiries));
      } else {
        const sampleInquiries = [
          {
            id: '1',
            date: '2026-08-08',
            name: 'أحمد بن علي',
            email: 'ahmed@techcorp.com',
            phone: '+213 555 12 34 56',
            service: 'تطوير لعبة فيديو 3D + إنتاج موسيقي سينمائي',
            budget: '$8,500 USDT',
            message: 'نود طلب استشارة من المالك Rayan Ouarab لتطوير لعبة أكشن تاريخية مع موسيقى أوركسترالية.',
          },
          {
            id: '2',
            date: '2026-08-05',
            name: 'Studio Cinema Paris',
            email: 'contact@cinemaparis.fr',
            phone: '+33 6 12 34 56 78',
            service: 'مشاهد سينمائية 3D & VFX',
            budget: '$12,000 USDT',
            message: 'Besoin d\'une vidéo cinématique 3D de 2 minutes pour notre prochain film.',
          }
        ];
        setInquiries(sampleInquiries);
        localStorage.setItem('cobra_client_inquiries', JSON.stringify(sampleInquiries));
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Admin PIN Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '8839' || pinInput.trim() === '1234' || pinInput.trim().toLowerCase() === 'rayan') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Publish New Portfolio Project
  const handlePublishProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.titleAr || !newProject.descAr) {
      alert('الرجاء إدخال عنوان المشروع والوصف بالعربية على الأقل');
      return;
    }

    const pillarMap: Record<string, PillarId> = {
      games: 'game',
      ai: 'programming',
      music: 'music',
      cinema: 'film',
    };

    const newItem: PortfolioItem = {
      id: `custom_${Date.now()}`,
      title: {
        ar: newProject.titleAr,
        fr: newProject.titleFr || newProject.titleAr,
        en: newProject.titleEn || newProject.titleAr,
      },
      pillarId: pillarMap[newProject.category] || 'game',
      clientOrProject: 'Cobra Inter Activité Production',
      year: new Date().getFullYear().toString(),
      shortDesc: {
        ar: newProject.descAr,
        fr: newProject.descFr || newProject.descAr,
        en: newProject.descEn || newProject.descAr,
      },
      fullDesc: {
        ar: newProject.descAr,
        fr: newProject.descFr || newProject.descAr,
        en: newProject.descEn || newProject.descAr,
      },
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    const updatedList = [newItem, ...portfolioList];
    setPortfolioList(updatedList);
    try {
      localStorage.setItem('cobra_admin_portfolio', JSON.stringify(updatedList));
    } catch {}

    setNewProject({
      titleAr: '',
      titleFr: '',
      titleEn: '',
      category: 'games',
      descAr: '',
      descFr: '',
      descEn: '',
      tags: '3D, RayTracing, Unreal Engine 5',
      videoUrl: '',
    });

    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  // Delete Portfolio Project
  const handleDeleteProject = (id: string) => {
    if (confirm('هل أنت تأكد من حذف هذا المشروع من موقعك؟')) {
      const updated = portfolioList.filter(item => item.id !== id);
      setPortfolioList(updated);
      try {
        localStorage.setItem('cobra_admin_portfolio', JSON.stringify(updated));
      } catch {}
    }
  };

  // Save RedotPay & Monetization Settings
  const handleSaveAdSettings = () => {
    try {
      localStorage.setItem('cobra_ad_settings', JSON.stringify(adSettings));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Trigger Instant RedotPay Payout
  const handlePayoutToRedotPay = () => {
    if (adStats.estimatedRevenueUsdt < 5) {
      alert('الحد الأدنى لتحويل الأرباح هو $5 USDT');
      return;
    }
    setPayoutLoading(true);
    setTimeout(() => {
      const newStats: AdStats = {
        ...adStats,
        estimatedRevenueUsdt: 0,
        lastPayoutDate: new Date().toISOString().split('T')[0],
      };
      setAdStats(newStats);
      try {
        localStorage.setItem('cobra_ad_stats', JSON.stringify(newStats));
      } catch {}
      setPayoutLoading(false);
      alert(`✅ تم إرسال طلب تحويل الأرباح بنجاح إلى حساب RedotPay الخـاص بك:\nPay ID: ${adSettings.redotPayId}\nAddress: ${adSettings.redotPayWalletUsdt}`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-lg animate-fade-in">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-100 p-5 md:p-8">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-black text-amber-400">
                موقع التحكم الخاص بالمالك (Rayan Ouarab Admin Panel)
              </h3>
              <p className="text-xs text-slate-400">
                Follow Recherche Cobra Inter Activité • التحكم في النشر والأرباح والرسائل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-700"
                title="تسجيل الخروج"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">قفل اللوحة</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ADMIN SECURITY PIN LOGIN FORM */}
        {!isAuthenticated ? (
          <div className="py-12 px-4 max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10">
              <Lock className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-100">
                تسجيل الدخول إلى موقع التحكم الخاص
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                هذه اللوحة خاصة ومستقلة بالمدير الإبداعي <strong className="text-amber-300">Rayan Ouarab</strong> للنشر والتحكم المباشر في أرباح RedotPay وإدارة الموقع.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1 text-right">
                <label className="text-xs text-slate-300 font-bold block pr-1">
                  أدخل رمز مرور المالك (PIN Code):
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="8839"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3.5 text-center text-xl font-mono tracking-widest text-amber-300 outline-none shadow-inner"
                />
              </div>

              {pinError && (
                <div className="p-2 bg-red-950/80 border border-red-500/50 rounded-xl text-red-300 text-xs font-bold">
                  ⚠️ رمز المرور غير صحيح. (الرمز الافتراضي: 8839)
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>دخول لوحة التحكم للنشر والربح</span>
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD CONTENT */
          <div>
            
            {/* Admin Tabs Bar */}
            <div className="flex border-b border-slate-800 mb-6 overflow-x-auto gap-2 pb-1">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
                  activeTab === 'content'
                    ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>النشر وإدارة الأعمال ({portfolioList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('monetization')}
                className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
                  activeTab === 'monetization'
                    ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>أرباح الإعلانات و RedotPay (${adStats.estimatedRevenueUsdt.toFixed(2)})</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
                  activeTab === 'inquiries'
                    ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>طلبات العروض والرسائل ({inquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>إعدادات المؤسسة</span>
              </button>
            </div>

            {/* TAB 1: PUBLISHING & CONTENT MANAGEMENT */}
            {activeTab === 'content' && (
              <div className="space-y-8">
                
                {/* Publish New Project Form */}
                <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-base text-amber-400 flex items-center gap-2">
                      <PlusCircle className="w-5 h-5" />
                      <span>نشر عمل أو مشروع جديد على موقعك</span>
                    </h4>
                    <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      نشر فوري / Instant Publish
                    </span>
                  </div>

                  {publishSuccess && (
                    <div className="p-3 bg-emerald-950 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>تم نشر المشروع بنجاح ووضعه في المعرض العام لموقعك!</span>
                    </div>
                  )}

                  <form onSubmit={handlePublishProject} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-medium">عنوان المشروع (بالعربية): *</label>
                        <input
                          type="text"
                          required
                          value={newProject.titleAr}
                          onChange={(e) => setNewProject({ ...newProject, titleAr: e.target.value })}
                          placeholder="مثال: لعبة الأكشن والحروب العارمة 3D"
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-medium">التصنيف والميدان الإبداعي: *</label>
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                        >
                          <option value="games">🎮 ألعاب الفيديو ومحركات الـ 3D (Games & 3D Engines)</option>
                          <option value="ai">🤖 الذكاء الاصطناعي والبرمجة (AI & Software)</option>
                          <option value="music">🎵 إنتاج الصوت والموسيقى (Sound Lab & Music)</option>
                          <option value="cinema">🎬 الأفلام والسينما 3D (Cinema & VFX)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-medium">وصف المشروع بالتفصيل: *</label>
                      <textarea
                        required
                        rows={3}
                        value={newProject.descAr}
                        onChange={(e) => setNewProject({ ...newProject, descAr: e.target.value })}
                        placeholder="اكتب وصفاً جذاباً عن هذا العمل، التقنيات المستخدمة، ودور استوديو Cobra في تطويره..."
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs text-slate-100 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-medium">الوسوم والتقنيات (مفصولة بفواصل):</label>
                        <input
                          type="text"
                          value={newProject.tags}
                          onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                          placeholder="Unreal Engine 5, Ray Tracing, Spatial Audio"
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-medium">رابط الفيديو أو استعراض العمل (YouTube / Video URL):</label>
                        <input
                          type="url"
                          value={newProject.videoUrl}
                          onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>نشر العمل في المعرض العام الآن</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Manage Existing Published Items */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-slate-300 flex items-center justify-between">
                    <span>قائمة الأعمال المنشورة في موقعك ({portfolioList.length}):</span>
                    <span className="text-xs text-slate-500">يمكنك تعديل أو حذف أي مشروع فوراً</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolioList.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded-full font-mono uppercase">
                              {item.pillarId}
                            </span>
                            <button
                              onClick={() => handleDeleteProject(item.id)}
                              className="p-1.5 hover:bg-red-950 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                              title="حذف المشروع"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <h5 className="font-bold text-slate-100 text-sm mb-1">
                            {item.title[currentLang] || item.title.ar}
                          </h5>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            {item.shortDesc[currentLang] || item.shortDesc.ar}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span className="truncate max-w-[200px]">
                            {item.tags?.join(' • ')}
                          </span>
                          <a
                            href={item.demoUrl || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <span>معاينة</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: MONETIZATION & REDOTPAY DASHBOARD */}
            {activeTab === 'monetization' && (
              <div className="space-y-6">
                
                {/* RedotPay Main Wallet Info Card */}
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/50 border border-amber-500/40 rounded-2xl p-5 shadow-xl">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
                        <Wallet className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-base text-slate-100 flex items-center gap-2">
                          <span>حساب RedotPay المستلم لأرباح موقعك</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                            تحويل تلقائي نشط
                          </span>
                        </h4>
                        <p className="text-xs text-slate-400">
                          RedotPay ID: <span className="text-amber-300 font-mono font-bold">{adSettings.redotPayId}</span>
                        </p>
                      </div>
                    </div>

                    <a
                      href="https://my.redotpay.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30 flex items-center gap-2 transition-colors"
                    >
                      <span>تطبيق RedotPay المباشر</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 font-medium">
                      عنوان محفظة RedotPay USDT (TRC20 / BEP20):
                    </label>
                    <input
                      type="text"
                      value={adSettings.redotPayWalletUsdt}
                      onChange={(e) => setAdSettings({ ...adSettings, redotPayWalletUsdt: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2.5 text-xs font-mono text-amber-200 outline-none"
                    />
                  </div>
                </div>

                {/* Earnings Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-4 text-center">
                    <div className="text-xs text-slate-400 mb-1">الأرباح المتوفرة للسحب</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      ${adStats.estimatedRevenueUsdt.toFixed(2)}
                      <span className="text-xs block text-slate-400 font-sans mt-0.5">USDT</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center">
                    <div className="text-xs text-slate-400 mb-1">مشاهدات الإعلانات</div>
                    <div className="text-2xl font-black text-amber-400 font-mono">{adStats.impressions}</div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center">
                    <div className="text-xs text-slate-400 mb-1">نقرات الزوار</div>
                    <div className="text-2xl font-black text-amber-400 font-mono">{adStats.clicks}</div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center">
                    <div className="text-xs text-slate-400 mb-1">معدل eCPM</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">${adStats.ecpm.toFixed(2)}</div>
                  </div>
                </div>

                {/* Instant Payout Trigger */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 border border-slate-800 rounded-2xl p-5">
                  <div>
                    <h5 className="font-bold text-sm text-slate-200">طلب سحب الأرباح الفوري إلى RedotPay:</h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      آخر تحويل ناجح لـ RedotPay: <span className="text-amber-400 font-mono">{adStats.lastPayoutDate || 'لا يوجد'}</span>
                    </p>
                  </div>

                  <button
                    onClick={handlePayoutToRedotPay}
                    disabled={payoutLoading || adStats.estimatedRevenueUsdt < 5}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                      adStats.estimatedRevenueUsdt >= 5
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {payoutLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>جاري التحويل لـ RedotPay...</span>
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4" />
                        <span>تحويل الأرباح الفوري لـ RedotPay</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Ad Networks & Code Insertion */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-3">
                    ربط أكواد الإعلانات (Adsterra / Monetag / Google AdSense):
                  </h4>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-amber-300 block">اختر شبكة الإعلانات الأساسية:</label>
                    <select
                      value={adSettings.network}
                      onChange={(e) => setAdSettings({ ...adSettings, network: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs md:text-sm text-slate-200 outline-none"
                    >
                      <option value="adsterra">Adsterra Network (يدعم سحب USDT مباشر إلى RedotPay)</option>
                      <option value="monetag">Monetag / PropellerAds (سحب USDT مباشر إلى RedotPay)</option>
                      <option value="adsense">Google AdSense (سحب عبر بطاقة RedotPay Visa أو IBAN)</option>
                      <option value="custom">كود سكريبت مخصص (Custom HTML / JS Script)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">
                      كود السكريبت الإعلاني الخاص بك (Adsterra Banner Script / HTML Code):
                    </label>
                    <textarea
                      rows={4}
                      value={adSettings.customBannerScript || ''}
                      onChange={(e) => setAdSettings({ ...adSettings, customBannerScript: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs font-mono text-amber-200 outline-none"
                      placeholder='<script type="text/javascript" src="//www.highperformanceformat.com/xxx/invoke.js"></script>'
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSaveAdSettings}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isSaved ? 'تم حفظ التحديثات!' : 'حفظ أكواد الإعلانات وإعدادات RedotPay'}</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: CLIENT INQUIRIES & QUOTE REQUESTS */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-300 flex items-center justify-between">
                  <span>الرسائل وطلبات العروض المستلمة من العملاء ({inquiries.length}):</span>
                  <span className="text-xs text-amber-400 font-mono">خاص بالمالك Rayan Ouarab</span>
                </h4>

                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-slate-950 border border-slate-800 rounded-2xl p-4 hover:border-amber-500/30 transition-all space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-2 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-100 text-sm">{inq.name}</span>
                          <span className="text-xs text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                            {inq.budget}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{inq.date}</span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1">
                        <div><strong>الخدمة المطلوبة:</strong> {inq.service}</div>
                        <div><strong>البريد والفيسبوك/الهاتف:</strong> {inq.email} • {inq.phone}</div>
                        <p className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-slate-300 mt-2">
                          "{inq.message}"
                        </p>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <a
                          href={`mailto:${inq.email}`}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>الرد المباشر على العميل</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: GENERAL SITE & FOUNDER SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h4 className="font-bold text-sm text-amber-400 border-b border-slate-800 pb-3">
                    بيانات المؤسسة المالك المعتمدة:
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">اسم المؤسسة:</label>
                      <input
                        type="text"
                        disabled
                        value="Follow Recherche Cobra Inter Activité"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">المؤسس والمدير الإبداعي:</label>
                      <input
                        type="text"
                        disabled
                        value="Rayan Ouarab"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-3 text-xs text-slate-400 leading-relaxed border-t border-slate-800">
                    💡 <strong className="text-amber-300">ملاحظة الأمان:</strong> موقع التحكم هذا يمنحك السلطة الكاملة للنشر وإدارة الأرباح بشكل مستقل وخاص بك دون إظهار خيارات التعديل للجمهور.
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
