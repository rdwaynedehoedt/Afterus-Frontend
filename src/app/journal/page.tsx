"use client";

import { useState } from "react";
import NewEntryModal from "@/components/NewEntryModal";

const placeholderEntries = [
  {
    id: "1",
    title: "Feeling a bit better today",
    date: "2025-02-28",
    preview:
      "Woke up and didn't check their socials first thing. Small win. Went for a run and it actually helped clear my head...",
  },
  {
    id: "2",
    title: "Rough night",
    date: "2025-02-27",
    preview:
      "Had a dream about them. Woke up at 3am and couldn't fall back asleep. Reminded myself that healing isn't linear...",
  },
  {
    id: "3",
    title: "Two weeks no contact",
    date: "2025-02-26",
    preview:
      "Hit 14 days today. It's getting easier. Still think about them but the urge to reach out is weaker. Proud of myself...",
  },
  {
    id: "4",
    title: "Productive day",
    date: "2025-02-25",
    preview:
      "Finished the project I've been putting off. Gym in the morning, work done by 5. Feeling like myself again...",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function JournalContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sortedEntries = [...placeholderEntries].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-12">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--navy)] sm:text-3xl">
            Journal
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Your thoughts, one entry at a time
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            New entry
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedEntries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-shadow hover:shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                {entry.title}
              </h2>
              <time
                dateTime={entry.date}
                className="text-sm text-[var(--muted)]"
              >
                {formatDate(entry.date)}
              </time>
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
              {entry.preview}
            </p>
          </article>
        ))}
      </div>

      <NewEntryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default function JournalPage() {
  return <JournalContent />;
}
