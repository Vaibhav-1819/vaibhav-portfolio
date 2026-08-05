"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

const highlights = [
  { num: 22007, prefix: "", suffix: "", label: "Matches Processed", color: "text-emerald-400" },
  { num: 638, prefix: "", suffix: "K+", label: "PvP Records Analyzed", color: "text-primary" },
  { num: 11, prefix: "", suffix: "K", label: "Images Classified", color: "text-secondary" },
  { num: 80, prefix: "", suffix: "%", label: "CNN Brand Accuracy", color: "text-primary" },
  { num: 360, prefix: "<", suffix: "μs", label: "Vector Math Latency", color: "text-accent" },
  { num: 1.1, prefix: "~", suffix: "s", label: "Token Revocation Delay", color: "text-emerald-400" },
  { num: 50, prefix: "<", suffix: "ms", label: "WebRTC Edge Delay", color: "text-orange-500" },
  { num: 50, prefix: "<", suffix: "ms", label: "ML Inference Latency", color: "text-accent" }
];

export function EngineeringHighlights() {
  return (
    <section id="highlights" className="py-32 border-t border-border/50 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Engineering</span> <span className="text-primary">Highlights</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            Raw metrics from the datasets, models, and systems I&apos;ve built. No fluff, just scale.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-8 bg-surface/30 border border-border/50 rounded-3xl flex flex-col justify-center items-center text-center group hover:border-primary/50 transition-colors"
            >
              <h3 className={`text-4xl md:text-5xl font-mono font-bold tracking-tighter mb-4 ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                <AnimatedNumber value={item.num} prefix={item.prefix} suffix={item.suffix} />
              </h3>
              <p className="text-sm font-mono text-muted uppercase tracking-[0.1em] leading-relaxed">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
