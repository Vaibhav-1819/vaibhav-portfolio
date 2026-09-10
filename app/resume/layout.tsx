import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume & Engineering Profiles | Vaibhav Bharathula',
  description:
    'Curated resumes for Vaibhav Bharathula specializing in Java Enterprise / Backend Engineering and Machine Learning / Deep Learning Pipelines.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/resume',
  },
  openGraph: {
    title: 'Resume & Engineering Profiles | Vaibhav Bharathula',
    description:
      'Curated resumes specializing in Java Enterprise Backend Engineering and Machine Learning Systems.',
    url: 'https://vaibhavbharathula.tech/resume',
    type: 'website',
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
