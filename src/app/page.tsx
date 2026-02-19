"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import LeftPanel from "@/components/landing/LeftPanel";
import RightPanel from "@/components/landing/RightPanel";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getSession } from "@/lib/services/authService";

export default function HomePage() {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/dashboard");
      } else {
        setSessionChecked(true);
      }
    });
  }, [router]);

  // Show spinner while we verify the session
  if (!sessionChecked) {
    return <LoadingSpinner message="Loading…" />;
  }

  return (
    <motion.div
      className="
        max-[900px]:h-auto!
        max-[900px]:min-h-screen!
        max-[900px]:overflow-y-auto!
        max-[900px]:overflow-x-hidden!
      "
      style={{ background: "#ffffff", height: "100vh", overflow: "hidden" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Navbar />

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
          paddingTop: 74,
        }}
        className="
          grid
          grid-cols-[1fr_1fr]
          max-[900px]:grid-cols-[1fr]!
        "
      >
        <LeftPanel />
        <RightPanel />
      </main>
    </motion.div>
  );
}
