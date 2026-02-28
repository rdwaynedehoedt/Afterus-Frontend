"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-50 mx-auto max-w-md rounded-full border border-[var(--border)] bg-[var(--background)]/80 px-4 py-2.5 shadow-lg backdrop-blur-xl sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:px-6 sm:py-3"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-xs font-medium tracking-wide transition-colors sm:text-[13px] ${
                pathname === link.href
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-xs font-medium tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--foreground)] sm:text-[13px]"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/sign-in"
              className="text-xs font-medium tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--foreground)] sm:text-[13px]"
            >
              Sign in
            </Link>
          )}
          <span className="mx-0.5 h-3 w-px shrink-0 bg-[var(--border)] sm:mx-1" aria-hidden />
          <ThemeToggle compact />
        </div>
      </motion.nav>
    </>
  );
}
