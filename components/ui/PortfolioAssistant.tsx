"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, MicOff, Volume2, VolumeX, Send, Sparkles, Activity } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "jarvis" | "system" | "command";
  text: string;
  timestamp: Date;
};

// Singleton AudioContext
let audioCtx: AudioContext | null = null;
const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  return audioCtx;
};

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<"cyan" | "red">("cyan");
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "system", text: "SYSTEM INITIALIZED. AWAITING YOUR COMMAND.", timestamp: new Date() }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState("ANALYZING...");
  const [autoScroll, setAutoScroll] = useState(true);

  const recognitionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggleOpen();
      }
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleOpen();
      }
      if (e.key === "/" && isOpen && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Smart Auto-scroll
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setAutoScroll(isNearBottom);
  };

  useEffect(() => {
    if (autoScroll && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isThinking, autoScroll]);

  // Thinking animation cycle
  useEffect(() => {
    if (!isThinking) return;
    const texts = [
      "> INITIALIZING CONTEXT...",
      "> ACCESSING KNOWLEDGE BASE...",
      "> ANALYZING PORTFOLIO...",
      "> PREPARING RESPONSE..."
    ];
    let i = 0;
    setThinkingText(texts[0]);
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setThinkingText(texts[i]);
    }, 800);
    return () => clearInterval(interval);
  }, [isThinking]);

  const playSound = useCallback((type: "click" | "beep" | "startup" | "tick" | "complete") => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "tick") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(1500, now);
        gain.gain.setValueAtTime(0.005, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
        osc.start(now);
        osc.stop(now + 0.02);
      } else if (type === "beep") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "complete") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "startup") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {}
  }, [soundEnabled]);

  const toggleOpen = () => {
    playSound(isOpen ? "click" : "startup");
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setAutoScroll(true);
    }
  };

  const toggleListening = () => {
    playSound("click");
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      addMessage("system", "SPEECH INTERFACE NOT SUPPORTED IN THIS BROWSER.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        const rec = new SpeechRecognitionClass();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => setIsListening(true);
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) submitQuery(transcript);
        };
        rec.onerror = () => setIsListening(false);
        rec.onend = () => setIsListening(false);

        recognitionRef.current = rec;
        rec.start();
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const addMessage = (role: Message["role"], text: string) => {
    setMessages(prev => [...prev, { id: Math.random().toString(36).substring(7), role, text, timestamp: new Date() }]);
  };

  const processCommand = (cmd: string): boolean => {
    const command = cmd.toLowerCase().trim();
    if (command === "/clear") {
      setMessages([{ id: "init", role: "system", text: "SYSTEM CLEARED.", timestamp: new Date() }]);
      return true;
    }
    if (command.startsWith("/theme ")) {
      const newTheme = command.split(" ")[1];
      if (newTheme === "cyan" || newTheme === "red") {
        setTheme(newTheme);
        addMessage("command", `THEME UPDATED TO ${newTheme.toUpperCase()}`);
      } else {
        addMessage("system", "INVALID THEME. AVAILABLE: CYAN, RED.");
      }
      return true;
    }
    if (command === "/resume") {
      addMessage("command", "EXECUTING PROTOCOL: RESUME_DOWNLOAD");
      addMessage("jarvis", "I have prepared Vaibhav's resume. He is a Full Stack Developer specializing in Next.js, React, Node.js, and AI integrations (Google Gemini). You can view the full document by clicking the link below.\n\n[Open Resume in New Tab](/resume.pdf)");
      setTimeout(() => window.open('/resume.pdf', '_blank'), 1500);
      return true;
    }
    if (command === "/projects") {
      addMessage("command", "EXECUTING PROTOCOL: LIST_PROJECTS");
      addMessage("jarvis", "Here are Vaibhav's key projects:\n\n1. **Nexus**: Real-time collaboration platform (Next.js 14, Liveblocks, Gemini).\n2. **AetherAI**: Environmental intelligence (React, FastAPI, XGBoost).\n3. **CricSphere**: Cricket match prediction engine (Python, Next.js).");
      return true;
    }
    if (command === "/help") {
      addMessage("command", "AVAILABLE COMMANDS:\n/resume - View Resume\n/projects - List Projects\n/theme cyan|red - Change HUD color\n/clear - Clear terminal");
      return true;
    }
    return false;
  };

  const submitQuery = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    
    setInput("");
    playSound("click");

    if (trimmed.startsWith("/")) {
      const handled = processCommand(trimmed);
      if (handled) return;
    }

    addMessage("user", trimmed);
    setIsThinking(true);
    setAutoScroll(true);

    try {
      const res = await fetch("/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed })
      });

      setIsThinking(false);

      if (!res.ok) {
        addMessage("system", "NETWORK ERROR. UPLINK FAILED.");
        return;
      }

      if (!res.body) {
        addMessage("system", "NO DATA STREAM DETECTED.");
        return;
      }

      playSound("beep");

      // Setup streaming
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let jarvisText = "";
      const msgId = Math.random().toString(36).substring(7);

      setMessages(prev => [...prev, { id: msgId, role: "jarvis", text: "", timestamp: new Date() }]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          jarvisText += chunk;
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: jarvisText } : m));
          if (Math.random() > 0.5) playSound("tick");
        }
      }
      playSound("complete");
    } catch (error: any) {
      setIsThinking(false);
      addMessage("system", "CRITICAL ERROR OCCURRED DURING NEURAL LINK.");
    }
  };

  const handleQuickAction = (action: string) => {
    submitQuery(action);
  };

  const t = {
    primary: theme === "cyan" ? "text-cyan-400" : "text-red-500",
    border: theme === "cyan" ? "border-cyan-500/80" : "border-red-500/80",
    borderSubtle: theme === "cyan" ? "border-cyan-400/20" : "border-red-500/20",
    bgOuter: theme === "cyan" ? "bg-cyan-950" : "bg-red-950",
    bgSubtle: theme === "cyan" ? "bg-cyan-500/10" : "bg-red-500/10",
    gradientFrom: theme === "cyan" ? "from-cyan-600" : "from-red-600",
    gradientTo: theme === "cyan" ? "to-cyan-900" : "to-red-900",
    shadow: theme === "cyan" ? "shadow-[0_0_15px_rgba(34,211,238,0.5)]" : "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    pulse: theme === "cyan" ? "bg-cyan-100 shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_30px_rgba(34,211,238,1)]" : "bg-red-100 shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_30px_rgba(239,68,68,1)]",
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleOpen}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center group cursor-pointer"
            aria-label="Initialize J.A.R.V.I.S."
          >
            <div className="relative flex items-center justify-center w-14 h-14">
              <div className={`absolute inset-[-4px] rounded-full border border-dashed ${t.borderSubtle} animate-spin`} style={{ animationDuration: '4s' }} />
              <div className={`absolute inset-0 rounded-full border-[3px] ${t.border} ${t.shadow}`} />
              <div 
                className="absolute inset-[2px] rounded-full opacity-90 animate-spin" 
                style={{ 
                  animationDuration: '2s',
                  background: `repeating-conic-gradient(from 0deg, transparent 0deg, transparent 15deg, ${theme === 'cyan' ? 'rgba(34,211,238,0.8)' : 'rgba(239,68,68,0.8)'} 15deg, ${theme === 'cyan' ? 'rgba(34,211,238,0.8)' : 'rgba(239,68,68,0.8)'} 30deg)`,
                  maskImage: 'radial-gradient(circle, transparent 40%, black 60%)',
                  WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 60%)'
                }} 
              />
              <div className={`absolute inset-[5px] rounded-full border-[1.5px] ${t.primary} shadow-sm`} />
              <div className={`absolute inset-[13px] rounded-full ${t.pulse} animate-pulse`} />
              <div className="absolute inset-[18px] rounded-full bg-white blur-[1px]" />
            </div>
            <div className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 pointer-events-none">
              <span className={`font-heading font-bold text-[12px] tracking-[0.2em] ${t.primary} bg-black/80 px-3 py-1.5 rounded-lg border ${t.borderSubtle} whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md translate-x-4 group-hover:translate-x-0`}>
                J.A.R.V.I.S.
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[650px] max-h-[85vh] max-w-[calc(100vw-48px)] flex flex-col bg-zinc-950/70 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-[32px] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="J.A.R.V.I.S. Interface"
          >
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />

            <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-b from-black/50 to-transparent relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-8 h-8">
                  <div className={`absolute inset-0 rounded-full border-[1.5px] ${t.border} shadow-sm`} />
                  <div className="absolute inset-[1px] rounded-full opacity-90 animate-spin-slow" style={{ background: `repeating-conic-gradient(from 0deg, transparent 0deg, transparent 15deg, ${theme === 'cyan' ? 'rgba(34,211,238,0.8)' : 'rgba(239,68,68,0.8)'} 15deg, ${theme === 'cyan' ? 'rgba(34,211,238,0.8)' : 'rgba(239,68,68,0.8)'} 30deg)`, maskImage: 'radial-gradient(circle, transparent 40%, black 60%)', WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 60%)' }} />
                  <div className={`absolute inset-[5px] rounded-full border ${t.borderSubtle}`} />
                  <div className={`absolute inset-[7px] rounded-full ${t.pulse}`} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-heading font-bold text-[15px] text-white tracking-[0.1em] leading-tight">J.A.R.V.I.S.</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${t.bgOuter} animate-pulse shadow-sm`} />
                    <span className="text-[10px] font-medium text-white/50 tracking-wider">CORE ONLINE</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { playSound("click"); setSoundEnabled(!soundEnabled); }} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/5">
                  {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </button>
                <button onClick={toggleOpen} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/5">
                  <X size={15} />
                </button>
              </div>
            </div>

            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-6 pt-2 pb-32 space-y-6 scrollbar-none flex flex-col relative mask-image-bottom z-10" aria-live="polite">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex flex-col gap-1 max-w-[85%]">
                    <div className={`px-5 py-3.5 text-[14px] leading-relaxed ${
                      msg.role === 'user' 
                        ? `bg-gradient-to-br ${t.gradientFrom} ${t.gradientTo} text-white rounded-2xl rounded-br-sm shadow-lg ${t.borderSubtle}` 
                        : msg.role === 'system'
                          ? `${t.bgSubtle} border ${t.borderSubtle} ${t.primary} font-mono text-[11px] uppercase tracking-wider w-full text-center rounded-xl`
                          : msg.role === 'command'
                            ? `bg-black/60 border border-zinc-700 text-zinc-300 font-mono text-[12px] rounded-md`
                            : 'bg-white/5 backdrop-blur-md border border-white/10 text-zinc-100 rounded-2xl rounded-bl-sm shadow-xl'
                    }`}>
                      {msg.role === 'jarvis' && (
                        <div className="flex items-center gap-2 mb-2 opacity-80">
                          <Sparkles size={12} className={t.primary} />
                          <span className={`text-[10px] font-heading font-semibold tracking-[0.15em] uppercase ${t.primary}`}>J.A.R.V.I.S.</span>
                        </div>
                      )}
                      
                      <div className={`prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg max-w-none ${msg.role === 'jarvis' ? 'text-zinc-200' : ''}`}>
                        {msg.role === 'jarvis' ? (
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        ) : (
                          msg.text
                        )}
                      </div>
                    </div>
                    <span className={`text-[9px] text-white/30 px-1 font-mono ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isThinking && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl rounded-bl-sm px-5 py-4 flex items-center gap-3 shadow-xl">
                    <Activity size={14} className={`${t.primary} animate-pulse`} />
                    <span className={`font-mono text-[11px] uppercase tracking-widest ${t.primary}`}>{thinkingText}</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pt-12 z-20">
              <div className="flex gap-2 overflow-x-auto scrollbar-none mb-4 px-1 pb-1">
                {["/projects", "/resume", "Tell me about React", "/theme red"].map(chip => (
                  <button key={chip} onClick={() => handleQuickAction(chip)} className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-[11px] font-medium transition-colors cursor-pointer">
                    {chip}
                  </button>
                ))}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); submitQuery(input); }} className="relative flex items-center gap-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-[20px] p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <button type="button" onClick={toggleListening} className={`p-3 rounded-[16px] transition-all cursor-pointer ${isListening ? `${t.bgSubtle} ${t.primary} ${t.shadow}` : 'bg-transparent text-white/40 hover:text-white hover:bg-white/5'}`}>
                  {isListening ? (
                    <div className="flex gap-0.5 items-center h-4">
                      {[1,2,3,4,5].map(i => (
                        <motion.div key={i} className={`w-0.5 bg-current rounded-full`} animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} />
                      ))}
                    </div>
                  ) : <Mic size={18} />}
                </button>
                
                <div className="relative flex-1">
                  <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message J.A.R.V.I.S... (Press / for commands)" className="w-full bg-transparent border-none pl-2 pr-12 py-3 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:ring-0 transition-all" />
                  <button type="submit" disabled={!input.trim() || isThinking} className={`absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full ${t.bgOuter} text-white shadow-lg hover:scale-105 disabled:opacity-0 disabled:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer`}>
                    <Send size={14} className="ml-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
