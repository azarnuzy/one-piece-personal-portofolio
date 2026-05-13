import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const MIN_DISPLAY_MS = 900;
const FADE_DURATION_MS = 500;
const SAFETY_TIMEOUT_MS = 5000;

const CRITICAL_ASSETS = [
  "/logo-mugiwara.png",
  "/svg/captains_wheel.svg",
  "/background-light.png",
  "/background-night.png",
  "/person.png",
] as const;

type Phase = "showing" | "fading" | "hidden";

function preloadImages(urls: readonly string[]): Promise<void> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => undefined);
}

export function AppLoader() {
  const [phase, setPhase] = useState<Phase>("showing");

  useEffect(() => {
    const startedAt = performance.now();
    let fadeTimer: number | undefined;
    let unmountTimer: number | undefined;

    const beginFadeOut = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      fadeTimer = window.setTimeout(() => {
        setPhase("fading");
        unmountTimer = window.setTimeout(() => setPhase("hidden"), FADE_DURATION_MS);
      }, remaining);
    };

    const ready = Promise.all([
      preloadImages(CRITICAL_ASSETS),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          }),
      "fonts" in document ? document.fonts.ready.catch(() => undefined) : Promise.resolve(),
    ]);

    ready.then(beginFadeOut);

    // Failsafe — never block the user beyond the safety window.
    const safetyTimer = window.setTimeout(beginFadeOut, SAFETY_TIMEOUT_MS);

    return () => {
      if (fadeTimer) window.clearTimeout(fadeTimer);
      if (unmountTimer) window.clearTimeout(unmountTimer);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  // Lock body scroll while loader is visible.
  useEffect(() => {
    if (phase === "hidden") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "hidden") return null;

  const isFading = phase === "fading";

  return (
    <div
      role="status"
      aria-busy={!isFading}
      aria-live="polite"
      aria-label="Loading portfolio"
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden",
        "bg-background transition-opacity duration-500 ease-out",
        isFading && "pointer-events-none opacity-0",
      )}
    >
      <RadialGlow />
      <OceanHorizon />

      <div className="relative flex flex-col items-center gap-7 px-6 text-center">
        <Logo />
        <Brand />
        <SubtitleRow />
        <Divider />
        <LoadingDots />
      </div>
    </div>
  );
}

// ─── Decorative layers ────────────────────────────────────────────────────────

function RadialGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 45%, oklch(from var(--brand-sun) l c h / 0.10) 0%, transparent 55%)",
        animation: "loader-glow-pulse 4s ease-in-out infinite",
      }}
    />
  );
}

function OceanHorizon() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
      style={{
        backgroundImage:
          "linear-gradient(to top, oklch(from var(--brand-treasure) l c h / 0.06) 0%, transparent 100%)",
      }}
    />
  );
}

// ─── Content blocks ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <img
      src="/logo-mugiwara.png"
      alt=""
      width={96}
      height={96}
      decoding="async"
      fetchPriority="high"
      className="h-20 w-20 select-none md:h-24 md:w-24"
      style={{
        filter: "drop-shadow(0 0 24px oklch(from var(--brand-sun) l c h / 0.45))",
        animation: "loader-logo-breathe 3.4s ease-in-out infinite",
      }}
    />
  );
}

function Brand() {
  return (
    <h1
      className="heading-display text-4xl text-brand-treasure md:text-5xl"
      style={{
        letterSpacing: "0.5em",
        paddingLeft: "0.5em",
        textShadow: "0 0 24px oklch(from var(--brand-treasure) l c h / 0.35)",
      }}
    >
      AZAR
    </h1>
  );
}

function SubtitleRow() {
  return (
    <div className="flex items-center gap-3 text-brand-treasure/85">
      <AnchorIcon />
      <span
        className="text-2xs font-medium uppercase md:text-xs"
        style={{ letterSpacing: "0.42em" }}
      >
        Frontend Developer
      </span>
      <AnchorIcon />
    </div>
  );
}

function Divider() {
  return (
    <div className="flex w-44 items-center gap-3 md:w-56" aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-treasure/35" />
      <CaptainsWheelIcon />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-treasure/35" />
    </div>
  );
}

function LoadingDots() {
  return (
    <div
      className="flex items-center gap-2 text-2xs text-muted-foreground uppercase md:text-xs"
      style={{ letterSpacing: "0.42em" }}
    >
      <span>Loading</span>
      <span className="flex items-end gap-1" aria-hidden>
        <Dot delay="0s" />
        <Dot delay="0.16s" />
        <Dot delay="0.32s" />
      </span>
    </div>
  );
}

function Dot({ delay }: { readonly delay: string }) {
  return (
    <span
      className="inline-block h-1 w-1 rounded-full bg-brand-treasure"
      style={{
        animation: `loader-dot-pulse 1.2s ease-in-out ${delay} infinite`,
      }}
    />
  );
}

// ─── Icons (inline SVG — no JS-import cost) ───────────────────────────────────

function AnchorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 opacity-80"
      aria-hidden
    >
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14" />
      <path d="M5 12a7 7 0 0 0 14 0" />
      <path d="M8 12H4" />
      <path d="M20 12h-4" />
    </svg>
  );
}

function CaptainsWheelIcon() {
  return (
    <span
      className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center text-brand-treasure/70"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 1.5a7.5 7.5 0 0 1 7.45 6.75H17a5 5 0 0 0-3.25-3.25V5.55A7.5 7.5 0 0 1 12 4.5zm-1.5 1.05v2.45A5 5 0 0 0 7.25 11.25H4.55A7.5 7.5 0 0 1 10.5 5.55zm-5.95 6.9H7a5 5 0 0 0 3.25 3.25v2.7a7.5 7.5 0 0 1-5.7-5.95zm7.2 5.95v-2.7A5 5 0 0 0 17 12.75h2.45a7.5 7.5 0 0 1-5.7 5.95zM12 9.5a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 12 9.5z" />
      </svg>
    </span>
  );
}
