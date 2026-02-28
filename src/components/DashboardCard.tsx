interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "streak";
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  variant = "default",
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow hover:shadow-sm sm:p-5 ${
        variant === "streak"
          ? "border-[var(--accent-soft)] bg-[var(--surface-muted)]"
          : ""
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {title}
      </p>
      <p
        className={`mt-2 text-2xl font-semibold ${
          variant === "streak" ? "text-[var(--accent)]" : "text-[var(--foreground)]"
        }`}
      >
        {value}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-[var(--muted)]">{subtitle}</p>
      )}
    </div>
  );
}
