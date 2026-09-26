"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { ArrowRight, BookOpen, ExternalLink, Sparkles, CheckCircle2, Award, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProjectsGrid() {
  const cricsphere = projects.find(p => p.slug === 'cricsphere');
  const aetherai = projects.find(p => p.slug === 'aetherai');
  const campusPulse = projects.find(p => p.slug === 'campuspulse-ai');

  return (
    <section id="projects" className="py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Developer</span> <span className="text-primary">Toolkit</span>
          </h2>
          <p className="text-muted text-base md:text-xl max-w-2xl font-mono">
            Production systems, predictive machine learning pipelines, and intelligence engines built for scale.
          </p>
        </div>

        {/* Row 1: The Two Specialized Builds (CricSphere & AetherAI) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* CricSphere Card (DEPLOYED) */}
          {cricsphere && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col rounded-3xl bg-surface/20 border border-border/50 hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/5 group"
            >
              {/* Image Frame */}
              <Link href={`/projects/${cricsphere.slug}`} className="relative h-[220px] w-full bg-background/50 overflow-hidden block border-b border-border/30">
                {cricsphere.image && (
                  <Image
                    src={cricsphere.image}
                    alt={cricsphere.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                
                {/* Floating Status Badges */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Demo</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-border/60 text-[10px] font-mono font-bold text-secondary">
                    ML Sports Analytics
                  </span>
                </div>
              </Link>

              {/* Content Panel */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Link href={`/projects/${cricsphere.slug}`}>
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-secondary group-hover:text-primary transition-colors flex items-center gap-2">
                        <span>{cricsphere.title}</span>
                        <ArrowRight size={16} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </h3>
                    </Link>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Deployed
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-muted font-mono leading-relaxed line-clamp-2">
                    {cricsphere.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cricsphere.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-background/50 border border-border/50 text-[10px] font-mono text-muted rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons (Live Demo + Case Study + Source) */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-border/40">
                  {cricsphere.demo && (
                    <a
                      href={cricsphere.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-background font-mono text-xs font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/10"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  <Link
                    href={`/projects/${cricsphere.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface hover:bg-surface/80 border border-border/60 text-secondary hover:text-primary font-mono text-xs font-bold transition-all"
                  >
                    <span>Case Study</span>
                    <ArrowRight size={12} />
                  </Link>

                  {cricsphere.github && (
                    <a
                      href={cricsphere.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-muted hover:text-secondary font-mono text-xs transition-colors ml-auto"
                    >
                      <span>Source</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* AetherAI Card (OFFLINE / NOT DEPLOYED) */}
          {aetherai && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex flex-col rounded-3xl bg-surface/20 border border-border/50 hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/5 group"
            >
              {/* Image Frame */}
              <Link href={`/projects/${aetherai.slug}`} className="relative h-[220px] w-full bg-background/50 overflow-hidden block border-b border-border/30">
                {aetherai.image && (
                  <Image
                    src={aetherai.image}
                    alt={aetherai.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                
                {/* Floating Status Badges */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-border/60 text-[10px] font-mono text-muted">
                    Offline • Case Study
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-border/60 text-[10px] font-mono font-bold text-secondary">
                    Environmental Forecasting
                  </span>
                </div>
              </Link>

              {/* Content Panel */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Link href={`/projects/${aetherai.slug}`}>
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-secondary group-hover:text-primary transition-colors flex items-center gap-2">
                        <span>{aetherai.title}</span>
                        <ArrowRight size={16} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </h3>
                    </Link>
                    <span className="text-[10px] font-mono text-muted bg-surface border border-border/60 px-2 py-0.5 rounded-full">
                      Academic Build
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-muted font-mono leading-relaxed line-clamp-2">
                    {aetherai.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {aetherai.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-background/50 border border-border/50 text-[10px] font-mono text-muted rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons (Case Study + Source only - NO live demo) */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-border/40">
                  <Link
                    href={`/projects/${aetherai.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-background font-mono text-xs font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/10"
                  >
                    <span>Case Study</span>
                    <ArrowRight size={12} />
                  </Link>

                  {aetherai.github && (
                    <a
                      href={aetherai.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-muted hover:text-secondary font-mono text-xs transition-colors ml-auto"
                    >
                      <span>Source</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Row 2: CampusPulse AI Compact Showcase Card (Project Submission - NOT DEPLOYED) */}
        {campusPulse && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full relative group rounded-3xl bg-surface/20 hover:bg-surface/30 border border-border/50 hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/5 p-5 sm:p-6 lg:p-7"
          >
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Clean Framed Preview */}
              <div className="lg:col-span-5">
                <Link href={`/projects/${campusPulse.slug}`} className="block group/preview">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border/60 bg-background/80 shadow-md group-hover/preview:border-primary/40 transition-colors">
                    {campusPulse.image && (
                      <Image
                        src={campusPulse.image}
                        alt={campusPulse.title}
                        fill
                        className="object-cover object-top group-hover/preview:scale-104 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 35vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-40 group-hover/preview:opacity-20 transition-opacity" />
                    
                    {/* Floating Status Badges on Image */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono font-bold text-amber-400 shadow-sm">
                        <Trophy size={11} className="text-amber-400" />
                        <span>Regional Finalist</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-border/60 text-[10px] font-mono font-bold text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Incident Intelligence</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right Column: Streamlined Info & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-400 shadow-sm shadow-amber-500/10">
                    <Trophy size={11} className="text-amber-400" />
                    <span>Team Point Break</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono font-bold text-indigo-400">
                    <Award size={11} />
                    <span>IBM SkillsBuild</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                    <CheckCircle2 size={10} />
                    <span>58/58 Verified</span>
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <Link href={`/projects/${campusPulse.slug}`}>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-secondary group-hover:text-primary transition-colors flex items-center gap-2">
                      <span>{campusPulse.title}</span>
                      <ArrowRight size={16} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-muted font-mono leading-relaxed mt-1 line-clamp-2">
                    {campusPulse.description}
                  </p>
                </div>

                {/* Telemetry Metrics Grid */}
                {campusPulse.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
                    {campusPulse.metrics.map((m) => (
                      <div key={m.label} className="p-2 rounded-xl bg-background/60 border border-border/40">
                        <div className="text-xs font-bold text-primary">{m.value}</div>
                        <div className="text-[10px] text-muted truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {campusPulse.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-background/50 border border-border/50 text-[10px] font-mono text-muted rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-border/30">
                  <Link
                    href={`/projects/${campusPulse.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-background font-mono text-xs font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/10"
                  >
                    <span>View Project</span>
                    <ArrowRight size={13} />
                  </Link>

                  <Link
                    href="/blog/campuspulse-skillup-hackathon-regional-finale"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface/80 border border-border/60 text-secondary hover:text-primary font-mono text-xs font-bold transition-all"
                  >
                    <BookOpen size={13} className="text-primary" />
                    <span>3-Part Series</span>
                  </Link>

                  <a
                    href="/images/team_point_break_certificate.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold transition-all"
                  >
                    <Trophy size={12} />
                    <span>Certificate</span>
                    <ExternalLink size={11} />
                  </a>

                  {campusPulse.github && (
                    <a
                      href={campusPulse.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-muted hover:text-secondary font-mono text-xs transition-colors ml-auto"
                    >
                      <span>Source</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
