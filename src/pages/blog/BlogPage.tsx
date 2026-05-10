import { AnimatePresence, motion } from "framer-motion";
import { AnchorIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";

import { useBlogCategory } from "@/contexts/blog-category";
import { cn } from "@/lib/utils";

import { BlogPostCard } from "./BlogPostCard";
import { CategoriesWidget } from "./CategoriesWidget";
import { POSTS } from "./data";
import { LetsConnectWidget } from "./LetsConnectWidget";
import { PopularPostsWidget } from "./PopularPostsWidget";

const POSTS_PER_PAGE = 10;
const TOTAL_PAGES = 1;

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        aria-label="Previous page"
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-card/60 text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-treasure/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeftIcon size={13} />
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg font-sans text-xs font-medium transition-all duration-150 hover:-translate-y-0.5",
            page === current
              ? "bg-brand-sun/90 text-primary-foreground shadow-sm"
              : "border border-border/60 bg-card/60 text-muted-foreground hover:border-brand-treasure/30 hover:text-foreground",
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        aria-label="Next page"
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-card/60 text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-treasure/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRightIcon size={13} />
      </button>
    </div>
  );
}

// ─── Blog page ────────────────────────────────────────────────────────────────

function BlogPageInner() {
  const { activeCategory } = useBlogCategory();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return POSTS;
    return POSTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const featuredPost = paginated[0]?.featured ? paginated[0] : null;
  const gridPosts = featuredPost ? paginated.slice(1) : paginated;

  return (
    <>
      <div className="relative z-10 flex-1 bg-background px-3 pt-4 pb-6 md:px-5 md:pt-5 md:pb-8 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* Left: blog feed */}
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <AnimatePresence mode="wait">
              {paginated.length > 0 ? (
                <motion.div
                  key={`${activeCategory}-${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-2.5"
                >
                  {featuredPost && (
                    <BlogPostCard post={featuredPost} index={0} variant="featured" />
                  )}

                  {gridPosts.length > 0 && (
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {gridPosts.map((post, i) => {
                        const isLastOdd = gridPosts.length % 2 !== 0 && i === gridPosts.length - 1;
                        return (
                          <div key={post.id} className={isLastOdd ? "sm:col-span-2" : ""}>
                            <BlogPostCard
                              post={post}
                              index={featuredPost ? i + 1 : i}
                              variant="compact"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/50 bg-card/30 py-12"
                >
                  <AnchorIcon size={24} className="text-muted-foreground/40" />
                  <p className="font-sans text-sm text-muted-foreground">
                    No posts found in this category.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {filtered.length > POSTS_PER_PAGE && (
              <div className="mt-1.5 flex justify-center">
                <Pagination
                  current={page}
                  total={Math.ceil(filtered.length / POSTS_PER_PAGE)}
                  onChange={setPage}
                />
              </div>
            )}
          </div>

          {/* Right: sidebar widgets */}
          <div className="flex flex-col gap-3 lg:w-[248px] lg:shrink-0 xl:w-[264px]">
            <PopularPostsWidget />
            <CategoriesWidget />
            <LetsConnectWidget />
          </div>
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

export const BlogPage = memo(BlogPageInner);
