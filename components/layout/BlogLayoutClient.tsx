"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export function BlogLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isIndex = pathname === "/blog";
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (isIndex) {
      setHeadings([]);
      return;
    }

    const updateTOC = () => {
      const elements = Array.from(document.querySelectorAll("main h2, main h3"));
      if (elements.length === 0) return;

      const items: TOCItem[] = elements.map((elem) => ({
        id: elem.id,
        title: elem.textContent?.replace(/^[\d.]+\s*/, '') || "",
        level: elem.tagName === "H2" ? 2 : 3,
      })).filter(item => item.id);
      
      setHeadings(prev => {
        if (prev.length === items.length && prev.every((p, i) => p.id === items[i].id)) {
          return prev;
        }
        return items;
      });
      
      handleScroll();
    };

    const handleScroll = () => {
      const elements = Array.from(document.querySelectorAll("main h2, main h3"));
      let currentActive = "";
      for (const elem of elements) {
        const rect = elem.getBoundingClientRect();
        if (rect.top <= 150) {
          currentActive = elem.id;
        }
      }
      if (currentActive) {
        setActiveId(currentActive);
      }
    };

    const observer = new MutationObserver(updateTOC);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    updateTOC();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isIndex]);

  if (isIndex) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* 
        The top navigation bar is fixed. We wrap it in a max-w to keep it aligned with the content 
      */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-[90rem] mx-auto w-full flex justify-between items-center px-0 lg:px-6">
          <Link href="/blog" className="flex items-center gap-2 text-muted hover:text-primary transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm hidden sm:inline">All Blogs</span>
          </Link>
          <div className="flex items-center gap-6">
            {!isIndex && (
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted uppercase tracking-widest hidden sm:inline">Share</span>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="p-2 rounded-full hover:bg-surface text-muted hover:text-primary transition-colors"
                  title="Share on Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                </button>
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="p-2 rounded-full hover:bg-surface text-muted hover:text-primary transition-colors"
                  title="Share on LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </button>
              </div>
            )}
            <div className="font-heading font-bold text-lg tracking-tighter">Article</div>
          </div>
        </div>
      </nav>

      <div className="max-w-[90rem] mx-auto px-6 flex justify-center gap-16 relative">
        
        {/* Main Content (matches previous layout max width) */}
        <main id="top" className="min-h-screen pt-32 pb-24 max-w-3xl w-full font-mono relative">
          {children}
          
          <div className="mt-20 pt-8 border-t border-border/50 text-center">
            <a href="#top" className="text-muted hover:text-primary transition-colors text-sm flex items-center justify-center gap-2 w-fit mx-auto cursor-pointer">
              ↑ Back to top
            </a>
          </div>
        </main>

        {/* Floating Table of Contents (Desktop Only) */}
        {!isIndex && (
          <aside className="hidden lg:block w-64 shrink-0 relative py-32">
          <div className="sticky top-32">
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              On this page
            </h4>
            
            <div className="flex flex-col gap-3 border-l border-border/50 relative py-1">
              {headings.length === 0 && (
                <span className="text-xs text-muted pl-4">Loading sections...</span>
              )}
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`text-[13px] transition-colors relative pl-4 py-0.5 hover:text-primary ${
                    activeId === heading.id ? "text-primary font-bold" : "text-muted"
                  } ${heading.level === 3 ? "ml-4 text-[12px]" : ""}`}
                >
                  {/* Active Indicator line overlay */}
                  {activeId === heading.id && (
                    <motion.div 
                      layoutId="activeTOC"
                      className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="line-clamp-2">{heading.title}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
        )}

      </div>
    </div>
  );
}
