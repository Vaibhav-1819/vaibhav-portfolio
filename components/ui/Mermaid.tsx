"use client";

import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';

export default function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      fontFamily: 'monospace',
    });

    const renderChart = async () => {
      try {
        // Generate a random ID for the SVG
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error('Failed to render Mermaid chart:', error);
      }
    };

    renderChart();
  }, [chart]);

  if (!svg) {
    return <div className="flex justify-center my-8 text-sm text-muted animate-pulse">Rendering Diagram...</div>;
  }

  return (
    <div 
      className="mermaid flex justify-center my-12 bg-surface/30 p-8 rounded-2xl border border-border/50" 
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}
