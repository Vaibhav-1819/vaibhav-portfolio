"use client";

import { useState, useEffect } from "react";
import { projects } from "@/content/projects";
import { 
  Database, Network, Server, BrainCircuit, Zap, ArrowRight, 
  Lock, Search, Sparkles, MessageSquare, Terminal, CheckCircle2 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FeaturedBuild() {
  const nexus = projects.find(p => p.slug === 'nexus');

  // Simulator state
  const [activeTab, setActiveTab] = useState<'ai' | 'security' | 'search'>('ai');
  const [aiText, setAiText] = useState(
    "AI Synthesis: Weekly sync completed. Offloaded media routing to Stream edge servers, resolving the WebRTC mesh latency bottleneck. Liveblocks canvas synchronization is operating under sub-10ms intervals with Yjs conflict resolution."
  );
  const [isTyping, setIsTyping] = useState(false);
  const [securityLog, setSecurityLog] = useState<string[]>([
    "[17:53:08] SYSTEM: Multi-tenant organizational security bounds enabled.",
    "[17:53:10] AUTH: Clerk validated session metadata for tenant: org_clerk_019a",
    "[17:53:12] STORAGE: Zero-trust storage rules loaded: Denying client direct writes."
  ]);
  const [searchQuery, setSearchQuery] = useState('multiplayer canvas');
  const [searchResults, setSearchResults] = useState<{ file: string; score: number; match: string }[]>([
    { file: 'LiveblocksCanvas.tsx', score: 98, match: 'Multiplayer room connection using Yjs CRDT synchronization...' },
    { file: 'yjs_sync_provider.ts', score: 91, match: 'Merges local editor transactions conflict-free offline...' },
    { file: 'room_context.tsx', score: 74, match: 'State selector hooks for collaborative cursor updates...' }
  ]);

  // Simulation handlers
  const simulateAi = (type: 'summary' | 'actions') => {
    if (isTyping) return;
    setIsTyping(true);
    setAiText('');
    
    const text = type === 'summary' 
      ? "AI Synthesis: Weekly sync completed. Offloaded media routing to Stream edge servers, resolving the WebRTC mesh latency bottleneck. Liveblocks canvas synchronization is operating under sub-10ms intervals with Yjs conflict resolution."
      : "Action Items Generated:\n• [ ] Harden Firebase signed URL storage expiration to 5m\n• [ ] Implement Pinecone indexing namespace organization filters\n• [ ] Setup Liveblocks webhooks for background semantic sync";
    
    let i = 0;
    const interval = setInterval(() => {
      setAiText(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 10);
  };

  const simulateSecurity = (action: 'grant' | 'revoke') => {
    const timestamp = new Date().toLocaleTimeString();
    if (action === 'grant') {
      setSecurityLog(prev => [
        `[${timestamp}] AUTH: Clerk authenticated workspace user: user_01h8a`,
        `[${timestamp}] SIGNED-URL: Brokered upload handshake for 'design_spec.pdf'`,
        `[${timestamp}] STORAGE: Token authorized for tenant path: /org_sales/uploads`,
        ...prev.slice(0, 5)
      ]);
    } else {
      setSecurityLog(prev => [
        `[${timestamp}] REVOKE: Tenant isolation boundary triggered immediate flush`,
        `[${timestamp}] ZERO-TRUST: Revoked signed-urls for org: org_sales`,
        `[${timestamp}] SESSION: Terminated active tokens on Clerk Organization update`,
        ...prev.slice(0, 5)
      ]);
    }
  };

  const simulateSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    let results: { file: string; score: number; match: string }[] = [];
    if (query === 'multiplayer canvas') {
      results = [
        { file: 'LiveblocksCanvas.tsx', score: 98, match: 'Multiplayer room connection using Yjs CRDT synchronization...' },
        { file: 'yjs_sync_provider.ts', score: 91, match: 'Merges local editor transactions conflict-free offline...' },
        { file: 'room_context.tsx', score: 74, match: 'State selector hooks for collaborative cursor updates...' }
      ];
    } else if (query === 'storage credentials') {
      results = [
        { file: 'firebase_admin_sdk.ts', score: 100, match: 'Admin server-brokered signed upload/download URLs...' },
        { file: 'storage_rules.json', score: 86, match: 'Enforcing Clerk organization workspace path isolation...' }
      ];
    } else {
      results = [
        { file: 'stream_video_sfu.ts', score: 94, match: 'Global edge SFU media router connection parameters...' },
        { file: 'huddle_session.tsx', score: 81, match: 'Audio/Video huddle layouts with sub-50ms latency...' }
      ];
    }
    setSearchResults(results);
  };

  if (!nexus) return null;

  return (
    <section id="featured-build" className="relative py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        
        {/* Apple-style Hero Intro for Nexus */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <ScrollReveal
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-mono uppercase tracking-[0.2em]"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> 
            Featured Case Study
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 
              className="text-4xl md:text-7xl lg:text-[80px] font-heading font-black tracking-[-0.04em] leading-[1.05] text-secondary"
            >
              {nexus.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p 
              className="text-xl text-muted font-light leading-relaxed"
            >
              Traditional communication suites are fragmented (Slack vs. Notion vs. Miro vs. Zoom). I wanted to build an AI-native workspace where huddles, chat, docs, and whiteboards are unified under a single, real-time multiplayer context.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
             <div className="bg-surface/50 rounded-2xl p-4 md:p-6 border border-border/50 flex flex-col items-center md:items-start">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1">
                 <AnimatedNumber value={50} prefix="<" suffix="ms" />
               </p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono text-center md:text-left">Video Latency</p>
             </div>
             <div className="bg-surface/50 rounded-2xl p-4 md:p-6 border border-border/50 flex flex-col items-center md:items-start">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1">
                 <AnimatedNumber value={1080} suffix="p" />
               </p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono text-center md:text-left">HD Resolution</p>
             </div>
              <div className="bg-surface/50 rounded-2xl p-4 md:p-6 border border-border/50 flex flex-col items-center md:items-start">
                <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1">
                  <AnimatedNumber value={100} suffix="%" />
                </p>
                <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono text-center md:text-left">Semantic Search</p>
              </div>
             <div className="bg-surface/50 rounded-2xl p-4 md:p-6 border border-border/50 flex flex-col items-center md:items-start">
               <p className="text-2xl md:text-3xl font-mono font-bold text-secondary mb-1">
                 <span className="font-sans">Zero</span>
               </p>
               <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted font-mono text-center md:text-left">Trust Access</p>
             </div>
          </ScrollReveal>
        </div>

        {/* Massive Hero Image & Details Card */}
        <ScrollReveal
          y={40}
          className="flex flex-col rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5 w-full bg-surface/30"
        >
          {/* Image Section */}
          <div className="relative w-full aspect-video min-h-[300px] md:min-h-[450px]">
            <Image 
              src="/images/nexus.webp" 
              alt="Nexus Collaboration Dashboard" 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" 
            />
            {/* Subtle bottom shadow gradient for smooth transition */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Content Section (Moved out of the absolute overlay to prevent overlapping) */}
          <div className="p-6 md:p-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 bg-surface/50 backdrop-blur-sm border-t border-border/50">
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 md:gap-3 flex-1">
              {nexus.technologies.map(tech => (
                <span key={tech} className="px-3 py-1.5 md:px-4 md:py-2 bg-background border border-border/60 shadow-sm rounded-lg text-[11px] md:text-sm font-mono text-secondary hover:border-primary/40 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center w-full xl:w-auto">
              <Link 
                href="/projects/nexus"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-background text-secondary border border-border/60 text-sm font-semibold hover:border-primary/50 transition-all shrink-0 w-full sm:w-auto shadow-sm"
              >
                View Case Study & Gallery
              </Link>
              {nexus.github && (
                <a 
                  href={nexus.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shrink-0 w-full sm:w-auto shadow-md"
                >
                  GitHub Repository <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* The System Architecture Layer */}
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-secondary tracking-[-0.03em]">System Architecture</h2>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              An intelligent workspace combining real-time edge media with a multiplayer CRDT canvas and secure semantic indexes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal 
              className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-6 hover:border-primary/50 transition-colors group"
            >
              <Network size={32} className="text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl">Edge Media Network</h3>
              <p className="text-muted leading-relaxed">Offloads audio/video routing to Stream global edge networks, maintaining sub-50ms latency for huddles.</p>
            </ScrollReveal>

            <ScrollReveal 
              delay={0.1}
              className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-6 hover:border-accent/50 transition-colors group"
            >
              <BrainCircuit size={32} className="text-accent group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl">Semantic Search Index</h3>
              <p className="text-muted leading-relaxed">Processes canvas edits into Pinecone vector storage via Liveblocks webhooks and Google Gemini embeddings.</p>
            </ScrollReveal>

            <ScrollReveal 
              delay={0.2}
              className="p-8 rounded-3xl bg-surface/30 border border-border/50 space-y-6 hover:border-emerald-500/50 transition-colors group"
            >
              <Server size={32} className="text-emerald-500 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl">Zero-Trust Boundaries</h3>
              <p className="text-muted leading-relaxed">Serverless brokering using Firebase Admin SDK and Clerk tokens to guarantee cross-tenant file isolation.</p>
            </ScrollReveal>
          </div>
        </div>

        {/* Interactive Workspace Simulator */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <ScrollReveal 
            x={-40}
            className="space-y-8"
          >
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-secondary leading-tight">
              Interactive Workspace Control Panel
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              To test the unified nature of Nexus, I built simulation triggers mapping the underlying backend actions. Switch tabs below to execute simulated server actions, checking how AI summarization, semantic querying, and zero-trust tokens respond in real-time.
            </p>
            
            {/* Simulation Tab Selectors */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-mono transition-all font-bold cursor-pointer ${activeTab === 'ai' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface/50 border-border/50 hover:bg-surface text-muted'}`}
              >
                <Sparkles size={16} /> AI Assistant
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-mono transition-all font-bold cursor-pointer ${activeTab === 'security' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'bg-surface/50 border-border/50 hover:bg-surface text-muted'}`}
              >
                <Lock size={16} /> Zero-Trust Auth
              </button>
              <button 
                onClick={() => setActiveTab('search')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-mono transition-all font-bold cursor-pointer ${activeTab === 'search' ? 'bg-accent/10 border-accent text-accent' : 'bg-surface/50 border-border/50 hover:bg-surface text-muted'}`}
              >
                <Search size={16} /> Semantic Search
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal 
            x={40}
            className="relative"
          >
            {/* Terminal Window Mockup */}
            <div className="w-full bg-surface border border-border/60 rounded-3xl shadow-2xl overflow-hidden font-mono text-xs text-secondary/80">
              <div className="flex items-center justify-between px-6 py-4 bg-background/50 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal size={12} />
                  <span>workspace_sandbox_v1.sh</span>
                </div>
              </div>

              <div className="p-6 min-h-[280px] flex flex-col justify-between space-y-6">
                
                {/* AI Assistant Tab View */}
                {activeTab === 'ai' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Gemini 2.5 Flash Engine</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => simulateAi('summary')} 
                          className="px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded font-bold transition-colors cursor-pointer"
                        >
                          Summarize Sync
                        </button>
                        <button 
                          onClick={() => simulateAi('actions')} 
                          className="px-2.5 py-1 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 rounded font-bold transition-colors cursor-pointer"
                        >
                          Get Action Items
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-background/50 border border-border/40 text-secondary leading-relaxed min-h-[140px] whitespace-pre-wrap">
                      {aiText || "Click a simulated task to invoke the Vercel AI SDK pipeline..."}
                      {isTyping && <span className="animate-pulse font-bold text-primary">|</span>}
                    </div>
                  </div>
                )}

                {/* Zero-Trust Auth Tab View */}
                {activeTab === 'security' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Firebase Admin Webhook Log</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => simulateSecurity('grant')} 
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded font-bold transition-colors cursor-pointer"
                        >
                          Broker Token
                        </button>
                        <button 
                          onClick={() => simulateSecurity('revoke')} 
                          className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded font-bold transition-colors cursor-pointer"
                        >
                          Flush Access
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-background/50 border border-border/40 min-h-[140px] space-y-2 overflow-y-auto max-h-[160px] text-[11px]">
                      {securityLog.length === 0 ? (
                        <p className="text-muted italic">Click buttons above to trigger zero-trust storage access simulations.</p>
                      ) : (
                        securityLog.map((log, index) => {
                          const isError = log.includes('REVOKE') || log.includes('ZERO-TRUST');
                          return (
                            <div key={index} className={isError ? "text-red-400" : "text-emerald-400"}>
                              {log}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                {/* Semantic Search Tab View */}
                {activeTab === 'search' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Pinecone Namespace Queries</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => simulateSearch('multiplayer canvas')} 
                        className={`px-3 py-1.5 rounded-lg border text-[11px] transition-colors cursor-pointer ${searchQuery === 'multiplayer canvas' ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-background/40 border-border/50 text-muted'}`}
                      >
                        "multiplayer canvas"
                      </button>
                      <button 
                        onClick={() => simulateSearch('storage credentials')} 
                        className={`px-3 py-1.5 rounded-lg border text-[11px] transition-colors cursor-pointer ${searchQuery === 'storage credentials' ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-background/40 border-border/50 text-muted'}`}
                      >
                        "storage credentials"
                      </button>
                      <button 
                        onClick={() => simulateSearch('media latency')} 
                        className={`px-3 py-1.5 rounded-lg border text-[11px] transition-colors cursor-pointer ${searchQuery === 'media latency' ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-background/40 border-border/50 text-muted'}`}
                      >
                        "media latency"
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-background/50 border border-border/40 min-h-[120px] space-y-3">
                      {searchResults.length === 0 ? (
                        <p className="text-muted italic text-center py-6">Select a search query above to query the vector index.</p>
                      ) : (
                        searchResults.map((res, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between font-bold text-[11px]">
                              <span className="text-primary">{res.file}</span>
                              <span className="text-accent">{res.score}% match</span>
                            </div>
                            <p className="text-[10px] text-muted truncate">{res.match}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
                
                {/* Status Indicator */}
                <div className="flex items-center gap-2 text-[10px] text-muted border-t border-border/30 pt-3 select-none">
                  <CheckCircle2 size={12} className="text-primary animate-pulse" />
                  <span>Sandbox active • Workspace namespace isolation verified</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
