"use client";

import { motion } from "framer-motion";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { resumes } from "@/content/resume";

export default function ResumeSelectionPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <a href="/" className="flex items-center gap-2 text-muted hover:text-primary transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm">Back to Workspace</span>
        </a>
        <div className="font-heading font-bold text-lg tracking-tighter">Resume</div>
      </nav>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary tracking-tight">
            Select <span className="text-primary">Resume</span> Profile
          </h1>
          <p className="text-muted max-w-lg mx-auto font-mono text-sm">
            Choose the resume that best aligns with your requirements. 
            Each version is tailored to specific roles and technology stacks.
          </p>
        </motion.div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {resumes.map((resume, index) => {
            const Icon = resume.icon;
            return (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${resume.color} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                
                {/* Card */}
                <div className="relative h-full flex flex-col p-8 rounded-2xl bg-surface/80 backdrop-blur-sm border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  
                  {/* Decorative corner element */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-background border border-border/50 shadow-inner ${resume.iconColor}`}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-xl font-heading font-bold text-secondary group-hover:text-primary transition-colors">
                      {resume.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted font-mono leading-relaxed mb-8 flex-grow">
                    {resume.description}
                  </p>

                  {/* Download Action */}
                  <a 
                    href={resume.file} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between w-full px-6 py-3 rounded-xl bg-background border border-border hover:border-primary/50 text-secondary hover:text-primary transition-all group/btn"
                  >
                    <span className="font-mono text-sm font-bold tracking-wide">Download PDF</span>
                    <Download 
                      size={18} 
                      className="opacity-70 group-hover/btn:opacity-100 group-hover/btn:-translate-y-0.5 transition-all" 
                    />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
