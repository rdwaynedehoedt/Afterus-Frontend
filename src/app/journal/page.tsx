"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { getAllEntries, type JournalEntry } from "@/lib/entries";

function EntryCard({ entry }: { entry: JournalEntry }) {
  const router = useRouter();
  const dateStr = entry.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]/40">
      <Link href={`/journal/${entry.id}`} className="block">
        <h3 className="font-display text-lg font-medium text-[var(--foreground)] sm:text-xl">
          {entry.title || "Untitled"}
        </h3>
      </Link>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => router.push(`/profile/${entry.userId}`)}
          className="font-medium text-[var(--accent)] hover:underline"
        >
          {entry.authorName}
        </button>
        <span className="text-[var(--muted)]">·</span>
        <time className="text-[var(--muted)]">{dateStr}</time>
      </div>
    </div>
  );
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEntries().then((list) => {
      setEntries(list);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-[calc(100dvh-7rem)] px-4 pb-24 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:pb-8">
      <div className="mx-auto max-w-2xl">
        {/* Top: Journaling title + small Write button in top right */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap items-center justify-between gap-4 pt-6 pb-8 sm:pt-8"
        >
          <div>
            <h1 className="font-display text-2xl font-light tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              Journaling
            </h1>
            <p className="mt-1 font-display text-sm text-[var(--muted)] sm:text-base">
              Write it out. No one else has to see.
            </p>
          </div>
          <Link
            href="/journal/new"
            className="shrink-0 rounded-lg bg-[var(--cta-bg)] px-3 py-2 text-xs font-medium text-[var(--cta-text)] transition-all active:scale-[0.98] hover:opacity-90 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Write anonymously
          </Link>
        </motion.div>

        {/* Entries list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4 pb-12"
        >
          <h2 className="font-display text-lg font-medium text-[var(--foreground)] sm:text-xl">
            Recent entries
          </h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--accent)]/30" />
            </div>
          ) : entries.length === 0 ? (
            <p className="py-8 text-center text-[var(--muted)]">No entries yet. Be the first to write.</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
