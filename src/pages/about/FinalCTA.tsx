import { motion } from "framer-motion";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

export function FinalCTA() {
  return (
    <GoldPanelCard padding="lg" className="text-center">
      {/* Breathing ambient glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "oklch(from var(--brand-sun) l c h / 0.28)" }}
      />

      {/* Floating sparkles */}
      <FloatingSparkles />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl"
      >
        <h2 className="mb-3 heading-display text-2xl text-foreground md:text-4xl">
          Let's Build Something <span className="text-highlight-sunset">Amazing Together!</span>
        </h2>
        <p className="mx-auto mb-6 max-w-lg font-sans text-sm text-foreground/75 md:text-base">
          Whether it's a wild idea or a real product, I'd love to set sail on the next adventure
          with you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <PirateCTAButton
            variant="primary"
            icon={
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowRightIcon size={16} />
              </motion.span>
            }
          >
            Get In Touch
          </PirateCTAButton>
          <PirateCTAButton variant="secondary" icon={<SparklesIcon size={14} />}>
            View My Work
          </PirateCTAButton>
        </div>
      </motion.div>
    </GoldPanelCard>
  );
}

function FloatingSparkles() {
  const stars = [
    { x: 8, y: 30, delay: 0 },
    { x: 18, y: 70, delay: 1.4 },
    { x: 86, y: 22, delay: 0.7 },
    { x: 92, y: 68, delay: 2.1 },
    { x: 50, y: 12, delay: 1.0 },
    { x: 45, y: 86, delay: 1.8 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-brand-treasure"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 2.6 + s.delay, delay: s.delay, repeat: Infinity }}
        >
          <SparklesIcon size={12} />
        </motion.span>
      ))}
    </div>
  );
}
