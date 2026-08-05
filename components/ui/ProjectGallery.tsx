"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2, Eye } from "lucide-react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation for Lightbox and Carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  // Scroll active thumbnail into view inside lightbox
  useEffect(() => {
    if (!isOpen) return;
    const activeThumb = thumbnailRefs.current[activeIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex, isOpen]);

  if (!images || images.length === 0) return null;

  // Convert raw image paths to clean, human-readable labels
  const getLabelFromPath = (path: string) => {
    const fileName = path.split('/').pop()?.split('.')[0] || '';
    let clean = fileName
      .replace(/^[a-z]+_/, '') // remove prefix (e.g. 'nexus_', 'cricsphere_')
      .replace(/_/g, ' ');    // replace underscores with spaces
    
    clean = clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const lower = clean.toLowerCase();
    if (lower === 'nexus' || lower === 'cricsphere' || lower === 'aetherai' || lower === 'cricsphere landing') {
      return "Overview";
    }
    return clean;
  };

  const navigate = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 space-y-6">
      
      {/* Interactive Main Carousel Frame */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-border/50 bg-surface/30 shadow-2xl group flex items-center justify-center">
        
        {/* Navigation arrows (hidden on mobile, visible on hover) */}
        <div className="absolute left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="p-3 rounded-full bg-background/80 hover:bg-background text-secondary border border-border/50 shadow-xl transition-all active:scale-90 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="absolute right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="p-3 rounded-full bg-background/80 hover:bg-background text-secondary border border-border/50 shadow-xl transition-all active:scale-90 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={20} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Image container */}
        <div 
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 z-0 cursor-pointer overflow-hidden"
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 0.98, x: direction * 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -direction * 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt={`${title} screenshot preview ${activeIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>



        {/* Top-Right expand indicator button */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 text-secondary hover:text-primary transition-colors shadow z-10 cursor-pointer"
          aria-label="Expand image"
        >
          <Maximize2 size={16} />
        </button>

        {/* Bottom-Left metadata badge */}
        <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-background/85 backdrop-blur-md border border-border/50 shadow-xl z-10 flex items-center gap-2">
          <span className="text-primary font-mono font-bold text-xs">
            {String(activeIndex + 1).padStart(2, '0')}.
          </span>
          <span className="text-xs font-heading font-bold text-secondary uppercase tracking-wider">
            {getLabelFromPath(images[activeIndex])}
          </span>
        </div>

        {/* Bottom-Right page indicator */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 text-[10px] font-mono text-muted font-bold shadow z-10">
          {activeIndex + 1} / {images.length}
        </div>

      </div>



      {/* Lightbox Immersive Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col justify-between p-6 select-none"
            onClick={() => setIsOpen(false)}
          >
            {/* Top Navigation Bar */}
            <div className="w-full flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-muted uppercase tracking-[0.25em] font-bold">
                  {title} Workspace Gallery
                </span>
                <span className="text-sm font-heading font-bold text-secondary mt-1 flex items-center gap-1.5">
                  <span className="text-primary font-mono text-sm">{String(activeIndex + 1).padStart(2, '0')}.</span>
                  <span>{getLabelFromPath(images[activeIndex])}</span>
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[11px] font-mono text-muted bg-surface/50 border border-border/50 px-3 py-1.5 rounded-full font-bold">
                  {activeIndex + 1} / {images.length}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-full bg-surface/50 hover:bg-surface border border-border/50 text-secondary hover:text-primary transition-all active:scale-95 cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Central Image Viewer */}
            <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center py-4 my-2">
              <div className="absolute left-0 md:left-4 z-10" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={handlePrev}
                  className="p-3.5 rounded-full bg-surface/80 hover:bg-surface text-secondary hover:text-primary backdrop-blur-md border border-border/50 shadow-2xl transition-all active:scale-90 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} className="stroke-[2.5]" />
                </button>
              </div>

              <div
                className="relative w-full h-full max-h-[68vh] aspect-video rounded-2xl overflow-hidden border border-border/40 bg-surface/10 shadow-2xl shadow-black/80"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 80 }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[activeIndex]}
                      alt={`${title} view detail`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute right-0 md:right-4 z-10" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={handleNext}
                  className="p-3.5 rounded-full bg-surface/80 hover:bg-surface text-secondary hover:text-primary backdrop-blur-md border border-border/50 shadow-2xl transition-all active:scale-90 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} className="stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Bottom Scrollable Thumbnails List */}
            <div
              className="w-full max-w-2xl mx-auto py-2 border-t border-border/30 overflow-x-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5 mx-auto justify-start md:justify-center min-w-max px-4">
                {images.map((img, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={`lightbox-thumb-${img}`}
                      ref={(el) => { thumbnailRefs.current[i] = el; }}
                      onClick={() => navigate(i)}
                      className={`relative flex-shrink-0 h-11 w-18 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        isActive ? "border-primary opacity-100 scale-105 shadow-md shadow-primary/20" : "border-border/50 opacity-40 hover:opacity-75"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${title} preview thumbnail ${i + 1}`}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

