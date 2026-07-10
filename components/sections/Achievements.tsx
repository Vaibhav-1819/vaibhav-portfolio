"use client";

import { motion } from "framer-motion";
import { Trophy, Code2, Award } from "lucide-react";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function AchievementsSection() {

  const stats = [
    { label: "Young Turks Percentile", value: 97, suffix: "", subtitle: "Top 3% Nationwide" },
    { label: "CodeChef Max Rating", value: 834, suffix: "", subtitle: "Division 4" },
    { label: "LeetCode Solved", value: 113, suffix: "+", subtitle: "Data Structures & Algorithms" },
    { label: "GeeksforGeeks", value: 69, suffix: "+", subtitle: "Problem Solving" }
  ];

  const coreCerts = [
    { title: "AI Upskilling Certificate: Technical Foundation", provider: "Qualcomm", date: "Nov 2025" },
    { title: "Oracle Cloud Infrastructure Foundations Associate", provider: "Oracle", date: "Sep 2025" },
    { title: "Artificial Intelligence Fundamentals", provider: "IBM SkillsBuild", date: "Jul 2025" },
    { title: "Generative AI for Data Science", provider: "Coursera", date: "May 2025" },
    { title: "AWS Academy Graduate - Data Engineering", provider: "AWS Training", date: "Apr 2025" }
  ];

  const hiddenCerts: Array<{ title: string, provider: string, date: string }> = [
    // Empty for now since the user provided exactly 5, all of which are featured.
  ];


  return (
    <section id="achievements" className="py-32 border-t border-border/50 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Proof of</span> <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            Competitive programming dashboards, social proof, and cloud foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">

          {/* Left Column: Coding Profiles & Stats */}
          <div className="space-y-8">
            <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted pb-4 border-b border-border/50">
              <Code2 size={16} /> Competitive Profiles
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-surface/30 border border-border/50 flex flex-col justify-between group hover:bg-surface/50 transition-colors"
                >
                  <div className="mb-4">
                    <p className="text-3xl font-mono font-bold text-secondary group-hover:text-primary transition-colors tracking-tight">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-muted/60 font-mono mt-1">{stat.subtitle}</p>
                  </div>
                  <p className="text-sm font-bold text-secondary">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-bold text-secondary">Salesforce Agentblazer</p>
                <p className="text-xs text-primary font-mono mt-1 uppercase tracking-widest">Champion 2026</p>
              </div>
              <Trophy className="text-primary opacity-50" size={32} />
            </motion.div>
          </div>

          {/* Right Column: Certifications */}
          <div className="space-y-8">
            <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted pb-4 border-b border-border/50">
              <Award size={16} /> Cloud & AI Certifications
            </h3>
            <div className="flex flex-col gap-4">
              {coreCerts.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-6 py-4 rounded-xl bg-surface/20 border border-border/50 hover:border-primary/50 transition-colors flex items-start gap-3 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0 group-hover:bg-primary transition-colors" />
                  <div>
                    <p className="text-sm font-bold text-secondary leading-tight">{cert.title}</p>
                    <p className="text-[10px] sm:text-xs font-mono text-muted mt-1.5 uppercase tracking-widest">{cert.provider} • {cert.date}</p>
                  </div>
                </motion.div>
              ))}



              <a
                href="/badges"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-xs font-mono uppercase tracking-widest text-primary hover:text-primary mt-2"
              >
                <Award size={14} />
                View Verified Credly Badges
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
