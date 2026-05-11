import { motion } from "framer-motion";
import { DownloadIcon, FileTextIcon } from "lucide-react";
import { memo } from "react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

function DownloadCVCardInner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex flex-col overflow-hidden p-4"
    >
      <CardWatermark asset="skull" position="bottom-right" size={100} opacity={0.05} rotate={15} />

      {/* Header */}
      <div className="relative mb-3 flex items-center gap-2">
        <DownloadIcon size={14} className="text-brand-sunset" />
        <h2 className="heading-section text-sm text-foreground">Download My CV</h2>
      </div>

      {/* CV Preview row — compact, no highlights list */}
      <div className="relative mb-3 flex items-center gap-3 rounded-xl border border-border/40 bg-background/40 p-2.5">
        <div className="flex h-10 w-9 shrink-0 flex-col items-center justify-center rounded-lg border border-brand-treasure/30 bg-brand-treasure/10">
          <FileTextIcon size={15} className="text-brand-treasure" />
          <span className="mt-0 font-sans text-[9px] font-bold tracking-wide text-brand-treasure/80 uppercase">
            pdf
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="line-clamp-1 font-sans text-xs font-semibold text-foreground">
            Azar's Resume.pdf
          </span>
          <span className="font-sans text-2xs text-muted-foreground">
            Frontend Developer · ~256 KB
          </span>
        </div>
      </div>

      {/* Download button */}
      <PirateCTAButton
        variant="primary"
        icon={<DownloadIcon size={13} />}
        className="w-full justify-center shadow-md"
        onClick={() => window.open("/cv/azar-resume.pdf", "_blank")}
      >
        Download CV
      </PirateCTAButton>
    </motion.section>
  );
}

export const DownloadCVCard = memo(DownloadCVCardInner);
