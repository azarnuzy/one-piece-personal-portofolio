import { motion } from "framer-motion";
import { MailIcon, SparklesIcon } from "lucide-react";

import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

export function ProjectsCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative overflow-hidden p-5"
    >
      {/* Subtle warm gradient at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-xl"
        style={{
          background:
            "linear-gradient(to top, oklch(from var(--brand-sun) l c h / 0.06), transparent)",
        }}
      />

      {/* Icon */}
      <div className="mb-3 flex justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-treasure/30 bg-brand-treasure/10">
          <SparklesIcon size={18} className="text-brand-treasure" />
        </div>
      </div>

      <h3 className="mb-1 text-center heading-section text-sm text-foreground">
        Have an idea in mind?
      </h3>
      <p className="mb-4 text-center font-sans text-xs leading-relaxed text-muted-foreground">
        Let's build something amazing together!
      </p>

      <div className="flex justify-center">
        <PirateCTAButton icon={<MailIcon size={14} />} variant="primary">
          Get In Touch
        </PirateCTAButton>
      </div>
    </motion.div>
  );
}
