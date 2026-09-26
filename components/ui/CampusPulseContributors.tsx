"use client";

import React from 'react';
import { Server, Layout, ShieldCheck, GitMerge, CheckCircle2, Star, Mail, Sparkles, BrainCircuit, Trophy } from 'lucide-react';

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export interface Contributor {
  id: string;
  roleId: string;
  roleTitle: string;
  name: string;
  email: string;
  focusArea: string;
  isSpecialHighlight?: boolean;
  highlightNote?: string;
  icon: React.ReactNode;
  accentBorder: string;
  keyDeliverable: string;
}

export const contributors: Contributor[] = [
  {
    id: "role-1",
    roleId: "Role 01",
    roleTitle: "Backend & Architecture Lead",
    name: "Vaibhav Bharathula",
    email: "bharathulavaibhav@gmail.com",
    focusArea: "API, SQLite & Intelligence Core",
    isSpecialHighlight: true,
    highlightNote: "Architecture Lead",
    icon: <Server className="text-indigo-400" size={15} />,
    accentBorder: "border-indigo-500/30 hover:border-indigo-500/60",
    keyDeliverable: "Designed Express REST API, SQLite 3 (WAL mode), Gemini AI service, vector centroid clustering math, and 58/58 automated test suite."
  },
  {
    id: "role-2",
    roleId: "Role 02",
    roleTitle: "Student Frontend Lead",
    name: "Sreeshanth S",
    email: "sreeshanthsanapala883@gmail.com",
    focusArea: "Student Portal & Reporting UX",
    icon: <Layout className="text-cyan-400" size={15} />,
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
    keyDeliverable: "Built mobile-first reporting portal with interactive category presets, auto-suggest locations, and UUID receipts."
  },
  {
    id: "role-3",
    roleId: "Role 03",
    roleTitle: "Admin Frontend Lead",
    name: "Vignesh Mandadapu",
    email: "mandadapuvignesh@gmail.com",
    focusArea: "Admin Command Center & Telemetry",
    icon: <ShieldCheck className="text-amber-400" size={15} />,
    accentBorder: "border-amber-500/30 hover:border-amber-500/60",
    keyDeliverable: "Engineered real-time KPI telemetry bar, multi-factor triage filters, and incident event audit timeline drawers."
  },
  {
    id: "role-4",
    roleId: "Role 04",
    roleTitle: "Integration & Demo Lead",
    name: "Sumanth Teju",
    email: "23951a12d7@iare.ac.in",
    focusArea: "Client-Server Wiring & Seeder",
    icon: <GitMerge className="text-emerald-400" size={15} />,
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    keyDeliverable: "Wired live API fetch clients, authored canonical 6-report demo dataset, and automated database seeder pipeline."
  }
];

export function CampusPulseContributors() {
  return (
    <div className="not-prose my-8 space-y-4">
      {/* Compact Header Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface/40 backdrop-blur-md border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-[11px] font-mono font-bold text-amber-400 shadow-sm shadow-amber-500/10">
              <Trophy size={12} className="text-amber-400" />
              <span>Shortlisted for Regional Finale</span>
            </span>
            <span className="text-primary font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={13} />
              <span>IBM SkillsBuild</span>
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-heading font-bold text-secondary">
            4-Member Engineering Team • Team Point Break
          </h3>
          <p className="text-xs text-muted font-mono mt-0.5">
            SkillUp Hackathon 2026 Regional Finalists (in collaboration with IBM SkillsBuild).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="/images/team_point_break_certificate.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold transition-all w-fit"
          >
            <Trophy size={13} />
            <span>Certificate</span>
          </a>
          <a
            href="https://github.com/Vaibhav-1819/CampusPulseAI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-mono text-xs font-bold transition-all w-fit"
          >
            <GithubIcon size={14} />
            <span>Repository</span>
          </a>
        </div>
      </div>

      {/* Compact 4-Card Balanced Responsive 2x2 Grid */}
      <div className="flex flex-wrap justify-center gap-3">
        {contributors.map((c) => (
          <div
            key={c.id}
            className={`w-full sm:w-[calc(50%-0.4rem)] flex flex-col justify-between rounded-2xl bg-surface/30 backdrop-blur-md border ${c.accentBorder} p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-surface/50`}
          >
            <div>
              {/* Top Row: Role Pill & Highlight Badge */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2 py-0.5 rounded-full bg-background border border-border/60 font-mono text-[10px] font-bold text-secondary flex items-center gap-1">
                  {c.icon}
                  <span>{c.roleId}</span>
                </span>

                {c.isSpecialHighlight && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono font-bold text-amber-400">
                    <Star size={9} className="fill-amber-400" />
                    <span>{c.highlightNote}</span>
                  </span>
                )}
              </div>

              {/* Contributor Name & Role Title */}
              <div className="mb-2">
                <h4 className="text-sm font-heading font-bold text-secondary leading-snug">
                  {c.name}
                </h4>
                <div className="text-xs text-primary font-mono font-medium mt-0.5">
                  {c.roleTitle}
                </div>
              </div>

              {/* Scope Tag */}
              <div className="mb-2.5">
                <span className="text-[10px] font-mono text-muted bg-background/60 px-2 py-0.5 rounded border border-border/40 inline-block">
                  Scope: <span className="text-secondary/90 font-bold">{c.focusArea}</span>
                </span>
              </div>

              {/* Key Deliverable */}
              <div className="pt-2 border-t border-border/30 flex items-start gap-1.5 text-[11px] text-muted font-mono leading-relaxed">
                <CheckCircle2 size={12} className="text-primary mt-0.5 shrink-0" />
                <span>{c.keyDeliverable}</span>
              </div>
            </div>

            {/* Email Contact Footer */}
            <div className="mt-3 pt-2 border-t border-border/20 flex items-center justify-between">
              <a
                href={`mailto:${c.email}`}
                className="text-[10px] font-mono text-muted hover:text-secondary inline-flex items-center gap-1 transition-colors truncate"
              >
                <Mail size={10} className="shrink-0" />
                <span className="truncate">{c.email}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Compact Bottom Architectural Callout */}
      <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-3">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
          <Star size={14} />
        </div>
        <p className="text-xs text-muted font-mono leading-relaxed">
          <span className="text-secondary font-bold">Cross-Functional Engineering (Vaibhav Bharathula): </span>
          <span>Spearheaded backend architecture and correlation math (Role 01), while co-leading full-stack integration, 58/58 automated test suite, and merge resolution (Role 04).</span>
        </p>
      </div>
    </div>
  );
}
