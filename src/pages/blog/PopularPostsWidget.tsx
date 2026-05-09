import { HeartIcon, TrendingUpIcon } from "lucide-react";

import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { cn } from "@/lib/utils";

import { POPULAR_POSTS, type ThumbnailKey } from "./data";

const THUMBNAIL_ACCENT: Record<ThumbnailKey, string> = {
  journey: "bg-brand-info/15 text-brand-info border-brand-info/20",
  react: "bg-brand-info/15 text-brand-info border-brand-info/20",
  websocket: "bg-brand-success/15 text-brand-success border-brand-success/20",
  javascript: "bg-brand-sun/15 text-brand-sun border-brand-sun/20",
};

const RANK_COLORS = ["text-brand-treasure", "text-muted-foreground/70", "text-muted-foreground/50"];

export function PopularPostsWidget() {
  return (
    <GoldPanelCard padding="sm" static>
      <SectionHeader icon={TrendingUpIcon} title="Popular Posts" tone="treasure" />

      <ol className="flex flex-col divide-y divide-border/30">
        {POPULAR_POSTS.map((post, i) => (
          <li
            key={post.id}
            className="group flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-2 transition-all duration-150 first:pt-0 last:pb-0 hover:bg-muted/40"
          >
            {/* Rank */}
            <span
              className={cn(
                "w-4 shrink-0 text-center font-display text-xs leading-none font-bold tabular-nums",
                RANK_COLORS[i] ?? "text-muted-foreground/40",
              )}
            >
              {i + 1}
            </span>

            {/* Thumbnail initial */}
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-display text-xs font-bold transition-all duration-150 group-hover:scale-105",
                THUMBNAIL_ACCENT[post.thumbnailKey],
              )}
            >
              {post.title.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="line-clamp-2 font-sans text-xs leading-snug font-medium text-foreground/90 transition-colors group-hover:text-brand-treasure">
                {post.title}
              </p>
              <span className="flex items-center gap-1 font-sans text-2xs text-muted-foreground">
                <HeartIcon size={8} className="text-brand-sunset/60" />
                {post.likes} likes
              </span>
            </div>
          </li>
        ))}
      </ol>
    </GoldPanelCard>
  );
}
