import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { createContext, memo, useContext, useEffect, useState } from "react";

import { OnePieceBadge } from "@/components/portfolio/OnePieceBadge";
import { PersistentPerson } from "@/components/portfolio/PersistentPerson";
import { ThemeTogglePill } from "@/components/portfolio/ThemeTogglePill";
import { cn } from "@/lib/utils";

interface ParallaxState {
  x: number;
  y: number;
}

const HeroParallaxContext = createContext<ParallaxState>({ x: 0, y: 0 });

export function useHeroParallax(): ParallaxState {
  return useContext(HeroParallaxContext);
}

const PARTICLES = [
  { x: 12, y: 22, size: 3, delay: 0 },
  { x: 38, y: 64, size: 2, delay: 1.2 },
  { x: 62, y: 18, size: 2, delay: 2.1 },
  { x: 78, y: 44, size: 3, delay: 0.6 },
  { x: 88, y: 72, size: 2, delay: 1.8 },
  { x: 24, y: 80, size: 2, delay: 2.6 },
  { x: 52, y: 30, size: 2, delay: 0.9 },
  { x: 70, y: 88, size: 3, delay: 1.5 },
];

const FloatingParticles = memo(function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {PARTICLES.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-treasure"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px oklch(from var(--brand-treasure) l c h / 0.7)",
            willChange: "transform, opacity",
          }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.85, 0.3] }}
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
});

// Persistent backdrop — renders BOTH bg images stacked, opacity toggled by `dark:` variant.
// No `src` swap = no decode flicker on theme change. Both images preloaded by the browser.
const HeroBackdrop = memo(function HeroBackdrop() {
  return (
    <div className="absolute inset-0">
      {/* Light bg — visible only when html does NOT have .dark */}
      <img
        src="/background-light.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ease-out dark:opacity-0"
      />
      {/* Dark bg — visible only when html has .dark */}
      <img
        src="/background-night.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-300 ease-out dark:opacity-100"
      />

      {/* Theme-aware gradient overlay (uses dark: variant on opacity stops) */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/65 to-background/8 dark:from-background/95 dark:via-background/75 dark:to-background/12" />

      {/* Slow horizontal fog — CSS keyframe (cheaper than framer JS loop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 motion-safe:animate-[hero-fog-drift_30s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 60%, oklch(from var(--brand-info) l c h / 0.18), transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Bottom fade into body bg */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
});

// ─── Project thumbnail illustration (replaces person on detail pages) ────────

interface ProjectThumbnailIllustrationProps {
  src: string;
}

export function ProjectThumbnailIllustration({ src }: ProjectThumbnailIllustrationProps) {
  const parallax = useHeroParallax();

  return (
    <div
      className="pointer-events-none absolute right-2 bottom-0 z-0 hidden h-full items-end select-none md:flex lg:right-10 xl:right-16"
      style={{
        transform: `translate3d(${parallax.x * -5}px, ${parallax.y * -3}px, 0)`,
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      <motion.div
        className="relative pb-1"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
      >
        <div className="pointer-events-none absolute -bottom-1 left-1/2 h-5 w-4/5 -translate-x-1/2 rounded-full bg-brand-treasure/25 blur-2xl" />
        <img
          src={src}
          alt=""
          aria-hidden
          draggable={false}
          className="max-h-[280px] w-auto object-contain object-bottom drop-shadow-[0_16px_50px_oklch(from_var(--brand-treasure)_l_c_h_/_0.4)] xl:max-h-[360px]"
        />
      </motion.div>
    </div>
  );
}

interface HeroShellProps {
  badgeText: string;
  onOpenSidebar?: () => void;
  minHeight?: string;
  illustration?: React.ReactNode;
  children: React.ReactNode;
}

export function HeroShell({
  badgeText,
  onOpenSidebar,
  minHeight = "min-h-[420px] xl:min-h-[500px]",
  illustration,
  children,
}: HeroShellProps) {
  const [parallax, setParallax] = useState<ParallaxState>({ x: 0, y: 0 });

  useEffect(() => {
    // Respect reduced-motion: skip parallax entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handler = (e: MouseEvent) => {
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <HeroParallaxContext.Provider value={parallax}>
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <FloatingParticles />

        {illustration ?? <PersistentPerson />}

        <div className={cn("relative z-10 flex flex-col", minHeight)}>
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
                <OnePieceBadge text={badgeText} />
              </span>
            </div>
            <ThemeTogglePill />
          </div>

          {children}
        </div>
      </section>
    </HeroParallaxContext.Provider>
  );
}
