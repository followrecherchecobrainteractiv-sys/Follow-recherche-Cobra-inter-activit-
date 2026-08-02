import { PillarInfo, PortfolioItem, TeamMember, Language } from '../types';

import heroImg from '../assets/images/cobra_hero_banner_1785551170571.jpg';
import gameImg from '../assets/images/cobra_game_studio_1785551182072.jpg';
import musicImg from '../assets/images/cobra_music_studio_1785551193538.jpg';
import filmImg from '../assets/images/cobra_film_studio_1785551203768.jpg';

export const COMPANY_NAME = "Follow Recherche Cobra Inter Activité";
export const FOUNDER_NAME = "Rayan Ouarab";

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {
    navHome: "Accueil",
    navAnniversary: "Film Anniversaire",
    navPillars: "Nos 4 Pôles",
    navAiArchitect: "IA Studio Architect",
    navPortfolio: "Réalisations",
    navSoundLab: "Cobra Audio Lab",
    navQuote: "Devis & Estimation",
    navContact: "Contact",
    heroBadge: "Structure Créative de Premier Plan",
    heroSlogan: "CRÉER. INNOVER. INSPIRER.",
    heroTitle: "L'Excellence Technologique et Artistique au Service de vos Ambitions",
    heroSub: "Follow Recherche Cobra Inter Activité donne vie à vos visions à travers le développement de jeux vidéo AAA, l'IA et programmation avancée, la composition musicale symphonique et la réalisation de films & cinématiques 3D.",
    ctaConsultAi: "Lancer l'Architecte IA",
    ctaExplorePillars: "Découvrir les 4 Pôles",
    ctaQuote: "Demander un Devis",
    pillarsSectionTitle: "Les 4 Pôles d'Excellence Cobra",
    pillarsSectionSub: "Une synergie unique entre technologie de pointe et création artistique pour transformer vos idées en chefs-d'œuvre.",
    aiSectionTitle: "Studio AI Architect - Générateur de Projets",
    aiSectionSub: "Décrivez votre projet en langage naturel et laissez notre intelligence artificielle concevoir votre cahier des charges, votre stack technique et votre estimation créative.",
    aiPlaceholder: "Ex: Je souhaite développer un jeu vidéo d'action dark fantasy avec bande-son orchestrale et bande-annonce cinématographique 3D...",
    aiBtnGenerate: "Générer la Proposition IA",
    aiBtnLoading: "Analyse et Conception en cours...",
    portfolioTitle: "Nos Réalisations & Démonstrations",
    portfolioSub: "Explorez nos projets récents à travers tous les domaines créatifs.",
    filterAll: "Tous les Projets",
    quoteTitle: "Calculateur de Projet & Devis",
    quoteSub: "Sélectionnez vos besoins pour obtenir une estimation personnalisée instantanée.",
    contactTitle: "Contactez Cobra Inter Activité",
    contactSub: "Prêt à démarrer un projet révolutionnaire ? Notre équipe est à votre écoute.",
    founderRole: "Fondateur & Directeur Créatif",
    quickStatsGames: "Jeux & Moteurs 3D",
    quickStatsAi: "Algorithmes IA Pro",
    quickStatsMusic: "Compositions Musicales",
    quickStatsCinema: "Films & VFX Rendered",
    soundLabTitle: "Cobra Sound Studio Player",
    soundLabSub: "Écoutez nos créations sonores et bandes-son immersives en direct.",
  },
  ar: {
    navHome: "الرئيسية",
    navAnniversary: "فيديو الذكرى التأسيسية",
    navPillars: "مجالاتنا الأربعة",
    navAiArchitect: "مهندس الذكاء الاصطناعي",
    navPortfolio: "أعمالنا والابتكارات",
    navSoundLab: "استوديو الصوت كوبرا",
    navQuote: "طلب عرض سعر",
    navContact: "اتصل بنا",
    heroBadge: "مؤسسة إبداعية وتكنولوجية رائدة",
    heroSlogan: "ابتكار. ابداع. إلهام.",
    heroTitle: "التميز التكنولوجي والفني لتحقيق طموحاتك الإبداعية",
    heroSub: "شركة Follow Recherche Cobra Inter Activité تمنح الحياة لأفكارك من خلال تطوير ألعاب الفيديو، البرمجة المتقدمة والذكاء الاصطناعي، الإنتاج الموسيقي، وصناعة الأفلام والمشاهد السينمائية ثلاثية الأبعاد.",
    ctaConsultAi: "تشغيل مستشار الذكاء الاصطناعي",
    ctaExplorePillars: "استكشف الميادين 4",
    ctaQuote: "احصل على عرض سعر",
    pillarsSectionTitle: "المجالات الأربعة للتميز في كوبرا",
    pillarsSectionSub: "تكامل فريد بين التكنولوجيا المتقدمة والفنون الإبداعية لتحويل أفكارك إلى حلول واستوديوهات عالمية المستوى.",
    aiSectionTitle: "مهندس المشاريع بالذكاء الاصطناعي",
    aiSectionSub: "صف فكرتك أو مشروعك باللغة العربية أو الفرنسية ودع نموذج الذكاء الاصطناعي يحلل المتطلبات ويقترح معمارية المشروع والميزانية والجدول الزمني.",
    aiPlaceholder: "مثال: أريد تطوير لعبة فيديو عالم مفتوح مع إنتاج موسيقى تصويرية وإعلان سينمائي ثلاثي الأبعاد...",
    aiBtnGenerate: "توليد اقتراح المشروع",
    aiBtnLoading: "جاري تحليل وتصميم المشروع...",
    portfolioTitle: "معرض الأعمال والابتكارات",
    portfolioSub: "استعرض مشاريعنا في تطوير البرمجيات، الألعاب، الموسيقى، والأفلام.",
    filterAll: "جميع المشاريع",
    quoteTitle: "حاسبة التكلفة والتقدير",
    quoteSub: "حدد الخدمات المطلوبة للحصول على ملخص تقديري ومباشر لمشروعك.",
    contactTitle: "تواصل مع Cobra Inter Activité",
    contactSub: "هل أنت جاهز لإطلاق مشروعك التالي؟ فريقنا في خدمتك لمناقشة طموحاتك.",
    founderRole: "المؤسس والمدير الإبداعي",
    quickStatsGames: "ألعاب ومحركات 3D",
    quickStatsAi: "خوارزميات ذكاء اصطناعي",
    quickStatsMusic: "مقطوعات إنتاج موسيقي",
    quickStatsCinema: "أفلام ومؤثرات سينمائية",
    soundLabTitle: "مشغل الصوت واستوديو الموسيقى",
    soundLabSub: "استمع إلى النماذج الصوتية والمؤثرات التفاعلية المنتجة في استوديوهاتنا.",
  },
  en: {
    navHome: "Home",
    navAnniversary: "Anniversary Film",
    navPillars: "4 Pillars",
    navAiArchitect: "AI Studio Architect",
    navPortfolio: "Showcase",
    navSoundLab: "Cobra Sound Lab",
    navQuote: "Quote & Estimate",
    navContact: "Contact",
    heroBadge: "Premier Creative & Technology Studio",
    heroSlogan: "CREATE. INNOVATE. INSPIRE.",
    heroTitle: "Technological & Artistic Excellence Driving Your Vision Forward",
    heroSub: "Follow Recherche Cobra Inter Activité brings your boldest ideas to life through high-end game development, advanced programming & AI, custom musical scores, and cinematic 3D film production.",
    ctaConsultAi: "Launch AI Project Architect",
    ctaExplorePillars: "Explore 4 Pillars",
    ctaQuote: "Get a Custom Quote",
    pillarsSectionTitle: "Cobra's 4 Core Pillars of Excellence",
    pillarsSectionSub: "A seamless synergy between cutting-edge engineering and master-level artistry to create unmatched solutions.",
    aiSectionTitle: "Cobra AI Project Architect",
    aiSectionSub: "Describe your ambitious concept and let our AI engine craft a detailed technical architecture, soundtrack concept, cinematic plan, and project roadmap.",
    aiPlaceholder: "e.g. I want to build a dark fantasy action game with an orchestral sound design and an Unreal Engine cinematic trailer...",
    aiBtnGenerate: "Generate AI Project Blueprint",
    aiBtnLoading: "Designing Blueprint...",
    portfolioTitle: "Featured Work & Demos",
    portfolioSub: "Discover our work across gaming, AI software, music composition, and cinematics.",
    filterAll: "All Projects",
    quoteTitle: "Project Estimator & Proposal",
    quoteSub: "Configure your service combination to receive an instant proposal.",
    contactTitle: "Contact Cobra Inter Activité",
    contactSub: "Ready to launch a revolutionary project? Reach out to our team today.",
    founderRole: "Founder & Creative Director",
    quickStatsGames: "3D Games & Engines",
    quickStatsAi: "AI Algorithms Deployed",
    quickStatsMusic: "Original Musical Scores",
    quickStatsCinema: "Cinematics & VFX",
    soundLabTitle: "Cobra Sound Studio Player",
    soundLabSub: "Listen to custom immersive sound design and original tracks live.",
  }
};

export const PILLARS: PillarInfo[] = [
  {
    id: 'programming',
    title: {
      fr: "Programmation Avancée & IA",
      ar: "البرمجة المتقدمة والذكاء الاصطناعي",
      en: "Advanced Programming & AI"
    },
    slogan: {
      fr: "CODE IS POWER",
      ar: "الشيفرة هي القوة",
      en: "CODE IS POWER"
    },
    shortDesc: {
      fr: "Développement d'applications haute performance, microservices, algorithmes d'IA sur-mesure et systèmes automatisés intelligents.",
      ar: "تطوير تطبيقات عالية الأداء، معماريات الذكاء الاصطناعي المخصصة، والأنظمة التلقائية الذكية للشركات والمؤسسات.",
      en: "High-performance software development, custom AI models, microservices, and intelligent automated systems."
    },
    fullDesc: {
      fr: "Notre pôle de programmation avancée concrétise les architectures logicielles les plus complexes. Nous intégrons des moteurs d'intelligence artificielle avancés, des modèles LLM et de vision par ordinateur, ainsi que des plateformes web et mobiles évolutives.",
      ar: "يصمم قسم البرمجة المتقدمة المعمارية البرمجية للمشاريع الكبرى، مع دمج شبكات الذكاء الاصطناعي، الرؤية الحاسوبية، والأنظمة السحابية الفائقة السرعة.",
      en: "Our advanced engineering division builds robust software architectures, custom AI models, computer vision systems, and scalable enterprise platforms."
    },
    icon: "Code2",
    image: heroImg,
    badgeText: {
      fr: "IA & Core Tech",
      ar: "الذكاء الاصطناعي والتك",
      en: "AI & Tech Core"
    },
    keyCapabilities: {
      fr: ["Modèles LLM & IA Générative", "Architecture Cloud & Microservices", "Applications Web & Mobile Full-Stack", "Optimisation Moteur C++ / Rust / Python"],
      ar: ["نماذج الذكاء الاصطناعي والتوليد", "معماريات السحاب والميكروسيرفس", "تطبيقات الويب والموبايل متكاملة", "تحسين الأداء בלغة C++ و Python"],
      en: ["Custom LLMs & Generative AI", "Cloud Architecture & Microservices", "Full-Stack Web & Mobile Ecosystems", "C++ / Rust Engine Optimization"]
    }
  },
  {
    id: 'game',
    title: {
      fr: "Développement de Jeux Vidéo",
      ar: "تطوير ألعاب الفيديو",
      en: "Game Development"
    },
    slogan: {
      fr: "PLAY. CREATE. INSPIRE.",
      ar: "العب. ابتكر. ألهم.",
      en: "PLAY. CREATE. INSPIRE."
    },
    shortDesc: {
      fr: "Création de jeux vidéo captivants sur Unreal Engine & Cobra Engine, mécanismes de gameplay innovants, graphismes 3D de qualité AAA.",
      ar: "صناعة ألعاب فيديو غامضة وممتعة باستخدام محرك Unreal Engine ومحرك Cobra المخصص، مع رسوميات ثلاثية الأبعاد خيالية.",
      en: "Crafting immersive games on Unreal Engine & custom Cobra Engine with AAA 3D graphics and innovative gameplay mechanics."
    },
    fullDesc: {
      fr: "Nous concevons des univers de jeux vidéo uniques de A à Z. De la physique des personnages au level design, de l'animation au multi-joueur en temps réel, nous créons des expériences interactives mémorables pour PC, consoles et mobile.",
      ar: "نحن نصنع عوالم ألعاب تفاعلية كاملة من الصفر، تشمل برمجة أسلوب اللعب، تصميم المراحل، الفيزياء ثلاثية الأبعاد، والأنظمة متعددة اللاعبين.",
      en: "We design complete gaming experiences from concept to release, featuring advanced character physics, level design, real-time multiplayer, and fluid combat systems."
    },
    icon: "Gamepad2",
    image: gameImg,
    badgeText: {
      fr: "Cobra Game Studio",
      ar: "استوديو ألعاب كوبرا",
      en: "Cobra Game Studio"
    },
    keyCapabilities: {
      fr: ["Moteurs Unreal Engine 5 & Unity", "Game Design & Mechanics 3D", "Multi-joueur Temps Réel & Serveurs", "Optimisation Consoles & PC"],
      ar: ["محركات Unreal Engine 5 و Unity", "تصميم وآليات اللعب ثلاثية الأبعاد", "شبكات اللعب الجماعي والسيرفرات", "تحسين الأداء لأجهزة الكونسول والكمبيوتر"],
      en: ["Unreal Engine 5 & Custom Engines", "3D Game Mechanics & Physics", "Real-Time Multiplayer Architecture", "Console & PC Performance Tuning"]
    }
  },
  {
    id: 'music',
    title: {
      fr: "Production Musicale & Sound Design",
      ar: "الإنتاج الموسيقي والتصميم الصوتي",
      en: "Music Production & Sound Design"
    },
    slogan: {
      fr: "DES SONS QUI MARQUENT",
      ar: "أصوات تترك أثراً",
      en: "DES SONS QUI MARQUENT"
    },
    shortDesc: {
      fr: "Bandes-son symphoniques et électroniques, compositions originales pour jeux et films, sound design immersif et mixage studio.",
      ar: "إنتاج أوركسترا وموسيقى إلكترونية، ألحان مخصصة للألعاب والأفلام، وتصميم صوتي ثلاثي الأبعاد عالي الجودة.",
      en: "Orchestral and electronic original sound tracks (OST), sound design for games & movies, and spatial audio mastering."
    },
    fullDesc: {
      fr: "L'émotion sonore est le cœur de toute expérience réussie. Nos compositeurs et ingénieurs du son créent des bandes-son puissantes, des effets sonores (SFX) réalistes et un son spatialisé haute fidélité pour vos projets vidéo et jeux.",
      ar: "الصوت والموسيقى هما روح التجربة الإبداعية. يقدم مهندسو الصوت والموسيقيون لدينا ألحاناً حماسية وتأثيرات صوتية مخصصة تزيد من اندماج المشاهد والمستخدم.",
      en: "Sound design bridges technical visuals with deep emotion. Our sound suite produces custom orchestral arrangements, adaptive game audio, Foley, and Dolby Atmos audio mixing."
    },
    icon: "Music",
    image: musicImg,
    badgeText: {
      fr: "Cobra Audio Lab",
      ar: "مختبر الصوت كوبرا",
      en: "Cobra Audio Lab"
    },
    keyCapabilities: {
      fr: ["Compositions Originales Symphoniques & Synth", "Sound Design SFX & Bruitage", "Audio Adaptatif pour Jeux (FMOD/Wwise)", "Mixage & Masterisation Spatialisée"],
      ar: ["تأليف ألحان سينمائية وأوركسترا", "تصميم المؤثرات الصوتية والبيئية", "صوت تفاعلي مع محركات الألعاب", "مكساج وماسترينغ عالي الجودة"],
      en: ["Original Orchestral & Electronic OST", "Custom SFX & Interactive Audio", "FMOD & Wwise Game Integration", "Spatial Mixing & Audio Mastering"]
    }
  },
  {
    id: 'film',
    title: {
      fr: "Films, Cinématiques & VFX 3D",
      ar: "الأفلام والمشاهد السينمائية والمؤثرات",
      en: "Films, Cinematics & 3D VFX"
    },
    slogan: {
      fr: "DONNER VIE À VOS IDÉES",
      ar: "نعطي الحياة لأفكارك",
      en: "DONNER VIE À VOS IDÉES"
    },
    shortDesc: {
      fr: "Réalisation de bandes-annonces cinématographiques 3D, court-métrages, effets visuels VFX, capture de mouvement et post-production.",
      ar: "إخراج العروض السينمائية ثلاثية الأبعاد، الأفلام القصيرة، المؤثرات البصرية VFX، والتقاط الحركة لتجسيد خيالك.",
      en: "3D cinematic trailers, short films, visual effects (VFX), motion capture, and complete high-end video post-production."
    },
    fullDesc: {
      fr: "Du storyboard au rendu final 8K, nous produisons des films et cinématiques à fort impact visuel. Nous combinons capture de mouvement, éclairage volumétrique et VFX pour captiver votre audience.",
      ar: "من مرحلة اللوحة القصصية إلى العرض النهائي بدقة فائقة، ننتج أفلاماً وإعلانات سينمائية ثلاثية الأبعاد تثير الإعجاب وتجذب الملايين.",
      en: "From storyboarding to final photorealistic render, we deliver high-octane 3D cinematic trailers, visual effects, motion capture performance, and promotional video productions."
    },
    icon: "Video",
    image: filmImg,
    badgeText: {
      fr: "Cobra Studios Film",
      ar: "استوديو سينما كوبرا",
      en: "Cobra Studios Film"
    },
    keyCapabilities: {
      fr: ["Cinématiques 3D Photoréalistes", "VFX & Effets Spéciaux Volumétriques", "Capture de Mouvement (MoCap)", "Montage & Étalonnage Cinéma"],
      ar: ["مشاهد سينمائية ثلاثية الأبعاد واقعية", "مؤثرات بصرية خاصة VFX", "تقنية التقاط الحركة MoCap", "مونتاج وتعديل ألوان سينمائي"],
      en: ["Photorealistic 3D Cinematics", "Volumetric VFX & Simulation", "Motion Capture & Facial Rigging", "Color Grading & Cinematic Post-Production"]
    }
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "cobra-engine-core",
    title: {
      fr: "Cobra AI Core & Framework Multi-Agents",
      ar: "نظام كوبرا للذكاء الاصطناعي المتقدم",
      en: "Cobra AI Core & Multi-Agent Framework"
    },
    pillarId: "programming",
    clientOrProject: "R&D Cobra Inter Activité",
    year: "2026",
    image: heroImg,
    shortDesc: {
      fr: "Système IA autonome permettant d'analyser des flux vidéo et d'optimiser les performances de code en temps réel.",
      ar: "منظومة ذكاء اصطناعي مستقلة لتحليل الفيديو المباشر وتحسين كفاءة الشيفرة البرمجية.",
      en: "Autonomous AI architecture for real-time video stream analysis and code execution optimization."
    },
    fullDesc: {
      fr: "Développé en interne, Cobra AI Core est une plateforme distribuée combinant traitement du langage naturel et analyse prédictive pour automatiser la création de contenu et la gestion des jeux.",
      ar: "تم تطوير هذا النظام لربط الذكاء الاصطناعي مع المحركات البرمجية لإعادة معالجة الموارد والأداء تلقائياً.",
      en: "In-house built system leveraging neural agents to streamline automated content workflows and live game telemetry."
    },
    tags: ["C++20", "Python", "TensorFlow", "Generative AI", "WebSockets"],
    techSpecs: {
      engine: "Cobra Core v3",
      language: "C++ / Python",
      aiModel: "Gemini / Custom Neural Net"
    }
  },
  {
    id: "shadow-venom-game",
    title: {
      fr: "Chronicles of Cobra: Shadow Realm",
      ar: "سجلات كوبرا: عالم الظلال (لعبة فيديو)",
      en: "Chronicles of Cobra: Shadow Realm (3D Game)"
    },
    pillarId: "game",
    clientOrProject: "Cobra Game Studios",
    year: "2025",
    image: gameImg,
    shortDesc: {
      fr: "Jeu d'action-RPG en monde ouvert avec combats fluides, système météo dynamique et IA d'ennemis adaptative.",
      ar: "لعبة أكشن وتقمص أدوار عالم مفتوح بأسلوب لعب حماسي ونظام ذكاء اصطناعي تفاعلي للأعداء.",
      en: "Open-world action RPG featuring dynamic weather, adaptive enemy AI, and intense melee combat."
    },
    fullDesc: {
      fr: "Un chef-d'œuvre interactif combinant un gameplay nerveux, une direction artistique sombre et dorée, et une bande-son évolutive en fonction des batailles.",
      ar: "تجربة لعب أسطورية تمزج بين الغرافيك الخيالي والقتال السريع مع موسيقى حماسية تتغير حسَب أحداث اللعبة.",
      en: "A dark fantasy action RPG featuring next-gen Nanite lighting, fluid combat animations, and adaptive music."
    },
    tags: ["Unreal Engine 5.4", "C++", "DirectX 12", "Open World", "Ray Tracing"],
    videoTrailer: {
      title: "Gameplay Trailer 4K",
      duration: "02:15"
    },
    techSpecs: {
      engine: "Unreal Engine 5.4",
      language: "C++ / Blueprints",
      renderTech: "Lumen & Nanite"
    }
  },
  {
    id: "symphonic-cobra-ost",
    title: {
      fr: "Bande-Son Orchestrale 'Golden Dynasty'",
      ar: "الموسيقى التصويرية 'السلالة الذهبية'",
      en: "'Golden Dynasty' Symphonic Soundtrack"
    },
    pillarId: "music",
    clientOrProject: "Cinematic OST & Sound Suite",
    year: "2026",
    image: musicImg,
    shortDesc: {
      fr: "Composition orchestrale hybride mêlant instruments traditionnels, synthétiseurs analogiques et percussions épiques.",
      ar: "تأليف أوركسترالي ملحمي يدمج بين الآلات التراثية والآلات الإلكترونية والمؤثرات الصوتية الحماسية.",
      en: "Hybrid orchestral composition blending traditional strings, analog synths, and epic cinematic drums."
    },
    fullDesc: {
      fr: "Enregistrée et masterisée au Cobra Audio Lab, cette bande-son offre une immersion sonore totale enregistrée en son spatial Dolby Atmos.",
      ar: "تم إنتاجها وتأليفها في استوديوهات كوبرا الصوتية لتعطي انطباعاً سينمائياً خيالياً.",
      en: "Composed and spatialized in Dolby Atmos at Cobra Audio Lab for epic film trailers and game climaxes."
    },
    tags: ["Orchestral", "Cyberpunk Synth", "Dolby Atmos", "Game Music", "Sound Design"],
    audioTrack: {
      title: "Theme of Cobra Dynasty (Epic Theme)",
      artist: "Cobra Sound Team feat. Rayan Ouarab",
      duration: "03:42"
    }
  },
  {
    id: "cobra-recherche-cinematic",
    title: {
      fr: "Cinématique 3D 'The Dawn of Cybernetics'",
      ar: "عرض سينمائي ثلاثي الأبعاد 'فجر السيبرانية'",
      en: "'The Dawn of Cybernetics' 3D Film Trailer"
    },
    pillarId: "film",
    clientOrProject: "Film & VFX Division",
    year: "2026",
    image: filmImg,
    shortDesc: {
      fr: "Film court en 3D photoréaliste mettant en scène des androïdes et des villes futuristes avec effets volumétriques.",
      ar: "فيلم قصير ثلاثي الأبعاد فائق الدقة يستعرض مدناً مستقبلية وروبوتات ذكية بمؤثرات خيالية.",
      en: "Photorealistic 3D short film depicting futuristic cybernetic cities and motion-captured character drama."
    },
    fullDesc: {
      fr: "Inspiré par le cinéma de science-fiction, ce film met en valeur notre maîtrise de la capture de mouvement et du rendu volumétrique.",
      ar: "فيلم يعبر عن دقة استوديو كوبرا في المونتاج والتقاط حركة الممثلين والمؤثرات البصرية.",
      en: "Showcasing our full cinematic pipeline including optical motion capture, facial rigging, and volumetric simulation."
    },
    tags: ["3D Animation", "MoCap", "Octane Render", "VFX", "8K Cinematic"],
    videoTrailer: {
      title: "Official Teaser 8K",
      duration: "01:45"
    },
    techSpecs: {
      engine: "Unreal / Octane",
      renderTech: "Volumetric FX"
    }
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: FOUNDER_NAME,
    role: {
      fr: "Fondateur & Directeur Créatif & Technique",
      ar: "المؤسس والمدير الإبداعي والتقني",
      en: "Founder & Creative / Tech Director"
    },
    bio: {
      fr: "Passionné par l'innovation logicielle, la création de jeux vidéo et le cinéma 3D. Rayan Ouarab dirige Follow Recherche Cobra Inter Activité avec l'ambition de repousser les limites de la créativité numérique.",
      ar: "مبتكر وشغوف بتطوير الألعاب والذكاء الاصطناعي والإنتاج السينمائي والموسيقي. يقود ريان وعراب الشركة لبناء حلول تكنولوجية وفنية غير مسبوقة.",
      en: "Visionary lead behind Cobra Inter Activité, dedicated to pushing the boundaries of AI, high-end gaming, symphonic sound design, and 3D film production."
    },
    avatar: heroImg,
    specialties: ["Game Architecture", "AI Algorithms", "Music Composition", "Cinematic Direction"]
  }
];
