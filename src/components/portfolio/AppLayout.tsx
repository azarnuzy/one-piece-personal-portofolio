import { Outlet, useLocation, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { HeroShell } from "@/components/portfolio/HeroShell";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { BlogCategoryContext } from "@/contexts/blog-category";
import { AboutHeroContent } from "@/pages/about/AboutHero";
import { BlogDetailHeroContent } from "@/pages/blog/BlogDetailHero";
import { BlogHeroContent } from "@/pages/blog/BlogHero";
import type { BlogCategory } from "@/pages/blog/data";
import { HomeHeroContent } from "@/pages/homepage/HeroSection";
import { ProjectsHeroContent } from "@/pages/projects/ProjectsHero";

// ─── Route → hero config ──────────────────────────────────────────────────────

const BADGE_MAP: Record<string, string> = {
  "/": "WELCOME TO MY PORTFOLIO",
  "/about": "ABOUT ME",
  "/projects": "PROJECTS",
  "/blog": "BLOGS",
};

const STANDARD_HEIGHT = "min-h-[420px] xl:min-h-[500px]";

function getHeroContent(pathname: string, isBlogDetail: boolean) {
  if (pathname === "/") return <HomeHeroContent />;
  if (pathname === "/about") return <AboutHeroContent />;
  if (pathname === "/projects") return <ProjectsHeroContent />;
  if (isBlogDetail) return <BlogDetailHeroContent />;
  return <BlogHeroContent />;
}

// Stable key for the hero crossfade — collapses /blog/$id variants into one key
// so navigating between blog posts doesn't re-trigger the full hero crossfade.
function getHeroKey(pathname: string, isBlogDetail: boolean) {
  if (isBlogDetail) return "/blog/$";
  return pathname;
}

// ─── AppLayout ────────────────────────────────────────────────────────────────

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blogCategory, setBlogCategory] = useState<BlogCategory>("all");
  const location = useLocation();
  const params = useParams({ strict: false });

  const pathname = location.pathname;
  const postId = params?.postId as string | undefined;
  const isBlogDetail = !!postId;

  const badge = BADGE_MAP[pathname] ?? "BLOGS";
  const heroKey = getHeroKey(pathname, isBlogDetail);

  const heroContent = useMemo(
    () => getHeroContent(pathname, isBlogDetail),
    [pathname, isBlogDetail],
  );

  const blogCategoryValue = useMemo(
    () => ({ activeCategory: blogCategory, setCategory: setBlogCategory }),
    [blogCategory],
  );

  return (
    <BlogCategoryContext.Provider value={blogCategoryValue}>
      <div className="flex min-h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex min-w-0 flex-1 flex-col md:ml-[220px]">
          {/* HeroShell persists across navigations — background, particles, fog,
              and PersistentPerson never unmount. Only the text content crossfades. */}
          <HeroShell
            badgeText={badge}
            onOpenSidebar={() => setSidebarOpen(true)}
            minHeight={STANDARD_HEIGHT}
          >
            {/* Hero text crossfade — old & new render simultaneously (overlap),
                so there's no empty-hero gap exposing only the background. */}
            <div className="relative flex flex-1 flex-col">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={heroKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col"
                  style={{ willChange: "opacity" }}
                >
                  {heroContent}
                </motion.div>
              </AnimatePresence>
            </div>
          </HeroShell>

          {/* Outlet body — bg-background as the first paint backdrop so any frame
              between unmount/remount during navigation never exposes a transparent
              gap (which would otherwise reveal the :root light theme bg).
              No motion fade here on purpose: an opacity transition would re-create
              the very gap we just eliminated. The hero crossfade is the one piece
              of motion that signals page change; the body content snaps into place
              underneath it the moment it's ready. */}
          <div className="flex flex-1 flex-col bg-background">
            <Outlet />
          </div>
        </main>
      </div>
    </BlogCategoryContext.Provider>
  );
}
