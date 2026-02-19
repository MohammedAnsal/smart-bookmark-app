"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FlipWordsProps = {
  words: string[];
  className?: string;
  intervalMs?: number;
};

export function FlipWords({
  words,
  className,
  intervalMs = 2200,
}: FlipWordsProps) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeWords.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeWords.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, safeWords.length]);

  const current = safeWords[index] ?? "";

  return (
    <span className={className} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          className="inline-block"
          initial={{ y: 14, opacity: 0, filter: "blur(3px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -14, opacity: 0, filter: "blur(3px)" }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
