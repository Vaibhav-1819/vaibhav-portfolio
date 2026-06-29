"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Wind, Sparkles, BrainCircuit, Activity, Database, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";

const project = projects.find(p => p.slug === 'aetherai');

export default function AetherAIPage() {
  if (!project) return null;

  return (
    <main className="min-h-screen bg-background text-secondary pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <Link href="/" className="flex items-center gap-2 text-muted hover:text-primary transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Workspace</span>
        </Link>
        <div className="font-heading font-bold text-lg tracking-tighter">AetherAI</div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono mb-8 uppercase tracking-widest">
            Case Study • Applied AI
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
            Environmental Intelligence.
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-12">
            A next-generation environmental platform designed to bridge the gap between complex atmospheric data and actionable urban policy. AetherAI monitors real-time air quality, utilizes XGBoost to forecast 72-hour conditions, and leverages Google Gemini for strategic interventions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-muted mb-20">
            {project.technologies.map(tech => (
              <span key={tech} className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5"
        >
          <img src="/images/aetherai_1.webp" alt="AetherAI Dashboard" className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>
      </section>

      {/* The Intelligence Flow */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-32">
        
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-3xl md:text-5xl text-secondary">The Pipeline</h3>
            <p className="text-muted text-lg">
              Raw data is useless without context. AetherAI processes metrics through a multi-stage intelligence pipeline before rendering the dashboard.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Air Quality', icon: Wind, desc: 'Real-time Open-Meteo telemetry.' },
              { title: 'Prediction', icon: Activity, desc: '72-hour neural forecasting.' },
              { title: 'XGBoost', icon: BrainCircuit, desc: 'Model Confidence 94.2%.' },
              { title: 'Gemini 1.5', icon: Sparkles, desc: 'Aether Strategy Optimizer.' },
              { title: 'Dossiers', icon: Database, desc: 'Automated PDF reports.' }
            ].map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-surface/30 border border-border/50 text-center space-y-4 hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <step.icon size={24} />
                </div>
                <h4 className="font-bold text-sm md:text-base">{step.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery / Showcase */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 pr-8"
          >
            <h3 className="font-heading font-bold text-3xl">Neural Engine & API Architecture</h3>
            <p className="text-muted leading-relaxed">
              Handling machine learning inference in a web application requires careful asynchronous management. 
              The Python backend uses FastAPI to serve the XGBoost prediction endpoints and manage conversational state with Gemini 1.5 Flash.
            </p>
            <ul className="space-y-2 text-muted list-disc ml-5 mb-4 text-sm md:text-base">
              <li><strong>Model Confidence:</strong> 94.2% (R² Score) evaluated on 365 days of data with 9 features.</li>
              <li><strong>Global Coverage:</strong> Geocoding API allows real-time tracking for any city worldwide.</li>
              <li><strong>REST Infrastructure:</strong> 7 specialized endpoints including simulation sandbox and optimizations.</li>
              <li><strong>Chemical Signature Recognition:</strong> AI-driven source identification for traffic and industry emissions.</li>
            </ul>
            <div className="p-6 rounded-2xl bg-surface/50 border border-border/50 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted">Inference Latency</span>
                <span className="font-mono font-bold text-emerald-400">&lt;50ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">LLM Generation</span>
                <span className="font-mono font-bold text-primary">Gemini 1.5 Streaming</span>
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/aetherai_2.webp" className="w-full h-full object-cover rounded-2xl border border-border/50 shadow" alt="AetherAI Component" />
            <img src="/images/aetherai_3.webp" className="w-full h-full object-cover rounded-2xl border border-border/50 shadow" alt="AetherAI Component" />
            <img src="/images/aetherai_4.webp" className="w-full h-full object-cover rounded-2xl border border-border/50 shadow" alt="AetherAI Component" />
            <img src="/images/aetherai_5.webp" className="w-full h-full object-cover rounded-2xl border border-border/50 shadow" alt="AetherAI Component" />
          </div>
        </div>

      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 text-center border-t border-border/50">
        <h2 className="text-3xl font-heading font-bold mb-8">View the source.</h2>
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface border border-border hover:border-primary transition-colors font-bold"
          >
            GitHub Repository <ArrowRight size={18} />
          </a>
        )}
      </section>
    </main>
  );
}
