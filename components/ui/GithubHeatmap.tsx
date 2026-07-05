"use client";

import { GitHubCalendar } from 'react-github-calendar';
import { useState, useEffect } from 'react';

export function GithubHeatmap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[150px] animate-pulse bg-surface/50 rounded-xl" />
    );
  }

  // Filter to only show the last 150 days to prevent scrolling and fit nicely
  const selectLastNDays = (contributions: any[], days: number) => {
    const today = new Date();
    const startDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    return contributions.filter((activity: any) => {
      const date = new Date(activity.date);
      return date >= startDate;
    });
  };

  return (
    <div className="w-full py-2 flex justify-start md:justify-center overflow-x-auto overflow-y-hidden scrollbar-hide">
      <div className="min-w-max pr-4">
        <GitHubCalendar 
        username="Vaibhav-1819" 
        colorScheme="dark"
        theme={{
          dark: ['#1e1e1e', '#00442a', '#006d35', '#009e4c', '#10b981']
        }}
        blockSize={11}
        blockMargin={5}
        transformData={(data) => selectLastNDays(data, 150)}
        />
      </div>
    </div>
  );
}
