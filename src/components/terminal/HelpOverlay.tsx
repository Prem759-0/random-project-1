"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { COMMAND_REFERENCE, KEYBOARD_SHORTCUTS } from '@/lib/constants';
import { Terminal } from 'lucide-react';

interface HelpOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpOverlay({ isOpen, onClose }: HelpOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-surface border border-accent/50 w-full max-w-2xl p-6 pointer-events-auto shadow-[0_0_30px_rgba(0,245,255,0.1)] font-mono text-sm">
              <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                <h2 className="text-accent text-lg uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-5 h-5" /> System Reference
                </h2>
                <button onClick={onClose} className="text-muted hover:text-primary">[ ESC ]</button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-accent-secondary mb-4 uppercase">Commands</h3>
                  <ul className="flex flex-col gap-3">
                    {COMMAND_REFERENCE.map(cmd => (
                      <li key={cmd.cmd} className="flex flex-col">
                        <code className="text-primary bg-elevated px-1 py-0.5 self-start mb-1">{cmd.cmd}</code>
                        <span className="text-muted text-xs">{cmd.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-accent-secondary mb-4 uppercase">Shortcuts</h3>
                  <ul className="flex flex-col gap-3">
                    {KEYBOARD_SHORTCUTS.map(sc => (
                      <li key={sc.keys} className="flex justify-between items-baseline border-b border-border border-dashed pb-1">
                        <span className="text-muted text-xs">{sc.desc}</span>
                        <kbd className="text-primary bg-elevated px-1">{sc.keys}</kbd>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
