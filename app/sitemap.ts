import { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { blogs } from '@/content/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vaibhavbharathula.tech';

  // Only include routes that genuinely exist as indexable pages
  const routes = [
    '',
    '/blog',
    '/labs',
    '/badges',
    '/resume',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Only include projects that have dedicated case-study pages in app/projects/
  const validProjectSlugs = ['cricsphere', 'nexus', 'aetherai', 'campuspulse-ai', 'brandrecognizer'];
  const projectRoutes = projects
    .filter((project) => validProjectSlugs.includes(project.slug))
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes, ...blogRoutes];
}

