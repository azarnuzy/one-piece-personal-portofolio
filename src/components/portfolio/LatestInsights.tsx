import { ArrowRightIcon, ClockIcon } from "lucide-react";

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
    <section className="flex h-full flex-col surface-card rounded-2xl border border-border p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 heading-section text-2xl text-foreground">
          📖 Latest Insights
        </h2>
        <a
          href="/blog"
          className="flex items-center gap-1 font-sans text-sm text-brand-sunset transition-colors duration-[var(--duration-base)] hover:text-brand-sunset-hover"
        >
          View All
          <ArrowRightIcon size={14} />
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
    </section>
  );
}
