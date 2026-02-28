"use client";

import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "motion/react";

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

  return (
    <AuthGuard>
      <div className="flex min-h-[calc(100dvh-7rem)] flex-col items-center justify-center px-4 pb-24 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-lg text-center"
        >
          <h1 className="font-display text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            My Profile
          </h1>
          <p className="mt-6 font-display text-xl font-medium text-[var(--foreground)] sm:text-2xl md:text-3xl">
            Hi, {user ? getFirstName(user) : "there"}.
          </p>
          <p className="mt-4 text-base font-medium text-[var(--muted)] sm:text-lg">
            Your safe space to reflect and grow.
          </p>
        </motion.div>
      </div>
    </AuthGuard>
  );
}
