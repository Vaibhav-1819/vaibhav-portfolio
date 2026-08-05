"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight, Search, Activity, Cpu } from "lucide-react";
import { blogs } from "@/content/blogs";

export default function BlogListingPage() {
  const [filter, setFilter] = useState<'All' | 'Real-Time Systems' | 'Machine Learning'>('All');
  const [search, setSearch] = useState("");

  const filteredBlogs = blogs
    .filter(post => {
      const matchCategory = filter === 'All' || post.category === filter;
      const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.description.toLowerCase().includes(search.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      return matchCategory && matchSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen relative flex flex-col items-center pt-24 pb-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-b-border/50">
        <a href="/" className="flex items-center gap-2 text-muted hover:text-primary transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Workspace</span>
        </a>
        <div className="font-heading font-bold text-lg tracking-tighter">Blog</div>
      </nav>

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-4 w-full flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
              <span className="text-secondary">Technical</span> <span className="text-primary">Writings</span>
            </h1>
            <p className="text-muted font-mono text-sm md:text-base leading-relaxed max-w-2xl">
              Explorations, deep dives, and performance telemetry reports on software engineering, artificial intelligence, and systems architectures.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-[280px] shrink-0 animate-fade-in">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-surface/50 border border-border/50 rounded-2xl text-xs text-secondary outline-none focus:border-primary/50 w-full font-mono"
            />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2.5 border-b border-border/20 pb-6 mb-12 w-full justify-start"
        >
          {(['All', 'Real-Time Systems', 'Machine Learning'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                filter === tab 
                  ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5 font-bold' 
                  : 'bg-surface/20 border-border/50 hover:bg-surface text-muted hover:text-secondary'
              }`}
            >
              {tab === 'Real-Time Systems' && <Activity size={12} />}
              {tab === 'Machine Learning' && <Cpu size={12} />}
              {tab === 'All' ? 'All Writings' : tab}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center font-mono text-muted text-sm border border-dashed border-border/50 rounded-3xl w-full"
          >
            No writings found matching your filters.
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((post, index) => {
                const isRealtime = post.category === 'Real-Time Systems';
                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group relative"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    {/* Card */}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="relative h-full flex flex-col p-8 rounded-3xl bg-surface/50 backdrop-blur-md border border-border/60 overflow-hidden transition-all duration-300 hover:border-primary/40 group-hover:-translate-y-1 block cursor-pointer"
                    >
                      {/* Meta Information & Category Tag */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${
                          isRealtime 
                            ? 'bg-primary/10 text-primary border-primary/20' 
                            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        }`}>
                          {post.category}
                        </span>

                        <div className="flex items-center gap-4 text-xs font-mono text-muted">
                          <span className="flex items-center gap-1.5 bg-background px-3 py-1 rounded-full border border-border/50">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-xl font-heading font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2 font-bold">
                        {post.title}
                      </h2>

                      <p className="text-sm text-muted font-mono leading-relaxed mb-8 flex-grow line-clamp-3">
                        {post.description}
                      </p>

                      {/* Footer section with tags & Action */}
                      <div className="flex items-end justify-between mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-muted/90 bg-background px-2.5 py-1 rounded-md border border-border/50">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                             <span className="text-[10px] text-muted/90 bg-background px-2.5 py-1 rounded-md border border-border/50">
                               +{post.tags.length - 2}
                             </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 text-primary text-sm font-bold font-mono tracking-wide opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          Read <ArrowRight size={14} />
                        </div>
                      </div>

                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  );
}
