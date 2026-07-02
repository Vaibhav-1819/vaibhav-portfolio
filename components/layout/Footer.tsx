"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
export function Footer() {
  return (
    <footer className="w-full bg-background pt-16 pb-8 px-6 border-t border-border/50" id="footer">
      <div className="max-w-5xl mx-auto font-mono">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-surface/30 border border-border/50 text-sm md:text-base text-muted shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 bg-surface/80 border-b border-border/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 flex justify-center items-center gap-2 text-xs font-mono text-muted/60">
              <Terminal size={12} />
              <span>bash - workspace@vaibhav - 80x24</span>
            </div>
          </div>

          <div className="p-4 md:p-6 space-y-3">
            {/* Terminal Command */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-emerald-500 font-bold">workspace@vaibhav</span>
              <span className="text-secondary">:</span>
              <span className="text-primary font-bold">~</span>
              <span className="text-secondary">$</span>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="ml-2 text-secondary"
              >
                cat contact.txt
              </motion.span>
            </motion.div>

            {/* Terminal Output */}
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              whileInView={{ opacity: 1, height: "auto" }}
              viewport={{ once: true }}
              transition={{ delay: 1.8, duration: 0.4 }}
              className="space-y-3 pt-2 border-t border-border/30 overflow-hidden"
            >
              <div className="space-y-2">
                <p className="text-secondary font-bold uppercase tracking-widest text-xs md:text-sm">
                  End of Workspace
                </p>
                <p className="leading-relaxed break-words text-[13px] md:text-base">
                  Thanks for exploring my workspace.<br className="hidden md:block"/>
                  If you'd like to collaborate, build something together,<br className="hidden md:block"/>
                  or simply have a conversation, I'd love to hear from you.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-6 pt-4">
                <a href="https://github.com/Vaibhav-1819" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4 hover:decoration-primary">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/vaibhav-bharathula" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4 hover:decoration-primary">
                  LinkedIn
                </a>
                <Link href="/resume" className="text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4 hover:decoration-primary">
                  Resume
                </Link>
                <a href="mailto:bharathulavaibhav@gmail.com" className="text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4 hover:decoration-primary">
                  Email
                </a>
              </div>
            </motion.div>
            
            {/* Terminal Prompt */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.4 }}
              className="pt-2"
            >
              <span className="text-emerald-500 font-bold">workspace@vaibhav</span>
              <span className="text-secondary">:</span>
              <span className="text-primary font-bold">~</span>
              <span className="text-secondary">$</span>
              <span className="ml-2 text-secondary/80 animate-pulse">_</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
