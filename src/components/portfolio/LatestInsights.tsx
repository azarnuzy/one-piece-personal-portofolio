import { ArrowRightIcon, BookOpenIcon, ClockIcon } from "lucide-react";

import { CardWatermark } from "@/components/portfolio/CardWatermark";

const INSIGHTS = [
  {
    image: "/projects/bluebird-project-2.png",
    title: "How I Built Real-time Chat with WebSocket",
    date: "May 12, 2024",
    readTime: "5 min read",
    href: "/blog/real-time-chat",
  },
  {
    image: "/projects/lind-project.png",
    title: "Optimizing React Performance in Production",
    date: "Apr 28, 2024",
    readTime: "4 min read",
    href: "/blog/react-performance",
  },
  {
    image: "/projects/bluebird-project.png",
    title: "My Journey as a Frontend Developer",
    date: "Apr 10, 2024",
    readTime: "6 min read",
    href: "/blog/journey",
  },
];

export function LatestInsights() {
  return (
    <section className="surface-card-treasure relative flex h-full flex-col overflow-hidden p-5 md:p-6">
      <CardWatermark asset="skull" position="bottom-right" size={150} opacity={0.05} rotate={-15} />

      {/* Header */}
      <div className="relative mb-4 flex shrink-0 items-center justify-between">
        <h2 className="flex items-center gap-2 heading-section text-lg text-foreground">
          <BookOpenIcon size={16} className="text-brand-sunset" />
          Latest Insights
        </h2>
        <a
          href="/blog"
          className="flex items-center gap-1 font-sans text-xs text-brand-sunset transition-colors duration-[var(--duration-base)] hover:text-brand-sunset-hover"
        >
          View All
          <ArrowRightIcon size={12} />
        </a>
      </div>

      {/* Article list with thumbnails */}
      <div className="relative flex flex-col divide-y divide-border/40">
        {INSIGHTS.map(({ image, title, date, readTime, href }, index) => (
          <a
            key={href}
            href={href}
            className="group flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            {/* Number */}
            <span className="shrink-0 font-mono text-xs font-bold text-muted-foreground/60 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Thumbnail */}
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-brand-treasure/30">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Body */}
            <div className="min-w-0 flex-1">
              <h3 className="mb-0.5 line-clamp-1 font-sans text-xs leading-snug font-semibold text-card-foreground transition-colors group-hover:text-brand-sunset">
                {title}
              </h3>
              <div className="flex items-center gap-1.5 font-sans text-2xs text-muted-foreground">
                <span>{date}</span>
                <span>·</span>
                <ClockIcon size={9} />
                <span>{readTime}</span>
              </div>
            </div>

            <ArrowRightIcon
              size={12}
              className="shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-brand-sunset"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
