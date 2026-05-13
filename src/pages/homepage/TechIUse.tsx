import {
  SiDocker,
  SiExpress,
  SiGit,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { CpuIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";

const TECH = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiNextdotjs, label: "Next.js", color: "#FFFFFF" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#38BDF8" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#5FA04E" },
  { Icon: SiExpress, label: "Express", color: "#E0E0E0" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
  { Icon: SiVuedotjs, label: "Vue.js", color: "#4FC08D" },
];

export function TechIUse() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6"
    >
      <CardWatermark asset="sunny" position="bottom-right" size={170} opacity={0.07} rotate={-6} />

      <div className="relative mb-4 flex shrink-0 items-center gap-2">
        <CpuIcon size={16} className="text-brand-sunset" />
        <h2 className="heading-section text-lg text-foreground">Tech I Use</h2>
      </div>

      <div className="relative grid grid-cols-4 gap-2.5">
        {TECH.map(({ Icon, label, color }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -3, scale: 1.04 }}
            className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-border/40 bg-background/40 p-2.5 transition-colors hover:border-brand-treasure/50 hover:bg-brand-treasure/5"
          >
            <Icon size={20} style={{ color }} className="transition-transform" />
            <span className="font-sans text-2xs text-muted-foreground group-hover:text-card-foreground">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
