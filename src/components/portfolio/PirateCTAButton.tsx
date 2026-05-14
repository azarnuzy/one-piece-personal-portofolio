import { Link } from "@tanstack/react-router";
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
  /** Internal route (TanStack Link). Mutually exclusive with `href`. */
  to?: string;
  /** External URL or file (rendered as <a>). */
  href?: string;
  /** Anchor target — defaults to "_blank" when `href` is set. */
  target?: "_blank" | "_self";
  /** Anchor download attribute — set when linking to a downloadable file. */
  download?: boolean | string;
  /** ARIA label override. */
  ariaLabel?: string;
}

export function PirateCTAButton({
  children,
  icon,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
  to,
  href,
  target,
  download,
  ariaLabel,
}: PirateCTAButtonProps) {
  const isPrimary = variant === "primary";

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
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

  const sharedClassName = cn(
    "group relative inline-flex overflow-hidden rounded-[14px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
    isPrimary
      ? "border border-border bg-secondary shadow-sm hover:bg-muted hover:shadow-md"
      : "border border-border bg-card shadow-sm hover:bg-muted hover:shadow-md",
    "dark:backdrop-blur-md",
    isPrimary
      ? "dark:border-transparent dark:bg-btn-pirate-bg-primary dark:shadow-[var(--shadow-btn-treasure)] dark:hover:bg-btn-pirate-bg-primary dark:hover:shadow-[var(--shadow-btn-treasure-hover)]"
      : "dark:border-transparent dark:bg-btn-pirate-bg-secondary dark:shadow-[var(--shadow-btn-treasure-secondary)] dark:hover:bg-btn-pirate-bg-secondary dark:hover:shadow-[var(--shadow-btn-treasure-secondary-hover)]",
    disabled &&
      "cursor-not-allowed opacity-60 hover:translate-y-0 active:translate-y-0 active:scale-100",
    className,
  );

  const inner = (
    <>
      {/* Decorative pirate-gold border — DARK MODE ONLY (hidden in light) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 hidden rounded-[14px] p-[2px] transition-opacity duration-300 group-hover:opacity-0 dark:block",
          isPrimary
            ? "bg-gradient-to-r from-brand-treasure/70 via-brand-sun/90 to-brand-treasure/70"
            : "bg-gradient-to-r from-brand-treasure/30 via-brand-sun/50 to-brand-treasure/30",
        )}
        style={borderMaskStyle}
      />

      {/* Cursor-follow gold gradient border — DARK ONLY */}
      <div
        className="pointer-events-none absolute inset-0 z-10 hidden rounded-[14px] p-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:block"
        style={{
          background: `radial-gradient(80px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
            isPrimary
              ? "oklch(0.9 0.15 95), oklch(0.7 0.14 75), transparent 100%"
              : "oklch(0.85 0.14 95 / 0.8), oklch(0.5 0.07 75 / 0.5), transparent 100%"
          })`,
          ...borderMaskStyle,
        }}
      />

      {/* Ambient amber glow on hover — DARK ONLY */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 hidden opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100 dark:block",
          isPrimary ? "bg-brand-sun/10" : "bg-brand-treasure/5",
        )}
      />

      {/* Inner top highlight — DARK ONLY (subtle depth on dark bg) */}
      <div className="pointer-events-none absolute inset-[2px] z-0 hidden rounded-[12px] bg-gradient-to-b from-white/10 via-transparent to-transparent dark:block" />

      {/* Content wrapper */}
      <div className="relative z-20 flex items-center gap-2 px-4 py-2">
        {icon != null && (
          <div
            className={cn(
              "rounded-full p-1 transition-colors",
              isPrimary ? "bg-muted text-foreground" : "bg-muted/60 text-secondary-foreground",
              isPrimary
                ? "dark:bg-brand-sun/10 dark:text-brand-sun"
                : "dark:bg-foreground/5 dark:text-brand-treasure/90",
            )}
          >
            {icon}
          </div>
        )}

        <span
          className={cn(
            "font-display text-[13px] font-semibold tracking-wide",
            isPrimary ? "text-foreground" : "text-secondary-foreground",
            isPrimary
              ? "dark:bg-gradient-to-b dark:from-brand-treasure dark:to-brand-sun dark:bg-clip-text dark:text-transparent"
              : "dark:text-brand-treasure/90",
          )}
        >
          {children}
        </span>
      </div>
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={target === "_self" ? undefined : "noopener noreferrer"}
        download={download}
        aria-label={ariaLabel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        className={sharedClassName}
      >
        {inner}
      </a>
    );
  }

  if (to && !disabled) {
    return (
      <Link
        to={to}
        viewTransition
        preload="intent"
        aria-label={ariaLabel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        className={sharedClassName}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      disabled={disabled}
      aria-label={ariaLabel}
      className={sharedClassName}
    >
      {inner}
    </button>
  );
}
