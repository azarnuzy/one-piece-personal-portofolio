import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  /** Optional right-side action (e.g. View All link). */
  action?: React.ReactNode;
  className?: string;
  /** Tone of the icon — defaults to sunset coral. */
  tone?: "sunset" | "treasure" | "info" | "success";
}

const TONE: Record<NonNullable<SectionHeaderProps["tone"]>, string> = {
  sunset: "text-brand-sunset",
  treasure: "text-brand-treasure",
  info: "text-brand-info",
  success: "text-brand-success",
};

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  action,
  className,
  tone = "sunset",
}: SectionHeaderProps) {
  return (
    <div className={cn("relative mb-4 flex items-start justify-between gap-3", className)}>
      <div className="min-w-0">
        <h2 className="flex items-center gap-2 heading-section text-base text-foreground md:text-lg">
          <span className="relative inline-flex">
            <Icon size={16} className={TONE[tone]} />
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 -z-10 rounded-full blur-md",
                tone === "sunset" && "bg-brand-sunset/40",
                tone === "treasure" && "bg-brand-treasure/40",
                tone === "info" && "bg-brand-info/40",
                tone === "success" && "bg-brand-success/40",
              )}
            />
          </span>
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 font-sans text-2xs text-muted-foreground md:text-xs">{subtitle}</p>
        )}
        {/* Decorative glow line */}
        <div
          aria-hidden
          className="mt-2 h-px w-16 bg-gradient-to-r from-brand-treasure/60 via-brand-treasure/20 to-transparent"
        />
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
