import { useNavigate, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon, UsersIcon } from "lucide-react";
import { memo } from "react";

import { getProjectV2 } from "./data";

function TitleWithHighlight({ title, highlight }: { title: string; highlight: string }) {
  if (!highlight) return <>{title}</>;
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

function ProjectDetailHeroContentInner() {
  const { projectId } = useParams({ strict: false }) as { projectId?: string };
  const navigate = useNavigate();

  const project = projectId ? getProjectV2(projectId) : undefined;

  if (!project) return null;

  return (
    <div className="relative flex flex-1 items-center">
      <div className="z-10 max-w-[820px] flex-1 px-4 pb-8 md:px-8 md:pb-10">
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

        <motion.h1
          initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 heading-display text-3xl leading-tight text-foreground md:text-4xl xl:text-5xl"
        >
          <TitleWithHighlight title={project.hero.title} highlight={project.titleHighlight ?? ""} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 max-w-xl font-sans text-sm leading-relaxed text-foreground/65 md:text-base"
        >
          {project.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mb-4 flex flex-wrap gap-1.5"
        >
          {project.techStack.map((t) => (
            <span key={t.name} className="chip-treasure">
              {t.name}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1">
            <UsersIcon size={11} />
            {project.projectInfo.role}
          </span>

          <span className="h-3 w-px bg-border" aria-hidden />

          <span className="flex items-center gap-1">
            <ClockIcon size={11} />
            {project.projectInfo.duration}
          </span>

          <span className="h-3 w-px bg-border" aria-hidden />

          <span className="flex items-center gap-1">
            <TagIcon size={11} />
            {project.projectInfo.category}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export const ProjectDetailHeroContent = memo(ProjectDetailHeroContentInner);
