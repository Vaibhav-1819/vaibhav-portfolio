"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dragWidth, setDragWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Recalculate drag constraint whenever active thumbnail size changes
  useEffect(() => {
    const recalc = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        setDragWidth(Math.max(0, trackWidth - containerWidth));
      }
    };
    recalc();
    const t = setTimeout(recalc, 350);
    return () => clearTimeout(t);
  }, [images, activeIndex]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[activeIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { setDirection(-1); setActiveIndex((p) => (p - 1 + images.length) % images.length); }
      if (e.key === "ArrowRight") { setDirection(1); setActiveIndex((p) => (p + 1) % images.length); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  const navigate = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const handlePrev = () => navigate((activeIndex - 1 + images.length) % images.length);
  const handleNext = () => navigate((activeIndex + 1) % images.length);

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) handleNext();
    else if (info.offset.x > 50) handlePrev();
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "8%" : "-8%", opacity: 0 }),
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? "8%" : "-8%", opacity: 0, zIndex: 0 }),
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none py-4">

      {/* Count at the top */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] font-mono text-muted uppercase tracking-widest font-bold">{title} Gallery</span>
        <span className="text-[10px] font-mono text-muted bg-surface/50 border border-border/50 px-2.5 py-1 rounded-full font-bold">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Draggable Thin Expanding Thumbnails — above the viewer */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing mb-3 py-1"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ right: 0, left: -dragWidth }}
          dragElastic={0.12}
          dragMomentum={true}
          className="flex items-center justify-center gap-1.5"
          style={{ width: "max-content", margin: "0 auto" }}
        >
          {images.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.button
                layout
                key={img}
                ref={(el) => { thumbnailRefs.current[i] = el; }}
                onClick={() => navigate(i)}
                animate={{
                  width: isActive ? 80 : 44,
                  opacity: isActive ? 1 : 0.38,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="relative flex-shrink-0 h-7 rounded-lg overflow-hidden border border-border/40 hover:opacity-70 cursor-pointer"
                style={{ minWidth: 0 }}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover pointer-events-none select-none"
                />
                {isActive && (
                  <motion.div
                    layoutId="thumb-border"
                    className="absolute inset-0 border-2 border-primary rounded-lg z-10 pointer-events-none"
                    transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Fixed-height Image Viewer */}
      <div className="relative w-full h-[360px] overflow-hidden rounded-2xl border border-border/60 bg-surface/30 shadow-[0_16px_40px_rgba(0,0,0,0.4)] group">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} screenshot ${activeIndex + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover pointer-events-none select-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Internal faded Prev arrow */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="p-2 rounded-full bg-background/50 hover:bg-background/80 text-secondary/80 hover:text-primary backdrop-blur-md border border-white/10 shadow-lg transition-all active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Internal faded Next arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="p-2 rounded-full bg-background/50 hover:bg-background/80 text-secondary/80 hover:text-primary backdrop-blur-md border border-white/10 shadow-lg transition-all active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight size={18} className="stroke-[2.5]" />
          </button>
        </div>
      </div>


    </div>
  );
}
