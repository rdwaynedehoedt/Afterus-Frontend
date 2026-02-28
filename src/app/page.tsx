"use client";

import { useState } from "react";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";

export default function HomePage() {
  const [showGradient, setShowGradient] = useState(false);

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden bg-[var(--background)]">
      <div className="flex flex-col items-center gap-8">
        <BlurText
          text="After Us"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => setShowGradient(true)}
          className="font-display text-5xl font-light tracking-[0.02em] text-[var(--foreground)] sm:text-7xl md:text-8xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showGradient ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <GradientText
            colors={["#C9A0DC", "#F7CAC9", "#98D4BB", "#C9A0DC"]}
            animationSpeed={6}
            showBorder={false}
            className="text-lg font-medium sm:text-xl md:text-2xl"
          >
            Turning endings into beginnings
          </GradientText>
        </motion.div>
      </div>
    </div>
  );
}
