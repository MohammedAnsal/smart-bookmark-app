"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  icon: string;
  value: number;
  label: string;
  delay: number;
}

export default function StatCard({ icon, value, label, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      style={{
        background: "#fff",
        border: "1px solid rgba(34,197,94,0.12)",
        borderRadius: 18,
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        cursor: "default",
        transition: "box-shadow 0.22s ease, border-color 0.22s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 8px 28px rgba(34,197,94,0.11)";
        el.style.borderColor = "rgba(34,197,94,0.30)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        el.style.borderColor = "rgba(34,197,94,0.12)";
      }}
    >
      {/* corner accent */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(34,197,94,0.10) 0%,transparent 70%)",
        }}
      />
      {/* bottom line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg,#22c55e,transparent)",
          opacity: 0.45,
        }}
      />

      <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
      <div
        style={{
          fontWeight: 600,
          fontSize: 28,
          color: "#0a0f0d",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 12,
          color: "#9aab9f",
          marginTop: 4,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
