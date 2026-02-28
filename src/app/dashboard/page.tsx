import DashboardCard from "@/components/DashboardCard";
import MoodChart from "@/components/MoodChart";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--navy)] sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Track your progress and how you&apos;re feeling
        </p>
      </div>

      {/* Dashboard cards grid */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <DashboardCard title="Mood" value="7/10" subtitle="Today" />
        <DashboardCard title="Urge to text" value="3/10" subtitle="Today" />
        <DashboardCard title="Gym" value="Yes" subtitle="Completed" />
        <DashboardCard title="Productive day" value="Yes" subtitle="Done" />
        <DashboardCard
          title="No Contact"
          value="14 days"
          subtitle="Keep going"
          variant="streak"
        />
      </div>

      {/* Mood progress chart */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <h2 className="mb-6 text-lg font-semibold text-[var(--foreground)]">
          Mood over time
        </h2>
        <MoodChart />
      </div>

      {/* Subtle geometric accent */}
      <div
        className="pointer-events-none fixed -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.04]"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
    </div>
  );
}
