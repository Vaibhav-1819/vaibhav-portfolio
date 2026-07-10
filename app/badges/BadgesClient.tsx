"use client";

import { motion } from 'framer-motion';

export default function BadgesClient() {
  const badges = [
    "adb8b86c-5338-401e-841d-38b4c3635a39",
    "63fda1c8-3eb1-45af-a39a-b7159fa0c79b",
    "3b78a4d3-88da-469e-b896-c161b612d986",
    "a534d30b-0b26-416b-949b-b9f6cd4859a8",
    "5caddfa4-f8c8-4fb5-92ef-1aa98faa57ae",
    "07351b4d-4251-4838-8d2a-5339c52d7bd8",
    "a793798d-68a1-4c44-b96f-b4cb1562a375",
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

      {/* Optional subtle noise texture if you have one, falling back to a subtle gradient mesh otherwise */}
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
          className="flex flex-wrap justify-center gap-8 md:gap-10 max-w-5xl mx-auto w-full perspective-1000"
        >
          {badges.map((id, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02, rotateX: 2, rotateY: -2 }}
              className="relative group cursor-crosshair w-full max-w-[280px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated Glow Behind Card */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/40 to-accent/40 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-700" />

              <div className="relative flex justify-center items-center p-8 bg-surface/60 backdrop-blur-xl border border-white/5 group-hover:border-white/10 rounded-2xl transition-all duration-500 min-h-[340px] overflow-hidden">

                {/* Subtle internal gradient that shifts on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_10px_35px_rgba(255,255,255,0.05)] translate-z-10 bg-white rounded-lg p-2 overflow-hidden flex items-center justify-center">
                  <iframe
                    width="150"
                    height="270"
                    src={`https://www.credly.com/embedded_badge/${id}`}
                    frameBorder="0"
                    scrolling="no"
                    title={`Credly Badge ${id}`}
                    className="border-none rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
