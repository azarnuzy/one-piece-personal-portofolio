import { motion } from "framer-motion";
import { type ComponentType } from "react";

import { cn } from "@/lib/utils";

interface TechBadgeProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  iconColor?: string;
  delay?: number;
  className?: string;
}

export function TechBadge({
  icon: Icon,
  label,
  iconColor = "text-brand-treasure",
  delay = 0,
  className,
}: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, scale: 1.04 }}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-3 py-2 backdrop-blur-md transition-colors duration-300 hover:border-brand-treasure/40",
        className,
      )}
    >
      <motion.span
        whileHover={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 0.5 }}
        className="flex shrink-0 items-center justify-center"
      >
        <Icon size={16} className={cn("transition-transform duration-300", iconColor)} />
      </motion.span>
      <span className="font-sans text-xs font-medium text-foreground/90 group-hover:text-foreground">
        {label}
      </span>
    </motion.div>
  );
}
