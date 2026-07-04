"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_TEXT = "VAIBHAV";
export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingStates = [
    "Initializing workspace environment...",
    "Booting Nexus WebRTC infrastructure...",
    "Loading CricSphere ML models...",
    "Syncing AetherAI datasets...",
    "Establishing secure WebSocket connection...",
    "Rendering UI components..."
  ];
  
  const currentStateIndex = Math.min(
    Math.floor((progress / 100) * loadingStates.length),
    loadingStates.length - 1
  );
  const currentState = loadingStates[currentStateIndex];

  useEffect(() => {
    // TEMPORARILY DISABLED FOR TESTING
    // const hasVisited = sessionStorage.getItem("hasVisitedV2");
    // if (hasVisited) {
    //   setLoading(false);
    //   return;
    // }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            // sessionStorage.setItem("hasVisitedV2", "true");
          }, 1200); // Wait a bit longer at 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2; // smaller increments
      });
    }, 250); // slower ticks

    return () => clearInterval(interval);
  }, []);



  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-primary font-mono"
        >
          <div className="flex flex-col items-center gap-8 max-w-sm w-full px-6">
            {/* Kinetic Blur Reveal Text */}
            <div className="flex flex-col items-center gap-2 relative">
              <span className="text-xs text-muted uppercase tracking-[0.2em] mb-4">Auth User</span>
              
              <div className="flex items-center justify-center text-4xl md:text-6xl font-heading font-black tracking-widest min-h-[80px]">
                {TARGET_TEXT.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(15px)", opacity: 0, y: 10 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: i * 0.15,
                    }}
                    className={progress === 100 ? "text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-colors duration-500" : "text-secondary"}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="w-full space-y-4 mt-8">
              <div className="h-[2px] w-full bg-surface overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary to-emerald-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
              
              <div className="flex justify-between text-[11px] uppercase tracking-wider text-muted font-mono">
                <span className="animate-pulse">{currentState}</span>
                <span className={progress === 100 ? "text-emerald-500" : ""}>{Math.min(progress, 100)}%</span>
              </div>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
