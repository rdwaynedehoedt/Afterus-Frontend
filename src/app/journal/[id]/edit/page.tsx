"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import { getEntry, updateEntry } from "@/lib/entries";

export default function EditEntryPage() {
  const params = useParams();
  const id = params.id as string;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getEntry(id).then((entry) => {
      if (entry) {
        if (user && entry.userId !== user.uid) {
          router.replace(`/journal/${id}`);
          return;
        }
        setTitle(entry.title);
        setSubtitle(entry.subtitle ?? "");
        setContent(entry.content);
      }
      setFetching(false);
    });
  }, [id, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Please sign in to save.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await updateEntry(id, { title, subtitle, content });

      if (content.trim().length >= 30) {
        try {
          const moodRes = await fetch("/api/analyze-mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: content.trim() }),
          });
          if (moodRes.ok) {
            const mood = await moodRes.json();
            await updateEntry(id, { mood });
          }
        } catch {
          // Mood analysis failed
        }
      }

      router.push(`/journal/${id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save. Try again.";
      const displayMsg = msg.toLowerCase().includes("permission")
        ? "Firestore rules need updating. Go to Firebase Console → Firestore → Rules and paste the rules from firestore.rules, then Publish."
        : msg;
      setError(displayMsg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--accent)]/30" />
      </div>
    );
  }

  return (
    <AuthGuard>
    <div className="min-h-[calc(100dvh-7rem)] px-4 pb-28 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[680px] pt-8 sm:pt-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={`/journal/${id}`}
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← Back
          </Link>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border-none bg-transparent font-display text-3xl font-medium tracking-tight text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none sm:text-4xl md:text-5xl"
          />

          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Add a subtitle..."
            className="w-full border-none bg-transparent font-display text-xl font-normal text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none sm:text-2xl"
          />

          <div className="h-px w-full bg-[var(--border)]" />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            rows={14}
            className="min-h-[360px] w-full resize-y border-none bg-transparent font-display text-lg leading-[1.8] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none sm:min-h-[400px] sm:text-xl sm:leading-[1.9]"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[var(--cta-bg)] px-6 py-3.5 text-base font-semibold text-[var(--cta-text)] transition-all hover:opacity-90 disabled:opacity-70"
            >
              {loading ? "Saving…" : "Save changes"}
            </button>
            <Link
              href={`/journal/${id}`}
              className="rounded-xl border border-[var(--border)] px-6 py-3.5 text-center text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)]"
            >
              Cancel
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
    </AuthGuard>
  );
}
