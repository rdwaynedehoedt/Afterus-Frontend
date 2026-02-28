"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WriteBlogRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/journal/new");
  }, [router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--accent)]/30" />
    </div>
  );
}
