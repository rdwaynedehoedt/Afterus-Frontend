"use client";

import { useEffect } from "react";

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewEntryModal({ isOpen, onClose }: NewEntryModalProps) {
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden
      />
      <div
        className="relative w-full max-w-lg max-h-[85dvh] overflow-y-auto rounded-t-2xl border-t border-x border-[var(--border)] bg-[var(--surface)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-xl sm:rounded-xl sm:border sm:max-h-[90dvh] sm:p-6 sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center sm:hidden">
          <div className="h-1 w-12 rounded-full bg-[var(--border)]" aria-hidden />
        </div>
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <h2 className="text-base font-semibold text-[var(--foreground)] sm:text-lg">
            New journal entry
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="entry-title"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              Title
            </label>
            <input
              id="entry-title"
              type="text"
              placeholder="How I'm feeling today..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="entry-date"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              Date
            </label>
            <input
              id="entry-date"
              type="date"
              defaultValue={today}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="entry-content"
              className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
            >
              Content
            </label>
            <textarea
              id="entry-content"
              rows={5}
              placeholder="Write your thoughts here..."
              className="min-h-[120px] w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-3.5 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] sm:px-4"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
            >
              Save entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
