"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2023",
    title: "Programming Foundations",
    desc: "Began with Java and Data Structures, establishing a strong foundation in problem-solving and algorithms."
  },
  {
    year: "2024",
    title: "Full-Stack Web Dev",
    desc: "Mastered React, Node.js, and modern web architectures by building end-to-end full-stack applications."
  },
  {
    year: "2025",
    title: "CricSphere Platform",
    desc: "Engineered a scalable cricket analytics platform handling complex APIs, data processing, and state management."
  },
  {
    year: "2026",
    title: "AI & Distributed Systems",
    desc: "Exploring Machine Learning while building Nexus—a real-time collaboration platform scaling complex WebSocket states."
  },
];

export function JourneyTimeline() {
  return (
    <section id="journey" className="py-32 border-t border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary">
            Development Journey
          </h2>
        </div>

        <div className="relative">
          {/* Desktop Horizontal Line */}
          <div className="absolute top-[72px] left-0 w-full h-[1px] bg-border/50 hidden md:block" />

          {/* Mobile Vertical Line */}
          <div className="absolute top-0 bottom-0 left-[7px] md:hidden w-[1px] bg-border/50" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex flex-col relative group pl-8 md:pl-0"
              >
                {/* Node Point */}
                <div className="w-4 h-4 bg-background border-2 border-border group-hover:border-primary rounded-full absolute left-0 md:left-1/2 top-1 md:top-[72px] md:-translate-x-1/2 md:-translate-y-1/2 transition-colors duration-300 block shadow-sm shadow-background" />

                <div className="md:text-center w-full mb-4 md:mb-16 md:h-[40px] flex items-center md:justify-center">
                  <span className="text-3xl font-heading font-black text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                    {milestone.year}
                  </span>
                </div>

                <div className="w-full md:text-center md:px-4">
                  <h3 className="text-xl font-heading font-bold text-secondary mb-3">{milestone.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
