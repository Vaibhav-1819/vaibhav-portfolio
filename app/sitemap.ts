import { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { blogs } from '@/content/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vaibhav-portfolio-v2.vercel.app'; // Replace with actual domain later

  const routes = [
    '',
    '/projects',
    '/blog',
    '/resume',
    '/labs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes, ...blogRoutes];
}
