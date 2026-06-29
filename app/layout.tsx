import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { Navbar } from '@/components/ui/Navbar';
import { StatusBar } from '@/components/ui/StatusBar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Vaibhav Ram | Developer Workspace',
  description: 'Building intelligent software from ideas to deployment. Exploring machine learning, real-time systems, and beautiful interfaces.',
  keywords: ['Software Engineer', 'Machine Learning', 'React', 'Next.js', 'WebRTC', 'FastAPI'],
  openGraph: {
    title: 'Vaibhav Ram | Developer Workspace',
    description: 'Building intelligent software from ideas to deployment.',
    url: 'https://vaibhav-bharathula.com',
    siteName: 'Vaibhav Ram Workspace',
    type: 'website',
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
        <StatusBar />
      </body>
    </html>
  );
}
