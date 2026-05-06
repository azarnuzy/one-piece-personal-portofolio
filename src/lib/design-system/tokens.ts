/**
 * Design tokens (TypeScript mirror)
 * --------------------------------------------------------------
 * Use these only when CSS classes / custom properties are not an
 * option (e.g. canvas, charts, framer-motion variants). For UI,
 * always prefer Tailwind utilities backed by `src/styles/tokens.css`.
 */

export const fonts = {
  display: '"Fraunces", "Iowan Old Style", Georgia, "Times New Roman", serif',
  sans: '"Inter Variable", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
} as const;

export const fontSize = {
  "2xs": "0.6875rem",
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.375rem",
  "2xl": "1.75rem",
  "3xl": "2.25rem",
  "4xl": "2.875rem",
  "5xl": "3.625rem",
  "6xl": "4.5rem",
} as const;

export const radius = {
  xs: "0.3rem",
  sm: "0.45rem",
  md: "0.6rem",
  lg: "0.75rem",
  xl: "1.05rem",
  "2xl": "1.35rem",
  "3xl": "1.65rem",
  "4xl": "1.95rem",
  pill: "9999px",
} as const;

/** Brand reference values — also exposed as CSS vars in themes.css. */
export const brand = {
  sun: "oklch(0.83 0.16 80)",
  sunset: "oklch(0.7 0.19 35)",
  treasure: "oklch(0.88 0.14 95)",
  ink: "oklch(0.18 0.04 250)",
  parchment: "oklch(0.97 0.022 85)",
  rope: "oklch(0.55 0.08 60)",
} as const;

export const motion = {
  durationFast: 120,
  durationBase: 200,
  durationSlow: 320,
  easeOutSoft: [0.22, 1, 0.36, 1] as const,
  easeInOutSoft: [0.65, 0, 0.35, 1] as const,
} as const;

export const z = {
  base: 0,
  raised: 10,
  sticky: 100,
  dropdown: 1000,
  overlay: 2000,
  modal: 3000,
  toast: 4000,
  tooltip: 5000,
} as const;

export type Brand = keyof typeof brand;
export type FontSize = keyof typeof fontSize;
export type Radius = keyof typeof radius;
