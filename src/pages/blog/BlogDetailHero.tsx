import { useNavigate, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, HeartIcon, StarIcon } from "lucide-react";
import { memo } from "react";

import { CATEGORY_LABEL, POSTS } from "./data";

// ─── Blog Detail Hero Content ─────────────────────────────────────────────────

function BlogDetailHeroContentInner() {
  const { postId } = useParams({ strict: false }) as { postId?: string };
  const navigate = useNavigate();
  const post = postId ? (POSTS.find((p) => p.id === postId) ?? POSTS[0]) : POSTS[0];

  return (
    <div className="relative flex flex-1 items-center">
      <div className="z-10 max-w-[800px] flex-1 px-4 pb-8 md:px-8 md:pb-10">
        {/* Back button */}
        <motion.button
          type="button"
          onClick={() => navigate({ to: "/blog" })}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex items-center gap-1.5 font-sans text-xs text-muted-foreground transition-colors hover:text-brand-treasure"
        >
          <ArrowLeftIcon size={13} />
          Back to Blog
        </motion.button>

        {/* Badge row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-3 flex items-center gap-2"
        >
          {post.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-sunset/90 px-3 py-1 font-display text-2xs font-bold tracking-wider text-brand-parchment uppercase shadow-sm">
              <StarIcon size={9} fill="currentColor" />
              Featured Post
            </span>
          )}
          <span className="inline-flex items-center rounded-full bg-brand-treasure/15 px-2.5 py-1 font-sans text-2xs font-semibold tracking-wide text-brand-treasure">
            {CATEGORY_LABEL[post.category]}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 line-clamp-3 heading-display text-3xl leading-tight text-foreground md:text-4xl xl:text-5xl"
        >
          {post.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mb-5 max-w-lg font-sans text-sm leading-relaxed text-secondary-foreground md:text-base"
        >
          {post.description}
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.34 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-treasure/20 font-display text-xs font-bold text-brand-treasure">
              A
            </div>
            <span className="font-medium text-foreground/80">Azar</span>
          </div>

          <span className="h-3 w-px bg-border" aria-hidden />

          <span className="flex items-center gap-1">
            <CalendarIcon size={11} />
            {post.date}
          </span>

          <span className="h-3 w-px bg-border" aria-hidden />

          <span className="flex items-center gap-1">
            <ClockIcon size={11} />
            {post.readTime} min read
          </span>

          <span className="h-3 w-px bg-border" aria-hidden />

          <span className="flex items-center gap-1">
            <HeartIcon size={11} className="text-brand-sunset/70" />
            {post.likes} likes
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export const BlogDetailHeroContent = memo(BlogDetailHeroContentInner);
