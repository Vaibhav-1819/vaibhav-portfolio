"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

const experiments = [
  { 
    title: "ML Prediction Sandbox", 
    description: "Test CricSphere's match winner prediction models with live sample inputs.",
    status: "Interactive Demo" 
  },
  { 
    title: "Data Analytics Explorer", 
    description: "Interactive visualizer for venue heatmaps and player radar charts built from 22,000+ matches.",
    status: "Data Viz" 
  },
  { 
    title: "System Architecture Notes", 
    description: "Interactive diagrams mapping the request flows for CricSphere caching and Nexus WebRTC SFU.",
    status: "Engineering" 
  }
];

export function Labs() {
  return (
    <section className="py-32 border-t border-border/50 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05)_0%,transparent_50%)]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center p-3 bg-surface border border-border rounded-2xl mb-8 text-primary"
        >
          <FlaskConical size={32} />
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em] text-secondary mb-6">
          Engineering Experiments
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          A dedicated playground for machine learning sandboxes, data visualizations, and system architecture deep-dives that power my flagship projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8 bg-surface/30 border border-border/50 rounded-3xl hover:bg-surface/50 hover:border-primary/50 transition-colors group cursor-crosshair text-left flex flex-col h-full min-h-[220px]"
            >
              <div className="flex-1 space-y-4">
                <h3 className="font-heading font-bold text-xl text-secondary group-hover:text-primary transition-colors tracking-[-0.02em]">
                  {exp.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {exp.description}
                </p>
              </div>
              <div className="flex justify-between items-end mt-8">
                <span className="text-[11px] font-mono text-muted uppercase tracking-[0.2em]">{exp.status}</span>
                <span className="text-xs text-muted group-hover:opacity-100 opacity-0 transition-opacity">Run &gt;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
