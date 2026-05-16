export interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string; 
  updatedAt: string; 
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export type ViewMode = 'list' | 'detail' | 'edit';

export interface CommandLogEntry {
  id: string;
  command: string;
  output: string | null;
  status: 'success' | 'error' | 'info';
  timestamp: number;
}
