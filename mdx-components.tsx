import type { MDXComponents } from 'mdx/types'
 
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const Mermaid = dynamic(() => import('@/components/ui/Mermaid'));
const AetherAIDemo = dynamic(() => import('@/components/ui/AetherAIDemo').then(m => m.AetherAIDemo));

const extractText = (children: any): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (typeof children === 'object' && children !== null && children.props && children.props.children) {
    return extractText(children.props.children);
  }
  return '';
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    AetherAIDemo,
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary tracking-tight mb-8">{children}</h1>,
    h2: ({ children }) => {
      const text = extractText(children);
      const id = text ? text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '';
      return <h2 id={id} className="text-2xl font-heading font-bold text-secondary mt-12 mb-4 border-b border-border/50 pb-2 scroll-mt-32">{children}</h2>;
    },
    h3: ({ children }) => {
      const text = extractText(children);
      const id = text ? text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : '';
      return <h3 id={id} className="text-xl font-heading font-bold text-secondary mt-8 mb-4 scroll-mt-32">{children}</h3>;
    },
    img: (props) => (
      <span className="block relative w-full my-8 rounded-xl overflow-hidden border border-border/50 shadow-md bg-surface/30">
        <Image
          src={props.src as string}
          alt={props.alt || ''}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ width: '100%', height: 'auto' }}
          className="object-contain"
        />
      </span>
    ),
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
