"use client";

import { useState, useEffect, useCallback } from 'react';
import { KnowledgeEntry } from '@/types';
import { STORAGE_KEY, SEED_FLAG_KEY } from '@/lib/constants';
import { seedEntries } from '@/data/seedProject1';

export function useKnowledgeBase() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const isSeeded = localStorage.getItem(SEED_FLAG_KEY);
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (!isSeeded || !stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEntries));
        localStorage.setItem(SEED_FLAG_KEY, 'true');
        setEntries(seedEntries);
      } else {
        setEntries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load entries:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveEntries = useCallback((newEntries: KnowledgeEntry[]) => {
    setEntries(newEntries);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    } catch (e) {
      console.error("Failed to save entries:", e);
    }
  }, []);

  const addEntry = useCallback((entry: KnowledgeEntry) => {
    saveEntries([entry, ...entries]);
  }, [entries, saveEntries]);

  const updateEntry = useCallback((updated: KnowledgeEntry) => {
    saveEntries(entries.map(e => e.id === updated.id ? updated : e));
  }, [entries, saveEntries]);

  const deleteEntry = useCallback((id: string) => {
    saveEntries(entries.filter(e => e.id !== id));
  }, [entries, saveEntries]);

  const uniqueTags = Array.from(new Set(entries.flatMap(e => e.tags))).sort();
  
  const tagCounts = entries.reduce((acc, entry) => {
    entry.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return {
    entries,
    isLoaded,
    addEntry,
    updateEntry,
    deleteEntry,
    uniqueTags,
    tagCounts
  };
}
