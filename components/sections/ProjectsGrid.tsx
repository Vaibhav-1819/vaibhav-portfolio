"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProjectsGrid() {
  const mainProjects = projects.filter(p => p.slug === 'nexus' || p.slug === 'aetherai');

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
        </motion.div>


      </div>
    </section>
  );
}
