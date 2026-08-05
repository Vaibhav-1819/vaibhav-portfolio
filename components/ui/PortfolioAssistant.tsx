"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, MicOff, Volume2, VolumeX, Send, BrainCircuit, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "jarvis" | "system";
  text: string;
};

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", text: "J.A.R.V.I.S. ONLINE. AT YOUR SERVICE, SIR." }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Audio Synthesis
  const playSound = (type: "click" | "beep" | "startup") => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "beep") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "startup") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // Audio blocked
    }
  };

  const toggleOpen = () => {
    playSound(isOpen ? "click" : "startup");
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  };

  const toggleListening = () => {
    playSound("click");
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setMessages(prev => [...prev, { role: "system", text: "SPEECH INTERFACE NOT SUPPORTED IN THIS BROWSER." }]);
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

        rec.onstart = () => {
          setIsListening(true);
          playSound("beep");
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            submitQuery(transcript);
          }
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

  const submitQuery = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: trimmed }]);
    setIsThinking(true);
    playSound("click");

    try {
      const res = await fetch("/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed })
      });
      
      const data = await res.json();
      setIsThinking(false);
      
      if (res.ok && data.reply) {
        playSound("beep");
        setMessages(prev => [...prev, { role: "jarvis", text: data.reply }]);
      } else {
        throw new Error(data.error || "Unknown API error");
      }
    } catch (err: any) {
      setIsThinking(false);
      setMessages(prev => [...prev, { role: "system", text: `WARNING // UPLINK FAILED: ${err.message || err}` }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(input);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleOpen}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3.5 pr-4 rounded-full bg-black/80 backdrop-blur-md border border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.3)] text-red-500 hover:bg-red-500/10 transition-all duration-300 group cursor-pointer overflow-hidden"
            aria-label="Initialize J.A.R.V.I.S."
          >
            <div className="relative flex items-center justify-center w-9 h-9">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              {/* Spinning inner dashed ring */}
              <div className="absolute inset-[2px] rounded-full border-[1.5px] border-dashed border-red-400/80 animate-spin" style={{ animationDuration: '8s' }} />
              {/* Secondary spinning ring */}
              <div className="absolute inset-[4px] rounded-full border border-t-red-500 border-r-transparent border-b-red-500/30 border-l-transparent animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
              {/* Inner glowing core */}
              <div className="absolute inset-[7px] rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)] blur-[0.5px] group-hover:bg-red-400 transition-colors duration-300" />
              <div className="absolute inset-[10px] rounded-full bg-white opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Expandable text on hover */}
            <div className="w-0 overflow-hidden group-hover:w-[72px] transition-all duration-300 ease-out">
              <span className="font-heading font-bold text-[11px] tracking-[0.2em] text-red-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                J.A.R.V.I.S.
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main J.A.R.V.I.S. Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] max-h-[85vh] max-w-[calc(100vw-48px)] flex flex-col bg-background/60 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-red-500/10 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                  {/* Spinning dashed ring */}
                  <div className="absolute inset-[2px] rounded-full border border-dashed border-red-400/70 animate-spin" style={{ animationDuration: '6s' }} />
                  {/* Core */}
                  <div className="absolute inset-[6px] rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <div className="absolute inset-[8px] rounded-full bg-white opacity-80" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-red-500 tracking-[0.2em]">J.A.R.V.I.S.</h3>
                  <p className="text-[10px] font-mono text-red-500/60 uppercase tracking-wider">System Online</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => { playSound("click"); setSoundEnabled(!soundEnabled); }}
                  className="p-2 rounded-full hover:bg-white/5 text-muted hover:text-secondary transition-colors cursor-pointer"
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button 
                  onClick={toggleOpen}
                  className="p-2 rounded-full hover:bg-white/5 text-muted hover:text-secondary transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin flex flex-col">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-red-500/20 text-red-100 border border-red-500/30 rounded-br-sm' 
                      : msg.role === 'system'
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[11px] uppercase tracking-wider w-full text-center'
                        : 'bg-black/40 border border-red-500/20 text-red-50 rounded-bl-sm shadow-[0_4px_15px_rgba(239,68,68,0.1)]'
                  }`}>
                    {msg.role === 'jarvis' && (
                      <div className="flex items-center gap-2 mb-1.5 opacity-80">
                        <Sparkles size={12} className="text-red-500" />
                        <span className="text-[10px] font-heading font-bold tracking-[0.2em] uppercase text-red-500">J.A.R.V.I.S.</span>
                      </div>
                    )}
                    <div className={msg.role === 'jarvis' ? 'leading-relaxed text-red-100/90' : ''}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-black/40 border border-red-500/20 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 shadow-[0_4px_15px_rgba(239,68,68,0.1)]">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 border-t border-red-500/10 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                    isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-red-500/5 border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/10'
                  }`}
                  aria-label="Voice input"
                >
                  {isListening ? <Mic size={18} /> : <MicOff size={18} />}
                </button>
                
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask J.A.R.V.I.S..."
                    className="w-full bg-black/50 border border-red-500/20 rounded-xl pl-4 pr-10 py-2.5 text-sm text-red-100 placeholder:text-red-500/40 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/60 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isThinking}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-red-500 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={16} />
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
