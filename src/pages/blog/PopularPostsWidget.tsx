import { TrendingUpIcon, HeartIcon } from "lucide-react";

import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { cn } from "@/lib/utils";

import { POPULAR_POSTS, type ThumbnailKey } from "./data";

const THUMBNAIL_ACCENT: Record<ThumbnailKey, string> = {
  journey: "bg-brand-info/20 text-brand-info",
  react: "bg-brand-info/20 text-brand-info",
  websocket: "bg-brand-success/20 text-brand-success",
  javascript: "bg-brand-sun/20 text-brand-sun",
};

export function PopularPostsWidget() {
  return (
    <GoldPanelCard padding="md" static>
      <SectionHeader icon={TrendingUpIcon} title="Popular Posts" tone="treasure" />

      <ol className="flex flex-col gap-3">
        {POPULAR_POSTS.map((post, i) => (
          <li
            key={post.id}
            className="group flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors duration-150 hover:bg-muted/50"
          >
            {/* Index */}
            <span className="w-5 shrink-0 text-center heading-display text-sm leading-none text-brand-treasure/50">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Thumbnail placeholder */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold",
                THUMBNAIL_ACCENT[post.thumbnailKey],
              )}
            >
              {post.title.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="line-clamp-2 font-sans text-xs leading-snug font-medium text-foreground transition-colors group-hover:text-brand-treasure">
                {post.title}
              </p>
              <span className="flex items-center gap-1 font-sans text-2xs text-muted-foreground">
                <HeartIcon size={9} className="text-brand-sunset/60" />
                {post.likes}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </GoldPanelCard>
  );
}
