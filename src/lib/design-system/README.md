# Design System — Pirate Adventure

Theme: **One Piece / Pirate Adventure**. Two surface modes: **Day Sea**
(light) and **Night Sea** (dark). All work below this folder must use
the tokens defined here — no ad-hoc hex/oklch values in components.

## Where things live

```
src/
├── styles/
│   ├── index.css        # entry — composes everything below
│   ├── typography.css   # font families, scale, weights, helpers
│   ├── themes.css       # :root (light) + .dark color variables
│   ├── tokens.css       # @theme inline → maps vars into Tailwind
│   ├── utilities.css    # custom @utility classes
│   └── base.css         # element resets, default heading styles
└── lib/design-system/
    ├── tokens.ts        # TS mirror for canvas/charts/motion
    ├── index.ts
    └── README.md        # ← you are here
```

`src/styles.css` is the public entry imported from `__root.tsx`; it
just `@import`s `./styles/index.css`.

## Brand palette

| Token             | Tailwind class        | Use                              |
| ----------------- | --------------------- | -------------------------------- |
| `brand-sun`       | `bg-brand-sun`        | Primary CTA, active sidebar      |
| `brand-sunset`    | `text-brand-sunset`   | Highlight on names, accents      |
| `brand-treasure`  | `text-brand-treasure` | Badges, stat numbers             |
| `brand-ink`       | `text-brand-ink`      | Deep navy text on light surfaces |
| `brand-parchment` | `bg-brand-parchment`  | Cream cards on light theme       |
| `brand-rope`      | `text-brand-rope`     | Decorative dividers, captions    |

Semantic shadcn tokens (`bg-background`, `bg-card`, `text-primary`,
`bg-muted`, `border-border`, ...) work as expected and route to the
correct theme automatically.

## Typography

- `font-display` (Fraunces) — hero & section headings only.
- `font-sans` (Inter Variable) — body, UI, buttons.
- `font-mono` — code, snippets.
- Helpers: `heading-display`, `heading-section`, `text-highlight-sunset`.

Type scale (Major Third 1.25): `text-2xs` … `text-6xl`.

## Surfaces & utilities

- `surface-card` — bordered, rounded, shadowed panel.
- `chip-treasure` — uppercase pill badge.
- `nav-active-glow` — sidebar active state.
- `bg-night-sky` / `bg-day-sea` — themed hero backgrounds.
- `shadow-card`, `shadow-card-lg`, `shadow-pop`,
  `shadow-glow-sun`, `shadow-glow-sunset`.

## Radii / motion / z-index

- Radius: `rounded-xs|sm|md|lg|xl|2xl|3xl|4xl|pill`.
- Durations: `duration-[var(--duration-fast|base|slow)]`.
- Easings: `ease-[var(--ease-out-soft)]`.
- Z-index scale exposed in `tokens.ts` (`z.modal`, `z.toast`, ...).

## Authoring rules

1. **Never** use raw color values in JSX/CSS. Always use a token
   (`bg-primary`, `bg-brand-sun`, `text-foreground`).
2. **Never** add a new font outside `typography.css`.
3. New tokens go in `themes.css` (raw value, both themes) **and**
   `tokens.css` (Tailwind mapping). If consumed in TS, mirror in
   `tokens.ts`.
4. Components live in `src/components/<feature>/` and consume tokens
   only — no inline hex.
5. Both themes must be designed together. Verify in light **and** dark
   before shipping.
