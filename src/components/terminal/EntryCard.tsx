"use client";

import { KnowledgeEntry } from '@/types';
import { formatRelativeDate } from '@/lib/utils';
import { TagChip } from './TagChip';
import { motion } from 'framer-motion';

interface EntryCardProps {
  entry: KnowledgeEntry;
  onClick: () => void;
  isActive: boolean;
}

export function EntryCard({ entry, onClick, isActive }: EntryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 border transition-all duration-200 group flex flex-col gap-2 ${
        isActive 
          ? 'border-accent bg-elevated shadow-[0_0_15px_rgba(0,245,255,0.1)]' 
          : 'border-border hover:border-border-strong hover:bg-elevated/50'
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <span className="text-muted text-xs font-mono shrink-0">[{entry.id.slice(0,4)}]</span>
        <h3 className={`flex-1 font-mono text-sm truncate ${isActive ? 'text-accent' : 'text-primary group-hover:text-accent-secondary'}`}>
          {entry.title}
        </h3>
        <span className="text-muted text-xs whitespace-nowrap">{formatRelativeDate(entry.createdAt)}</span>
      </div>
      
      <p className="text-secondary text-xs truncate font-mono opacity-70">
        {entry.content.replace(/\n/g, ' ')}
      </p>

      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {entry.tags.slice(0, 3).map(tag => (
            <TagChip key={tag} tag={tag} className="!py-0 !text-[10px]" />
          ))}
          {entry.tags.length > 3 && (
            <span className="text-muted text-[10px] items-center flex">+{entry.tags.length - 3}</span>
          )}
        </div>
      )}
    </motion.button>
  );
}
