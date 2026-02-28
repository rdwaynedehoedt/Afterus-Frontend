"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const placeholderData = [
  { date: "Feb 22", mood: 4 },
  { date: "Feb 23", mood: 5 },
  { date: "Feb 24", mood: 6 },
  { date: "Feb 25", mood: 5 },
  { date: "Feb 26", mood: 7 },
  { date: "Feb 27", mood: 6 },
  { date: "Feb 28", mood: 7 },
];

export default function MoodChart() {
  return (
    <div className="h-64 min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={placeholderData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="var(--muted)"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[1, 10]}
            stroke="var(--muted)"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "var(--foreground)" }}
            formatter={(value: number | undefined) => [`${value ?? 0}/10`, "Mood"]}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ fill: "var(--accent)", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: "var(--accent-soft)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
