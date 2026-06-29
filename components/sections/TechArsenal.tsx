"use client";

import { motion, AnimatePresence } from "framer-motion";
import { techArsenal } from "@/content/tech";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function TechArsenal() {
  const categories = Array.from(new Set(techArsenal.map(t => t.category)));

  return (
    <section className="py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary">
            Tech Arsenal
          </h2>
          <p className="text-muted mt-4">The tools I use to build robust and scalable systems.</p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category, i) => (
            <TechCategoryCard key={category} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCategoryCard({ category, index }: { category: string, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const items = techArsenal.filter(t => t.category === category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-surface/20 border border-border/50 rounded-2xl md:rounded-3xl hover:bg-surface/40 transition-colors"
    >
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 md:p-8 cursor-pointer md:cursor-default"
      >
        <h3 className="text-lg md:text-xl font-heading font-bold text-secondary flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-sm" />
          {category}
        </h3>
        <ChevronDown size={18} className={`md:hidden text-muted transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {(isExpanded || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:!h-auto md:!opacity-100 px-6 pb-6 md:px-8 md:pt-0"
          >
            <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
              {items.map((item) => (
                <span 
                  key={item.name}
                  className="px-3 py-1.5 bg-background border border-border/50 rounded-lg text-[10px] md:text-sm text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
