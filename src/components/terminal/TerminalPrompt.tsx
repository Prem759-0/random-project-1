"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface TerminalPromptProps {
  onCommand: (cmd: string) => void;
  commandHistory: string[];
}

export function TerminalPrompt({ onCommand, commandHistory }: TerminalPromptProps) {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', focusHandler);
    return () => window.removeEventListener('keydown', focusHandler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!input.trim()) return;
      onCommand(input.trim());
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIdx = historyIndex + 1;
        setHistoryIndex(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="border-t border-border bg-surface p-3 flex items-center gap-2 font-mono text-sm shrink-0">
      <span className="text-accent-secondary flex items-center">
        root@system <ChevronRight className="w-4 h-4 ml-1 text-muted" />
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-primary focus:outline-none placeholder:text-border-strong caret-accent"
        placeholder="Type a command or 'help'..."
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}
