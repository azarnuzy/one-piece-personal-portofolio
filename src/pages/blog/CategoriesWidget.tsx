import { LayoutGridIcon } from "lucide-react";

import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

import { CATEGORIES } from "./data";

export function CategoriesWidget() {
  const cats = CATEGORIES.filter((c) => c.value !== "all");

  return (
    <GoldPanelCard padding="md" static>
      <SectionHeader icon={LayoutGridIcon} title="Categories" tone="info" />

      <ul className="flex flex-col divide-y divide-border/40">
        {cats.map((cat) => (
          <li
            key={cat.value}
            className="group flex cursor-pointer items-center justify-between px-1 py-2.5 transition-all duration-150 hover:translate-x-0.5"
          >
            <span className="font-sans text-xs font-medium text-foreground/80 transition-colors group-hover:text-brand-treasure">
              {cat.label}
            </span>
            <span className="flex h-5 min-w-[1.4rem] items-center justify-center rounded-full bg-muted/60 px-1.5 font-sans text-2xs text-muted-foreground">
              {cat.count}
            </span>
          </li>
        ))}
      </ul>
    </GoldPanelCard>
  );
}
