import { motion } from "framer-motion";
import { MedalIcon, SparklesIcon, TrophyIcon, type LucideIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

type Tone = "treasure" | "info" | "sunset" | "success";

const ACHIEVEMENTS: Array<{
  icon: LucideIcon;
  title: string;
  source: string;
  year: string;
  tone: Tone;
}> = [
  {
    icon: TrophyIcon,
    title: "1st Place — Frontend Hackathon",
    source: "BEM FILKOM UB",
    year: "2024",
    tone: "treasure",
  },
  {
    icon: MedalIcon,
    title: "Finalist — Gemastik UI/UX Design",
    source: "Pusat Prestasi Nasional",
    year: "2023",
    tone: "sunset",
  },
  {
    icon: SparklesIcon,
    title: "Bidikmisi / KIP-K Scholarship",
    source: "Indonesian Government",
    year: "2021 — 2025",
    tone: "info",
  },
  {
    icon: SparklesIcon,
    title: "Sobat Bumi Scholarship",
    source: "Pertamina Foundation",
    year: "2023",
    tone: "success",
  },
];

const TONE: Record<Tone, { bg: string; text: string }> = {
  treasure: { bg: "bg-brand-treasure/15", text: "text-brand-treasure" },
  info: { bg: "bg-brand-info/15", text: "text-brand-info" },
  sunset: { bg: "bg-brand-sunset/15", text: "text-brand-sunset" },
  success: { bg: "bg-brand-success/15", text: "text-brand-success" },
};

export function Achievements() {
  return (
    <GoldPanelCard padding="sm" className="h-full">
      <CardWatermark asset="skull" position="bottom-right" size={110} opacity={0.05} />
      <SectionHeader icon={TrophyIcon} title="Achievements & Awards" tone="sunset" />

      <ul className="flex flex-col gap-1.5">
        {ACHIEVEMENTS.map((item, i) => {
          const tone = TONE[item.tone];
          const Icon = item.icon;
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group flex items-start gap-2 rounded-lg border border-border/50 bg-card/40 px-2.5 py-1.5 backdrop-blur-md transition-colors hover:border-brand-treasure/40"
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${tone.bg} ${tone.text}`}
              >
                <Icon size={11} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-sans text-2xs leading-snug font-semibold text-foreground/90 group-hover:text-foreground">
                  {item.title}
                </p>
                <p className="font-sans text-[10px] leading-snug text-muted-foreground">
                  {item.source} · {item.year}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </GoldPanelCard>
  );
}
