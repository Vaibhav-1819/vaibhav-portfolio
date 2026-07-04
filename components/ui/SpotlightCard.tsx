"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}

export function SpotlightCard({ children, className = "", tilt = true }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const mouseXSpring = useSpring(mouseX, { stiffness: 400, damping: 90 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 400, damping: 90 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    x.set(mouseXPos);
    y.set(mouseYPos);
    
    if (tilt) {
      const width = rect.width;
      const height = rect.height;
      const xPct = mouseXPos / width - 0.5;
      const yPct = mouseYPos / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    }
  };
  
  const handleMouseLeave = () => {
    if (tilt) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl border border-border/50 bg-surface/30 overflow-hidden group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 mix-blend-screen"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
        }}
      />
      {/* 3D Inner Wrapper - Add translateZ if tilt is enabled to make child float */}
      <div style={{ transform: tilt ? "translateZ(20px)" : "none" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
