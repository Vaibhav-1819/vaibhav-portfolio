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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = CHARS.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array.from({ length: columns }).map(() => 1);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = Math.random() > 0.95 ? "#ffffff" : "#10b981";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
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

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.25] pointer-events-none" />;
};

type BootPhase = "LOGS" | "DECRYPT" | "GRANTED" | "DONE";

export function LoadingScreen() {
  const [bootPhase, setBootPhase] = useState<BootPhase>("LOGS");
  const [logs, setLogs] = useState<string[]>([]);
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [scrambledName, setScrambledName] = useState("");

  const BOOT_MESSAGES = [
    "[OK] Loading Developer Profile",
    "[OK] Initializing Nexus Services",
    "[OK] Loading AI Models",
    "[OK] Fetching GitHub Activity",
    "[OK] Mounting Workspace",
    "[OK] Starting Portfolio Engine",
    "Loading Modules:",
    "[✓] Projects",
    "[✓] Research",
    "[✓] Resume",
    "[✓] Blog",
    "[✓] AI Playground",
    "System Boot Complete.",
    "Authenticating Identity..."
  ];

  // Phase 1: Terminal Boot Logs
  useEffect(() => {
    // TEMPORARILY DISABLED FOR TESTING
    // const hasVisited = sessionStorage.getItem("hasVisitedV2");
    // if (hasVisited) {
    //   setBootPhase("DONE");
    //   return;
    // }

    if (bootPhase === "LOGS") {
      let index = 0;
      const interval = setInterval(() => {
        setLogs(prev => [...prev, BOOT_MESSAGES[index]]);
        index++;
        if (index >= BOOT_MESSAGES.length) {
          clearInterval(interval);
          setTimeout(() => setBootPhase("DECRYPT"), 500);
        }
      }, 120); // Fast log printing
      return () => clearInterval(interval);
    }
  }, [bootPhase]);

  // Phase 2: Decrypt
  useEffect(() => {
    if (bootPhase === "DECRYPT") {
      let currentProgress = 0;
      
      const decryptInterval = setInterval(() => {
        let newText = "";
        for (let i = 0; i < TARGET_TEXT.length; i++) {
          if (i < currentProgress) {
            newText += TARGET_TEXT[i];
          } else {
            newText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setScrambledName(newText);
      }, 50);

      const progressInterval = setInterval(() => {
        currentProgress++;
        setDecryptProgress(currentProgress);
        if (currentProgress > TARGET_TEXT.length) {
          clearInterval(progressInterval);
          clearInterval(decryptInterval);
          setScrambledName(TARGET_TEXT);
          setTimeout(() => setBootPhase("GRANTED"), 200);
        }
      }, 200); // Decrypt speed per letter
      
      return () => {
        clearInterval(decryptInterval);
        clearInterval(progressInterval);
      };
    }
  }, [bootPhase]);

  // Phase 3: Access Granted
  useEffect(() => {
    if (bootPhase === "GRANTED") {
      setTimeout(() => {
        setBootPhase("DONE");
        // sessionStorage.setItem("hasVisitedV2", "true");
      }, 1200);
    }
  }, [bootPhase]);

  return (
    <AnimatePresence>
      {bootPhase !== "DONE" && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          // Slide upwards while fading out slightly to transition seamlessly
          exit={{ opacity: 0, y: "-100%", transition: { duration: 0.8, ease: [0.7, 0, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-primary font-mono overflow-hidden"
        >
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

          <MatrixRain />
          <div className="absolute inset-0 scanlines mix-blend-overlay z-10" />

          {/* HUD Container */}
          <div className="flex flex-col max-w-xl w-full px-6 relative z-20 h-full justify-center">
            
            {/* Terminal Logs */}
            <div className="flex-1 flex flex-col justify-end min-h-[300px] mb-8">
              <div className="space-y-1.5 text-xs md:text-sm text-emerald-500/90 font-mono text-left max-w-md w-full mx-auto">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {log.startsWith("[✓]") ? (
                      <span className="text-emerald-300 pl-4">{log}</span>
                    ) : log.includes(":") ? (
                      <span className="text-secondary opacity-70">{log}</span>
                    ) : (
                      log
                    )}
                  </motion.div>
                ))}
                {bootPhase === "LOGS" && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }} 
                    className="w-2.5 h-4 bg-emerald-500 inline-block align-middle ml-1" 
                  />
                )}
              </div>
            </div>

            {/* Decrypt Phase */}
            <div className="h-[200px] flex flex-col items-center justify-start">
              {bootPhase !== "LOGS" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 w-full"
                >
                  <span className="text-xs text-muted uppercase tracking-[0.3em]">
                    {bootPhase === "GRANTED" ? "Identity Verified" : "Decrypting Key"}
                  </span>
                  
                  <div className="text-5xl md:text-7xl font-heading font-black tracking-[0.3em] flex items-center justify-center min-h-[80px]">
                    <span className={`
                      ${bootPhase === "GRANTED" ? "text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] glitch-text" : "text-white"}
                    `}>
                      {scrambledName || TARGET_TEXT}
                    </span>
                  </div>

                  <AnimatePresence>
                    {bootPhase === "GRANTED" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg md:text-xl text-emerald-400 font-black tracking-widest text-center px-4 py-1.5 border border-emerald-500/30 bg-emerald-500/10"
                      >
                        ACCESS GRANTED
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
            
          </div>

          {/* White Flash on Completion */}
          <AnimatePresence>
            {bootPhase === "GRANTED" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 bg-emerald-100 mix-blend-overlay z-50 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
