import { AnchorIcon, HeartIcon } from "lucide-react";
import { useState } from "react";

import { Sidebar } from "@/components/portfolio/Sidebar";
import { AboutHero } from "@/pages/about/AboutHero";
import { Education } from "@/pages/about/Education";
import { FunFacts } from "@/pages/about/FunFacts";
import { MyJourney } from "@/pages/about/MyJourney";
import { MyPhilosophy } from "@/pages/about/MyPhilosophy";
import { TechArsenal } from "@/pages/about/TechArsenal";
import { WhatDrivesMe } from "@/pages/about/WhatDrivesMe";
import { WhatImLookingFor } from "@/pages/about/WhatImLookingFor";

export function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex flex-1 flex-col md:ml-[220px]">
        <AboutHero onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Bento dashboard grid */}
        <div className="relative z-10 flex flex-col gap-3 bg-background px-4 pt-2 pb-6 md:gap-4 md:px-6 md:pt-3 md:pb-8 lg:px-8">
          {/* Bento Row 1+2: MyJourney spans 2 rows | WhatDrivesMe + TechArsenal (row1) | Philosophy + FunFacts + Education (row2) */}
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-12">
            {/* My Journey — spans rows 1 & 2 */}
            <div className="lg:max-2xl:col-span-6 lg:max-2xl:row-span-2 2xl:col-span-4 2xl:row-span-2">
              <MyJourney />
            </div>

            {/* Row 1 right: What Drives Me + Tech Arsenal */}
            <div className="animate-in fade-in-0 [animation-delay:80ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:max-2xl:col-span-6 2xl:col-span-5">
              <WhatDrivesMe />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:140ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:max-2xl:col-span-6 2xl:col-span-3">
              <TechArsenal />
            </div>

            {/* Row 2 right: Philosophy + Fun Facts + Education */}
            <div className="animate-in fade-in-0 [animation-delay:220ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:max-2xl:col-span-5 2xl:col-span-3">
              <MyPhilosophy />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:280ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:max-2xl:col-span-3 2xl:col-span-2">
              <FunFacts />
            </div>
            <div className="animate-in fade-in-0 [animation-delay:340ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4 lg:max-2xl:col-span-4 2xl:col-span-3">
              <Education />
            </div>
          </div>

          {/* Row 3: What I'm Looking For (full width) */}
          <div className="animate-in fade-in-0 [animation-delay:400ms] [animation-duration:480ms] [animation-fill-mode:both] slide-in-from-bottom-4">
            <WhatImLookingFor />
          </div>
        </div>

        <footer className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 font-sans text-xs text-muted-foreground md:px-8">
          <span className="flex items-center gap-1.5">
            <AnchorIcon size={11} />© 2026 Azar. All rights reserved.
          </span>
          <span className="flex items-center gap-1.5">
            Built with
            <HeartIcon size={11} className="text-brand-sunset" />
            and lots of ☕
          </span>
        </footer>
      </main>
    </div>
  );
}
