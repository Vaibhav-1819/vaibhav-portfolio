"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") setCurrentIndex((prev) => Math.max(0, prev - 1));
        if (e.key === "ArrowRight") setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxIndex, images.length]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
        if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [lightboxIndex, images.length]);

  const lastWheelTime = useRef(0);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    const swipePower = Math.abs(swipe) * velocity.x;

    if (swipe < -50 || swipePower < -500) {
      setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
    } else if (swipe > 50 || swipePower > 500) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only capture horizontal scroll or mostly horizontal scroll
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return; // Debounce

      if (e.deltaX > 20) {
        setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
        lastWheelTime.current = now;
      } else if (e.deltaX < -20) {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
        lastWheelTime.current = now;
      }
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Coverflow Section */}
      <div className="w-full flex flex-col items-center overflow-hidden py-12 bg-surface/10 border-y border-border/50 rounded-3xl touch-pan-y">
        <motion.div 
          className="relative w-full max-w-7xl h-[300px] sm:h-[400px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          onWheel={handleWheel}
        >
              {images.map((img, i) => {
                const offset = i - currentIndex;
                const absOffset = Math.abs(offset);
                const isCenter = offset === 0;
                
                // Hide items that are too far away to improve performance and visuals
                if (absOffset > 3) return null;

                const zIndex = images.length - absOffset;
                // Calculate rotation: left items face right, right items face left
                const rotateY = isCenter ? 0 : offset < 0 ? 50 : -50;
                // Calculate position shift
                const x = offset * 25; // Percentage based shift
                const scale = isCenter ? 1 : 1 - (absOffset * 0.15);
                const opacity = isCenter ? 1 : 1 - (absOffset * 0.2);

                return (
                  <motion.div
                    key={img}
                    initial={false}
                    animate={{
                      rotateY,
                      x: `${x}%`,
                      scale,
                      opacity,
                      zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={() => {
                      if (isCenter) {
                        setLightboxIndex(i); // Open lightbox if clicking active item
                      } else {
                        setCurrentIndex(i); // Bring to center if clicking side item
                      }
                    }}
                    className={`absolute w-[95%] md:w-[80%] max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden border-2 shadow-2xl border-border/50 ${isCenter ? 'cursor-zoom-in' : 'cursor-pointer'} bg-surface`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={img}
                      alt={`${title} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={isCenter}
                      className="object-cover select-none pointer-events-none"
                    />
                    
                    {/* Darken side items */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-background/50 transition-opacity" />
                    )}

                    {/* Maximize Icon on Hover for Center Item */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-background/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="p-4 bg-primary rounded-full text-primary-foreground transform scale-90 hover:scale-100 transition-transform">
                          <Maximize2 size={24} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-surface border border-border/50 text-secondary hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="font-mono text-sm text-muted">
            {currentIndex + 1} / {images.length}
          </div>

          <button
            onClick={() => setCurrentIndex(prev => Math.min(images.length - 1, prev + 1))}
            disabled={currentIndex === images.length - 1}
            className="p-3 rounded-full bg-surface border border-border/50 text-secondary hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Full-screen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setLightboxIndex(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl h-[95vh] mx-4 flex flex-col"
            >
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-3 rounded-full bg-surface/50 backdrop-blur border border-border/50 text-muted hover:text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, filter: "blur(10px)", x: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                    exit={{ opacity: 0, filter: "blur(10px)", x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center p-4 md:p-12 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = offset.x;
                      const swipePower = Math.abs(swipe) * velocity.x;
                      
                      if (swipe < -50 || swipePower < -500) {
                        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
                      } else if (swipe > 50 || swipePower > 500) {
                        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
                      }
                    }}
                  >
                    <Image
                      src={images[lightboxIndex]}
                      alt={`${title} screenshot ${lightboxIndex + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain rounded-xl drop-shadow-2xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null)); }}
                      className="absolute left-4 p-4 rounded-full bg-background/80 backdrop-blur border border-border/50 text-secondary hover:text-primary hover:bg-background transition-all group z-20 shadow-xl"
                    >
                      <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null)); }}
                      className="absolute right-4 p-4 rounded-full bg-background/80 backdrop-blur border border-border/50 text-secondary hover:text-primary hover:bg-background transition-all group z-20 shadow-xl"
                    >
                      <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}
              </div>
              
              <div className="text-center p-4 text-muted font-mono text-sm z-10">
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
