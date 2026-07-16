"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Database, GitBranch, Terminal, Zap, LineChart, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ProjectGallery } from "@/components/ui/ProjectGallery";

const project = projects.find(p => p.slug === 'cricsphere');

const cricsphereImages = [
  "/images/cricsphere_landing.webp",
  "/images/cricsphere_home.webp",
  "/images/cricsphere_intelligence.webp",
  "/images/cricsphere_match.webp",
  "/images/cricsphere_matches.webp",
  "/images/cricsphere_news.webp",
  "/images/cricsphere_player.webp",
  "/images/cricsphere_rankings.webp",
  "/images/cricsphere_schedules.webp",
  "/images/cricsphere_teams.webp",
  "/images/cricsphere_login.webp",
  "/images/cricsphere_register.webp"
];

export default function CricSpherePage() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
      router.back();
    } else {
      router.push('/#featured-build');
    }
  };

  return (
    <main className="min-h-screen bg-background text-secondary pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <a href="/#featured-build" onClick={handleBack} className="flex items-center gap-2 text-muted hover:text-primary transition-colors group cursor-pointer">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Workspace</span>
        </a>
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
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-muted mb-16">
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">React</span>
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">Node.js</span>
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">Express.js</span>
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">RapidAPI</span>
            <span className="px-4 py-2 border border-border/50 rounded-lg bg-surface/30">Machine Learning</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-20">
             <div className="bg-surface/50 rounded-2xl p-6 border border-border/50">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1"><AnimatedNumber value={22000} suffix="+" /></p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono">Matches</p>
             </div>
             <div className="bg-surface/50 rounded-2xl p-6 border border-border/50">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1"><AnimatedNumber value={4} /></p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono">Models</p>
             </div>
             <div className="bg-surface/50 rounded-2xl p-6 border border-border/50">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1"><AnimatedNumber value={638} suffix="K+" /></p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono">Player Matchups</p>
             </div>
             <div className="bg-surface/50 rounded-2xl p-6 border border-border/50">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1"><AnimatedNumber value={16} /></p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono">Datasets</p>
             </div>
          </div>
        </motion.div>

        {/* Hero Image / Coverflow */}
        <div className="mt-12">
          <ProjectGallery images={cricsphereImages} title="CricSphere" />
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
              When I set out to build CricSphere, the goal wasn't just to display cricket scores. The sports analytics market is saturated with platforms that either bombard users with ads or hide meaningful insights behind complex interfaces. I wanted to build a unified, high-performance ecosystem.
            </p>
            <p>
              I envisioned a platform where a casual fan could effortlessly track live games, while a hardcore analyst could dive deep into historical PvP matchups, win probabilities, and point-in-time statistics—all rendered in a gorgeous, modern UI.
            </p>
          </div>
        </div>

        {/* Engineering Challenges */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="font-heading font-bold text-3xl mb-4">Engineering the Engine</h3>
            <p className="text-muted max-w-2xl mx-auto">
              Handling live sports data at scale presents massive challenges in state management, rate limiting, and ML feature alignment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Zap className="text-emerald-500" size={32} />
              <h4 className="font-bold text-xl">Defeating Rate Limits</h4>
              <p className="text-muted leading-relaxed">
                Live cricket APIs are notoriously expensive. I implemented a highly aggressive, intelligent caching layer. By batching requests and syncing state globally across connected clients, I reduced upstream API calls from ~200/min down to just 18/min, ensuring near-instant updates for users without bottlenecking the backend.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <BrainCircuit className="text-accent" size={32} />
              <h4 className="font-bold text-xl">Preventing Data Leakage</h4>
              <p className="text-muted leading-relaxed">
                Training ML models on sports data is tricky. To prevent the model from "seeing the future", I built a pipeline that engineered <em>point-in-time features</em>. The model calculates a team's rolling win rate, toss luck, and batting economy exactly as it stood <strong>before</strong> the first ball of the match was bowled.
              </p>
            </div>
          </div>
        </div>

        {/* The Machine Learning Pipeline */}
        <div className="space-y-12">
          <div className="p-10 rounded-3xl bg-surface border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="font-heading font-bold text-2xl mb-2">Model Pipeline Architecture</h3>
                <p className="text-muted">Three production LightGBM models trained on leak-free chronological splits with early stopping.</p>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">22,000+</div>
                  <div className="text-sm text-muted">Raw JSON match files parsed into an optimized schema.</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">638K+</div>
                  <div className="text-sm text-muted">Historical PvP stats processed for matchup feature extraction.</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">~63.0%</div>
                  <div className="text-sm text-muted">Real outcome prediction accuracy (Elo + venue + H2H), beating 50% baseline.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Model Breakdown */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface/30 border border-border/50 space-y-3">
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20 uppercase">Model 1</span>
              <h4 className="font-bold text-base">Match Outcome Classifier</h4>
              <p className="text-xs text-muted leading-relaxed">
                Uses format-grouped <strong>LGBMClassifier</strong> (T20, ODI, Test, DOM_LO) predicting outcomes from Elo ratings, rolling head-to-head ratios, and recent venue records.
              </p>
              <div className="text-[10px] font-mono text-muted space-y-1 border-t border-border/30 pt-2.5">
                <p className="text-primary">• Time-respecting train/val splits</p>
                <p className="text-primary">• Symmetric team-swapped training rows</p>
                <p className="text-accent">• ~63% Accuracy / 0.684 AUC</p>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-surface/30 border border-border/50 space-y-3">
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20 uppercase">Model 2</span>
              <h4 className="font-bold text-base">Next-Innings Runs Regressor</h4>
              <p className="text-xs text-muted leading-relaxed">
                Leverages a player-level <strong>LGBMRegressor</strong> predicting runs in their next innings from chronological shift-expanding averages, rolling last-5/10 match metrics, and boundary index scores.
              </p>
              <div className="text-[10px] font-mono text-muted space-y-1 border-t border-border/30 pt-2.5">
                <p className="text-primary">• Non-overlapping player aggregates</p>
                <p className="text-primary">• Early stopping on MAE score</p>
                <p className="text-accent">• Outperforms simple average baseline</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface/30 border border-border/50 space-y-3">
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20 uppercase">Model 3</span>
              <h4 className="font-bold text-base">Dismissal Matchup Regressor</h4>
              <p className="text-xs text-muted leading-relaxed">
                An ensemble regressor mapping historical matchup profiles (batter average/strike-rate/dot-percentage vs bowler economy/strike-rate) to predict long-run dismissal rates.
              </p>
              <div className="text-[10px] font-mono text-muted space-y-1 border-t border-border/30 pt-2.5">
                <p className="text-primary">• 70/15/15 train/val/test splits</p>
                <p className="text-primary">• Static matchup correlation matrix</p>
                <p className="text-accent">• Persisted as joblib and metadata schema</p>
              </div>
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
