export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  category: 'design' | 'engineering' | 'business' | 'case-study';
  tags?: string[];
  featured?: boolean;
  image?: string;
}

export interface ProjectCard {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
  date?: string;
  githubUrl?: string;
  demoUrl?: string;
  techStackDepth?: 'frontend' | 'backend' | 'fullstack';
}

export interface CaseStudy {
  title: string;
  slug: string;
  headline: string;
  body: string;
  image: string;
  client?: string;
  role: string;
  timeline: string;
  impact?: string;
  tools: string[];
  featured?: boolean;
  publishedAt: string;
}

export interface TechnicalCaseStudy extends CaseStudy {
  course?: string;
  codeRepositoryUrl: string;
  architectureDiagrams?: Array<{ title: string; image: string }>;
  codeSnippets?: Array<{ title: string; language: string; code: string }>;
  metrics?: string;
}

export interface LeadCaptureForm {
  name: string;
  email: string;
  message: string;
  projectType?: 'design' | 'development' | 'both' | 'consulting';
  budget?: '$5k-$25k' | '$25k-$50k' | '$50k+' | 'other';
  timeline?: 'asap' | '1-3 months' | '3-6 months' | 'no deadline';
  website?: string;
}

export interface QualifiedLead extends LeadCaptureForm {
  id: string;
  createdAt: string;
  qualified: boolean;
}
