import { QuoteIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

export function MyPhilosophy() {
  return (
    <GoldPanelCard padding="md" className="h-full">
      <CardWatermark asset="skull" position="bottom-right" size={100} opacity={0.05} />
      <SectionHeader icon={QuoteIcon} title="My Philosophy" tone="treasure" />

      <div className="flex flex-col gap-3">
        <p className="font-sans text-xs leading-relaxed text-muted-foreground">
          Code is like a compass — it guides ideas into reality. Good code is not just about doing
          the work; it's about doing it well, leaving things better than you found them, and making
          others' journeys easier.
        </p>
        <p className="font-sans text-xs leading-relaxed text-muted-foreground">
          I believe great products are built at the intersection of clean engineering and empathetic
          design — where every line of code serves a real human need.
        </p>
      </div>
    </GoldPanelCard>
  );
}
