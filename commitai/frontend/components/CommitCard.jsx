'use client';

import { Check, ClipboardCopy } from 'lucide-react';
import { useState } from 'react';

export default function CommitCard({ message, summary, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-accent/60 hover:bg-white/[0.07]">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Option {index + 1}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-muted transition hover:border-accent/50 hover:text-white"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <ClipboardCopy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="text-lg font-semibold text-white">{message}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{summary}</p>
    </article>
  );
}
