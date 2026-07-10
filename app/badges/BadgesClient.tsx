"use client";

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface BadgeData {
  id: string;
  title: string;
  image: string;
  skills: string[];
}

export default function BadgesClient() {
  const badges: BadgeData[] = [
    {
      id: "adb8b86c-5338-401e-841d-38b4c3635a39",
      title: "AI Upskilling Certificate: Hands-On Development from Model to App",
      image: "https://images.credly.com/images/f388d21a-9bf3-4102-8164-60a78766bd2f/linkedin_thumb_blob",
      skills: ["AI Development", "Model to App", "Machine Learning"]
    },
    {
      id: "63fda1c8-3eb1-45af-a39a-b7159fa0c79b",
      title: "AI Upskilling Certificate: Technical Foundations",
      image: "https://images.credly.com/images/96831a3c-3e83-4871-808f-ed675b593a1e/linkedin_thumb_blob",
      skills: ["AI Foundations", "Technical Concepts", "Algorithms"]
    },
    {
      id: "3b78a4d3-88da-469e-b896-c161b612d986",
      title: "Artificial Intelligence Fundamentals",
      image: "https://images.credly.com/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/linkedin_thumb_image.png",
      skills: ["AI Fundamentals", "Machine Learning", "Data Science"]
    },
    {
      id: "a534d30b-0b26-416b-949b-b9f6cd4859a8",
      title: "Cybersecurity Fundamentals",
      image: "https://images.credly.com/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/linkedin_thumb_image.png",
      skills: ["Cybersecurity", "Network Security", "Threat Intelligence"]
    },
    {
      id: "5caddfa4-f8c8-4fb5-92ef-1aa98faa57ae",
      title: "Data Fundamentals",
      image: "https://images.credly.com/images/edaf0f19-2df0-4759-8871-7b1b44687f53/linkedin_thumb_image.png",
      skills: ["Data Analysis", "Database Management", "Data Analytics"]
    },
    {
      id: "07351b4d-4251-4838-8d2a-5339c52d7bd8",
      title: "Introduction to Cybersecurity",
      image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/linkedin_thumb_I2CS__1_.png",
      skills: ["Cybersecurity Basics", "Information Security", "Risk Management"]
    },
    {
      id: "a793798d-68a1-4c44-b96f-b4cb1562a375",
      title: "AWS Academy Graduate - Data Engineering",
      image: "https://images.credly.com/images/8a28a66c-151d-4f2d-b021-ca7d3e146437/linkedin_thumb_blob",
      skills: ["AWS", "Data Engineering", "Cloud Computing"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 relative overflow-hidden flex flex-col items-center">
      {/* Subtle ambient light matching dark mode */}
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-surface/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--background),0)_0%,rgba(var(--background),1)_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-24 text-center max-w-3xl mx-auto"
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-8 md:gap-10 max-w-5xl mx-auto w-full"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group w-full max-w-[340px] flex flex-col"
            >
              {/* Animated Glow Behind Card */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-700" />

              <div className="relative flex flex-col h-full p-8 bg-surface/60 backdrop-blur-xl border border-white/5 group-hover:border-white/20 rounded-2xl transition-all duration-500 overflow-hidden">
                
                {/* Subtle internal gradient that shifts on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full items-start w-full">
                  {/* Badge Image */}
                  <div className="w-full flex justify-center mb-8 drop-shadow-2xl">
                    <img
                      src={badge.image}
                      alt={badge.title}
                      className="w-32 h-32 object-contain filter group-hover:drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)] transition-all duration-500"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl text-secondary mb-6 leading-tight">
                    {badge.title}
                  </h3>

                  {/* Skills */}
                  <div className="mb-8 flex-grow">
                    <p className="text-xs font-mono tracking-widest text-muted uppercase mb-3">Skills:</p>
                    <ul className="space-y-2">
                      {badge.skills.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted/90 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0 mt-1.5"></span>
                          <span className="leading-snug">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Link */}
                  <a
                    href={`https://www.credly.com/badges/${badge.id}/public_url`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-mono font-bold text-primary hover:text-primary/80 transition-colors mt-auto group/link"
                  >
                    View Verified Credential
                    <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
