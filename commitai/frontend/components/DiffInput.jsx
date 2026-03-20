'use client';

import { Sparkles } from 'lucide-react';

const tones = ['Professional', 'Fun', 'Short'];

export default function DiffInput({ diff, tone, setDiff, setTone, onGenerate, isLoading }) {
  return (
    <section className="rounded-3xl border border-border bg-panel/80 p-6 shadow-glow backdrop-blur xl:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Input your diff</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Turn code changes into clean commits</h2>
        </div>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {tones.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTone(option)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tone === option ? 'bg-accent text-white' : 'text-muted hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <label className="mb-3 block text-sm text-muted" htmlFor="diff-input">
        Paste a git diff, staged changes, or a short code summary.
      </label>
      <textarea
        id="diff-input"
        value={diff}
        onChange={(event) => setDiff(event.target.value)}
        placeholder="diff --git a/app/page.jsx b/app/page.jsx\n+ Add hero section\n- Remove placeholder text"
        className="min-h-[320px] w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-slate-100 outline-none transition focus:border-accent"
      />

      <button
        type="button"
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-secondary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Sparkles className="h-4 w-4" />
        {isLoading ? 'Generating...' : 'Generate commit messages'}
      </button>
    </section>
  );
}
