import { motion } from "framer-motion";
import { CheckCircle2Icon, TrophyIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const HIGHLIGHTS = [
  "Focused on performance and usability",
  "Clean code and scalable architecture",
  "Real-world problem solving",
  "Continuous learning and improvement",
  "Accessibility optimized",
];

export function ProjectHighlights() {
  return (
    <GoldPanelCard padding="md" ornaments={false}>
      <CardWatermark asset="skull" position="top-right" size={80} opacity={0.04} rotate={12} />
      <SectionHeader icon={TrophyIcon} title="Project Highlights" tone="sunset" />

      <ul className="flex flex-col gap-1.5">
        {HIGHLIGHTS.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-2.5 rounded-lg px-1.5 py-1.5 transition-colors duration-150 hover:bg-brand-treasure/5"
          >
            <CheckCircle2Icon
              size={13}
              className="mt-0.5 shrink-0 text-brand-success"
              aria-hidden
            />
            <span className="font-sans text-xs leading-snug text-foreground/80">{item}</span>
          </motion.li>
        ))}
      </ul>
    </GoldPanelCard>
  );
}
