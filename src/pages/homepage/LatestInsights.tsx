import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRightIcon, BookOpenIcon, ClockIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { POSTS } from "@/pages/blog/data";

export function LatestInsights() {
  const items = POSTS.slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6"
    >
      <CardWatermark asset="skull" position="bottom-right" size={150} opacity={0.05} rotate={-15} />

      {/* Header */}
      <div className="relative mb-3 flex shrink-0 items-center justify-between">
        <h2 className="flex items-center gap-2 heading-section text-lg text-foreground">
          <BookOpenIcon size={16} className="text-brand-sunset" />
          Latest Insights
        </h2>
        <Link
          to="/blog"
          viewTransition
          preload="intent"
          className="flex items-center gap-1 font-sans text-xs text-brand-sunset transition-colors duration-[var(--duration-base)] hover:text-brand-sunset-hover"
        >
          View All
          <ArrowRightIcon size={12} />
        </Link>
      </div>

      {/* Compact list — title + read time only */}
      <div className="relative flex flex-col divide-y divide-border/40">
        {items.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/blog/$postId"
              params={{ postId: post.id }}
              viewTransition
              preload="intent"
              className="group flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <span className="shrink-0 font-mono text-2xs font-bold text-muted-foreground/60 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 line-clamp-1 font-sans text-xs leading-snug font-semibold text-card-foreground transition-colors group-hover:text-brand-sunset">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1 font-sans text-2xs text-muted-foreground">
                  <ClockIcon size={9} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <ArrowRightIcon
                size={12}
                className="shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-brand-sunset"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
