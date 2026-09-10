export function PersonJsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://vaibhavbharathula.tech/#person',
        name: 'Bharathula Venkata Vaibhav Ram',
        alternateName: ['Vaibhav Ram', 'Vaibhav Bharathula'],
        url: 'https://vaibhavbharathula.tech',
        image: 'https://vaibhavbharathula.tech/images/cricsphere_landing.webp',
        jobTitle: 'Full-Stack Developer & Machine Learning Engineer',
        description:
          'Full-stack and machine learning developer building intelligent software, real-time architectures, and predictive systems from ideas to production.',
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Institute of Aeronautical Engineering (IARE)',
          url: 'https://www.iare.ac.in',
        },
        sameAs: [
          'https://github.com/Vaibhav-1819',
          'https://linkedin.com/in/vaibhav-bharathula',
        ],
        knowsAbout: [
          'Full-Stack Web Development',
          'Machine Learning',
          'Deep Learning',
          'Next.js',
          'React',
          'TypeScript',
          'Python',
          'Java',
          'FastAPI',
          'Node.js',
          'Real-Time Systems',
          'Predictive Modeling',
          'Convolutional Neural Networks',
          'Computer Vision',
          'Sports Analytics',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://vaibhavbharathula.tech/#website',
        url: 'https://vaibhavbharathula.tech',
        name: 'Vaibhav Bharathula | Developer Workspace',
        description:
          'Developer workspace, machine learning projects, real-time architectures, and technical writings by Vaibhav Bharathula.',
        publisher: {
          '@id': 'https://vaibhavbharathula.tech/#person',
        },
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

export function ProjectJsonLd({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem = 'Web',
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
}) {
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    author: {
      '@id': 'https://vaibhavbharathula.tech/#person',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
    />
  );
}
