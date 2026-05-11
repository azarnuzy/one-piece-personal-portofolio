import { motion } from "framer-motion";
import { CompassIcon, GaugeIcon, HeartHandshakeIcon, SparklesIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const PRINCIPLES = [
  {
    icon: GaugeIcon,
    title: "Performance",
    description: "Fast, scalable, real-world tested under load.",
    tone: "treasure" as const,
  },
  {
    icon: SparklesIcon,
    title: "Craft",
    description: "Clean code, accessible UI, maintainable architecture.",
    tone: "sunset" as const,
  },
  {
    icon: HeartHandshakeIcon,
    title: "Impact",
    description: "Solving real problems users actually have.",
    tone: "info" as const,
  },
];

const TONE = {
  treasure: { bg: "bg-brand-treasure/15", text: "text-brand-treasure" },
  sunset: { bg: "bg-brand-sunset/15", text: "text-brand-sunset" },
  info: { bg: "bg-brand-info/15", text: "text-brand-info" },
};

export function BuildPhilosophy() {
  return (
    <GoldPanelCard padding="md" className="h-full">
      <CardWatermark asset="skull" position="bottom-right" size={120} opacity={0.05} />
      <SectionHeader icon={CompassIcon} title="How I Build" tone="sunset" />

      <p className="mb-3 font-sans text-xs leading-relaxed text-muted-foreground">
        Three principles that shape every project I ship.
      </p>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {PRINCIPLES.map((p, i) => {
          const tone = TONE[p.tone];
          const Icon = p.icon;
          return (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -2 }}
              className="rounded-lg border border-border/60 bg-card/40 p-2.5 backdrop-blur-md transition-colors hover:border-brand-treasure/40"
            >
              <div
                className={`mb-1.5 flex h-7 w-7 items-center justify-center rounded-md ${tone.bg} ${tone.text}`}
              >
                <Icon size={13} />
              </div>
              <h3 className="font-display text-xs leading-snug font-bold text-foreground">
                {p.title}
              </h3>
              <p className="mt-0.5 font-sans text-2xs leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </GoldPanelCard>
  );
}
