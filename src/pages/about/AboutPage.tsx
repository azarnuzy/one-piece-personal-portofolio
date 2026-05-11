import { AnchorIcon } from "lucide-react";
import { memo } from "react";

import { Achievements } from "@/pages/about/Achievements";
import { BeyondTheCode } from "@/pages/about/BeyondTheCode";
import { Certifications } from "@/pages/about/Certifications";
import { Education } from "@/pages/about/Education";
import { MyJourney } from "@/pages/about/MyJourney";
import { TechArsenal } from "@/pages/about/TechArsenal";
import { WhatDrivesMe } from "@/pages/about/WhatDrivesMe";
import { WhatImLookingFor } from "@/pages/about/WhatImLookingFor";

function AboutPageInner() {
  return (
    <>
      <div className="relative z-10 flex flex-col gap-3 bg-background px-4 pt-2 pb-6 md:gap-4 md:px-6 md:pt-3 md:pb-8 lg:px-8">
        <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-12">
          {/* Left Column — Journey + Personal Bits */}
          <div className="flex flex-col gap-3 md:gap-4 lg:col-span-4 lg:row-span-3">
            <div className="flex flex-[3] flex-col">
              <MyJourney />
            </div>
            <div className="flex flex-[1.2] flex-col">
              <BeyondTheCode />
            </div>
          </div>

          {/* Row 1 right — What Drives Me (with merged Philosophy) */}
          <div className="lg:col-span-8">
            <WhatDrivesMe />
          </div>

          {/* Row 2 right — Tech Arsenal + Education */}
          <div className="lg:col-span-4">
            <TechArsenal />
          </div>
          <div className="lg:col-span-4">
            <Education />
          </div>

          {/* Row 3 right — Achievements + Certifications */}
          <div className="lg:col-span-4">
            <Achievements />
          </div>
          <div className="lg:col-span-4">
            <Certifications />
          </div>
        </div>

        <WhatImLookingFor />
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

export const AboutPage = memo(AboutPageInner);
