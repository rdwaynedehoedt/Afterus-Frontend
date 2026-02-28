"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { saveEntry, updateEntry } from "@/lib/entries";
import { getProfile } from "@/lib/profile";

export default function NewEntryPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent, isPrivate: boolean) => {
    e.preventDefault();
    if (!user) {
      setError("Please sign in to publish.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const profile = await getProfile(user.uid);
      const authorName = profile?.username ?? user.displayName ?? user.email?.split("@")[0] ?? "Kyl";
      const entryId = await saveEntry(user.uid, authorName, { title, subtitle, content }, isPrivate);

      if (content.trim().length >= 30) {
        try {
          const moodRes = await fetch("/api/analyze-mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: content.trim() }),
          });
          if (moodRes.ok) {
            const mood = await moodRes.json();
            await updateEntry(entryId, { mood });
          }
        } catch {
          // Mood analysis failed, entry still saved
        }
      }

      router.push("/journal");
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

  return (
    <div className="min-h-[calc(100dvh-7rem)] px-4 pb-36 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:pb-28">
      <div className="mx-auto max-w-[680px] pt-8 sm:pt-12">
        {/* Minimal header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/journal"
            className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← Back
          </Link>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={(e) => handleSubmit(e, false)}
          className="space-y-8"
        >
          {/* Title - Medium style */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border-none bg-transparent font-display text-3xl font-medium tracking-tight text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none sm:text-4xl md:text-5xl"
          />

          {/* Subtitle - Medium style */}
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Add a subtitle..."
            className="w-full border-none bg-transparent font-display text-xl font-normal text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none sm:text-2xl"
          />

          {/* Divider */}
          <div className="h-px w-full bg-[var(--border)]" />

          {/* Body - Medium style */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            rows={14}
            className="min-h-[360px] w-full resize-y border-none bg-transparent font-display text-lg leading-[1.8] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none sm:min-h-[400px] sm:text-xl sm:leading-[1.9]"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Actions — clear of nav, compact & cute */}
          <div className="flex flex-col gap-2 pt-6 pb-8 sm:flex-row sm:flex-wrap sm:gap-3 sm:pt-8 sm:pb-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-[var(--cta-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--cta-text)] shadow-sm transition-all hover:opacity-90 hover:shadow disabled:opacity-70"
            >
              {loading ? "Publishing…" : "Publish"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={(e) => { e.preventDefault(); handleSubmit(e as unknown as React.FormEvent, true); }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] disabled:opacity-70"
            >
              {loading ? "Publishing…" : "Publish privately"}
            </button>
            <Link
              href="/journal"
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-center text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)]"
            >
              Cancel
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
