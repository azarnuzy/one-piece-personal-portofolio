import { motion } from "framer-motion";
import { memo } from "react";

import { useBlogCategory } from "@/contexts/blog-category";
import { cn } from "@/lib/utils";

import { CATEGORIES, type BlogCategory } from "./data";

// ─── Category filter pill ─────────────────────────────────────────────────────

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-200",
        active
          ? "bg-brand-sun/90 text-primary-foreground shadow-sm"
          : "border border-border/60 bg-card/50 text-muted-foreground backdrop-blur-sm hover:border-brand-treasure/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

// ─── Heading line animation ───────────────────────────────────────────────────

function HeadingLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 14, filter: "blur(5px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

// ─── Blog Hero Content ────────────────────────────────────────────────────────

function BlogHeroContentInner() {
  const { activeCategory, setCategory } = useBlogCategory();

  function handleSelectCategory(cat: BlogCategory) {
    setCategory(cat);
  }

  return (
    <div className="relative flex flex-1 items-center">
      <div className="z-10 max-w-[860px] flex-1 px-4 pb-7 md:px-8 md:pb-9">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
          }}
          className="mb-3 heading-display text-5xl text-foreground md:text-6xl xl:text-7xl"
        >
          <HeadingLine>
            <span className="text-highlight-sunset">Blog</span>
          </HeadingLine>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mb-5 max-w-sm font-sans text-sm text-foreground/70 md:max-w-md md:text-base"
          style={{ lineHeight: 1.6 }}
        >
          Sharing my journey, tutorials, insights, and experiences in the world of frontend
          development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.46 }}
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.value}
              label={cat.label}
              active={activeCategory === cat.value}
              onClick={() => handleSelectCategory(cat.value)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export const BlogHeroContent = memo(BlogHeroContentInner);
