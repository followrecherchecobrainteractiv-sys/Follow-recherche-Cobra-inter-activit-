import React, { useState } from 'react';
import { Language } from '../types';
import { 
  Award, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Heart, 
  Sparkles, 
  MessageCircle, 
  Send, 
  ShieldCheck, 
  Users, 
  FileCheck, 
  Maximize2, 
  X, 
  Star,
  MapPin,
  Flame,
  PhoneCall
} from 'lucide-react';

interface RndTimizartOfferSectionProps {
  currentLang: Language;
}

export const RndTimizartOfferSection: React.FC<RndTimizartOfferSectionProps> = ({ currentLang }) => {
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [militantName, setMilitantName] = useState('');
  const [militantPhone, setMilitantPhone] = useState('');
  const [militantCard, setMilitantCard] = useState('');
  const [serviceType, setServiceType] = useState('tech-consulting');
  const [notes, setNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const promoCode = 'RND-TIMIZART-2026';
  const photoUrl = '/assets/aistudio/file_00000000ccd88246b01893fc97aae17e_2d0b1a6d.png';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const isRtl = currentLang === 'ar';

  // Pre-configured WhatsApp message
  const whatsappText = encodeURIComponent(
    `السلام عليكم أخي ريان وعراب،\nأنا مناضل في حزب التجمع الوطني الديمقراطي (RND) ببلدية تيميزار.\nالاسم: ${militantName || 'مناضل RND تيميزار'}\nرقم الهاتف: ${militantPhone || 'متوفر'}\nأرغب في الاستفادة من العرض الخاص لمناضلي تيميزار (كود: ${promoCode}).`
  );

  return (
    <section 
      id="rnd-timizart-offer" 
      className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 border-y border-emerald-500/20"
    >
      {/* Ambient Algerian & Emerald Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-red-400 font-black">★</span>
            <span>
              {currentLang === 'ar' 
                ? 'مبادرة خاصة وحصرية | بلدية تيميزار' 
                : currentLang === 'fr' 
                  ? 'Initiative Exclusive | Commune de Timizart' 
                  : 'Exclusive Initiative | Timizart Municipality'}
            </span>
            <span className="text-emerald-400 font-black">★</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            {currentLang === 'ar' ? (
              <>
                عرض خاص واستثنائي لكل مناضل في{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300 bg-clip-text text-transparent underline decoration-emerald-500/50 decoration-wavy">
                  حزب التجمع الوطني الديمقراطي (RND)
                </span>{' '}
                ببلدية تيميزار
              </>
            ) : currentLang === 'fr' ? (
              <>
                Offre Exceptionnelle pour Chaque Militant du{' '}
                <span className="text-emerald-400">RND (Rassemblement National Démocratique)</span>{' '}
                de la Commune de Timizart
              </>
            ) : (
              <>
                Special Exclusive Offer for Every Militant of the{' '}
                <span className="text-emerald-400">RND Party</span> in Timizart Municipality
              </>
            )}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-light">
            {currentLang === 'ar'
              ? 'بمناسبة الذكرى المجيدة لاندلاع ثورة أول نوفمبر الخالدة (1954 - 2026)، وتكريساً لروح التضامن والوفاء لتضحيات الشهداء الأبرار، يسرّ الأخ والمناضل ريان وعراب (Ouarab Rayane) - مؤسس استوديو Cobra Inter Activité، تقديم باقة رقمية وتقنية مجانية ومدعومة بالكامل لكل رفاقنا ومناضلينا ببلدية تيميزار.'
              : currentLang === 'fr'
                ? 'À l\'occasion de la glorieuse révolution du 1er Novembre (1954-2026) et par fidélité envers nos glorieux martyrs, Rayan Ouarab — militant au RND dans la commune de Timizart et fondateur de Follow Recherche Cobra Inter Activité — met à disposition des militants une offre numérique et technologique complète.'
                : 'Commemorating the November 1st revolution (1954-2026), Rayan Ouarab, militant in the RND party of Timizart municipality and founder of Cobra Inter Activité, proudly dedicates an exclusive technological & digital support package for all Timizart militants.'}
          </p>
        </div>

        {/* Main Grid: Founder Photo Card on Left, Offer Details on Right */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Photo & Founder Official Showcase Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-slate-900/90 shadow-[0_0_50px_rgba(16,185,129,0.25)] group backdrop-blur-xl">
              
              {/* Photo View / Zoom trigger */}
              <div 
                className="relative cursor-pointer overflow-hidden"
                onClick={() => setLightboxOpen(true)}
                title={currentLang === 'ar' ? 'انقر لتكبير الصورة بدقة عالية' : 'Cliquer pour agrandir en haute résolution'}
              >
                <img 
                  src={photoUrl} 
                  alt="Ouarab Rayane - مناضل في حزب التجمع الوطني الديمقراطي RND - 1 نوفمبر" 
                  className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Overlay hover badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-slate-950/80 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md">
                    <Maximize2 className="w-4 h-4 text-emerald-400" />
                    <span>{currentLang === 'ar' ? 'تكبير الملصق الرسمي بدقة فائقة' : 'Agrandir l\'affiche officielle'}</span>
                  </span>
                </div>

                {/* Algerian Badge Flag Accent */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-xl backdrop-blur-md">
                  <span className="text-red-500 text-sm">🇩🇿</span>
                  <span>1er NOVEMBRE</span>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RND تيميزار</span>
                </div>
              </div>

              {/* Photo Caption & Info Bar */}
              <div className="p-6 bg-slate-950/95 border-t border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-100 flex items-center gap-2">
                      <span>وعراب ريان</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                        Ouarab Rayane
                      </span>
                    </h3>
                    <div className="text-xs text-emerald-400 font-semibold mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>مناضل في حزب التجمع الوطني الديمقراطي (RND) - بلدية تيميزار</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {currentLang === 'ar'
                    ? '«وفاءً لتضحيات شهدائنا الأبرار واستمراراً لمسيرتهم.. معاً من أجل جزائر منتصرة وتنمية واعدة لشباب بلدية تيميزار الحبيبة.»'
                    : '« Fidélité au sacrifice de nos martyrs.. Ensemble pour une Algérie victorieuse et le progrès numérique de la commune de Timizart. »'}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] font-mono text-slate-400">
                  <span>Follow Recherche Cobra</span>
                  <button 
                    onClick={() => setLightboxOpen(true)}
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <span>{currentLang === 'ar' ? 'عرض بدقة عالية' : 'Voir en plein écran'}</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Municipal Badge */}
            <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 flex items-center gap-3 backdrop-blur-md">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="text-slate-200 font-bold">
                  {currentLang === 'ar' ? 'المكتب البلدي - تيميزار' : 'Bureau Communal - Timizart'}
                </div>
                <div className="text-slate-400 text-[11px]">
                  {currentLang === 'ar' 
                    ? 'دعم مباشر لكل مناضل، شاب، وطالب بالبلدية' 
                    : 'Soutien direct aux militants et jeunes de la commune'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Offer Benefits & Request Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Promo Code Highlight Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-teal-950/80 border-2 border-emerald-400/40 shadow-xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentLang === 'ar' ? 'الرمز الترويجي المعتمد لمناضلي تيميزار' : 'Code Promo Officiel Militants Timizart'}</span>
                  </div>
                  <div className="text-lg font-bold text-slate-100">
                    {currentLang === 'ar' ? 'تخفيضات ومجانية 100% للخدمات والمشاريع' : 'Remises exclusives et gratuité à 100%'}
                  </div>
                </div>

                {/* Copy Button Box */}
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-xl bg-slate-950 border border-emerald-400/60 font-mono text-emerald-300 font-bold text-sm tracking-wider shadow-inner">
                    {promoCode}
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-1.5 text-xs"
                    title="نسخ الكود"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">{currentLang === 'ar' ? 'تم النسخ' : 'Copié'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">{currentLang === 'ar' ? 'نسخ' : 'Copier'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Pillars of the Timizart RND Offer */}
            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* Feature 1 */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors backdrop-blur-md space-y-2">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <Award className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>{currentLang === 'ar' ? 'مجاناً 100% (استشارات وتطوير)' : 'Gratuit 100% : Conseil & Lancement'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLang === 'ar'
                    ? 'دراسة الجدوى وتحديد المعمارية التقنية للمشاريع الرقمية وتطبيقات الهواتف والذكاء الاصطناعي لمناضلي وشباب بلدية تيميزار دون أي مقابل.'
                    : 'Audit et cadrage technique complet offert pour tout projet numérique ou startup initié par les militants de Timizart.'}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors backdrop-blur-md space-y-2">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <Star className="w-4 h-4 text-amber-400" />
                  </div>
                  <span>{currentLang === 'ar' ? 'خصم 50% إلى 70% على الخدمات' : 'Remise de 50% à 70%'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLang === 'ar'
                    ? 'تخفيض غير مسبوق على جميع خدمات استوديو Cobra (تطوير الألعاب، الإنتاج الموسيقي، تصميم الهويات البصرية، والمشاهد السينمائية 3D).'
                    : 'Tarifs préférentiels exceptionnels sur le développement de jeux vidéo, musique studio et réalisation cinématographique.'}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors backdrop-blur-md space-y-2">
                <div className="flex items-center gap-2.5 text-teal-400 font-bold text-sm">
                  <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30">
                    <FileCheck className="w-4 h-4 text-teal-400" />
                  </div>
                  <span>{currentLang === 'ar' ? 'دعم الأنشطة الجمعوية والبلدية' : 'Soutien aux Activités Locales'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLang === 'ar'
                    ? 'تصميم الملصقات الرقمية والفيديوهات الترويجية مجاناً لجميع الفعاليات الوطنية والخيرية والثقافية ببلدية تيميزار.'
                    : 'Conception graphique et audiovisuelle bénévole pour les événements associatifs, culturels et patriotiques à Timizart.'}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors backdrop-blur-md space-y-2">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>{currentLang === 'ar' ? 'تواصل مباشر مع ريان وعراب' : 'Contact Direct avec Rayan Ouarab'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLang === 'ar'
                    ? 'خط تواصل مخصص عبر واتساب والهاتف لتسريع معالجة طلبات رفاقنا المناضلين وأبناء بلدية تيميزار.'
                    : 'Ligne directe prioritaire par WhatsApp pour répondre et accompagner rapidement les demandes.'}
                </p>
              </div>

            </div>

            {/* Interactive Militant Request Form */}
            <div className="rounded-3xl bg-slate-900/80 border border-emerald-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-500" />
                    <span>{currentLang === 'ar' ? 'استمارة تفعيل العرض لمناضلي RND تيميزار' : 'Formulaire d\'Activation de l\'Offre Timizart'}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentLang === 'ar' 
                      ? 'املأ البيانات وسيتواصل معك الأخ ريان وعراب لتأكيد الاستفادة وتجهيز مشروعك.' 
                      : 'Renseignez vos informations pour activer votre offre avec Rayan Ouarab.'}
                  </p>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                  بلدية تيميزار
                </span>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-400 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-100">
                    {currentLang === 'ar' ? 'تم استلام طلبكم بنجاح يا رفيق النضال !' : 'Demande Reçue avec Succès !'}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    {currentLang === 'ar'
                      ? `شكراً أخي ${militantName || 'المناضل'}. تم تسجيل طلبك بخصوص العرض الخاص ببلدية تيميزار (كود: ${promoCode}). سيتواصل معك الأخ ريان وعراب مباشرة.`
                      : `Merci camarade ${militantName || ''}. Votre demande a été enregistrée. Rayan Ouarab prendra contact avec vous très vite.`}
                  </p>
                  
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://wa.me/?text=${whatsappText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{currentLang === 'ar' ? 'تأكيد عبر واتساب الآن' : 'Confirmer sur WhatsApp'}</span>
                    </a>

                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold hover:bg-white/15"
                    >
                      {currentLang === 'ar' ? 'تعديل البيانات' : 'Modifier'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {currentLang === 'ar' ? 'الاسم واللقب' : 'Nom et Prénom'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={militantName}
                        onChange={(e) => setMilitantName(e.target.value)}
                        placeholder={currentLang === 'ar' ? 'مثال: كريم أوعراب' : 'Ex: Karim Ouarab'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {currentLang === 'ar' ? 'رقم الهاتف / واتساب' : 'Téléphone / WhatsApp'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={militantPhone}
                        onChange={(e) => setMilitantPhone(e.target.value)}
                        placeholder="05 / 06 / 07 ..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {currentLang === 'ar' ? 'رقم بطاقة المناضل أو قرية بلدية تيميزار' : 'Village / N° Carte Militant'}
                      </label>
                      <input
                        type="text"
                        value={militantCard}
                        onChange={(e) => setMilitantCard(e.target.value)}
                        placeholder={currentLang === 'ar' ? 'مثال: قرية أبراغ، إبيداشن، أو رقم البطاقة' : 'Ex: Abizar, Boushel, etc.'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {currentLang === 'ar' ? 'نوع الخدمة المطلوبة' : 'Service souhaité'}
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                      >
                        <option value="tech-consulting">{currentLang === 'ar' ? 'استشارة تقنية وتوجيه لمشروع (مجاناً)' : 'Conseil & Audit de Projet (Gratuit)'}</option>
                        <option value="app-web">{currentLang === 'ar' ? 'تطوير موقع أو تطبيق بخصم 70%' : 'Création Web / Application (-70%)'}</option>
                        <option value="association">{currentLang === 'ar' ? 'مبادرة جمعوية أو نشاط شبابي ببلدية تيميزار' : 'Projet associatif / jeunesse Timizart'}</option>
                        <option value="multimedia">{currentLang === 'ar' ? 'تصميم فيديو أو موسيقى أو جرافيك 3D' : 'Production Vidéo / 3D / Audio'}</option>
                        <option value="other">{currentLang === 'ar' ? 'أخرى (شرح في الملاحظات)' : 'Autre besoin'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      {currentLang === 'ar' ? 'شرح مختصر للمشروع أو الاحتياج' : 'Description brève'}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={currentLang === 'ar' ? 'أكتب فكرتك أو استفسارك هنا...' : 'Expliquez votre projet ici...'}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>{currentLang === 'ar' ? 'إرسال طلب الاستفادة من العرض' : 'Soumettre ma Demande'}</span>
                    </button>

                    <a
                      href={`https://wa.me/?text=${whatsappText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>{currentLang === 'ar' ? 'مراسلة ريان وعراب مباشرة عبر واتساب' : 'WhatsApp Direct avec Rayan'}</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* High-Resolution Poster Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[95vh] flex flex-col items-center">
            
            {/* Top Close bar */}
            <div className="w-full flex items-center justify-between pb-3 text-slate-300">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>الملصق الرسمي: ريان وعراب (Ouarab Rayane) | حزب RND - 1 نوفمبر</span>
              </div>
              
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                title="إغلاق"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Full Poster Image */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/50 shadow-2xl max-h-[85vh] flex justify-center bg-slate-950">
              <img 
                src={photoUrl} 
                alt="Ouarab Rayane Poster - Full Resolution" 
                className="max-h-[85vh] w-auto object-contain"
              />
            </div>

            <div className="mt-3 text-center text-xs text-slate-400">
              {currentLang === 'ar' 
                ? 'انقر في أي مكان خارج الصورة أو على زر الإغلاق للعودة للصفحة' 
                : 'Cliquez sur la croix pour fermer'}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
