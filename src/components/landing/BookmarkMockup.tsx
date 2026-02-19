"use client";

import { motion } from "framer-motion";
import { BOOKMARK_ITEMS } from "@/lib/constants";
import SearchIcon from "@/components/icons/SearchIcon";

// Animate each bookmark row staggered
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.8 + i * 0.12,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function BookmarkMockup() {
  return (
    <motion.div
      className="relative w-full"
      style={{ maxWidth: 360 }}
      initial={{ opacity: 0, x: 30, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* ── Sync badge (top-right floating) ─────── */}
      <motion.div
        className="absolute flex items-center gap-1.5 z-10"
        style={{
          top: -14,
          right: 24,
          background: "#ffffff",
          border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: 999,
          padding: "6px 14px 6px 10px",
          boxShadow: "0 4px 16px rgba(34,197,94,0.16)",
          fontSize: "0.72rem",
          fontWeight: 500,
          color: "#0a0f0d",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#22c55e",
            display: "inline-block",
            flexShrink: 0,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        Syncing across 3 devices
      </motion.div>

      {/* ── Main card ───────────────────────────── */}
      <div
        className="relative z-2"
        style={{
          background: "#ffffff",
          borderRadius: 24,
          border: "1px solid rgba(34,197,94,0.14)",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.07), 0 0 0 1px rgba(255,255,255,0.8)",
          padding: 28,
        }}
      >
        {/* Card header */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 22 }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#0a0f0d",
              letterSpacing: "-0.01em",
            }}
          >
            My Bookmarks
          </span>
          {/* Traffic-light dots */}
          <div className="flex gap-1.25">
            {["#fca5a5", "#fde047", "#86efac"].map((c) => (
              <div
                key={c}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div
          className="flex items-center gap-2"
          style={{
            background: "#f8fdf9",
            border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: 10,
            padding: "8px 14px",
            marginBottom: 18,
          }}
        >
          <SearchIcon size={12} color="#9aab9f" />
          <span
            style={{ fontSize: "0.75rem", color: "#9aab9f", fontWeight: 300 }}
          >
            Search your bookmarks...
          </span>
        </div>

        {/* Bookmark items */}
        {BOOKMARK_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            className="flex items-center gap-3 rounded-xl cursor-pointer"
            style={{
              padding: 12,
              marginBottom: i < BOOKMARK_ITEMS.length - 1 ? 8 : 0,
            }}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ background: "#f0fdf4" }}
            transition={{ duration: 0.2 }}
          >
            {/* Favicon */}
            <div
              className="flex items-center justify-center rounded-[10px] shrink-0"
              style={{
                width: 34,
                height: 34,
                background: item.bgColor,
                fontSize: "0.9rem",
              }}
              aria-hidden="true"
            >
              {item.emoji}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#0a0f0d",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: 2,
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#9aab9f",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.url}
              </div>
            </div>

            {/* Tag */}
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: 6,
                background: item.tagBg,
                color: item.tagColor,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {item.tag}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── "3 links added today" badge (bottom-left) ── */}
      <motion.div
        className="absolute flex items-center gap-1.5 z-10"
        style={{
          bottom: -12,
          left: 28,
          background: "#22c55e",
          borderRadius: 999,
          padding: "6px 14px",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "#ffffff",
          boxShadow: "0 4px 16px rgba(34,197,94,0.35)",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.35 }}
      >
        ✦ 4 links added today
      </motion.div>
    </motion.div>
  );
}
