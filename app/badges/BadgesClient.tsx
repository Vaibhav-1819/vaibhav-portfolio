"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Award, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useState, useMemo } from 'react';

interface BadgeData {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  category: string;
  credentialUrl: string;
  image: string;
  skills: string[];
}

export default function BadgesClient() {
  const badges: BadgeData[] = [
    {
      id: "adb8b86c-5338-401e-841d-38b4c3635a39",
      title: "AI Upskilling Certificate: Hands-On Development from Model to App",
      issuer: "Qualcomm Technologies, Inc.",
      issueDate: "Jul 10, 2026",
      category: "AI",
      credentialUrl: "https://www.credly.com/badges/adb8b86c-5338-401e-841d-38b4c3635a39/public_url",
      image: "/badges/ai-upskilling-certificate-hands-on-development-from.png",
      skills: ["Artificial Intelligence (AI)", "Model Training", "Application Deployment"]
    },
    {
      id: "63fda1c8-3eb1-45af-a39a-b7159fa0c79b",
      title: "AI Upskilling Certificate: Technical Foundations",
      issuer: "Qualcomm Technologies, Inc.",
      issueDate: "Jan 06, 2026",
      category: "AI",
      credentialUrl: "https://www.credly.com/badges/63fda1c8-3eb1-45af-a39a-b7159fa0c79b/public_url",
      image: "/badges/ai-upskilling-certificate-technical-foundations.png",
      skills: ["Generative AI", "Machine Learning (ML)", "Edge AI", "Qualcomm AI"]
    },
    {
      id: "07351b4d-4251-4838-8d2a-5339c52d7bd8",
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      issueDate: "Dec 08, 2025",
      category: "Cybersecurity",
      credentialUrl: "https://www.credly.com/badges/07351b4d-4251-4838-8d2a-5339c52d7bd8/public_url",
      image: "/badges/introduction-to-cybersecurity.png",
      skills: ["Cybersecurity", "Threat Detection", "Network Vulnerabilities", "Privacy And Data Confidentiality"]
    },
    {
      id: "a534d30b-0b26-416b-949b-b9f6cd4859a8",
      title: "Cybersecurity Fundamentals",
      issuer: "IBM SkillsBuild",
      issueDate: "Oct 27, 2025",
      category: "Cybersecurity",
      credentialUrl: "https://www.credly.com/badges/a534d30b-0b26-416b-949b-b9f6cd4859a8/public_url",
      image: "/badges/cybersecurity-fundamentals.png",
      skills: ["Cryptography", "Incident Response", "Information Security", "Security Strategies"]
    },
    {
      id: "3b78a4d3-88da-469e-b896-c161b612d986",
      title: "Artificial Intelligence Fundamentals",
      issuer: "IBM SkillsBuild",
      issueDate: "Jul 31, 2025",
      category: "AI",
      credentialUrl: "https://www.credly.com/badges/3b78a4d3-88da-469e-b896-c161b612d986/public_url",
      image: "/badges/artificial-intelligence-fundamentals.png",
      skills: ["Deep Learning", "Artificial Neural Networks"]
    },
    {
      id: "5caddfa4-f8c8-4fb5-92ef-1aa98faa57ae",
      title: "Data Fundamentals",
      issuer: "IBM SkillsBuild",
      issueDate: "Jul 11, 2025",
      category: "Data",
      credentialUrl: "https://www.credly.com/badges/5caddfa4-f8c8-4fb5-92ef-1aa98faa57ae/public_url",
      image: "/badges/data-fundamentals.png",
      skills: ["Data Analysis", "Data Science", "Data Visualizations", "Clean Data"]
    },
    {
      id: "a793798d-68a1-4c44-b96f-b4cb1562a375",
      title: "AWS Academy Graduate - Data Engineering",
      issuer: "Amazon Web Services Training and Certification",
      issueDate: "Apr 09, 2025",
      category: "Cloud",
      credentialUrl: "https://www.credly.com/badges/a793798d-68a1-4c44-b96f-b4cb1562a375/public_url",
      image: "/badges/aws-academy-graduate-data-engineering-training-badg.png",
      skills: ["Data Engineering", "Data Pipelines", "AWS Cloud", "Securing Data"]
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(badges.map(b => b.category)))];

  const filteredBadges = useMemo(() => {
    return badges.filter(badge => {
      const matchesSearch = badge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        badge.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === "All" || badge.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, badges]);

  return (
    <main className="min-h-screen pt-24 pb-24 relative overflow-hidden flex flex-col items-center">
      {/* Background Decorators */}
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-surface/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 w-full relative z-10">

        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 w-full max-w-6xl mx-auto space-y-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-[-0.03em]">
            <span className="text-secondary">Digital</span> <span className="text-primary">Badges</span>
          </h1>
          <p className="text-muted font-mono text-sm md:text-base leading-relaxed max-w-2xl">
            A verified collection of my continuous learning journey, professional certifications, and specialized technical competencies.
          </p>
        </motion.header>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 max-w-6xl mx-auto w-full"
        >
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${activeCategory === category
                  ? "bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  : "bg-surface/50 text-muted hover:text-secondary hover:bg-surface border border-border/50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/50 border border-border/50 rounded-full py-2.5 pl-11 pr-4 text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors font-mono"
            />
          </div>
        </motion.div>

        {/* Grid Layout */}
        <motion.div layout className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="popLayout">
            {filteredBadges.map((badge) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                key={badge.id}
                className="relative group flex flex-col w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.5rem)]"
              >
                {/* Glow Background */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition duration-700" />

                <div className="relative flex flex-col h-full bg-surface/30 backdrop-blur-xl border border-border/50 group-hover:border-primary/50 rounded-3xl transition-all duration-500 overflow-hidden">

                  {/* Subtle Top Gradient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full p-6 w-full">
                    {/* Badge Image */}
                    <div className="w-full flex justify-center mb-5">
                      <div className="drop-shadow-xl transition-all duration-500 group-hover:drop-shadow-[0_15px_30px_rgba(255,255,255,0.15)] group-hover:brightness-105 group-hover:saturate-110 group-hover:-translate-y-2">
                        <Image
                          src={badge.image}
                          alt={badge.title}
                          width={112}
                          height={112}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Meta Data: Category & Date */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
                        {badge.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
                        <Calendar size={12} />
                        <span>Issued {badge.issueDate}</span>
                      </div>
                    </div>

                    {/* Title & Minimum Height to align cards */}
                    <h3 className="font-heading font-bold text-lg text-secondary mb-1.5 min-h-[50px] leading-snug">
                      {badge.title}
                    </h3>

                    {/* Issuer */}
                    <div className="flex items-center gap-1.5 mb-5">
                      <Award size={14} className="text-muted/70" />
                      <span className="text-xs font-medium text-muted/90">{badge.issuer}</span>
                    </div>

                    {/* Skills Chips */}
                    <div className="mb-6 flex-grow">
                      <div className="flex flex-wrap gap-1.5">
                        {badge.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-background/80 backdrop-blur-md border border-border/50 rounded-md text-[11px] font-mono text-secondary hover:border-primary/30 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={badge.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn w-full mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface/90 backdrop-blur-md text-secondary border border-border/50 font-bold hover:bg-surface hover:border-primary/50 text-xs font-mono transition-all"
                    >
                      <span>View Credential</span>
                      <ExternalLink size={14} className="text-muted group-hover/btn:text-primary group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
