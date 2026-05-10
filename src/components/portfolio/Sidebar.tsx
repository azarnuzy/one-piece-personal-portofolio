import { SiDribbble, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpenIcon,
  BriefcaseIcon,
  HomeIcon,
  MailIcon,
  MapPinIcon,
  UserIcon,
  XIcon,
  ZapIcon,
} from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: UserIcon, label: "About Me", href: "/about" },
  { icon: BriefcaseIcon, label: "Projects", href: "/projects" },
  { icon: ZapIcon, label: "Skills", href: "/skills" },
  { icon: BookOpenIcon, label: "Blog", href: "/blog" },
  { icon: MailIcon, label: "Contact", href: "/contact" },
];

function isItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const SOCIAL_LINKS = [
  { icon: SiGithub, href: "https://github.com/azarnuzy", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://linkedin.com/in/azarnuzy", label: "LinkedIn" },
  { icon: SiX, href: "https://x.com/azarnuzy", label: "X" },
  { icon: SiDribbble, href: "https://dribbble.com/azarnuzy", label: "Dribbble" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-[1000] flex h-screen w-[75vw] max-w-[260px] flex-col overflow-hidden border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:z-[100] md:w-[220px] md:max-w-none md:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-3 border-b border-sidebar-border px-4 py-4">
          <img src="/skull-logo.png" alt="Azar Portfolio" className="h-9 w-9 object-contain" />
          <div className="flex-1">
            <p className="font-display text-base leading-tight font-bold text-sidebar-foreground">
              Azar
            </p>
            <p className="font-sans text-2xs tracking-wide text-muted-foreground">Frontend Dev</p>
          </div>
          {/* Close button — mobile only */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground md:hidden"
          >
            <XIcon size={15} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="shrink-0 space-y-0.5 p-3">
          {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
            const active = isItemActive(pathname, href);
            return (
              <Link
                key={label}
                to={href}
                onClick={onClose}
                viewTransition
                preload="intent"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm font-medium transition-all duration-[var(--duration-base)]",
                  active
                    ? "nav-active-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom section */}
        <div className="shrink-0">
          <div className="px-4 pt-2 pb-3">
            {/* Quote */}
            <div className="mb-3 text-center">
              <p className="font-display text-2xs leading-relaxed text-brand-rope/70 italic dark:text-muted-foreground">
                "I'm gonna become the King of the Pirates!"
              </p>
              <p className="mt-0.5 font-sans text-2xs text-muted-foreground">— Monkey D. Luffy</p>
            </div>

            {/* Location */}
            <div className="mb-3 flex items-center justify-center gap-1.5 text-muted-foreground">
              <MapPinIcon size={11} />
              <span className="font-sans text-xs">Based in Indonesia</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground transition-colors duration-[var(--duration-base)] hover:text-brand-treasure"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Wave decoration */}
          <div className="relative overflow-hidden">
            <img
              src="/wave-background.png"
              alt=""
              aria-hidden
              className="block h-auto w-full opacity-70 mix-blend-multiply dark:opacity-30 dark:mix-blend-normal dark:invert"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
