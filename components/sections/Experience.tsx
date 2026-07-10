"use client";

import { motion } from "framer-motion";
import { experiences } from "@/content/experience";
import { Briefcase } from "lucide-react";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 border-t border-border/50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Work</span> <span className="text-primary">Experience</span>
          </h2>
        </div>

        <div className="space-y-6 md:space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }: { exp: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface text-muted group-hover:text-primary group-hover:border-primary transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow mt-4 md:mt-0">
        <Briefcase size={16} />
      </div>
      
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-5 md:p-6 bg-surface/30 border border-border/50 rounded-2xl md:group-hover:border-primary/30 transition-colors cursor-pointer md:cursor-default"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-4 gap-2">
          <div>
            <h3 className="font-heading font-bold text-lg md:text-xl text-secondary">{exp.role}</h3>
            <p className="text-sm font-mono text-primary">{exp.company}</p>
          </div>
          <time className="text-xs font-mono text-muted px-3 py-1 bg-background rounded-full border border-border/50 self-start md:self-auto">
            {exp.period}
          </time>
        </div>

        {/* Mobile Accordion Toggle */}
        <div className="md:hidden flex items-center gap-2 text-xs font-mono text-muted mt-2">
          {isExpanded ? 'Show less' : 'Show details'}
          <ChevronDown size={14} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden md:!h-auto md:!opacity-100"
        >
          <ul className="space-y-3 mb-6 mt-4 md:mt-0">
            {exp.description.map((desc: string, j: number) => (
              <li key={j} className="text-sm text-muted flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                {desc}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill: string) => (
              <span key={skill} className="text-[10px] md:text-xs text-muted/80 bg-background px-2 py-1 rounded-md border border-border/50">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
