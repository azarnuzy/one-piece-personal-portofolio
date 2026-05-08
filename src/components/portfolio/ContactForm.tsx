import { MailIcon, SendIcon } from "lucide-react";

import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <section className="surface-card-treasure flex h-full flex-col p-5 md:p-6">
      {/* Header */}
      <div className="mb-4 shrink-0">
        <h2 className="flex items-center gap-2 heading-section text-lg text-foreground">
          <MailIcon size={16} className="text-brand-sunset" />
          Send a Message
        </h2>
        <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground">
          Have a question or a project idea? Drop me a line and I'll get back to you.
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-1 flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
        {/* Name + email side by side at wider widths */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            type="text"
            placeholder="Your Name"
            className="h-9 border-border/50 bg-background/50 font-sans text-sm focus-visible:ring-brand-sunset/30"
          />
          <Input
            type="email"
            placeholder="Email Address"
            className="h-9 border-border/50 bg-background/50 font-sans text-sm focus-visible:ring-brand-sunset/30"
          />
        </div>
        <Textarea
          placeholder="Your message..."
          className="min-h-[72px] flex-1 resize-none border-border/50 bg-background/50 font-sans text-sm focus-visible:ring-brand-sunset/30"
        />

        <div className="mt-auto pt-1">
          <PirateCTAButton
            variant="primary"
            icon={<SendIcon size={13} />}
            className="w-full justify-center shadow-lg"
          >
            Send Message
          </PirateCTAButton>
        </div>
      </form>
    </section>
  );
}
