import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRightIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { CardProject } from "./data";

interface ProjectCardProps {
  project: CardProject;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group surface-card-treasure relative flex flex-col overflow-hidden"
    >
      {/* Image area */}
      <div className="relative h-44 shrink-0 overflow-hidden rounded-t-xl">
        {/* Themed gradient background for device-mockup thumbnails */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.15_0.05_230)] via-[oklch(0.18_0.07_210)] to-[oklch(0.22_0.04_190)]" />
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(from var(--brand-treasure) l c h / 1) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* Accent glows */}
        <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-brand-treasure/15 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-16 w-16 rounded-full bg-brand-info/20 blur-2xl" />
        {/* Bottom glow beneath device */}
        <div className="absolute bottom-0 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-full bg-brand-treasure/15 blur-xl" />

        <img
          src={project.thumbnailImage}
          alt={project.title}
          className="relative z-10 h-full w-full object-contain object-bottom px-3 pb-1 drop-shadow-[0_8px_24px_oklch(from_var(--brand-treasure)_l_c_h_/_0.35)] transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
          {project.badge && (
            <span
              className={cn(
                "rounded-md px-2 py-0.5 font-display text-2xs font-bold tracking-wider uppercase backdrop-blur-sm",
                project.badge === "featured"
                  ? "bg-brand-sun/85 text-brand-ink"
                  : "bg-brand-sunset/85 text-white",
              )}
            >
              {project.badge}
            </span>
          )}
          {project.isLive && (
            <span className="flex items-center gap-1.5 rounded-md bg-card/70 px-2 py-0.5 font-sans text-2xs font-medium text-brand-success backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-success opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-success" />
              </span>
              Live
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1.5 line-clamp-1 font-display text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-brand-treasure">
          {project.title}
        </h3>
        <p className="mb-3 line-clamp-2 font-sans text-xs leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded border border-border/50 bg-muted/40 px-1.5 py-0.5 font-sans text-2xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded border border-border/50 bg-muted/40 px-1.5 py-0.5 font-sans text-2xs text-muted-foreground">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-4 border-t border-border/30 pt-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-1.5 font-sans text-xs font-semibold text-brand-treasure transition-colors duration-200 hover:text-brand-sun"
            >
              <ExternalLinkIcon size={11} />
              Live Demo
              <ArrowRightIcon
                size={10}
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
              />
            </a>
          )}
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            className="group/btn flex items-center gap-1.5 font-sans text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <FileTextIcon size={11} />
            View Details
            <ArrowRightIcon
              size={10}
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
