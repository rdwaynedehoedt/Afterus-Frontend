"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import { getProfile, updateProfile } from "@/lib/profile";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    getProfile(user.uid).then((profile) => {
      if (profile) {
        setUsername(profile.username);
        setBio(profile.bio);
      }
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Username is required.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Username must be at least 2 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await updateProfile(user.uid, { username: trimmed, bio: bio.trim() });
      setSaved(true);
      setTimeout(() => router.push(`/profile/${user.uid}`), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="mx-auto max-w-md px-4 py-12 pb-24 sm:px-6 sm:pb-20">
        <Link
          href="/dashboard"
          className="mb-8 inline-block text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          ← Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <h1 className="font-display text-xl font-medium text-[var(--foreground)]">
            Edit profile
          </h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={30}
                className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                maxLength={160}
                className="w-full resize-none rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || saved}
              className="w-full rounded-xl bg-[var(--cta-bg)] py-3.5 font-semibold text-[var(--cta-text)] hover:opacity-90 disabled:opacity-70"
            >
              {saved ? "Saved!" : loading ? "Saving…" : "Save changes"}
            </button>
          </form>
        </motion.div>
      </div>
    </AuthGuard>
  );
}
