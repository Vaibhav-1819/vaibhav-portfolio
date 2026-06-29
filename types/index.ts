export type Project = {
  title: string;
  slug: string;
  description: string;
  github?: string;
  demo?: string;
  technologies: string[];
  image?: string;
  metrics?: { label: string; value: string }[];
  featured: boolean;
  year: number;
  status: 'Online' | 'Offline' | 'In Progress' | 'Archived';
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
};

export type TechItem = {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Database' | 'Tools';
};

export type HeroContent = {
  headline: string;
  philosophy: string;
  roles: string[];
};
