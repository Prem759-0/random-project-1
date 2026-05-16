"use client";

import { cn } from '@/lib/utils';
import { Hash } from 'lucide-react';

interface TagChipProps {
  tag: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TagChip({ tag, count, isActive, onClick, className }: TagChipProps) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 border text-xs font-mono transition-colors",
        isActive 
          ? "border-accent bg-accent/10 text-accent" 
          : "border-border-strong text-muted hover:border-accent hover:text-accent",
        !onClick && "cursor-default hover:border-border-strong hover:text-muted",
        className
      )}
    >
      <Hash className="w-3 h-3" />
      <span>{tag}</span>
      {count !== undefined && <span className="opacity-50 ml-1">[{count}]</span>}
    </button>
  );
}
