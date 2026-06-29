"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Code, FileText, FlaskConical, Mail } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands = [
    { name: "Home", icon: <Home size={16} /> },
    { name: "Projects", icon: <Code size={16} /> },
    { name: "Experience", icon: <FileText size={16} /> },
    { name: "Labs", icon: <FlaskConical size={16} /> },
    { name: "Contact", icon: <Mail size={16} /> },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-surface border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-border/50">
              <Search className="text-muted mr-3" size={20} />
              <input 
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none outline-none text-secondary placeholder:text-muted/50 font-mono text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex items-center gap-1 text-[10px] font-mono text-muted bg-background px-2 py-1 rounded-md border border-border/50">
                ESC
              </div>
            </div>
            
            <div className="p-2 max-h-[300px] overflow-y-auto">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => (
                  <button 
                    key={cmd.name}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 hover:text-primary text-secondary transition-colors text-sm font-medium group text-left"
                    onClick={() => {
                      setIsOpen(false);
                      // In a real app, this would route to `#${cmd.name.toLowerCase()}`
                    }}
                  >
                    <span className="text-muted group-hover:text-primary transition-colors">
                      {cmd.icon}
                    </span>
                    {cmd.name}
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-muted">
                  No results found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
