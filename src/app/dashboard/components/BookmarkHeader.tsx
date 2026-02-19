"use client";

import { motion } from "framer-motion";

type FavoriteFilter = "all" | "favorites";

interface BookmarkHeaderProps {
  searchQuery: string;
  favoriteFilter: FavoriteFilter;
  filteredCount: number;
  favoriteCount: number;
  onFilterChange: (f: FavoriteFilter) => void;
  onNewBookmark: () => void;
}

export default function BookmarkHeader({
  searchQuery,
  favoriteFilter,
  filteredCount,
  favoriteCount,
  onFilterChange,
  onNewBookmark,
}: BookmarkHeaderProps) {
  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 18,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Left: title + count */}
      <div>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#0a0f0d",
            margin: 0,
            letterSpacing: "-0.015em",
          }}
        >
          {searchQuery.trim()
            ? `Results for "${searchQuery}"`
            : favoriteFilter === "favorites"
            ? "Favourites"
            : "All Bookmarks"}
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            color: "#9aab9f",
            margin: "3px 0 0",
            fontWeight: 400,
          }}
        >
          {filteredCount} link{filteredCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Right: All/Favs pill + New Bookmark */}
      <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
        {/* All / Favourites pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "3px",
            background: "#f1f5f9",
            borderRadius: 10,
            gap: 2,
          }}
        >
          {(["all", "favorites"] as FavoriteFilter[]).map((f) => (
            <motion.button
              key={f}
              onClick={() => onFilterChange(f)}
              animate={{
                background: favoriteFilter === f ? "#fff" : "transparent",
                color: favoriteFilter === f ? "#0a0f0d" : "#64748b",
                boxShadow:
                  favoriteFilter === f
                    ? "0 1px 4px rgba(0,0,0,0.08)"
                    : "none",
              }}
              transition={{ duration: 0.2 }}
              style={{
                height: 30,
                padding: "0 12px",
                borderRadius: 7,
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                whiteSpace: "nowrap",
              }}
            >
              {f === "favorites" && (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill={favoriteFilter === "favorites" ? "#22c55e" : "none"}
                  stroke={
                    favoriteFilter === "favorites" ? "#22c55e" : "currentColor"
                  }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
              {f === "all"
                ? "All"
                : `Favs${favoriteCount > 0 ? ` (${favoriteCount})` : ""}`}
            </motion.button>
          ))}
        </div>

        {/* New Bookmark */}
        <motion.button
          onClick={onNewBookmark}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          style={{
            height: 38,
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "linear-gradient(135deg,#22c55e,#16a34a)",
            borderRadius: 11,
            border: "none",
            color: "#fff",
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            boxShadow:
              "0 4px 14px rgba(34,197,94,0.28), inset 0 1px 0 rgba(255,255,255,0.20)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
          New Bookmark
        </motion.button>
      </div>
    </motion.div>
  );
}
