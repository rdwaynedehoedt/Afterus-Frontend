"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import DashboardCard from "@/components/DashboardCard";
import MoodChart from "@/components/MoodChart";
import { getProfile } from "@/lib/profile";

function getFirstName(user: { displayName?: string | null; email?: string | null }): string {
  if (user.displayName) {
    const first = user.displayName.trim().split(/\s+/)[0];
    if (first) return first;
  }
  if (user.email) {
    const beforeAt = user.email.split("@")[0];
    if (beforeAt) return beforeAt.charAt(0).toUpperCase() + beforeAt.slice(1).toLowerCase();
  }
  return "there";
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (!user) return;
    getProfile(user.uid).then((p) => setProfile(p));
  }, [user]);

  const greeting = profile?.username ?? (user ? getFirstName(user) : "there");

  return (
    <AuthGuard>
      <div className="mx-auto max-w-4xl px-4 py-8 pb-24 sm:px-6 sm:py-12 sm:pb-14">
        {/* Top — Hi + Your safe space + Write blog button (top right) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 flex flex-wrap items-start justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-2xl font-light tracking-tight text-[var(--foreground)] sm:text-3xl">
              Hi, {greeting}.
            </h1>
            <p className="mt-1 font-display text-base text-[var(--muted)] sm:text-lg">
              Your safe space.
            </p>
            <div className="mt-3 flex items-center gap-4">
              <Link
                href={user ? `/profile/${user.uid}` : "/profile/edit"}
                className="text-sm font-medium text-[var(--accent)] hover:underline"
              >
                My blogs
              </Link>
              <Link
                href="/profile/edit"
                className="text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Edit profile
              </Link>
            </div>
          </div>
          <Link
            href="/journal/new"
            className="shrink-0 rounded-lg bg-[var(--cta-bg)] px-3 py-2 text-xs font-medium text-[var(--cta-text)] transition-all active:scale-[0.98] hover:opacity-90 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Write blog
          </Link>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          <DashboardCard title="Mood" value="7/10" subtitle="Today" />
          <DashboardCard title="Urge to text" value="3/10" subtitle="Today" />
          <DashboardCard title="Gym" value="Yes" subtitle="Done" />
          <DashboardCard
            title="No contact"
            value="14 days"
            subtitle="Keep going"
            variant="streak"
          />
        </motion.div>

        {/* Mood chart */}
        <motion.section
          id="mood"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <h2 className="mb-6 font-display text-lg font-medium text-[var(--foreground)]">
            Mood over time
          </h2>
          <MoodChart />
        </motion.section>

        {/* My blogs button — bottom */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href={`/profile/${user.uid}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-4 text-base font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--surface-muted)]"
            >
              My blogs
            </Link>
            <p className="mt-2 text-center text-xs text-[var(--muted)]">
              View, edit, and delete what you wrote
            </p>
          </motion.div>
        )}
      </div>
    </AuthGuard>
  );
}
