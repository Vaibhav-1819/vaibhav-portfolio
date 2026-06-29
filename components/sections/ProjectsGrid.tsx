"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProjectsGrid() {
  const mainProjects = projects.filter(p => p.slug === 'nexus' || p.slug === 'aetherai');
  const otherProjectsList = projects.filter(p => p.slug !== 'cricsphere' && p.slug !== 'nexus' && p.slug !== 'aetherai');

  return (
    <section id="projects" className="py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em] text-secondary">
            Developer Toolkit
          </h2>
          <p className="text-muted text-lg md:text-xl">Apps, tools, and platforms built for learning and scale.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainProjects.map((project, i) => (
            <Link href={`/projects/${project.slug}`} key={project.slug} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative h-[400px] bg-surface/30 border border-border/50 rounded-3xl overflow-hidden active:scale-[0.98] transition-transform"
              >
              {/* Image Background */}
              {project.image ? (
                <div className="absolute inset-0 z-0">
                  <Image src={project.image} alt={project.title} fill className="object-cover opacity-60 group-hover:opacity-30 transition-all duration-700 scale-100 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
              )}
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
                <div className="transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary">
                      {project.title}
                    </h3>
                    <div className="flex gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 translate-x-0 md:translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                      <div className="p-2 md:p-3 bg-background/80 backdrop-blur-md rounded-full border border-border/50 text-secondary transition-colors">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm md:text-base text-muted line-clamp-2 mb-6 pr-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {project.technologies.map((tech, j) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-background/50 border border-border/50 text-[10px] md:text-xs font-mono text-muted rounded-md transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                        style={{ transitionDelay: `${j * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
          ))}
        </div>

        {/* Other Projects List */}
        {otherProjectsList.length > 0 && (
          <div className="mt-24 md:mt-32 max-w-4xl mx-auto">
            <h3 className="font-heading font-bold text-3xl md:text-4xl text-secondary mb-8 md:mb-12 tracking-[-0.02em] text-center md:text-left">
              Other Projects
            </h3>
            <div className="flex flex-col gap-4">
              {otherProjectsList.map((project, i) => (
                <a href={project.github} target="_blank" rel="noreferrer" key={project.slug} className="block active:scale-[0.98] transition-transform">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="p-6 md:p-8 rounded-3xl bg-surface/20 border border-border/50 hover:bg-surface/50 hover:border-primary/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex flex-col flex-1 pb-2 md:pb-0">
                      <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-[-0.02em] text-secondary group-hover:text-primary transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span key={tech} className="text-[10px] md:text-xs font-mono text-muted/80 bg-background/50 px-2 py-1 rounded border border-border/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center justify-center p-3 rounded-full bg-surface border border-border/50 text-secondary md:bg-transparent md:border-transparent">
                      <ArrowRight className="text-muted group-hover:text-primary transform group-hover:translate-x-2 transition-all" size={20} />
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
