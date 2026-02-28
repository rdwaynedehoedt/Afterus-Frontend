"use client";

import { useState } from "react";
import { motion } from "motion/react";
import NewEntryModal from "@/components/NewEntryModal";

export default function JournalPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col items-center justify-center px-4 pb-24 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex w-full max-w-md flex-col items-center gap-6 text-center sm:gap-8"
      >
        <h1 className="font-display text-3xl font-light tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-7xl">
          Journaling
        </h1>
        <p className="font-display text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg md:max-w-md md:text-xl">
          Write it out. No one else has to see.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full sm:w-auto"
        >
          <button
            onClick={() => setModalOpen(true)}
            className="w-full min-w-0 rounded-2xl bg-[var(--cta-bg)] px-6 py-3.5 text-sm font-semibold text-[var(--cta-text)] transition-all active:scale-[0.98] hover:opacity-90 sm:w-auto sm:px-8 sm:py-4 sm:text-base sm:hover:scale-[1.02]"
          >
            Write anonymously
          </button>
        </motion.div>
      </motion.div>

      <NewEntryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
