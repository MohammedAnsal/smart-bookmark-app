"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { signOut } from "@/lib/services/authService";
import { useRouter } from "next/navigation";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import type { User } from "@supabase/supabase-js";

interface DashboardHeaderProps {
  user: User;
  bookmarkCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function DashboardHeader({
  user,
  bookmarkCount,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  // Reset avatar error when user changes
  useEffect(() => {
    setAvatarError(false);
  }, [user.id]);

  const handleLogout = async () => {
    setSigningOut(true);
    await signOut();
    toast.success("Signed out successfully");
    router.replace("/");
  };

  const avatarLetter = (
    user.user_metadata?.full_name ||
    user.email ||
    "U"
  )[0].toUpperCase();
  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  
  // Get avatar URL from Google OAuth - check multiple possible locations
  const avatarUrl = 
    user.user_metadata?.avatar_url || 
    user.user_metadata?.picture ||
    user.user_metadata?.avatar ||
    (user.identities && user.identities[0]?.identity_data?.avatar_url) ||
    (user.identities && user.identities[0]?.identity_data?.picture);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.98)" : "#ffffff",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(34,197,94,0.18)" : "rgba(34,197,94,0.10)"}`,
        boxShadow: scrolled
          ? "0 2px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(34,197,94,0.06)"
          : "none",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* ── Logo ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
            marginRight: 4,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: -6 }}
            transition={{ type: "spring", stiffness: 440, damping: 17 }}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(145deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 10px rgba(34,197,94,0.3)",
              flexShrink: 0,
            }}
          >
            <BookmarkIcon size={18} color="#ffffff" />
          </motion.div>
          <span
            className="hidden sm:block"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "-0.02em",
              color: "#0a0f0d",
              whiteSpace: "nowrap",
            }}
          >
            Smart<span style={{ color: "#22c55e" }}>Marks</span>
          </span>
        </div>

        {/* ── Search (desktop) ── */}
        <div
          className="hidden md:block"
          style={{ flex: 1, maxWidth: 440, margin: "0 auto" }}
        >
          <motion.div
            animate={{ scale: focused ? 1.012 : 1 }}
            transition={{ duration: 0.18 }}
            style={{ position: "relative" }}
          >
            <span
              style={{
                position: "absolute",
                left: 13,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: focused ? "#22c55e" : "#94a3b8",
                transition: "color 0.2s",
                display: "flex",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search bookmarks, tags, URLs…"
              style={{
                width: "100%",
                height: 38,
                paddingLeft: 40,
                paddingRight: 36,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 400,
                color: "#0f172a",
                background: focused ? "#fff" : "#f8fafc",
                border: `1.5px solid ${focused ? "#22c55e" : "#e2e8f0"}`,
                borderRadius: 10,
                outline: "none",
                boxShadow: focused ? "0 0 0 3px rgba(34,197,94,0.10)" : "none",
                transition: "all 0.22s ease",
                boxSizing: "border-box",
              }}
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => onSearchChange("")}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "30%",
                  transform: "translateY(-50%)",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#e2e8f0",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  flexShrink: 0,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* ── Right: Avatar + Dropdown ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            marginLeft: "auto",
          }}
        >
          <div style={{ position: "relative" }}>
            <motion.button
              onClick={() => setDropdownOpen((o) => !o)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px 4px 4px",
                borderRadius: 40,
                transition: "background 0.18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Profile image or letter fallback */}
              {avatarUrl && !avatarError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={displayName}
                  onError={() => setAvatarError(true)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: dropdownOpen
                      ? "2px solid rgba(34,197,94,0.5)"
                      : "2px solid rgba(34,197,94,0.20)",
                    boxShadow: dropdownOpen
                      ? "0 0 0 3px rgba(34,197,94,0.18)"
                      : "0 2px 8px rgba(34,197,94,0.18)",
                    flexShrink: 0,
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    border: dropdownOpen ? "2px solid rgba(34,197,94,0.4)" : "2px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 14,
                    color: "#fff",
                    boxShadow: dropdownOpen
                      ? "0 0 0 3px rgba(34,197,94,0.20), 0 4px 14px rgba(34,197,94,0.28)"
                      : "0 2px 10px rgba(34,197,94,0.22)",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                    flexShrink: 0,
                    userSelect: "none",
                  }}
                >
                  {avatarLetter}
                </div>
              )}
              {/* Display name — hidden on very small screens */}
              <span
                className="hidden sm:block"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#0a0f0d",
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {displayName}
              </span>
              {/* Chevron */}
              <svg
                className="hidden sm:block"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  color: "#94a3b8",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>

            {/* Dropdown */}
            <motion.div
              initial={false}
              animate={
                dropdownOpen
                  ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const }
                  : { opacity: 0, y: -8, scale: 0.95, pointerEvents: "none" as const }
              }
              transition={{ duration: 0.22, ease }}
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 10px)",
                width: 220,
                background: "#fff",
                borderRadius: 16,
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.05)",
                overflow: "hidden",
                transformOrigin: "top right",
                zIndex: 100,
              }}
            >
              {/* User info */}
              <div
                style={{
                  padding: "14px 16px 12px",
                  borderBottom: "1px solid #f1f5f9",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {avatarUrl && !avatarError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      objectFit: "cover",
                      border: "1.5px solid rgba(34,197,94,0.25)",
                      flexShrink: 0,
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 13,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {avatarLetter}
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#0f172a",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {displayName}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: "#94a3b8",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Stats pill */}
              <div
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#64748b",
                  }}
                >
                  {bookmarkCount} bookmark{bookmarkCount !== 1 ? "s" : ""} saved
                </span>
              </div>

              {/* Sign out */}
              <div style={{ padding: "6px 8px" }}>
                <motion.button
                  type="button"
                  onClick={handleLogout}
                  disabled={signingOut}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "none",
                    background: "transparent",
                    color: "#ef4444",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: signingOut ? "not-allowed" : "pointer",
                    opacity: signingOut ? 0.6 : 1,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#fff1f2";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {signingOut ? (
                    <motion.span
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: "50%",
                        border: "2px solid rgba(239,68,68,0.25)",
                        borderTopColor: "#ef4444",
                        display: "block",
                        flexShrink: 0,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, ease: "linear", repeat: Infinity }}
                    />
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ flexShrink: 0 }}
                    >
                      <path
                        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {signingOut ? "Signing out…" : "Sign out"}
                </motion.button>
              </div>
            </motion.div>

            {/* Click-away overlay */}
            {dropdownOpen && (
              <div
                style={{ position: "fixed", inset: 0, zIndex: 99 }}
                onClick={() => setDropdownOpen(false)}
                aria-hidden
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile search bar ── */}
      <div
        className="md:hidden"
        style={{
          padding: "0 16px 12px",
          borderTop: "1px solid rgba(34,197,94,0.08)",
        }}
      >
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#94a3b8",
              display: "flex",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search bookmarks…"
            style={{
              width: "100%",
              height: 38,
              paddingLeft: 36,
              paddingRight: 34,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#0f172a",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              borderRadius: 10,
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#22c55e";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.10)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#e2e8f0",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                flexShrink: 0,
              }}
            >
              <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}