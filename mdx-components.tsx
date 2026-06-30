import type { MDXComponents } from 'mdx/types'
 
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Mermaid from '@/components/ui/Mermaid';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <main id="top" className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto font-mono relative">
        <div className="absolute top-24 left-0 xl:-left-32 z-50">
          <Link 
            href="/blog" 
            className="flex items-center gap-2 px-4 py-2 bg-surface/50 hover:bg-surface border border-border rounded-full text-sm font-mono text-muted hover:text-secondary transition-all backdrop-blur-md"
          >
            <ArrowLeft size={16} />
            <span>All Blogs</span>
          </Link>
        </div>
        {children}
        <div className="mt-20 pt-8 border-t border-border/50 text-center">
          <a href="#top" className="text-muted hover:text-primary transition-colors text-sm flex items-center justify-center gap-2 w-fit mx-auto cursor-pointer">
            ↑ Back to top
          </a>
        </div>
      </main>
    ),
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary tracking-tight mb-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-heading font-bold text-secondary mt-12 mb-4 border-b border-border/50 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-heading font-bold text-secondary mt-8 mb-4">{children}</h3>,
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
