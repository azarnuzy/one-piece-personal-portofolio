import { motion } from "framer-motion";
import { AnchorIcon, MailIcon, MapPinIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { memo } from "react";

import { InteractiveBadge } from "@/components/portfolio/InteractiveBadge";

function Line({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

function ContactHeroContentInner() {
  return (
    <>
      <div className="relative flex flex-1 items-center">
        <div className="z-10 max-w-[860px] flex-1 px-4 pb-6 md:px-8 md:pb-8">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
            className="mb-3 heading-display text-3xl text-foreground md:text-5xl xl:text-6xl"
          >
            <Line>Let's</Line>{" "}
            <Line>
              <span className="text-highlight-sunset">Connect</span>
            </Line>{" "}
            <Line>&amp; Build Together.</Line>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 max-w-md font-sans text-base text-foreground/80 md:text-lg"
            style={{ lineHeight: 1.55 }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from you and bring your
            ideas to life.
          </motion.p>

          <div className="flex flex-wrap gap-2.5">
            <InteractiveBadge icon={MapPinIcon} label="Based in Indonesia" delay={0} />
            <InteractiveBadge icon={ZapIcon} label="Quick Responder" delay={0.15} tone="success" />
            <InteractiveBadge icon={MailIcon} label="Open to Freelance" delay={0.3} tone="sunset" />
            <InteractiveBadge
              icon={AnchorIcon}
              label="Let's Sail Together"
              delay={0.45}
              tone="info"
            />
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-6 left-6 hidden text-brand-treasure/40 md:block"
      >
        <SparklesIcon size={18} />
      </motion.div>
    </>
  );
}

export const ContactHeroContent = memo(ContactHeroContentInner);
