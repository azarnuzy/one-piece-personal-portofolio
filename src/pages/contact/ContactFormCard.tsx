import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, MailIcon, SendIcon } from "lucide-react";
import { memo, useState, useRef } from "react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";
import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "Select project type",
  "Web Application",
  "Landing Page",
  "E-Commerce",
  "Dashboard / Admin",
  "API / Backend",
  "Mobile App (React Native)",
  "Open Source",
  "Other",
];

const BUDGET_RANGES = [
  "Select budget range",
  "< $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Let's discuss",
];

function NativeSelect({
  options,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  return (
    <select
      className={cn(
        "h-9 w-full min-w-0 appearance-none rounded-3xl border border-transparent bg-input/50 px-3 py-1 font-sans text-sm text-foreground transition-[border-color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:opacity-50",
        "[&>option]:bg-[var(--card)] [&>option:first-child]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      {options.map((opt, i) => (
        <option key={opt} value={i === 0 ? "" : opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

const MAX_CHARS = 500;

function ContactFormCardInner() {
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setCharCount(0);
    formRef.current?.reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex flex-col overflow-hidden p-5 md:p-6"
    >
      <CardWatermark asset="skull" position="bottom-right" size={160} opacity={0.05} rotate={8} />

      {/* Header */}
      <div className="relative mb-4 shrink-0">
        <h2 className="flex items-center gap-2 heading-section text-base text-foreground">
          <MailIcon size={15} className="text-brand-sunset" />
          Send a Message
        </h2>
        <p className="mt-0.5 font-sans text-xs leading-relaxed text-muted-foreground">
          Have a project idea? Drop me a line — I respond within 24 hours.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-success/15 ring-2 ring-brand-success/30">
              <CheckCircleIcon size={24} className="text-brand-success" />
            </div>
            <div>
              <p className="heading-section text-sm text-foreground">Message Sent!</p>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                Thanks! I'll get back to you within 24 hours.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-2 rounded-full border border-border/50 px-4 py-1.5 font-sans text-xs text-muted-foreground transition-colors hover:border-brand-treasure/40 hover:text-foreground"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-1 flex-col gap-3"
          >
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-2xs font-medium tracking-wide text-muted-foreground uppercase">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Your name"
                  required
                  className="h-9 border-border/50 bg-background/50 font-sans text-xs focus-visible:ring-brand-sunset/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-sans text-2xs font-medium tracking-wide text-muted-foreground uppercase">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-9 border-border/50 bg-background/50 font-sans text-xs focus-visible:ring-brand-sunset/30"
                />
              </div>
            </div>

            {/* Row 2: Project Type + Budget */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-2xs font-medium tracking-wide text-muted-foreground uppercase">
                  Project Type
                </label>
                <NativeSelect
                  options={PROJECT_TYPES}
                  className="border-border/50 bg-background/50 text-xs focus-visible:ring-brand-sunset/30"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-sans text-2xs font-medium tracking-wide text-muted-foreground uppercase">
                  Budget Range
                </label>
                <NativeSelect
                  options={BUDGET_RANGES}
                  className="border-border/50 bg-background/50 text-xs focus-visible:ring-brand-sunset/30"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="font-sans text-2xs font-medium tracking-wide text-muted-foreground uppercase">
                  Message
                </label>
                <span
                  className={cn(
                    "font-sans text-2xs",
                    charCount > MAX_CHARS * 0.9 ? "text-brand-sunset" : "text-muted-foreground/50",
                  )}
                >
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
              <Textarea
                placeholder="Tell me about your project, timeline, and goals..."
                required
                maxLength={MAX_CHARS}
                onChange={(e) => setCharCount(e.target.value.length)}
                className="min-h-[90px] flex-1 resize-none border-border/50 bg-background/50 font-sans text-xs focus-visible:ring-brand-sunset/30"
              />
            </div>

            {/* Submit */}
            <div className="mt-auto pt-1">
              <PirateCTAButton
                type="submit"
                variant="primary"
                icon={submitting ? undefined : <SendIcon size={13} />}
                className="w-full justify-center shadow-lg"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </PirateCTAButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export const ContactFormCard = memo(ContactFormCardInner);
