import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import dynamic from 'next/dynamic';
import './globals.css';

const CursorGlow = dynamic(() => import('@/components/ui/CursorGlow').then(mod => mod.CursorGlow));
const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette').then(mod => mod.CommandPalette));

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://vaibhav-bharathula.com'),
  title: 'Vaibhav Ram | Developer Workspace',
  description: 'Building intelligent software from ideas to deployment. Exploring machine learning, real-time systems, and beautiful interfaces.',
  keywords: ['Software Engineer', 'Machine Learning', 'React', 'Next.js', 'WebRTC', 'FastAPI', 'AI Engineer', 'Full Stack Developer'],
  authors: [{ name: 'Bharathula Venkata Vaibhav Ram', url: 'https://vaibhav-bharathula.com' }],
  openGraph: {
    title: 'Vaibhav Ram | Developer Workspace',
    description: 'Building intelligent software from ideas to deployment. Exploring ML, real-time systems, and modern interfaces.',
    url: 'https://vaibhav-bharathula.com',
    siteName: 'Vaibhav Ram Workspace',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/cricsphere_landing.webp',
        width: 1200,
        height: 630,
        alt: 'Vaibhav Ram — Developer Workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Ram | Developer Workspace',
    description: 'Building intelligent software from ideas to deployment. ML · Real-Time Systems · Full-Stack.',
    images: ['/images/cricsphere_landing.webp'],
    creator: '@vaibhav_ram',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-secondary selection:bg-primary/30 relative`}
      >
        <Navbar />
        <CursorGlow />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
