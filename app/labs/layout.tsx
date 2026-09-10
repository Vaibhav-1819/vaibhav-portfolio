import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Labs & Interactive Sandboxes | Vaibhav Bharathula',
  description:
    'Interactive machine learning models, cricket win-probability calculators, incident correlation simulators, and telemetry experiments.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/labs',
  },
  openGraph: {
    title: 'Engineering Labs & Interactive Sandboxes | Vaibhav Bharathula',
    description:
      'Interactive machine learning models, telemetry experiments, and algorithm sandboxes.',
    url: 'https://vaibhavbharathula.tech/labs',
    type: 'website',
  },
};

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
