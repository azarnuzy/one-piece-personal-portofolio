import { SiDribbble, SiGithub } from "@icons-pack/react-simple-icons";
import { AnchorIcon, MailIcon } from "lucide-react";

import { GoldPanelCard } from "@/components/portfolio/GoldPanelCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { cn } from "@/lib/utils";

import { LinkedInIcon } from "../homepage/LetsConnect";

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function SocialButton({ href, icon, label, className }: SocialButtonProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group flex items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-card/50 px-2.5 py-1.5 font-sans text-2xs font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-treasure/30 hover:brightness-110",
        className,
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="leading-none">{label}</span>
    </a>
  );
}

export function LetsConnectWidget() {
  return (
    <GoldPanelCard padding="sm" static>
      <SectionHeader icon={AnchorIcon} title="Let's Connect" tone="sunset" />

      <p className="mb-2.5 font-sans text-2xs leading-relaxed text-muted-foreground">
        Open for opportunities & exciting projects. Let's build something amazing!
      </p>

      <div className="grid grid-cols-2 gap-1.5">
        <SocialButton
          href="mailto:azar@example.com"
          icon={<MailIcon size={11} />}
          label="Email"
          className="bg-brand-sunset/8 text-brand-sunset hover:border-brand-sunset/35"
        />
        <SocialButton
          href="https://linkedin.com/in/azarnuzy"
          icon={<LinkedInIcon size={11} />}
          label="LinkedIn"
          className="bg-brand-info/8 text-brand-info hover:border-brand-info/35"
        />
        <SocialButton
          href="https://github.com/azarnuzy"
          icon={<SiGithub size={11} />}
          label="GitHub"
        />
        <SocialButton
          href="https://dribbble.com/azarnuzy"
          icon={<SiDribbble size={11} />}
          label="Dribbble"
          className="bg-brand-sunset/8 text-brand-sunset hover:border-brand-sunset/35"
        />
      </div>
    </GoldPanelCard>
  );
}
