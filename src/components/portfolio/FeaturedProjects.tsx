import { ArrowRightIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";

import { PirateCTAButton } from "@/components/portfolio/PirateCTAButton";

const PROJECTS = [
  {
    image: "/projects/bluebird-project.png",
    title: "LMS Platform",
    description:
      "Real-time learning management system with live class, chat, assignment & analytics.",
    tags: ["React", "NuxtJS", "MongoDB"],
    liveUrl: "#",
    caseUrl: "#",
    badge: "LIVE",
  },
  {
    image: "/projects/lind-project.png",
    title: "E-Commerce App",
    description:
      "Modern e-commerce with product filtering, cart, payment integration & admin dashboard.",
    tags: ["React", "Next.js", "MongoDB"],
    liveUrl: "#",
    caseUrl: "#",
    badge: null,
  },
  {
    image: "/projects/bluebird-project-2.png",
    title: "Real-time Chat",
    description: "Socket-based chat with rooms, private messaging and real-time notifications.",
    tags: ["React", "Socket.io", "Express"],
    liveUrl: "#",
    caseUrl: "#",
    badge: null,
  },
];

export function FeaturedProjects() {
  return (
    <section className="flex h-full flex-col surface-card rounded-2xl border border-border p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 heading-section text-2xl text-foreground">
          ⚡ Featured Projects
        </h2>
        <PirateCTAButton
          variant="secondary"
          icon={<ArrowRightIcon size={14} />}
          className="w-full sm:w-auto"
        >
          View All Projects
        </PirateCTAButton>
      </div>

      {/* Project cards grid — 3 cols */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-background/50 transition-colors hover:bg-muted/30"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-muted/20">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover object-top transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-105"
              />
              {project.badge && (
                <span className="absolute top-2.5 left-2.5 z-20 chip-treasure px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-md">
                  {project.badge}
                </span>
              )}

              {/* Elegant overlay glow on hover */}
              <div className="absolute inset-0 z-20 bg-brand-treasure/10 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="mb-1.5 font-display text-base font-bold text-foreground transition-colors group-hover:text-brand-sunset">
                {project.title}
              </h3>
              <p className="mb-2.5 flex-1 font-sans text-xs leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mb-2.5 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-1.5 py-0.5 font-sans text-2xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 font-sans text-xs">
                <a
                  href={project.liveUrl}
                  className="flex items-center gap-1 text-brand-sunset transition-colors hover:text-brand-sunset-hover"
                >
                  <ExternalLinkIcon size={11} />
                  Live Demo
                </a>
                <span className="text-border select-none">·</span>
                <a
                  href={project.caseUrl}
                  className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <FileTextIcon size={11} />
                  Case Study
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
