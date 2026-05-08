import { motion } from "framer-motion";
import { ArrowRightIcon, BriefcaseIcon, RocketIcon, TargetIcon, UsersIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const CARDS = [
  {
    icon: BriefcaseIcon,
    title: "Frontend Developer Role",
    description: "Modern stack with real ownership.",
    tone: "treasure" as const,
  },
  {
    icon: UsersIcon,
    title: "Collaborative Environment",
    description: "Working with passionate and supportive teams.",
    tone: "sunset" as const,
  },
  {
    icon: RocketIcon,
    title: "Impactful Projects",
    description: "Solving real problems and creating real impact.",
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
    <GoldPanelCard padding="md">
      <CardWatermark asset="sunny" position="bottom-right" size={130} opacity={0.05} />
      <SectionHeader icon={TargetIcon} title="What I'm Looking For" tone="sunset" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left: objective text */}
        <div className="lg:col-span-3">
          <p className="font-sans text-sm leading-relaxed text-foreground/85">
            I'm open to exciting opportunities where I can contribute, grow and build amazing
            products with great people.
          </p>
          <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground">
            Looking for roles where craft matters, ideas are heard, and the work makes a real
            difference.
          </p>
        </div>

        {/* Middle: 3 mini cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-6">
          {CARDS.map((card, i) => {
            const tone = TONE[card.tone];
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="flex flex-col gap-2 rounded-xl border border-border/60 bg-card/40 p-3 backdrop-blur-md transition-colors duration-300 hover:border-brand-treasure/40"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone.bg} ${tone.text}`}
                >
                  <Icon size={15} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">{card.title}</h3>
                  <p className="mt-0.5 font-sans text-xs leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: compact CTA box with gold background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-brand-treasure/50 bg-brand-treasure/15 px-4 py-5 text-center lg:col-span-3"
        >
          <p className="font-display text-sm leading-snug font-bold text-foreground">
            Let's Build Something <span className="text-highlight-sunset">Amazing Together!</span>
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-pill border border-brand-treasure bg-brand-treasure/20 px-4 py-2 font-sans text-xs font-semibold text-brand-treasure transition-colors duration-200 hover:bg-brand-treasure/30"
          >
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowRightIcon size={13} />
            </motion.span>
            Get In Touch
          </a>
        </motion.div>
      </div>
    </GoldPanelCard>
  );
}
