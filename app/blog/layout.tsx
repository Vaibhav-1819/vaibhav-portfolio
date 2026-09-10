import type { Metadata } from 'next';
import { BlogLayoutClient } from '@/components/layout/BlogLayoutClient';

export const metadata: Metadata = {
  title: 'Technical Writings & Systems Architecture | Vaibhav Bharathula',
  description:
    'Deep dives, systems architectures, machine learning engineering reports, and real-time protocol breakdowns by Vaibhav Bharathula.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/blog',
  },
  openGraph: {
    title: 'Technical Writings & Systems Architecture | Vaibhav Bharathula',
    description:
      'Deep dives, systems architectures, and machine learning engineering reports by Vaibhav Bharathula.',
    url: 'https://vaibhavbharathula.tech/blog',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlogLayoutClient>
      {children}
    </BlogLayoutClient>
  );
}

