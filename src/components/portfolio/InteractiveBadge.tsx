import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface InteractiveBadgeProps {
  icon: LucideIcon;
  label: string;
  /** Floating animation delay in seconds (stagger). */
  delay?: number;
  className?: string;
  tone?: "treasure" | "sunset" | "info" | "success";
}

const TONE: Record<NonNullable<InteractiveBadgeProps["tone"]>, string> = {
  treasure: "text-brand-treasure border-brand-treasure/35",
  sunset: "text-brand-sunset border-brand-sunset/35",
  info: "text-brand-info border-brand-info/35",
  success: "text-brand-success border-brand-success/35",
};

export function InteractiveBadge({
  icon: Icon,
  label,
  delay = 0,
  className,
  tone = "treasure",
}: InteractiveBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: [0, -3, 0],
      }}
      transition={{
        opacity: { duration: 0.4, delay },
        y: {
          duration: 4 + delay,
          delay: 0.4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.05, rotate: -1.5 }}
      className={cn(
        "group relative inline-flex cursor-default items-center gap-1.5 rounded-pill border bg-card/70 px-3 py-1.5 font-sans text-xs font-medium backdrop-blur-md transition-all duration-300",
        TONE[tone],
        className,
      )}
      style={{
        boxShadow: "0 4px 16px -6px oklch(0 0 0 / 0.3)",
      }}
    >
      {/* Breathing glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-pill opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "oklch(from var(--brand-treasure) l c h / 0.25)",
        }}
      />
      <Icon size={12} className="shrink-0" />
      <span className="text-foreground/90">{label}</span>
    </motion.span>
  );
}
