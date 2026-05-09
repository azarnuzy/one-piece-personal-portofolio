import { AnimatePresence, motion } from "framer-motion";
import { AnchorIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Sidebar } from "@/components/portfolio/Sidebar";
import { cn } from "@/lib/utils";

import { BlogHero } from "./BlogHero";
import { BlogPostCard } from "./BlogPostCard";
import { CategoriesWidget } from "./CategoriesWidget";
import { POSTS, type BlogCategory } from "./data";
import { LetsConnectWidget } from "./LetsConnectWidget";
import { PopularPostsWidget } from "./PopularPostsWidget";

const POSTS_PER_PAGE = 4;
const TOTAL_PAGES = 4;

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
      {/* Prev */}
      <button
        type="button"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-card/60 text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-treasure/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeftIcon size={14} />
      </button>

      {/* Pages */}
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg font-sans text-xs font-medium transition-all duration-150 hover:-translate-y-0.5",
            page === current
              ? "bg-brand-sun/90 text-primary-foreground shadow-sm"
              : "border border-border/60 bg-card/60 text-muted-foreground hover:border-brand-treasure/30 hover:text-foreground",
          )}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        type="button"
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-card/60 text-muted-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-treasure/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRightIcon size={14} />
      </button>
    </div>
  );
}

// ─── Blog page ────────────────────────────────────────────────────────────────

export function BlogPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return POSTS;
    return POSTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function handleCategoryChange(cat: BlogCategory) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex min-w-0 flex-1 flex-col md:ml-[220px]">
        {/* Hero */}
        <BlogHero
          onOpenSidebar={() => setSidebarOpen(true)}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Content */}
        <div className="relative z-10 flex-1 bg-background px-4 pt-4 pb-8 md:px-6 md:pt-5 md:pb-10 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            {/* Left: blog feed */}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <AnimatePresence mode="wait">
                {paginated.length > 0 ? (
                  <motion.div
                    key={`${activeCategory}-${page}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-3"
                  >
                    {paginated.map((post, i) => (
                      <BlogPostCard key={post.id} post={post} index={i} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/50 bg-card/30 py-16"
                  >
                    <AnchorIcon size={28} className="text-muted-foreground/40" />
                    <p className="font-sans text-sm text-muted-foreground">
                      No posts found in this category.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              {filtered.length > 0 && (
                <div className="mt-2 flex justify-center">
                  <Pagination current={page} total={TOTAL_PAGES} onChange={setPage} />
                </div>
              )}
            </div>

            {/* Right: sidebar widgets */}
            <div className="flex flex-col gap-4 lg:w-[260px] lg:shrink-0 xl:w-[280px]">
              <PopularPostsWidget />
              <CategoriesWidget />
              <LetsConnectWidget />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-8">
          <span className="flex items-center gap-1.5">
            <AnchorIcon size={11} />© 2026 Azar. All rights reserved.
          </span>
          <span className="flex items-center gap-1.5">
            Made with <HeartIcon size={11} className="text-brand-sunset" /> and lots of ☕
          </span>
        </footer>
      </main>
    </div>
  );
}
