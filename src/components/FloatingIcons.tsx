"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const ALL_ICON_NAMES = [
  "sprout",
  "leaf",
  "flame",
  "feather",
  "sun",
  "star",
  "book",
  "flower",
  "bird",
] as const;

// Curated for After Us: growth → freedom → hope → progress → reflection
// Fewer icons, larger, more visible — each one meaningful for the journey
const icons = [
  {
    icon: "sprout",
    x: "12%",
    y: "18%",
    delay: 0,
    duration: 9,
    size: 44,
    rotate: -6,
    tint: "lavender", // new beginnings
  },
  {
    icon: "bird",
    x: "88%",
    y: "22%",
    delay: 1.5,
    duration: 8,
    size: 40,
    rotate: 8,
    tint: null, // freedom
  },
  {
    icon: "sun",
    x: "8%",
    y: "72%",
    delay: 2,
    duration: 10,
    size: 48,
    rotate: -4,
    tint: "blush", // hope, clarity
  },
  {
    icon: "star",
    x: "92%",
    y: "68%",
    delay: 0.5,
    duration: 8,
    size: 36,
    rotate: 12,
    tint: "mint", // milestones, progress
  },
  {
    icon: "book",
    x: "18%",
    y: "78%",
    delay: 1,
    duration: 11,
    size: 40,
    rotate: -5,
    tint: null, // reflection, journaling
  },
  {
    icon: "flower",
    x: "85%",
    y: "15%",
    delay: 2.5,
    duration: 9,
    size: 42,
    rotate: 6,
    tint: "lavender", // nurturing, blooming
  },
];

const tintVars: Record<string, string> = {
  lavender: "var(--hero-icon-lavender)",
  blush: "var(--hero-icon-blush)",
  mint: "var(--hero-icon-mint)",
};

function IconSvg({
  name,
  size,
  className,
}: {
  name: string;
  size: number;
  className?: string;
}) {
  const stroke = "currentColor";
  const strokeWidth = 2;
  const s = size;

  switch (name) {
    case "sprout":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
      );
    case "leaf":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "flame":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case "feather":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
          <path d="M16 8 2 22" />
          <path d="M17.5 15H9" />
        </svg>
      );
    case "sun":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
    case "star":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <polygon points="12 2 15 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 9 8.5 12 2" />
        </svg>
      );
    case "book":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
        </svg>
      );
    case "flower":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="m4.93 19.07 1.41-1.41" />
          <path d="m17.66 6.34 1.41-1.41" />
        </svg>
      );
    case "bird":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M16 7h.01" />
          <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
          <path d="m20 7 2 .5-2 .5" />
          <path d="M10 18v3" />
          <path d="M14 21v-3" />
        </svg>
      );
    default:
      return null;
  }
}

function pickRandomOther(current: string): string {
  const others = ALL_ICON_NAMES.filter((n) => n !== current);
  return others[Math.floor(Math.random() * others.length)];
}

export default function FloatingIcons() {
  const staggerDelay = 0.9;
  const [slotIcons, setSlotIcons] = useState<string[]>(() =>
    icons.map((s) => s.icon)
  );
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHasInitialized(true), 7000);
    return () => clearTimeout(id);
  }, []);

  const swapRandomIcon = useCallback(() => {
    setSlotIcons((prev) => {
      const idx = Math.floor(Math.random() * prev.length);
      const next = pickRandomOther(prev[idx]);
      return prev.map((c, i) => (i === idx ? next : c));
    });
  }, []);

  useEffect(() => {
    const minMs = 8000;
    const maxMs = 14000;
    const scheduleNext = () => {
      const delay = minMs + Math.random() * (maxMs - minMs);
      const id = setTimeout(() => {
        swapRandomIcon();
        scheduleNext();
      }, delay);
      return id;
    };
    const id = scheduleNext();
    return () => clearTimeout(id);
  }, [swapRandomIcon]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute cursor-default scale-75 transition-all duration-300 sm:scale-90 md:scale-100"
          style={{
            left: item.x,
            top: item.y,
            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            pointerEvents: "auto",
            color: item.tint ? tintVars[item.tint] : "var(--hero-icon)",
          }}
          initial={false}
          animate={{
            y: [0, -16, 0],
          }}
          transition={{
            y: {
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5 + i * staggerDelay + item.delay,
            },
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={slotIcons[i]}
              className="inline-block"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.6,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              transition={{
                duration: 0.5,
                delay: hasInitialized ? 0 : 1.5 + i * staggerDelay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                scale: 1.12,
                opacity: 0.7,
                transition: { duration: 0.25 },
              }}
            >
              <IconSvg name={slotIcons[i]} size={item.size} />
            </motion.span>
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
