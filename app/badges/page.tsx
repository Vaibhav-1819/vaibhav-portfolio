import { Metadata } from 'next';
import BadgesClient from './BadgesClient';

export const metadata: Metadata = {
  title: 'Digital Credentials & Badges | Vaibhav Ram',
  description: 'A verified collection of my continuous learning journey, professional certifications, and technical achievements.',
};

export default function BadgesPage() {
  return <BadgesClient />;
}
