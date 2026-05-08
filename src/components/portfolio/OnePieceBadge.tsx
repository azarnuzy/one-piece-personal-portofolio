import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const WOOD_GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wg'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.015 0.9' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.15'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wg)'/%3E%3C/svg%3E")`;

const NOISE_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface OnePieceBadgeProps {
  text: string;
  className?: string;
}

function Rivet({ isDark }: { isDark: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none block h-[5px] w-[5px] shrink-0 rounded-full sm:h-[7px] sm:w-[7px]"
      style={{
        background: isDark
          ? `radial-gradient(circle at 35% 30%, var(--badge-plank-highlight), var(--badge-plank-shadow))`
          : `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), var(--badge-plank-shadow))`,
        boxShadow: `0 1px 2px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.35)`,
      }}
    />
  );
}

export function OnePieceBadge({ text, className }: OnePieceBadgeProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "group relative inline-flex cursor-default items-center transition-all duration-300 hover:brightness-110 active:scale-95",
        className,
      )}
    >
      {/*
        Outer wrapper — overflow-hidden keeps corners clean,
        ring gives a single outer border, drop-shadow for depth.
      */}
      <div
        className={cn(
          "relative flex items-stretch overflow-hidden rounded-[3px]",
          isDark
            ? "ring-1 ring-brand-treasure/50 drop-shadow-[0_5px_20px_rgba(0,0,0,0.72)] ring-inset hover:drop-shadow-[0_7px_24px_rgba(0,0,0,0.78)]"
            : "ring-1 ring-badge-plank-shadow/40 drop-shadow-[0_3px_10px_rgba(80,50,20,0.38)] ring-inset hover:drop-shadow-[0_5px_14px_rgba(80,50,20,0.5)]",
        )}
      >
        {/* ── Fold: icon section — slightly darker, top-left lit ── */}
        <div
          className="relative flex h-7 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-10"
          style={{
            background: `radial-gradient(ellipse 120% 90% at 35% 8%, var(--badge-plank-base) 0%, var(--badge-plank-shadow) 65%, var(--badge-plank-shadow) 100%)`,
          }}
        >
          {/* Wood grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
            style={{ backgroundImage: WOOD_GRAIN_URL, backgroundSize: "100px 60px" }}
          />
          {/* Grain lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(2deg, var(--badge-plank-shadow) 0px, var(--badge-plank-shadow) 1px, transparent 1px, transparent 5px)`,
            }}
          />
          {/* Top bevel */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[4px]"
            style={{
              background: `linear-gradient(to bottom, rgba(255,255,255,0.42), rgba(255,255,255,0))`,
            }}
          />
          {/* Bottom shadow */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[4px]"
            style={{ background: `linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0))` }}
          />
          {/* Right-edge joint shadow — where fold meets body */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-3"
            style={{ background: `linear-gradient(to left, rgba(0,0,0,0.22), rgba(0,0,0,0))` }}
          />
          {isDark && (
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_10px_rgba(212,175,55,0.14)]" />
          )}

          <img
            src={isDark ? "/skull-logo.png" : "/strawhat-logo.png"}
            alt=""
            className="relative z-10 h-5 w-5 object-contain drop-shadow-sm sm:h-6 sm:w-6"
          />
        </div>

        {/* Thin wood-joint seam line between fold and body */}
        <div
          className="shrink-0 self-stretch"
          style={{
            width: "1.5px",
            background: isDark
              ? `linear-gradient(to bottom, var(--badge-plank-shadow), var(--badge-plank-base) 50%, var(--badge-plank-shadow))`
              : `linear-gradient(to bottom, var(--badge-plank-shadow), var(--badge-plank-base) 50%, var(--badge-plank-shadow))`,
            opacity: isDark ? 0.6 : 0.4,
          }}
        />

        {/* ── Body: text section — top-center lit ── */}
        <div
          className="relative flex h-7 items-center sm:h-9"
          style={{
            background: `radial-gradient(ellipse 100% 75% at 50% -10%, var(--badge-plank-highlight) 0%, var(--badge-plank-base) 48%, var(--badge-plank-shadow) 100%)`,
          }}
        >
          {/* Wood grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{ backgroundImage: WOOD_GRAIN_URL, backgroundSize: "280px 60px" }}
          />
          {/* Grain lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `repeating-linear-gradient(1.5deg, var(--badge-plank-shadow) 0px, var(--badge-plank-shadow) 1px, transparent 1px, transparent 7px)`,
            }}
          />
          {/* Fine noise */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: NOISE_URL }}
          />
          {/* Top bevel */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[4px]"
            style={{
              background: `linear-gradient(to bottom, rgba(255,255,255,0.42), rgba(255,255,255,0))`,
            }}
          />
          {/* Bottom shadow */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[4px]"
            style={{ background: `linear-gradient(to top, rgba(0,0,0,0.28), rgba(0,0,0,0))` }}
          />
          {/* Left vignette — continuation of joint shadow */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-6"
            style={{ background: `linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0))` }}
          />
          {/* Right vignette — far edge in shade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8"
            style={{ background: `linear-gradient(to left, rgba(0,0,0,0.16), rgba(0,0,0,0))` }}
          />
          {isDark && (
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_14px_rgba(212,175,55,0.1)]" />
          )}

          {/* Left rivet */}
          <div className="pointer-events-none absolute top-1/2 left-2.5 z-20 -translate-y-1/2 sm:left-3">
            <Rivet isDark={isDark} />
          </div>
          {/* Right rivet */}
          <div className="pointer-events-none absolute top-1/2 right-2.5 z-20 -translate-y-1/2 sm:right-3">
            <Rivet isDark={isDark} />
          </div>

          <span
            className={cn(
              "relative z-10 pr-7 pl-7 font-display text-2xs font-bold tracking-wider whitespace-nowrap uppercase sm:pr-8 sm:pl-8 sm:text-xs",
              isDark ? "text-brand-treasure" : "text-badge-plank-shadow",
            )}
            style={{
              textShadow: isDark
                ? "0 1px 3px rgba(0,0,0,0.95), 0 0 6px rgba(212,175,55,0.15)"
                : "0 -1px 1px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.28)",
            }}
          >
            {text}
          </span>

          {/* Hover shine */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}
