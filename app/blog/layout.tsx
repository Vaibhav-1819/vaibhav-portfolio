import { BlogLayoutClient } from '@/components/layout/BlogLayoutClient';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlogLayoutClient>
      {children}
    </BlogLayoutClient>
  );
}
