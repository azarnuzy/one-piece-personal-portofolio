import { LayoutGridIcon } from "lucide-react";

import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { cn } from "@/lib/utils";

import { CATEGORIES } from "./data";

export function CategoriesWidget() {
  const cats = CATEGORIES.filter((c) => c.value !== "all");

  return (
    <GoldPanelCard padding="sm" static>
      <SectionHeader icon={LayoutGridIcon} title="Categories" tone="info" />

      <div className="grid grid-cols-2 gap-1.5">
        {cats.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={cn(
              "group flex items-center justify-between gap-1.5 rounded-lg border border-border/40 bg-muted/30 px-2.5 py-1.5 text-left transition-all duration-150",
              "hover:-translate-y-0.5 hover:border-brand-treasure/30 hover:bg-muted/60 hover:shadow-[var(--shadow-card)]",
            )}
          >
            <span className="truncate font-sans text-2xs font-medium text-foreground/80 transition-colors group-hover:text-brand-treasure">
              {cat.label}
            </span>
            {cat.count !== undefined && (
              <span className="shrink-0 rounded-full bg-card/80 px-1.5 py-px font-sans text-2xs leading-none text-muted-foreground tabular-nums">
                {cat.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </GoldPanelCard>
  );
}
