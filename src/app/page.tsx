"use client";

import { useState, useEffect, useRef } from 'react';
import { useKnowledgeBase } from '@/hooks/useKnowledgeBase';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useToast } from '@/components/ui/ToastProvider';
import { KnowledgeEntry, ViewMode, CommandLogEntry } from '@/types';
import { generateId, downloadJson } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

import { TagSidebar } from '@/components/terminal/TagSidebar';
import { EntryCard } from '@/components/terminal/EntryCard';
import { EntryDetail } from '@/components/terminal/EntryDetail';
import { EntryEditor } from '@/components/terminal/EntryEditor';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { CommandLog } from '@/components/terminal/CommandLog';
import { StatusBar } from '@/components/terminal/StatusBar';
import { HelpOverlay } from '@/components/terminal/HelpOverlay';
import { ConfirmDialog } from '@/components/terminal/ConfirmDialog';

export default function TerminalApp() {
  const { entries, isLoaded, addEntry, updateEntry, deleteEntry, uniqueTags, tagCounts } = useKnowledgeBase();
  const { addToast } = useToast();
  
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  const [commandLogs, setCommandLogs] = useState<CommandLogEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  const [showHelp, setShowHelp] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useKeyboardShortcuts({
    'Ctrl+N': (e) => { e.preventDefault(); handleNew(); },
    'Escape': () => { if (viewMode !== 'edit') { setActiveEntryId(null); setViewMode('list'); } },
    '?': (e) => { if(document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') setShowHelp(prev => !prev); }
  });

  const filteredEntries = entries.filter(e => {
    const matchesSearch = searchQuery === '' || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === null || e.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const activeEntry = entries.find(e => e.id === activeEntryId);

  const logCommand = (cmd: string, output: string | null, status: 'success'|'error'|'info') => {
    setCommandLogs(prev => [{ id: generateId(), command: cmd, output, status, timestamp: Date.now() }, ...prev].slice(0, 5));
    setCommandHistory(prev => [...prev, cmd]);
  };

  const handleCommand = (rawCmd: string) => {
    const parts = rawCmd.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (cmd) {
      case 'new':
        handleNew();
        logCommand(rawCmd, 'Switched to entry creation mode.', 'success');
        break;
      case 'search':
        setSearchQuery(args);
        setActiveEntryId(null);
        setViewMode('list');
        logCommand(rawCmd, args ? `Filtering by search: "${args}"` : 'Cleared search filter.', 'info');
        break;
      case 'tag':
        if (uniqueTags.includes(args)) {
          setActiveTag(args);
          setActiveEntryId(null);
          setViewMode('list');
          logCommand(rawCmd, `Filtering by tag: [${args}]`, 'info');
        } else {
          logCommand(rawCmd, `Tag not found: [${args}]`, 'error');
        }
        break;
      case 'clear':
        setSearchQuery('');
        setActiveTag(null);
        setActiveEntryId(null);
        setViewMode('list');
        logCommand(rawCmd, 'Filters cleared. View reset.', 'success');
        break;
      case 'help':
        setShowHelp(true);
        logCommand(rawCmd, 'Opened reference manual.', 'info');
        break;
      case 'export':
        downloadJson(entries, `kb_export_${new Date().getTime()}.json`);
        logCommand(rawCmd, 'Initiated JSON export.', 'success');
        addToast('Data exported successfully', 'success');
        break;
      default:
        logCommand(rawCmd, `ERR: Unrecognized command. Type 'help' for reference.`, 'error');
        addToast(`Command not found: ${cmd}`, 'error');
    }
  };

  const handleNew = () => {
    setActiveEntryId(null);
    setViewMode('edit');
  };

  const handleSave = (entry: KnowledgeEntry) => {
    if (activeEntryId) {
      updateEntry(entry);
      addToast('Entry updated', 'success');
    } else {
      addEntry(entry);
      addToast('Entry created', 'success');
    }
    setActiveEntryId(entry.id);
    setViewMode('detail');
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteConfirmId(id);
  };

  const executeDelete = () => {
    if (deleteConfirmId) {
      deleteEntry(deleteConfirmId);
      if (activeEntryId === deleteConfirmId) {
        setActiveEntryId(null);
        setViewMode('list');
      }
      addToast('Entry deleted', 'warning');
    }
    setDeleteConfirmId(null);
  };

  if (!mounted || !isLoaded) return null;

  return (
    <div className="h-full flex flex-col bg-base">
      <div className="flex-1 flex overflow-hidden">
        <TagSidebar 
          tags={uniqueTags} 
          tagCounts={tagCounts} 
          activeTag={activeTag} 
          onSelectTag={(t) => { setActiveTag(t); setViewMode('list'); }} 
        />
        
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          
          <div className={`w-full lg:w-1/3 flex flex-col border-r border-border bg-surface ${viewMode !== 'list' && 'hidden lg:flex'}`}>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
              {filteredEntries.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted font-mono text-sm text-center">
                  <div className="animate-pulse mb-4">_</div>
                  SYSTEM EMPTY<br/>
                  <span className="opacity-50 mt-2">type `new` to initialize first entry</span>
                </div>
              ) : (
                filteredEntries.map(entry => (
                  <EntryCard 
                    key={entry.id} 
                    entry={entry} 
                    isActive={entry.id === activeEntryId}
                    onClick={() => { setActiveEntryId(entry.id); setViewMode('detail'); }} 
                  />
                ))
              )}
            </div>
          </div>

          <div className={`w-full lg:w-2/3 bg-base relative overflow-hidden ${viewMode === 'list' && 'hidden lg:block'}`}>
            <AnimatePresence mode="wait">
              {viewMode === 'detail' && activeEntry && (
                <EntryDetail 
                  key="detail"
                  entry={activeEntry} 
                  onEdit={() => setViewMode('edit')} 
                  onDelete={() => handleDeleteRequest(activeEntry.id)}
                  onClose={() => { setActiveEntryId(null); setViewMode('list'); }}
                />
              )}
              {viewMode === 'edit' && (
                <EntryEditor 
                  key="edit"
                  initialEntry={activeEntry} 
                  onSave={handleSave} 
                  onCancel={() => { 
                    if(activeEntryId) setViewMode('detail'); 
                    else setViewMode('list'); 
                  }} 
                />
              )}
              {viewMode === 'list' && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center text-muted font-mono"
                >
                  [ NO_ENTRY_SELECTED ]
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="relative">
        <CommandLog logs={commandLogs} />
        <TerminalPrompt onCommand={handleCommand} commandHistory={commandHistory} />
      </div>

      <StatusBar 
        entryCount={entries.length} 
        activeTag={activeTag} 
        searchQuery={searchQuery} 
        mode={viewMode.toUpperCase()} 
      />

      <HelpOverlay isOpen={showHelp} onClose={() => setShowHelp(false)} />
      
      <ConfirmDialog 
        isOpen={!!deleteConfirmId}
        title="Delete Record"
        message="Are you sure you want to purge this entry? This action is irreversible."
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
}
