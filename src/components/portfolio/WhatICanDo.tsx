import { ArrowRightIcon, CompassIcon, LayoutIcon, PaletteIcon, ZapIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

const SKILLS = [
  {
    icon: LayoutIcon,
    title: "Frontend Engineering",
    description:
      "Building scalable, maintainable and performant web applications with modern technologies.",
    iconBg: "bg-brand-sunset/10",
    iconColor: "text-brand-sunset",
  },
  {
    icon: PaletteIcon,
    title: "UI/UX Crafting",
    description:
      "Creating clean, intuitive and user-friendly interfaces that deliver great experiences.",
    iconBg: "bg-brand-sun/10",
    iconColor: "text-brand-sun",
  },
  {
    icon: ZapIcon,
    title: "Real-time Solutions",
    description: "Implementing real-time features like chat, notifications and live data updates.",
    iconBg: "bg-brand-success/10",
    iconColor: "text-brand-success",
  },
];

export function WhatICanDo() {
  return (
    <section className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6">
      <CardWatermark asset="sunny" position="bottom-right" size={170} opacity={0.06} rotate={-8} />
      {/* Header */}
      <div className="relative mb-4 flex shrink-0 items-center justify-between">
        <h2 className="flex items-center gap-2 heading-section text-lg text-foreground">
          <CompassIcon size={16} className="text-brand-sunset" />
          What I Can Do
        </h2>
        <a
          href="/skills"
          className="flex items-center gap-1 font-sans text-xs text-brand-sunset transition-colors duration-[var(--duration-base)] hover:text-brand-sunset-hover"
        >
          View All
          <ArrowRightIcon size={12} />
        </a>
      </div>

      {/* Skill list — divide-y instead of nested cards */}
      <div className="relative flex flex-col divide-y divide-border/40">
        {SKILLS.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
          <div key={title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <div className={`mt-0.5 shrink-0 rounded-lg p-1.5 ${iconBg}`}>
              <Icon size={14} className={iconColor} />
            </div>
            <div className="min-w-0">
              <h3 className="mb-0.5 font-display text-sm font-bold text-card-foreground">
                {title}
              </h3>
              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-auto pt-4">
        <PirateCTAButton
          variant="secondary"
          icon={<ArrowRightIcon size={13} />}
          className="w-full justify-center"
        >
          View All Skills
        </PirateCTAButton>
      </div>
    </section>
  );
}
