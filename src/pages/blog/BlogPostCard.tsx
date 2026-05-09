import { motion } from "framer-motion";
import { ArrowRightIcon, CalendarIcon, ClockIcon, HeartIcon, StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { CATEGORY_LABEL, type BlogPost, type ThumbnailKey } from "./data";

// ─── Thumbnail visuals ────────────────────────────────────────────────────────

const THUMBNAIL_META: Record<
  ThumbnailKey,
  { bg: string; accent: string; icon: React.ReactNode; pattern: string }
> = {
  journey: {
    bg: "from-[oklch(from_var(--brand-ink)_calc(l+0.04)_c_h)] to-[oklch(from_var(--brand-info)_calc(l-0.25)_calc(c*0.6)_h)]",
    accent: "oklch(from var(--brand-treasure) l c h / 0.9)",
    pattern: "circle",
    icon: (
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        {/* Ship wheel */}
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.9" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="24"
            y1="24"
            x2={24 + 16 * Math.cos((deg * Math.PI) / 180)}
            y2={24 + 16 * Math.sin((deg * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.6"
          />
        ))}
        {/* Moon */}
        <path d="M36 10 A8 8 0 1 0 36 26 A6 6 0 1 1 36 10Z" fill="currentColor" opacity="0.5" />
        {/* Ocean waves */}
        <path
          d="M2 38 Q8 35 14 38 Q20 41 26 38 Q32 35 38 38 Q44 41 48 38"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.3"
          fill="none"
        />
        <path
          d="M2 43 Q8 40 14 43 Q20 46 26 43 Q32 40 38 43 Q44 46 48 43"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.2"
          fill="none"
        />
      </svg>
    ),
  },
  react: {
    bg: "from-[oklch(from_var(--brand-info)_calc(l-0.35)_calc(c*0.7)_h)] to-[oklch(from_var(--brand-ink)_calc(l+0.02)_c_h)]",
    accent: "oklch(from var(--brand-info) l c h / 0.85)",
    pattern: "ellipse",
    icon: (
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        {/* React atom */}
        <ellipse
          cx="24"
          cy="24"
          rx="22"
          ry="9"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="22"
          ry="9"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
          transform="rotate(60 24 24)"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="22"
          ry="9"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
          transform="rotate(120 24 24)"
        />
        <circle cx="24" cy="24" r="3.5" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  websocket: {
    bg: "from-[oklch(from_var(--brand-success)_calc(l-0.35)_calc(c*0.8)_h)] to-[oklch(from_var(--brand-ink)_calc(l+0.03)_c_h)]",
    accent: "oklch(from var(--brand-success) l c h / 0.85)",
    pattern: "lines",
    icon: (
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        {/* Network nodes */}
        <circle cx="8" cy="24" r="3.5" fill="currentColor" opacity="0.8" />
        <circle cx="24" cy="10" r="3.5" fill="currentColor" opacity="0.8" />
        <circle cx="40" cy="24" r="3.5" fill="currentColor" opacity="0.8" />
        <circle cx="24" cy="38" r="3.5" fill="currentColor" opacity="0.8" />
        <circle cx="24" cy="24" r="4.5" fill="currentColor" opacity="0.95" />
        <line
          x1="11"
          y1="24"
          x2="20"
          y2="24"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="28"
          y1="24"
          x2="37"
          y2="24"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="24"
          y1="13"
          x2="24"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="24"
          y1="28"
          x2="24"
          y2="35"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line x1="11" y1="22" x2="22" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="26" y1="12" x2="37" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  javascript: {
    bg: "from-[oklch(from_var(--brand-sun)_calc(l-0.35)_calc(c*0.9)_h)] to-[oklch(from_var(--brand-ink)_calc(l+0.02)_c_h)]",
    accent: "oklch(from var(--brand-sun) l c h / 0.9)",
    pattern: "dots",
    icon: (
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        {/* JS curly braces */}
        <path
          d="M16 8 C10 8 10 14 10 18 C10 22 6 22 6 24 C6 26 10 26 10 30 C10 34 10 40 16 40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M32 8 C38 8 38 14 38 18 C38 22 42 22 42 24 C42 26 38 26 38 30 C38 34 38 40 32 40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Code lines */}
        <line
          x1="18"
          y1="20"
          x2="30"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <line
          x1="18"
          y1="24"
          x2="26"
          y2="24"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <line
          x1="18"
          y1="28"
          x2="30"
          y2="28"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>
    ),
  },
};

function BlogThumbnail({
  thumbnailKey,
  featured,
}: {
  thumbnailKey: ThumbnailKey;
  featured?: boolean;
}) {
  const meta = THUMBNAIL_META[thumbnailKey];

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl",
        featured
          ? "h-[140px] w-[180px] md:h-[160px] md:w-[210px]"
          : "h-[90px] w-[110px] md:h-[100px] md:w-[130px]",
      )}
    >
      {/* Base gradient background */}
      <div className={cn("absolute inset-0 bg-gradient-to-br", meta.bg)} />

      {/* Subtle pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-4 -right-4 h-20 w-20 rounded-full blur-2xl"
        style={{ background: meta.accent, opacity: 0.35 }}
      />

      {/* Icon */}
      <div
        className={cn("relative z-10", featured ? "h-12 w-12" : "h-8 w-8")}
        style={{ color: meta.accent }}
      >
        {meta.icon}
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-black/30 via-transparent to-transparent" />

      {/* Hover image zoom effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl transition-transform duration-500 group-hover:scale-105" />
    </div>
  );
}

// ─── Meta row ────────────────────────────────────────────────────────────────

function BlogMeta({
  date,
  readTime,
  category,
}: {
  date: string;
  readTime: number;
  category: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-2xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <CalendarIcon size={10} />
        {date}
      </span>
      <span className="h-2.5 w-px bg-border" aria-hidden />
      <span className="flex items-center gap-1">
        <ClockIcon size={10} />
        {readTime} min read
      </span>
      <span className="h-2.5 w-px bg-border" aria-hidden />
      <span className="inline-flex items-center rounded-full bg-brand-treasure/10 px-2 py-0.5 text-2xs font-medium text-brand-treasure">
        {category}
      </span>
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

interface BlogPostCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-3.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-treasure/30 hover:shadow-[var(--shadow-card-lg)] md:p-4"
    >
      {/* Featured ribbon */}
      {post.featured && (
        <div className="pointer-events-none absolute top-0 left-0 z-10">
          <div className="flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-brand-sunset/90 px-2.5 py-1 shadow-sm">
            <StarIcon size={9} className="text-brand-parchment" fill="currentColor" />
            <span className="font-display text-2xs font-bold tracking-wider text-brand-parchment uppercase">
              Featured
            </span>
          </div>
        </div>
      )}

      {/* Thumbnail */}
      <BlogThumbnail thumbnailKey={post.thumbnailKey} featured={post.featured} />

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3
            className={cn(
              "heading-section leading-snug text-foreground transition-colors group-hover:text-brand-treasure",
              post.featured ? "text-base md:text-lg" : "text-sm md:text-base",
            )}
          >
            {post.title}
          </h3>
          <p className="line-clamp-2 font-sans text-xs leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <BlogMeta
            date={post.date}
            readTime={post.readTime}
            category={CATEGORY_LABEL[post.category]}
          />

          {/* Like + arrow */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-1 font-sans text-2xs text-muted-foreground">
              <HeartIcon
                size={11}
                className="text-brand-sunset/70 transition-colors group-hover:text-brand-sunset"
              />
              {post.likes}
            </span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-brand-treasure/40 group-hover:text-brand-treasure">
              <ArrowRightIcon size={11} />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
