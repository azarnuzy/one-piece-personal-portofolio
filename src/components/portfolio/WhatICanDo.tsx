import { ArrowRightIcon, LayoutIcon, PaletteIcon, ZapIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    <section className="border-r border-border px-5 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 heading-section text-xl text-foreground">
          🧭 What I Can Do
        </h2>
        <a
          href="/skills"
          className="flex items-center gap-1 font-sans text-xs text-brand-sunset transition-colors duration-[var(--duration-base)] hover:text-brand-sunset-hover"
        >
          View All
          <ArrowRightIcon size={12} />
        </a>
      </div>

      {/* Skill cards */}
      <div className="mb-3 flex flex-col gap-2.5">
        {SKILLS.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
          <div key={title} className="flex items-start gap-3 surface-card p-3.5">
            <div className={`rounded-lg p-2 ${iconBg} mt-0.5 shrink-0`}>
              <Icon size={18} className={iconColor} />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 font-display text-sm font-bold text-card-foreground">{title}</h3>
              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full gap-2 bg-primary font-sans text-sm font-semibold text-primary-foreground">
        View All Skills
        <ArrowRightIcon size={14} />
      </Button>
    </section>
  );
}
