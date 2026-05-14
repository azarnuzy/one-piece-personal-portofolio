import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "@icons-pack/react-simple-icons";
import { CheckIcon, CompassIcon, ZapIcon } from "lucide-react";
import { memo } from "react";

import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

const TECH_CHIPS = [
  { icon: SiReact, label: "React", colorClass: "text-brand-info" },
  { icon: SiNextdotjs, label: "Next.js", colorClass: "text-foreground" },
  { icon: SiTypescript, label: "TypeScript", colorClass: "text-brand-info" },
  { icon: SiTailwindcss, label: "Tailwind CSS", colorClass: "text-brand-success" },
];

const STATS = [
  { icon: ZapIcon, text: "14+ Projects Shipped" },
  { icon: CompassIcon, text: "3+ Years Building" },
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

function HomeHeroContentInner() {
  return (
    <div className="relative flex flex-1 items-center">
      <div className="z-10 max-w-[580px] flex-1 px-4 pb-4 md:px-8 md:pb-6">
        <h1 className="mb-2 heading-display text-3xl text-foreground md:text-5xl">
          Hey, I'm <span className="text-highlight-sunset">Azar!</span> <span aria-hidden>👋</span>
        </h1>

        <p
          className="mb-4 max-w-md font-sans text-base text-foreground/80 md:text-lg"
          style={{ lineHeight: "1.55" }}
        >
          Software Engineer building AI-powered platforms &mdash; full-stack frontend with a
          performance-first mindset.
        </p>

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

        <div className="flex flex-wrap gap-3">
          <PirateCTAButton icon={<WheelIcon size={16} />} variant="primary" to="/projects">
            See Featured Work
          </PirateCTAButton>
          <PirateCTAButton
            icon={<CompassIcon size={16} strokeWidth={2} />}
            variant="secondary"
            to="/about"
          >
            About Me
          </PirateCTAButton>
        </div>
      </div>
    </div>
  );
}

export const HomeHeroContent = memo(HomeHeroContentInner);
