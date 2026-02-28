"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { getEntry, type JournalEntry } from "@/lib/entries";

export default function EntryPage() {
  const params = useParams();
  const id = params.id as string;
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEntry(id).then((e) => {
      setEntry(e);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--accent)]/30" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="mx-auto max-w-[680px] px-4 py-12 text-center">
        <p className="text-[var(--muted)]">Entry not found.</p>
        <Link href="/journal" className="mt-4 inline-block text-[var(--accent)] hover:underline">
          ← Back to journal
        </Link>
      </div>
    );
  }

  const dateStr = entry.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-[calc(100dvh-7rem)] px-4 pb-28 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[680px] pt-8 sm:pt-12">
        <Link
          href="/journal"
          className="mb-8 inline-block text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ← Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            {entry.title}
          </h1>
          {entry.subtitle && (
            <p className="mt-2 font-display text-xl text-[var(--muted)] sm:text-2xl">
              {entry.subtitle}
            </p>
          )}
          <div className="mt-6 flex items-center gap-3">
            <Link
              href={`/profile/${entry.userId}`}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              {entry.authorName}
            </Link>
            <span className="text-[var(--muted)]">·</span>
            <time className="text-sm text-[var(--muted)]">{dateStr}</time>
          </div>

          <div className="mt-10 h-px bg-[var(--border)]" />

          <div
            className="mt-10 font-display text-lg leading-[1.8] text-[var(--foreground)] sm:text-xl sm:leading-[1.9] [&_p]:mb-4"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {entry.content}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
