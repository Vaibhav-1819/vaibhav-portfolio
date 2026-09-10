import { Metadata } from 'next';
import { blogs, archivedBlogs } from '@/content/blogs';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://vaibhavbharathula.tech';

export function getBlogMetadata(slug: string): Metadata {
  const post = blogs.find((b) => b.slug === slug) || archivedBlogs?.find((b) => b.slug === slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Vaibhav Bharathula',
      description: 'The requested blog post could not be found.',
    };
  }

  // Construct the dynamic OG image URL
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}&category=${encodeURIComponent(post.category)}`;

  return {
    title: `${post.title} | Vaibhav Bharathula`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: 'Vaibhav Bharathula', url: BASE_URL }],
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Vaibhav Bharathula'],
      url: `${BASE_URL}/blog/${slug}`,
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
      images: [ogImageUrl],
    },
  };
}

