"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import { createProfile } from "@/lib/profile";

export default function ProfileSetupPage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    import("@/lib/profile").then(({ getProfile }) => {
      getProfile(user.uid).then((profile) => {
        if (profile) router.replace("/journal/new");
      });
    });
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Choose a username.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Username must be at least 2 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createProfile(user.uid, { username: trimmed, bio: bio.trim() });
      setDone(true);
      setTimeout(() => router.push("/journal/new"), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="flex min-h-[calc(100dvh-7rem)] flex-col items-center justify-center px-4 pb-24 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:pb-20">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <div className="mb-10 text-center">
                <h1 className="font-display text-2xl font-medium tracking-tight text-[var(--foreground)] sm:text-3xl">
                  Welcome.
                </h1>
                <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
                  Set up your profile to start writing.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="How you'll appear on your posts"
                    maxLength={30}
                    className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                  >
                    Bio <span className="text-[var(--muted)] font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="A little about you..."
                    rows={3}
                    maxLength={160}
                    className="w-full resize-none rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[var(--cta-bg)] py-3.5 text-base font-semibold text-[var(--cta-text)] transition-all hover:opacity-90 disabled:opacity-70"
                >
                  {loading ? "Setting up…" : "Continue"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--cta-bg)]"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="h-10 w-10 text-[var(--cta-text)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </motion.svg>
              </motion.div>
              <h2 className="font-display text-xl font-medium text-[var(--foreground)] sm:text-2xl">
                You&apos;re all set.
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Taking you to write your first post…
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthGuard>
  );
}
