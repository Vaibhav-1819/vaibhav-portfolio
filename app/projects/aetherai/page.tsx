"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Wind, Sparkles, BrainCircuit, Activity, Database, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { ProjectGallery } from "@/components/ui/ProjectGallery";

const project = projects.find(p => p.slug === 'aetherai');

const aetherAiImages = [
  "/images/aetherai_home.webp",
  "/images/aetherai_simulator.webp",
  "/images/aetherai_comparision.webp",
  "/images/aetherai_optimizer.webp",
  "/images/aetherai_profile.webp"
];

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

        {/* Hero Image / Coverflow */}
        <div className="mt-12">
          <ProjectGallery images={aetherAiImages} title="AetherAI" />
        </div>
      </section>

      {/* Deep Dive Case Study */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-32">
        
        {/* The Vision */}
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-3xl">The Vision</h3>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />
          <div className="prose prose-invert max-w-none text-muted leading-relaxed text-lg space-y-6">
            <p>
              Environmental data is ubiquitous, but actionable intelligence is rare. Staring at raw AQI numbers or PM2.5 concentrations doesn't tell a user whether it's safe for their asthmatic child to play outside. I set out to bridge this gap.
            </p>
            <p>
              AetherAI was built to be a proactive, intelligent environmental forecasting system. By fusing traditional machine learning (XGBoost) for high-accuracy numerical predictions with advanced LLMs (Gemini 1.5) for natural language translation, the platform transforms atmospheric data into personalized health strategies.
            </p>
          </div>
        </div>

        {/* Engineering Challenges */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="font-heading font-bold text-3xl mb-4">Engineering the Engine</h3>
            <p className="text-muted max-w-2xl mx-auto">
              Merging predictive analytics with generative AI required strict latency constraints and complex pipeline orchestration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Zap className="text-emerald-500" size={32} />
              <h4 className="font-bold text-xl">High-Speed Inference</h4>
              <p className="text-muted leading-relaxed">
                Running ML inference in a web app usually introduces blocking delays. I built an asynchronous Python backend using FastAPI, aggressively optimizing the XGBoost model to execute 72-hour forecasts with an inference latency of less than 50ms per request.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Sparkles className="text-accent" size={32} />
              <h4 className="font-bold text-xl">Synthesizing Context</h4>
              <p className="text-muted leading-relaxed">
                Raw predictions aren't enough. I integrated Gemini 1.5 Flash via streaming API to consume the numerical forecasts alongside user health profiles. The system generates real-time, context-aware mitigation strategies (like HVAC scheduling) without noticeable UI blocking.
              </p>
            </div>
          </div>
        </div>

        {/* The Machine Learning Pipeline */}
        <div className="p-10 rounded-3xl bg-surface border border-border/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-2">Neural Architecture</h3>
              <p className="text-muted">Metrics from the forecasting and intelligence pipeline.</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">94.2%</div>
                <div className="text-sm text-muted">R² Confidence Score evaluated across 365 days of testing.</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">72-Hour</div>
                <div className="text-sm text-muted">Continuous prediction window for localized AQI forecasting.</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">9+</div>
                <div className="text-sm text-muted">Meteorological and chemical features analyzed per inference.</div>
              </div>
            </div>
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
