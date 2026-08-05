"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Activity, ArrowUpDown, ChevronDown } from "lucide-react";

interface TelemetryItem {
  operation: string;
  category: 'Security' | 'AI & Search' | 'System';
  count: number;
  mean: number;
  median: number;
  p95: number;
  min: number;
  max: number;
  description: string;
}

const telemetryData: TelemetryItem[] = [
  {
    operation: "RBAC Security Checks (PermissionService.can)",
    category: "Security",
    count: 184,
    mean: 401.14,
    median: 308.27,
    p95: 771.07,
    min: 280.63,
    max: 2695.90,
    description: "Evaluates role permission mappings for active workspace users dynamically from Firestore."
  },
  {
    operation: "End-to-End Permission API RTT",
    category: "Security",
    count: 100,
    mean: 1166.18,
    median: 833.53,
    p95: 1635.78,
    min: 614.33,
    max: 10356.61,
    description: "Total round-trip time for permission query requests, including Clerk token validation."
  },
  {
    operation: "Signed Upload URL Generation (API)",
    category: "Security",
    count: 61,
    mean: 347.56,
    median: 312.90,
    p95: 414.51,
    min: 291.44,
    max: 1114.14,
    description: "Generates Admin-SDK signed storage URLs for zero-trust upload isolation."
  },
  {
    operation: "End-to-End Signed URL Fetch RTT",
    category: "Security",
    count: 50,
    mean: 377.45,
    median: 347.77,
    p95: 378.29,
    min: 327.41,
    max: 1763.17,
    description: "Total client round-trip time fetching temporary signed storage read credentials."
  },
  {
    operation: "Revocation Propagation Delay",
    category: "Security",
    count: 10,
    mean: 1117.80,
    median: 1143.50,
    p95: 1195.00,
    min: 877.00,
    max: 1195.00,
    description: "Time delay before Firestore/Clerk token updates block signed URL access."
  },
  {
    operation: "Gemini Embedding Generation",
    category: "AI & Search",
    count: 33,
    mean: 496.34,
    median: 469.30,
    p95: 808.17,
    min: 432.82,
    max: 907.74,
    description: "API call to gemini-embedding-001 mapping canvas texts to 768-dimensional vectors."
  },
  {
    operation: "In-Memory Cosine Similarity Match",
    category: "AI & Search",
    count: 20,
    mean: 0.36,
    median: 0.11,
    p95: 2.63,
    min: 0.04,
    max: 2.63,
    description: "Calculates similarity matching indices in-memory on Next.js Edge worker instances."
  },
  {
    operation: "Firestore Read (Search Retrieval)",
    category: "AI & Search",
    count: 20,
    mean: 1353.42,
    median: 1370.78,
    p95: 1396.63,
    min: 1232.51,
    max: 1396.63,
    description: "Reads raw matched documents dynamically from isolated workspace collections."
  },
  {
    operation: "LLM Synthesis (Gemini 2.5 Flash)",
    category: "AI & Search",
    count: 20,
    mean: 3481.37,
    median: 3130.68,
    p95: 6454.74,
    min: 2160.96,
    max: 6454.74,
    description: "Streams natural language response synthesis using matched document context."
  },
  {
    operation: "Workspace Creation Latency",
    category: "System",
    count: 25,
    mean: 869.48,
    median: 953.23,
    p95: 1879.21,
    min: 391.56,
    max: 2647.92,
    description: "Initializes brand new workspace parameters, database structures, and default channels."
  },
  {
    operation: "Daily Activity Brief Caching",
    category: "System",
    count: 99,
    mean: 1028.36,
    median: 722.52,
    p95: 1550.41,
    min: 572.65,
    max: 1807.12,
    description: "Aggregates past 24-hour log actions, updates briefs cache in Firestore."
  }
];

export function TelemetryDashboard() {
  const [filter, setFilter] = useState<'All' | 'Security' | 'AI & Search' | 'System'>('All');
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<'mean' | 'count' | 'p95'>('mean');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Filter and sort items
  const filteredData = telemetryData
    .filter(item => {
      const matchCategory = filter === 'All' || item.category === filter;
      const matchSearch = item.operation.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });

  const toggleSort = (field: 'mean' | 'count' | 'p95') => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  // Max mean latency to scale progress bars (LLM synthesis is max ~3500ms)
  const maxMean = Math.max(...telemetryData.map(d => d.mean));

  return (
    <div className="w-full bg-surface/30 border border-border/50 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6 font-sans">
      
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/30 pb-6">
        <div className="space-y-1">
          <h4 className="text-xl font-heading font-bold text-secondary flex items-center gap-2">
            <Activity className="text-primary animate-pulse" size={20} />
            Telemetry Observability Registry
          </h4>
          <p className="text-xs text-muted">Latency distribution suite logs evaluated locally over concurrent loads.</p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
            <input
              type="text"
              placeholder="Search operation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-background/50 border border-border/50 rounded-xl text-xs text-secondary outline-none focus:border-primary/50 w-full sm:w-[200px]"
            />
          </div>
          <div className="flex bg-background/50 border border-border/50 rounded-xl p-0.5">
            <button
              onClick={() => toggleSort('mean')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${sortField === 'mean' ? 'bg-primary text-primary-foreground shadow' : 'text-muted hover:text-secondary'}`}
            >
              Mean Latency
            </button>
            <button
              onClick={() => toggleSort('p95')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${sortField === 'p95' ? 'bg-primary text-primary-foreground shadow' : 'text-muted hover:text-secondary'}`}
            >
              P95
            </button>
            <button
              onClick={() => toggleSort('count')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${sortField === 'count' ? 'bg-primary text-primary-foreground shadow' : 'text-muted hover:text-secondary'}`}
            >
              Sample Count
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border/20 pb-4">
        {(['All', 'Security', 'AI & Search', 'System'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${filter === tab ? 'bg-primary/10 border-primary text-primary' : 'bg-background/20 border-border/50 hover:bg-surface text-muted hover:text-secondary'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Showcase Cards / Grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredData.map((item, index) => {
            const barWidth = Math.max(1, (item.mean / maxMean) * 100);
            return (
              <motion.div
                key={item.operation}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="bg-surface/50 border border-border/40 rounded-2xl p-5 hover:border-primary/30 hover:bg-surface transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group"
              >
                {/* Horizontal scale visual bar background */}
                <div 
                  className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-primary/30 to-accent/30 transition-all duration-1000"
                  style={{ width: `${barWidth}%` }}
                />

                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-primary/10 text-primary border border-primary/20 uppercase font-bold">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted">
                      Samples: <strong className="text-secondary">{item.count}</strong>
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-secondary tracking-tight group-hover:text-primary transition-colors">
                    {item.operation}
                  </h5>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Metrics detail container */}
                <div className="grid grid-cols-3 gap-4 font-mono text-right min-w-[240px] border-t md:border-t-0 border-border/30 pt-4 md:pt-0">
                  <div>
                    <div className="text-[9px] text-muted uppercase tracking-wider">Mean</div>
                    <div className="text-sm font-bold text-primary mt-1">
                      {item.mean >= 1000 ? `${(item.mean/1000).toFixed(2)}s` : `${item.mean.toFixed(1)}ms`}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-muted uppercase tracking-wider">Median</div>
                    <div className="text-sm font-bold text-secondary mt-1">
                      {item.median >= 1000 ? `${(item.median/1000).toFixed(2)}s` : `${item.median.toFixed(1)}ms`}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-muted uppercase tracking-wider">P95 Max</div>
                    <div className="text-sm font-bold text-accent mt-1">
                      {item.p95 >= 1000 ? `${(item.p95/1000).toFixed(2)}s` : `${item.p95.toFixed(1)}ms`}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
