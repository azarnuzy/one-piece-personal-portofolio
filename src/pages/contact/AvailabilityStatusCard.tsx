import { motion } from "framer-motion";
import { AnchorIcon, CalendarCheckIcon, ClockIcon, MapPinIcon, TimerIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";

function useLocalTime() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon size={12} />
        <span className="font-sans text-xs">{label}</span>
      </div>
      <span className="font-sans text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}

function AvailabilityStatusCardInner() {
  const localTime = useLocalTime();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card-treasure relative flex flex-col overflow-hidden p-4"
    >
      <CardWatermark asset="sunny" position="bottom-right" size={120} opacity={0.07} rotate={-6} />

      {/* Header */}
      <div className="relative mb-3 flex items-center gap-2">
        <CalendarCheckIcon size={14} className="text-brand-sunset" />
        <h2 className="heading-section text-sm text-foreground">Availability & Connect</h2>
      </div>

      {/* Status badge */}
      <div className="relative mb-3 flex items-center gap-2 rounded-xl border border-brand-success/25 bg-brand-success/10 px-3 py-2">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-success opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-success" />
        </span>
        <span className="font-sans text-xs font-semibold text-brand-success">
          Available for freelance
        </span>
      </div>

      {/* Info rows */}
      <div className="relative flex flex-col gap-2.5">
        <div className="h-px w-full bg-border/40" />
        <InfoRow icon={MapPinIcon} label="Location" value="Indonesia, WIB" />
        <div className="h-px w-full bg-border/30" />
        <InfoRow icon={TimerIcon} label="Response Time" value="< 24 hours" />
        <div className="h-px w-full bg-border/30" />
        <InfoRow icon={ClockIcon} label="Local Time" value={`${localTime} WIB`} />
      </div>

      {/* Merged CTA — short connect tagline */}
      <div className="relative mt-4 flex flex-col items-center gap-1.5 border-t border-border/40 pt-3">
        <div className="flex items-center gap-1.5 text-brand-treasure/60">
          <AnchorIcon size={11} />
          <span className="font-sans text-2xs font-semibold tracking-wider uppercase">
            Let's Connect
          </span>
          <AnchorIcon size={11} />
        </div>
        <p className="text-center font-sans text-2xs leading-relaxed text-muted-foreground/85">
          The greatest voyages start with a single message.
        </p>
      </div>
    </motion.section>
  );
}

export const AvailabilityStatusCard = memo(AvailabilityStatusCardInner);
