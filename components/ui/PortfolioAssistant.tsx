"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, ShieldAlert, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { resumes } from "@/content/resume";

type LogLine = {
  type: "system" | "user" | "jarvis" | "error";
  text: string;
  markdown?: boolean;
  links?: { label: string; href: string; download?: string }[];
};

// Structured response datasets for J.A.R.V.I.S. command console
interface CommandResponse {
  briefing: string;
  markdown: string;
  links?: { label: string; href: string; download?: string }[];
}

const COMMAND_DATABASE: Record<string, CommandResponse> = {
  help: {
    briefing: "ACTIVE OVERRIDES MATRIX:",
    markdown: `**SYSTEM OVERRIDES & COGNITIVE CONTROLS**\n\n- **System**: \`status\`, \`diagnostics\`, \`clear\`\n- **Profile**: \`about\`, \`skills\`, \`experience\`, \`academy\`, \`history\`\n- **Projects**: \`projects\`, \`logs\`\n- **Network**: \`contact\`, \`github\`, \`linkedin\`, \`hire\`\n- **Fun**: \`coffee\`, \`matrix\``
  },
  hello: {
    briefing: "GRID PROTOCOLS STABLE.",
    markdown: `**J.A.R.V.I.S. COGNITIVE LINK**\n\nPower grids are functioning at 100%.\nHow can I assist you on Vaibhav's behalf?\n\n*Type \`help\` to audit commands.*`
  },
  about: {
    briefing: "ACCESSING TECHNICAL RECORDS. EXTRACTION COMPLETE.",
    markdown: `**SUBJECT: VAIBHAV BHARATHULA**\n*STATUS: FULL-STACK ENGINEER / CREATOR*\n\n- Coffee-to-Code Transpiler\n- Cricket Analytics Fanatic\n- Hacky Prototype Developer\n\nVaibhav is an IT undergraduate at IARE, Hyderabad, building responsive web apps and forecasting models. His primary availability window opens: **May 2027**.\n\n*Type \`skills\` or \`projects\` for more context.*`
  },
  skills: {
    briefing: "EXTRACTING MAIN FRAME SKILLS MANIFEST...",
    markdown: `**SKILL REGISTRY STATUS: STABLE**\n\n- **Languages**: Java, Python, SQL, JavaScript\n- **Frontend**: React.js, Next.js, HTML5, CSS3\n- **Backend**: Node.js, Express.js, Spring Boot\n- **AI & ML**: LightGBM, TensorFlow, XGBoost, Pinecone\n- **Databases**: MySQL, Firebase, Redis, DuckDB\n\n*Tip: Type \`experience\` or \`status\` for more context.*`
  },
  stats: {
    briefing: "LOADING CODING MATRIX METRICS...",
    markdown: `**VAIBHAV'S PLATFORM METRICS**\n\n- **LeetCode**: 113+ Solved\n- **CodeChef**: 150+ Rated (Max 1481)\n- **Java**: Advanced\n- **React/Next.js**: Intermediate\n- **Machine Learning**: Intermediate\n\n*All databases synchronized.*`
  },
  projects: {
    briefing: "SCANNING WORKSPACE REPOSITORIES...",
    markdown: `**PROJECT REPOSITORIES: INDEXED**\n\n### [Nexus](/projects/nexus)\n*Real-time SaaS Collaboration OS*\n**Stack:** Next.js, Yjs, Liveblocks, Stream\n\n### [CricSphere](/projects/cricsphere)\n*Sports ML Prediction Pipeline*\n**Stack:** React, Express, LightGBM, Python\n\n### [AetherAI](/projects/aetherai)\n*AQI Forecast Platform*\n**Stack:** FastAPI, XGBoost, Gemini API\n\n*Tip: Type \`nexus\`, \`cricsphere\`, or \`aether\` for details.*`
  },
  logs: {
    briefing: "DECRYPTING WORKSPACE DEV LOG MATRIX...",
    markdown: `**NEXUS PROGRESSIVE BLOG POSTS SERIES**\n\n1. **Part 1**: The Foundation & Real-Time Canvas\n2. **Part 2**: Workspace Inbox & Folder Infrastructure\n3. **Part 3**: The AI-Native Layer & Zero-Trust Security\n\n*Action: Select a log file to extract below.*`,
    links: [
      { label: "[Log Part 1]", href: "/blog/nexus-part1-foundation-collaboration" },
      { label: "[Log Part 2]", href: "/blog/nexus-part2-workspace-architecture" },
      { label: "[Log Part 3]", href: "/blog/nexus-part3-ai-native-security" }
    ]
  },
  experience: {
    briefing: "RETRIEVING PROFESSIONAL ARCHIVES...",
    markdown: `**PROFESSIONAL INTERNSHIP MATRIX**\n\n### Deep Learning Intern - CITD Hyd\n*May 2025 - Present*\nVaibhav is training transfer models (EfficientNetB0) on 11,000+ car brand classifications.\n\n### AI Creator Intern - Swecha.org\n*August 2024*\nHe developed Telugu voice clone TTS avatar engines and NLP dataset tokenization.`
  },
  diagnostics: {
    briefing: "RUNNING SYSTEM CORE DIAGNOSTICS...",
    markdown: `**J.A.R.V.I.S. FULL SYSTEM AUDIT**\n\n- **Cognitive Neurons**: STABLE [100%]\n- **ELO Cache Engine**: SYNCHRONIZED\n- **Database Latency**: 4ms (OCI / AWS)\n- **WebRTC Video Link**: READY\n- **PDF Resume Key**: SECURED (AES-256)\n- **Thermal Overload**: 0% NOMINAL`
  },
  history: {
    briefing: "EXTRACTING CHRONOLOGICAL WORKSPACE JOURNEY...",
    markdown: `**VAIBHAV'S PROJECT & CAREER RECORD**\n\n- **2023**: CrickIQ Release (Archived)\n- **2024**: Swecha AI Internship Program\n- **2024**: CricSphere Prediction Engine\n- **2025**: CITD Hyd Deep Learning Model\n- **2026**: Nexus Collaborative Workspace`
  },
  academy: {
    briefing: "RETRIEVING ACADEMY ARCHIVES...",
    markdown: `**ACADEMIC TRAINING PROFILE**\n\n- **Institution**: IARE, Hyderabad\n- **Stream**: B.Tech Information Technology\n- **Status**: Undergraduate\n- **Core Study**: DSA, DBMS, SWE, ML Pipelines`
  },
  contact: {
    briefing: "ENCRYPTION ACTIVE. DIRECT CHANNELS:",
    markdown: `**COMMUNICATION LINK ESTABLISHED**\n\n- **Email**: bharathulavaibhav@gmail.com\n- **Phone**: +91 80745 41942\n- **Location**: Hyderabad, Telangana, India\n- **LinkedIn**: [linkedin.com/in/vaibhav-bharathula](https://linkedin.com/in/vaibhav-bharathula)\n- **GitHub**: [github.com/Vaibhav-1819](https://github.com/Vaibhav-1819)`
  },
  github: {
    briefing: "OPENING GITHUB ARCHIVES...",
    markdown: `**GITHUB SOURCE PORTAL**\n\n- **Handle**: Vaibhav-1819\n- **Repos**: Nexus, CricSphere, AetherAI\n\n*Select direct link button below to view his work.*`,
    links: [
      { label: "[GitHub Profile]", href: "https://github.com/Vaibhav-1819" }
    ]
  },
  linkedin: {
    briefing: "OPENING LINKEDIN SECURE PROTOCOL...",
    markdown: `**LINKEDIN NETWORKING SYSTEM**\n\n- **Profile**: Vaibhav Bharathula\n- **Status**: Actively seeking SDE/ML roles\n\n*Select connect button below to reach out to him.*`,
    links: [
      { label: "[LinkedIn Connect]", href: "https://linkedin.com/in/vaibhav-bharathula" }
    ]
  },
  status: {
    briefing: "HUD SYS STATUS REPORT:",
    markdown: `**CONSOLE RUNTIME READOUT**\n\n- **Power Grid**: ONLINE (100% LOAD)\n- **Network**: SECURE / NO LEAKS\n- **Sounds Core**: SYNTHESIZED WEBAUDIO\n- **HUD Style**: HOLO COMPACT\n- **Sys Theme**: STARK-RED / STEALTH-BLUE`
  },
  mission: {
    briefing: "J.A.R.V.I.S. INTERFACE CHARTER:",
    markdown: `**HUD UTILITY CHARTER**\n\nThis console operates as Vaibhav's heads-up workspace, bypasses standard backend costs, and enables recruiters to request secure documents via key triggers.\n\n*Online status: STABLE.*`
  },
  coffee: {
    briefing: "CAFFEINE CORE LEVEL:",
    markdown: `**DIAGNOSTIC: SYSTEM TEMPERATURE**\n\n- **Vaibhav's Caffeine capacity**: 78%\n- **Compile efficiency**: 104%\n\n*Status: Hyperactive prototype creation.*`
  },
  hire: {
    briefing: "RECRUITMENT PROTOCOL ACKNOWLEDGED.",
    markdown: `Preparing Vaibhav's candidate dossier...\nCredentials verified.\nOpening recruiter package:`,
    links: [
      { label: "[CV (Java)]", href: "/docs/Vaibhav_JavaDeveloper.pdf", download: "Vaibhav_JavaDeveloper.pdf" },
      { label: "[CV (AI/ML)]", href: "/docs/Vaibhav_MLEngineer.pdf", download: "Vaibhav_MLEngineer.pdf" },
      { label: "[GitHub]", href: "https://github.com/Vaibhav-1819" },
      { label: "[LinkedIn]", href: "https://linkedin.com/in/vaibhav-bharathula" },
      { label: "[Email]", href: "mailto:bharathulavaibhav@gmail.com" },
      { label: "[Viewer Canvas]", href: "/resume" }
    ]
  }
};


// Synonym routing table
const SYNONYMS: Record<string, string> = {
  help: "help", "?": "help", menu: "help", commands: "help", protocols: "help",
  about: "about", who: "about", bio: "about", whoami: "about", profile: "about",
  skills: "skills", stack: "skills", tech: "skills", technologies: "skills", java: "skills", python: "skills",
  stats: "stats", metrics: "stats", achievements: "stats", grades: "stats", leetcode: "stats", codechef: "stats",
  projects: "projects", portfolio: "projects", repos: "projects", work: "projects", latest: "projects", builds: "projects",
  logs: "logs", blog: "logs", blogs: "logs", writings: "logs", journal: "logs", archive: "logs", post: "logs", posts: "logs",
  experience: "experience", intern: "experience", internship: "experience", citd: "experience", swecha: "experience",
  diagnostics: "diagnostics", diagnostic: "diagnostics", audit: "diagnostics", test: "diagnostics",
  history: "history", timeline: "history", journey: "history", career: "history", records: "history", path: "history",
  academy: "academy", education: "academy", college: "academy", iare: "academy", study: "academy", training: "academy",
  contact: "contact", email: "contact", phone: "contact", social: "contact", message: "contact",
  github: "github", git: "github",
  linkedin: "linkedin", connect: "linkedin",
  status: "status", system: "status", specs: "status", metrics_hud: "status",
  mission: "mission", purpose: "mission", utility: "mission",
  coffee: "coffee", caffeine: "coffee", stark: "coffee",
  hire: "hire", recruiter: "hire", resume: "hire", cv: "hire", download: "hire", document: "hire",
  clear: "clear", reset: "clear",
  matrix: "matrix", rain: "matrix", code: "matrix",
  home: "home", workspace: "home"
};

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  // Matrix Canvas state
  const [matrixActive, setMatrixActive] = useState(false);
  
  // Konami Red Stark mode
  const [starkMode, setStarkMode] = useState(true);
  const [konamiIdx, setKonamiIdx] = useState(0);
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  
  // Notification banner
  const [showBanner, setShowBanner] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  // Synthesis Audio generator using Web Audio API
  const playSound = (type: "click" | "beep" | "typing" | "startup") => {
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
        osc.type = "square";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "typing") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(450 + Math.random() * 150, ctx.currentTime);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
        osc.start();
        osc.stop(ctx.currentTime + 0.03);
      } else if (type === "startup") {
        const playTone = (freq: number, delay: number, duration: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
          gain.gain.setValueAtTime(0, ctx.currentTime + delay);
          gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + duration);
        };
        playTone(523.25, 0, 0.15); // C5
        playTone(659.25, 0.08, 0.15); // E5
        playTone(783.99, 0.16, 0.15); // G5
        playTone(1046.5, 0.24, 0.4); // C6
      }
    } catch (e) {
      // Audio blocked or not supported
    }
  };

  // Sync scroll on log updates
  useEffect(() => {
    if (isOpen) {
      consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  // Keyboard listeners: Ctrl+K toggle & Konami code triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleConsole();
      }

      // Close on Escape press
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        playSound("click");
      }

      // Konami code detection
      if (isOpen) {
        if (e.key === konamiCode[konamiIdx]) {
          const nextIdx = konamiIdx + 1;
          setKonamiIdx(nextIdx);
          if (nextIdx === konamiCode.length) {
            triggerStarkMode();
            setKonamiIdx(0);
          }
        } else {
          setKonamiIdx(0);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIdx, isOpen]);

  // Matrix canvas rain effect
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 330;
    canvas.height = canvas.parentElement?.clientHeight || 200;

    const columns = Math.floor(canvas.width / 12);
    const yPositions = Array(columns).fill(0);

    let animationFrameId: number;

    const drawRain = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = starkMode ? "#f43f5e" : "#06b6d4"; // red matrix in stark mode
      ctx.font = "9px monospace";

      for (let i = 0; i < yPositions.length; i++) {
        const text = String.fromCharCode(33 + Math.floor(Math.random() * 93));
        const x = i * 12;
        const y = yPositions[i];

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 12;
        }
      }

      animationFrameId = requestAnimationFrame(drawRain);
    };

    drawRain();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [matrixActive, starkMode]);

  // Play keystroke sound on user input typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playSound("typing");
  };

  // Toggle open and trigger initial greeting if empty
  const toggleConsole = () => {
    playSound("click");
    setIsOpen(prev => {
      const nextOpen = !prev;
      if (nextOpen && logs.length === 0) {
        playSound("startup");
        setLogs([
          { type: "jarvis", text: "Greetings. I am J.A.R.V.I.S., Vaibhav's personal AI assistant. He is currently busy building, but I am authorized to assist you on his behalf.\n\n*Type `help` to see what I can share with you.*", markdown: true }
        ]);
        setTimeout(() => inputRef.current?.focus(), 150);
      } else if (nextOpen) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
      return nextOpen;
    });
  };

  // Unlocks stealth blue theme or switches back to Stark-Red
  const triggerStarkMode = () => {
    setStarkMode(prev => !prev);
    playSound("beep");
    setLogs(prev => [
      ...prev,
      { type: "system", text: starkMode ? "STEALTH BLUE PROTOCOLS INITIALIZING..." : "MARK 42 RED PROTOCOLS INITIALIZING..." },
      { type: "error", text: starkMode ? "STEALTH BLUE HUD ACTIVE. INTEGRATED SENSORS ONLINE, SIR." : "MARK 42 ARMOR INTERFACE ACTIVE. RED ALERT HUD ENGAGED." }
    ]);
  };

  // Output markdown logs instantly
  const printMarkdown = (briefing: string, markdown: string, links?: any[]) => {
    playSound("startup");
    setLogs(prev => [
      ...prev,
      { type: "jarvis", text: `**${briefing}**\n\n${markdown}`, markdown: true, links }
    ]);
  };

  // Unified parser/executor for input commands
  const submitQuery = (query: string) => {
    // Append user input to logs console
    const userLog: LogLine = { type: "user", text: `guest@nexus:~$ ${query}` };
    setLogs(prev => [...prev, userLog]);

    // Resolve synonym mapping
    const words = query.toLowerCase().split(/\s+/);
    let matchedCommand = "";

    // Check direct matching or keyword synonyms scanning
    for (const word of words) {
      const cleanWord = word.replace(/[?,./]/g, "");
      if (SYNONYMS[cleanWord]) {
        matchedCommand = SYNONYMS[cleanWord];
        break;
      }
    }

    // Secondary checks for phrase contains matching
    if (!matchedCommand) {
      const qLower = query.toLowerCase();
      if (qLower.includes("nexus") || qLower.includes("zoom")) {
        matchedCommand = "nexus";
      } else if (qLower.includes("cricsphere") || qLower.includes("cricket")) {
        matchedCommand = "cricsphere";
      } else if (qLower.includes("aether") || qLower.includes("aqi")) {
        matchedCommand = "aether";
      }
    }

    setTimeout(() => {
      if (matchedCommand === "clear") {
        setLogs([
          { type: "system", text: "J.A.R.V.I.S. CONSOLE BUFFER FLUSHED // PROTOCOLS STABLE" },
          { type: "jarvis", text: "Diagnostic log cleared. Core ready for your query.", markdown: true }
        ]);
        return;
      }

      if (matchedCommand === "matrix") {
        setMatrixActive(true);
        setLogs(prev => [...prev, { type: "jarvis", text: "Bypassing ocular filters. Matrix override deployed.", markdown: true }]);
        setTimeout(() => setMatrixActive(false), 5000);
        return;
      }

      // Route custom overrides
      if (matchedCommand === "sudo hire ram") {
        setLogs(prev => [...prev, {
          type: "jarvis",
          text: "Core security filters bypassed. Redirecting to Resume vaults...",
          markdown: true
        }]);
        setTimeout(() => {
          setIsOpen(false);
          router.push("/resume");
        }, 800);
        return;
      }

      if (matchedCommand === "home") {
        setLogs(prev => [...prev, {
          type: "jarvis",
          text: "Loading landing grids...",
          markdown: true
        }]);
        setTimeout(() => {
          setIsOpen(false);
          router.push("/");
        }, 800);
        return;
      }

      // Keyword triggers for specific projects
      if (matchedCommand === "nexus") {
        printMarkdown(
          "NEXUS WORKSPACE REGISTRY RETRIEVED.",
          `### [Nexus](/projects/nexus)\n*Real-time SaaS Collaboration OS*\n**Stack:** Next.js, Yjs, Liveblocks, Stream\n\nZero-trust real-time digital workspace.`
        );
        return;
      }

      if (matchedCommand === "cricsphere") {
        printMarkdown(
          "CRICSPHERE SPORTS ML PIPELINE RETRIEVED.",
          `### [CricSphere](/projects/cricsphere)\n*Sports ML Prediction Pipeline*\n**Stack:** React, Node, Express, LightGBM\n\nLeak-free points prediction pipeline.`
        );
        return;
      }

      if (matchedCommand === "aether") {
        printMarkdown(
          "AETHERAI ARCHIVES DECRYPTED.",
          `### [AetherAI](/projects/aetherai)\n*AQI Forecast Platform*\n**Stack:** FastAPI, XGBoost, Gemini API\n\nEnvironmental air-quality analytics.`
        );
        return;
      }

      // Standard command responses
      if (COMMAND_DATABASE[matchedCommand]) {
        const data = COMMAND_DATABASE[matchedCommand];
        printMarkdown(data.briefing, data.markdown, data.links);
      } else {
        // Unknown command handler - J.A.R.V.I.S. Persona
        playSound("beep");
        setLogs(prev => [...prev, {
          type: "jarvis",
          text: `I apologize, but I am not authorized or equipped to answer that specific query on Vaibhav's behalf at this time.\n\n*Type \`help\` to see the records I can share.*`,
          markdown: true
        }]);
      }
    }, 300);
  };

  // Web Speech recognition toggle control
  const toggleListening = () => {
    playSound("click");
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setLogs(prev => [...prev, {
        type: "error",
        text: "SYSTEM ERROR // SPEECH INTERFACE NOT SUPPORTED BY CLIENT WEB AGENT. USE CHROME OR EDGE PROTOCOLS."
      }]);
      playSound("beep");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
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
            setInput(transcript);
            setTimeout(() => {
              setInput("");
              submitQuery(transcript);
            }, 600);
          }
        };

        rec.onerror = (err: any) => {
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
        rec.start();
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    playSound("click");
    setInput("");
    submitQuery(query);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes hudFlicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.985;
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.94;
          }
        }
        .hud-flicker {
          animation: hudFlicker 6s infinite;
        }
      `}} />
      {/* Holographic Light Beam Projection */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ originY: "bottom" }}
            className="fixed bottom-0 right-0 z-30 pointer-events-none select-none w-[480px] h-[360px]"
          >
            <svg 
              className="w-full h-full overflow-visible"
              viewBox="0 0 480 360"
            >
              <defs>
                <linearGradient id="holoCone" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={starkMode ? "#f43f5e" : "#06b6d4"} stopOpacity="0.45" />
                  <stop offset="25%" stopColor={starkMode ? "#f43f5e" : "#06b6d4"} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={starkMode ? "#f43f5e" : "#06b6d4"} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Light cone body */}
              <path
                d="M 432,312 L 16,264 L 456,264 Z"
                fill="url(#holoCone)"
                className="animate-pulse"
              />

              {/* Holographic border lines */}
              <line x1="432" y1="312" x2="16" y2="264" stroke={starkMode ? "#f43f5e" : "#06b6d4"} strokeWidth="0.5" className="opacity-25" />
              <line x1="432" y1="312" x2="456" y2="264" stroke={starkMode ? "#f43f5e" : "#06b6d4"} strokeWidth="0.5" className="opacity-25" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spinning Holographic Arc Reactor floating bubble button */}
      <div 
        className="fixed bottom-6 right-4 z-40 group flex flex-col items-center justify-end"
      >
        {/* Holographic Tooltip beside the button */}
        <div className={`absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 font-mono text-[9px] font-bold tracking-widest select-none bg-background/95 px-3 py-1.5 border backdrop-blur-sm whitespace-nowrap shadow-md rounded-none ${
          starkMode ? 'border-rose-500/40 text-rose-400' : 'border-primary/40 text-primary'
        }`}>
          ⌜ J.A.R.V.I.S. // ONLINE ⌝
        </div>

        {/* Outer concentric holographic HUD scanner rings */}
        <div className="absolute pointer-events-none w-32 h-32 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110 transition-all duration-500 ease-out select-none">
          <div className={`absolute w-16 h-16 border border-dashed rounded-full animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2.5s_linear_infinite] transition-all duration-300 ${starkMode ? 'border-rose-500/25' : 'border-primary/25'}`} />
          <div className={`absolute w-24 h-24 border border-dotted rounded-full animate-[spin_16s_linear_infinite_reverse] group-hover:animate-[spin_4s_linear_infinite_reverse] transition-all duration-300 ${starkMode ? 'border-rose-500/15' : 'border-primary/15'}`} />
          <div className={`absolute w-28 h-28 border-[0.5px] rounded-full opacity-30 ${starkMode ? 'border-rose-500/5' : 'border-primary/5'}`} />
        </div>

        <button
          onClick={toggleConsole}
          onMouseEnter={() => playSound("click")}
          className={`relative h-14 w-14 rounded-full transition-all duration-300 ease-out bg-surface/90 border flex items-center justify-center p-2 cursor-pointer hover:scale-105 ${
            starkMode 
              ? 'border-rose-500 hover:border-rose-400 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.8)]' 
              : 'border-cyan-500 hover:border-cyan-400 text-cyan-500 shadow-xl hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]'
          }`}
          aria-label="Toggle J.A.R.V.I.S. Console"
        >
          {/* Pulse ping rings */}
          <span className={`absolute inset-0 rounded-full scale-100 group-hover:scale-125 animate-ping opacity-50 pointer-events-none ${starkMode ? 'bg-rose-500/20' : 'bg-cyan-500/20'}`} />

          {/* Realistic Glowing Arc Reactor */}
          <div className="w-8 h-8 flex items-center justify-center select-none pointer-events-none relative">
            {/* Core Glow */}
            <div className={`absolute inset-0 rounded-full blur-[6px] animate-pulse ${starkMode ? 'bg-rose-500/60' : 'bg-cyan-400/60'}`} />
            <svg viewBox="0 0 100 100" className={`w-full h-full relative z-10 transition-transform ${isOpen ? 'rotate-45' : 'animate-[spin_12s_linear_infinite]'} ${starkMode ? 'text-rose-400' : 'text-cyan-300'}`} style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}>
              {/* Outer Ring */}
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 8" className="opacity-80 animate-[spin_20s_linear_infinite_reverse]" style={{ transformOrigin: 'center' }} />
              {/* Middle structural ring */}
              <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="18 4" className="opacity-90" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50" />
              {/* Inner details */}
              <path d="M 50,28 L 50,18 M 50,82 L 50,72 M 28,50 L 18,50 M 82,50 L 72,50 M 34.4,34.4 L 27.3,27.3 M 65.6,65.6 L 72.7,72.7 M 34.4,65.6 L 27.3,72.7 M 65.6,34.4 L 72.7,27.3" stroke="currentColor" strokeWidth="3" className="opacity-100" />
              {/* Inner solid ring */}
              <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70" />
              {/* Pulsing Core */}
              <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" />
            </svg>
          </div>
        </button>
      </div>

      {/* Holographic alerts notification box */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className={`fixed bottom-24 right-4 z-50 p-3 bg-surface border rounded-xl shadow-2xl backdrop-blur-md max-w-[240px] font-mono text-[10px] pointer-events-none select-none ${
              starkMode ? 'border-rose-500/50 text-rose-300' : 'border-primary/40 text-secondary'
            }`}
          >
            <div className={`font-bold tracking-wider animate-pulse ${starkMode ? 'text-rose-500' : 'text-primary'}`}>
              [NEW OBJECT DETECTED]
            </div>
            <div className="mt-1 text-muted/80 leading-relaxed">
              Recruiter detected in workspace. Resume data models decrypted. Type <span className={`${starkMode ? 'text-rose-400' : 'text-primary'} font-bold`}>'hire'</span> to extract records.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jarvis Console Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.22 }}
            className={`fixed bottom-24 right-4 left-4 sm:left-auto sm:right-4 z-40 sm:w-[380px] h-[340px] bg-surface/95 border rounded-none flex flex-col overflow-hidden backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.4)] hud-flicker ${
              starkMode 
                ? 'border-rose-600/60 shadow-[0_0_30px_rgba(244,63,94,0.15)]' 
                : 'border-border'
            }`}
          >
            {/* Holographic Radar Sweep behind text */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03] select-none">
              <div className="w-[280px] h-[280px] border-2 border-dashed border-primary rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-[180px] h-[180px] border border-primary rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute w-[80px] h-[80px] border border-primary/50 rounded-full" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[0.5px] bg-primary/20" />
              <div className="absolute left-0 right-0 top-1/2 h-[0.5px] bg-primary/20" />
            </div>

            {/* Glowing Corner HUD Brackets */}
            <div className={`absolute top-[-1px] left-[-1px] w-3 h-3 border-t-2 border-l-2 pointer-events-none rounded-none ${starkMode ? 'border-rose-500/70' : 'border-primary/60'}`} />
            <div className={`absolute top-[-1px] right-[-1px] w-3 h-3 border-t-2 border-r-2 pointer-events-none rounded-none ${starkMode ? 'border-rose-500/70' : 'border-primary/60'}`} />
            <div className={`absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-2 border-l-2 pointer-events-none rounded-none ${starkMode ? 'border-rose-500/70' : 'border-primary/60'}`} />
            <div className={`absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-2 border-r-2 pointer-events-none rounded-none ${starkMode ? 'border-rose-500/70' : 'border-primary/60'}`} />

            {/* HUD Header bar */}
            <div className="px-4 py-2 border-b border-border/50 bg-background/60 flex justify-between items-center select-none z-10">
              <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-primary/80">
                <Terminal size={11} className={starkMode ? 'text-rose-500' : 'text-primary'} />
                <span className={starkMode ? 'text-rose-400' : 'text-primary'}>
                  {starkMode ? 'STARK_OS v4.2' : 'J.A.R.V.I.S.'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* Audio sound toggle switch */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 rounded text-muted hover:text-primary transition-colors cursor-pointer"
                  title={soundEnabled ? "Mute sounds" : "Unmute sounds"}
                >
                  {soundEnabled ? <Volume2 size={11} /> : <VolumeX size={11} />}
                </button>
                <span className="hidden sm:inline text-[9px] font-mono text-muted/65 bg-background px-1.5 py-0.5 rounded border border-border/50">CTRL+K</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-background/80 text-muted hover:text-primary transition-colors cursor-pointer"
                  title="Close console HUD"
                >
                  <X size={11} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide font-mono select-text relative z-10 selection:bg-primary/25">
              
              {/* Matrix Rain canvas layout */}
              {matrixActive && (
                <canvas 
                  ref={canvasRef} 
                  className="absolute inset-0 pointer-events-none z-20 w-full h-full"
                />
              )}

              {logs.map((log, index) => {
                if (log.type === "system") {
                  return (
                    <div key={index} className="text-primary/50 font-bold select-none text-[9px] uppercase tracking-wider">
                      &gt;&gt;&gt; {log.text}
                    </div>
                  );
                }
                if (log.type === "error") {
                  return (
                    <div key={index} className="flex gap-2 text-rose-500/90 leading-relaxed whitespace-pre-wrap text-[11px]">
                      <ShieldAlert size={12} className="shrink-0 mt-0.5" />
                      <span>{log.text}</span>
                    </div>
                  );
                }
                if (log.type === "user") {
                  return (
                    <div key={index} className="text-primary font-bold text-[11px] leading-relaxed whitespace-pre-wrap">
                      {log.text}
                    </div>
                  );
                }
                
                // J.A.R.V.I.S output
                return (
                  <div key={index} className="space-y-1.5 text-[11.5px] leading-relaxed">
                    {log.markdown ? (
                      <div className={`prose prose-invert max-w-none prose-p:my-1 prose-headings:mb-2 prose-headings:mt-4 prose-h3:text-[13px] prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:my-0.5 text-secondary/95 ${starkMode ? 'prose-a:text-rose-400' : 'prose-a:text-cyan-400'}`}>
                        <ReactMarkdown>{log.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-secondary/95 whitespace-pre-wrap">
                        {log.text}
                      </div>
                    )}
                    
                    {/* Interactive glow link cards */}
                    {log.links && (
                      <div className="grid grid-cols-2 gap-1.5 mt-3">
                        {log.links.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.href}
                            download={link.download}
                            onClick={() => playSound("click")}
                            className="px-2 py-1.5 bg-background hover:bg-primary/10 text-secondary hover:text-primary border border-border/80 hover:border-primary/50 rounded-lg text-[9px] font-bold text-center tracking-wider transition-all uppercase cursor-pointer"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div ref={consoleEndRef} />
            </div>

            {/* Terminal Input prompt footer */}
            <form
              onSubmit={executeCommand}
              className="p-2 border-t border-border/50 bg-background/30 flex gap-2 items-center z-10"
            >
              <span className="text-[10px] text-primary/75 select-none shrink-0 font-bold font-mono">guest@nexus:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={isListening ? "Listening, Sir..." : "type help..."}
                disabled={isListening}
                className="flex-1 min-w-0 bg-transparent text-secondary text-[11px] font-mono focus:outline-none border-0 caret-primary placeholder:text-muted/30"
                spellCheck={false}
                autoComplete="off"
              />
              
              {/* Speech Microphone trigger */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                  isListening 
                    ? "text-rose-500 animate-pulse bg-rose-500/10 shadow-[0_0_8px_rgba(244,63,94,0.3)]" 
                    : "text-muted hover:text-primary hover:bg-background/80"
                }`}
                title="Toggle J.A.R.V.I.S. Voice listener"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v3M8 22h8" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
