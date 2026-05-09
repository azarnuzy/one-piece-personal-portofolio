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
        "group flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-card/60 px-3 py-2 font-sans text-xs font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-treasure/30 hover:brightness-110",
        className,
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

export function LetsConnectWidget() {
  return (
    <GoldPanelCard padding="md" static>
      <SectionHeader icon={AnchorIcon} title="Let's Connect!" tone="sunset" />

      <p className="mb-3 font-sans text-xs leading-relaxed text-muted-foreground">
        I'm open for opportunities and exciting projects. Let's build something amazing together!
      </p>

      <div className="flex flex-wrap gap-2">
        <SocialButton
          href="mailto:azar@example.com"
          icon={<MailIcon size={12} />}
          label="Email Me"
          className="bg-brand-sunset/10 text-brand-sunset hover:border-brand-sunset/40"
        />
        <SocialButton
          href="https://linkedin.com/in/azarnuzy"
          icon={<LinkedInIcon size={12} />}
          label="LinkedIn"
          className="bg-brand-info/10 text-brand-info hover:border-brand-info/40"
        />
        <SocialButton
          href="https://github.com/azarnuzy"
          icon={<SiGithub size={12} />}
          label="Github"
        />
        <SocialButton
          href="https://dribbble.com/azarnuzy"
          icon={<SiDribbble size={12} />}
          label="Dribbble"
          className="bg-brand-sunset/10 text-brand-sunset hover:border-brand-sunset/40"
        />
      </div>
    </GoldPanelCard>
  );
}
