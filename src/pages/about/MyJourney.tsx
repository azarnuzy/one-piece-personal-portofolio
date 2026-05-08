import { motion } from "framer-motion";
import {
  AnchorIcon,
  CompassIcon,
  FlameIcon,
  RocketIcon,
  SailboatIcon,
  TrendingUpIcon,
} from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const TIMELINE = [
  {
    icon: RocketIcon,
    title: "Started the Adventure",
    year: "2021",
    description:
      "My journey began with curiosity about how websites work. I started learning HTML, CSS, and JavaScript — building my first pages from scratch.",
    tone: "treasure" as const,
  },
  {
    icon: TrendingUpIcon,
    title: "Level Up",
    year: "2022",
    description:
      "Dove deeper into frontend development, mastering frameworks like React, and started building real-world projects with proper component architecture.",
    tone: "info" as const,
  },
  {
    icon: AnchorIcon,
    title: "First Real Impact",
    year: "2023",
    description:
      "Got my first opportunity to work on real projects, collaborating with teams, solving meaningful problems, and shipping features that users actually use.",
    tone: "sunset" as const,
  },
  {
    icon: SailboatIcon,
    title: "Keep Sailing",
    year: "2024",
    description:
      "Continuously learning, improving and sharing knowledge — diving into TypeScript, Tailwind, and modern tooling to build cleaner, faster UIs.",
    tone: "success" as const,
  },
  {
    icon: FlameIcon,
    title: "Charting New Waters",
    year: "2025",
    description:
      "Deepening expertise in full-stack patterns, UI/UX craft, and building this portfolio to set sail on the next big adventure. The best is yet to come.",
    tone: "treasure" as const,
  },
];

const TONE_CLASSES = {
  treasure: { bg: "bg-brand-treasure/15", text: "text-brand-treasure" },
  info: { bg: "bg-brand-info/15", text: "text-brand-info" },
  sunset: { bg: "bg-brand-sunset/15", text: "text-brand-sunset" },
  success: { bg: "bg-brand-success/15", text: "text-brand-success" },
};

const STATS = [
  { value: "5+", label: "Projects" },
  { value: "2+", label: "Yrs Exp" },
  { value: "15+", label: "Techs" },
];

export function MyJourney() {
  return (
    <GoldPanelCard padding="md" className="h-full">
      <CardWatermark asset="skull" position="bottom-right" size={120} opacity={0.05} />
      <SectionHeader icon={CompassIcon} title="My Journey" tone="sunset" />

      <ol className="relative ml-1">
        {/* Vertical animated timeline line */}
        <div className="pointer-events-none absolute top-2 bottom-2 left-[15px] w-px overflow-hidden bg-border/40">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-brand-treasure via-brand-sunset to-brand-treasure/30"
          />
        </div>

        {TIMELINE.map((item, i) => {
          const tone = TONE_CLASSES[item.tone];
          const Icon = item.icon;
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-4 pb-4 last:pb-0"
            >
              <div className="shrink-0">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-border/60 ${tone.bg} ${tone.text} backdrop-blur-md`}
                >
                  <Icon size={14} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-sm font-bold text-foreground">{item.title}</h3>
                  <span
                    className={`rounded-pill border px-2 py-0.5 font-sans text-2xs font-semibold ${tone.text} border-current/40 bg-current/10`}
                  >
                    {item.year}
                  </span>
                </div>
                <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* Quick stats */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/40 pt-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-xl font-bold text-brand-treasure">{stat.value}</p>
            <p className="font-sans text-2xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </GoldPanelCard>
  );
}
