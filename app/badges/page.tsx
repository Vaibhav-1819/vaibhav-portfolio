import { Metadata } from 'next';
import BadgesClient from './BadgesClient';

export const metadata: Metadata = {
  title: 'Digital Credentials & Certifications | Vaibhav Bharathula',
  description:
    'A verified collection of professional certifications, cloud accreditations, and technical achievements from Qualcomm, Oracle, IBM SkillsBuild, and AWS.',
  alternates: {
    canonical: 'https://vaibhavbharathula.tech/badges',
  },
  openGraph: {
    title: 'Digital Credentials & Certifications | Vaibhav Bharathula',
    description:
      'Verified certifications and technical accreditations from Qualcomm, Oracle, IBM SkillsBuild, and AWS.',
    url: 'https://vaibhavbharathula.tech/badges',
    type: 'website',
  },
};

export default function BadgesPage() {
  return <BadgesClient />;
}

