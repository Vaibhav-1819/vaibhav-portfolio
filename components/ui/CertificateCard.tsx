"use client";

import React from 'react';
import Image from 'next/image';
import { Trophy, ExternalLink } from 'lucide-react';

interface CertificateCardProps {
  src?: string;
  title?: string;
  teamName?: string;
  event?: string;
  caption?: string;
  className?: string;
}

export function CertificateCard({
  src = "/images/team_point_break_certificate.jpg",
  title = "Certificate of Excellence",
  teamName = "Team Point Break",
  event = "SkillUp Hackathon 2026 (in collaboration with IBM SkillsBuild)",
  caption = "Official Regional Finalist Certificate awarded to Team Point Break at the SkillUp Hackathon 2026.",
  className = ""
}: CertificateCardProps) {
  return (
    <div className={`not-prose my-8 w-full ${className}`}>
      <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-surface/40 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-amber-500/60 hover:shadow-amber-500/10 hover:shadow-2xl">
        {/* Certificate Frame with horizontal width matching blog screenshots */}
        <div className="relative w-full bg-background/90 overflow-hidden">
          <Image
            src={src}
            alt={`${teamName} - ${title}`}
            width={2200}
            height={1607}
            className="w-full h-auto object-cover block"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Caption & Actions Footer */}
        <div className="p-3 sm:p-4 bg-surface/70 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
              <Trophy size={13} className="shrink-0 text-amber-400" />
              <span>{teamName} • {title}</span>
            </div>
            <p className="text-[11px] font-mono text-muted truncate mt-0.5">
              {event}
            </p>
          </div>

          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold transition-all shrink-0 w-fit"
          >
            <span>Full Resolution</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
      {caption && (
        <p className="text-center text-xs text-muted font-mono mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
}
