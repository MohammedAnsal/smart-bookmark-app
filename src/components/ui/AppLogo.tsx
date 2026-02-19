"use client";

import { motion } from "framer-motion";
import BookmarkIcon from "@/components/icons/BookmarkIcon";

export default function AppLogo() {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Icon container */}
      <motion.div
        className="relative flex items-center justify-center w-10 h-10 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,166,35,0.2) 0%, rgba(245,166,35,0.08) 100%)",
          border: "1px solid rgba(245,166,35,0.3)",
          boxShadow:
            "0 0 20px rgba(245,166,35,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <BookmarkIcon className="w-5 h-5 text-amber-400" />
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-amber-400/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* App name */}
      <span
        className="text-lg font-semibold tracking-tight"
        style={{
          fontFamily: "var(--font-dm-mono)",
          color: "rgba(240,238,232,0.95)",
          letterSpacing: "-0.01em",
        }}
      >
        Smart<span className="text-amber-400">Bookmark</span>
      </span>
    </motion.div>
  );
}
