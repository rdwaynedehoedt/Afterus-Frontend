"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import FloatingIcons from "@/components/FloatingIcons";
import SectionFloatingIcons from "@/components/SectionFloatingIcons";
import { JournalIcon, TrackIcon, ReadIcon } from "@/components/FeatureIcons";
import Link from "next/link";

const viewport = { once: true, margin: "-60px" };
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const features = [
  {
    icon: JournalIcon,
    title: "Journal",
    desc: "Write what you can't say out loud.",
    href: "/journal",
  },
  {
    icon: TrackIcon,
    title: "Track",
    desc: "Mood. No contact. Small wins.",
    href: "/dashboard",
  },
  {
    icon: ReadIcon,
    title: "Read",
    desc: "Thoughts, articles, reminders that you're not alone.",
    href: null,
  },
];

const gradientColorsDark = ["#C9A0DC", "#F7CAC9", "#98D4BB", "#C9A0DC"];
const gradientColorsLight = ["#7c3aed", "#c2410c", "#059669", "#7c3aed"];

export default function HomePage() {
  const [showGradient, setShowGradient] = useState(false);
  const { theme } = useTheme();
  const gradientColors = theme === "light" ? gradientColorsLight : gradientColorsDark;

  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden px-4 sm:px-6">
        <FloatingIcons />
        <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
          <BlurText
            text="After Us"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={() => setShowGradient(true)}
            className="font-display text-5xl font-medium tracking-[0.02em] text-[var(--foreground)] sm:text-7xl md:text-8xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={showGradient ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <GradientText
              colors={gradientColors}
              animationSpeed={6}
              showBorder={false}
              className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-[1.5rem]"
            >
              Turning endings into beginnings
            </GradientText>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.a
          href="#why-section"
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="flex flex-col items-center gap-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.a>
      </section>

      {/* Section — Why This Exists (left) + What It Does (right) */}
      <section id="why-section" className="relative px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-5xl">
          <SectionFloatingIcons />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left — Why This Exists */}
          <motion.div {...fadeUp} className="lg:sticky lg:top-24">
            <h2 className="mb-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)] sm:text-base">
              Why This Exists
            </h2>
            <div className="font-display space-y-6 text-[1.15rem] font-medium leading-[1.85] tracking-[0.01em] text-[var(--foreground)] sm:text-[1.25rem]">
              <p>I didn&apos;t plan this.</p>
              <p>
                After the breakup, I started writing a lot. Like… a lot. Some of it made sense. Some of it definitely didn&apos;t.
              </p>
              <p>
                Some days I felt fine. Other days I was staring at the ceiling at 2AM trying to &quot;process my emotions&quot; like I&apos;m in a podcast.
              </p>
              <p>
                I even wrote a bunch on Medium. It helped. But I couldn&apos;t really track anything not my mood, not the no contact days, not whether I was actually getting better or just writing about it.
              </p>
              <p>
                At some point I thought, okay… instead of scattering my thoughts everywhere, maybe I should just put it all in one place.
              </p>
              <p>So I built this.</p>
              <p>
                It&apos;s nothing crazy. Just somewhere to write. Track how I&apos;m doing. Count the days I didn&apos;t text. Remind myself I&apos;m actually moving forward.
              </p>
              <p>I made it for me.</p>
              <p>
                And if you&apos;re going through something similar, I genuinely hope this helps you too. Even a little. Sometimes just seeing your progress written down makes it easier to believe you&apos;re healing.
              </p>
              <p>You&apos;re not alone in it.</p>
              <p>~ Dwayne Dehoedt</p>
            </div>
          </motion.div>

          {/* Right — Journal, Track, Read (timeline, one by one on scroll) */}
          <div className="relative pl-10 lg:min-h-[500px]">
            {/* vertical line */}
            <div
              className="absolute left-[9px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--border)] to-transparent"
              aria-hidden
            />
            {features.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-[var(--muted)]">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                    <span className="font-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[1.1rem] font-medium leading-[1.75] text-[var(--muted)] sm:text-[1.2rem]">
                    {item.desc}
                  </p>
                </>
              );
              return (
                <motion.div
                  key={item.title}
                  className="relative mb-16 last:mb-0 sm:mb-20"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                  }}
                >
                  {/* dot on line */}
                  <div
                    className="absolute -left-10 top-2 h-4 w-4 rounded-full border-2 border-[var(--accent)]/60 bg-[var(--background)]"
                    aria-hidden
                  />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block py-2 transition-colors hover:text-[var(--accent)]"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="py-2">{content}</div>
                  )}
                </motion.div>
              );
            })}
            {/* Little notes at the end of timeline - hidden on mobile */}
            <div className="hidden md:block">
            {[
              {
                icon: (
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                ),
                text: "You're not alone in this. One day at a time.",
              },
              {
                icon: (
                  <>
                    <path d="M7 20h10" />
                    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                  </>
                ),
                text: "Growing takes time. Be gentle with yourself.",
              },
              {
                icon: (
                  <path d="M12 2L15 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 9 8.5 12 2z" />
                ),
                text: "Small steps still count.",
              },
              {
                icon: (
                  <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
                ),
                text: "You're allowed to feel whatever you feel.",
              },
            ].map((note, i) => (
              <motion.div
                key={i}
                className="relative mt-4 flex items-center gap-4 rounded-xl border border-[var(--border)]/60 bg-[var(--surface-muted)]/20 px-5 py-4 first:mt-8"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.05 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--accent)]/80">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    {note.icon}
                  </svg>
                </span>
                <p className="font-display text-base font-medium leading-relaxed text-[var(--muted)] sm:text-[1.1rem]">
                  {note.text}
                </p>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Closing section */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-24">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="font-display text-[1.25rem] leading-[1.75] text-[var(--foreground)] sm:text-[2.25rem] sm:leading-[1.8] md:text-[2.5rem]">
            You made it here. That already says something. Healing isn&apos;t loud. It&apos;s consistent. You don&apos;t have to fix everything today. Just take the next step.
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:mt-14 sm:gap-6">
            <Link
              href="/journal"
              className="inline-flex items-center rounded-2xl bg-[var(--cta-bg)] px-8 py-3.5 text-base font-semibold text-[var(--cta-text)] transition-all hover:opacity-90 hover:scale-[1.02] sm:px-10 sm:py-4 sm:text-lg"
            >
              Begin Again
            </Link>
            <p className="text-sm text-[var(--foreground)] sm:text-lg">
              One day at a time.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 sm:py-12 sm:px-6">
        <p className="flex items-center justify-center gap-2 text-center font-signature text-xl font-medium text-[var(--foreground)] sm:text-3xl">
          Made with love, grief, and growth
          <span className="text-[var(--accent)]" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="inline-block sm:w-7 sm:h-7">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </span>
        </p>
      </footer>

    </div>
  );
}
