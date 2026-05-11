import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { LayersIcon, ServerIcon, WrenchIcon, ZapIcon } from "lucide-react";
import { type ComponentType } from "react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

type Tech = {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  color: string;
};

const CORE: Tech[] = [
  { icon: SiReact, label: "React", color: "text-brand-info" },
  { icon: SiNextdotjs, label: "Next.js", color: "text-foreground" },
  { icon: SiTypescript, label: "TypeScript", color: "text-brand-info" },
  { icon: SiTailwindcss, label: "Tailwind", color: "text-brand-success" },
];

const BACKEND: Tech[] = [
  { icon: SiNodedotjs, label: "Node.js", color: "text-brand-success" },
  { icon: SiExpress, label: "Express", color: "text-foreground" },
  { icon: SiMongodb, label: "MongoDB", color: "text-brand-success" },
  { icon: SiFirebase, label: "Firebase", color: "text-brand-treasure" },
];

const TOOLS: Tech[] = [
  { icon: SiGit, label: "Git", color: "text-brand-sunset" },
  { icon: SiFigma, label: "Figma", color: "text-brand-sunset" },
  { icon: SiDocker, label: "Docker", color: "text-brand-info" },
  { icon: SiPostman, label: "Postman", color: "text-brand-sunset" },
];

const PROFICIENCY = [
  { label: "Frontend Engineering", level: "Advanced", tone: "treasure" as const },
  { label: "UI/UX Collaboration", level: "Intermediate", tone: "info" as const },
  { label: "Backend Integration", level: "Intermediate", tone: "sunset" as const },
];

const PROF_TONE = {
  treasure: "text-brand-treasure border-brand-treasure/40 bg-brand-treasure/10",
  info: "text-brand-info border-brand-info/40 bg-brand-info/10",
  sunset: "text-brand-sunset border-brand-sunset/40 bg-brand-sunset/10",
};

const GROUPS: Array<{
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  items: Tech[];
}> = [
  { icon: LayersIcon, label: "Core Stack", items: CORE },
  { icon: ServerIcon, label: "Backend & Database", items: BACKEND },
  { icon: WrenchIcon, label: "Tools", items: TOOLS },
];

function TechPill({ tech, delay }: { tech: Tech; delay: number }) {
  const Icon = tech.icon;
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -1.5 }}
      className="inline-flex cursor-default items-center gap-1 rounded-pill border border-border/60 bg-card/50 px-2 py-0.5 backdrop-blur-md transition-colors hover:border-brand-treasure/40"
    >
      <Icon size={10} className={tech.color} />
      <span className="font-sans text-2xs font-medium text-foreground/85">{tech.label}</span>
    </motion.span>
  );
}

export function TechArsenal() {
  return (
    <GoldPanelCard padding="sm" className="h-full">
      <CardWatermark asset="sunny" position="bottom-right" size={120} opacity={0.05} />
      <SectionHeader icon={ZapIcon} title="Tech Arsenal" tone="sunset" />

      {/* 3 grouped tech sections — tighter */}
      <div className="flex flex-col gap-2">
        {GROUPS.map((group, gi) => {
          const GroupIcon = group.icon;
          return (
            <div key={group.label}>
              <div className="mb-1 flex items-center gap-1.5">
                <GroupIcon size={11} className="text-brand-treasure" />
                <h3 className="font-display text-2xs font-bold tracking-wider text-foreground/80 uppercase">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {group.items.map((tech, i) => (
                  <TechPill key={tech.label} tech={tech} delay={gi * 0.08 + i * 0.03} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact proficiency rows */}
      <div className="mt-2.5 border-t border-border/40 pt-2">
        <h3 className="mb-1.5 font-display text-2xs font-bold tracking-wider text-foreground/80 uppercase">
          Proficiency
        </h3>
        <ul className="flex flex-col gap-1">
          {PROFICIENCY.map((p, i) => (
            <motion.li
              key={p.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex items-center justify-between gap-2"
            >
              <span className="font-sans text-2xs text-foreground/85">{p.label}</span>
              <span
                className={`rounded-pill border px-1.5 py-0 font-sans text-[10px] font-semibold ${PROF_TONE[p.tone]}`}
              >
                {p.level}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </GoldPanelCard>
  );
}
