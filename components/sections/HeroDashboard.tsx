
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { heroContent } from "@/content/hero";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Activity, Code, GitCommit, Layout, Server, Sparkles, BookOpen } from "lucide-react";

async function getGithubStats() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/Vaibhav-1819', { next: { revalidate: 3600 } }),
      fetch('https://api.github.com/users/Vaibhav-1819/repos?sort=pushed&per_page=1', { next: { revalidate: 3600 } })
    ]);
    
    if (!userRes.ok) return { repos: 24, latestRepo: 'cricsphere', lastUpdated: 'Recently' };
    
    const data = await userRes.json();
    let latestRepo = 'cricsphere';
    let lastUpdated = 'Recently';

    if (reposRes.ok) {
      const reposData = await reposRes.json();
      if (reposData.length > 0) {
        latestRepo = reposData[0].name;
        const pushedDate = new Date(reposData[0].pushed_at);
        const diffDays = Math.floor((new Date().getTime() - pushedDate.getTime()) / (1000 * 60 * 60 * 24));
        lastUpdated = diffDays === 0 ? 'Today' : diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
      }
    }

    return { repos: data.public_repos, latestRepo, lastUpdated };
  } catch (e) {
    return { repos: 24, latestRepo: 'cricsphere', lastUpdated: 'Recently' }; 
  }
}

export async function HeroDashboard() {
  const cricsphere = projects.find(p => p.slug === 'cricsphere');
  const githubStats = await getGithubStats();

  return (
    <section id="hero" className="min-h-[100dvh] flex flex-col justify-center pt-24 pb-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Left Side: Headline & Typography */}
        <div className="space-y-6 md:space-y-8 z-10 px-6 md:px-0 flex flex-col">
          
          {/* Mobile Status Tag */}
          <div className="md:hidden flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-muted uppercase tracking-widest">Developer Workspace</span>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-[76px] font-heading font-black tracking-[-0.03em] leading-[1.05] text-secondary">
              Building intelligent software <br className="hidden md:block" />
              <span className="text-muted tracking-[-0.02em]">from data to intelligent products.</span>
            </h1>
            <p className="text-base md:text-xl text-muted max-w-lg leading-relaxed hidden md:block">
              {heroContent.philosophy}
            </p>
          </div>

          <div className="hidden md:flex flex-wrap gap-3">
            {heroContent.roles.map((role) => (
              <span 
                key={role} 
                className="px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide bg-surface border border-border text-primary uppercase"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Mobile Specific Info & Buttons */}
          <div className="flex md:hidden flex-col gap-6 pt-2">
             <div className="flex flex-col gap-1">
               <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Current Build</span>
               <span className="font-heading font-bold text-2xl text-secondary">CricSphere</span>
             </div>

             <div className="flex flex-wrap items-center gap-3">
               <a href="#projects" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide active:scale-95 transition-transform shadow-[0_0_20px_rgba(var(--color-primary),0.3)]">
                 Launch Workspace
               </a>
               <Link href="/resume" className="px-6 py-3 rounded-full bg-surface border border-border text-secondary font-bold text-sm tracking-wide active:scale-95 transition-transform">
                 Resume
               </Link>
               <a href="https://github.com/Vaibhav-1819" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-surface border border-border text-secondary font-bold text-sm tracking-wide active:scale-95 transition-transform">
                 GitHub
               </a>
             </div>
          </div>

        </div>

        {/* Right Side: The Dashboard */}
        <div className="relative z-10 w-full h-full max-w-xl mx-auto lg:max-w-none">
          {/* Subtle Glow behind dashboard */}
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none hidden md:block" />
          
          {/* Mobile: Horizontal Scroll Snap Carousel | Desktop: Vertical Flex Stack */}
          <div className="flex overflow-x-auto snap-x snap-mandatory md:flex-col gap-4 h-full pb-6 px-6 md:px-0 md:pb-0 scrollbar-hide">
            
            {/* Current Focus Block */}
            <div className="min-w-[85vw] md:min-w-0 md:w-full snap-center bg-surface/50 backdrop-blur-md border border-border rounded-3xl p-6 flex flex-col justify-between group hover:border-primary/30 transition-colors relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity text-primary">
                 <Layout size={80} strokeWidth={1} />
               </div>
               <div>
                 <p className="text-[11px] font-mono text-muted uppercase tracking-[0.2em] mb-2">Current Build</p>
                 <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary tracking-[-0.02em] leading-tight mb-1">CricSphere</h3>
                 <p className="text-sm text-primary font-mono tracking-tight">AI Cricket Intelligence Platform</p>
               </div>
               
               <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center border-b border-border/50 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] md:text-xs font-mono text-muted uppercase tracking-widest">Status: Active</span>
                    </div>
                  </div>

                 <div className="grid grid-cols-2 gap-4 bg-background/50 rounded-2xl p-4 border border-border/50">
                   <div className="text-left">
                     <p className="text-lg md:text-2xl font-mono font-bold text-secondary"><AnimatedNumber value={22000} suffix="+" /></p>
                     <p className="text-[10px] uppercase tracking-wider text-muted">Matches</p>
                   </div>
                   <div className="text-right">
                     <p className="text-lg md:text-2xl font-mono font-bold text-secondary"><AnimatedNumber value={4} /></p>
                     <p className="text-[10px] uppercase tracking-wider text-muted">Models</p>
                   </div>
                   <div className="text-left">
                     <p className="text-lg md:text-2xl font-mono font-bold text-secondary"><AnimatedNumber value={638} suffix="K+" /></p>
                     <p className="text-[10px] uppercase tracking-wider text-muted">Player Matchups</p>
                   </div>
                   <div className="text-right">
                     <p className="text-lg md:text-2xl font-mono font-bold text-secondary"><AnimatedNumber value={16} /></p>
                     <p className="text-[10px] uppercase tracking-wider text-muted">Datasets</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Desktop grid layout for the 2 smaller blocks, Mobile puts them in the scroll flow */}
            <div className="min-w-[85vw] md:min-w-0 md:w-full snap-center md:snap-align-none flex flex-col md:grid md:grid-cols-2 gap-4">
              {/* Stack Block */}
              <div className="flex-1 bg-surface/50 backdrop-blur-md border border-border rounded-3xl p-6 flex flex-col justify-center group hover:border-border/80 transition-colors">
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Server size={14} /> Current Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Spring Boot', 'TensorFlow', 'DuckDB', 'Framer Motion'].map(tech => (
                    <span key={tech} className="px-2 py-1 text-[10px] md:text-xs bg-background rounded-md text-secondary border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activity Block */}
              <div className="flex-1 bg-surface/50 backdrop-blur-md border border-border rounded-3xl p-6 flex flex-col justify-center group hover:border-border/80 transition-colors relative overflow-hidden">
                 <p className="text-xs font-mono text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                   <GitCommit size={14} /> GitHub
                 </p>
                 <div>
                   <p className="text-[10px] md:text-xs text-muted mb-1">Latest Repository</p>
                   <a href={`https://github.com/Vaibhav-1819/${githubStats.latestRepo}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-secondary hover:text-primary transition-colors line-clamp-1">
                     {githubStats.latestRepo}
                   </a>
                   <p className="text-[10px] font-mono text-primary/80 mt-1">Updated {githubStats.lastUpdated}</p>
                 </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
