export type Language = 'fr' | 'ar' | 'en';

export type PillarId = 'programming' | 'game' | 'music' | 'film';

export interface PillarInfo {
  id: PillarId;
  title: Record<Language, string>;
  slogan: Record<Language, string>;
  shortDesc: Record<Language, string>;
  fullDesc: Record<Language, string>;
  icon: string;
  image: string;
  keyCapabilities: Record<Language, string[]>;
  badgeText: Record<Language, string>;
}

export interface PortfolioItem {
  id: string;
  title: Record<Language, string>;
  pillarId: PillarId;
  clientOrProject: string;
  year: string;
  image: string;
  shortDesc: Record<Language, string>;
  fullDesc: Record<Language, string>;
  tags: string[];
  audioTrack?: {
    title: string;
    artist: string;
    duration: string;
    audioUrl?: string; // Web Audio synth fallback supported
  };
  videoTrailer?: {
    title: string;
    duration: string;
  };
  techSpecs?: {
    engine?: string;
    language?: string;
    aiModel?: string;
    renderTech?: string;
  };
}

export interface TeamMember {
  name: string;
  role: Record<Language, string>;
  bio: Record<Language, string>;
  avatar: string;
  specialties: string[];
}

export interface AiPhasePlan {
  phase: string;
  duration: string;
  details: string;
}

export interface AiProposalData {
  title: string;
  tagline: string;
  executiveSummary: string;
  pillarsInvolved: string[];
  technicalArchitecture: string[];
  creativeHighlights: string[];
  musicSoundConcept: string;
  estimatedTimeline: string;
  recommendedPhasePlan: AiPhasePlan[];
}

export interface QuoteFormData {
  selectedPillars: PillarId[];
  timeline: string;
  budgetRange: string;
  projectName: string;
  clientName: string;
  email: string;
  phone: string;
  description: string;
}
