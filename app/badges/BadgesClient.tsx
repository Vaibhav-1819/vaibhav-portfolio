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
  level: string;
  credentialUrl: string;
  image: string;
  skills: string[];
}

export default function BadgesClient() {
  const badges: BadgeData[] = [
    {
      id: "adb8b86c-5338-401e-841d-38b4c3635a39",
      title: "AI Upskilling Certificate: Hands-On Development from Model to App",
      issuer: "TODO: Add Issuer",
      issueDate: "TODO: Add Date",
      category: "AI",
      level: "TODO: Add Level",
      credentialUrl: "https://www.credly.com/badges/adb8b86c-5338-401e-841d-38b4c3635a39/public_url",
      image: "https://images.credly.com/images/f388d21a-9bf3-4102-8164-60a78766bd2f/linkedin_thumb_blob",
      skills: ["TODO: Skill 1", "TODO: Skill 2"]
    },
    {
      id: "63fda1c8-3eb1-45af-a39a-b7159fa0c79b",
      title: "AI Upskilling Certificate: Technical Foundations",
      issuer: "TODO: Add Issuer",
      issueDate: "TODO: Add Date",
      category: "AI",
      level: "TODO: Add Level",
      credentialUrl: "https://www.credly.com/badges/63fda1c8-3eb1-45af-a39a-b7159fa0c79b/public_url",
      image: "https://images.credly.com/images/96831a3c-3e83-4871-808f-ed675b593a1e/linkedin_thumb_blob",
      skills: ["TODO: Skill 1", "TODO: Skill 2"]
    },
    {
      id: "3b78a4d3-88da-469e-b896-c161b612d986",
      title: "Artificial Intelligence Fundamentals",
      issuer: "TODO: Add Issuer",
      issueDate: "TODO: Add Date",
      category: "AI",
      level: "TODO: Add Level",
      credentialUrl: "https://www.credly.com/badges/3b78a4d3-88da-469e-b896-c161b612d986/public_url",
      image: "https://images.credly.com/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/linkedin_thumb_image.png",
      skills: ["TODO: Skill 1", "TODO: Skill 2"]
    },
    {
      id: "a534d30b-0b26-416b-949b-b9f6cd4859a8",
      title: "Cybersecurity Fundamentals",
      issuer: "TODO: Add Issuer",
      issueDate: "TODO: Add Date",
      category: "Cybersecurity",
      level: "TODO: Add Level",
      credentialUrl: "https://www.credly.com/badges/a534d30b-0b26-416b-949b-b9f6cd4859a8/public_url",
      image: "https://images.credly.com/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/linkedin_thumb_image.png",
      skills: ["TODO: Skill 1", "TODO: Skill 2"]
    },
    {
      id: "5caddfa4-f8c8-4fb5-92ef-1aa98faa57ae",
      title: "Data Fundamentals",
      issuer: "TODO: Add Issuer",
      issueDate: "TODO: Add Date",
      category: "Data",
      level: "TODO: Add Level",
      credentialUrl: "https://www.credly.com/badges/5caddfa4-f8c8-4fb5-92ef-1aa98faa57ae/public_url",
      image: "https://images.credly.com/images/edaf0f19-2df0-4759-8871-7b1b44687f53/linkedin_thumb_image.png",
      skills: ["TODO: Skill 1", "TODO: Skill 2"]
    },
    {
      id: "07351b4d-4251-4838-8d2a-5339c52d7bd8",
      title: "Introduction to Cybersecurity",
      issuer: "TODO: Add Issuer",
      issueDate: "TODO: Add Date",
      category: "Cybersecurity",
      level: "TODO: Add Level",
      credentialUrl: "https://www.credly.com/badges/07351b4d-4251-4838-8d2a-5339c52d7bd8/public_url",
      image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/linkedin_thumb_I2CS__1_.png",
      skills: ["TODO: Skill 1", "TODO: Skill 2"]
    },
    {
      id: "a793798d-68a1-4c44-b96f-b4cb1562a375",
      title: "AWS Academy Graduate - Data Engineering",
      issuer: "TODO: Add Issuer",
      issueDate: "TODO: Add Date",
      category: "Cloud",
      level: "TODO: Add Level",
      credentialUrl: "https://www.credly.com/badges/a793798d-68a1-4c44-b96f-b4cb1562a375/public_url",
      image: "https://images.credly.com/images/8a28a66c-151d-4f2d-b021-ca7d3e146437/linkedin_thumb_blob",
      skills: ["TODO: Skill 1", "TODO: Skill 2"]
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
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden flex flex-col items-center">
      {/* Background Decorators */}
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-surface/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 w-full relative z-10">
        
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            CREDENTIALS
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-secondary to-muted mb-6 tracking-tight">
            Digital Badges
          </h1>
          <p className="text-muted/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
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
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                  activeCategory === category
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="popLayout">
            {filteredBadges.map((badge) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                key={badge.id}
                className="relative group flex flex-col"
              >
                {/* Glow Background */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition duration-700" />

                <div className="relative flex flex-col h-full bg-surface/40 backdrop-blur-xl border border-white/5 group-hover:border-white/15 rounded-3xl transition-all duration-500 overflow-hidden">
                  
                  {/* Subtle Top Gradient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full p-8 w-full">
                    {/* Badge Image */}
                    <div className="w-full flex justify-center mb-8">
                      <div className="relative w-32 h-32 drop-shadow-xl transition-all duration-500 group-hover:drop-shadow-[0_15px_30px_rgba(255,255,255,0.15)] group-hover:brightness-105 group-hover:saturate-110 group-hover:-translate-y-2">
                        <Image
                          src={badge.image}
                          alt={badge.title}
                          fill
                          sizes="128px"
                          className="object-contain"
                          priority
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
                    <h3 className="font-heading font-bold text-xl text-secondary mb-2 min-h-[60px] leading-snug">
                      {badge.title}
                    </h3>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 mb-8">
                      <Award size={16} className="text-muted/70" />
                      <span className="text-sm font-medium text-muted/90">{badge.issuer}</span>
                    </div>

                    {/* Skills Chips */}
                    <div className="mb-10 flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {badge.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1.5 rounded-lg bg-background/50 border border-border/50 text-xs font-mono text-muted/90 hover:text-secondary hover:border-primary/30 transition-colors"
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
                      className="group/btn w-full mt-auto flex items-center justify-center gap-2 py-3.5 rounded-xl bg-background/80 hover:bg-surface border border-white/5 hover:border-primary/50 text-sm font-mono font-bold text-secondary transition-all"
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
