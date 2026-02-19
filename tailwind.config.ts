import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        amber: {
          400: "#f5a623",
          300: "#f0c060",
          500: "#e8994a",
        },
        navy: {
          900: "#080C14",
          800: "#0e1520",
          700: "#162032",
        },
      },
      backgroundImage: {
        "amber-gradient":
          "linear-gradient(135deg, #f5a623 0%, #f0c060 50%, #e8994a 100%)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 12s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        "amber-glow":
          "0 0 40px rgba(245, 166, 35, 0.15), 0 0 80px rgba(245, 166, 35, 0.06)",
        glass:
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
