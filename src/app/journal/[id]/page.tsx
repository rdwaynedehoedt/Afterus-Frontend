"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { getEntry, deleteEntry, type JournalEntry } from "@/lib/entries";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

export default function EntryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getEntry(id, user?.uid).then((e) => {
      setEntry(e);
      setLoading(false);
    });
  }, [id, user?.uid]);

  const isOwner = user && entry?.userId === user.uid;

  const handleDeleteClick = () => setShowDeleteModal(true);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteEntry(id);
      router.push("/journal");
    } catch {
      setDeleting(false);
    }
  };

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
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/journal"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← Back
          </Link>
          {isOwner && (
            <div className="flex items-center gap-2">
              <Link
                href={`/journal/${id}/edit`}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)]"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={deleting}
                className="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>

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
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/profile/${entry.userId}`}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              {entry.authorName}
            </Link>
            <span className="text-[var(--muted)]">·</span>
            <time className="text-sm text-[var(--muted)]">{dateStr}</time>
            {entry.isPrivate && isOwner && (
              <span className="rounded bg-[var(--surface-muted)] px-2 py-0.5 text-xs font-medium text-[var(--muted)]">
                Private
              </span>
            )}
          </div>

          {entry.mood && isOwner && (
            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Your state when you wrote this
              </p>
              <p className="mt-1 font-display font-medium text-[var(--foreground)] capitalize">
                {entry.mood.state}
              </p>
              <p className="mt-0.5 text-sm text-[var(--muted)]">
                {entry.mood.intensity}/10
                {entry.mood.briefInsight && (
                  <> · {entry.mood.briefInsight}</>
                )}
              </p>
            </div>
          )}

          <div className="mt-10 h-px bg-[var(--border)]" />

          <div
            className="mt-10 font-display text-lg leading-[1.8] text-[var(--foreground)] sm:text-xl sm:leading-[1.9] [&_p]:mb-4"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {entry.content}
          </div>
        </motion.div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </article>
  );
}
