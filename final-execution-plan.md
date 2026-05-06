# 🚀 FINAL EXECUTION PLAN — Developer Journey Portfolio

> **Stack:** Vite + React + TypeScript
> **Mode:** Thematic (path, glow, ocean gradient)
> **Audio:** Enabled
> **Status Asset:** 14 ready · 3 perlu regenerate · 1 SVG coded inline

---

## 🗂️ ASSET STATUS MAP

### ✅ READY TO USE (14 assets)

| File                        | Treatment                                                |
| --------------------------- | -------------------------------------------------------- |
| `profile.png`               | Direct use, frame border glow                            |
| `project-mockup.png`        | Fallback / placeholder kalau project belum siap          |
| `bg-noise-texture.png`      | Global overlay, opacity 4%                               |
| `compass-base.png`          | Floating navigation indicator (right side)               |
| `wave-divider.png`          | Section transition divider                               |
| `contact-sunset-bg.png`     | Contact section background                               |
| `skills-bg-grid.png`        | Skills section background                                |
| `skills-constellation.png`  | Skills decorative overlay                                |
| `logbook-paper-texture.png` | Articles section background overlay                      |
| `about-map-coords.png`      | About section — adapted as full-bleed bg with blend mode |
| `ambient-ocean-loop.mp3`    | Background ambient                                       |
| `hover-soft.mp3`            | Card/button hover SFX                                    |
| `click-deep.mp3`            | CTA click SFX                                            |
| `transition-wave.mp3`       | Section transition SFX                                   |
| `modal-open.mp3`            | Project modal open SFX                                   |
| `compass-tick.mp3`          | Compass rotation SFX                                     |

### 🔄 NEEDS REGENERATE (3 assets)

1. `islands-divider.png` — outline terlalu redup
2. `dock-silhouette.png` — bukan dock, tapi tekstur beaded
3. `logbook-stamp.png` — belum ada (skip atau generate)

### 💻 CODE-GENERATED (inline SVG)

1. **Hero path line** — animated SVG path (replace failed asset)
2. **Vertical timeline** — SVG line dengan scroll progress
3. **Skill connection lines** — antar node
4. **Glow dots** — particle field
5. **Scroll progress indicator** — vertical line
6. **Star particles** — canvas/SVG di hero

---

## 🔧 REGENERATE PROMPTS (DALL-E)

### 1. `islands-divider.png` (regenerate)

**Prompt:**

> "Three minimalist island shapes viewed from top-down map perspective, arranged horizontally with space between them. Each island is filled with solid warm gold color (#E9C46A) at 70% opacity, soft glow halo around each island. Dark navy background (#0B1F3A). Modern flat vector style, no outlines only fills, no labels, no text, no compass. Aspect ratio 6:1, horizontal banner format, 1800x300px."

**Why regenerate:** Outline terlalu thin & dark, hampir invisible di section gelap. Butuh fills dengan glow.

---

### 2. `dock-silhouette.png` (regenerate)

**Prompt:**

> "Minimalist horizontal dock pier silhouette, simple geometric structure: one long horizontal line as the dock platform, with three to four short vertical posts below it descending into water. Pure flat vector style, dark navy color (#0B1F3A) silhouette, transparent or pure black background. No water details, no boats, no people, no decoration. Ultra clean line art only, 1600x200px horizontal aspect."

**Why regenerate:** Asset sebelumnya sama sekali bukan dock, tapi pattern beaded.

---

### 3. `logbook-stamp.png` (optional — skip if mau efisien)

**Prompt:**

> "Minimalist circular badge stamp, two thin concentric circles, faded sunset orange color (#F4A261) at 50% opacity, transparent background, slightly distressed vintage feel but very subtle, no text inside, no decorations, 400x400px square, centered."

**Decision suggestion:** SKIP. Bisa dibuat via CSS `border-radius` + double border.

---

## 📁 PROJECT STRUCTURE

```
portfolio/
├── public/
│   ├── images/
│   │   ├── profile.png
│   │   ├── bg-noise-texture.png
│   │   ├── compass-base.png
│   │   ├── about-map-coords.png
│   │   ├── skills-bg-grid.png
│   │   ├── skills-constellation.png
│   │   ├── islands-divider.png      [regenerate]
│   │   ├── wave-divider.png
│   │   ├── logbook-paper-texture.png
│   │   ├── contact-sunset-bg.png
│   │   ├── dock-silhouette.png      [regenerate]
│   │   └── projects/
│   │       └── project-mockup.png   [+ real screenshots]
│   └── audio/
│       ├── ambient-ocean-loop.mp3
│       ├── hover-soft.mp3
│       ├── click-deep.mp3
│       ├── transition-wave.mp3
│       ├── modal-open.mp3
│       └── compass-tick.mp3
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── CompassIndicator.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── AudioToggle.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Articles.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tag.tsx
│   │   │   └── SectionWrapper.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectModal.tsx
│   │   │   └── ProjectGrid.tsx
│   │   ├── articles/
│   │   │   ├── ArticleCard.tsx
│   │   │   └── ArticleGrid.tsx
│   │   ├── skills/
│   │   │   ├── SkillNode.tsx
│   │   │   └── SkillMap.tsx
│   │   ├── timeline/
│   │   │   └── Timeline.tsx
│   │   └── decorative/
│   │       ├── HeroPathLine.tsx     [SVG inline]
│   │       ├── GlowDot.tsx
│   │       ├── WaveDivider.tsx
│   │       ├── ParticleField.tsx
│   │       └── NoiseOverlay.tsx
│   ├── hooks/
│   │   ├── useAudio.ts
│   │   ├── useScrollProgress.ts
│   │   ├── useInView.ts
│   │   └── useSoundEffect.ts
│   ├── lib/
│   │   ├── audio.ts
│   │   ├── motion.ts
│   │   └── cn.ts
│   ├── data/
│   │   ├── projects.ts
│   │   ├── articles.ts
│   │   ├── skills.ts
│   │   └── timeline.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## ⚙️ DEPENDENCIES

```bash
# Core
npm create vite@latest portfolio -- --template react-ts
cd portfolio
npm install

# Styling & Animation
npm install tailwindcss postcss autoprefixer
npm install framer-motion
npm install clsx tailwind-merge

# Audio
npm install howler
npm install -D @types/howler

# Icons
npm install lucide-react

# Forms
npm install react-hook-form zod @hookform/resolvers

# Utilities
npm install react-intersection-observer
```

---

## 🎨 DESIGN TOKENS (`src/styles/tokens.css`)

```css
:root {
  /* Ocean Depth */
  --navy-deep: #0b1f3a;
  --ocean-blue: #123a6f;
  --bright-blue: #1e5fa8;

  /* Accent */
  --sunset: #f4a261;
  --sea-green: #2a9d8f;
  --gold: #e9c46a;

  /* Neutral */
  --bg: #f8fafc;
  --border: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-primary: #0f172a;

  /* Glow */
  --glow-blue: rgba(30, 95, 168, 0.4);
  --glow-gold: rgba(233, 196, 106, 0.3);
  --glow-sunset: rgba(244, 162, 97, 0.25);

  /* Motion */
  --ease-standard: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

# 📋 COMPONENT EXECUTION PLAN

---

## 1️⃣ LAYOUT — `Navbar.tsx`

**Tujuan:** Top navigation, glassmorphism, sticky.

**Asset:** Lucide icon `Compass` (logo)

**Logic:**

- Sticky top, blur backdrop saat scroll > 50px
- Active section highlight (track via IntersectionObserver)
- Mobile: hamburger menu, slide-in drawer

**Props:** none (consume scroll context)

**State:**

- `isScrolled: boolean`
- `activeSection: string`
- `isMobileMenuOpen: boolean`

**Style:**

```css
backdrop-filter: blur(20px);
background: rgba(11, 31, 58, 0.7);
border-bottom: 1px solid rgba(226, 232, 240, 0.1);
```

**SFX:** `hover-soft.mp3` on link hover

---

## 2️⃣ LAYOUT — `CompassIndicator.tsx`

**Tujuan:** Floating navigation orientasi (kanan bawah desktop).

**Asset:** `compass-base.png` (sebagai background needle frame)

**Logic:**

- Posisi `fixed bottom-8 right-8` (desktop only, hide < 1024px)
- Needle SVG (custom) berputar via `transform: rotate()` mengikuti scroll progress
- Mapping section → angle:
  ```
  hero: 0°, about: 60°, skills: 120°,
  projects: 180°, articles: 240°, contact: 300°
  ```

**Composition:**

```tsx
<div className="relative w-20 h-20">
  <img src="/images/compass-base.png" />
  <svg className="absolute inset-0">
    <line /* needle, rotates */ />
  </svg>
</div>
```

**SFX:** `compass-tick.mp3` on section change (debounced)

---

## 3️⃣ LAYOUT — `ScrollProgress.tsx`

**Tujuan:** Vertical progress line (kiri).

**Asset:** None — pure code

**Logic:**

- Framer Motion `useScroll().scrollYProgress`
- Tinggi penuh viewport, width 2px
- Position `fixed left-8 top-0`

**Implementation:**

```tsx
<motion.div
  style={{ scaleY: scrollYProgress }}
  className="fixed left-6 top-0 w-[2px] h-screen
             bg-gradient-to-b from-bright-blue via-sea-green to-gold
             origin-top z-40"
/>
```

---

## 4️⃣ LAYOUT — `AudioToggle.tsx`

**Tujuan:** Toggle ambient sound on/off.

**Asset:** `ambient-ocean-loop.mp3` + Lucide `Volume2`/`VolumeX`

**Logic:**

- Posisi `fixed bottom-8 left-8`
- State persist di localStorage
- Default OFF di mobile (< 768px), default ON di desktop (start at 15% volume)
- Fade in/out transition (800ms)

**Howler setup:**

```ts
const ambient = new Howl({
  src: ["/audio/ambient-ocean-loop.mp3"],
  loop: true,
  volume: 0.15,
  html5: true,
});
```

---

## 5️⃣ SECTION — `Hero.tsx` (Departure)

**Tujuan:** First impression, hook visitor.

**Asset Stack (background layers):**
| Layer | Source | Treatment |
|-------|--------|-----------|
| 1 (base) | `contact-sunset-bg.png` flipped | Used as hero gradient (re-purpose) — atau pure CSS gradient |
| 2 (texture) | `bg-noise-texture.png` | mix-blend-mode: overlay, opacity 0.04 |
| 3 (stars) | Canvas particles | 80–120 dots, twinkle animation |
| 4 (path) | **Inline SVG** | Animated draw on mount |
| 5 (dots) | Coded glow dots | 5–7 dots along path |

> **Note:** `contact-sunset-bg.png` saat ini lebih cocok untuk hero (atmospheric horizon glow). Bisa direpurpose untuk hero, dan generate alternatif untuk contact (atau swap mereka).

**Hero SVG Path (inline, replace failed asset):**

```tsx
<svg
  viewBox="0 0 1920 1080"
  className="absolute inset-0 w-full h-full pointer-events-none"
  preserveAspectRatio="none"
>
  <motion.path
    d="M -50 800 Q 480 600 960 540 T 1970 280"
    stroke="url(#pathGradient)"
    strokeWidth="2"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.8 }}
    transition={{ duration: 2.5, ease: "easeInOut", delay: 1.8 }}
  />
  <defs>
    <linearGradient id="pathGradient">
      <stop offset="0%" stopColor="#E9C46A" stopOpacity="0.2" />
      <stop offset="50%" stopColor="#F4A261" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#E9C46A" stopOpacity="0.4" />
    </linearGradient>
  </defs>
</svg>
```

**Glow Dots (along path, 6 dots):**

```tsx
const dotPositions = [
  { x: 200, y: 720, delay: 2.4 },
  { x: 480, y: 600, delay: 2.6 },
  { x: 760, y: 560, delay: 2.8 },
  { x: 1100, y: 480, delay: 3.0 },
  { x: 1480, y: 380, delay: 3.2 },
  { x: 1820, y: 290, delay: 3.4 },
];
```

**Content:**

```
Eyebrow (mono, gold):    "// LOG_001 — DEPARTURE"
H1 (white, 64px):         "Charting code across uncharted seas."
Sub (text-secondary):     "Full-stack developer building products that ship."
CTA Primary (sunset):     "View My Work →"
CTA Ghost:                "Read the Logbook"
```

**Animation Timeline:**

```
0.0s — Background fade in (opacity 0→1, 800ms)
0.3s — Eyebrow fade up + slide
0.6s — H1 word-by-word reveal (stagger 0.08s per word)
1.2s — Subhead fade up
1.5s — CTA buttons scale + fade
1.8s — Path line draws (2.5s)
2.4s — Glow dots pop sequentially (stagger 0.2s)
```

**SFX:** `transition-wave.mp3` plays once on mount (volume 30%)

---

## 6️⃣ SECTION — `About.tsx` (Captain)

**Tujuan:** Personal intro + journey timeline.

**Layout:** Split 2 columns (image left 40% / content right 60%) — mobile stack.

**Background:**

- `about-map-coords.png` sebagai full-bleed background, opacity 8%, blend-mode `overlay`, scale 1.5x
- Gradient overlay navy on top untuk readability

**Profile Image (`profile.png`):**

- Wrapper: `aspect-[3/4]`, max-width 480px
- Border treatment:
  ```css
  border-radius: 24px;
  border: 1px solid rgba(244, 162, 97, 0.3);
  box-shadow:
    0 0 60px rgba(30, 95, 168, 0.4),
    inset 0 0 40px rgba(11, 31, 58, 0.2);
  ```
- Corner accents (4x small SVG marks)
- Subtle parallax on scroll (translateY -20px range)

**Content Block:**

```
Eyebrow: "// LOG_002 — THE CAPTAIN"
H2:      "Hi, I'm [Name]."
Body:    [2-3 paragraphs about you]

[Timeline component]
```

**Timeline Component (`Timeline.tsx`):**

- Vertical SVG line dengan scroll-linked draw
- Items dari `data/timeline.ts`
- Icon dot pada setiap milestone
- Year + title + description

**Data structure:**

```ts
// data/timeline.ts
export const timeline = [
  { year: "2020", title: "Started the journey", desc: "..." },
  { year: "2021", title: "First open sea", desc: "..." },
  { year: "2022", title: "Found my crew", desc: "..." },
  { year: "2024", title: "Charting new waters", desc: "..." },
];
```

**SFX:** None (passive section)

---

## 7️⃣ SECTION — `Skills.tsx` (Navigation Tools)

**Tujuan:** Showcase tech stack.

**Background Stack:**

- Layer 1: `skills-bg-grid.png` (full bleed, repeat)
- Layer 2: `skills-constellation.png` (positioned absolute, opacity 0.4, scale 1.2)

**Skill Icons (download dari sumber resmi):**
| Skill | Source URL |
|-------|-----------|
| React | https://react.dev (favicon/press) |
| TypeScript | https://www.typescriptlang.org/branding |
| Next.js | https://nextjs.org/static/favicon |
| Tailwind | https://tailwindcss.com/brand |
| Node.js | https://nodejs.org/en/about/branding |
| PostgreSQL | https://www.postgresql.org/about/press |
| Docker | https://www.docker.com/company/newsroom/media-resources |
| Git | https://git-scm.com/downloads/logos |
| WebSocket | Lucide `radio-tower` |
| REST API | Lucide `webhook` |

> Simpan di `public/images/skills/[name].svg`

**SkillNode Component:**

- Default: monochrome (filter: grayscale), opacity 0.7
- Hover: full color, scale 1.1, glow shadow

```css
.skill-node {
  transition: all 0.3s var(--ease-out);
  filter: grayscale(1);
  opacity: 0.7;
}
.skill-node:hover {
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.1);
  filter: drop-shadow(0 0 20px var(--glow-gold));
}
```

**Layout — Node Map:**

- Skills tidak grid, tapi **scattered positioning** seperti map nodes
- Posisi via absolute (10 nodes, hardcoded x/y per breakpoint)
- SVG connection lines antar related skills (React↔TypeScript, Node↔PostgreSQL, dll)
- Container minimum height: 600px

**Connection Lines (SVG inline):**

```tsx
<svg className="absolute inset-0 pointer-events-none">
  <line x1="20%" y1="30%" x2="45%" y2="50%" stroke="rgba(233, 196, 106, 0.2)" strokeWidth="1" />
  {/* ... more connections */}
</svg>
```

**SFX:** `hover-soft.mp3` on node hover

---

## 8️⃣ SECTION — `Projects.tsx` (Islands) ⭐ HIGH PRIORITY

**Tujuan:** Centerpiece — recruiter's main focus.

**Section Header:**

- `islands-divider.png` (regenerated version) sebagai banner di atas grid
- Eyebrow: `// LOG_004 — THE ISLANDS`
- H2: `Projects I've sailed to`

**Project Card (`ProjectCard.tsx`):**

Layout:

```
┌────────────────────────────────────┐
│                                    │
│   [Thumbnail 16:10]                │
│                                    │
├────────────────────────────────────┤
│  // PROJECT_001                    │
│  Project Title                     │
│  Short description (2 lines)       │
│  [tag] [tag] [tag]                 │
│  View Details →                    │
└────────────────────────────────────┘
```

**Card Style (glassmorphism):**

```css
.project-card {
  background: linear-gradient(135deg, rgba(18, 58, 111, 0.4), rgba(11, 31, 58, 0.6));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.1);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s var(--ease-out);
}
```

**Hover:**

```
- transform: translateY(-8px)
- box-shadow: 0 30px 60px var(--glow-blue)
- border-color: rgba(244, 162, 97, 0.5)
- thumbnail: scale 1.05 (overflow hidden parent)
- "View Details" arrow: translateX(4px)
```

**Grid:**

- Desktop: 2 columns
- Tablet: 1 column wider
- Mobile: 1 column
- Gap: 32px

**Project Modal (`ProjectModal.tsx`):**

Trigger: click card → modal slides up from bottom + backdrop blur

Structure:

```
[Hero image — parallax effect on scroll]
─────────────────────────────────────
// PROJECT_001
[Project Title - H1]
[Tag badges]
─────────────────────────────────────
🎯 The Problem        [icon: alert-triangle]
   [paragraph]

💡 The Solution        [icon: lightbulb]
   [paragraph]

🛠 Tech Stack          [icon: layers]
   [icon grid]

📊 Impact              [icon: trending-up]
   - Metric 1
   - Metric 2
   - Metric 3

🔗 Links
   [Live Demo] [GitHub Repo]
```

**Modal animation:**

```tsx
initial: { y: '100%', opacity: 0 }
animate: { y: 0, opacity: 1 }
transition: { duration: 0.5, ease: easeOut }
```

**Data:**

```ts
// data/projects.ts
interface Project {
  id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  problem: string;
  solution: string;
  tech: string[];
  impact: { label: string; value: string }[];
  liveUrl?: string;
  repoUrl?: string;
}
```

**SFX:**

- `hover-soft.mp3` on card hover
- `modal-open.mp3` on card click
- `click-deep.mp3` on CTA inside modal

---

## 9️⃣ SECTION — `Articles.tsx` (Logbook)

**Tujuan:** Show writing/thought leadership.

**Background:**

- `logbook-paper-texture.png` full-bleed, opacity 0.4, blend `multiply`
- Subtle gradient overlay

**Section Header:**

```
Eyebrow: // LOG_005 — THE LOGBOOK
H2: Notes from the journey
```

**Article Card:**

```
┌────────────────────────────────────┐
│ // ENTRY_004 · Mar 15, 2025        │ ← mono, secondary
│                                    │
│ Building Real-Time Sync with       │ ← H3 white
│ WebSockets and CRDTs               │
│                                    │
│ A deep dive into conflict-free     │ ← body, line-clamp-2
│ replicated data types and how...   │
│                                    │
│ [websocket] [react] [crdt]         │ ← tags
│                                    │
│ ─────────────────                  │ ← horizontal line, animates on hover
│ 8 min read           Read entry → │
└────────────────────────────────────┘
```

**Hover:**

- Border-left grows from 0 to 4px (sunset color)
- Horizontal line above footer expands left to right
- Read arrow translates right

**Layout:**

- Desktop: 2 columns
- Mobile: 1 column

**Stamp Decoration (replacing logbook-stamp.png):**

- Pure CSS double border circle, 60x60px, rotated -8deg
- Position: top-right corner of featured article card
- Color: rgba(244, 162, 97, 0.4)

**Data:**

```ts
// data/articles.ts
interface Article {
  id: string;
  entryNumber: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
  url: string;
  featured?: boolean;
}
```

**SFX:** `hover-soft.mp3` on card hover

---

## 🔟 SECTION — `Contact.tsx` (Final Dock)

**Tujuan:** Conversion — get in touch.

**Background:**

- Primary: `contact-sunset-bg.png` (atau swap dengan custom hero gradient kalau hero pakai ini)
- Foreground silhouette: `dock-silhouette.png` (regenerated) — positioned absolute bottom

> **Note:** Jika `contact-sunset-bg.png` digunakan di hero, generate sunset alternatif yang lebih warm/intense untuk contact.

**Layout:** Center column 600px max-width

**Content:**

```
Eyebrow:  // LOG_006 — THE FINAL DOCK
H2:       Let's build something together.
Sub:      Currently open to opportunities.

[Form fields]
[Submit button — large, sunset gradient]

— END OF LOG —
[Social icons row]
```

**Form Fields:**

- Name (input)
- Email (input)
- Subject (select: Project Inquiry / Collaboration / Just saying hi)
- Message (textarea, 5 rows)

**Form Style:**

```css
input,
textarea,
select {
  background: rgba(11, 31, 58, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.15);
  border-radius: 12px;
  padding: 14px 18px;
  color: white;
  transition: all 0.3s;
}
input:focus {
  border-color: var(--sunset);
  box-shadow: 0 0 0 3px var(--glow-sunset);
  outline: none;
}
```

**Form validation:** React Hook Form + Zod
**Submission:** Could use Formspree, Resend API, or static `mailto:` for MVP

**Social Icons:** Lucide `Github`, `Linkedin`, `Twitter`, `Mail`, `FileText` (resume)

**SFX:**

- `hover-soft.mp3` on input focus
- `click-deep.mp3` on submit
- Ambient volume +5% saat section enters viewport

---

## 1️⃣1️⃣ DECORATIVE — `WaveDivider.tsx`

**Tujuan:** Section transition.

**Asset:** `wave-divider.png`

**Logic:**

- Placement: antara setiap section
- Animation: `whileInView` — slide horizontal slightly + fade
- Triggers `transition-wave.mp3` saat enter viewport (debounced, max 1x per scroll session)

**Implementation:**

```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8 }}
  className="w-full h-20"
>
  <img src="/images/wave-divider.png" className="w-full h-full object-cover" />
</motion.div>
```

---

## 1️⃣2️⃣ DECORATIVE — `NoiseOverlay.tsx`

**Tujuan:** Subtle texture untuk dark sections.

**Asset:** `bg-noise-texture.png`

**Implementation:**

```tsx
// Wrap sections that need it
<div className="relative">
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
    style={{
      backgroundImage: "url(/images/bg-noise-texture.png)",
      backgroundRepeat: "repeat",
    }}
  />
  {children}
</div>
```

---

## 1️⃣3️⃣ HOOK — `useSoundEffect.ts`

```ts
import { Howl } from "howler";
import { useRef, useCallback } from "react";

export function useSoundEffect(src: string, volume = 0.25) {
  const soundRef = useRef<Howl | null>(null);

  if (!soundRef.current) {
    soundRef.current = new Howl({
      src: [src],
      volume,
      preload: true,
    });
  }

  const play = useCallback(() => {
    // Respect global mute state
    if (window.localStorage.getItem("audio-muted") === "true") return;
    soundRef.current?.play();
  }, []);

  return play;
}
```

**Usage:**

```tsx
const playHover = useSoundEffect("/audio/hover-soft.mp3", 0.2);
<button onMouseEnter={playHover}>...</button>;
```

---

# 📅 EXECUTION TIMELINE (10 Days)

## Day 1 — Setup & Foundation

- [ ] Init Vite + React + TypeScript
- [ ] Install all dependencies
- [ ] Setup Tailwind config + custom tokens
- [ ] Create folder structure
- [ ] Setup global CSS + fonts (Plus Jakarta Sans, Inter, JetBrains Mono)
- [ ] Move all assets to `/public`
- [ ] Build base UI: Button, Card, Badge, Tag, SectionWrapper

## Day 2 — Regenerate Assets + Layout

- [ ] **Regenerate** `islands-divider.png` (use prompt above)
- [ ] **Regenerate** `dock-silhouette.png` (use prompt above)
- [ ] Build `Navbar` + `ScrollProgress` + `AudioToggle`
- [ ] Setup `useSoundEffect` hook
- [ ] Build `NoiseOverlay` + `WaveDivider`
- [ ] Test audio system end-to-end

## Day 3 — Hero Section

- [ ] Background layer system (gradient + noise + particles)
- [ ] Inline SVG path with Framer Motion draw
- [ ] Glow dots component
- [ ] Star particles (canvas)
- [ ] Text reveal animation
- [ ] CompassIndicator component

## Day 4 — About Section

- [ ] Profile image frame + corner accents
- [ ] About content layout
- [ ] Timeline component (SVG + scroll-linked)
- [ ] About background blend treatment

## Day 5 — Skills Section

- [ ] Download skill logos
- [ ] SkillNode component (hover state)
- [ ] Scattered map layout
- [ ] SVG connection lines
- [ ] Constellation overlay positioning

## Day 6 — Projects (Part 1)

- [ ] ProjectCard component + hover states
- [ ] Projects grid layout
- [ ] Data structure + dummy content
- [ ] Capture/prepare 3-6 real project screenshots

## Day 7 — Projects (Part 2)

- [ ] ProjectModal component
- [ ] Modal animation + backdrop
- [ ] Modal content sections (problem, solution, tech, impact)
- [ ] Test modal full flow

## Day 8 — Articles + Contact

- [ ] ArticleCard component
- [ ] Articles grid
- [ ] Contact form with validation
- [ ] Form submission flow (Formspree / Resend / mailto)
- [ ] Contact background composition

## Day 9 — Polish

- [ ] All section animations (whileInView)
- [ ] Wave divider transitions between sections
- [ ] All SFX integration test
- [ ] Mobile responsive QA every breakpoint
- [ ] Accessibility audit (keyboard nav, ARIA)
- [ ] Performance: lazy load images, code split modal

## Day 10 — Deploy

- [ ] Lighthouse audit (target 90+)
- [ ] Cross-browser test (Chrome, Safari, Firefox)
- [ ] SEO meta tags + Open Graph
- [ ] Favicon + manifest
- [ ] Deploy to Vercel
- [ ] Custom domain setup

---

# ⚖️ DESIGN PRIORITIES

## ✅ DO

- Project section dapat highlight terbesar — visual + content
- Animasi subtle, tidak kompetisi dengan content
- Keep audio default ringan (15% ambient, 25% SFX)
- Mobile audio off by default
- Real project screenshots > fallback mockup

## ❌ DON'T

- Jangan tambah ilustrasi pirate / cartoon
- Jangan over-animate (max 3 simultan per section)
- Jangan re-use placeholder Lorem Ipsum di production
- Jangan AI-generate face/portraits

---

# 🎯 FINAL CHECKLIST BEFORE LAUNCH

- [ ] Semua copy text final (no placeholder)
- [ ] Min 4 real projects dengan screenshot real
- [ ] Min 3 articles (boleh link ke external blog/Medium)
- [ ] Resume PDF available di `/public/resume.pdf`
- [ ] All social links working
- [ ] Contact form tested end-to-end
- [ ] Audio toggle persisted across navigation
- [ ] All SFX volumes balanced
- [ ] Mobile QA pada device real (bukan hanya devtools)
- [ ] Light/dark consistency (project ini full dark)
- [ ] Open Graph image custom (16:9, branded)

---

# 📝 NOTES PENTING

1. **Asset swap consideration:** `contact-sunset-bg.png` saat ini lebih cocok untuk hero. Jika dipakai di hero, butuh sunset alternatif yang lebih warm/saturated untuk contact section. Putuskan saat eksekusi Day 3.

2. **Logbook stamp skip:** Lebih efisien CSS-only daripada generate ulang.

3. **Timeline data:** Siapkan 4-6 milestone dari karir lu. Jangan lebih dari 6 (jadi terlalu panjang).

4. **Project priority order:** Susun project dari paling impressive ke biasa — order matters karena recruiter sering hanya lihat 2-3 pertama.
