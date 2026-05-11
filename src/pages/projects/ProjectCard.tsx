import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRightIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Project } from "./data";

interface ProjectCardProps {
  project: Project;
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
      {/* Image preview */}
      <div className="relative aspect-video shrink-0 overflow-hidden rounded-t-xl">
        <img
          src={project.mockupImage}
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Gradient overlay — only at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
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
        <h3 className="mb-1.5 font-display text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-brand-treasure">
          {project.title}
        </h3>
        <p className="mb-3 line-clamp-2 font-sans text-xs leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded border border-border/50 bg-muted/40 px-1.5 py-0.5 font-sans text-2xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
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
