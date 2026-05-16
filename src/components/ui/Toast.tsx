"use client";

import { motion } from 'framer-motion';
import { ToastMessage } from '@/types';
import { cn } from '@/lib/utils';
import { X, CheckSquare, AlertTriangle, Terminal } from 'lucide-react';

export function Toast({ toast, onClose }: { toast: ToastMessage, onClose: () => void }) {
  const icons = {
    success: <CheckSquare className="w-4 h-4 text-success" />,
    error: <AlertTriangle className="w-4 h-4 text-error" />,
    warning: <AlertTriangle className="w-4 h-4 text-warning" />,
    info: <Terminal className="w-4 h-4 text-accent" />
  };

  const borders = {
    success: 'border-success',
    error: 'border-error',
    warning: 'border-warning',
    info: 'border-accent'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "pointer-events-auto flex items-center gap-3 p-3 bg-surface border shadow-lg max-w-sm w-full",
        borders[toast.type]
      )}
    >
      {icons[toast.type]}
      <span className="flex-1 text-sm font-mono text-primary break-all">{toast.message}</span>
      <button 
        onClick={onClose}
        className="text-muted hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
