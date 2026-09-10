import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { PersonJsonLd } from '@/components/seo/JsonLd';
import dynamic from 'next/dynamic';
import './globals.css';

const CursorGlow = dynamic(() => import('@/components/ui/CursorGlow').then(mod => mod.CursorGlow));
const PortfolioAssistant = dynamic(() => import('@/components/ui/PortfolioAssistant').then(mod => mod.PortfolioAssistant));

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://vaibhavbharathula.tech'),
  title: {
    default: 'Vaibhav Bharathula | Full-Stack & Machine Learning Developer',
    template: '%s | Vaibhav Bharathula',
  },
  description:
    'Full-stack and machine learning developer building intelligent software, real-time architectures, and predictive systems from ideas to production.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/',
  },
  keywords: [
    'Vaibhav Bharathula',
    'Vaibhav Ram',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'Next.js 14',
    'React',
    'TypeScript',
    'Python',
    'Java',
    'FastAPI',
    'Real-Time Systems',
    'AI Systems',
    'Sports Analytics',
  ],
  authors: [{ name: 'Bharathula Venkata Vaibhav Ram', url: 'https://vaibhavbharathula.tech' }],
  creator: 'Bharathula Venkata Vaibhav Ram',
  publisher: 'Bharathula Venkata Vaibhav Ram',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Vaibhav Bharathula | Full-Stack & Machine Learning Developer',
    description:
      'Full-stack and machine learning developer building intelligent software, real-time architectures, and predictive systems.',
    url: 'https://vaibhavbharathula.tech',
    siteName: 'Vaibhav Bharathula Workspace',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/cricsphere_landing.webp',
        width: 1200,
        height: 630,
        alt: 'Vaibhav Bharathula — Developer Workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Bharathula | Full-Stack & Machine Learning Developer',
    description:
      'Full-stack and machine learning developer building intelligent software, real-time architectures, and predictive systems.',
    images: ['/images/cricsphere_landing.webp'],
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
        <PersonJsonLd />
        <Navbar />
        <CursorGlow />
        <PortfolioAssistant />
        {children}
      </body>
    </html>
  );
}
