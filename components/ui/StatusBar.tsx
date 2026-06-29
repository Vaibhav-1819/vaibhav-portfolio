import { CheckCircle2, Code, Layout } from "lucide-react";

export function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-surface border-t border-border/50 z-50 flex items-center justify-between px-4 text-[10px] md:text-xs font-mono text-muted overflow-hidden">
      
      {/* Left side */}
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center gap-2 h-full border-r border-border/50 pr-4 hover:text-secondary transition-colors cursor-default">
          <Layout size={12} className="text-primary" />
          <span className="hidden md:inline">Developer Workspace v3</span>
          <span className="md:hidden">v3</span>
        </div>
        <a href="https://github.com/Vaibhav-1819" target="_blank" rel="noreferrer" className="flex items-center gap-2 h-full hover:text-secondary transition-colors">
          <Code size={12} />
          <span>Connected</span>
        </a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 h-full">
        <div className="hidden sm:flex items-center gap-4 border-r border-border/50 pr-4">
          <span className="hover:text-secondary transition-colors cursor-default">Next.js</span>
          <span className="hover:text-secondary transition-colors cursor-default">TypeScript</span>
          <div className="flex items-center gap-1.5 hover:text-secondary transition-colors cursor-default">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span>Build Successful</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-secondary cursor-default pl-2">
          <span>Status</span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-500 font-bold hidden sm:inline">Online</span>
        </div>
      </div>

    </div>
  );
}
