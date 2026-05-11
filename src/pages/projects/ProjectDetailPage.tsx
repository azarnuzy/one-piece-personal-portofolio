import { SiGithub } from "@icons-pack/react-simple-icons";
import { useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangleIcon,
  AnchorIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  CompassIcon,
  CpuIcon,
  DatabaseIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GlobeIcon,
  HeartIcon,
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
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { memo, useState } from "react";

import { cn } from "@/lib/utils";

import {
  getProjectDetail,
  PROJECT_DETAILS,
  type ProjectDetail,
  type ProjectLearning,
  type LearningIcon,
} from "./data";

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

        {/* Navigation arrows */}
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

        {/* Image counter badge */}
        <div className="absolute right-3 bottom-3 rounded-md bg-card/80 px-2 py-0.5 font-mono text-2xs text-muted-foreground backdrop-blur-sm">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Pagination dots */}
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

function OverviewTab({ project }: { project: ProjectDetail }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <CompassIcon size={15} className="text-brand-treasure" />
          <h3 className="font-display text-base font-bold text-foreground">Project Overview</h3>
        </div>
        <p className="font-sans text-sm leading-7 text-foreground/75">{project.fullDescription}</p>
      </div>

      <div>
        <h4 className="mb-2 font-display text-sm font-semibold text-foreground">Architecture</h4>
        <p className="font-sans text-sm leading-7 text-foreground/70">{project.architecture}</p>
      </div>

      <div>
        <h4 className="mb-2 font-display text-sm font-semibold text-foreground">Goals</h4>
        <ul className="flex flex-col gap-2">
          {project.goals.map((goal) => (
            <li key={goal} className="flex items-start gap-2 font-sans text-sm text-foreground/70">
              <AnchorIcon size={12} className="mt-1 shrink-0 text-brand-treasure/60" />
              {goal}
            </li>
          ))}
        </ul>
      </div>

      <GallerySlider images={project.gallery} compact />
    </div>
  );
}

function FeaturesTab({ project }: { project: ProjectDetail }) {
  const FEATURE_ICONS = [ZapIcon, MonitorIcon, UsersIcon, TrendingUpIcon, ShieldIcon];
  return (
    <div className="flex flex-col gap-3">
      {project.features.map((feature, i) => {
        const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: i * 0.07 }}
            className="flex gap-3 rounded-xl border border-border/40 bg-card/30 p-3.5 transition-all duration-200 hover:border-brand-treasure/30 hover:bg-card/60"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-treasure/15">
              <Icon size={14} className="text-brand-treasure" />
            </div>
            <div className="min-w-0">
              <p className="mb-1 font-display text-sm font-bold text-foreground">{feature.title}</p>
              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function TechStackTab({ project }: { project: ProjectDetail }) {
  const TECH_ICONS: Record<string, React.ElementType> = {
    React: ZapIcon,
    TypeScript: CodeIcon,
    "Next.js": GlobeIcon,
    "Node.js": ServerIcon,
    NodeJs: ServerIcon,
    Express: ServerIcon,
    MongoDB: DatabaseIcon,
    PostgreSQL: DatabaseIcon,
    "Socket.io": ZapIcon,
    SocketIO: ZapIcon,
    "Tailwind CSS": LayersIcon,
    Zustand: LayersIcon,
    Strapi: PackageIcon,
    Stripe: CpuIcon,
    Recharts: TrendingUpIcon,
    MapLibre: MapIcon,
    SailsJS: ServerIcon,
    Svelte: ZapIcon,
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {project.tech.map((tech, i) => {
        const Icon = TECH_ICONS[tech] ?? CodeIcon;
        return (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, delay: i * 0.06 }}
            className="flex flex-col gap-2.5 rounded-xl border border-border/40 bg-card/30 p-3.5 transition-all duration-200 hover:border-brand-treasure/30 hover:bg-card/60"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-treasure/15">
              <Icon size={15} className="text-brand-treasure" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-foreground">{tech}</p>
              <p className="mt-0.5 font-sans text-2xs leading-snug text-muted-foreground">
                {TECH_DESCRIPTIONS[tech] ?? "Core technology used in this project"}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function GalleryTab({ project }: { project: ProjectDetail }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans text-xs text-muted-foreground">
        Browse through screenshots and previews of the application in action.
      </p>
      <GallerySlider images={project.gallery} />
    </div>
  );
}

function ChallengesTab({ project }: { project: ProjectDetail }) {
  return (
    <div className="flex flex-col gap-4">
      {project.challenges.map((challenge, i) => (
        <motion.div
          key={challenge.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className="rounded-xl border border-brand-sunset/20 bg-brand-sunset/5 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangleIcon size={13} className="shrink-0 text-brand-sunset" />
            <p className="font-display text-sm font-bold text-foreground">{challenge.title}</p>
          </div>
          <p className="font-sans text-sm leading-relaxed text-foreground/70">
            {challenge.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tabs container ───────────────────────────────────────────────────────────

function DetailTabs({ project }: { project: ProjectDetail }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
      {/* Tab bar */}
      <div className="-mb-px flex flex-wrap border-b border-border/40 px-4 md:px-5">
        {TABS.map((tab) => {
          const Icon = TAB_ICONS[tab];
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex items-center gap-1.5 border-b-2 px-3 py-2.5 font-sans text-xs font-medium transition-all duration-200",
                isActive
                  ? "border-brand-treasure text-brand-treasure"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon size={11} />
              {TAB_LABELS[tab]}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-4 md:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === "overview" && <OverviewTab project={project} />}
            {activeTab === "features" && <FeaturesTab project={project} />}
            {activeTab === "tech-stack" && <TechStackTab project={project} />}
            {activeTab === "gallery" && <GalleryTab project={project} />}
            {activeTab === "challenges" && <ChallengesTab project={project} />}
            {activeTab === "what-i-learned" && <LearningCardGrid learnings={project.learnings} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── What I Learned — persistent bottom section ───────────────────────────────

function WhatILearnedSection({ project }: { project: ProjectDetail }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm md:p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <LightbulbIcon size={15} className="text-brand-treasure" />
        <h3 className="font-display text-base font-bold text-foreground">What I Learned</h3>
      </div>
      <LearningCardGrid learnings={project.learnings} />
    </motion.div>
  );
}

// ─── Right sidebar: Status badge ──────────────────────────────────────────────

function StatusBadge({ status }: { status: "Completed" | "In Progress" }) {
  const isCompleted = status === "Completed";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-display text-2xs font-bold",
        isCompleted ? "bg-brand-success/15 text-brand-success" : "bg-brand-warn/15 text-brand-warn",
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
            isCompleted ? "bg-brand-success" : "bg-brand-warn",
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            isCompleted ? "bg-brand-success" : "bg-brand-warn",
          )}
        />
      </span>
      {status}
    </span>
  );
}

// ─── Right sidebar: info row ──────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 first:pt-0 last:pb-0 [&+&]:border-t [&+&]:border-border/30">
      <span className="font-sans text-xs text-muted-foreground">{label}</span>
      <span className="font-sans text-xs font-medium text-foreground/85">{value}</span>
    </div>
  );
}

// ─── Right sidebar cards ──────────────────────────────────────────────────────

function ProjectInfoCard({ project }: { project: ProjectDetail }) {
  return (
    <div className="surface-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <InfoIcon size={13} className="text-brand-treasure" />
        <h3 className="font-display text-sm font-bold text-foreground">Project Information</h3>
      </div>
      <div className="flex flex-col">
        <InfoRow label="Category" value={project.type} />
        <InfoRow label="Role" value={project.role} />
        <InfoRow label="Duration" value={project.duration} />
        <InfoRow label="Completion" value={project.completion} />
        <InfoRow label="Status" value={<StatusBadge status={project.status} />} />
      </div>
    </div>
  );
}

function KeyHighlightsCard({ project }: { project: ProjectDetail }) {
  return (
    <div className="surface-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <StarIcon size={13} className="text-brand-treasure" />
        <h3 className="font-display text-sm font-bold text-foreground">Key Highlights</h3>
      </div>
      <ul className="flex flex-col gap-2">
        {project.highlights.map((h) => (
          <li
            key={h}
            className="flex items-start gap-2 font-sans text-xs leading-relaxed text-foreground/75"
          >
            <CheckCircle2Icon size={12} className="mt-0.5 shrink-0 text-brand-success" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LivePreviewCard({ project }: { project: ProjectDetail }) {
  return (
    <div className="surface-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <MonitorIcon size={13} className="text-brand-treasure" />
        <h3 className="font-display text-sm font-bold text-foreground">Live Preview</h3>
      </div>
      <p className="mb-3 font-sans text-xs leading-relaxed text-muted-foreground">
        Experience the live application deployed and running.
      </p>
      <a
        href={project.liveUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-treasure/40 bg-brand-treasure/10 px-4 py-2.5 font-display text-xs font-bold text-brand-treasure transition-all duration-200 hover:border-brand-treasure/60 hover:bg-brand-treasure/20 hover:shadow-[0_0_16px_-4px_oklch(from_var(--brand-treasure)_l_c_h_/_0.4)]"
      >
        <ExternalLinkIcon size={12} />
        Visit Live Demo
      </a>
    </div>
  );
}

function SourceCodeCard({ project }: { project: ProjectDetail }) {
  return (
    <div className="surface-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <SiGithub size={13} className="text-brand-treasure" />
        <h3 className="font-display text-sm font-bold text-foreground">Source Code</h3>
      </div>
      <p className="mb-3 font-sans text-xs leading-relaxed text-muted-foreground">
        Check out the source code on GitHub.
      </p>
      <a
        href={project.githubUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-4 py-2.5 font-display text-xs font-bold text-foreground/80 transition-all duration-200 hover:border-brand-treasure/40 hover:bg-muted/50 hover:text-brand-treasure"
      >
        <SiGithub size={12} />
        View on GitHub
      </a>
    </div>
  );
}

function DownloadReportCard({ project }: { project: ProjectDetail }) {
  return (
    <div className="surface-card p-4">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <FileTextIcon size={13} className="text-brand-treasure" />
            <h3 className="font-display text-sm font-bold text-foreground">
              Download Project Report
            </h3>
          </div>
          <p className="mb-3 font-sans text-xs leading-relaxed text-muted-foreground">
            Detailed documentation, setup guide, and system overview.
          </p>
          <a
            href={project.downloadUrl ?? "#"}
            download
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-sun/40 bg-brand-sun/10 px-4 py-2.5 font-display text-xs font-bold text-brand-sun transition-all duration-200 hover:border-brand-sun/60 hover:bg-brand-sun/20 hover:shadow-[0_0_16px_-4px_oklch(from_var(--brand-sun)_l_c_h_/_0.4)]"
          >
            <DownloadIcon size={12} />
            Download PDF
          </a>
        </div>
        <div className="hidden shrink-0 opacity-30 sm:block">
          <ScrollIcon size={44} className="text-brand-treasure" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ProjectDetailPageInner() {
  const { projectId } = useParams({ strict: false }) as { projectId?: string };
  const project = projectId
    ? (getProjectDetail(projectId) ?? PROJECT_DETAILS[0])
    : PROJECT_DETAILS[0];

  return (
    <>
      <div className="relative z-10 flex-1 bg-background px-3 pt-4 pb-6 md:px-5 md:pt-5 md:pb-8 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* Left: tabs + what I learned */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-w-0 flex-1 flex-col gap-4"
          >
            <DetailTabs project={project} />
            <WhatILearnedSection project={project} />
          </motion.div>

          {/* Right: info cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 lg:w-[420px] lg:shrink-0"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ProjectInfoCard project={project} />
              <KeyHighlightsCard project={project} />
              <LivePreviewCard project={project} />
              <SourceCodeCard project={project} />
            </div>
            <DownloadReportCard project={project} />
          </motion.div>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-6">
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} />© 2026 Azar. All rights reserved.
        </span>
        <span className="flex items-center gap-1.5">
          Made with <HeartIcon size={11} className="text-brand-sunset" /> and lots of ☕
        </span>
      </footer>
    </>
  );
}

export const ProjectDetailPage = memo(ProjectDetailPageInner);
