import { SiDribbble, SiGithub } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { AnchorIcon, MailIcon, SendIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

export function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function LetsConnect() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6"
    >
      <CardWatermark asset="sunny" position="top-right" size={140} opacity={0.06} rotate={10} />

      {/* Header */}
      <h2 className="relative mb-1.5 flex items-center gap-2 heading-section text-lg text-foreground">
        <AnchorIcon size={16} className="text-brand-sunset" />
        Let's Connect
      </h2>
      <p className="relative mb-4 font-sans text-xs leading-relaxed text-muted-foreground">
        Have a question or project idea? Drop a message or reach out through any platform.
      </p>

      {/* Primary CTA */}
      <div className="relative mb-3">
        <PirateCTAButton
          variant="primary"
          icon={<SendIcon size={13} />}
          className="w-full justify-center shadow-lg"
        >
          Send Message
        </PirateCTAButton>
      </div>

      {/* Social grid — 2×2 compact buttons */}
      <div className="relative mt-auto grid grid-cols-2 gap-2">
        <PirateCTAButton
          variant="secondary"
          icon={<MailIcon size={14} />}
          className="w-full justify-center bg-transparent shadow-none hover:bg-white/5"
        >
          Email Me
        </PirateCTAButton>
        <PirateCTAButton
          variant="secondary"
          icon={<LinkedInIcon size={14} />}
          className="w-full justify-center bg-transparent shadow-none hover:bg-white/5"
        >
          LinkedIn
        </PirateCTAButton>
        <PirateCTAButton
          variant="secondary"
          icon={<SiGithub size={14} />}
          className="w-full justify-center bg-transparent shadow-none hover:bg-white/5"
        >
          GitHub
        </PirateCTAButton>
        <PirateCTAButton
          variant="secondary"
          icon={<SiDribbble size={14} />}
          className="w-full justify-center bg-transparent shadow-none hover:bg-white/5"
        >
          Dribbble
        </PirateCTAButton>
      </div>
    </motion.section>
  );
}
