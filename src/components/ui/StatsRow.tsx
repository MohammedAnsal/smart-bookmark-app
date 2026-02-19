"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

export default function StatsRow() {
  return (
    <motion.div
      className="
        flex items-center gap-6
        max-[900px]:flex-wrap
        max-[900px]:gap-4
        max-[900px]:justify-center!
        max-[900px]:w-full!
      "
      style={{
        marginTop: 40,
        paddingTop: 32,
        borderTop: "1px solid rgba(34,197,94,0.15)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-4 sm:gap-6">
          {/* Stat block */}
          <div className="flex flex-col gap-0.5">
            <span
              className="max-[480px]:text-[1.1rem]!"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: "#0a0f0d",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontSize: "1.3rem",
              }}
            >
              {/* Pull the last char as green accent */}
              {stat.value.slice(0, -1)}
              <span style={{ color: "#22c55e" }}>{stat.value.slice(-1)}</span>
            </span>
            <span
              className="max-[480px]:text-[0.64rem]!"
              style={{
                fontSize: "0.68rem",
                color: "#4b5e52",
                letterSpacing: "0.02em",
              }}
            >
              {stat.label}
            </span>
          </div>

          {/* Separator (not after last) */}
          {i < STATS.length - 1 && (
            <div
              style={{
                width: 1,
                height: 32,
                background: "rgba(34,197,94,0.15)",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
