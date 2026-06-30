import { Project } from '@/types';

export const projects: Project[] = [
  {
    title: 'CricSphere',
    slug: 'cricsphere',
    description: 'The Ultimate Cricket Destination with AI-ML Powered Analytics. A comprehensive hub for live scores, schedules, and player statistics with real-time prediction engines.',
    github: 'https://github.com/Vaibhav-1819',
    demo: 'https://cricsphere-version1.vercel.app/',
    technologies: ['React', 'Node.js', 'Express.js', 'RapidAPI'],
    image: '/images/cricsphere_landing.webp',
    metrics: [
      { label: 'Matches', value: '22,000+' },
      { label: 'Models', value: '4' },
      { label: 'Datasets', value: '16' },
      { label: 'Matchups', value: '638K+' }
    ],
    featured: true,
    year: 2024,
    status: 'Online'
  },
  {
    title: 'Nexus',
    slug: 'nexus',
    description: 'Explored real-time collaboration by building an SFU-based platform using LiveKit and WebRTC. Features authentication and real-time chat alongside video layers.',
    github: 'https://github.com/Vaibhav-1819',
    technologies: ['React', 'Node.js', 'Socket.IO', 'Firebase', 'LiveKit'],
    image: '/images/nexus.webp',
    featured: true,
    year: 2024,
    status: 'In Progress'
  },
  {
    title: 'AetherAI',
    slug: 'aetherai',
    description: 'Bridged the gap between raw environmental data and actionable user insights by providing real-time, localized air quality forecasting.',
    github: 'https://github.com/Vaibhav-1819',
    technologies: ['React', 'FastAPI', 'XGBoost', 'Gemini', 'SQLite'],
    image: '/images/aetherai_1.webp',
    featured: true,
    year: 2024,
    status: 'Offline'
  },
  {
    title: 'BrandRecognizer',
    slug: 'brandrecognizer',
    description: 'Trained a deep learning model on 11,000+ images across 50 brands. Achieved ~80% accuracy using transfer learning and augmentation. Automated preprocessing and evaluation pipeline.',
    technologies: ['Python', 'TensorFlow', 'EfficientNetB0'],
    featured: false,
    year: 2024,
    status: 'Archived'
  },
  {
    title: 'CrickIQ',
    slug: 'crickiq',
    description: 'Developed a responsive quiz platform with timers, categories, and scoring system. Implemented session storage for state persistence and designed an engaging, user-friendly UI.',
    technologies: ['React.js'],
    featured: false,
    year: 2023,
    status: 'Archived'
  }
];
