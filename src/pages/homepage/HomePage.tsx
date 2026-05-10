import { AnchorIcon, HeartIcon } from "lucide-react";
import { memo } from "react";

import { Availability } from "@/pages/homepage/Availability";
import { DailyFuel } from "@/pages/homepage/DailyFuel";
import { FeaturedProjects } from "@/pages/homepage/FeaturedProjects";
import { LatestInsights } from "@/pages/homepage/LatestInsights";
import { LetsConnect } from "@/pages/homepage/LetsConnect";
import { QuickContact } from "@/pages/homepage/QuickContact";
import { TechIUse } from "@/pages/homepage/TechIUse";
import { ThingsIFocusOn } from "@/pages/homepage/ThingsIFocusOn";
import { WhatICanDo } from "@/pages/homepage/WhatICanDo";

function HomePageInner() {
  return (
    <>
      {/* Bento grid — three rows matching reference layout.
          Per-card cascade animate-in removed; parent fade in AppLayout
          handles page entrance as a unified motion. */}
      <div className="relative z-10 flex flex-col gap-4 bg-background px-4 pt-2 pb-4 md:gap-5 md:px-6 md:pt-3 md:pb-6 lg:px-8 lg:pt-4 lg:pb-8">
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FeaturedProjects />
          </div>
          <WhatICanDo />
          <ThingsIFocusOn />
          <LetsConnect />
          <LatestInsights />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <TechIUse />
          </div>
          <div className="lg:col-span-2">
            <DailyFuel />
          </div>
          <div className="lg:col-span-3">
            <Availability />
          </div>
          <div className="lg:col-span-3">
            <QuickContact />
          </div>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-8">
        <span className="flex items-center gap-1.5">
          <AnchorIcon size={11} />© 2026 Azar. All rights reserved.
        </span>
        <span className="flex items-center gap-1.5">
          Built with
          <HeartIcon size={11} className="text-brand-sunset" />
          and strong coffee
        </span>
      </footer>
    </>
  );
}

export const HomePage = memo(HomePageInner);
