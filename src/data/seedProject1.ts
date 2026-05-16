import { KnowledgeEntry } from "@/types";

export const seedEntries: KnowledgeEntry[] = [
  {
    id: "a1b2c3d4",
    title: "Cortex AI - Build Troubleshooting",
    content: "When integrating the Groq API for the Llama 3 eco-coach generation, ensure the Next.js API route is marked with `export const dynamic = 'force-dynamic'` to prevent caching of the AI responses.\n\nAlso, custom favicon animations in `layout.tsx` need to be mounted via `useEffect` to avoid hydration mismatch.",
    tags: ["next.js", "llama3", "cortex-ai", "troubleshooting"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "e5f6g7h8",
    title: "Web Game Platform: Fastify & Redis Setup",
    content: "The backend server requires authoritative state management. Using Socket.IO with Fastify allows for high-throughput real-time sync. \n\nRedis is used as the pub/sub backplane to scale the WebSocket connections across multiple Node instances.\n\n### Frontend integration\nThe Vite/React frontend must implement client-side prediction to mask the latency. Ensure `socket.emit` acknowledgements are handled properly in the React state.",
    tags: ["fastify", "socket.io", "redis", "react", "architecture"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "i9j0k1l2",
    title: "Partnership Liquidations (12th Board Notes)",
    content: "Key steps for Final Accounts during Death of a Partner:\n1. Transfer all assets to Realisation Account at book value.\n2. Transfer outside liabilities to Realisation Account.\n3. Calculate the deceased partner's share of profit till the date of death (using Time Basis or Turnover Basis).\n4. Adjust goodwill through the remaining partners' capital accounts in their gaining ratio.",
    tags: ["commerce", "accountancy", "reference"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "m3n4o5p6",
    title: "Secretarial Practice - Internal Marking",
    content: "State board internal marking scheme for SP and OC:\n- Project work: 15 marks\n- Viva voce: 5 marks\n\nEnsure the project file covers modern organizational commerce trends. Total external exam is out of 80. Minimum 35 combined to pass.",
    tags: ["commerce", "sp", "oc", "grading"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: "q7r8s9t0",
    title: "Windows System Shortcuts",
    content: "To rapidly shut down Windows without using the mouse:\n1. `Win + X`, then `U`, then `U` again.\n2. Or create a shortcut on the desktop with `shutdown /s /t 0` and assign a global hotkey via properties.\n\nSaves exactly 3 seconds of workflow time.",
    tags: ["windows", "workflow", "shortcuts"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "u1v2w3x4",
    title: "Personal Grooming & Face Shape Analysis",
    content: "Notes on modern styling:\n- **Oval**: Most versatile. Can support aggressive fades or longer textured fringes.\n- **Square**: Keep the sides tight. A textured crop or side part works best to highlight the jawline.\n- **Maintenance**: Use a matte clay for texture instead of high-shine pomade. Wash with a clarifying shampoo weekly to remove buildup.",
    tags: ["personal", "styling"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  }
];
