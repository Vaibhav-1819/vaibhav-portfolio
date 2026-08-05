"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProjectsGrid() {
  const mainProjects = projects.filter(p => p.slug === 'cricsphere' || p.slug === 'aetherai');

  return (
    <section id="projects" className="py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Developer</span> <span className="text-primary">Toolkit</span>
          </h2>
          <p className="text-muted text-lg md:text-xl">Apps, tools, and platforms built for learning and scale.</p>
        </div>

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainProjects.map((project, i) => (
            <Link href={`/projects/${project.slug}`} key={project.slug} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col h-[460px] bg-surface/30 border border-border/50 rounded-3xl overflow-hidden active:scale-[0.98] transition-all hover:border-primary/40"
              >
                {/* Image Frame */}
                {project.image ? (
                  <div className="relative h-[220px] w-full bg-background/40 overflow-hidden border-b border-border/30">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover group-hover:scale-102 transition-transform duration-500" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/10 to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-[220px] w-full bg-gradient-to-br from-primary/5 to-accent/5 border-b border-border/30" />
                )}

                {/* Content Panel */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-secondary group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="p-2 bg-background/80 backdrop-blur-md rounded-full border border-border/50 text-secondary group-hover:text-primary group-hover:border-primary/40 transition-colors">
                        <ArrowRight size={16} />
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-muted font-mono leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-background/50 border border-border/50 text-[10px] font-mono text-muted rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
