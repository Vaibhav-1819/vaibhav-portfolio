"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, ShieldAlert, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { resumes } from "@/content/resume";

type LogLine = {
  type: "system" | "user" | "jarvis" | "error";
  text: string;
  links?: { label: string; href: string; download?: string }[];
};

// Structured response datasets for J.A.R.V.I.S. command console
interface CommandResponse {
  briefing: string;
  lines: string[];
  links?: { label: string; href: string; download?: string }[];
}

const COMMAND_DATABASE: Record<string, CommandResponse> = {
  help: {
    briefing: "ACTIVE OVERRIDES MATRIX:",
    lines: [
      "========================================",
      "SYSTEM OVERRIDES & COGNITIVE CONTROLS",
      "----------------------------------------",
      "SYSTEM",
      "  status      - Display HUD telemetry",
      "  diagnostics - Run system integrity audit",
      "  clear       - Flush console logs buffer",
      "----------------------------------------",
      "PROFILE",
      "  about       - Decrypt subject profile",
      "  skills      - Retrieve technical database",
      "  experience  - Open mission archives",
      "  academy     - Retrieve study & academic records",
      "  history     - Extract chronological records",
      "----------------------------------------",
      "PROJECTS",
      "  projects    - Access workspace project registry",
      "  logs        - Retrieve progressive dev logs",
      "----------------------------------------",
      "NETWORK",
      "  contact     - Establish direct communication link",
      "  github      - Connect source repositories",
      "  linkedin    - Open professional network",
      "  hire        - Unlock recruitment protocol",
      "----------------------------------------",
      "FUN",
      "  coffee      - Analyze caffeine reserves",
      "  matrix      - Enable ocular rain simulation",
      "========================================"
    ]
  },
  hello: {
    briefing: "GRID PROTOCOLS STABLE, SIR.",
    lines: [
      "========================================",
      "J.A.R.V.I.S. COGNITIVE LINK",
      "----------------------------------------",
      "Power grids are functioning at 100%.",
      "How can I assist you in Sir's workspace?",
      "Type 'help' to audit commands.",
      "========================================"
    ]
  },
  about: {
    briefing: "ACCESSING TECHNICAL RECORDS, SIR. EXTRACTION COMPLETE.",
    lines: [
      "══════════════════════════════════════",
      "SUBJECT: VAIBHAV BHARATHULA",
      "STATUS : FULL-STACK ENGINEER / CREATOR",
      "ROLES  : * COFFEE-TO-CODE TRANSPILER",
      "         * CRICKET ANALYTICS FANATIC",
      "         * GIT COMMIT SPAMMER",
      "         * HACKY PROTOTYPE DEVELOPER",
      "══════════════════════════════════════",
      "Sir is an IT undergraduate at IARE, Hyderabad",
      "building responsive web apps and forecasting models.",
      "Primary availability window opens: May 2027.",
      "--------------------------------------",
      "Type 'skills', 'projects', or 'logs' for logs."
    ]
  },
  skills: {
    briefing: "EXTRACTING MAIN FRAME SKILLS MANIFEST...",
    lines: [
      "══════════════════════════════════════",
      "SKILL REGISTRY STATUS: STABLE",
      "══════════════════════════════════════",
      "LANGUAGES  :: Java, Python, SQL, JavaScript",
      "FRONTEND   :: React.js, Next.js, HTML5, CSS3",
      "BACKEND    :: Node.js, Express.js, Spring Boot",
      "AI & ML    :: LightGBM, TensorFlow, XGBoost, Pinecone",
      "DATABASES  :: MySQL, Firebase, NoSQL, Redis, DuckDB",
      "--------------------------------------",
      "Tip: Type 'experience' or 'status' for more context."
    ]
  },
  stats: {
    briefing: "LOADING CODING MATRIX METRICS, SIR...",
    lines: [
      "══════════════════════════════════════",
      "SIR'S PLATFORM METRICS",
      "══════════════════════════════════════",
      "LEETCODE   [██████████] 113+ Solved",
      "CODECHEF   [██████████] 150+ Rated (Max 1481)",
      "JAVA       [██████████] Advanced",
      "REACT/NEXT [████████░░] Intermediate",
      "MACHINE LN [████████░░] Intermediate",
      "--------------------------------------",
      "All databases synchronized."
    ]
  },
  projects: {
    briefing: "SCANNING WORKSPACE REPOSITORIES...",
    lines: [
      "══════════════════════════════════════",
      "PROJECT REPOSITORIES: INDEXED",
      "══════════════════════════════════════",
      "[NEXUS] (Multiplayer Workspace)",
      "  STATUS : ACTIVE BUILD",
      "  STACK  : Next.js, Yjs, Liveblocks, Stream",
      "  MISSION: Real-time SaaS Collaboration OS",
      "  DETAILS: HD video huddles, collaborative canvas,",
      "           and server-brokered zero-trust security.",
      "--------------------------------------",
      "[CRICSPHERE] (Live Analytics Hub)",
      "  STATUS : ONLINE",
      "  STACK  : React, Express, LightGBM, Python",
      "  MISSION: Sports ML Prediction Pipeline",
      "  DETAILS: 3-model LightGBM suite trained on leak-free",
      "           chronological splits (~63% Match Outcome).",
      "--------------------------------------",
      "[AETHERAI] (AQI Forecast Platform)",
      "  STATUS : OFFLINE",
      "  STACK  : FastAPI, XGBoost, Gemini API",
      "  MISSION: Meteorological AQI Predictor",
      "--------------------------------------",
      "Tip: Type 'nexus', 'cricsphere', or 'aether' for details."
    ]
  },
  logs: {
    briefing: "DECRYPTING WORKSPACE DEV LOG MATRIX...",
    lines: [
      "══════════════════════════════════════",
      "NEXUS PROGRESSIVE BLOG POSTS series",
      "══════════════════════════════════════",
      "Part 1: The Foundation & Real-Time Canvas",
      "  - Focus: WebRTC, Clerk Organizations, Yjs sync",
      "Part 2: Workspace Inbox & Folder Infrastructure",
      "  - Focus: Folder systems and notification queues",
      "Part 3: The AI-Native Layer & Zero-Trust Security",
      "  - Focus: Signed download URLs, Pinecone vector search",
      "--------------------------------------",
      "Action: Select a log file to extract:",
      "══════════════════════════════════════"
    ],
    links: [
      { label: "[Log Part 1]", href: "/blog/nexus-part1-foundation-collaboration" },
      { label: "[Log Part 2]", href: "/blog/nexus-part2-workspace-architecture" },
      { label: "[Log Part 3]", href: "/blog/nexus-part3-ai-native-security" }
    ]
  },
  experience: {
    briefing: "RETRIEVING PROFESSIONAL ARCHIVES...",
    lines: [
      "══════════════════════════════════════",
      "PROFESSIONAL INTERNSHIP MATRIX",
      "══════════════════════════════════════",
      "[DEEP LEARNING INTERN - CITD HYD]",
      "  DURATION: May 2025 - Present",
      "  MISSION : Train transfer models (EfficientNetB0)",
      "            on 11,000+ car brand classifications.",
      "--------------------------------------",
      "[AI CREATOR INTERN - SWECHA.ORG]",
      "  DURATION: August 2024",
      "  MISSION : Telugu voice clone TTS avatar engines,",
      "            NLP dataset tokenization.",
      "══════════════════════════════════════"
    ]
  },
  diagnostics: {
    briefing: "RUNNING SYSTEM CORE DIAGNOSTICS...",
    lines: [
      "========================================",
      "J.A.R.V.I.S. FULL SYSTEM AUDIT",
      "----------------------------------------",
      "  COGNITIVE NEURONS : STABLE [100%]",
      "  ELO CACHE ENGINE  : SYNCHRONIZED",
      "  DATABASE LATENCY  : 4ms (OCI / AWS)",
      "  WERTC VIDEO LINK  : READY (STREAM HUD)",
      "  PDF RESUME KEY    : SECURED (AES-256)",
      "  THERMAL OVERLOAD  : 0% NOMINAL",
      "========================================"
    ]
  },
  history: {
    briefing: "EXTRACTING CHRONOLOGICAL WORKSPACE JOURNEY...",
    lines: [
      "========================================",
      "SIR'S PROJECT & CAREER RECORD",
      "----------------------------------------",
      "  2023 :: CRICKIQ RELEASE (ARCHIVED)",
      "  2024 :: SWECHA AI INTERNSHIP PROGRAM",
      "  2024 :: CRICSPHERE PREDICTION ENGINE",
      "  2025 :: CITD HYD DEEP LEARNING MODEL",
      "  2026 :: NEXUS COLLABORATIVE WORKSPACE",
      "========================================"
    ]
  },
  academy: {
    briefing: "RETRIEVING ACADEMY ARCHIVES...",
    lines: [
      "========================================",
      "ACADEMIC TRAINING PROFILE",
      "----------------------------------------",
      "  INSTITUTION :: IARE, Hyderabad",
      "  STREAM      :: B.Tech Information Tech",
      "  STATUS      :: Undergraduate",
      "  CORE STUDY  :: DSA, DBMS, SWE, ML Pipelines",
      "========================================"
    ]
  },
  contact: {
    briefing: "ENCRYPTION ACTIVE. DIRECT CHANNELS:",
    lines: [
      "══════════════════════════════════════",
      "COMMUNICATION LINK ESTABLISHED",
      "══════════════════════════════════════",
      "EMAIL: bharathulavaibhav@gmail.com",
      "PHONE: +91 80745 41942",
      "LOC  : Hyderabad, Telangana, India",
      "LINK : linkedin.com/in/vaibhav-bharathula",
      "GIT  : github.com/Vaibhav-1819",
      "══════════════════════════════════════"
    ]
  },
  github: {
    briefing: "OPENING GITHUB ARCHIVES...",
    lines: [
      "========================================",
      "GITHUB SOURCE PORTAL",
      "----------------------------------------",
      "  Handle: Vaibhav-1819",
      "  Repos : Nexus, CricSphere, AetherAI",
      "----------------------------------------",
      "Select direct link button below, Sir.",
      "========================================"
    ],
    links: [
      { label: "[GitHub Profile]", href: "https://github.com/Vaibhav-1819" }
    ]
  },
  linkedin: {
    briefing: "OPENING LINKEDIN SECURE PROTOCOL...",
    lines: [
      "========================================",
      "LINKEDIN NETWORKING SYSTEM",
      "----------------------------------------",
      "  Profile: Vaibhav Bharathula",
      "  Status : Actively seeking SDE/ML roles",
      "----------------------------------------",
      "Select connect button below, Sir.",
      "========================================"
    ],
    links: [
      { label: "[LinkedIn Connect]", href: "https://linkedin.com/in/vaibhav-bharathula" }
    ]
  },
  status: {
    briefing: "HUD SYS STATUS REPORT:",
    lines: [
      "========================================",
      "CONSOLE RUNTIME READOUT",
      "----------------------------------------",
      "  POWER GRID  : ONLINE (100% LOAD)",
      "  NETWORK     : SECURE / NO LEAKS",
      "  SOUNDS CORE : SYNTHESIZED WEBAUDIO",
      "  HUD STYLE   : HOLO COMPACT 440px",
      "  SYS THEME   : STARK-RED / STEALTH-BLUE",
      "========================================"
    ]
  },
  mission: {
    briefing: "J.A.R.V.I.S. INTERFACE CHARTER:",
    lines: [
      "══════════════════════════════════════",
      "HUD UTILITY CHARTER",
      "══════════════════════════════════════",
      "This console operates as Sir's heads-up",
      "workspace, bypasses Vercel backend costs,",
      "and enables recruiters to request secure",
      "documents via key triggers. Online status: STABLE.",
      "══════════════════════════════════════"
    ]
  },
  coffee: {
    briefing: "CAFFEINE CORE LEVEL:",
    lines: [
      "══════════════════════════════════════",
      "DIAGNOSTIC: SYSTEM TEMPERATURE",
      "══════════════════════════════════════",
      "Caffeine capacity: 78%",
      "Sir's coding compile efficiency: 104%",
      "Status: Hyperactive prototype creation.",
      "══════════════════════════════════════"
    ]
  },
  hire: {
    briefing: "RECRUITMENT PROTOCOL ACKNOWLEDGED.",
    lines: [
      "══════════════════════════════════════",
      "Preparing candidate dossier...",
      "Credentials verified.",
      "Opening recruiter package:",
      "══════════════════════════════════════"
    ],
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
  
  // HUD Diagnostics & State parameters
  const [sysMetrics, setSysMetrics] = useState({ cpu: 13, mem: 28 });
  const [bootStep, setBootStep] = useState(0); // 0: unbooted, 5: booted, intermediate: booting phases
  const [bootProgress, setBootProgress] = useState(0);
  const [bootingLogs, setBootingLogs] = useState<string[]>([]);
  const [isJarvisThinking, setIsJarvisThinking] = useState(false);
  const [alertMode, setAlertMode] = useState(false);
  
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

  // Live fluctuating diagnostics generator
  useEffect(() => {
    const timer = setInterval(() => {
      setSysMetrics(prev => ({
        cpu: Math.floor(6 + Math.random() * 12),
        mem: Math.floor(27 + Math.random() * 2)
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Sync scroll on log updates
  useEffect(() => {
    if (isOpen) {
      consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, bootingLogs, isJarvisThinking, bootStep, isOpen]);

  // Dynamic J.A.R.V.I.S. background log updates when idle
  useEffect(() => {
    if (!isOpen || bootStep < 5) return;
    const sysMessages = [
      "J.A.R.V.I.S. : CORE MONITOR: ARC REACTOR TEMPERATURE REGULATED AT 98.4 C",
      "J.A.R.V.I.S. : WORKSPACE INTERFACE: RECRUITER DIRECTORIES RETRIEVED",
      "J.A.R.V.I.S. : PROTOCOLS SCAN: SECURE SOCKET PORTS 100% OPERATIONAL",
      "J.A.R.V.I.S. : MEMORY DUMP: DICTIONARY MAPPING COMPACTED"
    ];
    const timer = setInterval(() => {
      const randomMsg = sysMessages[Math.floor(Math.random() * sysMessages.length)];
      setLogs(prev => [...prev, { type: "system", text: randomMsg }]);
      playSound("click");
    }, 20000);
    return () => clearInterval(timer);
  }, [isOpen, bootStep]);

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

  // Toggle open and trigger J.A.R.V.I.S. boot sequence
  const toggleConsole = () => {
    playSound("click");
    setIsOpen(prev => {
      const nextOpen = !prev;
      if (nextOpen && bootStep === 0) {
        triggerBootSequence();
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

  // Cinematic Startup Boot Sequence
  const triggerBootSequence = () => {
    setBootStep(1);
    setBootProgress(0);
    setBootingLogs(["> INIT BOOT PROTOCOLS..."]);

    const steps = [
      { text: "> LOADING PERSONALITY MATRIX...", progress: 28 },
      { text: "> ESTABLISHING SECURE INTERFACES...", progress: 54 },
      { text: "> DECRYPTING VAIBHAV RESUME MANIFESTS...", progress: 82 },
      { text: "> ALL SYSTEMS STABLE. JARVIS OS: ACTIVE.", progress: 100 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setBootProgress(step.progress);
        setBootingLogs(prev => [...prev, step.text]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            setBootStep(5); // fully booted
            playSound("startup");
            
            // Generate standard greeting based on time parameters
            const hour = new Date().getHours();
            const day = new Date().getDay();
            let greet = "Welcome back, Sir. How may I assist you today?";
            
            if (hour >= 21 || hour < 4) {
              greet = "Working late again, Sir? Diagnostics are stable.";
            } else if (day === 0 || day === 6) {
              greet = "Weekend detected. Productivity outputs remain optimized, Sir.";
            }
            
            setLogs([
              { type: "system", text: "J.A.R.V.I.S. CORES LOADED // VAIBHAV WORKSPACE ACCESS GRANTED" },
              { type: "jarvis", text: `J.A.R.V.I.S. : ${greet}\nType 'help' to audit available workspace overrides.` }
            ]);

            // Flash Recruiter warning banner
            setTimeout(() => {
              setShowBanner(true);
              setTimeout(() => setShowBanner(false), 4000);
            }, 800);
          }, 350);
        }
      }, (idx + 1) * 800);
    });
  };

  // Sequentially outputs the logs line-by-line mimicking database streams
  const printSequentially = (briefing: string, lines: string[], links?: any[]) => {
    // Append briefing first
    setLogs(prev => [...prev, { type: "jarvis", text: `J.A.R.V.I.S. : ${briefing}` }]);

    lines.forEach((line, index) => {
      setTimeout(() => {
        playSound("typing");
        setLogs(prev => {
          const lastLog = prev[prev.length - 1];
          if (lastLog && lastLog.type === "jarvis" && !lastLog.links) {
            // Append line to the last log non-mutating
            return [
              ...prev.slice(0, -1),
              {
                ...lastLog,
                text: lastLog.text + "\n" + line
              }
            ];
          } else {
            return [...prev, { type: "jarvis", text: line }];
          }
        });
      }, (index + 1) * 80);
    });

    if (links && links.length > 0) {
      setTimeout(() => {
        playSound("startup");
        setLogs(prev => {
          const lastLog = prev[prev.length - 1];
          if (lastLog && lastLog.type === "jarvis") {
            return [
              ...prev.slice(0, -1),
              {
                ...lastLog,
                links: links
              }
            ];
          } else {
            return [...prev, { type: "jarvis", text: "", links }];
          }
        });
      }, (lines.length + 1) * 80);
    }
  };

  // Processes input rules progressively
  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    playSound("click");
    setAlertMode(false);

    // Append user input
    const userLog: LogLine = { type: "user", text: `guest@vaibhav:~$ ${query}` };
    setLogs(prev => [...prev, userLog]);
    setInput("");
    setIsJarvisThinking(true);

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
      setIsJarvisThinking(false);

      if (matchedCommand === "clear") {
        setLogs([
          { type: "system", text: "J.A.R.V.I.S. CONSOLE BUFFER FLUSHED // PROTOCOLS STABLE" },
          { type: "jarvis", text: "J.A.R.V.I.S. : Diagnostic log cleared. Core ready for query input, Sir." }
        ]);
        return;
      }

      if (matchedCommand === "matrix") {
        setMatrixActive(true);
        setLogs(prev => [...prev, { type: "jarvis", text: "J.A.R.V.I.S. : Bypassing ocular filters. Matrix override deployed." }]);
        setTimeout(() => setMatrixActive(false), 5000);
        return;
      }

      // Route custom overrides
      if (matchedCommand === "sudo hire ram") {
        setLogs(prev => [...prev, {
          type: "jarvis",
          text: "J.A.R.V.I.S. : Core security filters bypassed. Redirecting to Resume vaults..."
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
          text: "J.A.R.V.I.S. : Loading landing grids..."
        }]);
        setTimeout(() => {
          setIsOpen(false);
          router.push("/");
        }, 800);
        return;
      }

      // Keyword triggers for specific projects
      if (matchedCommand === "nexus") {
        printSequentially(
          "NEXUS WORKSPACE REGISTRY RETRIEVED.",
          [
            "══════════════════════════════════════",
            "PROJECT   :: NEXUS (COLLABORATION OS)",
            "STATUS    :: ACTIVE DEVELOPMENT",
            "STACK     :: Next.js, Yjs, Liveblocks, Stream",
            "MISSION   :: Zero-trust real-time digital workspace",
            "══════════════════════════════════════"
          ]
        );
        return;
      }

      if (matchedCommand === "cricsphere") {
        printSequentially(
          "CRICSPHERE SPORTS ML PIPELINE RETRIEVED.",
          [
            "══════════════════════════════════════",
            "PROJECT   :: CRICSPHERE (ML ANALYTICS)",
            "STATUS    :: ONLINE / COMPILED",
            "STACK     :: React, Node, Express, LightGBM",
            "MISSION   :: Leak-free points prediction pipeline",
            "══════════════════════════════════════"
          ]
        );
        return;
      }

      if (matchedCommand === "aether") {
        printSequentially(
          "AETHERAI ARCHIVES DECRYPTED.",
          [
            "══════════════════════════════════════",
            "PROJECT   :: AETHERAI (FORECAST PLATFORM)",
            "STATUS    :: OFFLINE / ARCHIVED",
            "STACK     :: FastAPI, XGBoost, Gemini API",
            "MISSION   :: Environmental air-quality analytics",
            "══════════════════════════════════════"
          ]
        );
        return;
      }

      // Standard command responses
      if (COMMAND_DATABASE[matchedCommand]) {
        const data = COMMAND_DATABASE[matchedCommand];
        printSequentially(data.briefing, data.lines, data.links);
      } else {
        // Unknown command handler - Alert Mode
        setAlertMode(true);
        playSound("beep");
        setLogs(prev => [...prev, {
          type: "error",
          text: `WARNING // UNKNOWN PROTOCOL OVERRIDE: '${query}'\nMainframe returns error: STATUS_UNRESOLVABLE.\nType 'help' to audit available protocols.`
        }]);
        setTimeout(() => setAlertMode(false), 1200);
      }
    }, 700);
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
      <div className="fixed bottom-6 right-4 z-40 group flex flex-col items-center justify-end">
        {/* Holographic Tooltip */}
        <div className={`absolute bottom-14 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 font-mono text-[9px] font-bold tracking-widest select-none bg-background/90 px-2 py-1 border backdrop-blur-sm whitespace-nowrap shadow-md rounded-none ${
          starkMode ? 'border-rose-500/40 text-rose-400' : 'border-primary/40 text-primary'
        }`}>
          ⌜ J.A.R.V.I.S. ⌝
        </div>

        {/* Outer concentric holographic HUD scanner rings */}
        <div className="absolute pointer-events-none w-32 h-32 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110 transition-all duration-500 ease-out select-none">
          <div className={`absolute w-16 h-16 border border-dashed rounded-full animate-[spin_8s_linear_infinite] ${starkMode ? 'border-rose-500/25' : 'border-primary/25'}`} />
          <div className={`absolute w-24 h-24 border border-dotted rounded-full animate-[spin_14s_linear_infinite_reverse] ${starkMode ? 'border-rose-500/15' : 'border-primary/15'}`} />
          <div className={`absolute w-28 h-28 border-[0.5px] rounded-full opacity-30 ${starkMode ? 'border-rose-500/5' : 'border-primary/5'}`} />
        </div>

        <button
          onClick={toggleConsole}
          onMouseEnter={() => playSound("click")}
          className={`relative h-12 w-12 rounded-full transition-all duration-300 ease-out bg-surface border flex items-center justify-center p-3 cursor-pointer hover:scale-105 ${
            starkMode 
              ? 'border-rose-500 hover:border-rose-400 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
              : 'border-border/80 hover:border-primary/50 text-primary shadow-xl hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]'
          }`}
          aria-label="Toggle J.A.R.V.I.S. Console"
        >
          {/* Pulse ping rings */}
          <span className={`absolute inset-0 rounded-full scale-100 group-hover:scale-125 animate-ping opacity-50 pointer-events-none ${starkMode ? 'bg-rose-500/10' : 'bg-primary/5'}`} />

          {/* Glowing Arc Reactor */}
          <div className="w-5 h-5 flex items-center justify-center select-none pointer-events-none">
            <svg viewBox="0 0 100 100" className={`w-full h-full transition-transform ${isOpen ? 'rotate-45' : 'animate-[spin_14s_linear_infinite]'} ${starkMode ? 'text-rose-500' : 'text-primary'}`}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="12, 6" className="opacity-25" />
              <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6, 12" className="opacity-70" />
              <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
              <path d="M 50,22 L 50,12 M 50,78 L 50,88 M 22,50 L 12,50 M 78,50 L 88,50 M 31,31 L 23,23 M 69,69 L 77,77 M 31,69 L 23,77 M 69,31 L 77,23" stroke="currentColor" strokeWidth="3" className="opacity-90" />
              <circle cx="50" cy="50" r="8" fill="currentColor" className="animate-pulse" />
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
            className={`fixed bottom-24 right-4 left-4 sm:left-auto sm:right-4 z-40 sm:w-[440px] h-[320px] bg-surface/95 border rounded-none flex flex-col overflow-hidden backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.4)] hud-flicker ${
              alertMode 
                ? 'border-rose-500 animate-[shake_0.2s_ease-in-out_infinite] shadow-[0_0_20px_rgba(239,68,68,0.25)]' 
                : starkMode 
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

            {/* Live System Metrics Dashboard banner */}
            <div className="px-4 py-1.5 bg-background/30 border-b border-border/40 font-mono text-[8px] text-muted flex gap-4 select-none z-10 uppercase tracking-wider font-bold">
              <span>Power: <span className={starkMode ? 'text-rose-500' : 'text-emerald-500'}>Online</span></span>
              <span>Net: <span className="text-primary">Secure</span></span>
              <span>CPU: <span className="text-secondary">{sysMetrics.cpu}%</span></span>
              <span>Mem: <span className="text-secondary">{sysMetrics.mem}%</span></span>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide text-[11px] font-mono select-text relative z-10 selection:bg-primary/25">
              
              {/* Matrix Rain canvas layout */}
              {matrixActive && (
                <canvas 
                  ref={canvasRef} 
                  className="absolute inset-0 pointer-events-none z-20 w-full h-full"
                />
              )}

              {/* Boot Sequence screen view */}
              {bootStep < 5 ? (
                <div className="space-y-2 text-primary/80">
                  {bootingLogs.map((logLine, bIdx) => (
                    <div key={bIdx} className="leading-relaxed">
                      {logLine}
                    </div>
                  ))}
                  
                  {/* Boot loader bar */}
                  <div className="space-y-1 pt-1.5">
                    <div className="flex justify-between text-[9px]">
                      <span>SYSTEM BOOT CHECK</span>
                      <span>{bootProgress}%</span>
                    </div>
                    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${starkMode ? 'bg-rose-500' : 'bg-primary'}`} 
                        style={{ width: `${bootProgress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular terminal content */
                <>
                  {/* Diagnostics art on HELP trigger */}
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
                        <div key={index} className="flex gap-2 text-rose-500/90 leading-relaxed whitespace-pre-wrap">
                          <ShieldAlert size={12} className="shrink-0 mt-0.5" />
                          <span>{log.text}</span>
                        </div>
                      );
                    }
                    return (
                      <div key={index} className="space-y-1.5">
                        <div className={`leading-relaxed whitespace-pre-wrap ${
                          log.type === "user" ? "text-primary font-bold" : "text-secondary/95"
                        }`}>
                          {log.text}
                        </div>
                        {/* Interactive glow link cards */}
                        {log.links && (
                          <div className="grid grid-cols-2 gap-1.5 mt-2">
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

                  {/* Thinking progressive state */}
                  {isJarvisThinking && (
                    <div className="text-muted leading-relaxed flex items-center gap-2 select-none animate-pulse">
                      <span>Analyzing workspace...</span>
                      <span>▋</span>
                    </div>
                  )}
                </>
              )}
              
              <div ref={consoleEndRef} />
            </div>

            {/* Terminal Input prompt footer */}
            {bootStep === 5 && (
              <form
                onSubmit={executeCommand}
                className="p-2 border-t border-border/50 bg-background/30 flex gap-2 items-center z-10"
              >
                <span className="text-[10px] text-primary/75 select-none shrink-0 font-bold font-mono">guest@vaibhav:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="type help..."
                  disabled={isJarvisThinking}
                  className="flex-1 min-w-0 bg-transparent text-secondary text-[11px] font-mono focus:outline-none border-0 caret-primary placeholder:text-muted/30"
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
