import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRightIcon, FileTextIcon } from "lucide-react";

import type { CardProject } from "./data";

interface ProjectCardProps {
  project: CardProject;
  index?: number;
  /** When true, renders a "FEATURED" chip in the top-left of the thumbnail. */
  featured?: boolean;
}

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group surface-card-treasure relative flex flex-col overflow-hidden"
    >
      {/* Image area — dark "well" kept in both themes for device-mockup contrast */}
      <div className="relative h-44 shrink-0 overflow-hidden rounded-t-xl">
        {/* Themed gradient background for device-mockup thumbnails */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-thumbnail-well)" }}
        />
        {/* Dot grid overlay — slate-blue in light, gold in dark for visible texture both ways */}
        <div
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(from var(--accent-soft) l c h / 1) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* Accent glows — neutral/blue in light, gold in dark */}
        <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-accent-soft/12 blur-2xl dark:bg-brand-treasure/15" />
        <div className="absolute bottom-0 left-0 h-16 w-16 rounded-full bg-brand-info/20 blur-2xl" />
        {/* Bottom glow beneath device */}
        <div className="absolute bottom-0 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-full bg-accent-soft/12 blur-xl dark:bg-brand-treasure/15" />

        <img
          src={project.thumbnailImage}
          alt={project.title}
          className="relative z-10 h-full w-full object-contain object-bottom px-3 pb-1 drop-shadow-[0_8px_24px_oklch(from_var(--accent-soft)_l_c_h_/_0.28)] transition-transform duration-500 group-hover:scale-[1.03] dark:drop-shadow-[0_8px_24px_oklch(from_var(--brand-treasure)_l_c_h_/_0.35)]"
        />

        {featured && (
          <span className="absolute top-2.5 left-2.5 z-20 inline-flex items-center gap-1.5 rounded-md border border-border bg-card/95 px-2 py-0.5 font-display text-2xs font-bold tracking-wider text-foreground uppercase backdrop-blur-sm dark:border-brand-treasure/40 dark:bg-brand-treasure/90 dark:text-brand-ink">
            <span className="h-1 w-1 rounded-full bg-accent-soft dark:bg-brand-ink" aria-hidden />
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1.5 line-clamp-1 font-display text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-brand-sunset dark:group-hover:text-brand-treasure">
          {project.title}
        </h3>
        <p className="mb-3 line-clamp-2 font-sans text-xs leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tech tags — capped at 2 rows so every card in the carousel has identical height */}
        <div className="mb-4 flex h-[3.25rem] flex-wrap content-start gap-1.5 overflow-hidden">
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
