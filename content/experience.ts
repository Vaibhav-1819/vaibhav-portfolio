import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    company: 'Central Institute of Tool Design (CITD)',
    role: 'Deep Learning Intern',
    period: 'May 2025',
    description: [
      'Built an EfficientNet-based CNN classifier trained on 11,000+ images across 50 classes.',
      'Achieved ~80% accuracy using transfer learning and data augmentation.',
      'Designed preprocessing pipelines and evaluation workflows for model optimization.'
    ],
    skills: ['Python', 'TensorFlow', 'Deep Learning', 'CNNs']
  },
  {
    company: 'Swecha.org',
    role: 'AI Creators Program Intern',
    period: 'Aug 2024',
    description: [
      'Contributed to Telugu language AI initiatives through dataset collection and NLP workflows.',
      'Explored LLM, tokenization, and NLP model development concepts.',
      'Worked with Text-to-Speech and Voice Avatar technologies.'
    ],
    skills: ['Python', 'NLP', 'LLMs', 'Data Collection']
  }
];
