"use client";

import { motion, useScroll } from "framer-motion";
import { Command, Search, Home, FolderKanban, Sparkles, Map, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const desktopNavLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Highlights", href: "#highlights" },
    { name: "Experiments", href: "#experiments" },
    { name: "Journey", href: "#journey" },
    { name: "Experience", href: "#experience" }
  ];

  const mobileNavLinks = [
    { name: "Workspace", icon: Home, href: "#hero" },
    { name: "Projects", icon: FolderKanban, href: "#projects" },
    { name: "Experiments", icon: Sparkles, href: "#experiments" },
    { name: "Journey", icon: Map, href: "#journey" },
    { name: "Menu", icon: Menu, href: "#footer" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <motion.header
        className={`fixed top-0 md:top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center md:px-6 w-full`}
      >
        <motion.nav 
          animate={{ 
            backgroundColor: isScrolled ? "rgba(17, 17, 19, 0.7)" : "rgba(17, 17, 19, 0)",
            backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
            borderColor: isScrolled ? "rgba(39, 39, 42, 0.5)" : "rgba(39, 39, 42, 0)",
          }}
          className="flex items-center justify-between px-6 py-4 md:py-3 md:rounded-full border-b md:border transition-all duration-500 w-full max-w-5xl"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold tracking-[-0.02em] text-secondary text-sm md:text-base">
              BV Workspace
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {desktopNavLinks.map(link => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-mono text-muted hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Resume */}
            <a 
              href="/docs/Resume_Vaibhav_Ram.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full text-xs font-mono font-bold tracking-widest transition-colors"
            >
              RESUME
            </a>
            
            {/* Desktop Command K */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-full border border-border text-muted">
              <Command size={14} />
              <span className="text-xs font-mono font-bold tracking-widest">K</span>
            </div>

            {/* Mobile Search Icon */}
            <div className="flex md:hidden items-center justify-center p-2 rounded-full bg-surface/50 border border-border text-muted hover:text-primary transition-colors">
              <Search size={18} />
            </div>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
        <div className="flex items-center justify-between px-2 py-3 bg-surface/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl pointer-events-auto">
          {mobileNavLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-col items-center gap-1 w-16 text-muted hover:text-primary transition-colors active:scale-95"
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-mono tracking-wider">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Mobile Sticky CTA (Floating Resume) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 20 }}
        className="md:hidden fixed bottom-24 right-4 z-40 pointer-events-none"
      >
        <a 
          href="/docs/Resume_Vaibhav_Ram.pdf" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-bold text-sm tracking-wide rounded-full shadow-[0_0_20px_rgba(var(--color-primary),0.3)] pointer-events-auto active:scale-95 transition-transform"
        >
          Resume
        </a>
      </motion.div>
    </>
  );
}
