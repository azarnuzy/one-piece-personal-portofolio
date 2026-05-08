import { motion } from "framer-motion";
import { CoffeeIcon, MoonIcon, PaletteIcon, SparklesIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const FACTS = [
  { icon: SparklesIcon, label: "One Piece fan since 2012", tone: "treasure" as const },
  { icon: CoffeeIcon, label: "Coffee addict — fueling late nights", tone: "sunset" as const },
  { icon: PaletteIcon, label: "Loves clean, minimal UI", tone: "info" as const },
  { icon: MoonIcon, label: "Night owl developer", tone: "success" as const },
];

const TONE = {
  treasure: "text-brand-treasure",
  sunset: "text-brand-sunset",
  info: "text-brand-info",
  success: "text-brand-success",
};

export function FunFacts() {
  return (
    <GoldPanelCard padding="md" className="h-full">
      <CardWatermark asset="sunny" position="bottom-right" size={100} opacity={0.05} />
      <SectionHeader icon={SparklesIcon} title="Fun Facts" tone="treasure" />

      <ul className="flex flex-col divide-y divide-border/40">
        {FACTS.map((fact, i) => {
          const Icon = fact.icon;
          return (
            <motion.li
              key={fact.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ x: 4 }}
              className="flex cursor-default items-center gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-card/60 ring-1 ring-border/60 ${TONE[fact.tone]}`}
              >
                <Icon size={13} />
              </div>
              <span className="font-sans text-xs text-foreground/85">{fact.label}</span>
            </motion.li>
          );
        })}
      </ul>
    </GoldPanelCard>
  );
}
