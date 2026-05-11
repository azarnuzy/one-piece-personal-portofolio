import { motion } from "framer-motion";
import { AwardIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";

const CERTIFICATIONS = [
  { title: "Frontend Developer Bootcamp", platform: "Hacktiv8", year: "2023" },
  { title: "React Expert Path", platform: "Dicoding", year: "2024" },
  { title: "JavaScript Algorithms", platform: "freeCodeCamp", year: "2024" },
  { title: "Responsive Web Design", platform: "freeCodeCamp", year: "2023" },
];

export function Certifications() {
  return (
    <GoldPanelCard padding="sm" className="h-full">
      <CardWatermark asset="sunny" position="bottom-right" size={110} opacity={0.05} />
      <SectionHeader icon={AwardIcon} title="Courses & Certifications" tone="sunset" />

      <ul className="flex flex-col gap-1.5">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.li
            key={cert.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="group flex items-start gap-2 rounded-lg border border-border/50 bg-card/40 px-2.5 py-1.5 backdrop-blur-md transition-colors hover:border-brand-treasure/40"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-treasure/15 text-brand-treasure">
              <AwardIcon size={11} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-sans text-2xs leading-snug font-semibold text-foreground/90 group-hover:text-foreground">
                {cert.title}
              </p>
              <p className="font-sans text-[10px] leading-snug text-muted-foreground">
                {cert.platform} · {cert.year}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </GoldPanelCard>
  );
}
