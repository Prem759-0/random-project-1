"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Enter') onConfirm();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel, onConfirm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-surface border border-error w-full max-w-md p-6 pointer-events-auto shadow-[0_0_30px_rgba(255,0,0,0.15)] flex flex-col font-mono">
              <div className="flex items-center gap-3 text-error mb-4">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="text-lg uppercase tracking-widest">{title}</h2>
              </div>
              <p className="text-secondary text-sm mb-8">{message}</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-sm border border-border-strong text-muted hover:text-primary transition-colors uppercase"
                >
                  Abort
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 text-sm bg-error/20 border border-error text-error hover:bg-error/30 transition-colors uppercase focus:outline-none focus:ring-1 focus:ring-error"
                >
                  Execute
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
