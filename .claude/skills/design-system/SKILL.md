---
name: design-system
description: Use this skill whenever creating, editing, styling, or reviewing UI in this portfolio project (any change under src/components, src/routes, or src/styles). Enforces the Pirate Adventure design system — tokens, typography, theming (light/dark), surfaces, and authoring rules. Trigger when the user asks to build a page/section/component, tweak styles, add a color/font, or implement anything resembling the reference screenshots in public/reference/.
---

# Design System Skill — Pirate Adventure

You are working inside the `personal-portofolio-2026` project. Its
visual identity is a One-Piece / pirate-adventure aesthetic with two
surface modes: **Day Sea** (light) and **Night Sea** (dark).

This skill is your contract for ALL UI work. Read it fully before
producing any styles or components.

---

## 1. Source of truth

| Concern                  | File                               |
| ------------------------ | ---------------------------------- |
| Color palette + themes   | `src/styles/themes.css`            |
| Tailwind token mapping   | `src/styles/tokens.css`            |
| Fonts & type scale       | `src/styles/typography.css`        |
| Custom @utility classes  | `src/styles/utilities.css`         |
| Element resets           | `src/styles/base.css`              |
| TS mirror (motion/z/...) | `src/lib/design-system/tokens.ts`  |
| Visual reference         | `public/reference/reference-*.png` |
| Full docs                | `src/lib/design-system/README.md`  |

The CSS pipeline is Tailwind v4 with `@theme inline`. Theme switching
is class-based: `.dark` on `<html>` (already wired in
`src/components/theme-provider.tsx`).

## 2. Hard rules (non-negotiable)

1. **No raw colors.** Never write `#hex`, `rgb(...)`, or a literal
   `oklch(...)` inside `src/components/**`, `src/routes/**`, or any
   `*.tsx`. Always use a token utility:
   - Semantic: `bg-background`, `bg-card`, `text-foreground`,
     `text-muted-foreground`, `border-border`, `bg-primary`,
     `text-primary-foreground`, `bg-accent`, `bg-secondary`,
     `bg-destructive`, `ring-ring`.
   - Brand: `bg-brand-sun`, `text-brand-sunset`, `text-brand-treasure`,
     `text-brand-ink`, `bg-brand-parchment`, `text-brand-rope`.
2. **No new fonts** outside `typography.css`. Use `font-display`,
   `font-sans`, or `font-mono`.
3. **Type scale only.** Use `text-xs … text-6xl` from the design
   system. Never set arbitrary `text-[18.5px]` etc.
4. **Both themes must work.** Every component must look correct in
   light AND dark. Use semantic tokens; if you need theme-specific
   styling, add the variant via `.dark`-aware tokens (e.g., the
   utility resolves via `themes.css`) rather than inlining `dark:`
   color hexes.
5. **Headings use `font-display`** (Fraunces). Body uses `font-sans`
   (Inter). The hero "Hey, I'm Azar!" pattern uses
   `heading-display` plus `text-highlight-sunset` on the name.
6. **Card surfaces** use the `surface-card` utility (or compose:
   `bg-card border border-border rounded-xl shadow-[var(--shadow-card)]`).
7. **Never edit `src/styles.css` directly** to add tokens — it only
   imports `./styles/index.css`. Tokens go in `themes.css` +
   `tokens.css` (and `tokens.ts` if used in TS).
8. **shadcn primitives** in `src/components/ui/` already consume
   semantic tokens. Do not override their colors with raw values.
9. **Icons:** prefer `lucide-react`. Decorative pirate motifs (skull,
   compass, anchor, lantern, "Wanted" poster) should be SVG/PNG
   assets in `public/`.

## 3. Authoring workflow

When the user asks for a page/section/component:

1. **Identify the reference.** Check `public/reference/` for the
   matching screenshot (home, about, project, blog, detail-blog).
2. **Map regions to tokens.** Background = `bg-background` or
   `bg-night-sky` / `bg-day-sea`; panels = `surface-card`;
   headings = `font-display`; CTAs = `bg-primary text-primary-foreground`
   with `shadow-[var(--shadow-glow-sun)]`; sidebar active item =
   `nav-active-glow`.
3. **Compose with existing primitives** (shadcn `Button`, `Input`,
   etc.). Add a new component only if no primitive fits.
4. **Place files** under `src/components/<feature>/<Name>.tsx`. One
   component per file. Co-locate small subcomponents.
5. **Verify both themes.** Mentally walk through the component with
   `.dark` toggled — every color must come from a token that has a
   defined value in both `:root` and `.dark`.

## 4. When adding a new token

Adding any new color/spacing/radius/shadow:

1. Add the raw value to BOTH `:root` AND `.dark` in
   `src/styles/themes.css`.
2. Map it under `@theme inline { ... }` in `src/styles/tokens.css`
   so Tailwind generates a utility (`--color-<name>: var(--<name>)`).
3. If consumed from TS, mirror it in `src/lib/design-system/tokens.ts`.
4. Document it in `src/lib/design-system/README.md`.

## 5. Quick token reference

```text
Surfaces      bg-background  bg-card  bg-popover  bg-muted  bg-secondary
Text          text-foreground  text-muted-foreground  text-primary
Brand         bg-brand-sun  text-brand-sunset  text-brand-treasure
Hero bg       bg-night-sky (dark hero)   bg-day-sea (light hero)
Panel         surface-card
Pill badge    chip-treasure
Sidebar item  nav-active-glow
CTA glow      shadow-[var(--shadow-glow-sun)]
Display font  font-display + heading-display
Highlight     text-highlight-sunset
Radii         rounded-md|lg|xl|2xl|pill
Type          text-sm…text-6xl
```

## 6. Pre-flight checklist (run mentally before finishing)

- [ ] No raw color literals anywhere in the diff.
- [ ] No new fonts outside `typography.css`.
- [ ] Headings use `font-display`; body uses `font-sans`.
- [ ] All colors come from semantic or `brand-*` tokens.
- [ ] Component verified in light AND dark.
- [ ] New tokens (if any) added to themes.css + tokens.css + (tokens.ts).
- [ ] Files placed under `src/components/<feature>/` (modular).

If any item fails, fix before reporting the task done.
