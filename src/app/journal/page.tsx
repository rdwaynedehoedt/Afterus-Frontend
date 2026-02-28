"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function JournalPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col items-center gap-8 text-center"
      >
        <h1 className="font-display text-5xl font-light tracking-tight text-[var(--foreground)] sm:text-6xl md:text-7xl">
          Journaling
        </h1>
        <p className="max-w-md font-display text-lg font-medium text-[var(--muted)] sm:text-xl">
          Write it out. No one else has to see.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href="/journal/new"
            className="inline-flex items-center rounded-2xl bg-[var(--cta-bg)] px-8 py-4 text-base font-semibold text-[var(--cta-text)] transition-all hover:opacity-90 hover:scale-[1.02]"
          >
            Write anonymously
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
