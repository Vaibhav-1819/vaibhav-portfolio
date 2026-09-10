import type { Metadata } from 'next';
import { ProjectJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Nexus — AI-Native Real-Time Collaboration OS',
  description:
    'Enterprise-grade collaboration platform combining HD video meetings, persistent channels, Liveblocks CRDT multiplayer canvases, and Gemini semantic search.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/projects/nexus',
  },
  openGraph: {
    title: 'Nexus — AI-Native Real-Time Collaboration OS | Vaibhav Bharathula',
    description:
      'Enterprise collaboration workspace with real-time video, Liveblocks CRDT canvases, and localized Gemini AI context engines.',
    url: 'https://vaibhavbharathula.tech/projects/nexus',
    type: 'website',
    images: ['/images/nexus.webp'],
  },
};

export default function NexusLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectJsonLd
        name="Nexus"
        description="Enterprise-grade collaboration platform combining HD video meetings, persistent channels, Liveblocks CRDT multiplayer canvases, and Gemini semantic search."
        url="https://vaibhavbharathula.tech/projects/nexus"
        applicationCategory="BusinessApplication"
      />
      {children}
    </>
  );
}
