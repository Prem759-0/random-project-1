"use client";

import React from 'react';

export function MarkdownRenderer({ content }: { content: string }) {
  // A simplistic, safe regex-based markdown parser suitable for terminal notes
  const renderLine = (line: string, idx: number) => {
    if (line.startsWith('### ')) {
      return <h3 key={idx} className="text-accent text-lg mt-4 mb-2">{line.replace('### ', '')}</h3>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={idx} className="text-accent-secondary text-xl mt-5 mb-2">{line.replace('## ', '')}</h2>;
    }
    if (line.startsWith('# ')) {
      return <h1 key={idx} className="text-primary text-2xl mt-6 mb-3 font-bold">{line.replace('# ', '')}</h1>;
    }
    if (line.startsWith('- ')) {
      return <li key={idx} className="ml-4 list-disc text-secondary my-1">{processInline(line.replace('- ', ''))}</li>;
    }
    if (line.trim() === '') {
      return <br key={idx} />;
    }
    return <p key={idx} className="text-secondary leading-relaxed mb-2">{processInline(line)}</p>;
  };

  const processInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-primary">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="text-primary italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-elevated text-accent px-1 rounded text-sm">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="font-mono text-sm whitespace-pre-wrap">
      {content.split('\n').map(renderLine)}
    </div>
  );
}
