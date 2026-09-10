"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, BrainCircuit, Activity, Database, ArrowRight, Zap, ShieldCheck, BookOpen, ExternalLink, Award } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { CampusPulseContributors } from "@/components/ui/CampusPulseContributors";

const project = projects.find(p => p.slug === 'campuspulse-ai');

const campusPulseImages = [
  "/images/campuspulse_landing.png",
  "/images/campuspulse_student.png",
  "/images/campuspulse_admin.png"
];

export default function CampusPulsePage() {
  const router = useRouter();
  if (!project) return null;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
      router.back();
    } else {
      router.push('/#projects');
    }
  };

  return (
    <main className="min-h-screen bg-background text-secondary pb-32">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <a href="/#projects" onClick={handleBack} className="flex items-center gap-2 text-muted hover:text-primary transition-colors group cursor-pointer">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Workspace</span>
        </a>
        <div className="font-heading font-bold text-lg tracking-tighter">CampusPulse AI</div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono mb-8 uppercase tracking-widest font-bold">
            <Award size={14} />
            <span>IBM SkillsBuild Project Submission</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
            Campus Intelligence.
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-12 font-mono">
            An explainable real-time incident intelligence engine that transforms uncoordinated student complaints into correlated, prioritized, and actionable infrastructure incidents.
          </p>

          <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-muted mb-16">
            {project.technologies.map(tech => (
              <span key={tech} className="px-3.5 py-1.5 border border-border/50 rounded-lg bg-surface/30">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Project Screenshots Gallery */}
        <div className="mt-8">
          <ProjectGallery images={campusPulseImages} title="CampusPulse AI" />
        </div>
      </section>

      {/* Deep Dive Case Study */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-32">

        {/* The Problem & The Vision */}
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-3xl">The Core Challenge</h3>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />
          <div className="prose prose-invert max-w-none text-muted leading-relaxed text-base md:text-lg space-y-6 font-mono">
            <p>
              When campus infrastructure breaks down—whether it is a severed fiber link in a computer science lab or an AC compressor failure in the library—administrators rarely get an actionable diagnostic alert. Instead, they get dozens of fragmented complaints across WhatsApp, student union emails, and verbal grievances.
            </p>
            <p>
              CampusPulse AI was engineered for our <strong>IBM SkillsBuild learning plan project submission</strong> to resolve this breakdown. Rather than treating symptoms with duplicate tickets, our platform correlates reports across space, time, semantics, and category to surface root incidents, detect emerging surges, and prescribe immediate facilities remediation.
            </p>
          </div>
        </div>

        {/* Engineering Highlights */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="font-heading font-bold text-3xl mb-4">Architectural Innovations</h3>
            <p className="text-muted max-w-2xl mx-auto font-mono text-sm">
              Engineered with a hybrid architecture combining generative language understanding with deterministic mathematical correlation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <BrainCircuit className="text-primary" size={32} />
              <h4 className="font-bold text-xl font-heading">Dual-Tier Resilient AI</h4>
              <p className="text-muted leading-relaxed text-sm font-mono">
                Leverages Google Gemini 1.5 Flash for strict JSON schema entity extraction and 768-dimensional vector embeddings, backed by a deterministic, zero-dependency offline mock service that ensures 100% resilience during live operations.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Zap className="text-emerald-400" size={32} />
              <h4 className="font-bold text-xl font-heading">4-Factor Correlation Math</h4>
              <p className="text-muted leading-relaxed text-sm font-mono">
                Evaluates incoming complaints against active incidents using a transparent formula combining semantic cosine similarity (55%), building location matching (20%), cross-domain category links (15%), and temporal decay (10%).
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Activity className="text-amber-400" size={32} />
              <h4 className="font-bold text-xl font-heading">Emerging Surge Detection</h4>
              <p className="text-muted leading-relaxed text-sm font-mono">
                Monitors report arrival velocity to detect rapid crises (such as water main breaks or power failures), automatically elevating priority and triggering visual red alert banners on the dispatch dashboard.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <ShieldCheck className="text-cyan-400" size={32} />
              <h4 className="font-bold text-xl font-heading">Transparent AI Explainability</h4>
              <p className="text-muted leading-relaxed text-sm font-mono">
                Every grouped report generates an audit-ready, plain-English justification explaining why reports were linked, ensuring facilities dispatchers always have verifiable operational context.
              </p>
            </div>
          </div>
        </div>

        {/* Neural Architecture & Performance Telemetry */}
        <div className="p-10 rounded-3xl bg-surface border border-border/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-2">Performance & Verification Telemetry</h3>
              <p className="text-muted font-mono text-sm">Automated testing and algorithmic precision metrics.</p>
            </div>

            <div className="grid sm:grid-cols-4 gap-6 font-mono">
              <div className="p-4 rounded-2xl bg-background/50 border border-border/40">
                <div className="text-3xl font-bold text-primary mb-1">19 / 19</div>
                <div className="text-xs text-muted">Automated test suites passing across unit math and REST integration.</div>
              </div>
              <div className="p-4 rounded-2xl bg-background/50 border border-border/40">
                <div className="text-3xl font-bold text-emerald-400 mb-1">≥ 0.68</div>
                <div className="text-xs text-muted">Deterministic clustering threshold for automated incident grouping.</div>
              </div>
              <div className="p-4 rounded-2xl bg-background/50 border border-border/40">
                <div className="text-3xl font-bold text-indigo-400 mb-1">&lt; 350ms</div>
                <div className="text-xs text-muted">End-to-end inference and embedding latency per report submission.</div>
              </div>
              <div className="p-4 rounded-2xl bg-background/50 border border-border/40">
                <div className="text-3xl font-bold text-amber-400 mb-1">0%</div>
                <div className="text-xs text-muted">External DB overhead with zero-dependency SQLite 3 (WAL mode).</div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Contributors & Ownership */}
        <section className="space-y-6">
          <CampusPulseContributors />
        </section>

        {/* Read the Engineering Deep Dive */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-surface/60 to-accent/10 border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
              <BookOpen size={14} />
              <span>Technical Writing Series</span>
            </div>
            <h4 className="text-xl font-heading font-bold text-secondary">
              Read the 2-Part Engineering Deep Dive
            </h4>
            <p className="text-xs md:text-sm text-muted font-mono">
              Dive into the code, formulas, git merge conflict resolution, and architectural decisions behind CampusPulse AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/blog/campuspulse-part1-foundation-admin-intelligence"
              className="px-4 py-2.5 rounded-xl bg-primary text-background font-mono text-xs font-bold hover:bg-primary/90 transition-all text-center"
            >
              Part 1: Foundation
            </Link>
            <Link
              href="/blog/campuspulse-part2-student-portal-unification"
              className="px-4 py-2.5 rounded-xl bg-surface border border-border/60 hover:bg-surface/80 text-secondary font-mono text-xs font-bold transition-all text-center"
            >
              Part 2: Portal Unification
            </Link>
          </div>
        </div>

      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 text-center border-t border-border/50">
        <h2 className="text-3xl font-heading font-bold mb-4">Inspect the code.</h2>
        <p className="text-muted font-mono text-sm max-w-md mx-auto mb-8">
          The complete open-source repository including the Express API, SQLite migrations, and React 19 UI is available on GitHub.
        </p>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface border border-border hover:border-primary transition-colors font-mono text-sm font-bold shadow-lg"
          >
            <span>GitHub Repository</span>
            <ExternalLink size={16} />
          </a>
        )}
      </section>
    </main>
  );
}
