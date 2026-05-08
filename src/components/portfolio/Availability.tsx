import { CalendarCheckIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";

export function Availability() {
  return (
    <section className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6">
      <CardWatermark asset="sunny" position="bottom-right" size={150} opacity={0.07} rotate={-8} />

      <div className="relative mb-2 flex shrink-0 items-center gap-2">
        <CalendarCheckIcon size={15} className="text-brand-sunset" />
        <h2 className="heading-section text-base text-foreground">Availability</h2>
      </div>

      <p className="relative font-sans text-xs leading-relaxed text-muted-foreground">
        Open for new opportunities and exciting projects.
      </p>

      <div className="relative mt-auto flex items-center gap-2 pt-3">
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-success opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-success" />
        </span>
        <span className="font-sans text-xs font-medium text-brand-success">Available for work</span>
      </div>
    </section>
  );
}
