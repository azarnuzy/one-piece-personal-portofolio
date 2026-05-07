import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { LatestInsights } from "@/components/portfolio/LatestInsights";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { WhatICanDo } from "@/components/portfolio/WhatICanDo";

export function HomePage() {
  return (
    <div className="flex min-h-screen bg-background xl:h-screen xl:overflow-hidden">
      <Sidebar />

      {/* Main content — scrollable */}
      <main className="flex flex-1 flex-col overflow-y-auto md:ml-[220px]">
        {/* Hero section */}
        <HeroSection />

        {/* Three-panel content row */}
        <div className="relative z-10 flex flex-col bg-background xl:min-h-0 xl:flex-1 xl:flex-row">
          {/* Featured Projects — full width on mobile/tablet, widest col on desktop */}
          <div className="min-w-0 border-b border-border xl:flex-[5] xl:border-b-0">
            <FeaturedProjects />
          </div>

          {/* What I Can Do + Latest Insights — side-by-side at md+, columns at lg */}
          <div className="flex min-w-0 flex-col xl:flex-[6] xl:flex-row">
            <div className="min-w-0 border-b border-border md:flex-1 md:border-b-0">
              <WhatICanDo />
            </div>
            <div className="min-w-0 md:flex-1">
              <LatestInsights />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-8">
          <span>© 2024 Azar. All rights reserved. ⚓</span>
          <span>Built with ♥ and lots of ☕</span>
        </footer>
      </main>
    </div>
  );
}
