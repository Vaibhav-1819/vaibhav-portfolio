"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_TEXT = "VAIBHAV";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set exact dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = CHARS.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array.from({ length: columns }).map(() => 1);

    const draw = () => {
      // Create a trailing effect by painting a translucent background
      ctx.fillStyle = "rgba(10, 10, 10, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Paint the characters
      ctx.fillStyle = "#10b981"; // emerald-500
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        // Add random brighter characters
        ctx.fillStyle = Math.random() > 0.95 ? "#ffffff" : "#10b981";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly to create varied rain
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 20); // ~50fps for smoother rain

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.15] pointer-events-none" />;
};

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scrambledText, setScrambledText] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);

  const loadingStates = [
    "Initializing portfolio architecture...",
    "Assembling project data...",
    "Optimizing global state...",
    "Loading interactive components...",
    "Preparing developer workspace...",
    "Welcome to Vaibhav's digital space."
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
          }, 1500); // Give the glitch effect time to play out
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2; 
      });
    }, 150); // fast ticks
    return () => clearInterval(interval);
  }, []);

  // Scramble Text Effect
  useEffect(() => {
    if (loading) {
      const scrambleInterval = setInterval(() => {
        const correctCharsCount = Math.floor((progress / 100) * TARGET_TEXT.length);

        let newText = "";
        let hit100 = false;

        for (let i = 0; i < TARGET_TEXT.length; i++) {
          if (progress >= 100) {
            newText = TARGET_TEXT;
            hit100 = true;
            break;
          }
          if (i < correctCharsCount) {
            newText += TARGET_TEXT[i];
          } else {
            newText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setScrambledText(newText);

        if (hit100) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 600);
          clearInterval(scrambleInterval);
        }
      }, 50); // ultra-fast scramble computation

      return () => clearInterval(scrambleInterval);
    }
  }, [progress, loading]);

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-primary font-mono overflow-hidden"
        >
          {/* Inject inline styles for CRT & Glitch */}
          <style>{`
            @keyframes crt-flicker {
              0% { opacity: 0.95; }
              5% { opacity: 0.85; }
              10% { opacity: 0.95; }
              15% { opacity: 1; }
              100% { opacity: 1; }
            }
            .scanlines {
              background: linear-gradient(
                to bottom,
                rgba(255,255,255,0),
                rgba(255,255,255,0) 50%,
                rgba(0,0,0,0.2) 50%,
                rgba(0,0,0,0.2)
              );
              background-size: 100% 4px;
              pointer-events: none;
              animation: crt-flicker 0.15s infinite;
            }
            @keyframes glitch-anim {
              0% { transform: translate(0); text-shadow: 3px 0 0 #ff003c, -3px 0 0 #00f0ff; }
              20% { transform: translate(-2px, 2px); text-shadow: -3px 0 0 #ff003c, 3px 0 0 #00f0ff; }
              40% { transform: translate(-2px, -2px); text-shadow: 3px 0 0 #00f0ff, -3px 0 0 #ff003c; }
              60% { transform: translate(2px, 2px); text-shadow: -3px 0 0 #ff003c, 3px 0 0 #00f0ff; }
              80% { transform: translate(2px, -2px); text-shadow: -3px 0 0 #00f0ff, 3px 0 0 #ff003c; }
              100% { transform: translate(0); text-shadow: 3px 0 0 #ff003c, -3px 0 0 #00f0ff; }
            }
            .glitch-text {
              animation: glitch-anim 0.2s linear infinite;
            }
          `}</style>

          {/* Matrix Background */}
          <MatrixRain />

          {/* CRT Overlay */}
          <div className="absolute inset-0 scanlines mix-blend-overlay z-10" />

          {/* Main Content */}
          <div className="flex flex-col items-center gap-8 max-w-sm w-full px-6 relative z-20">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted uppercase tracking-[0.2em] mb-2">Developer Profile</span>

              <div className="text-4xl md:text-6xl font-heading font-black tracking-widest flex items-center justify-center min-h-[80px]">
                <span
                  className={`
                    ${progress === 100 ? "text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]" : "text-secondary"}
                    ${isGlitching ? "glitch-text" : ""}
                  `}
                >
                  {scrambledText || "..."}
                </span>
              </div>
            </div>

            <div className="w-full space-y-4 mt-8">
              <div className="h-[2px] w-full bg-surface overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,1)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              <div className="flex justify-between text-[11px] uppercase tracking-wider text-muted font-mono">
                <span className={isGlitching ? "text-emerald-500" : "animate-pulse"}>{currentState}</span>
                <span className={progress === 100 ? "text-emerald-500" : ""}>{Math.min(progress, 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
