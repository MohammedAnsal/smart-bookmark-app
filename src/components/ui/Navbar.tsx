"use client";

import { motion } from "framer-motion";
import BookmarkIcon from "@/components/icons/BookmarkIcon";

export default function Navbar() {
  return (
    <motion.nav
      className="
        fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        max-[900px]:px-6!
        max-[900px]:py-4!
        max-[480px]:px-4!
      "
      style={{
        padding: "20px 48px",
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(34,197,94,0.1)",
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Logo */}
      <a
        href="#"
        className="flex items-center gap-2.5 no-underline"
        aria-label="SmartBookmark home"
      >
        <div
          className="flex items-center justify-center rounded-[10px]"
          style={{
            width: 34,
            height: 34,
            background: "linear-gradient(145deg, #22c55e, #16a34a)",
            boxShadow: "0 3px 10px rgba(34,197,94,0.3)",
            flexShrink: 0,
          }}
        >
          <BookmarkIcon size={18} color="#ffffff" />
        </div>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "-0.02em",
            color: "#0a0f0d",
          }}
        >
          Smart<span style={{ color: "#22c55e" }}>Marks</span>
        </span>
      </a>

      {/* Badge */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 500,
          color: "#16a34a",
          background: "#dcfce7",
          border: "1px solid rgba(34,197,94,0.25)",
          padding: "4px 12px",
          borderRadius: 999,
          letterSpacing: "0.01em",
        }}
      >
        Free to use
      </span>
    </motion.nav>
  );
}
