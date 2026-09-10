import type { Metadata } from 'next';
import { ProjectJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'AetherAI — Real-Time Environmental Forecasting & AQI Platform',
  description:
    'Localized air quality monitoring and forecasting pipeline built with Python, FastAPI, XGBoost (94.2% confidence), and Google Gemini natural language summaries.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/projects/aetherai',
  },
  openGraph: {
    title: 'AetherAI — Real-Time Environmental Forecasting & AQI Platform | Vaibhav Bharathula',
    description:
      'Air quality forecasting engine combining FastAPI, XGBoost inference, and Gemini natural language intelligence.',
    url: 'https://vaibhavbharathula.tech/projects/aetherai',
    type: 'website',
    images: ['/images/aetherai_home.webp'],
  },
};

export default function AetherAILayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectJsonLd
        name="AetherAI"
        description="Localized air quality forecasting platform combining FastAPI, XGBoost inference, and Gemini natural language intelligence."
        url="https://vaibhavbharathula.tech/projects/aetherai"
        applicationCategory="UtilityApplication"
      />
      {children}
    </>
  );
}
