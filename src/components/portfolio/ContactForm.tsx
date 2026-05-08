import { SendIcon } from "lucide-react";

import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <section className="flex h-full flex-col surface-card rounded-2xl border border-border p-6 md:p-8">
      {/* Header */}
      <div className="mb-5">
        <h2 className="flex items-center gap-2 heading-section text-2xl text-foreground">
          ✉️ Send a Message
        </h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
          Have a question or a project idea? Drop me a line below and I'll get back to you!
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-1 flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
        <Input
          type="text"
          placeholder="Your Name"
          className="h-10 border-border/50 bg-background/50 font-sans focus-visible:ring-brand-sunset/30"
        />
        <Input
          type="email"
          placeholder="Email Address"
          className="h-10 border-border/50 bg-background/50 font-sans focus-visible:ring-brand-sunset/30"
        />
        <Textarea
          placeholder="Your Message..."
          className="min-h-[80px] flex-1 resize-none border-border/50 bg-background/50 font-sans focus-visible:ring-brand-sunset/30"
        />

        <div className="mt-auto pt-2">
          <PirateCTAButton
            variant="primary"
            icon={<SendIcon size={14} />}
            className="w-full justify-center shadow-lg"
          >
            Send Message
          </PirateCTAButton>
        </div>
      </form>
    </section>
  );
}
