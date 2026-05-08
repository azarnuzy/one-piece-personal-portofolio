import { motion } from "framer-motion";
import { BookOpenIcon, HeartIcon, PuzzleIcon, UsersIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const CARDS = [
  {
    icon: PuzzleIcon,
    title: "Problem Solver",
    description: "I enjoy breaking down complex problems and finding elegant solutions.",
    tone: "treasure" as const,
  },
  {
    icon: UsersIcon,
    title: "User Focused",
    description: "Building experiences that are intuitive and user-friendly is my priority.",
    tone: "sunset" as const,
  },
  {
    icon: BookOpenIcon,
    title: "Always Learning",
    description: "Tech evolves fast, and so do I. I love learning and staying up to date.",
    tone: "info" as const,
  },
];

const TONE = {
  treasure: {
    ring: "ring-brand-treasure/30",
    text: "text-brand-treasure",
    bg: "bg-brand-treasure/15",
  },
  sunset: { ring: "ring-brand-sunset/30", text: "text-brand-sunset", bg: "bg-brand-sunset/15" },
  info: { ring: "ring-brand-info/30", text: "text-brand-info", bg: "bg-brand-info/15" },
};

export function WhatDrivesMe() {
  return (
    <GoldPanelCard padding="md" className="h-full">
      <CardWatermark asset="skull" position="bottom-right" size={120} opacity={0.05} />
      <SectionHeader icon={HeartIcon} title="What Drives Me" tone="sunset" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CARDS.map((card, i) => {
          const tone = TONE[card.tone];
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl border border-border/60 bg-card/40 p-4 ring-1 backdrop-blur-md transition-colors duration-300 hover:border-brand-treasure/40 ${tone.ring}`}
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 240, damping: 14 }}
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${tone.bg} ${tone.text}`}
              >
                <Icon size={18} />
              </motion.div>
              <h3 className="mb-1 font-display text-sm font-bold text-foreground">{card.title}</h3>
              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </GoldPanelCard>
  );
}
