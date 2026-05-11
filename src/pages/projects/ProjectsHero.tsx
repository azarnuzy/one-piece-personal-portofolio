import { motion, useInView } from "framer-motion";
import { AnchorIcon, LayersIcon, TargetIcon, ZapIcon, type LucideIcon } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

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

type NumericStat = {
  kind: "numeric";
  target: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
};

type TextStat = {
  kind: "text";
  value: string;
  label: string;
  icon: LucideIcon;
};

type Stat = NumericStat | TextStat;

const STATS: Stat[] = [
  { kind: "numeric", target: 6, suffix: "+", label: "Projects Completed", icon: ZapIcon },
  { kind: "numeric", target: 2, suffix: "+", label: "Years Building", icon: AnchorIcon },
  { kind: "text", value: "React + TS", label: "Latest Stack", icon: LayersIcon },
  { kind: "text", value: "Web · SaaS · EdTech", label: "Primary Domain", icon: TargetIcon },
];

function NumericStatItem({ stat, delay }: { stat: NumericStat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(stat.target, inView, 1000 + delay * 150);
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className="flex flex-1 flex-col items-center gap-1 px-3 py-3 transition-colors duration-200 hover:bg-card/60"
    >
      <Icon size={13} className="text-brand-treasure/60" />
      <div className="flex items-baseline gap-0.5">
        <span className="heading-display text-xl leading-none text-brand-treasure">{count}</span>
        <span className="font-display text-sm leading-none font-bold text-brand-sun">
          {stat.suffix}
        </span>
      </div>
      <span className="text-center font-sans text-2xs leading-tight text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}

function TextStatItem({ stat }: { stat: TextStat }) {
  const Icon = stat.icon;
  return (
    <div className="flex flex-1 flex-col items-center gap-1 px-3 py-3 transition-colors duration-200 hover:bg-card/60">
      <Icon size={13} className="text-brand-treasure/60" />
      <span className="text-center font-display text-sm leading-tight font-bold text-brand-treasure">
        {stat.value}
      </span>
      <span className="text-center font-sans text-2xs leading-tight text-muted-foreground">
        {stat.label}
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

function ProjectsHeroContentInner() {
  return (
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
          {STATS.map((stat, i) =>
            stat.kind === "numeric" ? (
              <NumericStatItem key={stat.label} stat={stat} delay={i} />
            ) : (
              <TextStatItem key={stat.label} stat={stat} />
            ),
          )}
        </motion.div>
      </div>
    </div>
  );
}

export const ProjectsHeroContent = memo(ProjectsHeroContentInner);
