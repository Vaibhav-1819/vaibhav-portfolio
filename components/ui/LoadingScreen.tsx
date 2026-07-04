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
          }, 800); // Wait a bit before transition
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2; 
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          // Container fades out and zooms in slightly
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-primary font-mono overflow-hidden"
        >
          <div className="flex flex-col items-center justify-center gap-12 max-w-sm w-full px-6 relative z-20">
            
            {/* The "Flying Through" Text Element */}
            <motion.div 
              className="text-4xl md:text-7xl font-heading font-black tracking-[0.3em] flex items-center justify-center text-white"
              initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              // Massive scale-up on exit to simulate flying through the screen
              exit={{ 
                scale: 25, 
                opacity: 0, 
                filter: "blur(10px)",
                transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
              }}
            >
              {TARGET_TEXT}
            </motion.div>

            {/* Minimal Progress Bar (Fades out earlier than the text) */}
            <motion.div 
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              className="w-full space-y-4 absolute bottom-12 left-1/2 -translate-x-1/2 px-8 max-w-sm"
            >
              <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted font-mono mb-2">
                <span className="opacity-70">{currentState}</span>
                <span className={progress === 100 ? "text-emerald-500" : ""}>{Math.min(progress, 100)}%</span>
              </div>
              <div className="h-[1px] w-full bg-white/10 overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-emerald-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
