import { motion } from "framer-motion";
import { BookOpenIcon, GaugeIcon, HeartIcon, PuzzleIcon, QuoteIcon, UsersIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const CARDS = [
  {
    icon: PuzzleIcon,
    title: "Problem Solver",
    description:
      "Turning ambiguous client needs into dynamic, configurable systems — like cutting Sygma's POC delivery from a week to hours.",
    tone: "treasure" as const,
  },
  {
    icon: UsersIcon,
    title: "Cross-Functional",
    description:
      "Presenting product demos to enterprise prospects and collaborating across engineering, design, and sales.",
    tone: "sunset" as const,
  },
  {
    icon: BookOpenIcon,
    title: "Always Learning",
    description:
      "From legacy Vue→React refactors to AI sub-agents that automate full migrations — staying sharp across the stack.",
    tone: "info" as const,
  },
  {
    icon: GaugeIcon,
    title: "Performance Mindset",
    description:
      "Lighthouse >85 across 100 LMS pages, k6 stress testing, and a 20% perf lift on Next.js v12→v13 migration.",
    tone: "success" as const,
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
  success: { ring: "ring-brand-success/30", text: "text-brand-success", bg: "bg-brand-success/15" },
};

export function WhatDrivesMe() {
  return (
    <GoldPanelCard padding="sm" className="h-full">
      <CardWatermark asset="skull" position="bottom-right" size={120} opacity={0.05} />
      <SectionHeader icon={HeartIcon} title="What Drives Me" tone="sunset" />

      {/* Row 1 — 4 driving values (2x2 on small, 4 cols on lg) */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card, i) => {
          const tone = TONE[card.tone];
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className={`rounded-xl border border-border/60 bg-card/40 p-2.5 ring-1 backdrop-blur-md transition-colors duration-300 hover:border-brand-treasure/40 ${tone.ring}`}
            >
              <div
                className={`mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg ${tone.bg} ${tone.text}`}
              >
                <Icon size={13} />
              </div>
              <h3 className="mb-0.5 font-display text-xs leading-snug font-bold text-foreground">
                {card.title}
              </h3>
              <p className="font-sans text-2xs leading-snug text-muted-foreground">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Row 2 — Compact horizontal philosophy quote strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2.5 flex items-center gap-2.5 rounded-xl border border-brand-treasure/30 bg-brand-treasure/[0.06] px-3 py-2 ring-1 ring-brand-treasure/20 backdrop-blur-md"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-treasure/15 text-brand-treasure">
          <QuoteIcon size={13} />
        </div>
        <p className="font-sans text-2xs leading-snug text-muted-foreground">
          <span className="font-display text-2xs font-bold tracking-wider text-foreground/85 uppercase">
            Philosophy ·
          </span>{" "}
          Building scalable, maintainable systems that deliver measurable business value — where
          every architectural decision serves a real user outcome.
        </p>
      </motion.div>
    </GoldPanelCard>
  );
}
