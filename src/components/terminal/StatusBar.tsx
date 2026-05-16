"use client";

import { Terminal } from 'lucide-react';

interface StatusBarProps {
  entryCount: number;
  activeTag: string | null;
  searchQuery: string;
  mode: string;
}

export function StatusBar({ entryCount, activeTag, searchQuery, mode }: StatusBarProps) {
  return (
    <div className="h-8 border-t border-border bg-elevated flex items-center justify-between px-4 font-mono text-[10px] text-muted uppercase tracking-widest shrink-0">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-accent">
          <Terminal className="w-3 h-3" />
          SYS_ONLINE
        </span>
        <span className="hidden sm:inline">ENTRIES: {entryCount}</span>
        {activeTag && <span>TAG_FILTER: {activeTag}</span>}
        {searchQuery && <span>SEARCH: "{searchQuery}"</span>}
      </div>
      <div className="flex items-center gap-4">
        <span>MODE: {mode}</span>
        <span className="hidden sm:inline">Press '?' for Help</span>
      </div>
    </div>
  );
}
