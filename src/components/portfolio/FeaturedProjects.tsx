import { ArrowRightIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";

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
    <section className="border-r border-border px-6 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 heading-section text-xl text-foreground">
          ⚡ Featured Projects
        </h2>
        <a
          href="/projects"
          className="flex items-center gap-1 font-sans text-xs text-brand-sunset transition-colors duration-[var(--duration-base)] hover:text-brand-sunset-hover"
        >
          View All Projects
          <ArrowRightIcon size={12} />
        </a>
      </div>

      {/* Project cards grid — 3 cols */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <div key={project.title} className="group flex flex-col overflow-hidden surface-card">
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden bg-muted lg:aspect-auto lg:h-[100px]">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover object-top transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
              />
              {project.badge && (
                <span className="absolute top-1.5 left-1.5 chip-treasure px-2 py-0.5 text-2xs">
                  {project.badge}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-3">
              <h3 className="mb-1 font-display text-sm font-bold text-card-foreground">
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
