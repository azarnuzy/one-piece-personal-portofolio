import {
  SiCss,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "@icons-pack/react-simple-icons";
import { GlobeIcon, ZapIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { TechBadge } from "@/components/portfolio/TechBadge";

const TECHS = [
  { icon: SiReact, label: "React", color: "text-brand-info" },
  { icon: SiNextdotjs, label: "Next.js", color: "text-foreground" },
  { icon: SiTypescript, label: "TypeScript", color: "text-brand-info" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "text-brand-success" },
  { icon: SiJavascript, label: "JavaScript", color: "text-brand-treasure" },
  { icon: SiHtml5, label: "HTML5", color: "text-brand-sunset" },
  { icon: SiCss, label: "CSS3", color: "text-brand-info" },
  { icon: SiSass, label: "Sass", color: "text-brand-sunset" },
  { icon: SiGit, label: "Git", color: "text-brand-sunset" },
  { icon: SiGithub, label: "GitHub", color: "text-foreground" },
  { icon: SiFigma, label: "Figma", color: "text-brand-sunset" },
  { icon: SiVite, label: "Vite", color: "text-brand-treasure" },
  { icon: ZapIcon, label: "WebSocket", color: "text-brand-success" },
  { icon: GlobeIcon, label: "REST API", color: "text-brand-info" },
  { icon: SiFirebase, label: "Firebase", color: "text-brand-treasure" },
];

export function TechArsenal() {
  return (
    <GoldPanelCard padding="md" className="h-full">
      <CardWatermark asset="sunny" position="bottom-right" size={120} opacity={0.05} />
      <SectionHeader icon={ZapIcon} title="Tech Arsenal" tone="sunset" />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TECHS.map((t, i) => (
          <TechBadge
            key={t.label}
            icon={t.icon}
            label={t.label}
            iconColor={t.color}
            delay={i * 0.04}
          />
        ))}
      </div>
    </GoldPanelCard>
  );
}
