import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <main className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto font-mono">
        {children}
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
    pre: ({ children }) => <pre className="bg-surface/50 backdrop-blur-md border border-border/50 rounded-xl p-6 overflow-x-auto mb-8 text-sm shadow-inner">{children}</pre>,
    code: ({ children }) => <code className="bg-surface border border-border/50 px-1.5 py-0.5 rounded-md text-primary font-mono text-[0.85em]">{children}</code>,
    hr: () => <hr className="border-border/50 my-12" />,
    ...components,
  }
}
