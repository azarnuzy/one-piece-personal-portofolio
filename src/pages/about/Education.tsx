import { motion } from "framer-motion";
import { GraduationCapIcon, SchoolIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const EDUCATION = [
  {
    icon: GraduationCapIcon,
    range: "2021 — 2025",
    title: "Bachelor's Degree in Informatics Engineering",
    institution: "Brawijaya University",
    tone: "treasure" as const,
  },
  {
    icon: SchoolIcon,
    range: "2017 — 2021",
    title: "Senior High School — Science",
    institution: "SMAN 1 Malang",
    tone: "info" as const,
  },
];

const TONE = {
  treasure: { bg: "bg-brand-treasure/15", text: "text-brand-treasure" },
  info: { bg: "bg-brand-info/15", text: "text-brand-info" },
};

export function Education() {
  return (
    <GoldPanelCard padding="md" className="h-full">
      <CardWatermark asset="skull" position="bottom-right" size={110} opacity={0.05} />
      <SectionHeader icon={GraduationCapIcon} title="Education" tone="sunset" />

      <ol className="relative">
        {/* Vertical glow line */}
        <div className="pointer-events-none absolute top-2 bottom-2 left-[19px] w-px overflow-hidden bg-border/40">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-brand-treasure to-brand-info/40"
          />
        </div>

        {EDUCATION.map((edu, i) => {
          const tone = TONE[edu.tone];
          const Icon = edu.icon;
          return (
            <motion.li
              key={edu.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              <div className="shrink-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-border/60 ${tone.bg} ${tone.text} backdrop-blur-md`}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span
                  className={`mb-1 inline-block rounded-pill border border-current/35 bg-current/10 px-2 py-0.5 font-sans text-2xs font-semibold ${tone.text}`}
                >
                  {edu.range}
                </span>
                <h3 className="mt-1 font-display text-sm font-bold text-foreground">{edu.title}</h3>
                <p className="font-sans text-xs text-muted-foreground">{edu.institution}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </GoldPanelCard>
  );
}
