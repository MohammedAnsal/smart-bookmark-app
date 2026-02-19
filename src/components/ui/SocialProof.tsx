import { AVATARS } from "@/lib/constants";

export default function SocialProof() {
  return (
    <div
      className="
        flex items-center gap-3
        max-[900px]:justify-center!
      "
      style={{ fontSize: "0.78rem", color: "#9aab9f" }}
    >
      {/* Stacked avatars */}
      <div className="flex">
        {AVATARS.map((av, i) => (
          <div
            key={av.initial}
            className="flex items-center justify-center rounded-full border-2 border-white overflow-hidden font-semibold"
            style={{
              width: 26,
              height: 26,
              marginLeft: i === 0 ? 0 : -8,
              flexShrink: 0,
              zIndex: AVATARS.length - i,
              position: "relative",
              background: av.gradient,
              fontSize: "0.62rem",
              color: "#ffffff",
            }}
            aria-label={av.alt}
          >
            {/* {av.initial} */}
            <img
              src={av.src}
              alt={av.alt}
              width={26}
              height={26}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>

      <span className="whitespace-nowrap max-[480px]:whitespace-normal">
        Joined by 4,200+ users this month
      </span>
    </div>
  );
}
