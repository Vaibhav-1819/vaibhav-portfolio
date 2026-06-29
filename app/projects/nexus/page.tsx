"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Video, MessageSquare, Users, Shield, Server, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";

const project = projects.find(p => p.slug === 'nexus');

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

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5"
        >
          <img src="/images/nexus.webp" alt="Nexus Dashboard" className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>
      </section>

      {/* Engineering Story */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-32">
        
        {/* The Flow: Lobby -> Meeting -> Chat */}
        <div className="space-y-16">
          <h3 className="font-heading font-bold text-3xl md:text-5xl text-center text-secondary">The User Flow</h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Lobby', icon: Shield, desc: 'Firebase Auth & Pre-flight checks.' },
              { title: 'Meeting', icon: Video, desc: 'LiveKit SFU track initialization.' },
              { title: 'Participants', icon: Users, desc: 'Dynamic grid balancing.' },
              { title: 'Chat', icon: MessageSquare, desc: 'Socket.IO real-time overlay.' }
            ].map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-surface/30 border border-border/50 text-center space-y-4 hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform text-primary">
                  <step.icon size={100} />
                </div>
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <step.icon size={24} />
                </div>
                <h4 className="font-bold text-lg">{step.title}</h4>
                <p className="text-sm text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Architecture Change */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
          <div>
            <h3 className="font-heading font-bold text-3xl mb-6">The Mesh vs SFU Migration</h3>
            <p className="text-muted leading-relaxed">
              Initially, I built Nexus using a traditional WebRTC Mesh architecture. It worked perfectly for 3 users. By 6 users, CPU usage spiked and bandwidth collapsed. 
              <br/><br/>
              I architected a migration to a <strong>Selective Forwarding Unit (SFU)</strong> model utilizing LiveKit. Instead of <code>N * (N - 1)</code> connections, the server handles track routing, dropping client-side load massively.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-surface/30 border border-border/50">
            <div className="flex flex-col gap-6 font-mono text-sm">
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted">WebRTC Mesh (Before)</span>
                <span className="text-red-400">O(N²) Connections</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted">LiveKit SFU (After)</span>
                <span className="text-emerald-400">O(N) Connections</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">State Management</span>
                <span className="text-primary">React Context + WebSockets</span>
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
