"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import { blogs } from "@/content/blogs";

export default function BlogListingPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center py-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      {/* Back to Home Navigation */}
      <div className="absolute top-24 left-6 md:left-12 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 bg-surface/50 hover:bg-surface border border-border rounded-full text-sm font-mono text-muted hover:text-secondary transition-all backdrop-blur-md"
        >
          <ArrowLeft size={16} />
          <span>Workspace</span>
        </Link>
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center mt-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4 w-full"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
               <BookOpen size={24} className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary tracking-tight">
            Technical <span className="text-primary">Writings</span>
          </h1>
          <p className="text-muted max-w-xl mx-auto font-mono text-sm leading-relaxed">
            Explorations, tutorials, and deep dives into software engineering, artificial intelligence, and modern web architecture.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {[...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              {/* Card */}
              <Link 
                href={`/blog/${post.slug}`}
                className="relative h-full flex flex-col p-8 rounded-3xl bg-surface/80 backdrop-blur-md border border-border overflow-hidden transition-all duration-300 hover:border-primary/40 group-hover:-translate-y-1 block"
              >
                
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-xs font-mono text-muted mb-4">
                  <span className="flex items-center gap-1.5 bg-background px-3 py-1 rounded-full border border-border/50">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-heading font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
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
          ))}
        </div>
      </div>
    </main>
  );
}
