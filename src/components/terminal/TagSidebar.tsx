"use client";

import { TagChip } from './TagChip';

interface TagSidebarProps {
  tags: string[];
  tagCounts: Record<string, number>;
  activeTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function TagSidebar({ tags, tagCounts, activeTag, onSelectTag }: TagSidebarProps) {
  return (
    <div className="hidden lg:flex flex-col w-48 border-r border-border p-4 bg-surface/50">
      <h2 className="text-muted text-xs font-mono uppercase tracking-widest mb-4">Index By Tag</h2>
      <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        <button
          onClick={() => onSelectTag(null)}
          className={`text-left text-xs font-mono p-1 transition-colors ${!activeTag ? 'text-accent' : 'text-muted hover:text-primary'}`}
        >
          [ALL_ENTRIES]
        </button>
        {tags.map(tag => (
          <TagChip
            key={tag}
            tag={tag}
            count={tagCounts[tag]}
            isActive={activeTag === tag}
            onClick={() => onSelectTag(activeTag === tag ? null : tag)}
            className="justify-between w-full"
          />
        ))}
      </div>
    </div>
  );
}
