import { SiReact, SiTailwindcss, SiTypescript } from "@icons-pack/react-simple-icons";
import { CheckIcon, CompassIcon, ScrollTextIcon, ZapIcon } from "lucide-react";

import { OnePieceBadge } from "@/components/portfolio/OnePieceBadge";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";
import { ThemeTogglePill } from "@/components/portfolio/ThemeTogglePill";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const TECH_CHIPS = [
  { icon: SiReact, label: "React", colorClass: "text-brand-info" },
  { icon: SiTailwindcss, label: "Tailwind CSS", colorClass: "text-brand-success" },
  { icon: SiTypescript, label: "TypeScript", colorClass: "text-brand-info" },
  { icon: ZapIcon, label: "WebSocket", colorClass: "text-brand-success" },
];

const STATS = [
  { icon: ZapIcon, text: "5+ Projects Completed" },
  { icon: CompassIcon, text: "2+ Years Experience" },
  { icon: CheckIcon, text: "Clean Code Lover" },
];

function WheelIcon({ size = 16 }: { size?: number }) {
  return (
    <span
      className="block shrink-0 bg-current"
      style={{
        width: size,
        height: size,
        maskImage: "url(/svg/captains_wheel.svg)",
        WebkitMaskImage: "url(/svg/captains_wheel.svg)",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center",
      }}
    />
  );
}

export function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={isDark ? "/background-night.png" : "/background-light.png"}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
        {/* Gradient overlay: heavy on left for text legibility, fades to clear on right */}
        <div
          className={cn(
            "absolute inset-0",
            isDark
              ? "bg-gradient-to-r from-background/95 via-background/75 to-background/10"
              : "bg-gradient-to-r from-background/92 via-background/65 to-background/5",
          )}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex min-h-[430px] flex-col xl:min-h-[520px]">
        {/* Top bar: welcome badge + theme toggle */}
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <OnePieceBadge text="WELCOME TO MY PORTFOLIO" />
          <ThemeTogglePill />
        </div>

        {/* Hero body: text left, person right */}
        <div className="relative flex flex-1 items-center">
          {/* Text content */}
          <div className="z-10 max-w-[580px] flex-1 px-4 pb-8 md:px-8 md:pb-10">
            <h1 className="mb-2 heading-display text-3xl text-foreground md:text-5xl">
              Hey, I'm <span className="text-highlight-sunset">Azar!</span>{" "}
              <span aria-hidden>👋</span>
            </h1>

            <p
              className="mb-4 max-w-md font-sans text-base text-foreground/80 md:text-lg"
              style={{ lineHeight: "1.55" }}
            >
              Frontend Developer crafting fast, scalable &amp; interactive web experiences.
            </p>

            {/* Tech chips */}
            <div className="mb-3 flex flex-wrap gap-2">
              {TECH_CHIPS.map(({ icon: Icon, label, colorClass }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-pill border border-border/60 bg-muted/60 px-3 py-1.5 font-sans text-xs font-medium text-foreground backdrop-blur-sm"
                >
                  <Icon size={13} className={colorClass} />
                  {label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mb-6 flex flex-wrap gap-5">
              {STATS.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 font-sans text-sm text-foreground/80"
                >
                  <Icon size={13} className="text-brand-treasure" />
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <PirateCTAButton icon={<WheelIcon size={16} />} variant="primary">
                Explore My Work
              </PirateCTAButton>
              <PirateCTAButton
                icon={<ScrollTextIcon size={16} strokeWidth={2} />}
                variant="secondary"
              >
                Read My Thinking
              </PirateCTAButton>
            </div>
          </div>

          {/* Person image — hidden on mobile, visible md+ */}
          <div className="pointer-events-none absolute -bottom-28 -z-0 hidden h-full items-end select-none sm:-bottom-24 md:-right-10 md:-bottom-24 md:flex lg:right-20 lg:-bottom-28 xl:right-20 xl:-bottom-40">
            <img
              src="/person.png"
              alt="Azar — Frontend Developer"
              className="max-h-[390px] w-auto object-contain object-bottom xl:max-h-[470px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
