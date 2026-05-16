"use client";

import { useEffect } from 'react';

type ShortcutMap = {
  [key: string]: (e: KeyboardEvent) => void;
};

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = [
        e.ctrlKey ? 'Ctrl' : '',
        e.shiftKey ? 'Shift' : '',
        e.altKey ? 'Alt' : '',
        e.key.length === 1 ? e.key.toUpperCase() : e.key
      ].filter(Boolean).join('+');

      // Also support single keys like 'Escape'
      const checkKeys = [key, e.key];

      for (const k of checkKeys) {
        if (shortcuts[k]) {
          shortcuts[k](e);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
