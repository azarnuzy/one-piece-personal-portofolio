import { MessageSquareIcon, SendIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

export function QuickContact() {
  return (
    <section className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6">
      <CardWatermark asset="sunny" position="bottom-right" size={180} opacity={0.08} rotate={-4} />

      <div className="relative mb-2 flex shrink-0 items-center gap-2">
        <MessageSquareIcon size={15} className="text-brand-sunset" />
        <h2 className="heading-section text-base text-foreground">Quick Contact</h2>
      </div>

      <p className="relative font-sans text-xs leading-relaxed text-muted-foreground">
        Have a question or project idea? Drop me a line!
      </p>

      <div className="relative mt-auto pt-3">
        <PirateCTAButton
          variant="primary"
          icon={<SendIcon size={13} />}
          className="w-full justify-center shadow-lg"
        >
          Send Message
        </PirateCTAButton>
      </div>
    </section>
  );
}
