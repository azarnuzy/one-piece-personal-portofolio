import { AnchorIcon, HeartIcon } from "lucide-react";
import { useState } from "react";

import { Availability } from "@/components/portfolio/Availability";
import { DailyFuel } from "@/components/portfolio/DailyFuel";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { LatestInsights } from "@/components/portfolio/LatestInsights";
import { LetsConnect } from "@/components/portfolio/LetsConnect";
import { QuickContact } from "@/components/portfolio/QuickContact";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { TechIUse } from "@/components/portfolio/TechIUse";
import { ThingsIFocusOn } from "@/components/portfolio/ThingsIFocusOn";
import { WhatICanDo } from "@/components/portfolio/WhatICanDo";

export function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex flex-1 flex-col md:ml-[220px]">
        <HeroSection onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Bento grid — three rows matching reference layout */}
        <div className="relative z-10 flex flex-col gap-4 bg-background px-4 pt-2 pb-4 md:gap-5 md:px-6 md:pt-3 md:pb-6 lg:px-8 lg:pt-4 lg:pb-8">
          {/* Row 1: FeaturedProjects (wide) + WhatICanDo */}
          {/* Row 2: ThingsIFocusOn + LetsConnect + LatestInsights */}
          <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
            <div className="animate-in fade-in-0 [animation-delay:60ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:col-span-2">
              <FeaturedProjects />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:120ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4">
              <WhatICanDo />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:180ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4">
              <ThingsIFocusOn />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:240ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4">
              <LetsConnect />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:300ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4">
              <LatestInsights />
            </div>
          </div>

          {/* Row 3: TechIUse (wide) + DailyFuel + Availability + QuickContact */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-12">
            <div className="animate-in fade-in-0 [animation-delay:360ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:col-span-4">
              <TechIUse />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:420ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:col-span-2">
              <DailyFuel />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:480ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:col-span-3">
              <Availability />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:540ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:col-span-3">
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
      </main>
    </div>
  );
}
