import { motion } from "framer-motion";
import { CoffeeIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";

export function DailyFuel() {
  return (
    <section className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6">
      <CardWatermark asset="skull" position="bottom-right" size={150} opacity={0.07} rotate={8} />

      <div className="relative mb-2 flex shrink-0 items-center gap-2">
        <CoffeeIcon size={15} className="text-brand-sunset" />
        <h2 className="heading-section text-base text-foreground">Daily Fuel</h2>
      </div>

      <p className="relative font-sans text-xs leading-relaxed text-muted-foreground">
        Essential coffee for clean code and great ideas.
      </p>

      <div className="relative mt-auto flex items-center gap-2 pt-3">
        <div className="relative">
          <motion.div
            animate={{ y: [-2, -6, -2], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-treasure/60 blur-[2px]"
          />
          <CoffeeIcon size={18} className="text-brand-sunset" />
        </div>
        <span className="font-sans text-xs font-medium text-card-foreground">2 / 3 cups today</span>
      </div>
    </section>
  );
}
