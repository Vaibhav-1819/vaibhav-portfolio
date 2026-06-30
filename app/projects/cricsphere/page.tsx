"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Database, GitBranch, Terminal, Zap, LineChart, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

const project = projects.find(p => p.slug === 'cricsphere');

export default function CricSpherePage() {
  return (
    <main className="min-h-screen bg-background text-secondary pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <Link href="/" className="flex items-center gap-2 text-muted hover:text-primary transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Workspace</span>
        </Link>
        <div className="font-heading font-bold text-lg tracking-tighter">CricSphere</div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono mb-8 uppercase tracking-widest">
            Case Study • System Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
            The Ultimate Cricket Analytics Platform
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-12">
            I wanted to understand how modern sports analytics systems are built. Starting with over 22,000 raw match files, I designed a data warehouse, engineered point-in-time features, trained multiple ML models, and built an interactive platform that surfaces predictions and cricket intelligence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-muted mb-20">
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">React</span>
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">Node.js</span>
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">Express.js</span>
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">RapidAPI</span>
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">Machine Learning</span>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5"
        >
          <img src="/images/cricsphere_landing.webp" alt="CricSphere Dashboard" className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>
      </section>

      {/* Engineering Story */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-32">
        
        {/* The Problem */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <h3 className="font-heading font-bold text-2xl mb-4">The Problem</h3>
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
          <div className="prose prose-invert">
            <p className="text-muted leading-relaxed text-lg">
              Traditional sports websites are cluttered with ads and surface-level statistics. As an engineering challenge, I wanted to build a platform that didn't just display data, but actually generated <strong>cricket intelligence</strong>. I needed a system capable of parsing thousands of historical matches, identifying patterns, and predicting outcomes in real-time.
            </p>
          </div>
        </div>

        {/* System Architecture */}
        <div className="space-y-12">
          <div>
            <h3 className="font-heading font-bold text-3xl mb-4 text-center">System Architecture</h3>
            <p className="text-center text-muted max-w-2xl mx-auto">
              A decoupled architecture separating the ML prediction engine from the high-throughput live scoring API.
            </p>
          </div>
          
          <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col gap-4">
              <Database className="text-primary" size={24} />
              <h4 className="font-bold">Analytics Warehouse</h4>
              <p className="text-sm text-muted">Processed 22,000+ raw JSON match files into an optimized schema for rapid feature extraction.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col gap-4">
              <BrainCircuit className="text-accent" size={24} />
              <h4 className="font-bold">Prediction Engine</h4>
              <p className="text-sm text-muted">4 ML models trained on point-in-time features to forecast match outcomes with ~61.66% baseline accuracy.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col gap-4">
              <Zap className="text-primary" size={24} />
              <h4 className="font-bold">Real-time Caching</h4>
              <p className="text-sm text-muted">Aggressive caching layer reducing third-party RapidAPI calls from ~200/min down to 18/min.</p>
            </div>
          </div>
        </div>

        {/* Visual Proof */}
        <div className="space-y-12">
          <h3 className="font-heading font-bold text-3xl mb-8 text-center">Dashboard Experience</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-border/50">
              <img src="/images/cricsphere_intelligence.webp" alt="Match Intelligence" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/50">
              <img src="/images/cricsphere_match.webp" alt="Live Match View" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Feature Engineering & ML */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl">The Machine Learning Pipeline</h3>
            <p className="text-muted leading-relaxed">
              To build the prediction engine, I couldn't just feed raw scores to a model. I engineered <strong>point-in-time features</strong>: calculating a team's win rate, top-order strike rate, and bowling economy <em>exactly as it was</em> before a specific match occurred. This prevented data leakage and ensured the model generalized well to live fixtures.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-surface border border-border/50 space-y-6">
            <div className="flex justify-between items-center border-b border-border/50 pb-4">
              <span className="text-sm text-muted">Training Data</span>
              <span className="font-mono font-bold text-primary"><AnimatedNumber value={22007} suffix=" Matches" /></span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-4">
              <span className="text-sm text-muted">PvP Records</span>
              <span className="font-mono font-bold text-primary"><AnimatedNumber value={638} suffix="K+" /></span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">Inference Time</span>
              <span className="font-mono font-bold text-accent"><AnimatedNumber value={100} prefix="<" suffix="ms" /></span>
            </div>
          </div>
        </div>

      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 text-center border-t border-border/50">
        <h2 className="text-3xl font-heading font-bold mb-8">Ready to see it in action?</h2>
        <a 
          href={project?.demo} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
        >
          Launch CricSphere <ArrowLeft className="rotate-180" size={18} />
        </a>
      </section>
    </main>
  );
}
