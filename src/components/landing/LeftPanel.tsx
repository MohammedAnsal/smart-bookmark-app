"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { signInWithGoogle } from "@/lib/services/authService";
import GoogleButton from "@/components/ui/GoogleButton";
import SocialProof from "@/components/ui/SocialProof";
import StatsRow from "@/components/ui/StatsRow";
import { FlipWords } from "@/components/ui/FlipWords";

// Shared fade-up variant factory
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  };
}

export default function LeftPanel() {
  const words = ["cleaner", "faster", "modern"];
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handleGoogleSignIn = useCallback(async () => {
    setIsAuthLoading(true);
    try {
      const error = await signInWithGoogle();
      if (error) {
        toast.error("Authentication failed");
        setIsAuthLoading(false);
      }
      // On success the browser redirects — no need to reset loading state
    } catch {
      toast.error("Authentication failed");
      setIsAuthLoading(false);
    }
  }, []);

  return (
    <div
      className="
        flex flex-col justify-center relative z-1
        max-[900px]:px-6!
        max-[900px]:py-12!
        max-[480px]:px-4!
        max-[480px]:py-10!
      "
      style={{ padding: "60px 48px 60px 64px" }}
    >
      {/* Eyebrow */}
      <motion.div
        className="flex items-center gap-2"
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#16a34a",
          marginBottom: 28,
        }}
        {...fadeUp(0.15)}
      >
        <div
          style={{
            width: 24,
            height: 1.5,
            background: "#22c55e",
            flexShrink: 0,
          }}
        />
        Bookmark Manager
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="
          max-[900px]:text-[clamp(2.6rem,6vw,4.6rem)]!
          max-[480px]:text-[2.25rem]!
        "
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "clamp(3rem, 4.5vw, 4.6rem)",
          fontWeight: 400,
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          color: "#0a0f0d",
          marginBottom: 12,
        }}
        {...fadeUp(0.25)}
      >
        Save smarter.
        <br />
        <em
          style={{
            fontStyle: "italic",
            color: "#22c55e",
            fontFamily: "'Instrument Serif', Georgia, serif",
          }}
        >
          Access{" "}
          <FlipWords
            words={words}
            className="inline-block align-baseline"
            intervalMs={2200}
          />
          .
        </em>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="max-[480px]:text-[0.95rem]!"
        style={{
          fontSize: "1.05rem",
          lineHeight: 1.72,
          color: "#4b5e52",
          maxWidth: 400,
          marginBottom: 44,
          fontWeight: 300,
        }}
        {...fadeUp(0.38)}
      >
        A private, real-time bookmark manager built for people who value{" "}
        <strong style={{ color: "#1a2e1f", fontWeight: 500 }}>clarity</strong>{" "}
        and <strong style={{ color: "#1a2e1f", fontWeight: 500 }}>speed</strong>
        . No clutter. Just your links.
      </motion.p>

      {/* CTA group */}
      <motion.div className="flex flex-col gap-4" {...fadeUp(0.5)}>
        <GoogleButton onClick={handleGoogleSignIn} isLoading={isAuthLoading} />
        <SocialProof />
      </motion.div>

      {/* Stats row */}
      <StatsRow />
    </div>
  );
}
