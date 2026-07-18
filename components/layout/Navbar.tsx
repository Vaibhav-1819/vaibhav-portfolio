"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Command, Menu, X, Download } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close mobile menu on route change by adjusting state during rendering
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { name: "Projects", href: "/#projects" },
    { name: "Labs", href: "/labs" },
    { name: "Badges", href: "/badges" },
    { name: "Blog", href: "/blog" },
    { name: "Journey", href: "/#journey" },
    { name: "Experience", href: "/#experience" }
  ];

  return (
    <>
      {/* Top Navbar */}
      <motion.header
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 w-full"
      >
        <motion.nav 
          animate={{ 
            backgroundColor: (isScrolled || isMobileMenuOpen) ? "rgba(17, 17, 19, 0.85)" : "rgba(17, 17, 19, 0.5)",
            backdropFilter: "blur(12px)",
            borderColor: (isScrolled || isMobileMenuOpen) ? "rgba(39, 39, 42, 0.8)" : "rgba(39, 39, 42, 0.3)",
          }}
          className={`flex flex-col transition-all duration-500 w-full max-w-5xl border ${isMobileMenuOpen ? 'rounded-[2rem]' : 'rounded-full'} shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden`}
        >
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setIsMobileMenuOpen(false)}>
              <svg
                width="26" height="26" viewBox="0 0 32 32" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-500 group-hover:scale-110"
              >
                <defs>
                  <linearGradient id="bv-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                  </linearGradient>
                  <filter id="bv-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Diamond frame — rotated square */}
                <rect
                  x="3" y="3" width="18.5" height="18.5"
                  rx="2"
                  transform="rotate(45 16 16)"
                  stroke="url(#bv-grad)"
                  strokeWidth="1.4"
                  fill="none"
                  className="opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Bold B slash — thick diagonal */}
                <line x1="11" y1="21" x2="17" y2="11" stroke="url(#bv-grad)" strokeWidth="3" strokeLinecap="round" />

                {/* Thin V slash — lighter accent */}
                <line x1="16" y1="21" x2="22" y2="11" stroke="url(#bv-grad)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.75" />

                {/* Glow dot at intersection */}
                <circle cx="16" cy="16" r="1.8" fill="url(#bv-grad)" filter="url(#bv-glow)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </svg>

              <span className="font-heading font-bold tracking-[-0.02em] text-secondary text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                BV Workspace
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-mono text-muted hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link 
                href="/resume" 
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full text-xs font-mono font-bold tracking-widest transition-colors"
              >
                <Download size={14} /> RESUME
              </Link>
              
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-full border border-border text-muted cursor-pointer hover:border-primary/50 transition-colors">
                <Command size={14} />
                <span className="text-xs font-mono font-bold tracking-widest">K</span>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="flex md:hidden items-center justify-center p-2 rounded-full bg-surface/50 border border-border text-muted hover:text-primary hover:border-primary/50 transition-all active:scale-95"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden flex flex-col px-6"
              >
                <div className="w-full h-px bg-border/50 mb-4" />
                <div className="flex flex-col gap-4 pb-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-mono text-muted hover:text-primary transition-colors block w-full"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-4 mt-2 border-t border-border/50"
                  >
                    <Link 
                      href="/resume" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex justify-center items-center gap-1.5 w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl text-xs font-mono font-bold tracking-widest transition-colors active:scale-95"
                    >
                      <Download size={14} /> VIEW RESUME
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>
    </>
  );
}
