"use client";

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldAlert, Sliders, BrainCircuit } from 'lucide-react';

export function CampusPulseSimulator() {
  const [semanticScore, setSemanticScore] = useState<number>(0.85);
  const [locationScore, setLocationScore] = useState<number>(0.75); // Same Building
  const [categoryScore, setCategoryScore] = useState<number>(1.0); // Identical
  const [hoursElapsed, setHoursElapsed] = useState<number>(2.0);
  const [isSurge, setIsSurge] = useState<boolean>(false);

  // Temporal exponential decay with 12-hour half-life
  const temporalScore = Math.exp(-hoursElapsed / 12);

  // Deterministic 4-Factor Weighted Math
  // Formula: (0.55 × Semantic) + (0.20 × Location) + (0.15 × Category) + (0.10 × Temporal)
  const baseScore = (
    (0.55 * semanticScore) +
    (0.20 * locationScore) +
    (0.15 * categoryScore) +
    (0.10 * temporalScore)
  );
  const finalScore = Math.min(1.0, Math.max(0.0, baseScore));
  const isClustered = finalScore >= 0.68;

  // Explainer text generation
  const getExplanation = () => {
    if (isClustered) {
      return `Correlated into Active Incident (Match: ${(finalScore * 100).toFixed(1)}%): Strong semantic alignment (${(semanticScore * 100).toFixed(0)}%) with ${
        locationScore >= 1.0 ? 'identical room coordinates' : locationScore >= 0.75 ? 'same building match' : 'zone proximity'
      } filed within ${hoursElapsed.toFixed(1)}h. Clustered into root incident ticket.`;
    }
    return `Isolated New Incident (Match: ${(finalScore * 100).toFixed(1)}%): Does not meet clustering threshold (≥ 0.68). Dispatched as independent facility investigation ticket.`;
  };

  return (
    <div className="flex flex-col h-full justify-between font-mono text-xs space-y-4">
      {/* Top Banner & Live Result */}
      <div className="p-3.5 rounded-2xl bg-background/80 border border-border/60 flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <BrainCircuit size={13} className="text-primary" />
            <span>Deterministic Math Engine</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-heading font-black ${isClustered ? 'text-emerald-400' : 'text-amber-400'}`}>
              {(finalScore * 100).toFixed(1)}%
            </span>
            <span className="text-[11px] text-muted">/ 100% Correlation</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="text-right">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
            isClustered
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            {isClustered ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
            <span>{isClustered ? 'CLUSTERED (≥0.68)' : 'ISOLATED (<0.68)'}</span>
          </span>
          <div className="text-[10px] text-muted mt-1">Threshold: 0.68</div>
        </div>
      </div>

      {/* Interactive Sliders & Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Semantic Similarity (55%) */}
        <div className="p-3 rounded-xl bg-surface/50 border border-border/40 space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-secondary font-bold">1. Semantic Cosine (55%)</span>
            <span className="text-primary font-bold">{semanticScore.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.05"
            value={semanticScore}
            onChange={(e) => setSemanticScore(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[9px] text-muted">
            <span>0.0 Orthogonal</span>
            <span>1.0 Identical</span>
          </div>
        </div>

        {/* Temporal Half-Life Decay (10%) */}
        <div className="p-3 rounded-xl bg-surface/50 border border-border/40 space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-secondary font-bold">4. Time Elapsed (10%)</span>
            <span className="text-primary font-bold">{hoursElapsed.toFixed(1)}h</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="36"
            step="0.5"
            value={hoursElapsed}
            onChange={(e) => setHoursElapsed(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[9px] text-muted">
            <span>0h (Decay: 1.0)</span>
            <span>36h (Decay: 0.05)</span>
          </div>
        </div>

        {/* Location Match (20%) */}
        <div className="p-3 rounded-xl bg-surface/50 border border-border/40 space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-secondary font-bold">2. Location Proximity (20%)</span>
            <span className="text-primary font-bold">{locationScore.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-1 pt-0.5">
            {[
              { label: 'Room (1.0)', val: 1.0 },
              { label: 'Building (0.75)', val: 0.75 },
              { label: 'Zone (0.40)', val: 0.40 },
              { label: 'Distant (0.0)', val: 0.0 }
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setLocationScore(opt.val)}
                className={`px-1.5 py-1 rounded text-[9px] transition-all border ${
                  locationScore === opt.val
                    ? 'bg-primary/20 border-primary/50 text-primary font-bold'
                    : 'bg-background/60 border-border/40 text-muted hover:text-secondary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Causality (15%) */}
        <div className="p-3 rounded-xl bg-surface/50 border border-border/40 space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-secondary font-bold">3. Category Link (15%)</span>
            <span className="text-primary font-bold">{categoryScore.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 pt-0.5">
            {[
              { label: 'Same (1.0)', val: 1.0 },
              { label: 'Causal (0.4)', val: 0.4 },
              { label: 'Other (0.0)', val: 0.0 }
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setCategoryScore(opt.val)}
                className={`px-1 py-1 rounded text-[9px] transition-all border ${
                  categoryScore === opt.val
                    ? 'bg-primary/20 border-primary/50 text-primary font-bold'
                    : 'bg-background/60 border-border/40 text-muted hover:text-secondary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Surge Velocity Toggle */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-background/50 border border-border/40">
        <label className="flex items-center gap-2 cursor-pointer select-none text-[11px]">
          <input
            type="checkbox"
            checked={isSurge}
            onChange={(e) => setIsSurge(e.target.checked)}
            className="rounded border-border text-primary focus:ring-0 cursor-pointer"
          />
          <span className="text-secondary">Simulate Velocity Spike (≥3 reports in 45m)</span>
        </label>
        {isSurge && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full animate-pulse">
            <ShieldAlert size={11} /> +15 Priority Boost
          </span>
        )}
      </div>

      {/* Live AI Explainability Output */}
      <div className="p-3 rounded-xl bg-background/70 border border-border/50 space-y-1">
        <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={11} className="text-primary" />
          <span>Explainability Audit Trail</span>
        </div>
        <p className="text-[11px] text-secondary/90 leading-relaxed font-mono">
          {getExplanation()}
        </p>
      </div>
    </div>
  );
}
