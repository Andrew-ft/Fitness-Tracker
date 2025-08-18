import { type LucideIcon } from "lucide-react";

export function GradientLucideIcon({
  icon: IconComponent,
  size = 24,
  className = "",
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
}) {
  return (
    <IconComponent
      className={className}
      size={size}
      stroke="url(#gradient)"
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9333ea" />   {/* purple */}
          <stop offset="50%" stopColor="#ec4899" /> {/* pink */}
          <stop offset="100%" stopColor="#f97316" /> {/* orange */}
        </linearGradient>
      </defs>
    </IconComponent>
  );
}
