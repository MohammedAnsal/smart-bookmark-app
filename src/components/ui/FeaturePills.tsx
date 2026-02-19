"use client";

import { motion } from "framer-motion";
import { FEATURE_PILLS } from "@/lib/constants";

export default function FeaturePills() {
  return (
    <motion.div
      className="flex gap-2 flex-wrap justify-center"
      style={{ marginTop: 36 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {FEATURE_PILLS.map((label) => (
        <motion.div
          key={label}
          className="flex items-center gap-1.5 cursor-default"
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            fontSize: "0.76rem",
            fontWeight: 500,
            border: "1px solid rgba(34,197,94,0.15)",
            background: "#ffffff",
            color: "#1a2e1f",
          }}
          whileHover={{
            borderColor: "rgba(34,197,94,0.4)",
            background: "#f0fdf4",
          }}
          transition={{ duration: 0.2 }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          {label}
        </motion.div>
      ))}
    </motion.div>
  );
}
