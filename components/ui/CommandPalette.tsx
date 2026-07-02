"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

type TerminalState = "IDLE" | "AWAITING_RESUME_CHOICE" | "AWAITING_PROJECT_CHOICE" | "AWAITING_BLOG_CHOICE";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [terminalState, setTerminalState] = useState<TerminalState>("IDLE");
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => {
          if (!open) {
            // Focus on open
            setTimeout(() => inputRef.current?.focus(), 100);
          }
          return !open;
        });
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let output: React.ReactNode = "";

      if (cmd === "cancel" || cmd === "c" || cmd === "exit") {
        setTerminalState("IDLE");
        output = <span className="text-muted">Action cancelled.</span>;
      } 
      else if (terminalState === "AWAITING_RESUME_CHOICE") {
        if (cmd === "1") {
          output = "Loading Software Engineer Profile...";
          setTimeout(() => {
            setIsOpen(false);
            setTerminalState("IDLE");
            router.push("/resume");
          }, 800);
        } else if (cmd === "2") {
          output = "Loading AI/ML Engineer Profile...";
          setTimeout(() => {
            setIsOpen(false);
            setTerminalState("IDLE");
            router.push("/resume");
          }, 800);
        } else {
          output = <span className="text-[#ff5f56]">Invalid choice. Type 1, 2, or 'cancel'.</span>;
        }
      } 
      else if (terminalState === "AWAITING_PROJECT_CHOICE") {
        if (cmd === "1") {
          output = "Navigating to Projects Overview...";
          setTimeout(() => {
            setIsOpen(false);
            setTerminalState("IDLE");
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else router.push("/#projects");
          }, 800);
        } else if (cmd === "2") {
          output = "Navigating to Nexus (Developer Workspace)...";
          setTimeout(() => {
            setIsOpen(false);
            setTerminalState("IDLE");
            router.push("/projects/nexus");
          }, 800);
        } else if (cmd === "3") {
          output = "Navigating to AetherAI (Air Quality Prediction)...";
          setTimeout(() => {
            setIsOpen(false);
            setTerminalState("IDLE");
            router.push("/projects/aetherai");
          }, 800);
        } else {
          output = <span className="text-[#ff5f56]">Invalid choice. Type 1, 2, 3, or 'cancel'.</span>;
        }
      } 
      else if (terminalState === "AWAITING_BLOG_CHOICE") {
        if (cmd === "1") {
          output = "Navigating to All Blogs...";
          setTimeout(() => {
            setIsOpen(false);
            setTerminalState("IDLE");
            router.push("/blog");
          }, 800);
        } else if (cmd === "2") {
          output = "Navigating to AetherAI blog post...";
          setTimeout(() => {
            setIsOpen(false);
            setTerminalState("IDLE");
            router.push("/blog/aetherai-air-quality");
          }, 800);
        } else if (cmd === "3") {
          output = "Navigating to CricSphere blog post...";
          setTimeout(() => {
            setIsOpen(false);
            setTerminalState("IDLE");
            router.push("/blog/cricsphere-architecture");
          }, 800);
        } else {
          output = <span className="text-[#ff5f56]">Invalid choice. Type 1, 2, 3, or 'cancel'.</span>;
        }
      } 
      else {
        // IDLE State Commands
        switch (cmd) {
          case "help":
            output = (
              <div className="space-y-1">
                <p>Available commands:</p>
                <p className="pl-4"><span className="text-primary">home</span>     - Return to the top of the workspace</p>
                <p className="pl-4"><span className="text-primary">projects</span> - View my portfolio projects</p>
                <p className="pl-4"><span className="text-primary">blog</span>     - Read my technical writings</p>
                <p className="pl-4"><span className="text-primary">resume</span>   - Download or view my resume</p>
                <p className="pl-4"><span className="text-primary">contact</span>  - Get in touch with me</p>
                <p className="pl-4"><span className="text-primary">whoami</span>   - About the developer</p>
                <p className="pl-4"><span className="text-primary">clear</span>    - Clear the terminal</p>
              </div>
            );
            break;
          case "home":
            output = "Navigating to home...";
            setTimeout(() => {
              setIsOpen(false);
              window.location.href = "/";
            }, 800);
            break;
          case "projects":
            output = (
              <div className="space-y-1">
                <p>Where would you like to navigate?</p>
                <p className="pl-4"><span className="text-primary">[1]</span> Projects Overview</p>
                <p className="pl-4"><span className="text-primary">[2]</span> Nexus (Developer Workspace)</p>
                <p className="pl-4"><span className="text-primary">[3]</span> AetherAI (Air Quality Prediction)</p>
                <p className="pl-4 text-muted mt-2"><span className="text-secondary">Type 1, 2, or 3, or 'cancel' to abort.</span></p>
              </div>
            );
            setTerminalState("AWAITING_PROJECT_CHOICE");
            break;
          case "blog":
            output = (
              <div className="space-y-1">
                <p>Read a specific post?</p>
                <p className="pl-4"><span className="text-primary">[1]</span> All Blogs</p>
                <p className="pl-4"><span className="text-primary">[2]</span> AetherAI: Predicting Air Quality</p>
                <p className="pl-4"><span className="text-primary">[3]</span> CricSphere: Processing 2M+ matches</p>
                <p className="pl-4 text-muted mt-2"><span className="text-secondary">Type 1, 2, or 3, or 'cancel' to abort.</span></p>
              </div>
            );
            setTerminalState("AWAITING_BLOG_CHOICE");
            break;
          case "resume":
            output = (
              <div className="space-y-1">
                <p>Select a resume profile to view/download:</p>
                <p className="pl-4"><span className="text-primary">[1]</span> Software Engineer</p>
                <p className="pl-4"><span className="text-primary">[2]</span> AI/ML Engineer</p>
                <p className="pl-4 text-muted mt-2"><span className="text-secondary">Type 1 or 2, or 'cancel' to abort.</span></p>
              </div>
            );
            setTerminalState("AWAITING_RESUME_CHOICE");
            break;
          case "contact":
            output = (
              <div className="flex flex-col gap-2">
                <p>Email: bharathulavaibhav@gmail.com</p>
                <a href="https://github.com/Vaibhav-1819" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary underline decoration-border underline-offset-4">GitHub</a>
                <a href="https://linkedin.com/in/vaibhav-bharathula" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary underline decoration-border underline-offset-4">LinkedIn</a>
              </div>
            );
            break;
          case "whoami":
            output = "Vaibhav Bharathula: Software Engineer / AI-ML Engineer. Building intelligent software from data to product.";
            break;
          case "sudo hire ram":
            output = <span className="text-emerald-500 font-bold">Permission granted. Opening resume...</span>;
            setTimeout(() => {
              setIsOpen(false);
              router.push("/resume");
            }, 800);
            break;
          case "coffee":
            output = "Current caffeine level: 78%. Estimated productivity: High.";
            break;
          case "matrix":
            output = "Follow the white rabbit... (matrix effect unlocked!)";
            setTimeout(() => { 
              document.body.style.filter = "hue-rotate(90deg)"; 
              setIsOpen(false);
            }, 500);
            break;
          case "clear":
            setHistory([]);
            setInput("");
            return;
          case "":
            output = "";
            break;
          default:
            output = `Command not found: ${cmd}. Type 'help' to see available commands.`;
        }
      }

      setHistory((prev) => [...prev, { command: input, output, stateAtExecution: terminalState }]);
      setInput("");
    }
  };

  // Helper to render the correct prompt string based on state
  const renderPrompt = (state: TerminalState) => {
    switch(state) {
      case "AWAITING_RESUME_CHOICE":
        return <><span className="text-emerald-500 font-bold">[resume]</span> <span className="text-secondary">$ </span></>;
      case "AWAITING_PROJECT_CHOICE":
        return <><span className="text-emerald-500 font-bold">[projects]</span> <span className="text-secondary">$ </span></>;
      case "AWAITING_BLOG_CHOICE":
        return <><span className="text-emerald-500 font-bold">[blog]</span> <span className="text-secondary">$ </span></>;
      default:
        return (
          <>
            <span className="text-emerald-500 font-bold">workspace@vaibhav</span>
            <span className="text-secondary">:</span>
            <span className="text-primary font-bold">~</span>
            <span className="text-secondary">$ </span>
          </>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-surface border border-border/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-surface/80 border-b border-border/50">
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 flex justify-center items-center gap-2 text-xs font-mono text-muted/60">
                <span>bash - workspace@vaibhav - 80x24</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-muted bg-background px-2 py-1 rounded-md border border-border/50">
                ESC
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 font-mono text-sm space-y-4 max-h-[50vh] overflow-y-auto scrollbar-hide flex-1" onClick={() => inputRef.current?.focus()}>
              {/* Default intro output */}
              <div className="space-y-4 mb-6">
                <p className="text-secondary font-bold uppercase tracking-widest text-xs md:text-sm">
                  Workspace Shell v3.0 (Interactive)
                </p>
                <p className="leading-relaxed text-[13px] md:text-base text-muted">
                  Type <span className="text-primary font-bold">'help'</span> to see a list of available commands.
                </p>
              </div>

              {/* History */}
              {history.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center flex-wrap gap-x-2">
                    {/* @ts-ignore */}
                    {renderPrompt(item.stateAtExecution || "IDLE")}
                    <span className="text-secondary">{item.command}</span>
                  </div>
                  {item.output && <div className="text-muted text-[13px] md:text-sm pb-2">{item.output}</div>}
                </div>
              ))}

              {/* Active Input Prompt */}
              <div className="flex items-center gap-x-2">
                <div className="flex-shrink-0 flex items-center">
                   {renderPrompt(terminalState)}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent border-none outline-none text-secondary caret-primary"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
