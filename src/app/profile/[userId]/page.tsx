"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { getProfile, type UserProfile } from "@/lib/profile";
import { getEntriesByUser, deleteEntry, type JournalEntry } from "@/lib/entries";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteEntryId, setDeleteEntryId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const isOwnProfile = user?.uid === userId;

  useEffect(() => {
    Promise.all([getProfile(userId), getEntriesByUser(userId)]).then(([p, list]) => {
      setProfile(p);
      setEntries(list);
      setLoading(false);
    });
  }, [userId]);

  const handleDeleteClick = (id: string) => setDeleteEntryId(id);

  const handleDeleteConfirm = async () => {
    if (!deleteEntryId) return;
    setDeleting(true);
    try {
      await deleteEntry(deleteEntryId);
      setEntries((prev) => prev.filter((e) => e.id !== deleteEntryId));
      setDeleteEntryId(null);
    } catch {
      // ignore
    } finally {
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

  const displayName = profile?.username ?? entries[0]?.authorName ?? "Anonymous";

  return (
    <div className="min-h-[calc(100dvh-7rem)] px-4 pb-28 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:pb-20">
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
          {/* Profile card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xl font-semibold text-[var(--accent)]">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="font-display text-2xl font-medium tracking-tight text-[var(--foreground)] sm:text-3xl">
                  {displayName}
                </h1>
                {profile?.bio && (
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
                    {profile.bio}
                  </p>
                )}
                <p className="mt-3 text-sm font-medium text-[var(--accent)]">
                  {entries.length} {entries.length === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>
          </div>

          {/* Entries / My blogs */}
          <div className="mt-10">
            <h2 className="mb-4 font-display text-lg font-medium text-[var(--foreground)]">
              {isOwnProfile ? "My blogs" : "Posts"}
            </h2>
            {entries.length === 0 ? (
              <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted)]">
                {isOwnProfile ? "No blogs yet." : "No entries yet."}
              </p>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]/40"
                  >
                    <Link href={`/journal/${entry.id}`} className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-medium text-[var(--foreground)] sm:text-xl">
                        {entry.title || "Untitled"}
                      </h3>
                      {entry.subtitle && (
                        <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
                          {entry.subtitle}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {entry.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </Link>
                    {isOwnProfile && (
                      <div className="flex shrink-0 items-center gap-2">
                        <Link
                          href={`/journal/${entry.id}/edit`}
                          className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)]"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(entry.id)}
                          className="rounded-lg border border-red-500/50 px-2.5 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteEntryId}
        onClose={() => setDeleteEntryId(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </div>
  );
}
