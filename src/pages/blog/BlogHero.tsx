import { motion } from "framer-motion";

import { HeroShell, useHeroParallax } from "@/components/portfolio/HeroShell";
import { cn } from "@/lib/utils";

import { CATEGORIES, type BlogCategory } from "./data";

// ─── Right visual ─────────────────────────────────────────────────────────────

function PersonIllustration() {
  const parallax = useHeroParallax();
  return (
    <div
      className="pointer-events-none absolute -bottom-24 -z-0 hidden h-full items-end select-none md:-right-6 md:-bottom-20 md:flex lg:right-12 lg:-bottom-24 xl:right-16 xl:-bottom-32"
      style={{
        transform: `translate(${parallax.x * -6}px, ${parallax.y * -4}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <img
          src="/person.png"
          alt="Azar — reading on the ship deck"
          className="max-h-[380px] w-auto object-contain object-bottom xl:max-h-[460px]"
        />

        {/* Lantern warm flicker */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.5, 0.8, 0.55, 0.75, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-10 bottom-28 -z-10 h-36 w-36 rounded-full blur-3xl"
          style={{ background: "oklch(from var(--brand-sun) l c h / 0.38)" }}
        />

        {/* Moon shimmer on water */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.25, 0.5, 0.25], scaleX: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-16 -bottom-1 -z-10 h-1 w-28 rounded-full blur-md"
          style={{ background: "oklch(from var(--brand-treasure) l c h / 0.6)" }}
        />
      </motion.div>
    </div>
  );
}

// ─── Category filter pill ─────────────────────────────────────────────────────

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-200",
        active
          ? "bg-brand-sun/90 text-primary-foreground shadow-sm"
          : "border border-border/60 bg-card/50 text-muted-foreground backdrop-blur-sm hover:border-brand-treasure/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

// ─── Heading line animation ───────────────────────────────────────────────────

function HeadingLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 14, filter: "blur(5px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

// ─── Blog Hero ────────────────────────────────────────────────────────────────

interface BlogHeroProps {
  onOpenSidebar?: () => void;
  activeCategory: BlogCategory;
  onSelectCategory: (cat: BlogCategory) => void;
}

export function BlogHero({ onOpenSidebar, activeCategory, onSelectCategory }: BlogHeroProps) {
  return (
    <HeroShell
      badgeText="WELCOME TO MY PORTFOLIO"
      onOpenSidebar={onOpenSidebar}
      minHeight="min-h-[380px] md:min-h-[440px]"
    >
      <div className="relative flex flex-1 items-center">
        <div className="z-10 max-w-[860px] flex-1 px-4 pb-7 md:px-8 md:pb-9">
          {/* Main heading */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
            }}
            className="mb-3 heading-display text-5xl text-foreground md:text-6xl xl:text-7xl"
          >
            <HeadingLine>
              <span className="text-highlight-sunset">Blog</span>
            </HeadingLine>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mb-5 max-w-sm font-sans text-sm text-foreground/70 md:max-w-md md:text-base"
            style={{ lineHeight: 1.6 }}
          >
            Sharing my journey, tutorials, insights, and experiences in the world of frontend
            development.
          </motion.p>

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.46 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.value}
                label={cat.label}
                active={activeCategory === cat.value}
                onClick={() => onSelectCategory(cat.value)}
              />
            ))}
          </motion.div>
        </div>

        <PersonIllustration />
      </div>
    </HeroShell>
  );
}
