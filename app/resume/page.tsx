"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowLeft, Eye, X, FileText } from "lucide-react";
import { resumes } from "@/content/resume";

export default function ResumeSelectionPage() {
  const [activeResume, setActiveResume] = useState<typeof resumes[0] | null>(null);

  // Lock body scroll when modal is active to prevent double scrollbars
  useEffect(() => {
    if (activeResume) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeResume]);

  // Escape key listener to close the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveResume(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="min-h-screen relative flex flex-col items-center pt-24 pb-20 px-6 overflow-hidden">
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

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-4 w-full"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Select</span> <span className="text-primary">Resume</span>
          </h1>
          <p className="text-muted font-mono text-sm md:text-base leading-relaxed max-w-2xl">
            Choose the resume that best aligns with your requirements. 
            Each version is tailored to specific roles and technology stacks.
          </p>
        </motion.div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl self-start">
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

                  {/* Actions Grid */}
                  <div className="flex gap-3 w-full mt-auto relative z-10">
                    {/* View Button */}
                    <button 
                      onClick={() => setActiveResume(resume)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-background border border-border hover:border-primary/50 text-secondary hover:text-primary transition-all font-mono text-sm font-bold tracking-wide cursor-pointer"
                    >
                      <Eye size={16} />
                      <span>View Resume</span>
                    </button>

                    {/* Download Button */}
                    <a 
                      href={resume.file} 
                      download={resume.file.split('/').pop()}
                      className="flex items-center justify-center p-3.5 rounded-xl bg-background border border-border hover:border-primary/50 text-secondary hover:text-primary transition-all cursor-pointer group/btn"
                      title="Download instantly"
                    >
                      <Download 
                        size={18} 
                        className="opacity-70 group-hover/btn:opacity-100 group-hover/btn:-translate-y-0.5 transition-all" 
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Immersive PDF Viewer Modal */}
      <AnimatePresence>
        {activeResume && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 md:p-6 lg:p-8">
            {/* Immersive backdrop with custom blur fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveResume(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl cursor-pointer"
            />

            {/* Immersive Header - floats at top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative z-10 w-full max-w-4xl flex items-center justify-between px-4 py-2"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-surface border border-border/50 shadow-inner ${activeResume.iconColor}`}>
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-secondary">{activeResume.title} Resume</h3>
                  <p className="text-[10px] font-mono text-muted">Viewing document in-app</p>
                </div>
              </div>

              {/* Close (Top-Right Shortcut) */}
              <button
                onClick={() => setActiveResume(null)}
                className="p-2 rounded-xl border border-border/50 hover:bg-surface/80 text-muted hover:text-primary transition-colors cursor-pointer md:flex hidden items-center gap-1.5 font-mono text-xs"
              >
                <X size={14} />
                <span>Close (Esc)</span>
              </button>
            </motion.div>

            {/* Immersive Canvas containing the PDF iframe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl flex-1 bg-surface/50 border border-border/80 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(var(--primary-rgb),0.05)] z-10 mt-3 mb-6 flex flex-col"
            >
              {/* Desktop Iframe Viewer */}
              <div className="hidden md:block w-full h-full flex-1">
                <iframe 
                  src={`${activeResume.file}#toolbar=1`}
                  className="w-full h-full border-0 bg-surface/10"
                  title={`${activeResume.title} Resume PDF Viewer`}
                />
              </div>

              {/* Mobile Fallback (Iframes for PDFs are buggy on iOS/Android) */}
              <div className="md:hidden flex flex-col items-center justify-center text-center p-6 flex-1 space-y-4">
                <FileText size={48} className={`opacity-60 ${activeResume.iconColor}`} />
                <h4 className="font-heading font-bold text-lg text-secondary">Ready to View</h4>
                <p className="text-sm text-muted max-w-xs font-mono leading-relaxed">
                  Mobile devices display PDFs best when opened directly. Download it below to view.
                </p>
                <a
                  href={activeResume.file}
                  download={activeResume.file.split('/').pop()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-background font-mono text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
                >
                  <Download size={16} />
                  Download PDF
                </a>
              </div>
            </motion.div>

            {/* Immersive Floating Action Bar - floats at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative z-10 px-6 py-3 rounded-full bg-surface/90 border border-border/80 backdrop-blur-md shadow-2xl flex items-center gap-5"
            >
              {/* Segmented Switcher */}
              <div className="flex bg-background/50 border border-border/50 p-1 rounded-xl">
                {resumes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveResume(r)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                      activeResume.id === r.id
                        ? "bg-primary text-background shadow-md"
                        : "text-muted hover:text-secondary"
                    }`}
                  >
                    {r.id === 'java-developer' ? 'Java Version' : 'AI/ML Version'}
                  </button>
                ))}
              </div>

              <div className="w-[1px] h-6 bg-border/50" />

              {/* Download Icon */}
              <a
                href={activeResume.file}
                download={activeResume.file.split('/').pop()}
                className="p-2.5 rounded-xl border border-border/80 hover:border-primary/50 text-muted hover:text-primary hover:bg-background/40 transition-all cursor-pointer flex items-center justify-center"
                title="Download PDF"
              >
                <Download size={16} />
              </a>

              {/* Close Icon */}
              <button
                onClick={() => setActiveResume(null)}
                className="p-2.5 rounded-xl border border-border/80 hover:border-red-500/50 hover:bg-red-500/10 text-muted hover:text-red-500 transition-all cursor-pointer flex items-center justify-center"
                title="Close Viewer"
              >
                <X size={16} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
