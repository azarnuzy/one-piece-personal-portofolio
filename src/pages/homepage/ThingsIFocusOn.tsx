import { motion } from "framer-motion";
import { AnchorIcon, GaugeIcon, ServerIcon, ShieldIcon, ZapIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";

const FOCUS = [
  { icon: GaugeIcon, label: "Frontend Engineering", value: 92 },
  { icon: ZapIcon, label: "Performance & Testing", value: 85 },
  { icon: ServerIcon, label: "API & Full-Stack", value: 78 },
  { icon: ShieldIcon, label: "DevOps & Security", value: 72 },
];

export function ThingsIFocusOn() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6"
    >
      <CardWatermark asset="skull" position="bottom-right" size={180} opacity={0.05} rotate={-10} />

      <div className="relative mb-4 flex shrink-0 items-center gap-2">
        <AnchorIcon size={16} className="text-brand-sunset" />
        <h2 className="heading-section text-lg text-foreground">Things I Focus On</h2>
      </div>

      <div className="relative flex flex-1 flex-col justify-center gap-3.5">
        {FOCUS.map(({ icon: Icon, label, value }, idx) => (
          <div key={label} className="group">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-2 font-sans text-xs font-medium text-card-foreground">
                <Icon size={12} className="text-accent-soft" />
                {label}
              </span>
              <span className="font-mono text-2xs text-muted-foreground tabular-nums">
                {value}%
              </span>
            </div>
            <div className="relative h-1.5 overflow-hidden rounded-full bg-muted/50">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full rounded-full bg-accent-soft dark:bg-gradient-to-r dark:from-brand-sunset dark:via-brand-sun dark:to-brand-treasure"
              >
                <span className="absolute inset-0 animate-pulse rounded-full bg-white/10" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
