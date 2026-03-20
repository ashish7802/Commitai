'use client';

import { Trash2 } from 'lucide-react';

export default function HistoryTable({ items, onDelete, isDeleting }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-muted">
        No commit history yet. Generate commit suggestions to populate your dashboard.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-panel/80">
      <div className="grid grid-cols-[1.4fr,0.8fr,0.8fr,80px] gap-4 border-b border-white/10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
        <span>Message</span>
        <span>Tone</span>
        <span>Created</span>
        <span className="text-right">Action</span>
      </div>
      <div className="divide-y divide-white/10">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[1.4fr,0.8fr,0.8fr,80px] gap-4 px-6 py-5 text-sm">
            <div>
              <p className="font-medium text-white">{item.message}</p>
              <p className="mt-2 text-muted">{item.summary}</p>
            </div>
            <div className="text-muted">{item.tone}</div>
            <div className="text-muted">{new Date(item.created_at).toLocaleString()}</div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                disabled={isDeleting}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-rose-400/40 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={`Delete ${item.message}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
