import type { Metadata } from 'next';
import { ProjectJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'BrandRecognizer — Deep Learning Car Brand Classifier',
  description:
    'Deep learning convolutional neural network (EfficientNetB0) trained on 11,000+ images across 50 car brands using transfer learning and dynamic data augmentation.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/projects/brandrecognizer',
  },
  openGraph: {
    title: 'BrandRecognizer — Deep Learning Car Brand Classifier | Vaibhav Bharathula',
    description:
      'Computer vision classification model trained on 11,000+ images with EfficientNetB0.',
    url: 'https://vaibhavbharathula.tech/projects/brandrecognizer',
    type: 'website',
  },
};

export default function BrandRecognizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectJsonLd
        name="BrandRecognizer"
        description="Deep learning image classifier trained on 11,000+ images to identify 50 car brands using EfficientNetB0."
        url="https://vaibhavbharathula.tech/projects/brandrecognizer"
        applicationCategory="MultimediaApplication"
      />
      {children}
    </>
  );
}
