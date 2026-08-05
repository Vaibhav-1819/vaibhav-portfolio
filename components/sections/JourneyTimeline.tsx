"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Layers, Database, Sparkles } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  focus: string;
  desc: string;
  metricValue: string;
  metricLabel: string;
  tags: string[];
  color: string;
  icon: any;
}

const milestones: Milestone[] = [
  {
    year: "2023",
    title: "Programming Foundations",
    focus: "Algorithmic reasoning & Core OOPs",
    desc: "Began with Java and Data Structures, establishing a strong foundation in core algorithms, complexity analysis, and database normalization.",
    metricValue: "150+",
    metricLabel: "LeetCode Solved",
    tags: ["Java", "OOPs", "Data Structures", "SQL"],
    color: "from-emerald-500/10",
    icon: Code
  },
  {
    year: "2024",
    title: "Full-Stack & Applied AI",
    focus: "Modern web frameworks & NLP datasets curation",
    desc: "Mastered the MERN stack while contributing to voice dataset tools. Designed fully responsive user interfaces and robust REST endpoints.",
    metricValue: "15-Day",
    metricLabel: "NLP Voice Intern",
    tags: ["React", "Node.js", "Express", "NLP Datasets"],
    color: "from-primary/10",
    icon: Layers
  },
  {
    year: "2025",
    title: "Analytics & Caching Systems",
    focus: "Sports telemetry processing & model serving",
    desc: "Engineered CricSphere parsing engines for heavy JSON dataset workloads, integrating efficient in-memory caches to speed up dynamic predictions.",
    metricValue: "22K+",
    metricLabel: "Matches Processed",
    tags: ["FastAPI", "Redis", "LightGBM", "DuckDB"],
    color: "from-secondary/10",
    icon: Database
  },
  {
    year: "2026",
    title: "Real-Time AI Collaboration",
    focus: "High-concurrency document sync & telemetry",
    desc: "Architecting Nexus, incorporating Liveblocks Yjs conflict-free document sync, zero-trust storage URL brokering, and Gemini embedding matching.",
    metricValue: "<360μs",
    metricLabel: "Vector Math Speed",
    tags: ["Next.js 14", "Liveblocks", "Stream", "Pinecone", "Gemini"],
    color: "from-accent/10",
    icon: Sparkles
  }
];

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="py-32 border-t border-border/50 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.02)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Development</span> <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted font-mono text-sm leading-relaxed max-w-xl">
            A chronological timeline of systems built, algorithms mastered, and architectural decisions made.
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
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isEven = i % 2 === 0;

              return (
                <div 
                  key={milestone.year} 
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
                        className="relative w-full max-w-[500px] p-6 rounded-3xl bg-surface/30 border border-border/50 backdrop-blur-md hover:border-primary/40 hover:bg-surface/50 transition-all duration-300 group overflow-hidden text-right"
                      >
                        <div className={`absolute -left-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${milestone.color} to-transparent blur-3xl opacity-50`} />
                        <div className="flex flex-col mb-4 items-end">
                          <span className="text-4xl font-heading font-black text-primary tracking-tighter mb-1">{milestone.year}</span>
                          <h3 className="text-lg font-heading font-bold text-secondary">{milestone.title}</h3>
                          <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-1">{milestone.focus}</p>
                        </div>
                        <p className="text-xs text-muted font-mono leading-relaxed mb-6">{milestone.desc}</p>
                        <div className="flex flex-row-reverse items-center justify-between gap-4 border-t border-border/20 pt-4">
                          <div className="flex flex-col items-end">
                            <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Telemetry</span>
                            <span className="text-sm font-mono font-bold text-secondary mt-1">
                              {milestone.metricValue} <span className="text-[10px] text-muted font-normal">{milestone.metricLabel}</span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 justify-end">
                            {milestone.tags.map(tag => (
                              <span key={tag} className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-background border border-border/50 text-secondary">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column (Contains Card on desktop if Odd, contains Card on mobile ALWAYS) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-12 flex items-center">
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
                            <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${milestone.color} to-transparent blur-3xl opacity-50`} />
                            <div className="flex flex-col mb-4 items-start">
                              <span className="text-4xl font-heading font-black text-primary tracking-tighter mb-1">{milestone.year}</span>
                              <h3 className="text-lg font-heading font-bold text-secondary">{milestone.title}</h3>
                              <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-1">{milestone.focus}</p>
                            </div>
                            <p className="text-xs text-muted font-mono leading-relaxed mb-6">{milestone.desc}</p>
                            <div className="flex items-center justify-between gap-4 border-t border-border/20 pt-4">
                              <div className="flex flex-col items-start">
                                <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Telemetry</span>
                                <span className="text-sm font-mono font-bold text-secondary mt-1">
                                  {milestone.metricValue} <span className="text-[10px] text-muted font-normal">{milestone.metricLabel}</span>
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {milestone.tags.map(tag => (
                                  <span key={tag} className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-background border border-border/50 text-secondary">{tag}</span>
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
                          <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${milestone.color} to-transparent blur-2xl opacity-45`} />
                          <div className="flex flex-col mb-3">
                            <span className="text-3xl font-heading font-black text-primary tracking-tighter mb-0.5">{milestone.year}</span>
                            <h3 className="text-base font-heading font-bold text-secondary">{milestone.title}</h3>
                            <p className="text-[9px] font-mono text-muted uppercase tracking-wider mt-0.5">{milestone.focus}</p>
                          </div>
                          <p className="text-xs text-muted font-mono leading-relaxed mb-4">{milestone.desc}</p>
                          <div className="flex flex-col gap-3 border-t border-border/20 pt-3">
                            <div>
                              <span className="text-[8px] font-mono text-muted uppercase tracking-wider">Telemetry</span>
                              <div className="text-xs font-mono font-bold text-secondary mt-0.5">
                                {milestone.metricValue} <span className="text-[9px] text-muted font-normal">{milestone.metricLabel}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {milestone.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-md text-[8px] font-mono bg-background border border-border/50 text-secondary">{tag}</span>
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
