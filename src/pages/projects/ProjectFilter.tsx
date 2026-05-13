import { ChevronDownIcon, SearchIcon, StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { FILTER_TABS, type ProjectCategory } from "./data";

interface ProjectFilterProps {
  active: ProjectCategory;
  onSelect: (cat: ProjectCategory) => void;
  search: string;
  onSearch: (q: string) => void;
  sort: string;
  onSort: (s: string) => void;
}

export function ProjectFilter({
  active,
  onSelect,
  search,
  onSearch,
  sort,
  onSort,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
      {/* Filter tabs — min-w-0 + w-full create the overflow boundary so scrolling works */}
      <div className="w-full min-w-0 flex-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTER_TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelect(tab.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-pill border px-3.5 py-1.5 font-sans text-xs font-medium transition-all duration-200",
                  isActive
                    ? "border-brand-sun/40 bg-brand-sun/10 text-brand-sun"
                    : "border-transparent bg-card/50 text-muted-foreground hover:border-border/60 hover:bg-card hover:text-foreground",
                )}
              >
                {tab.id === "all" && (
                  <StarIcon
                    size={11}
                    className={cn(isActive ? "text-brand-sun" : "text-muted-foreground/50")}
                    fill={isActive ? "currentColor" : "none"}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + Sort */}
      <div className="flex shrink-0 items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 sm:flex-none">
          <SearchIcon
            size={12}
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground/60"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search projects..."
            className="h-8 w-full rounded-lg border border-border/50 bg-card/60 pr-3 pl-7 font-sans text-xs text-foreground transition-colors duration-200 placeholder:text-muted-foreground/50 focus:border-brand-treasure/40 focus:bg-card focus:ring-1 focus:ring-brand-treasure/20 focus:outline-none sm:w-36"
          />
        </div>

        {/* Sort */}
        <div className="relative shrink-0">
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="h-8 appearance-none rounded-lg border border-border/50 bg-card/60 pr-7 pl-3 font-sans text-xs text-foreground transition-colors duration-200 focus:border-brand-treasure/40 focus:outline-none"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <ChevronDownIcon
            size={11}
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground/60"
          />
        </div>
      </div>
    </div>
  );
}
