import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

import { OnePieceBadge } from "@/components/portfolio/OnePieceBadge";
import { ThemeTogglePill } from "@/components/portfolio/ThemeTogglePill";
import { useTheme } from "@/components/theme-provider";
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

function FloatingParticles() {
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
}

interface HeroShellProps {
  badgeText: string;
  onOpenSidebar?: () => void;
  minHeight?: string;
  children: React.ReactNode;
}

export function HeroShell({
  badgeText,
  onOpenSidebar,
  minHeight = "min-h-[400px]",
  children,
}: HeroShellProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [parallax, setParallax] = useState<ParallaxState>({ x: 0, y: 0 });

  useEffect(() => {
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
                ? "bg-gradient-to-r from-background/95 via-background/75 to-background/12"
                : "bg-gradient-to-r from-background/92 via-background/65 to-background/8",
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        </div>

        <FloatingParticles />

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
