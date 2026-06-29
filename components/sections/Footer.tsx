export function Footer() {
  return (
    <footer className="w-full bg-background pt-32 pb-16 px-6 border-t border-border/50">
      <div className="max-w-3xl mx-auto font-mono">
        <div className="p-8 rounded-xl bg-surface/30 border border-border/50 text-sm md:text-base text-muted space-y-6 shadow-2xl">
          
          {/* Terminal Command */}
          <div>
            <span className="text-emerald-500">workspace@vaibhav</span>
            <span className="text-secondary">:</span>
            <span className="text-primary">~</span>
            <span className="text-secondary">$</span>
            <span className="ml-2 text-secondary">cat</span>
            <span className="ml-2 text-primary">contact.txt</span>
          </div>

          {/* Terminal Output */}
          <div className="space-y-6 pt-4 border-t border-border/30">
            <div className="space-y-4">
              <p className="text-secondary font-bold uppercase tracking-widest text-xs md:text-sm">
                End of Workspace
              </p>
              <p className="leading-relaxed break-words text-[13px] md:text-base">
                Thanks for exploring my workspace.<br className="hidden md:block"/>
                If you'd like to collaborate, build something together,<br className="hidden md:block"/>
                or simply have a conversation, I'd love to hear from you.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 pt-4">
              <a href="https://github.com/Vaibhav-1819" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4 hover:decoration-primary">
                GitHub
              </a>
              <a href="https://linkedin.com/in/vaibhav-bharathula" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4 hover:decoration-primary">
                LinkedIn
              </a>
              <a href="/docs/Resume_Vaibhav_Ram.pdf" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4 hover:decoration-primary">
                Resume
              </a>
              <a href="mailto:bharathulavaibhav@gmail.com" className="text-secondary hover:text-primary transition-colors underline decoration-border underline-offset-4 hover:decoration-primary">
                Email
              </a>
            </div>
          </div>
          
          {/* Terminal Prompt */}
          <div className="pt-2">
            <span className="text-emerald-500">workspace@vaibhav</span>
            <span className="text-secondary">:</span>
            <span className="text-primary">~</span>
            <span className="text-secondary">$</span>
            <span className="ml-2 text-secondary/80 animate-pulse">_</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
