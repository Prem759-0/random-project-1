"use client";

import { KnowledgeEntry } from '@/types';
import { formatAbsoluteDate } from '@/lib/utils';
import { MarkdownRenderer } from './MarkdownRenderer';
import { TagChip } from './TagChip';
import { Edit2, Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface EntryDetailProps {
  entry: KnowledgeEntry;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function EntryDetail({ entry, onEdit, onDelete, onClose }: EntryDetailProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="h-full flex flex-col bg-surface border border-border"
    >
      <div className="p-4 border-b border-border flex justify-between items-center bg-elevated">
        <div className="flex items-center gap-3">
          <span className="text-accent text-sm font-mono">[{entry.id}]</span>
          <span className="text-muted text-xs">{formatAbsoluteDate(entry.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="p-1.5 text-secondary hover:text-accent transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1.5 text-secondary hover:text-error transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-1.5 text-secondary hover:text-primary transition-colors ml-2" title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <h1 className="text-2xl font-bold text-primary font-mono mb-6 pb-2 border-b border-border-strong inline-block">
          {entry.title}
        </h1>
        
        <div className="mb-8">
          <MarkdownRenderer content={entry.content} />
        </div>

        {entry.tags.length > 0 && (
          <div className="mt-12 pt-4 border-t border-border flex flex-wrap gap-2">
            {entry.tags.map(tag => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
