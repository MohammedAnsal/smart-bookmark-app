"use client";

import { motion } from "framer-motion";

interface WelcomeStripProps {
  displayName: string;
  totalBookmarks: number;
}

export default function WelcomeStrip({ displayName, totalBookmarks }: WelcomeStripProps) {
  return (
    <motion.div
      style={{ marginBottom: 36 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{ width: 20, height: 1.5, background: "#22c55e", flexShrink: 0 }} />
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "#16a34a",
          }}
        >
          Dashboard
        </span>
      </div>

      <h1
        style={{
          fontFamily: "'Instrument Serif',Georgia,serif",
          fontWeight: 400,
          fontSize: "clamp(1.7rem,3vw,2.4rem)",
          color: "#0a0f0d",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        Good to see you,{" "}
        <em style={{ fontStyle: "italic", color: "#22c55e" }}>{displayName}</em>.
      </h1>

      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14,
          color: "#4b5e52",
          marginTop: 8,
          fontWeight: 300,
        }}
      >
        Here&apos;s your personal link collection —{" "}
        {totalBookmarks === 0
          ? "start saving links below."
          : `${totalBookmarks} link${totalBookmarks !== 1 ? "s" : ""} saved so far.`}
      </p>
    </motion.div>
  );
}
