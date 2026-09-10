import type { Metadata } from 'next';
import { ProjectJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'CricSphere — Cricket Analytics & ML Prediction Engine',
  description:
    'Full-stack cricket intelligence platform with live match data, LightGBM win probability modeling, and historical PvP analytics across 22,000+ matches.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/projects/cricsphere',
  },
  openGraph: {
    title: 'CricSphere — Cricket Analytics & ML Prediction Engine | Vaibhav Bharathula',
    description:
      'Full-stack cricket intelligence platform with live match data and LightGBM win probability modeling.',
    url: 'https://vaibhavbharathula.tech/projects/cricsphere',
    type: 'website',
    images: ['/images/cricsphere_landing.webp'],
  },
};

export default function CricSphereLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectJsonLd
        name="CricSphere"
        description="Full-stack cricket intelligence platform with live match data, LightGBM win probability modeling, and historical PvP analytics."
        url="https://vaibhavbharathula.tech/projects/cricsphere"
        applicationCategory="SportsApplication"
      />
      {children}
    </>
  );
}
