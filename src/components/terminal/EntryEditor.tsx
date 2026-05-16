"use client";

import { useState, useEffect } from 'react';
import { KnowledgeEntry } from '@/types';
import { generateId } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EntryEditorProps {
  initialEntry?: KnowledgeEntry;
  onSave: (entry: KnowledgeEntry) => void;
  onCancel: () => void;
}

export function EntryEditor({ initialEntry, onSave, onCancel }: EntryEditorProps) {
  const [title, setTitle] = useState(initialEntry?.title || '');
  const [content, setContent] = useState(initialEntry?.content || '');
  const [tagsInput, setTagsInput] = useState(initialEntry?.tags.join(', ') || '');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and Content are required.');
      return;
    }

    const tags = tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    const now = new Date().toISOString();

    const entry: KnowledgeEntry = {
      id: initialEntry?.id || generateId(),
      title: title.trim(),
      content: content.trim(),
      tags,
      createdAt: initialEntry?.createdAt || now,
      updatedAt: now,
    };

    onSave(entry);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="h-full flex flex-col bg-surface border border-accent p-1 shadow-[0_0_20px_rgba(0,245,255,0.05)]"
    >
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4 gap-4 font-mono">
        <div className="flex justify-between items-center mb-2">
          <span className="text-accent uppercase text-sm tracking-widest">
            {initialEntry ? `> EDIT_ENTRY [${initialEntry.id}]` : '> INIT_NEW_ENTRY'}
          </span>
          {error && <span className="text-error text-xs animate-pulse">{error}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-muted text-xs">TITLE:</label>
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-elevated border border-border-strong text-primary p-2 focus:outline-none focus:border-accent transition-colors"
            placeholder="Enter title..."
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-muted text-xs">CONTENT:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-elevated border border-border-strong text-secondary p-2 resize-none focus:outline-none focus:border-accent transition-colors scrollbar-hide"
            placeholder="Markdown supported..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-muted text-xs">TAGS (comma separated):</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="bg-elevated border border-border-strong text-primary p-2 focus:outline-none focus:border-accent transition-colors"
            placeholder="react, api, auth..."
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-accent/20 text-accent border border-accent p-2 hover:bg-accent/30 transition-colors uppercase tracking-widest text-sm"
          >
            Save [Enter]
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-transparent text-secondary border border-border-strong p-2 hover:border-secondary transition-colors uppercase tracking-widest text-sm"
          >
            Cancel [Esc]
          </button>
        </div>
      </form>
    </motion.div>
  );
}
