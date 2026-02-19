"use client";

import StatCard from "@/components/ui/StatCard";

interface StatsGridProps {
  total: number;
  thisWeek: number;
  favorites: number;
  domains: number;
}

export default function StatsGrid({
  total,
  thisWeek,
  favorites,
  domains,
}: StatsGridProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      style={{ marginBottom: 40 }}
    >
      <StatCard icon="🔖" value={total}     label="Total Links" delay={0.10} />
      <StatCard icon="📅" value={thisWeek}  label="This Week"   delay={0.16} />
      <StatCard icon="❤️" value={favorites} label="Favourites"  delay={0.22} />
      <StatCard icon="🌐" value={domains}   label="Domains"     delay={0.28} />
    </div>
  );
}
