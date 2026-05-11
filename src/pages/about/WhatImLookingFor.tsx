import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckIcon,
  CompassIcon,
  RocketIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const POINTS = [
  {
    icon: BriefcaseIcon,
    label: "Product-focused frontend / full-stack role",
    tone: "treasure" as const,
  },
  {
    icon: UsersIcon,
    label: "Collaborative environment where craft is respected",
    tone: "sunset" as const,
  },
  {
    icon: RocketIcon,
    label: "Real-world impact — shipping work that users actually use",
    tone: "info" as const,
  },
];

const TONE = {
  treasure: { bg: "bg-brand-treasure/15", text: "text-brand-treasure" },
  sunset: { bg: "bg-brand-sunset/15", text: "text-brand-sunset" },
  info: { bg: "bg-brand-info/15", text: "text-brand-info" },
};

export function WhatImLookingFor() {
  return (
    <GoldPanelCard padding="sm">
      <CardWatermark asset="sunny" position="bottom-right" size={120} opacity={0.05} />
      <SectionHeader icon={TargetIcon} title="What I'm Looking For" tone="sunset" />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* Left — compact vertical checklist (7 cols) */}
        <div className="flex flex-col gap-2 lg:col-span-7">
          <p className="font-sans text-xs leading-snug text-muted-foreground">
            Open to opportunities where craft matters, ideas are heard, and the work makes a real
            difference.
          </p>
          <ul className="flex flex-col gap-1">
            {POINTS.map((point, i) => {
              const tone = TONE[point.tone];
              const Icon = point.icon;
              return (
                <motion.li
                  key={point.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${tone.bg} ${tone.text}`}
                  >
                    <CheckIcon size={11} strokeWidth={2.5} />
                  </span>
                  <Icon size={12} className={`shrink-0 ${tone.text}`} />
                  <span className="font-sans text-2xs leading-snug text-foreground/85">
                    {point.label}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Right — compact CTA + availability (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col justify-between gap-2 rounded-xl border border-brand-treasure/50 bg-brand-treasure/15 p-3 lg:col-span-5"
        >
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-pill border border-brand-success/40 bg-brand-success/15 px-2 py-0.5 font-sans text-2xs font-semibold text-brand-success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-success opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-success" />
              </span>
              Available for work
            </span>

            <p className="font-display text-sm leading-snug font-bold text-foreground">
              Let's Build Something <span className="text-highlight-sunset">Amazing</span>
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-1.5 rounded-pill border border-brand-treasure bg-brand-treasure/20 px-3 py-1.5 font-sans text-2xs font-semibold text-brand-treasure transition-colors duration-200 hover:bg-brand-treasure/30"
          >
            <CompassIcon size={12} />
            Get In Touch
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowRightIcon size={11} />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </GoldPanelCard>
  );
}
