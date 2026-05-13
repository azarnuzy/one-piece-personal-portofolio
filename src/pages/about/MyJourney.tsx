import { motion } from "framer-motion";
import {
  AnchorIcon,
  CompassIcon,
  FlameIcon,
  RadarIcon,
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
    year: "2020",
    description:
      "Began Computer Science at Universitas Pendidikan Indonesia — building my foundation in algorithms, data structures, and the web stack.",
    tone: "treasure" as const,
  },
  {
    icon: TrendingUpIcon,
    title: "Freelance & First Client Work",
    year: "2022",
    description:
      "Started freelancing as a full-stack developer, shipping production sites and learning to balance code quality with real client deadlines.",
    tone: "info" as const,
  },
  {
    icon: AnchorIcon,
    title: "First Real Impact",
    year: "2023",
    description:
      "Frontend intern at Sagara Technology and M Knows Consulting — led a 5-person team to deliver kampusgratis.id (100-page LMS, >85 Lighthouse).",
    tone: "sunset" as const,
  },
  {
    icon: SailboatIcon,
    title: "Software Engineer at Cakra AI",
    year: "2024",
    description:
      "Joined Cakra AI to spearhead Sygma — an AI automation platform now used by multiple enterprise clients, cutting POC delivery from ~1 week to hours.",
    tone: "success" as const,
  },
  {
    icon: FlameIcon,
    title: "Charting New Waters",
    year: "2026",
    description:
      "Deepening full-stack reach across API architecture, DevOps, and performance engineering — building scalable systems that deliver measurable value.",
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
  { value: "13+", label: "Projects" },
  { value: "3+", label: "Years" },
  { value: "20+", label: "Tech" },
];

export function MyJourney() {
  return (
    <GoldPanelCard padding="sm" className="h-full">
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
              className="relative flex gap-3 pb-2.5 last:pb-0"
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
                <p className="font-sans text-xs leading-snug text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* Compact inline stats strip */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-border/40 pt-2.5 font-sans text-2xs text-muted-foreground">
        {STATS.map((stat, i) => (
          <span key={stat.label} className="inline-flex items-center gap-2">
            <span>
              <span className="font-display text-sm font-bold text-brand-treasure">
                {stat.value}
              </span>{" "}
              <span className="text-foreground/75">{stat.label}</span>
            </span>
            {i < STATS.length - 1 && <span className="text-border">•</span>}
          </span>
        ))}
      </div>

      {/* Current Focus — tighter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2.5 flex gap-2.5 rounded-xl border border-brand-sunset/30 bg-brand-sunset/[0.06] p-2.5 ring-1 ring-brand-sunset/20 backdrop-blur-md"
      >
        <div className="shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-sunset/15 text-brand-sunset">
            <RadarIcon size={13} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
            <h3 className="font-display text-2xs font-bold tracking-wider text-foreground/85 uppercase">
              Current Focus
            </h3>
            <span className="rounded-pill border border-brand-sunset/40 bg-brand-sunset/10 px-1.5 py-0 font-sans text-[10px] font-semibold text-brand-sunset">
              2026
            </span>
          </div>
          <p className="font-sans text-2xs leading-snug text-muted-foreground">
            Leading frontend on Sygma — Cakra AI's flagship AI automation platform — and deepening
            full-stack reach across API design, DevOps, and performance.
          </p>
        </div>
      </motion.div>
    </GoldPanelCard>
  );
}
