import { motion } from "framer-motion";
import { CalendarIcon, CodeIcon, CompassIcon, MapPinIcon, SparklesIcon } from "lucide-react";

import { HeroShell, useHeroParallax } from "@/components/portfolio/HeroShell";
import { InteractiveBadge } from "@/components/portfolio/InteractiveBadge";

interface AboutHeroProps {
  onOpenSidebar?: () => void;
}

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

function PersonIllustration() {
  const parallax = useHeroParallax();
  return (
    <div
      className="pointer-events-none absolute -bottom-28 -z-0 hidden h-full items-end select-none sm:-bottom-24 md:-right-10 md:-bottom-24 md:flex lg:right-20 lg:-bottom-28 xl:right-20 xl:-bottom-40"
      style={{
        transform: `translate(${parallax.x * -8}px, ${parallax.y * -6}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <img
          src="/person.png"
          alt="Azar — Frontend Developer"
          className="max-h-[420px] w-auto object-contain object-bottom xl:max-h-[520px]"
        />
        {/* Lantern-warm flicker glow behind illustration */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.6, 0.9, 0.65, 0.85, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-12 bottom-32 -z-10 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "oklch(from var(--brand-sun) l c h / 0.4)" }}
        />
        {/* Moon reflection shimmer */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.3, 0.55, 0.3], scaleX: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-20 -bottom-2 -z-10 h-1 w-32 rounded-full blur-md"
          style={{ background: "oklch(from var(--brand-treasure) l c h / 0.6)" }}
        />
      </motion.div>
    </div>
  );
}

export function AboutHero({ onOpenSidebar }: AboutHeroProps) {
  return (
    <HeroShell
      badgeText="ABOUT ME"
      onOpenSidebar={onOpenSidebar}
      minHeight="min-h-[420px] xl:min-h-[520px]"
    >
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
            <Line>Get to know</Line>{" "}
            <Line>
              the <span className="text-highlight-sunset">developer</span> behind
            </Line>{" "}
            <Line>the code.</Line>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 max-w-md font-sans text-base text-foreground/80 md:text-lg"
            style={{ lineHeight: 1.55 }}
          >
            I'm a frontend developer who loves turning complex problems into simple, beautiful and
            intuitive solutions.
          </motion.p>

          <div className="flex flex-wrap gap-2.5">
            <InteractiveBadge icon={MapPinIcon} label="Based in Indonesia" delay={0} />
            <InteractiveBadge icon={CalendarIcon} label="21 Years Old" delay={0.15} tone="info" />
            <InteractiveBadge
              icon={CompassIcon}
              label="2+ Years Experience"
              delay={0.3}
              tone="sunset"
            />
            <InteractiveBadge
              icon={CodeIcon}
              label="Clean Code Lover"
              delay={0.45}
              tone="success"
            />
          </div>
        </div>

        <PersonIllustration />
      </div>

      {/* Sparkle accent — cinematic detail unique to about page */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-6 left-6 hidden text-brand-treasure/40 md:block"
      >
        <SparklesIcon size={18} />
      </motion.div>
    </HeroShell>
  );
}
