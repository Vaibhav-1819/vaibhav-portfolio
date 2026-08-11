import { Metadata } from 'next';
import { blogs } from '@/content/blogs';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://vaibhav-bharathula.tech';

export function getBlogMetadata(slug: string): Metadata {
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Vaibhav Ram',
      description: 'The requested blog post could not be found.',
    };
  }

  // Construct the dynamic OG image URL
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}&category=${encodeURIComponent(post.category)}`;

  return {
    title: `${post.title} | Vaibhav Ram`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: 'Vaibhav Bharathula' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Vaibhav Bharathula'],
      url: `${BASE_URL}/blog/${slug}`, // Note: update to match exact routing if needed
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@vaibhav_ram',
      images: [ogImageUrl],
    },
  };
}
