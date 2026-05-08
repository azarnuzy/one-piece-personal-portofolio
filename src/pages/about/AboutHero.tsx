import { motion } from "framer-motion";
import {
  CalendarIcon,
  CodeIcon,
  CompassIcon,
  MapPinIcon,
  MenuIcon,
  SparklesIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { InteractiveBadge } from "@/components/portfolio/InteractiveBadge";
import { OnePieceBadge } from "@/components/portfolio/OnePieceBadge";
import { ThemeTogglePill } from "@/components/portfolio/ThemeTogglePill";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

interface AboutHeroProps {
  onOpenSidebar?: () => void;
}

export function AboutHero({ onOpenSidebar }: AboutHeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Mouse parallax for the illustration / floating particles
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background — same cinematic image as homepage */}
      <div className="absolute inset-0">
        <img
          src={isDark ? "/background-night.png" : "/background-light.png"}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
        <div
          className={cn(
            "absolute inset-0",
            isDark
              ? "bg-gradient-to-r from-background/95 via-background/75 to-background/15"
              : "bg-gradient-to-r from-background/92 via-background/65 to-background/10",
          )}
        />
        {/* Slow horizontal fog */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          animate={{ x: ["-5%", "5%", "-5%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 70% 60%, oklch(from var(--brand-info) l c h / 0.18), transparent 70%)",
          }}
        />
        {/* Bottom dissolve */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Floating ember / glow particles */}
      <FloatingParticles />

      <div className="relative z-10 flex min-h-[420px] flex-col xl:min-h-[520px]">
        {/* Top bar — matches homepage */}
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSidebar}
              aria-label="Open navigation menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground md:hidden"
            >
              <MenuIcon size={18} />
            </button>
            <span className="hidden sm:block">
              <OnePieceBadge text="ABOUT ME" />
            </span>
          </div>
          <ThemeTogglePill />
        </div>

        {/* Hero body */}
        <div className="relative flex flex-1 items-center">
          <div className="z-10 max-w-[860px] flex-1 px-4 pb-6 md:px-8 md:pb-8">
            {/* Main heading with stagger reveal */}
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

            {/* Floating badges */}
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

          {/* Person illustration with mouse parallax + slow floating */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              transform: `translate(${parallax.x * -8}px, ${parallax.y * -6}px)`,
            }}
            className="pointer-events-none absolute -bottom-28 -z-0 hidden h-full items-end select-none sm:-bottom-24 md:-right-10 md:-bottom-24 md:flex lg:right-20 lg:-bottom-28 xl:right-20 xl:-bottom-40"
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

        {/* Sparkle accent bottom-left for cinematic feel */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-6 left-6 hidden text-brand-treasure/40 md:block"
        >
          <SparklesIcon size={18} />
        </motion.div>
      </div>
    </section>
  );
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

function FloatingParticles() {
  // Deterministic positions to avoid hydration issues — small set, looks ambient.
  const dots = [
    { x: 12, y: 22, size: 3, delay: 0 },
    { x: 38, y: 64, size: 2, delay: 1.2 },
    { x: 62, y: 18, size: 2, delay: 2.1 },
    { x: 78, y: 44, size: 3, delay: 0.6 },
    { x: 88, y: 72, size: 2, delay: 1.8 },
    { x: 24, y: 80, size: 2, delay: 2.6 },
    { x: 52, y: 30, size: 2, delay: 0.9 },
    { x: 70, y: 88, size: 3, delay: 1.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-treasure"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px oklch(from var(--brand-treasure) l c h / 0.7)",
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.3, 0.85, 0.3],
          }}
          transition={{
            duration: 4 + d.delay,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
