"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";

export default function BlogFloatingButtons() {
  const { isLoggedIn, user } = useAuth();

  return (
    <AnimatePresence>
      {isLoggedIn && user && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] right-4 z-40 flex flex-col gap-2 sm:bottom-[calc(1.5rem+4rem)] sm:right-6"
        >
          <Link
            href="/journal/new"
            className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/95 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-lg backdrop-blur-xl transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--cta-bg)] hover:text-[var(--cta-text)]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Write a blog
          </Link>
          <Link
            href={`/profile/${user.uid}`}
            className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/95 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-lg backdrop-blur-xl transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--surface-muted)]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            My blogs
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
