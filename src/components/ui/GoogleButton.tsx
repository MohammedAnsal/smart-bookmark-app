"use client";

import { motion } from "framer-motion";
import GoogleIcon from "@/components/icons/GoogleIcon";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface GoogleButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export default function GoogleButton({ onClick, isLoading = false }: GoogleButtonProps) {
  return (
    <motion.button
      onClick={!isLoading ? onClick : undefined}
      disabled={isLoading}
      className="
        relative flex items-center gap-3 cursor-pointer overflow-hidden
        max-[900px]:w-full! max-[900px]:justify-center!
        disabled:cursor-not-allowed disabled:opacity-80
      "
      style={{
        padding: "0 22px",
        height: 48,
        borderRadius: 13,
        background: "#0a0f0d",
        color: "#ffffff",
        fontFamily: "'Syne', sans-serif",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.01em",
        border: "none",
        boxShadow: "0 3px 16px rgba(10,15,13,0.20)",
        width: "fit-content",
      }}
      whileHover={!isLoading ? {
        y: -2,
        scale: 1.02,
        boxShadow: "0 8px 28px rgba(10,15,13,0.28)",
      } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      aria-label="Continue with Google"
    >
      {/* Shimmer overlay on hover */}
      <motion.div
        className="absolute inset-0 rounded-[13px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,197,94,0.18) 0%, transparent 60%)",
          opacity: 0,
        }}
        whileHover={!isLoading ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      />

      {isLoading ? (
        /* Inline mini spinner while auth is in progress */
        <div className="flex items-center gap-3 relative z-10">
          <motion.div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.25)",
              borderTopColor: "#33C35C",
              flexShrink: 0,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
          />
          <span>Signing in…</span>
        </div>
      ) : (
        <>
          {/* Google icon in white circle */}
          <div
            className="flex items-center justify-center rounded-[7px] shrink-0 relative z-10"
            style={{ width: 26, height: 26 }}
          >
            <GoogleIcon size={15} />
          </div>

          {/* Divider */}
          <div
            className="relative z-10"
            style={{
              width: 1,
              height: 16,
              background: "rgba(255,255,255,0.2)",
              flexShrink: 0,
            }}
          />

          <span className="relative z-10">Continue with Google</span>
        </>
      )}
    </motion.button>
  );
}
