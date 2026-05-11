import { SiGithub, SiTelegram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { MailIcon, type LucideIcon } from "lucide-react";
import { memo, type ComponentType } from "react";

import { cn } from "@/lib/utils";

function LinkedInIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 23.2 22.271V1.729C23.2.774 22.222 0 22.225 0z" />
    </svg>
  );
}

interface ContactCard {
  icon: LucideIcon | ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
  color: string;
  bgColor: string;
}

const CONTACTS: ContactCard[] = [
  {
    icon: MailIcon,
    label: "Email",
    value: "azarnuzy@gmail.com",
    href: "mailto:azarnuzy@gmail.com",
    color: "text-brand-sunset",
    bgColor: "bg-brand-sunset/10 group-hover:bg-brand-sunset/20",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "in/azarnuzy",
    href: "https://linkedin.com/in/azarnuzy",
    color: "text-[#0077B5]",
    bgColor: "bg-[#0077B5]/10 group-hover:bg-[#0077B5]/20",
  },
  {
    icon: SiGithub,
    label: "GitHub",
    value: "@azarnuzy",
    href: "https://github.com/azarnuzy",
    color: "text-foreground",
    bgColor: "bg-foreground/10 group-hover:bg-foreground/15",
  },
  {
    icon: SiWhatsapp,
    label: "WhatsApp",
    value: "Quick chat",
    href: "https://wa.me/6285156789456",
    color: "text-[#25D366]",
    bgColor: "bg-[#25D366]/10 group-hover:bg-[#25D366]/20",
  },
  {
    icon: SiTelegram,
    label: "Telegram",
    value: "@azarnuzy",
    href: "https://t.me/azarnuzy",
    color: "text-[#0088CC]",
    bgColor: "bg-[#0088CC]/10 group-hover:bg-[#0088CC]/20",
  },
];

function ContactCardItem({ card, index }: { card: ContactCard; index: number }) {
  const Icon = card.icon;
  return (
    <motion.a
      href={card.href}
      target={card.label === "Email" ? undefined : "_blank"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group surface-card-treasure relative flex flex-1 items-center gap-2.5 px-3 py-2 transition-all duration-200",
        "hover:-translate-y-0.5",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
          card.bgColor,
        )}
      >
        <Icon size={13} className={card.color} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-sans text-2xs font-semibold tracking-wider text-muted-foreground uppercase">
          {card.label}
        </p>
        <p className="line-clamp-1 font-sans text-xs font-medium text-foreground">{card.value}</p>
      </div>
    </motion.a>
  );
}

function QuickContactCardsInner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-2 px-0.5">
        <MailIcon size={13} className="text-brand-sunset" />
        <h2 className="heading-section text-sm text-foreground">Quick Contact</h2>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {CONTACTS.map((card, i) => (
          <ContactCardItem key={card.label} card={card} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export const QuickContactCards = memo(QuickContactCardsInner);
