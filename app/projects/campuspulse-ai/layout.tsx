import type { Metadata } from 'next';
import { ProjectJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'CampusPulse AI — Incident Intelligence & Correlation Engine',
  description:
    'Explainable real-time incident intelligence platform built for the IBM SkillsBuild project submission. Correlates unstructured student complaints across space, time, semantics, and category using Gemini 1.5 Flash.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/projects/campuspulse-ai',
  },
  openGraph: {
    title: 'CampusPulse AI — Incident Intelligence & Correlation Engine | Vaibhav Bharathula',
    description:
      'Explainable real-time incident intelligence platform featuring a 4-factor correlation engine and dual-tier Gemini AI.',
    url: 'https://vaibhavbharathula.tech/projects/campuspulse-ai',
    type: 'website',
    images: ['/images/campuspulse_landing.png'],
  },
};

export default function CampusPulseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectJsonLd
        name="CampusPulse AI"
        description="Explainable incident intelligence platform with 4-factor deterministic correlation engine and dual-tier Gemini AI."
        url="https://vaibhavbharathula.tech/projects/campuspulse-ai"
        applicationCategory="BusinessApplication"
      />
      {children}
    </>
  );
}
