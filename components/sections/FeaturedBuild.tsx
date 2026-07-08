import { projects } from "@/content/projects";
import { Database, Network, Cpu, Server, Activity, BrainCircuit, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FeaturedBuild() {
  const cricsphere = projects.find(p => p.slug === 'cricsphere');

  if (!cricsphere) return null;

  return (
    <section className="relative py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        
        {/* Apple-style Hero Intro for CricSphere */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <ScrollReveal
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-mono uppercase tracking-[0.2em]"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> 
            Featured Case Study
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 
              className="text-5xl md:text-7xl lg:text-[80px] font-heading font-black tracking-[-0.04em] leading-[1.05] text-secondary"
            >
              {cricsphere.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p 
              className="text-xl text-muted font-light leading-relaxed"
            >
              I wanted to understand how modern sports analytics systems are built. Starting with over 22,000 raw match files, I designed a data warehouse, engineered point-in-time features, trained multiple ML models, and built an interactive platform that surfaces predictions and cricket intelligence.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
             <div className="bg-surface/50 rounded-2xl p-4 md:p-6 border border-border/50 flex flex-col items-center md:items-start">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1"><AnimatedNumber value={22000} suffix="+" /></p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono text-center md:text-left">Matches</p>
             </div>
             <div className="bg-surface/50 rounded-2xl p-4 md:p-6 border border-border/50 flex flex-col items-center md:items-start">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1"><AnimatedNumber value={4} /></p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono text-center md:text-left">Models</p>
             </div>
             <div className="bg-surface/50 rounded-2xl p-4 md:p-6 border border-border/50 flex flex-col items-center md:items-start">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1"><AnimatedNumber value={638} suffix="K+" /></p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono text-center md:text-left">Player Matchups</p>
             </div>
             <div className="bg-surface/50 rounded-2xl p-4 md:p-6 border border-border/50 flex flex-col items-center md:items-start">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1"><AnimatedNumber value={16} /></p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono text-center md:text-left">Datasets</p>
             </div>
          </ScrollReveal>
        </div>

        {/* Massive Hero Image */}
        <ScrollReveal
            y={40}
            className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5 w-full min-h-[400px] sm:min-h-[500px] md:aspect-[16/9] md:min-h-0"
          >
          <Image src="/images/cricsphere_landing.webp" alt="CricSphere Dashboard" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-10 w-full">
            <div className="flex flex-wrap gap-3">
              {cricsphere.technologies.map(tech => (
                <span key={tech} className="px-4 py-2 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg text-sm font-mono text-secondary">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link 
                href="/projects/cricsphere"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface/90 backdrop-blur-md text-secondary border border-border/50 font-bold hover:bg-surface hover:border-primary/50 transition-all shrink-0 w-full sm:w-auto"
              >
                View Case Study & Gallery
              </Link>
              <a 
                href={cricsphere.demo} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity shrink-0 w-full sm:w-auto"
              >
                Launch Platform <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* The System Architecture Layer */}
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-secondary tracking-[-0.03em]">System Architecture</h2>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              A decoupled backend separating the ML inference engine from the high-throughput live scoring API.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal 
              className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-6 hover:border-primary/50 transition-colors group"
            >
              <Database size={32} className="text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl">Analytics Warehouse</h3>
              <p className="text-muted leading-relaxed">Processed 22,000+ raw JSON match files into an optimized relational schema for rapid feature extraction.</p>
            </ScrollReveal>

            <ScrollReveal 
              delay={0.1}
              className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-6 hover:border-accent/50 transition-colors group"
            >
              <BrainCircuit size={32} className="text-accent group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl">Prediction Engine</h3>
              <p className="text-muted leading-relaxed">4 ML models trained on point-in-time features to forecast match outcomes with ~61.66% baseline accuracy.</p>
            </ScrollReveal>

            <ScrollReveal 
              delay={0.2}
              className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-6 hover:border-emerald-500/50 transition-colors group"
            >
              <Zap size={32} className="text-emerald-500 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl">Real-time Caching</h3>
              <p className="text-muted leading-relaxed">Aggressive caching layer reducing third-party RapidAPI calls from ~200/min down to just 18/min.</p>
            </ScrollReveal>
          </div>
        </div>

        {/* Feature Engineering & ML Pipeline Proof */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-center">
          <ScrollReveal 
            x={-40}
            className="space-y-8"
          >
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-secondary">Feature Engineering</h2>
            <p className="text-muted text-lg leading-relaxed">
              To build the prediction engine, I couldn't just feed raw scores to a model. I engineered <strong>point-in-time features</strong>: calculating a team's win rate, top-order strike rate, and bowling economy <em>exactly as it was</em> before a specific match occurred. This prevented data leakage and ensured the model generalized well to live fixtures.
            </p>
          </ScrollReveal>

          <ScrollReveal 
            x={40}
            className="space-y-4"
          >
            {/* Visual Proof Metrics */}
            <div className="p-6 rounded-2xl bg-surface/50 border border-border/50 flex justify-between items-center group hover:bg-surface transition-colors">
              <span className="text-muted">Training Data</span>
              <span className="font-mono text-2xl font-bold text-primary"><AnimatedNumber value={22007} suffix=" Matches" /></span>
            </div>
            <div className="p-6 rounded-2xl bg-surface/50 border border-border/50 flex justify-between items-center group hover:bg-surface transition-colors">
              <span className="text-muted">PvP Records</span>
              <span className="font-mono text-2xl font-bold text-primary"><AnimatedNumber value={638} suffix="K+" /></span>
            </div>
            <div className="p-6 rounded-2xl bg-surface/50 border border-border/50 flex justify-between items-center group hover:bg-surface transition-colors">
              <span className="text-muted">Inference Time</span>
              <span className="font-mono text-2xl font-bold text-accent"><AnimatedNumber value={100} prefix="<" suffix="ms" /></span>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
