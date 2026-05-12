import { AnimatePresence, motion } from "framer-motion";
import { AnchorIcon, CompassIcon } from "lucide-react";
import { memo, useMemo, useState } from "react";

import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

import { BuildPhilosophy } from "./BuildPhilosophy";
import { getAllCardProjects, type ProjectCategory } from "./data";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";
import { ProjectsCTA } from "./ProjectsCTA";

function ProjectsPageInner() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const filtered = useMemo(() => {
    let list = getAllCardProjects().filter((p) => {
      const matchCat = activeFilter === "all" || p.category === activeFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    if (sort === "featured") {
      list = [...list].sort((a) => (a.badge === "featured" ? -1 : 1));
    }

    return list;
  }, [activeFilter, search, sort]);

  return (
    <>
      <div className="relative z-10 flex-1 bg-background px-4 pt-4 pb-8 md:px-6 md:pt-5 md:pb-10 lg:px-8">
        {/* Filter + project grid — now full width */}
        <div className="flex flex-col gap-4">
          <ProjectFilter
            active={activeFilter}
            onSelect={setActiveFilter}
            search={search}
            onSearch={setSearch}
            sort={sort}
            onSort={setSort}
          />

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
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
                <CompassIcon size={32} className="text-muted-foreground/40" />
                <p className="font-sans text-sm text-muted-foreground">
                  No projects found for this filter.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom row — Build Philosophy + CTA, fills former empty area */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
          <BuildPhilosophy />
          <ProjectsCTA />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <CompassIcon size={14} className="shrink-0 text-brand-treasure/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
          </div>

          <PirateCTAButton icon={<CompassIcon size={15} />} variant="primary">
            View All Projects
          </PirateCTAButton>

          <p className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground/70">
            <AnchorIcon size={11} />
            Keep Sailing and Keep Building!
          </p>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-8">
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} />© 2026 Azar. All rights reserved.
        </span>
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} className="text-brand-treasure" />
          Sailing the React seas
        </span>
      </footer>
    </>
  );
}

export const ProjectsPage = memo(ProjectsPageInner);
