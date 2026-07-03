import type { MDXComponents } from 'mdx/types'
 
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Mermaid from '@/components/ui/Mermaid';
import { AetherAIDemo } from '@/components/ui/AetherAIDemo';
import { BlogLayoutClient } from '@/components/layout/BlogLayoutClient';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    AetherAIDemo,
    wrapper: ({ children }) => (
      <BlogLayoutClient>
        {children}
      </BlogLayoutClient>
    ),
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary tracking-tight mb-8">{children}</h1>,
    h2: ({ children }) => {
      const id = typeof children === 'string' ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '';
      return <h2 id={id} className="text-2xl font-heading font-bold text-secondary mt-12 mb-4 border-b border-border/50 pb-2 scroll-mt-32">{children}</h2>;
    },
    h3: ({ children }) => {
      const id = typeof children === 'string' ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '';
      return <h3 id={id} className="text-xl font-heading font-bold text-secondary mt-8 mb-4 scroll-mt-32">{children}</h3>;
    },
    p: ({ children }) => <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">{children}</p>,
    a: ({ href, children }) => <a href={href} className="text-primary hover:underline underline-offset-4">{children}</a>,
    ul: ({ children }) => <ul className="list-disc list-outside ml-5 text-muted mb-6 space-y-2 text-sm md:text-base">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-outside ml-5 text-muted mb-6 space-y-2 text-sm md:text-base">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    pre: ({ children, ...props }: any) => {
      // If the child is a code block with language-mermaid, just return the child directly
      if (children?.props?.className === 'language-mermaid') {
        return <>{children}</>;
      }
      return <pre className="bg-surface/50 backdrop-blur-md border border-border/50 rounded-xl p-6 overflow-x-auto mb-8 text-sm shadow-inner" {...props}>{children}</pre>;
    },
    code: ({ className, children, ...props }: any) => {
      if (className === 'language-mermaid') {
        return <Mermaid chart={children as string} />;
      }
      return <code className={`bg-surface border border-border/50 px-1.5 py-0.5 rounded-md text-primary font-mono text-[0.85em] ${className || ''}`} {...props}>{children}</code>;
    },
    hr: () => <hr className="border-border/50 my-12" />,
    ...components,
  }
}
