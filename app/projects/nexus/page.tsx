"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Video, MessageSquare, Users, Shield, Server, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { ProjectGallery } from "@/components/ui/ProjectGallery";

const project = projects.find(p => p.slug === 'nexus');

const nexusImages = [
  "/images/nexus_home.webp"
];

export default function NexusPage() {
  if (!project) return null;

  return (
    <main className="min-h-screen bg-background text-secondary pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <Link href="/" className="flex items-center gap-2 text-muted hover:text-primary transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Workspace</span>
        </Link>
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
            Real-Time Collaboration, Scaled.
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-12">
            As an academic exploration into WebRTC, I built an SFU-based platform using LiveKit. What started as a peer-to-peer mesh experiment evolved into a highly scalable video and chat infrastructure handling complex WebSocket states.
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
              Nexus is a unified communication layer. The vision was to tightly couple real-time, low-latency video and audio streaming with instantaneous text chat—all within a lightweight, highly responsive web interface that doesn't melt your laptop's CPU.
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
              <h4 className="font-bold text-xl">The SFU Migration</h4>
              <p className="text-muted leading-relaxed">
                I initially built Nexus on a traditional WebRTC Mesh architecture. It worked for 3 users, but by 6 users, bandwidth collapsed under <code>O(N²)</code> connections. I migrated the entire pipeline to a Selective Forwarding Unit (SFU) using LiveKit, dropping client load massively to <code>O(N)</code> connections and allowing smooth scaling.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-4">
              <Shield className="text-accent" size={32} />
              <h4 className="font-bold text-xl">State Synchronization</h4>
              <p className="text-muted leading-relaxed">
                Keeping the video layout, mute states, and the Socket.IO chat perfectly in sync required a robust state machine. I decoupled the WebRTC transport layer from the UI using React Context, ensuring that complex media track updates don't cause cascading re-renders across the chat interface.
              </p>
            </div>
          </div>
        </div>

        {/* The Machine Learning Pipeline / Architecture Dashboard */}
        <div className="p-10 rounded-3xl bg-surface border border-border/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-2">Network Architecture</h3>
              <p className="text-muted">Metrics from the core streaming and signaling infrastructure.</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">O(N)</div>
                <div className="text-sm text-muted">WebRTC connection complexity using the LiveKit SFU.</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">Sub-sec</div>
                <div className="text-sm text-muted">Latency on synchronized Socket.IO messaging.</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">JWT</div>
                <div className="text-sm text-muted">Token-based authentication for secure room handshakes.</div>
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
