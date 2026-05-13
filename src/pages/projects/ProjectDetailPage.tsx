import { useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangleIcon,
  AnchorIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CodeIcon,
  CompassIcon,
  CpuIcon,
  DatabaseIcon,
  DownloadIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  InfoIcon,
  LayersIcon,
  LightbulbIcon,
  MapIcon,
  MonitorIcon,
  PackageIcon,
  ScrollIcon,
  ServerIcon,
  ShieldIcon,
  StarIcon,
  TagIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { memo, useState } from "react";

import { cn } from "@/lib/utils";

import { getProjectV2, type LearningIcon, type ProjectLearning, type ProjectV2 } from "./data";

// ─── Icon map for "What I Learned" cards ──────────────────────────────────────

const LEARNING_ICON_MAP: Record<LearningIcon, React.ElementType> = {
  zap: ZapIcon,
  layers: LayersIcon,
  server: ServerIcon,
  users: UsersIcon,
  "trending-up": TrendingUpIcon,
  shield: ShieldIcon,
  code: CodeIcon,
  database: DatabaseIcon,
  globe: GlobeIcon,
  cpu: CpuIcon,
  package: PackageIcon,
  compass: CompassIcon,
  map: MapIcon,
  "git-branch": CodeIcon,
};

// ─── Tech descriptions ────────────────────────────────────────────────────────

const TECH_DESCRIPTIONS: Record<string, string> = {
  React: "Component-based UI library for interactive interfaces",
  TypeScript: "Type-safe JavaScript superset for robust code",
  "Next.js": "Full-stack React framework with SSR & RSC",
  "Node.js": "JavaScript runtime for backend services",
  NodeJs: "JavaScript runtime for backend services",
  Express: "Minimal Node.js web application framework",
  MongoDB: "Flexible NoSQL document database",
  PostgreSQL: "Robust relational SQL database",
  "Socket.io": "Real-time bidirectional WebSocket communication",
  SocketIO: "Real-time bidirectional WebSocket communication",
  "Tailwind CSS": "Utility-first CSS framework",
  Zustand: "Lightweight global state management",
  Strapi: "Headless CMS for content management",
  Stripe: "Secure payment processing API",
  Recharts: "Composable charting library for React",
  MapLibre: "Open-source interactive map renderer",
  SailsJS: "MVC framework for Node.js applications",
  Svelte: "Compile-time reactive frontend framework",
};

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  "overview",
  "features",
  "tech-stack",
  "gallery",
  "challenges",
  "what-i-learned",
] as const;

type Tab = (typeof TABS)[number];

const TAB_LABELS: Record<Tab, string> = {
  overview: "Overview",
  features: "Features",
  "tech-stack": "Tech Stack",
  gallery: "Gallery",
  challenges: "Challenges",
  "what-i-learned": "What I Learned",
};

const TAB_ICONS: Record<Tab, React.ElementType> = {
  overview: CompassIcon,
  features: ZapIcon,
  "tech-stack": CodeIcon,
  gallery: ImageIcon,
  challenges: AlertTriangleIcon,
  "what-i-learned": LightbulbIcon,
};

// ─── Gallery Slider ───────────────────────────────────────────────────────────

function GallerySlider({ images, compact = false }: { images: string[]; compact?: boolean }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="select-none">
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/30 shadow-[var(--shadow-card)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Project preview ${current + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]",
              compact ? "max-h-[260px]" : "max-h-[400px]",
            )}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          className="absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/80 text-foreground/70 backdrop-blur-sm transition-all duration-200 hover:border-brand-treasure/50 hover:text-brand-treasure hover:shadow-[0_0_12px_-2px_var(--brand-treasure)]"
          aria-label="Previous image"
        >
          <ChevronLeftIcon size={16} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/80 text-foreground/70 backdrop-blur-sm transition-all duration-200 hover:border-brand-treasure/50 hover:text-brand-treasure hover:shadow-[0_0_12px_-2px_var(--brand-treasure)]"
          aria-label="Next image"
        >
          <ChevronRightIcon size={16} />
        </button>

        <div className="absolute right-3 bottom-3 rounded-md bg-card/80 px-2 py-0.5 font-mono text-2xs text-muted-foreground backdrop-blur-sm">
          {current + 1} / {images.length}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200",
              i === current
                ? "w-4 bg-brand-treasure"
                : "w-1.5 bg-border hover:bg-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Learning card grid (shared between tab and bottom section) ───────────────

function LearningCardGrid({ learnings }: { learnings: ProjectLearning[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {learnings.map((learning, i) => {
        const Icon = LEARNING_ICON_MAP[learning.icon] ?? ZapIcon;
        return (
          <motion.div
            key={learning.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="group surface-card-treasure flex cursor-default flex-col items-center gap-2.5 p-3.5 text-center"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-treasure/15 transition-colors duration-200 group-hover:bg-brand-treasure/25">
              <Icon size={16} className="text-brand-treasure" />
            </div>
            <div>
              <p className="font-display text-xs font-bold text-foreground">{learning.title}</p>
              <p className="mt-0.5 font-sans text-2xs leading-snug text-muted-foreground">
                {learning.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Tab contents ─────────────────────────────────────────────────────────────

// ─── V2 shared sub-component ──────────────────────────────────────────────────

function SectionLabel({ icon: IconComponent, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <IconComponent size={13} className="shrink-0 text-brand-treasure" />
      <span className="font-display text-sm font-bold text-foreground">{text}</span>
      <div className="h-px flex-1 bg-border/30" />
    </div>
  );
}

// ─── V2 Section: Overview ─────────────────────────────────────────────────────

function OverviewSection({ project }: { project: ProjectV2 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm md:p-5"
    >
      <div className="mb-4 rounded-xl border border-brand-treasure/20 bg-brand-treasure/5 px-3.5 py-2.5">
        <p className="font-sans text-xs leading-relaxed text-brand-treasure/90">
          {project.hero.subtitle}
        </p>
      </div>
      <p className="mb-4 font-sans text-sm leading-7 text-foreground/75">
        {project.projectOverview.explanation}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/30 bg-muted/20 p-3.5">
          <p className="mb-1.5 font-display text-xs font-bold text-foreground">Core Value</p>
          <p className="font-sans text-xs leading-relaxed text-muted-foreground">
            {project.projectOverview.coreValue}
          </p>
        </div>
        <div className="rounded-xl border border-border/30 bg-muted/20 p-3.5">
          <p className="mb-1.5 font-display text-xs font-bold text-foreground">
            What Makes It Stand Out
          </p>
          <p className="font-sans text-xs leading-relaxed text-muted-foreground">
            {project.projectOverview.interestPoints}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

// ─── V2 Section: Project Snapshot ────────────────────────────────────────────

function SnapshotSection({ project }: { project: ProjectV2 }) {
  const stats = [
    { label: "Category", value: project.projectInfo.category, Icon: TagIcon },
    { label: "Role", value: project.projectInfo.role, Icon: UsersIcon },
    { label: "Duration", value: project.projectInfo.duration, Icon: ClockIcon },
    { label: "Status", value: project.projectInfo.status, Icon: CheckCircle2Icon },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card p-4"
    >
      <SectionLabel icon={CompassIcon} text="Project Snapshot" />
      <div className="mb-3.5 flex flex-wrap gap-2">
        {stats.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1.5"
          >
            <Icon size={10} className="shrink-0 text-brand-treasure/70" />
            <span className="font-sans text-2xs text-muted-foreground">{label}</span>
            <span className="h-3 w-px bg-border" aria-hidden />
            <span className="font-display text-2xs font-semibold text-foreground">{value}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {project.highlights.map((h) => (
          <div key={h} className="flex items-center gap-1.5">
            <CheckCircle2Icon size={11} className="shrink-0 text-brand-success" />
            <span className="font-sans text-xs text-foreground/75">{h}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── V2 Section: Feature Highlights ──────────────────────────────────────────

function FeaturesSection({ project }: { project: ProjectV2 }) {
  const ICONS = [ZapIcon, MonitorIcon, UsersIcon, TrendingUpIcon, ShieldIcon, GlobeIcon];
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm md:p-5"
    >
      <SectionLabel icon={ZapIcon} text="Key Features" />
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {project.keyFeatures.map((feature, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={feature.name}
              className="flex gap-3 rounded-xl border border-border/40 bg-card/30 p-3 transition-colors duration-200 hover:border-brand-treasure/30 hover:bg-card/60"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-treasure/15">
                <Icon size={13} className="text-brand-treasure" />
              </div>
              <div className="min-w-0">
                <p className="mb-0.5 font-display text-xs font-bold text-foreground">
                  {feature.name}
                </p>
                <p className="line-clamp-2 font-sans text-2xs leading-snug text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ─── V2 Section: Showcase Preview (visual centerpiece) ───────────────────────

function ShowcaseSection({ project }: { project: ProjectV2 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/80">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(from var(--brand-treasure) l c h / 1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-treasure/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-brand-info/12 blur-3xl" />

        <div className="relative flex items-center justify-center px-6 py-6 md:px-10 md:py-8">
          <img
            src={project.thumbnailImage}
            alt={project.hero.title}
            className="relative z-10 max-h-[300px] w-full object-contain drop-shadow-[0_20px_60px_oklch(from_var(--brand-treasure)_l_c_h_/_0.4)] md:max-h-[360px]"
          />
        </div>

        <div className="relative border-t border-border/20 bg-card/50 px-4 py-2.5 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {project.galleryCaptions.map((item) => (
              <span
                key={item.screen}
                className="flex items-center gap-1 font-sans text-2xs text-muted-foreground/60"
              >
                <MonitorIcon size={9} />
                {item.screen}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ─── V2 Section: Tech Stack ───────────────────────────────────────────────────

function TechSection({ project }: { project: ProjectV2 }) {
  const TECH_ICONS: Record<string, React.ElementType> = {
    "Next.js 14": GlobeIcon,
    "Next.js": GlobeIcon,
    Recoil: LayersIcon,
    "TanStack Query": DatabaseIcon,
    "Tailwind CSS": LayersIcon,
    "NextAuth.js": ShieldIcon,
    React: ZapIcon,
    TypeScript: CodeIcon,
    "Node.js": ServerIcon,
    NodeJs: ServerIcon,
    Express: ServerIcon,
    MongoDB: DatabaseIcon,
    PostgreSQL: DatabaseIcon,
    "Socket.io": ZapIcon,
    SocketIO: ZapIcon,
    Zustand: LayersIcon,
    Stripe: CpuIcon,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card p-4"
    >
      <SectionLabel icon={CodeIcon} text="Tech Stack" />
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => {
          const Icon = TECH_ICONS[tech.name] ?? CodeIcon;
          return (
            <div
              key={tech.name}
              className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1.5 transition-colors duration-200 hover:border-brand-treasure/30 hover:bg-card/60"
            >
              <Icon size={12} className="text-brand-treasure" />
              <span className="font-display text-xs font-semibold text-foreground">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ─── V2 Section: Application Screens ─────────────────────────────────────────

function PageShowcaseSection({ project }: { project: ProjectV2 }) {
  if (!project.galleryCaptions.length) return null;
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm md:p-5"
    >
      <SectionLabel icon={MonitorIcon} text="Application Screens" />
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {project.galleryCaptions.map((item, i) => (
          <div
            key={item.screen}
            className="rounded-xl border border-border/40 bg-card/30 p-3.5 transition-colors duration-200 hover:border-brand-treasure/25 hover:bg-card/50"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className="rounded-md bg-brand-treasure/10 px-1.5 py-0.5 font-mono text-2xs font-bold text-brand-treasure/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <MonitorIcon size={11} className="text-muted-foreground/30" />
            </div>
            <p className="mb-1 font-display text-xs font-bold text-foreground">{item.screen}</p>
            <p className="font-sans text-2xs leading-snug text-muted-foreground">{item.caption}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── V2 Section: Engineering Notes ───────────────────────────────────────────

function EngineeringSection({ project }: { project: ProjectV2 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm md:p-5"
    >
      <SectionLabel icon={CpuIcon} text="Engineering Highlights" />
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {project.engineeringHighlights.map((h) => (
          <div
            key={h.point}
            className="rounded-xl border border-brand-treasure/15 bg-brand-treasure/5 p-3"
          >
            <div className="mb-1.5 flex items-start gap-2">
              <ZapIcon size={11} className="mt-0.5 shrink-0 text-brand-treasure" />
              <p className="font-display text-xs font-bold text-foreground">{h.point}</p>
            </div>
            <p className="pl-[19px] font-sans text-2xs leading-relaxed text-muted-foreground">
              {h.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── V2 Section: Challenges & Learnings ──────────────────────────────────────

function ChallengesLearnedSection({ project }: { project: ProjectV2 }) {
  const LEARNED_ICONS = [LayersIcon, ZapIcon, TrendingUpIcon, CodeIcon, ServerIcon, ShieldIcon];
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm md:p-5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <SectionLabel icon={AlertTriangleIcon} text="Challenges" />
          <div className="flex flex-col gap-2.5">
            {project.challenges.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-brand-sunset/15 bg-brand-sunset/5 p-3"
              >
                <p className="mb-1 font-display text-xs font-bold text-foreground">{c.title}</p>
                <p className="font-sans text-2xs leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel icon={LightbulbIcon} text="Learnings" />
          <div className="flex flex-col gap-2.5">
            {project.whatILearned.map((item, i) => {
              const Icon = LEARNED_ICONS[i % LEARNED_ICONS.length];
              return (
                <div
                  key={item.topic}
                  className="flex gap-2.5 rounded-xl border border-border/40 bg-card/30 p-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-treasure/15">
                    <Icon size={11} className="text-brand-treasure" />
                  </div>
                  <div>
                    <p className="mb-0.5 font-display text-xs font-bold text-foreground">
                      {item.topic}
                    </p>
                    <p className="font-sans text-2xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ─── V2 Sidebar ───────────────────────────────────────────────────────────────

function SidebarV2({ project }: { project: ProjectV2 }) {
  const stats = [
    { label: "Category", value: project.projectInfo.category },
    { label: "Role", value: project.projectInfo.role },
    { label: "Duration", value: project.projectInfo.duration },
    { label: "Status", value: project.projectInfo.status },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="surface-card p-3.5">
        <div className="mb-2.5 flex items-center gap-2">
          <InfoIcon size={12} className="text-brand-treasure" />
          <h3 className="font-display text-xs font-bold text-foreground">Project Info</h3>
        </div>
        <div className="flex flex-col divide-y divide-border/30">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-2 py-1.5 first:pt-0 last:pb-0"
            >
              <span className="font-sans text-2xs text-muted-foreground">{label}</span>
              <span className="text-right font-sans text-2xs font-medium text-foreground/85">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card p-3.5">
        <div className="mb-2.5 flex items-center gap-2">
          <StarIcon size={12} className="text-brand-treasure" />
          <h3 className="font-display text-xs font-bold text-foreground">Highlights</h3>
        </div>
        <ul className="flex flex-col gap-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-1.5">
              <CheckCircle2Icon size={10} className="mt-0.5 shrink-0 text-brand-success" />
              <span className="font-sans text-2xs leading-snug text-foreground/75">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── V2 Page layout ───────────────────────────────────────────────────────────

function ProjectDetailV2PageContent({ project }: { project: ProjectV2 }) {
  return (
    <>
      <div className="relative z-10 flex-1 bg-background px-3 pt-4 pb-6 md:px-5 md:pt-5 md:pb-8 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* Left: continuous scroll sections */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-w-0 flex-1 flex-col gap-3"
          >
            <OverviewSection project={project} />
            <SnapshotSection project={project} />
            <FeaturesSection project={project} />
            <ShowcaseSection project={project} />
            <TechSection project={project} />
            <PageShowcaseSection project={project} />
            <EngineeringSection project={project} />
            <ChallengesLearnedSection project={project} />
          </motion.div>

          {/* Right: compact sticky sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-4 lg:w-[260px] lg:shrink-0 lg:self-start"
          >
            <SidebarV2 project={project} />
          </motion.div>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-6">
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} />© 2026 Azar. All rights reserved.
        </span>
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} className="text-brand-treasure" />
          Sailing the React seas
        </span>
      </footer>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ProjectDetailPageInner() {
  const { projectId } = useParams({ strict: false }) as { projectId?: string };

  const project = projectId ? getProjectV2(projectId) : undefined;

  if (!project) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <CompassIcon size={48} className="mb-4 text-muted-foreground/30" />
        <h2 className="font-display text-xl font-bold text-foreground">Project Not Found</h2>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          The project you are looking for does not exist or has been moved.
        </p>
      </div>
    );
  }

  return <ProjectDetailV2PageContent project={project} />;
}

export const ProjectDetailPage = memo(ProjectDetailPageInner);
