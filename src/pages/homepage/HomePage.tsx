import { AnchorIcon } from "lucide-react";
import { memo } from "react";

import { FeaturedProjects } from "@/pages/homepage/FeaturedProjects";
import { LatestInsights } from "@/pages/homepage/LatestInsights";
import { LetsConnect } from "@/pages/homepage/LetsConnect";
import { TechIUse } from "@/pages/homepage/TechIUse";
import { ThingsIFocusOn } from "@/pages/homepage/ThingsIFocusOn";

function HomePageInner() {
  return (
    <>
      <div className="relative z-10 flex flex-col gap-4 bg-background px-4 pt-2 pb-4 md:gap-5 md:px-6 md:pt-3 md:pb-6 lg:px-8 lg:pt-4 lg:pb-8">
        {/* Row 1 — Featured Projects (8) + stacked right column (4) */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FeaturedProjects />
          </div>
          <div className="flex flex-col gap-4 md:gap-5 lg:col-span-4">
            <ThingsIFocusOn />
            <LatestInsights />
          </div>
        </div>

        {/* Row 2 — Tech I Use (6) + Let's Connect (6) */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <TechIUse />
          </div>
          <div className="lg:col-span-6">
            <LetsConnect />
          </div>
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

export const HomePage = memo(HomePageInner);
