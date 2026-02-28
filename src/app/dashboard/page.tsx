"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import DashboardCard from "@/components/DashboardCard";
import MoodChart from "@/components/MoodChart";
import { JournalIcon, TrackIcon, ReadIcon } from "@/components/FeatureIcons";

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

const dashboardLinks = [
  {
    href: "/journal/new",
    icon: JournalIcon,
    title: "Write blog",
    desc: "Write what you can't say out loud.",
  },
  {
    href: "/dashboard#mood",
    icon: TrackIcon,
    title: "Track mood",
    desc: "Log how you're feeling each day.",
  },
  {
    href: "/coming-soon",
    icon: ReadIcon,
    title: "Read",
    desc: "Articles and reminders you're not alone.",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <div className="mx-auto max-w-4xl px-4 py-8 pb-24 sm:px-6 sm:py-12 sm:pb-14">
        {/* Top — Hi + Your safe space */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <h1 className="font-display text-2xl font-light tracking-tight text-[var(--foreground)] sm:text-3xl">
            Hi, {user ? getFirstName(user) : "there"}.
          </h1>
          <p className="mt-1 font-display text-base text-[var(--muted)] sm:text-lg">
            Your safe space.
          </p>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 grid gap-4 sm:grid-cols-3"
        >
          {dashboardLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]/50 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display font-medium text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">{item.desc}</p>
                </div>
              </Link>
            );
          })}
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
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <h2 className="mb-6 font-display text-lg font-medium text-[var(--foreground)]">
            Mood over time
          </h2>
          <MoodChart />
        </motion.section>
      </div>
    </AuthGuard>
  );
}
