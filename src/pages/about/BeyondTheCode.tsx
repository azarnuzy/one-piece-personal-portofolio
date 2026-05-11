import { motion } from "framer-motion";
import {
  CoffeeIcon,
  Gamepad2Icon,
  LanguagesIcon,
  MapPinIcon,
  MusicIcon,
  TvIcon,
} from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const INTERESTS = [
  { icon: TvIcon, label: "Anime & One Piece", tone: "treasure" as const },
  { icon: Gamepad2Icon, label: "Gaming", tone: "sunset" as const },
  { icon: CoffeeIcon, label: "Coffee Enthusiast", tone: "info" as const },
  { icon: MusicIcon, label: "Lo-Fi Music", tone: "success" as const },
];

const LANGUAGES = [
  { label: "Indonesian", level: "Native", tone: "treasure" as const },
  { label: "English", level: "Professional", tone: "info" as const },
];

const TONE_CLASSES = {
  treasure: { bg: "bg-brand-treasure/15", text: "text-brand-treasure" },
  sunset: { bg: "bg-brand-sunset/15", text: "text-brand-sunset" },
  info: { bg: "bg-brand-info/15", text: "text-brand-info" },
  success: { bg: "bg-brand-success/15", text: "text-brand-success" },
};

export function BeyondTheCode() {
  return (
    <GoldPanelCard padding="sm" className="h-full">
      <CardWatermark asset="sunny" position="bottom-right" size={100} opacity={0.03} />
      <SectionHeader icon={MapPinIcon} title="Beyond the Code" tone="treasure" />

      <div className="flex flex-col gap-4">
        {/* Hobbies / Interests */}
        <div className="grid grid-cols-2 gap-2">
          {INTERESTS.map((item, i) => {
            const tone = TONE_CLASSES[item.tone];
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 p-2"
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md ${tone.bg} ${tone.text}`}
                >
                  <Icon size={12} />
                </div>
                <span className="font-sans text-[10px] font-medium text-foreground/80">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Languages */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <LanguagesIcon size={11} />
              <span className="font-display text-[10px] font-bold tracking-wider uppercase">
                Languages
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {LANGUAGES.map((lang) => {
                const tone = TONE_CLASSES[lang.tone];
                return (
                  <div key={lang.label} className="flex items-center justify-between gap-2">
                    <span className="font-sans text-2xs text-foreground/85">{lang.label}</span>
                    <span
                      className={`rounded-pill border px-1.5 py-0 font-sans text-[9px] font-bold uppercase ${tone.text} border-current/30 bg-current/5`}
                    >
                      {lang.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPinIcon size={11} />
              <span className="font-display text-[10px] font-bold tracking-wider uppercase">
                Base
              </span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg border border-brand-treasure/20 bg-brand-treasure/5 p-2 ring-1 ring-brand-treasure/10">
              <span className="font-display text-xs font-bold text-brand-treasure">
                Malang, Indonesia
              </span>
              <span className="font-sans text-[10px] text-muted-foreground/80">WIB (UTC+7)</span>
            </div>
          </div>
        </div>
      </div>
    </GoldPanelCard>
  );
}
