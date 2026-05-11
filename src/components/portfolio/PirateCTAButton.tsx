import { type ReactNode, MouseEvent } from "react";

import { cn } from "@/lib/utils";

interface PirateCTAButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function PirateCTAButton({
  children,
  icon,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}: PirateCTAButtonProps) {
  const isPrimary = variant === "primary";

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const borderMaskStyle = {
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden rounded-[14px] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        isPrimary
          ? "bg-btn-pirate-bg-primary shadow-[var(--shadow-btn-treasure)] hover:shadow-[var(--shadow-btn-treasure-hover)]"
          : "bg-btn-pirate-bg-secondary shadow-[var(--shadow-btn-treasure-secondary)] hover:shadow-[var(--shadow-btn-treasure-secondary-hover)]",
        disabled &&
          "cursor-not-allowed opacity-60 hover:translate-y-0 active:translate-y-0 active:scale-100",
        className,
      )}
    >
      {/* Default border */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 rounded-[14px] p-[2px] transition-opacity duration-300 group-hover:opacity-0",
          isPrimary
            ? "bg-gradient-to-r from-brand-treasure/70 via-brand-sun/90 to-brand-treasure/70"
            : "bg-gradient-to-r from-brand-treasure/30 via-brand-sun/50 to-brand-treasure/30",
        )}
        style={borderMaskStyle}
      />

      {/* Hover cursor following border */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[14px] p-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(80px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
            isPrimary
              ? "#FDE047, #CA8A04, transparent 100%"
              : "rgba(234, 179, 8, 0.8), rgba(139, 107, 34, 0.5), transparent 100%"
          })`,
          ...borderMaskStyle,
        }}
      />

      {/* Ambient glow — fades in on hover */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100",
          isPrimary ? "bg-brand-sun/10" : "bg-brand-treasure/5",
        )}
      />

      {/* Subtle inner top highlight */}
      <div className="pointer-events-none absolute inset-[2px] z-0 rounded-[12px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />

      {/* Content wrapper */}
      <div className="relative z-20 flex items-center gap-2 px-4 py-2">
        {icon != null && (
          <div
            className={cn(
              "rounded-full p-1",
              isPrimary
                ? "bg-brand-sun/10 text-brand-sun"
                : "bg-foreground/5 text-brand-treasure/90",
            )}
          >
            {icon}
          </div>
        )}

        <span
          className={cn(
            "font-display text-[13px] font-semibold tracking-wide",
            isPrimary
              ? "bg-gradient-to-b from-brand-treasure to-brand-sun bg-clip-text text-transparent"
              : "text-brand-treasure/90",
          )}
        >
          {children}
        </span>
      </div>
    </button>
  );
}
