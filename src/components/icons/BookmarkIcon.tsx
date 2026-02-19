interface BookmarkIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function BookmarkIcon({
  size = 18,
  color = "#ffffff",
  className,
}: BookmarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 3C5 2.44772 5.44772 2 6 2H18C18.5523 2 19 2.44772 19 3V21.382C19 21.7607 18.572 21.9868 18.2764 21.7639L12 17.118L5.72361 21.7639C5.42795 21.9868 5 21.7607 5 21.382V3Z"
        fill={color}
      />
    </svg>
  );
}
