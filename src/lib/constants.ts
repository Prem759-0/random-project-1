export const STORAGE_KEY = 'kb_entries';
export const SEED_FLAG_KEY = 'kb_seeded';

export const ANIMATION_EASING = [0.4, 0, 0.2, 1];
export const SPRING_EASING = [0.16, 1, 0.3, 1];

export const COMMAND_REFERENCE = [
  { cmd: "new", desc: "Initialize a new knowledge entry" },
  { cmd: "search <query>", desc: "Filter entries by keyword" },
  { cmd: "tag <tagname>", desc: "Filter entries by tag" },
  { cmd: "clear", desc: "Clear active filters and reset view" },
  { cmd: "export", desc: "Download all entries as JSON" },
  { cmd: "help", desc: "Show this command reference overlay" }
];

export const KEYBOARD_SHORTCUTS = [
  { keys: "Ctrl + N", desc: "New entry" },
  { keys: "Ctrl + F", desc: "Focus command prompt" },
  { keys: "Escape", desc: "Close panels / clear focus" },
  { keys: "Up / Down", desc: "Cycle command history" }
];
