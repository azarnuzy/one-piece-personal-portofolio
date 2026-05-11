import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRightIcon, FlameIcon, TrophyIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { cn } from "@/lib/utils";

import { CATEGORY_LABEL, POPULAR_POSTS, type ThumbnailKey } from "./data";

const THUMB_ACCENT: Record<ThumbnailKey, string> = {
  journey: "bg-brand-info/10 text-brand-info border-brand-info/20",
  react: "bg-brand-info/10 text-brand-info border-brand-info/20",
  websocket: "bg-brand-success/10 text-brand-success border-brand-success/20",
  javascript: "bg-brand-sun/10 text-brand-sun border-brand-sun/20",
};

const RANK_TONE = ["text-brand-treasure", "text-brand-sunset/80", "text-brand-info/70"];

export function PopularPostsSidebar() {
  return (
    <GoldPanelCard padding="sm" className="h-fit">
      <CardWatermark asset="skull" position="bottom-right" size={90} opacity={0.03} rotate={-12} />

      <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-2">
          <TrophyIcon size={14} className="text-brand-treasure" />
          <h2 className="heading-section text-xs font-bold text-foreground">Popular Posts</h2>
        </div>
        <FlameIcon size={12} className="animate-pulse text-brand-sunset" />
      </div>

      <ul className="flex flex-col gap-4">
        {POPULAR_POSTS.map((post, i) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              to="/blog/$postId"
              params={{ postId: post.id }}
              className="group flex gap-3 transition-all duration-200"
            >
              <div className="relative shrink-0">
                <span
                  className={cn(
                    "absolute -top-2 -left-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-border/40 bg-card text-[10px] font-bold tabular-nums shadow-sm transition-transform group-hover:scale-110",
                    RANK_TONE[i] ?? "text-muted-foreground/50",
                  )}
                >
                  {i + 1}
                </span>
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl border font-display text-base font-bold transition-all duration-300 group-hover:scale-105 group-hover:rotate-3",
                    THUMB_ACCENT[post.thumbnailKey],
                  )}
                >
                  {post.title.charAt(0)}
                </div>
              </div>

              <div className="min-w-0 flex-1 py-0.5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-sans text-[9px] font-bold tracking-wider text-brand-treasure/80 uppercase">
                    {CATEGORY_LABEL[post.category]}
                  </span>
                </div>
                <h3 className="line-clamp-2 font-sans text-[11px] leading-tight font-semibold text-foreground/90 transition-colors group-hover:text-brand-treasure">
                  {post.title}
                </h3>
              </div>

              <div className="flex items-center self-center pl-1 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                <ArrowRightIcon size={11} className="text-brand-treasure" />
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border border-brand-treasure/20 bg-brand-treasure/5 p-3 ring-1 ring-brand-treasure/10">
        <p className="font-display text-[11px] font-bold text-foreground">Sailing further?</p>
        <p className="mt-1 font-sans text-[10px] leading-relaxed text-muted-foreground/80">
          Check out my latest technical deep-dives and tutorials.
        </p>
      </div>
    </GoldPanelCard>
  );
}
