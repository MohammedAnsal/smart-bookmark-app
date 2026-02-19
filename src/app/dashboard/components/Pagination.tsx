"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PaginationProps {
  totalItems: number;
  visibleCount: number;
  onLoadMore: () => void;
}

export default function Pagination({
  totalItems,
  visibleCount,
  onLoadMore,
}: PaginationProps) {
  const remaining = totalItems - visibleCount;

  return (
    <AnimatePresence>
      {visibleCount < totalItems && (
        <motion.div
          key="load-more"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "flex", justifyContent: "center", marginTop: 28 }}
        >
          <motion.button
            onClick={onLoadMore}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            style={{
              height: 42,
              padding: "0 28px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1.5px solid rgba(34,197,94,0.28)",
              borderRadius: 12,
              color: "#16a34a",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(34,197,94,0.08)",
              transition: "box-shadow 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 4px 16px rgba(34,197,94,0.18)";
              el.style.borderColor = "rgba(34,197,94,0.50)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 2px 8px rgba(34,197,94,0.08)";
              el.style.borderColor = "rgba(34,197,94,0.28)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            Load More
            <span
              style={{
                background: "#f0fdf4",
                color: "#16a34a",
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 99,
                border: "1px solid rgba(34,197,94,0.20)",
              }}
            >
              {remaining} more
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
