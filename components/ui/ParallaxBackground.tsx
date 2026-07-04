"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
      {/* Parallax Grid */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 opacity-20"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </motion.div>

      {/* Parallax Glow */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen"
      />
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen"
      />
      
      {/* Bottom Fade out */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}
