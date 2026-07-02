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
    description: 'Built a real-time forecasting pipeline using XGBoost (94.2% confidence) and Gemini 1.5 Flash to translate predicted AQI into actionable, personalized health advice.',
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
    description: 'Trained an EfficientNetB0 model via transfer learning to classify 50 car brands from 11,000+ images, reaching ~80% accuracy with dynamic data augmentation.',
    technologies: ['Python', 'TensorFlow', 'EfficientNetB0'],
    featured: false,
    year: 2024,
    status: 'Archived'
  },
  {
    title: 'CrickIQ',
    slug: 'crickiq',
    description: 'A responsive cricket quiz platform with timers, categories, and score tracking, using session storage for state persistence.',
    technologies: ['React.js'],
    featured: false,
    year: 2023,
    status: 'Archived'
  }
];
