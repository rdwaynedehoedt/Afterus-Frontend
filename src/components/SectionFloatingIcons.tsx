"use client";

import { motion } from "motion/react";
import { IconSvg } from "./FloatingIcons";

const tintVars: Record<string, string> = {
  lavender: "var(--hero-icon-lavender)",
  blush: "var(--hero-icon-blush)",
  mint: "var(--hero-icon-mint)",
  blue: "var(--hero-icon-blue)",
};

// Scattered icons - left side, random positions (not a straight line)
const leftIcons = [
  { icon: "leaf" as const, left: "8%", top: "6%", size: 26, rotate: -8, tint: "lavender" },
  { icon: "droplet" as const, left: "25%", top: "14%", size: 20, rotate: 5, tint: "blue" },
  { icon: "flower" as const, left: "5%", top: "28%", size: 28, rotate: 6, tint: "blush" },
  { icon: "star" as const, left: "22%", top: "38%", size: 22, rotate: -4, tint: "mint" },
  { icon: "sprout" as const, left: "12%", top: "52%", size: 30, rotate: -6, tint: "mint" },
  { icon: "feather" as const, left: "28%", top: "62%", size: 24, rotate: 8, tint: null },
  { icon: "book" as const, left: "6%", top: "72%", size: 26, rotate: -5, tint: null },
  { icon: "shell" as const, left: "20%", top: "84%", size: 22, rotate: 7, tint: "blush" },
  { icon: "moon" as const, left: "15%", top: "22%", size: 24, rotate: -3, tint: null },
  { icon: "tree" as const, left: "18%", top: "92%", size: 28, rotate: 5, tint: "lavender" },
];

// Scattered icons - right side, random positions
const rightIcons = [
  { icon: "bird" as const, right: "12%", top: "8%", size: 26, rotate: 7, tint: null },
  { icon: "waves" as const, right: "6%", top: "20%", size: 28, rotate: -4, tint: "blue" },
  { icon: "sun" as const, right: "20%", top: "32%", size: 30, rotate: -5, tint: "blush" },
  { icon: "heart" as const, right: "10%", top: "46%", size: 24, rotate: -3, tint: "blush" },
  { icon: "cloud" as const, right: "24%", top: "58%", size: 26, rotate: 6, tint: null },
  { icon: "fish" as const, right: "8%", top: "70%", size: 24, rotate: -7, tint: "blue" },
  { icon: "palm" as const, right: "18%", top: "80%", size: 28, rotate: 5, tint: "mint" },
  { icon: "flower" as const, right: "14%", top: "92%", size: 22, rotate: -6, tint: "lavender" },
  { icon: "mountain" as const, right: "22%", top: "15%", size: 26, rotate: 4, tint: "blush" },
  { icon: "star" as const, right: "4%", top: "38%", size: 20, rotate: 8, tint: "mint" },
];

// Heart icon for the "You're not alone" vibe
function HeartIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function SectionFloatingIcons() {
  const scrollAnim = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  };

  return (
    <>
      {/* Left side - scattered across the gutter */}
      <div
        className="pointer-events-none absolute -left-20 top-0 hidden h-full w-24 lg:block xl:-left-24 xl:w-28"
        aria-hidden
      >
        {leftIcons.map((item, i) => (
          <motion.div
            key={`left-${i}`}
            className="absolute"
            style={{
              left: item.left,
              top: item.top,
              color: item.tint ? tintVars[item.tint] : "var(--hero-icon)",
              transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            }}
            {...scrollAnim}
            transition={{
              ...scrollAnim.transition,
              delay: i * 0.06,
            }}
          >
            <IconSvg name={item.icon} size={item.size} />
          </motion.div>
        ))}
      </div>

      {/* Right side - scattered across the gutter */}
      <div
        className="pointer-events-none absolute -right-20 top-0 hidden h-full w-24 lg:block xl:-right-24 xl:w-28"
        aria-hidden
      >
        {rightIcons.map((item, i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute"
            style={{
              right: item.right,
              top: item.top,
              color: item.tint ? tintVars[item.tint] : "var(--hero-icon)",
              transform: `translate(50%, -50%) rotate(${item.rotate}deg)`,
            }}
            {...scrollAnim}
            transition={{
              ...scrollAnim.transition,
              delay: i * 0.06,
            }}
          >
            {item.icon === "heart" ? (
              <HeartIcon size={item.size} />
            ) : (
              <IconSvg name={item.icon} size={item.size} />
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
}
