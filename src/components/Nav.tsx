"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import SignInModal from "./SignInModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [signInOpen, setSignInOpen] = useState(false);
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
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--background)]/80 px-6 py-3 shadow-lg backdrop-blur-xl"
      >
        <div className="flex items-center justify-center gap-5 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium tracking-wide transition-colors ${
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
              className="text-[13px] font-medium tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => setSignInOpen(true)}
              className="text-[13px] font-medium tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Sign in
            </button>
          )}
        </div>
      </motion.nav>

      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
