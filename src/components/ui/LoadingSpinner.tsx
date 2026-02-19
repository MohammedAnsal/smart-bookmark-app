// "use client";

// import { motion } from "framer-motion";

// interface LoadingSpinnerProps {
//   message?: string;
//   fullScreen?: boolean;
// }

// const ease = [0.25, 0.1, 0.25, 1] as const;

// export default function LoadingSpinner({
//   message,
//   fullScreen = true,
// }: LoadingSpinnerProps) {
//   const wrapper = fullScreen
//     ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
//     : "flex flex-col items-center justify-center py-16";

//   return (
//     <motion.div
//       className={wrapper}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3, ease }}
//     >
//       <div className="relative flex items-center justify-center w-16 h-16">
//         <div
//           className="absolute inset-0 rounded-full border-2"
//           style={{ borderColor: "rgba(51, 195, 92, 0.12)" }}
//         />
//         <motion.div
//           className="absolute inset-0 rounded-full border-2 border-transparent"
//           style={{
//             borderTopColor: "#33C35C",
//             borderRightColor: "rgba(51, 195, 92, 0.35)",
//           }}
//           animate={{ rotate: 360 }}
//           transition={{ duration: 0.85, ease: "linear", repeat: Infinity }}
//         />
//         <motion.div
//           className="rounded-full bg-[#33C35C]"
//           style={{ width: 10, height: 10 }}
//           animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
//           transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       {message && (
//         <motion.p
//           className="mt-5 text-sm font-medium text-[#4b5e52]"
//           style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em" }}
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.15, duration: 0.35, ease }}
//         >
//           {message}
//         </motion.p>
//       )}
//     </motion.div>
//   );
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Loading your bookmarks…",
}: LoadingSpinnerProps) {
  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Ambient radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 35% at 50% 50%, rgba(34,197,94,0.07) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Spinner */}
        <div style={{ position: "relative", width: 56, height: 56 }}>
          {/* Soft glow bg */}
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
            }}
          />
          {/* Track ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "3px solid rgba(34,197,94,0.12)",
            }}
          />
          {/* Spinning arc */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "3px solid transparent",
              borderTopColor: "#22c55e",
              borderRightColor: "rgba(34,197,94,0.28)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
          />
          {/* Pulsing center */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#22c55e",
            }}
            animate={{ scale: [1, 1.45, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        {/* Label */}
        {message && (
          <motion.p
            style={{
              marginTop: 22,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#94a3b8",
              letterSpacing: "0.01em",
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.35 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}