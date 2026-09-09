"use client";

import React from 'react';
import { Server, Layout, ShieldCheck, GitMerge, CheckCircle2, Star, Mail, Sparkles } from 'lucide-react';

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface Contributor {
  roleId: string;
  roleTitle: string;
  names: string[];
  emails: string[];
  focusArea: string;
  isSpecialHighlight?: boolean;
  highlightNote?: string;
  icon: React.ReactNode;
  accentColor: string;
  deliverables: string[];
}

const contributors: Contributor[] = [
  {
    roleId: "Role 01",
    roleTitle: "Backend & Architecture Owner",
    names: ["Vaibhav Bharathula"],
    emails: ["bharathulavaibhav@gmail.com"],
    focusArea: "Backend API, SQLite Engine & Intelligence Core",
    isSpecialHighlight: true,
    highlightNote: "Spearheaded Architecture & Math Engine",
    icon: <Server className="text-indigo-400" size={20} />,
    accentColor: "from-indigo-500/20 to-purple-500/10 border-indigo-500/40",
    deliverables: [
      "Engineered Express REST API with strict separation between controllers and domain services.",
      "Designed SQLite 3 persistence layer with Write-Ahead Logging (WAL) and foreign key integrity.",
      "Architected AIService interface: Gemini 1.5 Flash (strict JSON Schema) + offline MockAIService fallback.",
      "Implemented IncidentIntelligenceEngine: 4-factor correlation math, dynamic impact scoring, and explainability generator."
    ]
  },
  {
    roleId: "Role 02",
    roleTitle: "Student Frontend Owner",
    names: ["Sreeshanth S"],
    emails: ["sreeshanthsanapala883@gmail.com"],
    focusArea: "Student Portal & Reporting UX",
    icon: <Layout className="text-cyan-400" size={20} />,
    accentColor: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40",
    deliverables: [
      "Built the mobile-first Student Incident Reporting Portal (/features/student).",
      "Developed interactive category selector cards with visual icon badges and quick-selection presets.",
      "Implemented real-time campus building and room auto-suggest with demo presets.",
      "Engineered client-side form validation, copyable ticket receipt modal, and localStorage tracker."
    ]
  },
  {
    roleId: "Role 03",
    roleTitle: "Admin Frontend Owner",
    names: ["Vignesh Mandadapu"],
    emails: ["mandadapuvignesh@gmail.com"],
    focusArea: "Admin Command Center & Telemetry",
    icon: <ShieldCheck className="text-amber-400" size={20} />,
    accentColor: "from-amber-500/20 to-orange-500/10 border-amber-500/40",
    deliverables: [
      "Engineered the Admin Incident Command Center (/features/admin) with real-time KPI telemetry.",
      "Built multi-factor filter & search controls for status triage, severity tiers, and campus buildings.",
      "Created Incident Detail Drawer featuring chronological audit timelines (incident_events).",
      "Implemented administrative status mutation workflows (INVESTIGATING, IN_PROGRESS, RESOLVED, CLOSED)."
    ]
  },
  {
    roleId: "Role 04",
    roleTitle: "Integration, QA & Demo Owners",
    names: ["Sumanth Teju", "Vaibhav Bharathula"],
    emails: ["23951a12d7@iare.ac.in", "bharathulavaibhav@gmail.com"],
    focusArea: "End-to-End Integration, Automated Testing & Verification",
    isSpecialHighlight: true,
    highlightNote: "Dual Role Co-Owner & Full Stack QA",
    icon: <GitMerge className="text-emerald-400" size={20} />,
    accentColor: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40",
    deliverables: [
      "Connected decoupled frontend and backend services via live API fetch clients and proxy configurations.",
      "Authored canonical 6-report test sequence (demo-scenario.json) and database seeder (npm run db:seed).",
      "Constructed and validated full 19/19 automated test suite covering unit math and API integration.",
      "Resolved complex multi-file Git merge conflicts across 10 frontend files during portal unification."
    ]
  }
];

export function CampusPulseContributors() {
  return (
    <div className="not-prose my-12 space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-surface/40 backdrop-blur-md border border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-widest mb-1.5">
            <Sparkles size={14} />
            <span>IBM SkillsBuild Hackathon Engineering Team</span>
          </div>
          <h3 className="text-lg md:text-xl font-heading font-bold text-secondary">
            4-Role Cross-Functional Team Architecture
          </h3>
          <p className="text-xs md:text-sm text-muted font-mono mt-1">
            Built with strict separation of concerns, frozen API contracts, and independent parallel development.
          </p>
        </div>

        <a
          href="https://github.com/Vaibhav-1819/CampusPulseAI"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-mono text-xs font-bold transition-all shrink-0 w-fit"
        >
          <GithubIcon size={15} />
          <span>View on GitHub</span>
        </a>
      </div>

      {/* 2x2 Clean Aligned Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contributors.map((c) => (
          <div
            key={c.roleId}
            className={`relative flex flex-col rounded-3xl bg-surface/30 backdrop-blur-md border ${c.accentColor} p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            {/* Top Bar: Role badge & Optional Special Badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-background border border-border/60 font-mono text-xs font-bold text-secondary flex items-center gap-1.5">
                {c.icon}
                <span>{c.roleId}</span>
              </span>

              {c.isSpecialHighlight && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-400">
                  <Star size={10} className="fill-amber-400" />
                  <span>{c.highlightNote}</span>
                </span>
              )}
            </div>

            {/* Role Title */}
            <h4 className="text-base md:text-lg font-heading font-bold text-secondary mb-1">
              {c.roleTitle}
            </h4>

            {/* Names & Contact */}
            <div className="mb-4 space-y-1">
              <div className="text-sm font-bold text-primary font-mono">
                {c.names.join(' • ')}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted font-mono">
                {c.emails.map((email) => (
                  <span key={email} className="inline-flex items-center gap-1">
                    <Mail size={11} />
                    <span>{email}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Focus Scope Pill */}
            <div className="mb-5 pb-4 border-b border-border/40">
              <span className="text-[11px] font-mono text-muted/90 bg-background/80 px-2.5 py-1 rounded-lg border border-border/50 block w-fit">
                Scope: <strong className="text-secondary">{c.focusArea}</strong>
              </span>
            </div>

            {/* Deliverables List */}
            <div className="mt-auto space-y-2.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted font-bold">
                Key Engineering Deliverables:
              </div>
              <ul className="space-y-2">
                {c.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted font-mono leading-relaxed">
                    <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Architectural Callout */}
      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
          <Star size={18} />
        </div>
        <div className="space-y-1">
          <h5 className="text-xs md:text-sm font-heading font-bold text-secondary">
            Cross-Functional Ownership: Vaibhav Bharathula
          </h5>
          <p className="text-xs text-muted font-mono leading-relaxed">
            In addition to architecting the backend API, SQLite schema, and deterministic correlation engine (<strong>Role 1</strong>), Vaibhav Bharathula also co-owned <strong>Role 4 (Integration, QA &amp; Demo)</strong> alongside Sumanth Teju—ensuring frozen contract compliance between the student and admin portals, implementing the 19-test automated suite, and crafting the canonical live demonstration pipeline.
          </p>
        </div>
      </div>
    </div>
  );
}
