'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import HistoryTable from '@/components/HistoryTable';
import { deleteHistoryItem, getHistory } from '@/lib/api';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const loadHistory = async () => {
    try {
      setError('');
      setIsLoading(true);
      const payload = await getHistory();
      setHistory(payload.items);
    } catch (requestError) {
      setError(requestError.message || 'Unable to fetch commit history.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await deleteHistoryItem(id);
      setHistory((current) => current.filter((item) => item.id !== id));
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete this history item.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-hero-gradient px-6 py-10 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to generator
            </Link>
            <h1 className="mt-3 text-4xl font-semibold text-white">Commit history dashboard</h1>
            <p className="mt-2 text-muted">Review saved commit suggestions and delete the ones you no longer need.</p>
          </div>

          <button
            type="button"
            onClick={loadHistory}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-secondary/60 hover:bg-white/5"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {error ? <div className="mb-6 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

        {isLoading ? (
          <div className="rounded-2xl border border-white/10 bg-panel/70 p-10 text-center text-muted">Loading commit history...</div>
        ) : (
          <HistoryTable items={history} onDelete={handleDelete} isDeleting={isDeleting} />
        )}
      </div>
    </main>
  );
}
