import { motion } from "framer-motion";
import { GraduationCapIcon, SchoolIcon, type LucideIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

type Tone = "treasure" | "info" | "sunset" | "success";

const EDUCATION: Array<{
  icon: LucideIcon;
  range: string;
  title: string;
  institution: string;
  major: string;
  highlight: string;
  tone: Tone;
}> = [
  {
    icon: GraduationCapIcon,
    range: "Sept 2020 — Present",
    title: "B.Sc. Computer Science",
    institution: "Universitas Pendidikan Indonesia",
    major: "Current GPA: 3.81 / 4.0",
    highlight:
      "GDSC UPI · BEM Kemakom · Competitive Programming Club · Generasi Baru Indonesia (GenBI)",
    tone: "treasure",
  },
  {
    icon: SchoolIcon,
    range: "Jul 2017 — Jul 2020",
    title: "Senior High School — Science",
    institution: "SMAN Cahaya Madani Banten Boarding School",
    major: "Mathematics & Natural Sciences",
    highlight: "Built landing page for a school-held competition event",
    tone: "info",
  },
];

const EDU_TONE: Record<Tone, { bg: string; text: string }> = {
  treasure: { bg: "bg-brand-treasure/15", text: "text-brand-treasure" },
  info: { bg: "bg-brand-info/15", text: "text-brand-info" },
  sunset: { bg: "bg-brand-sunset/15", text: "text-brand-sunset" },
  success: { bg: "bg-brand-success/15", text: "text-brand-success" },
};

export function Education() {
  return (
    <GoldPanelCard padding="sm" className="h-full">
      <CardWatermark asset="skull" position="bottom-right" size={110} opacity={0.05} />
      <SectionHeader icon={GraduationCapIcon} title="Education" tone="sunset" />

      <ol className="relative">
        <div className="pointer-events-none absolute top-1.5 bottom-2 left-[15px] w-px overflow-hidden bg-border/40">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-brand-treasure to-brand-info/40"
          />
        </div>

        {EDUCATION.map((edu, i) => {
          const tone = EDU_TONE[edu.tone];
          const Icon = edu.icon;
          return (
            <motion.li
              key={edu.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-2.5 pb-3 last:pb-0"
            >
              <div className="shrink-0">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-border/60 ${tone.bg} ${tone.text} backdrop-blur-md`}
                >
                  <Icon size={13} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block rounded-pill border border-current/35 bg-current/10 px-1.5 py-0 font-sans text-2xs font-semibold ${tone.text}`}
                >
                  {edu.range}
                </span>
                <h3 className="mt-0.5 font-display text-xs leading-tight font-bold text-foreground">
                  {edu.title}
                </h3>
                <p className="font-sans text-2xs leading-snug text-muted-foreground">
                  {edu.institution}
                </p>
                <p className="font-sans text-[10px] leading-snug text-secondary-foreground">
                  {edu.major}
                </p>
                <p className="font-sans text-[10px] leading-snug text-muted-foreground/85">
                  {edu.highlight}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </GoldPanelCard>
  );
}
