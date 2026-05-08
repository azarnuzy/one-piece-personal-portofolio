import { ContactForm } from "@/components/portfolio/ContactForm";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { LatestInsights } from "@/components/portfolio/LatestInsights";
import { LetsConnect } from "@/components/portfolio/LetsConnect";
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

        {/* Bento Grid layout */}
        <div className="relative z-10 flex flex-col bg-background p-4 md:p-6 lg:p-8 xl:min-h-0 xl:flex-1">
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Featured Projects */}
            <div className="lg:col-span-2 xl:col-span-2">
              <FeaturedProjects />
            </div>

            {/* What I Can Do */}
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <WhatICanDo />
            </div>

            {/* Latest Insights */}
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <LatestInsights />
            </div>

            {/* Let's Connect */}
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <LetsConnect />
            </div>

            {/* Contact Form */}
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <ContactForm />
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
