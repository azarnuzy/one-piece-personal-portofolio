import { motion } from "framer-motion";
import { AnchorIcon, LayersIcon, RocketIcon, ServerIcon, ShieldCheckIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";

const FOCUS = [
  {
    icon: LayersIcon,
    label: "Full-Stack Product Engineering",
    description: "React/Next.js frontends backed by Node.js & API design.",
  },
  {
    icon: RocketIcon,
    label: "AI-Powered Platforms",
    description: "Shipping Sygma at Cakra AI — automation used by enterprise clients.",
  },
  {
    icon: ServerIcon,
    label: "Performance & DevOps",
    description: "CI/CD, Docker, and Lighthouse-driven optimization.",
  },
  {
    icon: ShieldCheckIcon,
    label: "Reliable, Maintainable Code",
    description: "TypeScript-first, test-covered, built to scale with the team.",
  },
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
        {FOCUS.map(({ icon: Icon, label, description }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-start gap-2.5"
          >
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/10 text-accent-soft">
              <Icon size={13} />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-xs font-medium text-card-foreground">{label}</p>
              <p className="truncate font-sans text-2xs text-muted-foreground">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
