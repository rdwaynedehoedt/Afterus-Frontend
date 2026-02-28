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
  "waves",
  "palm",
  "cloud",
  "mountain",
  "droplet",
  "shell",
  "fish",
  "moon",
  "tree",
] as const;

// Many nature icons spread across the screen — beaches, waves, palm trees, etc.
const icons = [
  { icon: "sprout", x: "8%", y: "12%", delay: 0, duration: 9, size: 36, rotate: -6, tint: "lavender" },
  { icon: "bird", x: "92%", y: "18%", delay: 1.5, duration: 8, size: 32, rotate: 8, tint: null },
  { icon: "sun", x: "5%", y: "68%", delay: 2, duration: 10, size: 40, rotate: -4, tint: "blush" },
  { icon: "star", x: "94%", y: "62%", delay: 0.5, duration: 8, size: 28, rotate: 12, tint: "mint" },
  { icon: "book", x: "15%", y: "75%", delay: 1, duration: 11, size: 32, rotate: -5, tint: null },
  { icon: "flower", x: "88%", y: "10%", delay: 2.5, duration: 9, size: 34, rotate: 6, tint: "lavender" },
  { icon: "waves", x: "25%", y: "8%", delay: 0.3, duration: 7, size: 38, rotate: -3, tint: "mint" },
  { icon: "waves", x: "78%", y: "85%", delay: 1.2, duration: 9, size: 36, rotate: 5, tint: "mint" },
  { icon: "palm", x: "3%", y: "35%", delay: 2, duration: 10, size: 42, rotate: -8, tint: "lavender" },
  { icon: "palm", x: "96%", y: "45%", delay: 0.8, duration: 11, size: 38, rotate: 10, tint: "mint" },
  { icon: "cloud", x: "18%", y: "22%", delay: 1.5, duration: 12, size: 36, rotate: -2, tint: null },
  { icon: "cloud", x: "82%", y: "72%", delay: 0.5, duration: 10, size: 32, rotate: 4, tint: null },
  { icon: "mountain", x: "12%", y: "55%", delay: 1.8, duration: 9, size: 40, rotate: -5, tint: "blush" },
  { icon: "mountain", x: "88%", y: "28%", delay: 0.2, duration: 11, size: 34, rotate: 7, tint: "blush" },
  { icon: "droplet", x: "30%", y: "15%", delay: 2.2, duration: 8, size: 24, rotate: -10, tint: "mint" },
  { icon: "droplet", x: "72%", y: "78%", delay: 1, duration: 7, size: 26, rotate: 12, tint: "mint" },
  { icon: "droplet", x: "50%", y: "5%", delay: 0.7, duration: 9, size: 22, rotate: -4, tint: "mint" },
  { icon: "shell", x: "8%", y: "82%", delay: 1.3, duration: 10, size: 30, rotate: -7, tint: "blush" },
  { icon: "shell", x: "92%", y: "12%", delay: 2.8, duration: 8, size: 28, rotate: 9, tint: "blush" },
  { icon: "fish", x: "22%", y: "88%", delay: 0.4, duration: 9, size: 32, rotate: -6, tint: "mint" },
  { icon: "fish", x: "75%", y: "35%", delay: 2.1, duration: 7, size: 28, rotate: 8, tint: "mint" },
  { icon: "leaf", x: "35%", y: "25%", delay: 1.6, duration: 10, size: 30, rotate: -4, tint: "lavender" },
  { icon: "leaf", x: "65%", y: "65%", delay: 0.9, duration: 9, size: 28, rotate: 6, tint: "mint" },
  { icon: "feather", x: "45%", y: "18%", delay: 2.3, duration: 11, size: 26, rotate: -8, tint: null },
  { icon: "feather", x: "55%", y: "82%", delay: 0.6, duration: 8, size: 24, rotate: 5, tint: null },
  { icon: "flower", x: "40%", y: "42%", delay: 1.4, duration: 10, size: 28, rotate: -3, tint: "lavender" },
  { icon: "flower", x: "60%", y: "52%", delay: 0.3, duration: 9, size: 26, rotate: 7, tint: "blush" },
  { icon: "star", x: "28%", y: "72%", delay: 2.6, duration: 8, size: 24, rotate: -6, tint: "mint" },
  { icon: "star", x: "70%", y: "8%", delay: 1.1, duration: 7, size: 22, rotate: 10, tint: "mint" },
  { icon: "moon", x: "95%", y: "55%", delay: 1.9, duration: 12, size: 30, rotate: -5, tint: null },
  { icon: "moon", x: "5%", y: "88%", delay: 0.2, duration: 10, size: 26, rotate: 8, tint: null },
  { icon: "tree", x: "38%", y: "75%", delay: 2.4, duration: 9, size: 36, rotate: -7, tint: "lavender" },
  { icon: "tree", x: "62%", y: "22%", delay: 0.8, duration: 11, size: 32, rotate: 6, tint: "mint" },
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

  const svgProps = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "sprout":
      return (
        <svg {...svgProps}>
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...svgProps}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "flame":
      return (
        <svg {...svgProps}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case "feather":
      return (
        <svg {...svgProps}>
          <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
          <path d="M16 8 2 22" />
          <path d="M17.5 15H9" />
        </svg>
      );
    case "sun":
      return (
        <svg {...svgProps}>
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
        <svg {...svgProps}>
          <polygon points="12 2 15 8.5 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 9 8.5 12 2" />
        </svg>
      );
    case "book":
      return (
        <svg {...svgProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
        </svg>
      );
    case "flower":
      return (
        <svg {...svgProps}>
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
        <svg {...svgProps}>
          <path d="M16 7h.01" />
          <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
          <path d="m20 7 2 .5-2 .5" />
          <path d="M10 18v3" />
          <path d="M14 21v-3" />
        </svg>
      );
    case "waves":
      return (
        <svg {...svgProps}>
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
      );
    case "palm":
      return (
        <svg {...svgProps}>
          <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" />
          <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" />
          <path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35" />
          <path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...svgProps}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1a4 4 0 0 1 4 4 4.5 4.5 0 0 1-3.21 6" />
        </svg>
      );
    case "mountain":
      return (
        <svg {...svgProps}>
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      );
    case "droplet":
      return (
        <svg {...svgProps}>
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-2.4-4-2.8c-.5-.4-1-.6-1-.6s-.5.2-1 .6c-.5.4-1.7 1.2-4 2.8S5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
      );
    case "shell":
      return (
        <svg {...svgProps}>
          <path d="M14 11a2 2 0 0 1-2 2 4 4 0 0 0-4 4 6 6 0 0 0 6 6 4 4 0 0 0 4-4 2 2 0 0 1 2-2" />
          <path d="M14 11a2 2 0 0 0 2-2 4 4 0 0 1 4-4 6 6 0 0 1 6 6 4 4 0 0 1-4 4 2 2 0 0 0-2 2" />
          <path d="M14 11a2 2 0 0 1-2-2 4 4 0 0 0-4-4 6 6 0 0 0-6 6 4 4 0 0 0 4 4 2 2 0 0 1 2 2" />
        </svg>
      );
    case "fish":
      return (
        <svg {...svgProps}>
          <path d="M2 16s9-15 20-10c-2.5 3-5 6-8 9" />
          <path d="M22 8s-9 15-20 10c2.5-3 5-6 8-9" />
        </svg>
      );
    case "moon":
      return (
        <svg {...svgProps}>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );
    case "tree":
      return (
        <svg {...svgProps}>
          <path d="M10 10v14" />
          <path d="M14 10v14" />
          <path d="M12 10 6 4" />
          <path d="M12 10l6-6" />
          <path d="M8 14l-4-4" />
          <path d="M16 14l4-4" />
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
  const staggerDelay = 0.6;
  const [slotIcons, setSlotIcons] = useState<string[]>(() =>
    icons.map((s) => s.icon)
  );
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHasInitialized(true), 5000);
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
    const minMs = 6000;
    const maxMs = 12000;
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
              delay: 1 + i * staggerDelay + item.delay,
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
                delay: hasInitialized ? 0 : 1 + i * staggerDelay,
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
