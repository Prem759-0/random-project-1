"use client";

import { CommandLogEntry } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandLog({ logs }: { logs: CommandLogEntry[] }) {
  if (logs.length === 0) return null;

  return (
    <div className="absolute bottom-full left-0 w-full bg-surface/95 backdrop-blur-sm border-t border-border border-b p-4 max-h-48 overflow-y-auto font-mono text-xs flex flex-col-reverse gap-2 pointer-events-none z-10">
      <AnimatePresence>
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1"
          >
            <div className="flex gap-2 text-muted">
              <span>$</span>
              <span>{log.command}</span>
            </div>
            {log.output && (
              <div className={`pl-4 ${
                log.status === 'error' ? 'text-error' :
                log.status === 'success' ? 'text-accent' : 'text-secondary'
              }`}>
                {log.output}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
