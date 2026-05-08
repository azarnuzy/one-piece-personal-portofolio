import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GoldPanelCardProps extends Omit<HTMLMotionProps<"section">, "children"> {
  children: ReactNode;
  /** Render decorative ornament corners (default: true). */
  ornaments?: boolean;
  /** Ambient radial glow accent in the top-right (default: true). */
  glow?: boolean;
  /** Inner padding preset. */
  padding?: "sm" | "md" | "lg";
  /** Disable the hover lift / glow intensify (e.g. for non-interactive shells). */
  static?: boolean;
}

const PADDING: Record<NonNullable<GoldPanelCardProps["padding"]>, string> = {
  sm: "p-4 md:p-5",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

/**
 * Reusable cinematic panel — dark navy gradient + gold border + glassmorphism +
 * decorative fantasy corners + radial glow. Ship-plank-with-brass-trim feel.
 */
export function GoldPanelCard({
  children,
  className,
  ornaments = true,
  glow = true,
  padding = "md",
  static: isStatic = false,
  ...rest
}: GoldPanelCardProps) {
  return (
    <motion.section
      whileHover={
        isStatic
          ? undefined
          : {
              y: -3,
              transition: { type: "spring", stiffness: 220, damping: 24 },
            }
      }
      className={cn(
        "group surface-card-treasure relative overflow-hidden",
        PADDING[padding],
        className,
      )}
      {...rest}
    >
      {/* Faint ocean texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='o'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23o)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Radial gold glow highlight (top-right) */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background:
              "radial-gradient(circle, oklch(from var(--brand-treasure) l c h / 0.35), transparent 70%)",
          }}
        />
      )}

      {/* Decorative fantasy corners */}
      {ornaments && (
        <>
          <CornerOrnament className="top-2 left-2" rotate={0} />
          <CornerOrnament className="top-2 right-2" rotate={90} />
          <CornerOrnament className="right-2 bottom-2" rotate={180} />
          <CornerOrnament className="bottom-2 left-2" rotate={270} />
        </>
      )}

      <div className="relative">{children}</div>
    </motion.section>
  );
}

function CornerOrnament({ className, rotate }: { className?: string; rotate: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="14"
      height="14"
      className={cn("pointer-events-none absolute text-brand-treasure/40", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M2 2 L10 2 M2 2 L2 10 M2 2 L8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="2" cy="2" r="1.2" fill="currentColor" />
    </svg>
  );
}
