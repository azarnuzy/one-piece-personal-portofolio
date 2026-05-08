import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedDividerProps {
  className?: string;
  /** Show compass ornament in the middle (default: true). */
  ornament?: boolean;
}

export function AnimatedDivider({ className, ornament = true }: AnimatedDividerProps) {
  return (
    <div className={cn("relative flex items-center gap-3", className)} aria-hidden>
      <div className="relative h-px flex-1 overflow-hidden bg-gradient-to-r from-transparent via-brand-treasure/40 to-transparent">
        <motion.div
          className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-brand-treasure to-transparent"
          animate={{ x: ["0%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {ornament && (
        <motion.svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          className="shrink-0 text-brand-treasure/70"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
          <path
            d="M12 3 L12 21 M3 12 L21 12 M5.6 5.6 L18.4 18.4 M5.6 18.4 L18.4 5.6"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        </motion.svg>
      )}
      <div className="relative h-px flex-1 overflow-hidden bg-gradient-to-l from-transparent via-brand-treasure/40 to-transparent">
        <motion.div
          className="absolute inset-y-0 -right-1/3 w-1/3 bg-gradient-to-l from-transparent via-brand-treasure to-transparent"
          animate={{ x: ["0%", "-400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
