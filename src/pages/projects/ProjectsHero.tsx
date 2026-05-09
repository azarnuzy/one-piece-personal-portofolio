import { motion, useInView } from "framer-motion";
import { AnchorIcon, HeartIcon, UsersIcon, ZapIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { HeroShell, useHeroParallax } from "@/components/portfolio/HeroShell";

interface ProjectsHeroProps {
  onOpenSidebar?: () => void;
}

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCurrent(target);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [inView, target, duration]);
  return current;
}

const STATS = [
  { target: 6, suffix: "+", label: "Projects Completed", icon: ZapIcon },
  { target: 2, suffix: "+", label: "Years Building", icon: AnchorIcon },
  { target: 10, suffix: "K+", label: "Users Impacted", icon: UsersIcon },
  { target: 100, suffix: "%", label: "Passion Put In", icon: HeartIcon },
];

function StatItem({
  target,
  suffix,
  label,
  icon: Icon,
  delay = 0,
}: (typeof STATS)[number] & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(target, inView, 1000 + delay * 150);

  return (
    <div
      ref={ref}
      className="flex flex-1 flex-col items-center gap-1 px-3 py-3 transition-colors duration-200 hover:bg-card/60"
    >
      <Icon size={13} className="text-brand-treasure/60" />
      <div className="flex items-baseline gap-0.5">
        <span className="heading-display text-xl leading-none text-brand-treasure">{count}</span>
        <span className="font-display text-sm leading-none font-bold text-brand-sun">{suffix}</span>
      </div>
      <span className="text-center font-sans text-2xs leading-tight text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function HeadingLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
      className="pointer-events-none absolute -bottom-24 -z-0 hidden h-full items-end select-none md:-right-8 md:-bottom-20 md:flex lg:right-16 lg:-bottom-24 xl:right-16 xl:-bottom-36"
      style={{
        transform: `translate(${parallax.x * -5}px, ${parallax.y * -3}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <img
        src="/person.png"
        alt="Azar — Frontend Developer"
        className="max-h-[400px] w-auto object-contain object-bottom xl:max-h-[490px]"
      />

      {/* Quote card */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto absolute top-10 -right-4 w-[190px] rounded-2xl border border-brand-treasure/25 bg-card/85 p-4 shadow-[var(--shadow-card-lg)] backdrop-blur-md xl:top-14 xl:right-0 xl:w-[205px]"
      >
        <span
          aria-hidden
          className="block heading-display text-3xl leading-none text-brand-treasure/70"
        >
          "
        </span>
        <p className="mt-1 font-display text-xs leading-relaxed text-foreground/85 italic">
          Every project is a new adventure and a chance to learn something incredible.
        </p>
      </motion.div>
    </div>
  );
}

export function ProjectsHero({ onOpenSidebar }: ProjectsHeroProps) {
  return (
    <HeroShell
      badgeText="PROJECTS"
      onOpenSidebar={onOpenSidebar}
      minHeight="min-h-[400px] md:min-h-[460px]"
    >
      <div className="relative flex flex-1 items-center">
        <div className="z-10 max-w-[520px] flex-1 px-4 pb-8 md:px-8 md:pb-10">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
            }}
            className="mb-3 heading-display text-4xl text-foreground md:text-5xl xl:text-6xl"
          >
            <HeadingLine>Things I've</HeadingLine>{" "}
            <HeadingLine>
              <span className="text-highlight-sunset">Built</span>
            </HeadingLine>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mb-6 max-w-xs font-sans text-sm text-foreground/70 md:max-w-sm md:text-base"
            style={{ lineHeight: 1.6 }}
          >
            A collection of projects that represent my skills, experience and passion for creating
            value.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.56 }}
            className="flex divide-x divide-border/40 overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm"
          >
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} {...stat} delay={i} />
            ))}
          </motion.div>
        </div>

        <PersonIllustration />
      </div>
    </HeroShell>
  );
}
