"use client";

import { useRef } from "react";
import BookmarkMockup from "@/components/landing/BookmarkMockup";
import FeaturePills from "@/components/ui/FeaturePills";

export default function RightPanel() {
  const mockupRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    if (mockupRef.current) {
      mockupRef.current.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateZ(4px)`;
      mockupRef.current.style.transition = "transform 0.1s ease";
    }
  }

  function handleMouseLeave() {
    if (mockupRef.current) {
      mockupRef.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      mockupRef.current.style.transition = "transform 0.6s ease";
    }
  }

  return (
    <div
      className="
        relative flex flex-col items-center justify-center overflow-hidden
        max-[900px]:border-l-0!
        max-[900px]:border-t!
        max-[900px]:border-[rgba(34,197,94,0.15)]!
        max-[900px]:px-6!
        max-[900px]:py-12!
        max-[480px]:px-4!
        max-[480px]:py-10!
      "
      style={{
        background: "#f8fdf9",
        borderLeft: "1px solid rgba(34,197,94,0.15)",
        padding: "80px 48px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative corner glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -120,
          right: -120,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -100,
          left: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Rotating rings (hidden on mobile via inline media) */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          borderRadius: "50%",
          border: "1px solid rgba(34,197,94,0.12)",
          animation: "rotateSlow 60s linear infinite",
        }}
      />
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          width: 360,
          height: 360,
          top: "50%",
          left: "50%",
          borderRadius: "50%",
          border: "1px dashed rgba(34,197,94,0.1)",
          animation: "rotateSlow 40s linear reverse infinite",
        }}
      />

      {/* Floating dots */}
      {[
        {
          top: "22%",
          left: "18%",
          size: 5,
          delay: "0s",
          dur: "5s",
          opacity: 0.5,
        },
        {
          top: "72%",
          right: "14%",
          size: 4,
          delay: "1.5s",
          dur: "7s",
          opacity: 0.4,
        },
        {
          top: "40%",
          right: "12%",
          size: 7,
          delay: "3s",
          dur: "6s",
          opacity: 0.3,
        },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            ...(dot.left ? { left: dot.left } : {}),
            ...("right" in dot ? { right: dot.right } : {}),
            background: "#22c55e",
            opacity: dot.opacity,
            animation: `floatDot ${dot.dur} ease-in-out ${dot.delay} infinite`,
          }}
        />
      ))}

      {/* Mockup with parallax wrapper */}
      <div
        ref={mockupRef}
        className="
          relative z-2 w-full
          max-[900px]:max-w-[320px]!
          max-[480px]:max-w-70!
        "
        style={{ maxWidth: 360 }}
      >
        <BookmarkMockup />
      </div>

      {/* Feature pills */}
      <FeaturePills />
    </div>
  );
}
