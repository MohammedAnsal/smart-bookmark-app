

export const BOOKMARK_ITEMS = [
  {
    id: 1,
    emoji: "🎨",
    bgColor: "#eff6ff",
    name: "Figma — Design Tool",
    url: "figma.com/file/dashboard",
    tag: "Design",
    tagBg: "#eff6ff",
    tagColor: "#3b82f6",
  },
  {
    id: 2,
    emoji: "📚",
    bgColor: "#f0fdf4",
    name: "MDN Web Docs",
    url: "developer.mozilla.org",
    tag: "Dev",
    tagBg: "#f0fdf4",
    tagColor: "#16a34a",
  },
  {
    id: 3,
    emoji: "⚡",
    bgColor: "#fefce8",
    name: "Vercel Dashboard",
    url: "vercel.com/dashboard",
    tag: "Deploy",
    tagBg: "#0a0f0d",
    tagColor: "#ffffff",
  },
  {
    id: 4,
    emoji: "🤖",
    bgColor: "#fdf4ff",
    name: "Claude AI",
    url: "claude.ai/chat",
    tag: "AI",
    tagBg: "#fdf4ff",
    tagColor: "#a855f7",
  },
] as const;

export const STATS = [
  { value: "12k+", label: "Links saved" },
  { value: "99%",  label: "Uptime" },
  { value: "<1s",  label: "Sync speed" },
] as const;

export const FEATURE_PILLS = [
  "Real-time sync",
  "One-click save",
  "Smart search",
  "Auto-tag",
] as const;

export const AVATARS = [
  { 
    initial: "A", 
    gradient: "linear-gradient(135deg,#22c55e,#16a34a)",
    src: "/images/avatar-1.jpg",
    alt: "SmartBookmark user A"
  },
  { 
    initial: "J", 
    gradient: "linear-gradient(135deg,#3b82f6,#2563eb)",
    src: "/images/avatar-2.jpg",
    alt: "SmartBookmark user J"
  },
  { 
    initial: "M", 
    gradient: "linear-gradient(135deg,#f97316,#ea580c)",
    src: "/images/avatar-3.jpg",
    alt: "SmartBookmark user M"
  },

] as const;