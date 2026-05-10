import { AnchorIcon, HeartIcon } from "lucide-react";
import { memo } from "react";

import { Education } from "@/pages/about/Education";
import { FunFacts } from "@/pages/about/FunFacts";
import { MyJourney } from "@/pages/about/MyJourney";
import { MyPhilosophy } from "@/pages/about/MyPhilosophy";
import { TechArsenal } from "@/pages/about/TechArsenal";
import { WhatDrivesMe } from "@/pages/about/WhatDrivesMe";
import { WhatImLookingFor } from "@/pages/about/WhatImLookingFor";

function AboutPageInner() {
  return (
    <>
      {/* Bento dashboard grid — parent fade in AppLayout handles entrance. */}
      <div className="relative z-10 flex flex-col gap-3 bg-background px-4 pt-2 pb-6 md:gap-4 md:px-6 md:pt-3 md:pb-8 lg:px-8">
        <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-12">
          <div className="lg:max-2xl:col-span-6 lg:max-2xl:row-span-2 2xl:col-span-4 2xl:row-span-2">
            <MyJourney />
          </div>

          <div className="lg:max-2xl:col-span-6 2xl:col-span-5">
            <WhatDrivesMe />
          </div>
          <div className="lg:max-2xl:col-span-6 2xl:col-span-3">
            <TechArsenal />
          </div>

          <div className="lg:max-2xl:col-span-5 2xl:col-span-3">
            <MyPhilosophy />
          </div>
          <div className="lg:max-2xl:col-span-3 2xl:col-span-2">
            <FunFacts />
          </div>
          <div className="lg:max-2xl:col-span-4 2xl:col-span-3">
            <Education />
          </div>
        </div>

        <WhatImLookingFor />
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
    </>
  );
}

export const AboutPage = memo(AboutPageInner);
