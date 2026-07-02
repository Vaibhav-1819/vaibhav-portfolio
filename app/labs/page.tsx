"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Beaker, Code2, Cpu, ArrowRight } from "lucide-react";
import { 
  MatchPredictionWidget, 
  AnalyticsExplorerWidget, 
  MLPipelineWidget 
} from "@/components/sections/Experiments";
import { FadeIn } from "@/components/motion/FadeIn";

export default function LabsPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center py-20 px-6 overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      {/* Back to Home Navigation */}
      <div className="absolute top-24 left-6 md:left-12 z-50">
        <a 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 bg-surface/50 hover:bg-surface border border-border rounded-full text-sm font-mono text-muted hover:text-secondary transition-all backdrop-blur-md"
        >
          <ArrowLeft size={16} />
          <span>Workspace</span>
        </a>
      </div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center mt-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4 w-full"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(var(--color-primary),0.2)]">
               <Beaker size={24} className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary tracking-tight">
            Innovation <span className="text-primary">Labs</span>
          </h1>
          <p className="text-muted max-w-xl mx-auto font-mono text-sm leading-relaxed">
            A showcase of my smaller academic projects, machine learning models, and interactive sandboxes.
          </p>
        </motion.div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          
          {/* Match Prediction */}
          <FadeIn
            delay={0.1}
            className="flex flex-col p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/50 h-[500px]"
          >
            <div className="mb-6">
              <span className="text-[11px] font-mono text-muted uppercase tracking-[0.2em]">Live Sandbox</span>
              <h3 className="font-heading font-bold text-2xl mt-2 text-secondary tracking-[-0.02em]">Match Prediction</h3>
            </div>
            <MatchPredictionWidget />
          </FadeIn>

          {/* Analytics Explorer */}
          <FadeIn
            delay={0.2}
            className="flex flex-col p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/50 h-[500px]"
          >
            <div className="mb-6">
              <span className="text-[11px] font-mono text-muted uppercase tracking-[0.2em]">Interactive UI</span>
              <h3 className="font-heading font-bold text-2xl mt-2 text-secondary tracking-[-0.02em]">Analytics Explorer</h3>
            </div>
            <AnalyticsExplorerWidget />
          </FadeIn>

          {/* ML Pipeline Explorer */}
          <FadeIn
            delay={0.3}
            className="flex flex-col p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/50 lg:col-span-2 h-[500px] md:h-[400px]"
          >
            <div className="mb-6">
              <span className="text-[11px] font-mono text-muted uppercase tracking-[0.2em]">Architecture Walkthrough</span>
              <h3 className="font-heading font-bold text-2xl mt-2 text-secondary tracking-[-0.02em]">ML Pipeline Explorer</h3>
            </div>
            <MLPipelineWidget />
          </FadeIn>

          {/* BrandRecognizer */}
          <FadeIn delay={0.4}>
            <Link 
              href="/projects/brandrecognizer"
              className="flex flex-col h-full p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/50 group hover:border-primary/40 transition-colors"
            >
              <div className="mb-6">
                <span className="flex items-center gap-2 text-[11px] font-mono text-emerald-500 uppercase tracking-[0.2em]">
                  <Cpu size={14} /> Completed
                </span>
                <div className="flex justify-between items-center mt-2">
                  <h3 className="font-heading font-bold text-2xl text-secondary tracking-[-0.02em]">BrandRecognizer</h3>
                  <ArrowRight size={20} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
              <p className="text-muted text-sm font-mono leading-relaxed mb-6">
                A Deep Learning CNN model built using TensorFlow and EfficientNetB0. 
                Trained on a curated dataset of over 11,000 images spanning 50 distinct car brands. 
                The project utilized transfer learning and data augmentation to achieve an accuracy of ~80%.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {['Python', 'TensorFlow', 'EfficientNetB0'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-background border border-border/50 rounded-full text-xs font-mono text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          </FadeIn>

          {/* CrickIQ */}
          <FadeIn
            delay={0.5}
            className="flex flex-col p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/50 group hover:border-primary/40 transition-colors"
          >
            <div className="mb-6">
              <span className="flex items-center gap-2 text-[11px] font-mono text-emerald-500 uppercase tracking-[0.2em]">
                <Code2 size={14} /> Completed
              </span>
              <h3 className="font-heading font-bold text-2xl mt-2 text-secondary tracking-[-0.02em]">CrickIQ</h3>
            </div>
            <p className="text-muted text-sm font-mono leading-relaxed mb-6">
              A responsive, fully-featured Cricket Quiz Platform built in React. 
              Features include timed quizzes, various difficulty categories, and an engaging UI that tests users' knowledge of international cricket formats and history. 
              Leverages session storage for state persistence.
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              {['React.js', 'Web Storage API', 'Tailwind CSS'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-background border border-border/50 rounded-full text-xs font-mono text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </main>
  );
}
