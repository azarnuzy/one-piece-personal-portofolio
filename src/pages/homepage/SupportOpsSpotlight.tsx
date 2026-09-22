import { motion } from "framer-motion";
import { ArrowRightIcon, ExternalLinkIcon, RocketIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

const STATS = [
  { value: "78", label: "AI eval cases" },
  { value: "~Rp113", label: "Model cost / session" },
  { value: "20", label: "Architecture decisions" },
  { value: "2", label: "Channels, one AI Agent" },
];

export function SupportOpsSpotlight() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6"
    >
      <CardWatermark asset="skull" position="bottom-right" size={160} opacity={0.05} rotate={-8} />

      <div className="relative mb-1.5 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 heading-section text-lg text-foreground">
          <RocketIcon size={16} className="text-brand-sunset" />
          Latest Project
        </h2>
        <span className="chip-treasure">Personal Project</span>
      </div>
      <p className="relative mb-4 font-sans text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-card-foreground">SupportOps</span> — an AI-first,
        multi-tenant support platform. The AI Agent answers every conversation from grounded
        knowledge and live business tools, then hands off to a human with full context when it can't
        resolve safely.
      </p>

      <div className="relative mb-4 grid grid-cols-2 gap-2.5">
        {STATS.map(({ value, label }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="rounded-lg border border-border/40 bg-muted/60 p-3"
          >
            <p className="font-display text-xl font-bold text-brand-treasure">{value}</p>
            <p className="font-sans text-2xs text-muted-foreground">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-auto grid grid-cols-2 gap-2">
        <PirateCTAButton
          variant="primary"
          icon={<ExternalLinkIcon size={13} />}
          href="https://support.azarnuzy.com"
          className="w-full justify-center"
        >
          Visit Live
        </PirateCTAButton>
        <PirateCTAButton
          variant="secondary"
          icon={<ArrowRightIcon size={13} />}
          to="/projects/supportops"
          className="w-full justify-center dark:bg-transparent dark:shadow-none dark:hover:bg-white/5"
        >
          Case Study
        </PirateCTAButton>
      </div>
    </motion.section>
  );
}
