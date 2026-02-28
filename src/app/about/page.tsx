function AboutContent() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-12">
      <div className="mb-12">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--navy)] sm:text-3xl">
          About After Us
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          A space for healing and growth
        </p>
      </div>

      <div className="space-y-8 text-[var(--foreground)]">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--navy)]">
            What is this?
          </h2>
          <p className="leading-relaxed text-[var(--muted)]">
            After Us is a minimalist, personal journal for breakup recovery and
            growth. Track your mood, urges, habits, and no-contact progress while
            writing through your thoughts. No judgment, no pressure—just a calm
            space to process and move forward.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--navy)]">
            Features
          </h2>
          <ul className="space-y-2 text-[var(--muted)]">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              Daily mood and urge tracking
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              Gym and productivity check-ins
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              No-contact streak counter
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              Private journal entries
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              Mood progress over time
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--navy)]">
            Built for you
          </h2>
          <p className="leading-relaxed text-[var(--muted)]">
            This app is designed to feel calm, introspective, and supportive.
            Take it one day at a time. You&apos;ve got this.
          </p>
        </section>
      </div>

      {/* Subtle accent */}
      <div
        className="pointer-events-none fixed -left-20 bottom-20 h-48 w-48 rounded-full opacity-[0.04]"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
    </div>
  );
}

export default function AboutPage() {
  return <AboutContent />;
}
