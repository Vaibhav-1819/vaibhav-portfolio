"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BarChart3, PieChart, Activity, CheckCircle2 } from "lucide-react";

export function Experiments() {
  return (
    <section id="experiments" className="py-32 border-t border-border/50 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 space-y-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em] text-secondary">
            Engineering Experiments
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Interactive sandboxes demonstrating the logic behind my machine learning and data pipelines.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto pb-8 md:pb-0 scrollbar-hide px-6 md:px-0 -mx-6 md:mx-auto">
          {/* Experiment 01: Match Prediction */}
          <div className="min-w-[85vw] md:min-w-0 snap-center p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/50 flex flex-col h-[500px]">
            <div className="mb-6">
              <span className="text-[11px] font-mono text-muted uppercase tracking-[0.2em]">Experiment 01</span>
              <h3 className="font-heading font-bold text-2xl mt-2 tracking-[-0.02em]">Match Prediction</h3>
            </div>
            <MatchPredictionWidget />
          </div>

          {/* Experiment 02: Analytics Explorer */}
          <div className="min-w-[85vw] md:min-w-0 snap-center p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/50 flex flex-col h-[500px]">
            <div className="mb-6">
              <span className="text-[11px] font-mono text-muted uppercase tracking-[0.2em]">Experiment 02</span>
              <h3 className="font-heading font-bold text-2xl mt-2 tracking-[-0.02em]">Analytics Explorer</h3>
            </div>
            <AnalyticsExplorerWidget />
          </div>

          {/* Experiment 03: ML Pipeline Explorer */}
          <div className="min-w-[85vw] md:min-w-0 snap-center p-6 md:p-8 rounded-3xl bg-surface/30 border border-border/50 flex flex-col lg:col-span-2 h-[500px] md:h-[400px]">
            <div className="mb-6">
              <span className="text-[11px] font-mono text-muted uppercase tracking-[0.2em]">Experiment 03</span>
              <h3 className="font-heading font-bold text-2xl mt-2 tracking-[-0.02em]">ML Pipeline Explorer</h3>
            </div>
            <MLPipelineWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

function MatchPredictionWidget() {
  const [status, setStatus] = useState<"idle" | "predicting" | "result">("idle");

  return (
    <div className="flex-1 bg-background/50 rounded-2xl border border-border/50 p-6 flex flex-col relative overflow-hidden">
      <div className="space-y-4 mb-auto">
        <div>
          <label className="text-xs font-mono text-muted uppercase">Team A vs Team B</label>
          <div className="flex items-center gap-2 mt-2">
            <select className="w-full bg-surface border border-border rounded-lg p-2 text-sm text-secondary outline-none focus:border-primary">
              <option>India</option>
              <option>Australia</option>
              <option>England</option>
            </select>
            <span className="text-muted text-xs">vs</span>
            <select className="w-full bg-surface border border-border rounded-lg p-2 text-sm text-secondary outline-none focus:border-primary">
              <option>Australia</option>
              <option>India</option>
              <option>England</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-mono text-muted uppercase">Venue</label>
          <select className="w-full bg-surface border border-border rounded-lg p-2 text-sm text-secondary mt-2 outline-none focus:border-primary">
            <option>Wankhede Stadium</option>
            <option>MCG</option>
            <option>Lord's</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.button 
            key="btn"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => {
              setStatus("predicting");
              setTimeout(() => setStatus("result"), 1200);
            }}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-colors mt-6"
          >
            Run Prediction
          </motion.button>
        )}
        
        {status === "predicting" && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full py-3 bg-surface border border-primary/50 text-primary font-mono text-sm rounded-xl flex items-center justify-center mt-6 gap-3"
          >
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Analyzing Features...
          </motion.div>
        )}

        {status === "result" && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="w-full p-4 bg-primary/10 border border-primary/30 rounded-xl mt-6 space-y-3 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle2 size={40} />
            </div>
            <div>
              <p className="text-xs font-mono text-muted uppercase">Win Probability</p>
              <p className="text-2xl font-bold text-primary tracking-tight">India 62%</p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs font-mono text-muted uppercase">Confidence</p>
                <p className="text-sm font-bold text-emerald-400">High</p>
              </div>
              <div>
                <p className="text-xs font-mono text-muted uppercase">Exp. Score</p>
                <p className="text-sm font-bold text-secondary">185-195</p>
              </div>
            </div>
            <button 
              onClick={() => setStatus("idle")} 
              className="absolute top-4 right-4 text-xs font-mono text-muted hover:text-primary underline"
            >
              Reset
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnalyticsExplorerWidget() {
  const [tab, setTab] = useState(0);
  const tabs = [
    { name: "Runs", icon: BarChart3 },
    { name: "Venues", icon: PieChart },
    { name: "Trends", icon: Activity }
  ];

  return (
    <div className="flex-1 bg-background/50 rounded-2xl border border-border/50 p-6 flex flex-col">
      <div className="flex gap-2 mb-6 border-b border-border/50 pb-4">
        {tabs.map((t, i) => (
          <button 
            key={t.name}
            onClick={() => setTab(i)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${tab === i ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted hover:bg-surface border border-transparent'}`}
          >
            <t.icon size={14} /> {t.name}
          </button>
        ))}
      </div>
      
      <div className="flex-1 relative flex items-end justify-between gap-2 pb-4">
        {/* Mock Animated Chart Bars */}
        {[...Array(6)].map((_, i) => {
          // generate mock heights based on active tab
          const h = 20 + Math.random() * 60 + (tab * 10);
          return (
            <motion.div 
              key={i + tab * 10}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${h}%`, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.05 }}
              className="w-full bg-primary/20 border-t-2 border-primary rounded-t-sm"
            />
          );
        })}
      </div>
    </div>
  );
}

function MLPipelineWidget() {
  const [activeNode, setActiveNode] = useState(0);
  const nodes = [
    { name: "Dataset", desc: "22,007 raw JSON match files ingested from Cricsheet." },
    { name: "Feature Eng", desc: "Point-in-time calculation of PvP stats, strike rates, and venue history." },
    { name: "Training", desc: "Random Forest & XGBoost models trained with K-Fold cross validation." },
    { name: "Evaluation", desc: "Baseline accuracy evaluated at 61.66% against test datasets." },
    { name: "Inference", desc: "Served via FastAPI with <50ms latency for live matches." }
  ];

  return (
    <div className="flex-1 bg-background/50 rounded-2xl border border-border/50 p-4 md:p-6 flex flex-col justify-center items-center relative overflow-y-auto">
      
      {/* Mobile: Vertical Expandable Accordion */}
      <div className="w-full flex md:hidden flex-col gap-2 relative z-10 h-full">
        {nodes.map((node, i) => (
          <div 
            key={node.name}
            className={`border rounded-xl transition-all overflow-hidden ${activeNode === i ? 'bg-primary/5 border-primary/30' : 'bg-surface border-border'}`}
          >
            <button 
              onClick={() => setActiveNode(i)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${activeNode === i ? 'bg-primary text-primary-foreground' : 'bg-background text-muted'}`}>
                  {i + 1}
                </span>
                <span className={`font-heading font-bold text-sm ${activeNode === i ? 'text-primary' : 'text-secondary'}`}>
                  {node.name}
                </span>
              </div>
            </button>
            <AnimatePresence>
              {activeNode === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 text-xs text-muted leading-relaxed"
                >
                  {node.desc}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Desktop: Horizontal Nodes */}
      <div className="hidden md:flex w-full items-center justify-between relative z-10">
        {/* Connecting Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-border z-0">
          <motion.div 
            className="h-full bg-primary transition-all duration-300" 
            animate={{ width: `${(activeNode / (nodes.length - 1)) * 100}%` }} 
          />
        </div>

        {nodes.map((node, i) => (
          <button 
            key={node.name}
            onClick={() => setActiveNode(i)}
            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center z-10 transition-all duration-300 border-2 text-xs font-mono font-bold
              ${activeNode === i ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 
                activeNode > i ? 'bg-primary/20 text-primary border-primary/50' : 'bg-surface text-muted border-border hover:border-muted'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Desktop: Explanation Panel */}
      <div className="mt-12 h-24 w-full max-w-2xl text-center hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="font-heading font-bold text-xl text-secondary mb-2">{nodes[activeNode].name}</h4>
            <p className="text-muted text-sm leading-relaxed">{nodes[activeNode].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
}
