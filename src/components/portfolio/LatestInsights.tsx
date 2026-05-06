import { SiDribbble, SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowRightIcon, ClockIcon, MailIcon } from "lucide-react";

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

import { Button } from "@/components/ui/button";

const INSIGHTS = [
  {
    emoji: "⚡",
    title: "How I Built Real-time Chat with WebSocket",
    date: "May 12, 2024",
    readTime: "5 min read",
    href: "/blog/real-time-chat",
  },
  {
    emoji: "🚀",
    title: "Optimizing React Performance in Production",
    date: "Apr 28, 2024",
    readTime: "4 min read",
    href: "/blog/react-performance",
  },
  {
    emoji: "🗺️",
    title: "My Journey as a Frontend Developer",
    date: "Apr 10, 2024",
    readTime: "6 min read",
    href: "/blog/journey",
  },
];

export function LatestInsights() {
  return (
    <section className="flex flex-col px-5 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 heading-section text-xl text-foreground">
          📖 Latest Insights
        </h2>
        <a
          href="/blog"
          className="flex items-center gap-1 font-sans text-xs text-brand-sunset transition-colors duration-[var(--duration-base)] hover:text-brand-sunset-hover"
        >
          View All
          <ArrowRightIcon size={12} />
        </a>
      </div>

      {/* Insight items */}
      <div className="mb-4 flex flex-col gap-2.5">
        {INSIGHTS.map(({ emoji, title, date, readTime, href }) => (
          <a
            key={href}
            href={href}
            className="group flex items-start gap-3 surface-card p-3 transition-shadow duration-[var(--duration-base)] hover:shadow-[var(--shadow-card-lg)]"
          >
            {/* Emoji thumbnail */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-xl">
              {emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1.5 line-clamp-2 font-sans text-xs leading-snug font-semibold text-card-foreground transition-colors group-hover:text-brand-sunset">
                {title}
              </h3>
              <div className="flex items-center gap-1.5 font-sans text-2xs text-muted-foreground">
                <span>{date}</span>
                <span>·</span>
                <ClockIcon size={10} />
                <span>{readTime}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Let's Connect */}
      <div className="mt-auto surface-card p-4 text-center">
        <h3 className="mb-1.5 heading-section text-base text-foreground">🤝 Let's Connect!</h3>
        <p className="mb-4 font-sans text-xs leading-relaxed text-muted-foreground">
          I'm open for opportunities and interesting projects. Let's create something amazing
          together!
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            className="col-span-2 gap-1.5 bg-primary font-sans text-xs text-primary-foreground"
          >
            <MailIcon size={13} />
            Email Me
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 font-sans text-xs">
            <LinkedInIcon size={13} />
            LinkedIn
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 font-sans text-xs">
            <SiGithub size={13} />
            GitHub
          </Button>
          <Button size="sm" variant="outline" className="col-span-2 gap-1.5 font-sans text-xs">
            <SiDribbble size={13} />
            Dribbble
          </Button>
        </div>
      </div>
    </section>
  );
}
