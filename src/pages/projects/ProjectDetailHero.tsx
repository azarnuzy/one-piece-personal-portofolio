import { SiGithub } from "@icons-pack/react-simple-icons";
import { useNavigate, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, ExternalLinkIcon, TagIcon } from "lucide-react";
import { memo } from "react";

import { getProjectDetail, PROJECT_DETAILS } from "./data";

// ─── Title with pirate-gold highlight on the key word ─────────────────────────

function TitleWithHighlight({ title, highlight }: { title: string; highlight: string }) {
  const idx = title.indexOf(highlight);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-highlight-sunset">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

// ─── Hero Content ─────────────────────────────────────────────────────────────

function ProjectDetailHeroContentInner() {
  const { projectId } = useParams({ strict: false }) as { projectId?: string };
  const navigate = useNavigate();
  const project = projectId
    ? (getProjectDetail(projectId) ?? PROJECT_DETAILS[0])
    : PROJECT_DETAILS[0];

  return (
    <div className="relative flex flex-1 items-center">
      <div className="z-10 max-w-[820px] flex-1 px-4 pb-8 md:px-8 md:pb-10">
        {/* Back button */}
        <motion.button
          type="button"
          onClick={() => navigate({ to: "/projects" })}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex items-center gap-1.5 font-sans text-xs text-muted-foreground transition-colors hover:text-brand-treasure"
        >
          <ArrowLeftIcon size={13} />
          Back to Projects
        </motion.button>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 heading-display text-3xl leading-tight text-foreground md:text-4xl xl:text-5xl"
        >
          <TitleWithHighlight title={project.title} highlight={project.titleHighlight} />
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 max-w-xl font-sans text-sm leading-relaxed text-foreground/65 md:text-base"
        >
          {project.description}
        </motion.p>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mb-4 flex flex-wrap gap-1.5"
        >
          {project.tech.map((t) => (
            <span key={t} className="chip-treasure">
              {t}
            </span>
          ))}
        </motion.div>

        {/* Metadata row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1">
            <CalendarIcon size={11} />
            {project.date}
          </span>

          <span className="h-3 w-px bg-border" aria-hidden />

          <span className="flex items-center gap-1">
            <ClockIcon size={11} />
            {project.readTime} min read
          </span>

          <span className="h-3 w-px bg-border" aria-hidden />

          <span className="flex items-center gap-1">
            <TagIcon size={11} />
            {project.type}
          </span>

          {project.liveUrl && (
            <>
              <span className="h-3 w-px bg-border" aria-hidden />
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition-colors hover:text-brand-treasure"
              >
                <ExternalLinkIcon size={11} />
                Live Demo
              </a>
            </>
          )}

          {project.githubUrl && (
            <>
              <span className="h-3 w-px bg-border" aria-hidden />
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition-colors hover:text-brand-treasure"
              >
                <SiGithub size={11} />
                GitHub
              </a>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export const ProjectDetailHeroContent = memo(ProjectDetailHeroContentInner);
