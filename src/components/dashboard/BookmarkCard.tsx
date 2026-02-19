"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Bookmark } from "@/lib/services/bookmarkService";
import { getDomain, getFaviconUrl } from "@/lib/utils/getDomain";
import { formatDate } from "@/lib/utils/formatDate";

interface BookmarkCardProps {
  bookmark: Bookmark;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}


/* ── Heart icon ──────────────────────────── */
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#22c55e" : "none"}
      stroke={filled ? "#22c55e" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ── Edit icon ──────────────────────────── */
function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Trash icon ─────────────────────────── */
function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline
        points="3 6 5 6 21 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11v6M14 11v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BookmarkCard({
  bookmark,
  isDeleting,
  onEdit,
  onDelete,
  onToggleFavorite,
}: BookmarkCardProps) {
  const href = bookmark.url.startsWith("http")
    ? bookmark.url
    : `https://${bookmark.url}`;
  const domain = getDomain(bookmark.url);
  const isFav = bookmark.is_favorite ?? false;
  const [heartPulse, setHeartPulse] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartPulse(true);
    setTimeout(() => setHeartPulse(false), 350);
    onToggleFavorite();
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{
        opacity: isDeleting ? 0.4 : 1,
        y: 0,
        scale: isDeleting ? 0.99 : 1,
        filter: isDeleting ? "blur(0.5px)" : "none",
      }}
      exit={{
        opacity: 0,
        x: -24,
        scale: 0.95,
        transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
      style={{
        position: "relative",
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
        background: isFav ? "linear-gradient(to right, #f0fdf4, #fff)" : "#fff",
        border: isFav
          ? "1px solid rgba(34,197,94,0.28)"
          : "1px solid rgba(34,197,94,0.12)",
        borderRadius: 16,
        boxShadow: isFav
          ? "0 2px 10px rgba(34,197,94,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        overflow: "hidden",
        transition:
          "box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease",
        cursor: "default",
        userSelect: "none",
      }}
      whileHover={{ y: -2 }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow =
          "0 6px 28px rgba(34,197,94,0.11), 0 2px 8px rgba(0,0,0,0.04)";
        el.style.borderColor = "rgba(34,197,94,0.32)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = isFav
          ? "0 2px 10px rgba(34,197,94,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04)";
        el.style.borderColor = isFav
          ? "rgba(34,197,94,0.28)"
          : "rgba(34,197,94,0.12)";
      }}
    >
      {/* Left green accent strip — fav or hover */}
      <div
        className={isFav ? "opacity-100" : "group-hover:opacity-100"}
        style={{
          position: "absolute",
          left: 0,
          top: 8,
          bottom: 8,
          width: 3,
          borderRadius: "0 3px 3px 0",
          background: "linear-gradient(to bottom, #22c55e, #16a34a)",
          opacity: isFav ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Favicon bubble */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          flexShrink: 0,
          background: "#f0fdf4",
          border: "1px solid rgba(34,197,94,0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFaviconUrl(bookmark.url)}
          alt=""
          width={20}
          height={20}
          style={{ objectFit: "contain" }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            const p = img.parentElement;
            if (p && !p.querySelector(".ff")) {
              const s = document.createElement("span");
              s.className = "ff";
              s.textContent = domain[0]?.toUpperCase() ?? "?";
              s.style.cssText = "font:700 15px 'Syne',sans-serif;color:#16a34a;";
              p.appendChild(s);
            }
          }}
        />
      </div>

      {/* Title + domain row */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          className="group-hover:text-[#16a34a]"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#0a0f0d",
            margin: 0,
            letterSpacing: "-0.01em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            transition: "color 0.18s",
          }}
        >
          {bookmark.title}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 3,
          }}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#9aab9f",
              textDecoration: "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "22ch",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#22c55e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#9aab9f";
            }}
          >
            {domain}
          </a>
          {bookmark.created_at && (
            <>
              <span style={{ color: "#e2e8f0", fontSize: 8, lineHeight: 1 }}>●</span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#cbd5e1",
                }}
              >
                {formatDate(bookmark.created_at)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Tag */}
      {bookmark.tag && (
        <span
          className="hidden md:inline-flex"
          style={{
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            padding: "4px 10px",
            borderRadius: 8,
            background: "#f0fdf4",
            color: "#16a34a",
            border: "1px solid rgba(34,197,94,0.20)",
            whiteSpace: "nowrap",
          }}
        >
          {bookmark.emoji && <span>{bookmark.emoji}</span>}
          {bookmark.tag}
        </span>
      )}

      {/* ── Action buttons ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          flexShrink: 0,
        }}
      >
        {/* Favourite heart */}
        <AnimatePresence mode="wait">
          <motion.button
            key={isFav ? "filled" : "empty"}
            onClick={handleToggleFavorite}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            animate={heartPulse ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={{
              duration: heartPulse ? 0.35 : 0.2,
              type: heartPulse ? "tween" : "spring",
              stiffness: 520,
              damping: 22,
            }}
            aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            title={isFav ? "Remove from favourites" : "Add to favourites"}
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              border: isFav
                ? "1.5px solid rgba(34,197,94,0.35)"
                : "1.5px solid rgba(34,197,94,0.15)",
              background: isFav ? "#f0fdf4" : "transparent",
              color: isFav ? "#22c55e" : "#c4cfd4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#f0fdf4";
              el.style.borderColor = "rgba(34,197,94,0.35)";
              el.style.color = "#22c55e";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = isFav ? "#f0fdf4" : "transparent";
              el.style.borderColor = isFav
                ? "rgba(34,197,94,0.35)"
                : "rgba(34,197,94,0.15)";
              el.style.color = isFav ? "#22c55e" : "#c4cfd4";
            }}
          >
            <HeartIcon filled={isFav} />
          </motion.button>
        </AnimatePresence>

        {/* Edit */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          whileHover={{ scale: 1.13, y: -1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 520, damping: 22 }}
          aria-label="Edit bookmark"
          title="Edit"
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            border: "1.5px solid rgba(34,197,94,0.25)",
            background: "#f0fdf4",
            color: "#16a34a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#dcfce7";
            el.style.borderColor = "rgba(34,197,94,0.48)";
            el.style.boxShadow = "0 2px 10px rgba(34,197,94,0.20)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#f0fdf4";
            el.style.borderColor = "rgba(34,197,94,0.25)";
            el.style.boxShadow = "none";
          }}
        >
          <EditIcon />
        </motion.button>

        {/* Delete */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={isDeleting}
          whileHover={{ scale: 1.13, y: -1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 520, damping: 22 }}
          aria-label="Delete bookmark"
          title="Delete"
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            border: "1.5px solid rgba(239,68,68,0.22)",
            background: "#fff5f5",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDeleting ? "not-allowed" : "pointer",
            transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            if (isDeleting) return;
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#fee2e2";
            el.style.borderColor = "rgba(239,68,68,0.42)";
            el.style.boxShadow = "0 2px 10px rgba(239,68,68,0.18)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#fff5f5";
            el.style.borderColor = "rgba(239,68,68,0.22)";
            el.style.boxShadow = "none";
          }}
        >
          {isDeleting ? (
            <motion.span
              style={{
                display: "block",
                width: 12,
                height: 12,
                borderRadius: "50%",
                border: "2px solid rgba(239,68,68,0.25)",
                borderTopColor: "#ef4444",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.65, ease: "linear", repeat: Infinity }}
            />
          ) : (
            <TrashIcon />
          )}
        </motion.button>
      </div>
    </motion.li>
  );
}