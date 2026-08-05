"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Cpu, Mic } from "lucide-react";
import { experiences } from "@/content/experience";

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Map custom details to experiences for rich visual layout
  const mappedExperiences = experiences.map((exp) => {
    let icon = Briefcase;
    let color = "from-primary/10";
    let metricValue = "";
    let metricLabel = "";

    if (exp.company.includes("Central Institute")) {
      icon = Cpu;
      color = "from-secondary/10";
      metricValue = "11K+";
      metricLabel = "Images Classified";
    } else if (exp.company.includes("Swecha")) {
      icon = Mic;
      color = "from-accent/10";
      metricValue = "NLP";
      metricLabel = "Voice Curation";
    }

    return {
      ...exp,
      icon,
      color,
      metricValue,
      metricLabel
    };
  });

  return (
    <section id="experience" className="py-32 border-t border-border/50 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Work</span> <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted font-mono text-sm leading-relaxed max-w-xl">
            My professional career internships, contributions, and industry highlights.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Scroll-linked vertical timeline line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border/30 -translate-x-1/2 pointer-events-none" />
          
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-emerald-400 origin-top -translate-x-1/2 pointer-events-none shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            style={{ scaleY }}
          />

          <div className="space-y-20 relative z-10">
            {mappedExperiences.map((exp, i) => {
              const Icon = exp.icon;
              const isEven = i % 2 === 0;

              return (
                <div 
                  key={exp.company} 
                  className="flex flex-col md:flex-row items-stretch gap-8 relative w-full"
                >
                  {/* Glowing Node Point on the line */}
                  <div className="absolute left-[20px] md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className="w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-lg shadow-background group-hover:border-primary transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </motion.div>
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping -z-10" />
                  </div>

                  {/* Left Column (Contains Card on desktop if Even, hidden on mobile) */}
                  <div className="hidden md:flex w-1/2 pr-12 justify-end items-center">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative w-full max-w-[500px] p-6 rounded-3xl bg-surface/30 border border-border/50 backdrop-blur-md hover:border-primary/40 hover:bg-surface/50 transition-all duration-300 group overflow-hidden text-right font-mono"
                      >
                        <div className={`absolute -left-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${exp.color} to-transparent blur-3xl opacity-50`} />
                        <div className="flex flex-col mb-4 items-end font-sans">
                          <time className="text-xs font-mono text-muted px-3 py-1 bg-background rounded-full border border-border/50 mb-2">
                            {exp.period}
                          </time>
                          <h3 className="text-xl font-heading font-bold text-secondary">{exp.role}</h3>
                          <p className="text-sm font-mono text-primary mt-1 font-bold">{exp.company}</p>
                        </div>
                        
                        <ul className="space-y-3 mb-6 text-xs text-muted flex flex-col items-end leading-relaxed">
                          {exp.description.map((desc: string, j: number) => (
                            <li key={j} className="flex items-start justify-end gap-2 text-right">
                              {desc}
                              <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-row-reverse items-center justify-between gap-4 border-t border-border/20 pt-4">
                          {exp.metricValue && (
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Metrics</span>
                              <span className="text-sm font-mono font-bold text-secondary mt-1">
                                {exp.metricValue} <span className="text-[10px] text-muted font-normal">{exp.metricLabel}</span>
                              </span>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1.5 justify-end">
                            {exp.skills.map((skill: string) => (
                              <span key={skill} className="px-2.5 py-1 rounded-md text-[9px] font-mono bg-background border border-border/50 text-secondary">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column (Contains Card on desktop if Odd, contains Card on mobile ALWAYS) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-12 flex items-center font-mono">
                    <div className="w-full max-w-[500px]">
                      {/* Desktop Card (Odd only) */}
                      <div className="hidden md:block">
                        {!isEven && (
                          <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative w-full p-6 rounded-3xl bg-surface/30 border border-border/50 backdrop-blur-md hover:border-primary/40 hover:bg-surface/50 transition-all duration-300 group overflow-hidden text-left"
                          >
                            <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${exp.color} to-transparent blur-3xl opacity-50`} />
                            <div className="flex flex-col mb-4 items-start font-sans">
                              <time className="text-xs font-mono text-muted px-3 py-1 bg-background rounded-full border border-border/50 mb-2">
                                {exp.period}
                              </time>
                              <h3 className="text-xl font-heading font-bold text-secondary">{exp.role}</h3>
                              <p className="text-sm font-mono text-primary mt-1 font-bold">{exp.company}</p>
                            </div>
                            
                            <ul className="space-y-3 mb-6 text-xs text-muted flex flex-col items-start leading-relaxed">
                              {exp.description.map((desc: string, j: number) => (
                                <li key={j} className="flex items-start justify-start gap-2 text-left">
                                  <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                                  {desc}
                                </li>
                              ))}
                            </ul>

                            <div className="flex items-center justify-between gap-4 border-t border-border/20 pt-4">
                              {exp.metricValue && (
                                <div className="flex flex-col items-start">
                                  <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Metrics</span>
                                  <span className="text-sm font-mono font-bold text-secondary mt-1">
                                    {exp.metricValue} <span className="text-[10px] text-muted font-normal">{exp.metricLabel}</span>
                                  </span>
                                </div>
                              )}
                              <div className="flex flex-wrap gap-1.5">
                                {exp.skills.map((skill: string) => (
                                  <span key={skill} className="px-2.5 py-1 rounded-md text-[9px] font-mono bg-background border border-border/50 text-secondary">{skill}</span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Mobile Card (Both Even and Odd) */}
                      <div className="block md:hidden">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="relative w-full p-5 rounded-3xl bg-surface/30 border border-border/50 backdrop-blur-md hover:border-primary/40 transition-all overflow-hidden text-left"
                        >
                          <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${exp.color} to-transparent blur-2xl opacity-45`} />
                          <div className="flex flex-col mb-3 items-start font-sans">
                            <time className="text-[10px] font-mono text-muted px-2.5 py-0.5 bg-background rounded-full border border-border/50 mb-1.5">
                              {exp.period}
                            </time>
                            <h3 className="text-base font-heading font-bold text-secondary">{exp.role}</h3>
                            <p className="text-xs font-mono text-primary mt-0.5 font-bold">{exp.company}</p>
                          </div>
                          
                          <ul className="space-y-2 mb-4 text-xs text-muted leading-relaxed">
                            {exp.description.map((desc: string, j: number) => (
                              <li key={j} className="flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                                {desc}
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-col gap-3 border-t border-border/20 pt-3">
                            {exp.metricValue && (
                              <div>
                                <span className="text-[8px] font-mono text-muted uppercase tracking-wider">Metrics</span>
                                <div className="text-xs font-mono font-bold text-secondary mt-0.5">
                                  {exp.metricValue} <span className="text-[9px] text-muted font-normal">{exp.metricLabel}</span>
                                </div>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1">
                              {exp.skills.map((skill: string) => (
                                <span key={skill} className="px-2 py-0.5 rounded-md text-[8px] font-mono bg-background border border-border/50 text-secondary">{skill}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
