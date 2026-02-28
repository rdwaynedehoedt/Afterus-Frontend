"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { getAuthErrorMessage } from "@/lib/authErrors";
import { getProfile } from "@/lib/profile";
import { auth } from "@/lib/firebase";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/journal/new");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      const uid = auth.currentUser?.uid;
      if (uid) {
        try {
          const profile = await getProfile(uid);
          router.push(profile ? "/journal/new" : "/profile/setup");
        } catch {
          router.push("/journal/new");
        }
      } else {
        router.push("/journal/new");
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col items-center justify-center px-4 py-6 sm:min-h-[calc(100vh-6rem)] sm:px-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-sm"
      >
        <div className="mb-6 text-center sm:mb-10">
          <h1 className="font-display text-2xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">
            Sign in
          </h1>
          <p className="mt-1.5 font-display text-sm font-medium text-[var(--muted)] sm:mt-2 sm:text-base">
            Welcome back.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-semibold text-[var(--foreground)] sm:mb-1.5 sm:text-sm"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3.5 py-3 text-sm font-medium text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] sm:px-4 sm:py-3.5 sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-semibold text-[var(--foreground)] sm:mb-1.5 sm:text-sm"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3.5 py-3 text-sm font-medium text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] sm:px-4 sm:py-3.5 sm:text-base"
            />
          </div>
          {error && (
            <p className="text-xs text-red-500 sm:text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[var(--cta-bg)] py-3.5 text-sm font-semibold text-[var(--cta-text)] transition-all hover:opacity-90 disabled:opacity-70 sm:py-4 sm:text-base"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:gap-4">
          <p className="text-[11px] font-medium text-[var(--muted)] sm:text-xs">or continue with</p>
          <div className="flex w-full justify-center gap-2 sm:gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignIn}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2.5 text-[11px] font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] disabled:opacity-70 sm:flex-initial sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs"
            >
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs font-medium text-[var(--muted)] sm:mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-semibold text-[var(--accent)] hover:underline">
            Create account
          </Link>
        </p>

        <Link
          href="/"
          className="mt-4 block text-center text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] sm:mt-6 sm:text-sm"
        >
          ← Back to home
        </Link>
      </motion.div>
    </div>
  );
}
