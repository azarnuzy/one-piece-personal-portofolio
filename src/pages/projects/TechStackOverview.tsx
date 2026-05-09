import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { LayersIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { cn } from "@/lib/utils";

const TECHS = [
  { icon: SiReact, label: "React", color: "text-brand-info" },
  { icon: SiNextdotjs, label: "Next.js", color: "text-foreground" },
  { icon: SiTypescript, label: "TypeScript", color: "text-brand-info" },
  { icon: SiTailwindcss, label: "Tailwind", color: "text-brand-success" },
  { icon: SiJavascript, label: "JavaScript", color: "text-brand-treasure" },
  { icon: SiNodedotjs, label: "Node.js", color: "text-brand-success" },
  { icon: SiExpress, label: "Express", color: "text-foreground" },
  { icon: SiMongodb, label: "MongoDB", color: "text-brand-success" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "text-brand-info" },
  { icon: SiFirebase, label: "Firebase", color: "text-brand-sunset" },
  { icon: SiGit, label: "Git", color: "text-brand-sunset" },
  { icon: SiGithub, label: "GitHub", color: "text-foreground" },
  { icon: SiDocker, label: "Docker", color: "text-brand-info" },
  { icon: SiFigma, label: "Figma", color: "text-brand-sunset" },
  { icon: SiVercel, label: "Vercel", color: "text-foreground" },
];

interface TechIconBadgeProps {
  icon: (typeof TECHS)[number]["icon"];
  label: string;
  color: string;
  delay?: number;
}

function TechIconBadge({ icon: Icon, label, color, delay = 0 }: TechIconBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.25, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex cursor-default flex-col items-center gap-1.5 rounded-lg border border-border/30 bg-background/30 px-1.5 py-2 transition-colors duration-150 hover:border-border/60 hover:bg-card/70"
    >
      <span className={cn("flex items-center justify-center", color)}>
        <Icon size={16} />
      </span>
      <span className="text-center font-sans text-2xs leading-none text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
}

export function TechStackOverview() {
  return (
    <GoldPanelCard padding="md" className="h-full" ornaments={false}>
      <CardWatermark asset="sunny" position="bottom-right" size={90} opacity={0.04} />
      <SectionHeader icon={LayersIcon} title="Tech Stack Overview" tone="treasure" />

      <div className="grid grid-cols-5 gap-1.5">
        {TECHS.map((t, i) => (
          <TechIconBadge
            key={t.label}
            icon={t.icon}
            label={t.label}
            color={t.color}
            delay={i * 0.03}
          />
        ))}
      </div>
    </GoldPanelCard>
  );
}
