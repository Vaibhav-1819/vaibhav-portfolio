"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Video, MessageSquare, Users, Shield, Server, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { TelemetryDashboard } from "@/components/ui/TelemetryDashboard";

const project = projects.find(p => p.slug === 'nexus');

const nexusImages = [
  "/images/nexus.webp",
  "/images/nexus_dashboard.webp",
  "/images/nexus_inbox.webp",
  "/images/nexus_workspace.webp",
];

export default function NexusPage() {
  const router = useRouter();
  if (!project) return null;

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
        <a href="/#projects" onClick={handleBack} className="flex items-center gap-2 text-muted hover:text-primary transition-colors group cursor-pointer">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Workspace</span>
        </a>
        <div className="font-heading font-bold text-lg tracking-tighter">Nexus</div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono mb-8 uppercase tracking-widest">
            Case Study • Real-Time Systems
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8">
            Enterprise Collaboration, Unified.
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-12">
            Nexus is a comprehensive workspace built on Next.js 14. What started as an exploration into real-time systems evolved into an enterprise-grade platform featuring HD video meetings, context-aware AI assistants, universal semantic search, and zero-trust security using Stream, Clerk, and Google Gemini.
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
          <ProjectGallery images={nexusImages} title="Nexus" />
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
              In an era of remote work, seamless collaboration is non-negotiable. Yet, many conferencing platforms feel bloated, resource-heavy, and disconnected from the asynchronous tools we use daily. I built Nexus to challenge this standard.
            </p>
            <p>
              Nexus is a unified communication layer. The vision was to tightly couple real-time, low-latency HD video with persistent, threaded text chat—all within a lightning-fast web interface built on the Next.js 14 App Router that feels native and responsive.
            </p>
          </div>
        </div>

        {/* Engineering Challenges */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="font-heading font-bold text-3xl mb-4">Engineering the Engine</h3>
            <p className="text-muted max-w-2xl mx-auto">
              Building a synchronous real-time app forces you to confront the realities of network latency, browser resource limits, and state synchronization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Zap className="text-emerald-500" size={32} />
              <h4 className="font-bold text-xl">Global Edge Infrastructure</h4>
              <p className="text-muted leading-relaxed">
                Instead of managing low-level WebRTC SFUs from scratch, I leveraged the <strong>Stream Video and Chat SDKs</strong>. This offloaded the heavy lifting of global media routing, allowing the platform to deliver crystal-clear 1080p video and spatial audio with sub-50ms latency across regions.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Shield className="text-accent" size={32} />
              <h4 className="font-bold text-xl">Zero-Trust Architecture</h4>
              <p className="text-muted leading-relaxed">
                Enterprise tools demand strict access control. By integrating <strong>Clerk</strong> and a server-brokered approach for <strong>Firebase Storage</strong> using the Admin SDK, all files are requested via temporary signed URLs with 5-minute TTLs. Tests demonstrate that updating or deleting memberships cuts off storage access with an propagation latency of <strong>~1.1s</strong>.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Users className="text-yellow-500" size={32} />
              <h4 className="font-bold text-xl">Multiplayer CRDT Canvas</h4>
              <p className="text-muted leading-relaxed">
                We integrated <strong>Yjs CRDTs</strong> and <strong>Liveblocks</strong> to drive real-time multiplayer states. Whether typing rich text or drawing whiteboard components, user actions merge conflict-free locally before syncing, guaranteeing high performance even offline.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Server className="text-blue-500" size={32} />
              <h4 className="font-bold text-xl">Universal Semantic Search</h4>
              <p className="text-muted leading-relaxed">
                We built a dual-engine workspace-isolated search. Document embeddings are generated via <code>gemini-embedding-001</code>. If our external Pinecone index is disabled, the server executes an in-memory cosine similarity fallback across all documents in just <strong>0.36 ms (mean)</strong>, synthesized by <code>gemini-2.5-flash</code>.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <MessageSquare className="text-purple-500" size={32} />
              <h4 className="font-bold text-xl">Context-Aware AI</h4>
              <p className="text-muted leading-relaxed">
                Powered by the <strong>Vercel AI SDK</strong> and <code>gpt-4o-mini</code>, Nexus includes a floating context assistant that reads your active canvas to summarize or analyze data. It also aggregates the past 24 hours of workspace activity into a daily cached brief to keep the whole team aligned.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Video className="text-orange-500" size={32} />
              <h4 className="font-bold text-xl">Phase 5 Parity Features</h4>
              <p className="text-muted leading-relaxed">
                Designed for scale, the architecture outlines one-to-many <strong>Webinars</strong> with registration workflows, dynamic <strong>Breakout Rooms</strong> for splitting calls, and persistent <strong>Voice Channels</strong> for drop-in drop-out audio cooperation.
              </p>
            </div>
          </div>
        </div>

        {/* Telemetry & Performance benchmarks */}
        <TelemetryDashboard />

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
