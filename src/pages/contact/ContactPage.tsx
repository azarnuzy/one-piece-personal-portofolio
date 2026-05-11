import { AnchorIcon } from "lucide-react";
import { memo } from "react";

import { AvailabilityStatusCard } from "./AvailabilityStatusCard";
import { ContactFormCard } from "./ContactFormCard";
import { DownloadCVCard } from "./DownloadCVCard";
import { QuickContactCards } from "./QuickContactCards";

function ContactPageInner() {
  return (
    <>
      <div className="relative z-10 flex-1 bg-background px-4 pt-4 pb-8 md:px-6 md:pt-5 md:pb-10 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* ── Left column — full-width form (AI chat removed) ── */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <ContactFormCard />
            <QuickContactCards />
          </div>

          {/* ── Right sidebar — merged availability+CTA + compact CV ── */}
          <div className="flex flex-col gap-4 lg:w-[260px] lg:shrink-0 xl:w-[280px]">
            <AvailabilityStatusCard />
            <DownloadCVCard />
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

export const ContactPage = memo(ContactPageInner);
